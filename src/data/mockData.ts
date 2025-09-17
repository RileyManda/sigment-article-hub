import { User, Article, Category, Tag, Comment, ArticleStatus } from "../types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user-1",
    username: "johndoe",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    avatar: "https://via.placeholder.com/150/0066CC/FFFFFF?text=JD",
    bio: "Frontend developer passionate about modern web technologies.",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "user-2",
    username: "janesmith",
    email: "jane.smith@example.com",
    firstName: "Jane",
    lastName: "Smith",
    avatar: "https://via.placeholder.com/150/CC6600/FFFFFF?text=JS",
    bio: "Full-stack developer and tech writer.",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "user-3",
    username: "alexdev",
    email: "alex@example.com",
    firstName: "Alex",
    lastName: "Johnson",
    avatar: "https://via.placeholder.com/150/009966/FFFFFF?text=AJ",
    bio: "Backend engineer and DevOps enthusiast.",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
];

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: "cat-1",
    name: "Web Development",
    slug: "web-development",
    description:
      "Articles about modern web development technologies and practices",
    color: "#3B82F6",
    icon: "🌐",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "cat-2",
    name: "JavaScript",
    slug: "javascript",
    description: "Everything about JavaScript and its ecosystem",
    color: "#F59E0B",
    icon: "📜",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "cat-3",
    name: "Frameworks",
    slug: "frameworks",
    description: "Frontend and backend framework tutorials and guides",
    color: "#10B981",
    icon: "🏗️",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "cat-4",
    name: "DevOps",
    slug: "devops",
    description: "Deployment, CI/CD, and infrastructure articles",
    color: "#8B5CF6",
    icon: "⚙️",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

