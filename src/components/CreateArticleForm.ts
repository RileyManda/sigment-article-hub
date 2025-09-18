import { signal, NavigateTo } from "sigment";
import { AuthService } from "../services/authService";
import {
  setShowCreateArticleForm,
  setRefreshArticles,
} from "./global/globalState";
import "../assets/css/createArticleForm.css";

// Hardcoded categories:For testing purposes
const CATEGORIES = [
  { id: "cmfpn5d8g0003icfw7spzzths", name: "Technology", icon: "💻" },
  { id: "cmfpn5d8l0005icfwqmn0lc1v", name: "Web Development", icon: "🌐" },
  {
    id: "cmfpn5d8n0006icfwl3yf2cf7",
    name: "Artificial Intelligence",
    icon: "🤖",
  },
  { id: "cmfpn5d8j0004icfwz11ydy5f", name: "Design", icon: "🎨" },
];

function CreateArticleForm(): HTMLElement {
  const [title, setTitle] = signal("");
  const [content, setContent] = signal("");
  const [excerpt, setExcerpt] = signal("");
  const [categoryId, setCategoryId] = signal(CATEGORIES[0].id);
  const [coverImage, setCoverImage] = signal("");
  const [isLoading, setIsLoading] = signal(false);
  const [error, setError] = signal("");

  async function handleSubmit(e: Event) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Form submitted with data:", {
        title: title(),
        content: content(),
        categoryId: categoryId(),
      });

      const token = await AuthService.getAuthToken();
      console.log("Auth token:", token);

      const requestBody = {
        title: title(),
        content: content(),
        excerpt: excerpt() || content().substring(0, 150) + "...",
        categoryId: categoryId(),
        coverImage: coverImage() || null,
        status: "PUBLISHED",
      };

      console.log("Sending request to API:", requestBody);

      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL || "http://localhost:3003/api"
        }/articles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error(`Failed to create article: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("API Response:", result);

      if (result.success) {
        setShowCreateArticleForm(false);
        setRefreshArticles(Date.now());
        NavigateTo("/articles").catch(() => {});
      } else {
        throw new Error(result.error || "Failed to create article");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create article");
    } finally {
      setIsLoading(false);
    }
  }

  function handleClose() {
    setShowCreateArticleForm(false);
  }

  function handleTitleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    setTitle(target.value);
  }

  function handleContentInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    setContent(target.value);
  }

  function handleExcerptInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    setExcerpt(target.value);
  }

  function handleCategoryChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    setCategoryId(target.value);
  }

  function handleCoverImageInput(e: Event) {
    const target = e.target as HTMLInputElement;
    setCoverImage(target.value);
  }

  return div(
    { class: "create-article-page" },
    div(
      { class: "create-article-container" },
      div(
        { class: "create-article-header" },
        h2("Create New Article"),
        button(
          {
            class: "close-btn",
            onClick: handleClose,
          },
          "×"
        )
      ),
      form(
        {
          class: "create-article-form",
          onSubmit: handleSubmit,
        },
        div(
          { class: "form-group" },
          label({ for: "title" }, "Title *"),
          input({
            type: "text",
            id: "title",
            onInput: handleTitleInput,
            required: true,
            placeholder: "Enter article title",
          })
        ),
        div(
          { class: "form-group" },
          label({ for: "category" }, "Category *"),
          select(
            {
              id: "category",
              onInput: handleCategoryChange,
              required: true,
            },
            ...CATEGORIES.map((category) =>
              option(
                {
                  value: category.id,
                  selected: category.id === CATEGORIES[0].id,
                },
                `${category.icon} ${category.name}`
              )
            )
          )
        ),
        div(
          { class: "form-group" },
          label({ for: "excerpt" }, "Excerpt"),
          textarea({
            id: "excerpt",
            onInput: handleExcerptInput,
            placeholder: "Brief description of your article (optional)",
            rows: 3,
          })
        ),
        div(
          { class: "form-group" },
          label({ for: "content" }, "Content *"),
          textarea({
            id: "content",
            onInput: handleContentInput,
            required: true,
            placeholder: "Write your article content here...",
            rows: 10,
          })
        ),
        div(
          { class: "form-group" },
          label({ for: "coverImage" }, "Cover Image URL"),
          input({
            type: "url",
            id: "coverImage",
            onInput: handleCoverImageInput,
            placeholder: "https://example.com/image.jpg (optional)",
          })
        ),
        error() ? div({ class: "error-message" }, error()) : null,
        div(
          { class: "form-actions" },
          button(
            {
              type: "button",
              class: "btn btn-secondary",
              onClick: handleClose,
            },
            "Cancel"
          ),
          button(
            {
              type: "submit",
              class: "btn btn-primary",
              disabled: isLoading(),
            },
            isLoading() ? "Creating..." : "Create Article"
          )
        )
      )
    )
  );
}

export default CreateArticleForm;
