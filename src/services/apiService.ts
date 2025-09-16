import type { Article } from "../types";

const API_BASE_URL = "http://localhost:3003/api";
export class ApiArticleService {
  // GET  - Get all published articles
  static async fetchAllPublishedArticles(): Promise<Article[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/articles`);

      if (!response.ok) {
        throw new Error(`Failed to fetch articles: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  }

  // GET - Get article by slug
  static async fetchArticleBySlug(slug: string): Promise<Article | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/${slug}`);

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch article: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error fetching article:", error);
      throw error;
    }
  }

  // GET - Get articles by category
  static async fetchArticlesByCategory(
    categorySlug: string
  ): Promise<Article[]> {
    try {
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
    } catch (error) {
      console.error("Error fetching articles by category:", error);
      throw error;
    }
  }

  // GET  - Get articles by tag
  static async fetchArticlesByTag(tagSlug: string): Promise<Article[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/tag/${tagSlug}`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch articles by tag: ${response.statusText}`
        );
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error fetching articles by tag:", error);
      throw error;
    }
  }

  // GET  - Search articles
  static async searchArticlesByQuery(query: string): Promise<Article[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/search?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`Failed to search articles: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error searching articles:", error);
      throw error;
    }
  }
}
