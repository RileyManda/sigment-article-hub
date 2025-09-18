import { NavigateTo, signal, createEffect } from "sigment";
import { ApiArticleService } from "../services/apiService";
import { refreshArticles } from "./global/globalState";
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

  function handleNavigate() {
    NavigateTo("/").catch(() => {});
  }

  function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function truncateContent(content: string, maxLength: number = 150): string {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  }

  return div(
    { class: "articles-page" },

    // Header
    div(
      { class: "articles-header" },
      h1("📚 Articles"),
      p("Discover insights about web development, programming, and technology"),
      div(
        { class: "header-actions" },
        button(
          { onClick: () => handleNavigate(), class: "back-btn" },
          "← Back to About"
        ),
        button(
          { onClick: () => loadArticles(), class: "refresh-btn" },
          "🔄 Refresh"
        )
      )
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

        // Articles count
        div(
          { class: "articles-count" },
          `${articles().length} published articles`
        ),

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
              p({ class: "article-excerpt" }, truncateContent(article.excerpt)),

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
              )
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