// Mock Tags
export const mockTags: Tag[] = [
  {
    id: "tag-1",
    name: "TypeScript",
    slug: "typescript",
    color: "#3178C6",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "tag-2",
    name: "React",
    slug: "react",
    color: "#61DAFB",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "tag-3",
    name: "Vite",
    slug: "vite",
    color: "#646CFF",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "tag-4",
    name: "Sigment",
    slug: "sigment",
    color: "#FF6B35",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "tag-5",
    name: "Tutorial",
    slug: "tutorial",
    color: "#8B5CF6",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "tag-6",
    name: "Beginner",
    slug: "beginner",
    color: "#10B981",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "tag-7",
    name: "Advanced",
    slug: "advanced",
    color: "#EF4444",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "tag-8",
    name: "Performance",
    slug: "performance",
    color: "#F59E0B",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

// Mock Articles
export const mockArticles: Article[] = [
  {
    id: "article-1",
    title: "Getting Started with Sigment: A Modern Reactive Framework",
    slug: "getting-started-with-sigment",
    content: `# Getting Started with Sigment

Sigment is a lightweight reactive framework that brings fine-grained reactivity to web development without the overhead of virtual DOM or JSX transpilation.

## Why Choose Sigment?

- **Lightweight**: Under 5KB runtime
- **No JSX**: Pure JavaScript functions
- **Fine-grained reactivity**: Only updates what needs to change
- **Zero config**: No build steps required

## Your First Component

\`\`\`typescript
import { signal } from 'sigment';

function Counter() {
  const [count, setCount] = signal(0);
  
  return div({ id: 'counter' },
    button({ onClick: () => setCount(count() + 1) }, 'Increment'),
    p(() => \`Count: \${count()}\`)
  );
}
\`\`\`

This creates a reactive counter that efficiently updates only the text content when the count changes.

## Next Steps

In the next article, we'll explore more advanced features like global state management and custom sigments.`,
    excerpt:
      "Learn how to get started with Sigment, a modern reactive framework that eliminates the need for virtual DOM and JSX while providing fine-grained reactivity.",
    coverImage:
      "https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Sigment+Framework",
    status: ArticleStatus.PUBLISHED,
    authorId: "user-1",
    author: mockUsers[0],
    categoryId: "cat-3",
    category: mockCategories[2],
    tags: [mockTags[3], mockTags[4], mockTags[5]],
    views: 1250,
    likes: 89,
    publishedAt: new Date("2024-02-01"),
    createdAt: new Date("2024-01-28"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: "article-2",
    title: "TypeScript Best Practices for Modern Web Development",
    slug: "typescript-best-practices",
    content: `# TypeScript Best Practices

TypeScript has revolutionized JavaScript development by adding static typing. Here are some best practices to follow.

## 1. Use Strict Configuration

Always enable strict mode in your \`tsconfig.json\`:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
\`\`\`

## 2. Leverage Type Inference

Let TypeScript infer types when possible:

\`\`\`typescript
// Good
const user = { name: 'John', age: 30 };

// Unnecessary
const user: { name: string; age: number } = { name: 'John', age: 30 };
\`\`\`

## 3. Use Utility Types

TypeScript provides many utility types:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}

type CreateUser = Omit<User, 'id'>;
type UserUpdate = Partial<User>;
\`\`\`

These practices will help you write more maintainable and type-safe code.`,
    excerpt:
      "Discover essential TypeScript best practices that will improve your code quality and development experience.",
    coverImage:
      "https://via.placeholder.com/800x400/3178C6/FFFFFF?text=TypeScript+Guide",
    status: ArticleStatus.PUBLISHED,
    authorId: "user-2",
    author: mockUsers[1],
    categoryId: "cat-2",
    category: mockCategories[1],
    tags: [mockTags[0], mockTags[4], mockTags[6]],
    views: 2100,
    likes: 156,
    publishedAt: new Date("2024-01-25"),
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "article-3",
    title: "Building Lightning-Fast Apps with Vite",
    slug: "building-fast-apps-with-vite",
    content: `# Building Lightning-Fast Apps with Vite

Vite has become the go-to build tool for modern web applications. Let's explore why it's so fast and how to use it effectively.

## What Makes Vite Fast?

1. **ES Modules in Development**: No bundling during development
2. **Hot Module Replacement**: Instant updates
3. **Optimized Production Builds**: Using Rollup under the hood

## Setting Up a Project

\`\`\`bash
npm create vite@latest my-app
cd my-app
npm install
npm run dev
\`\`\`

## Configuration Tips

### Environment Variables

\`\`\`javascript
// vite.config.js
export default {
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  }
}
\`\`\`

### Plugin Ecosystem

Vite has a rich plugin ecosystem:

\`\`\`javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})
\`\`\`

Vite's developer experience is unmatched in the current ecosystem.`,
    excerpt:
      "Learn how Vite revolutionizes web development with its lightning-fast build times and excellent developer experience.",
    coverImage:
      "https://via.placeholder.com/800x400/646CFF/FFFFFF?text=Vite+Build+Tool",
    status: ArticleStatus.PUBLISHED,
    authorId: "user-3",
    author: mockUsers[2],
    categoryId: "cat-1",
    category: mockCategories[0],
    tags: [mockTags[2], mockTags[4], mockTags[7]],
    views: 980,
    likes: 67,
    publishedAt: new Date("2024-01-20"),
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "article-4",
    title: "Advanced Sigment Patterns: State Management and Custom Sigments",
    slug: "advanced-sigment-patterns",
    content: `# Advanced Sigment Patterns

Now that you're familiar with Sigment basics, let's explore advanced patterns for building complex applications.

## Global State Management

\`\`\`typescript
import { createGlobalSignal } from 'sigment';

// Create global state
createGlobalSignal('user', null);
createGlobalSignal('theme', 'light');

// Use in components
function UserProfile() {
  const [user] = signal('user');
  
  return div({ class: 'profile' },
    user() ? 
      div('Welcome ' + user().name) : 
      div('Please log in')
  );
}
\`\`\`

## Custom Sigments

Create reusable custom elements:

\`\`\`typescript
import { addSigment } from 'sigment';

// Define custom sigment
addSigment('user-card');

// Use globally
function UserList() {
  return div({ class: 'users' },
    users.map(user => 
      userCard({ userId: user.id }, user.name)
    )
  );
}
\`\`\`

## Effect Management

\`\`\`typescript
import { createEffect } from 'sigment';

function DataComponent() {
  const [data, setData] = signal([]);
  const [loading, setLoading] = signal(false);
  
  createEffect(() => {
    setLoading(true);
    fetchData().then(result => {
      setData(result);
      setLoading(false);
    });
  });
  
  return div(
    loading() ? 'Loading...' : 
    ul(data().map(item => li(item.name)))
  );
}
\`\`\`

These patterns enable building sophisticated reactive applications.`,
    excerpt:
      "Explore advanced Sigment patterns including global state management, custom sigments, and effect handling for complex applications.",
    coverImage:
      "https://via.placeholder.com/800x400/FF6B35/FFFFFF?text=Advanced+Sigment",
    status: ArticleStatus.DRAFT,
    authorId: "user-1",
    author: mockUsers[0],
    categoryId: "cat-3",
    category: mockCategories[2],
    tags: [mockTags[3], mockTags[6], mockTags[7]],
    views: 0,
    likes: 0,
    publishedAt: undefined,
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-02-05"),
  },
];

// Mock Comments
export const mockComments: Comment[] = [
  {
    id: "comment-1",
    content:
      "Great introduction to Sigment! The examples are very clear and helpful.",
    articleId: "article-1",
    article: mockArticles[0],
    authorId: "user-2",
    author: mockUsers[1],
    likes: 12,
    replies: [],
    createdAt: new Date("2024-02-02"),
    updatedAt: new Date("2024-02-02"),
  },
  {
    id: "comment-2",
    content:
      "I love how lightweight Sigment is compared to other frameworks. Can't wait to try it in my next project!",
    articleId: "article-1",
    article: mockArticles[0],
    authorId: "user-3",
    author: mockUsers[2],
    likes: 8,
    replies: [],
    createdAt: new Date("2024-02-03"),
    updatedAt: new Date("2024-02-03"),
  },
  {
    id: "comment-3",
    content:
      "Thanks for the detailed explanation! Quick question: how does Sigment handle complex state management in larger applications?",
    articleId: "article-1",
    article: mockArticles[0],
    authorId: "user-2",
    author: mockUsers[1],
    likes: 5,
    replies: [],
    createdAt: new Date("2024-02-04"),
    updatedAt: new Date("2024-02-04"),
  },
  {
    id: "comment-4",
    content:
      "@janesmith Great question! I'm actually working on an advanced patterns article that covers exactly that. Should be published soon!",
    articleId: "article-1",
    article: mockArticles[0],
    authorId: "user-1",
    author: mockUsers[0],
    parentId: "comment-3",
    likes: 15,
    replies: [],
    createdAt: new Date("2024-02-04"),
    updatedAt: new Date("2024-02-04"),
  },
  {
    id: "comment-5",
    content:
      "Excellent TypeScript tips! The utility types section was particularly useful.",
    articleId: "article-2",
    article: mockArticles[1],
    authorId: "user-3",
    author: mockUsers[2],
    likes: 9,
    replies: [],
    createdAt: new Date("2024-01-26"),
    updatedAt: new Date("2024-01-26"),
  },
];

// Update comment references
mockComments[2].replies = [mockComments[3]];

// Helper functions for working with mock data
export const mockDataHelpers = {
  // Get articles with pagination
  getArticles: (page = 1, limit = 10, filters: any = {}) => {
    let filtered = [...mockArticles];

    // Apply filters
    if (filters.status) {
      filtered = filtered.filter(
        (article) => article.status === filters.status
      );
    }
    if (filters.categoryId) {
      filtered = filtered.filter(
        (article) => article.categoryId === filters.categoryId
      );
    }
    if (filters.authorId) {
      filtered = filtered.filter(
        (article) => article.authorId === filters.authorId
      );
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm) ||
          article.content.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.sortBy) {
      filtered.sort((a, b) => {
        const aVal = a[filters.sortBy as keyof Article];
        const bVal = b[filters.sortBy as keyof Article];

        if (filters.sortOrder === "desc") {
          if (bVal === undefined && aVal === undefined) return 0;
          if (bVal === undefined) return -1;
          if (aVal === undefined) return 1;
          return bVal > aVal ? 1 : -1;
        }
        if (aVal === undefined && bVal === undefined) return 0;
        if (aVal === undefined) return -1;
        if (bVal === undefined) return 1;
        return aVal > bVal ? 1 : -1;
      });
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedArticles = filtered.slice(startIndex, endIndex);

    return {
      articles: paginatedArticles,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(filtered.length / limit),
        totalItems: filtered.length,
        itemsPerPage: limit,
        hasNext: endIndex < filtered.length,
        hasPrevious: page > 1,
      },
    };
  },

  // Get article by ID or slug
  getArticle: (identifier: string) => {
    return mockArticles.find(
      (article) => article.id === identifier || article.slug === identifier
    );
  },

  // Get comments for article
  getComments: (articleId: string) => {
    return mockComments.filter((comment) => comment.articleId === articleId);
  },

  // Get user by ID
  getUser: (userId: string) => {
    return mockUsers.find((user) => user.id === userId);
  },

  // Get category by ID or slug
  getCategory: (identifier: string) => {
    return mockCategories.find(
      (category) => category.id === identifier || category.slug === identifier
    );
  },

  // Get articles by category
  getArticlesByCategory: (categoryId: string) => {
    return mockArticles.filter((article) => article.categoryId === categoryId);
  },

  // Get articles by author
  getArticlesByAuthor: (authorId: string) => {
    return mockArticles.filter((article) => article.authorId === authorId);
  },
};
