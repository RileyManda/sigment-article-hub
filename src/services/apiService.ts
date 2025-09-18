import type { Article } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export class ApiArticleService {
  // GET  - Get all published articles
  static async fetchAllPublishedArticles(): Promise<Article[]> {
    const response = await fetch(`${API_BASE_URL}/articles`);

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data;
  }

  // GET - Get article by slug
  static async fetchArticleBySlug(slug: string): Promise<Article | null> {
    const response = await fetch(`${API_BASE_URL}/articles/${slug}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch article: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data;
  }

  // GET - Get articles by category
  static async fetchArticlesByCategory(
    categorySlug: string
  ): Promise<Article[]> {
    const response = await fetch(
      `${API_BASE_URL}/articles/category/${categorySlug}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch articles by category: ${response.statusText}`
      );
    }

    const result = await response.json();
    return result.data;
  }

  // GET  - Get articles by tag
  static async fetchArticlesByTag(tagSlug: string): Promise<Article[]> {
    const response = await fetch(`${API_BASE_URL}/articles/tag/${tagSlug}`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch articles by tag: ${response.statusText}`
      );
    }

    const result = await response.json();
    return result.data;
  }

  // GET - Search articles
  static async searchArticlesByQuery(query: string): Promise<Article[]> {
    const response = await fetch(
      `${API_BASE_URL}/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`Failed to search articles: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data;
  }
}
