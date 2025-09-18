import { signal, createEffect } from "sigment";
import { ApiArticleService } from "../services/apiService";
import {
  refreshArticles,
  isAuthenticated,
  authToken,
  user,
} from "./global/globalState";
import type { Article } from "../types";
import "../assets/css/articles.css";

function Articles(props: any): HTMLElement {
  const [articles, setArticles] = signal<Article[]>([]);
  const [loading, setLoading] = signal(true);
  const [error, setError] = signal<string | null>(null);
  async function loadArticles() {
    setLoading(true);
    setError(null);

    try {
      const data = await ApiArticleService.fetchAllPublishedArticles();
      setArticles(data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load articles");
      setLoading(false);
    }
  }
  createEffect(() => {
    loadArticles();
  });

  // Listen for refresh signal
  createEffect(() => {
    refreshArticles(); // This will trigger when refreshArticles signal changes
    loadArticles();
  });

  function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function formatExcerpt(content: string): string {
    const sentences = content.split(". ").filter((s) => s.trim().length > 0);

    if (sentences.length >= 2) {
      const firstSentence = sentences[0] + ".";
      const secondSentence = sentences[1] + ".";
      return firstSentence + "\n" + secondSentence;
    }
    if (content.length > 100) {
      const midPoint = Math.floor(content.length / 2);
      const spaceIndex = content.indexOf(" ", midPoint);
      if (spaceIndex !== -1) {
        return (
          content.substring(0, spaceIndex) +
          "\n" +
          content.substring(spaceIndex + 1)
        );
      }
    }

    return content;
  }

  async function handleDeleteArticle(articleId: string, articleTitle: string) {
    const confirmed = confirm(
      `Are you sure you want to delete "${articleTitle}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      await ApiArticleService.deleteArticle(articleId, authToken());
      // Refresh articles after successful deletion
      loadArticles();
    } catch (error) {
      alert(
        `Failed to delete article: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  function canDeleteArticle(article: Article): boolean {
    if (!isAuthenticated() || !user()) return false;
    const currentUser = user();
    return currentUser ? currentUser.id === article.author.id : false;
  }

  return div(
    { class: "articles-page" },

    // Header
    div(
      { class: "articles-header" },
      h1("📚 Articles"),
      p("Discover insights about web development, programming, and technology"),
      () =>
        !loading() && !error() && articles().length > 0
          ? div(
              { class: "articles-count" },
              `${articles().length} published articles`
            )
          : null
    ),

    // Loading state
    () => (loading() ? div({ class: "loading" }, "Loading articles...") : null),

    // Error state
    () => (error() ? div({ class: "error" }, `Error: ${error()}`) : null),

    // Articles list
    () => {
      if (loading() || error()) return null;

      return div(
        { class: "articles-grid" },

        // Articles
        ...articles().map((article) =>
          div(
            { class: "article-card" },

            // Cover image
            article.coverImage &&
              img({
                src: article.coverImage,
                alt: article.title,
                class: "article-cover",
              }),

            // Article content
            div(
              { class: "article-content" },

              // Category and date
              div(
                { class: "article-meta" },
                span(
                  {
                    class: "category-badge",
                  },
                  article.category.icon + " " + article.category.name
                ),
                span(
                  { class: "article-date" },
                  formatDate(article.publishedAt!)
                )
              ),

              // Title
              h2({ class: "article-title" }, article.title),

              // Excerpt
              p({ class: "article-excerpt" }, formatExcerpt(article.excerpt)),

              // Author and stats
              div(
                { class: "article-footer" },
                div(
                  { class: "author-info" },
                  article.author.avatar &&
                    img({
                      src: article.author.avatar,
                      alt: article.author.firstName,
                      class: "author-avatar",
                    }),
                  span(
                    { class: "author-name" },
                    `${article.author.firstName} ${article.author.lastName}`
                  )
                ),
                div(
                  { class: "article-stats" },
                  span({ class: "views" }, `👁 ${article.views}`),
                  span({ class: "likes" }, `❤️ ${article.likes}`)
                )
              ),

              // Tags
              div(
                { class: "article-tags" },
                ...article.tags.map((tag) =>
                  span(
                    {
                      class: "tag",
                    },
                    tag.name
                  )
                )
              ),

              () =>
                canDeleteArticle(article)
                  ? div(
                      { class: "article-actions" },
                      button(
                        {
                          class: "delete-btn",
                          onClick: () =>
                            handleDeleteArticle(article.id, article.title),
                        },
                        "🗑️ Delete Article"
                      )
                    )
                  : null
            )
          )
        )
      );
    },

    // Empty state:When no articles are found
    () => {
      if (loading() || error() || articles().length > 0) return null;
      return div(
        { class: "empty-state" },
        h3("No articles found"),
        p("Check back later for new content!")
      );
    }
  );
}

export default Articles;
