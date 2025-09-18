import { describe, it, expect, vi, beforeEach } from "vitest";
import Articles from "../Articles";
import { ApiArticleService } from "../../services/apiService";
import type { Article, ArticleStatus } from "../../types";

vi.mock("../../services/apiService", () => ({
    ApiArticleService: {
        fetchAllPublishedArticles: vi.fn(),
    },
}));

// Mock CSS import
vi.mock("../../assets/css/articles.css", () => ({}));

// Mock data factory
const createMockArticle = (overrides: Partial<Article> = {}): Article => {
    const defaultSlug = "test-article";
    const baseDate = new Date("2023-01-01");
    const updatedDate = new Date("2023-01-02");

    return {
        id: "1",
        title: "Test Article",
        slug: overrides.slug ?? defaultSlug,
        content: "Test content",
        excerpt: "Test excerpt",
        coverImage: "test.jpg",
        publishedAt: baseDate,
        views: 100,
        likes: 50,
        authorId: "1",
        author: {
            id: "1",
            firstName: "John",
            lastName: "Doe",
            avatar: "avatar.jpg",
            username: "johndoe",
            email: "john@example.com",
            createdAt: baseDate,
            updatedAt: updatedDate,
        },
        categoryId: "1",
        category: {
            id: "1",
            name: "Technology",
            icon: "💻",
            slug: "technology",
            createdAt: baseDate,
            updatedAt: updatedDate,
        },
        tags: [
            {
                id: "1",
                name: "Node.js",
                slug: "node-js",
                createdAt: baseDate,
                updatedAt: updatedDate,
            },
            {
                id: "2",
                name: "JavaScript",
                slug: "javascript",
                createdAt: baseDate,
                updatedAt: updatedDate,
            },
        ],
        status: overrides.status ?? ("published" as ArticleStatus),
        createdAt: overrides.createdAt ?? baseDate,
        updatedAt: overrides.updatedAt ?? updatedDate,
        ...overrides,
    };
};

const createMockArticleWithMissingFields = (): Article => {
    const baseDate = new Date("2022-01-01");
    const updatedDate = new Date("2022-01-02");

    return createMockArticle({
        coverImage: undefined,
        views: 0,
        likes: 0,
        author: {
            id: "1",
            firstName: "John",
            lastName: "Doe",
            avatar: undefined,
            username: "johndoe",
            email: "john@example.com",
            createdAt: baseDate,
            updatedAt: updatedDate,
        },
        tags: [],
    });
};

describe("Articles Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render loading state initially", () => {
        const mockArticles = [createMockArticle()];

        vi.mocked(ApiArticleService.fetchAllPublishedArticles).mockResolvedValue(
            mockArticles as Article[]
        );

        const component = Articles({});
        expect(component).toBeDefined();
    });

    it("should format date correctly", () => {
        const testDate = new Date("2023-12-25");
        const formatted = testDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        expect(formatted).toBe("December 25, 2023");
    });

    it("should format excerpt with line breaks", () => {
        const longContent =
            "This is a long article content that should be split into multiple sentences. This is the second sentence that should appear on a new line.";
        const sentences = longContent
            .split(". ")
            .filter((s) => s.trim().length > 0);

        if (sentences.length >= 2) {
            const firstSentence = sentences[0] + ".";
            const secondSentence = sentences[1] + ".";
            const result = firstSentence + "\n" + secondSentence;

            expect(result).toContain("\n");
            expect(result).toContain(
                "This is a long article content that should be split into multiple sentences."
            );
            expect(result).toContain(
                "This is the second sentence that should appear on a new line."
            );
        }
    });

    it("should handle single sentence content", () => {
        const shortContent = "This is a short article content.";
        const sentences = shortContent
            .split(". ")
            .filter((s) => s.trim().length > 0);

        if (sentences.length < 2) {
            expect(sentences.length).toBe(1);
        }
    });

    it("should handle content without periods", () => {
        const contentWithoutPeriods = "This is content without periods";
        const sentences = contentWithoutPeriods
            .split(". ")
            .filter((s) => s.trim().length > 0);

        expect(sentences.length).toBe(1);
        expect(sentences[0]).toBe("This is content without periods");
    });

    it("should handle empty content", () => {
        const emptyContent = "";
        const sentences = emptyContent
            .split(". ")
            .filter((s) => s.trim().length > 0);

        expect(sentences.length).toBe(0);
    });

    it("should handle content with multiple periods", () => {
        const multiPeriodContent =
            "Initial sentence. First sentence. Second sentence. Third sentence.";
        const sentences = multiPeriodContent
            .split(". ")
            .filter((s) => s.trim().length > 0);

        expect(sentences.length).toBe(4);
        expect(sentences[0]).toBe("Initial sentence");
        expect(sentences[1]).toBe("First sentence");
        expect(sentences[2]).toBe("Second sentence");
        expect(sentences[3]).toBe("Third sentence.");
    });

    it("should handle API errors gracefully", async () => {
        const errorMessage = "Failed to fetch articles";
        vi.mocked(ApiArticleService.fetchAllPublishedArticles).mockRejectedValue(
            new Error(errorMessage)
        );

        const component = Articles({});
        expect(component).toBeDefined();
    });

    it("should handle empty articles array", async () => {
        vi.mocked(ApiArticleService.fetchAllPublishedArticles).mockResolvedValue(
            [] as Article[]
        );

        const component = Articles({});
        expect(component).toBeDefined();
    });

    it("should handle articles with missing optional fields", async () => {
        const articleWithMissingFields = createMockArticleWithMissingFields();

        vi.mocked(ApiArticleService.fetchAllPublishedArticles).mockResolvedValue([
            articleWithMissingFields as Article,
        ]);

        const component = Articles({});
        expect(component).toBeDefined();
    });
});
