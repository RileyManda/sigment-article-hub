import type { Article, User, Category, Tag } from "../types";
import { ArticleStatus } from "../types";

// Mock users
const mockUsers: User[] = [
  {
    id: "1",
    username: "johndoe",
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Full-stack developer passionate about modern web technologies.",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-03-10"),
  },
  {
    id: "2",
    username: "janesmith",
    email: "jane@example.com",
    firstName: "Jane",
    lastName: "Smith",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "UI/UX designer and frontend enthusiast.",
    createdAt: new Date("2023-02-20"),
    updatedAt: new Date("2024-03-15"),
  },
  {
    id: "3",
    username: "mikejohnson",
    email: "mike@example.com",
    firstName: "Mike",
    lastName: "Johnson",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "DevOps engineer and cloud architecture specialist.",
    createdAt: new Date("2023-03-05"),
    updatedAt: new Date("2024-03-20"),
  },
];

// Mock categories
const mockCategories: Category[] = [
  {
    id: "1",
    name: "Technology",
    slug: "technology",
    description: "Latest trends and insights in technology",
    color: "#3B82F6",
    icon: "💻",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Design",
    slug: "design",
    description: "UI/UX design tips and best practices",
    color: "#EF4444",
    icon: "🎨",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    name: "Web Development",
    slug: "web-development",
    description: "Web development tutorials and guides",
    color: "#10B981",
    icon: "🌐",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "4",
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
    description: "AI and machine learning insights",
    color: "#8B5CF6",
    icon: "🤖",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

// Mock tags
const mockTags: Tag[] = [
  {
    id: "1",
    name: "JavaScript",
    slug: "javascript",
    color: "#F7DF1E",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "TypeScript",
    slug: "typescript",
    color: "#3178C6",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "React",
    slug: "react",
    color: "#61DAFB",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Vue.js",
    slug: "vuejs",
    color: "#4FC08D",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "CSS",
    slug: "css",
    color: "#1572B6",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    name: "Node.js",
    slug: "nodejs",
    color: "#339933",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "7",
    name: "AI",
    slug: "ai",
    color: "#FF6B35",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "8",
    name: "Machine Learning",
    slug: "machine-learning",
    color: "#FF6B6B",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "9",
    name: "Design System",
    slug: "design-system",
    color: "#845EF7",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "10",
    name: "Performance",
    slug: "performance",
    color: "#FA5252",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Mock articles
export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Getting Started with Sigment: A Modern Reactive Framework",
    slug: "getting-started-with-sigment",
    content: `# Getting Started with Sigment: A Modern Reactive Framework

Sigment is a lightweight, reactive framework that offers a fresh approach to building modern web applications. Unlike traditional frameworks, Sigment operates without a virtual DOM and doesn't require JSX, making it incredibly fast and efficient.

## Why Choose Sigment?

### Performance First
Sigment's direct DOM manipulation approach eliminates the overhead of virtual DOM diffing, resulting in lightning-fast updates and better performance.

### No Build Step Required
Write pure JavaScript or TypeScript without the need for complex build configurations or JSX transpilation.

### Fine-Grained Reactivity
Only the parts of your UI that actually change will update, thanks to Sigment's signal-based reactivity system.

## Basic Example

\`\`\`typescript
import { signal } from 'sigment';

function Counter() {
  const [count, setCount] = signal(0);

  return div({ id: 'counter' },
    button({ onClick: () => setCount(count() + 1) }, 'Increment'),
    p(() => \`Count is: \${count()}\`)
  );
}
\`\`\`

## Key Features

1. **Lightweight Runtime**: Less than 5KB gzipped
2. **Zero Dependencies**: No external dependencies required
3. **TypeScript Ready**: Full TypeScript support out of the box
4. **Modern Syntax**: Clean, readable code without JSX overhead

Sigment represents the future of web development - fast, simple, and powerful.`,
    excerpt:
      "Learn how Sigment offers a modern approach to building reactive web applications without virtual DOM overhead.",
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    status: "PUBLISHED" as ArticleStatus,
    authorId: "1",
    author: mockUsers[0],
    categoryId: "3",
    category: mockCategories[2], // Web Development
    tags: [mockTags[0], mockTags[1], mockTags[9]], // JavaScript, TypeScript, Performance
    views: 1250,
    likes: 89,
    publishedAt: new Date("2024-09-10"),
    createdAt: new Date("2024-09-08"),
    updatedAt: new Date("2024-09-10"),
  },
  {
    id: "2",
    title: "Modern CSS Techniques for Better User Interfaces",
    slug: "modern-css-techniques",
    content: `# Modern CSS Techniques for Better User Interfaces

CSS has evolved tremendously over the past few years. Modern CSS offers powerful features that make creating beautiful, responsive, and interactive user interfaces easier than ever.

## CSS Grid and Flexbox

### CSS Grid for Layout
CSS Grid provides a two-dimensional layout system that's perfect for complex layouts:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

### Flexbox for Components
Flexbox excels at one-dimensional layouts and component alignment:

\`\`\`css
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
\`\`\`

## Custom Properties (CSS Variables)

CSS custom properties enable dynamic theming and better maintainability:

\`\`\`css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --border-radius: 8px;
}

.button {
  background-color: var(--primary-color);
  border-radius: var(--border-radius);
}
\`\`\`

## Advanced Selectors

Modern CSS selectors provide powerful targeting capabilities:

\`\`\`css
/* Select every third item */
.item:nth-child(3n) {
  margin-right: 0;
}

/* Select items that don't have a specific class */
.item:not(.featured) {
  opacity: 0.8;
}
\`\`\`

## Container Queries

Container queries allow responsive design based on container size:

\`\`\`css
@container (min-width: 400px) {
  .card {
    display: flex;
  }
}
\`\`\`

These modern CSS techniques help create more maintainable, flexible, and beautiful user interfaces.`,
    excerpt:
      "Explore modern CSS techniques including Grid, Flexbox, custom properties, and container queries.",
    coverImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    status: "PUBLISHED" as ArticleStatus,
    authorId: "2",
    author: mockUsers[1],
    categoryId: "2",
    category: mockCategories[1], // Design
    tags: [mockTags[4], mockTags[8]], // CSS, Design System
    views: 987,
    likes: 67,
    publishedAt: new Date("2024-09-12"),
    createdAt: new Date("2024-09-10"),
    updatedAt: new Date("2024-09-12"),
  },
  {
    id: "3",
    title: "The Future of AI in Web Development",
    slug: "future-of-ai-web-development",
    content: `# The Future of AI in Web Development

Artificial Intelligence is revolutionizing the way we build web applications. From automated code generation to intelligent user experiences, AI is becoming an integral part of modern web development.

## AI-Powered Development Tools

### Code Generation
AI tools like GitHub Copilot and ChatGPT are transforming how developers write code:

- **Faster Development**: Auto-completion and code suggestions
- **Better Quality**: AI can suggest best practices and optimizations
- **Learning Aid**: Helps developers learn new patterns and techniques

### Automated Testing
AI can generate test cases and identify potential bugs:

\`\`\`typescript
// AI-generated test cases
describe('User Authentication', () => {
  it('should validate email format', () => {
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('valid@email.com')).toBe(true);
  });
});
\`\`\`

## Intelligent User Experiences

### Personalization
AI enables personalized content delivery:

- **Content Recommendations**: Suggest relevant articles or products
- **Dynamic UI**: Adapt interface based on user behavior
- **Smart Search**: Understand user intent beyond keywords

### Natural Language Interfaces
Chatbots and voice interfaces are becoming more sophisticated:

\`\`\`typescript
const chatbot = new AIAssistant({
  model: 'gpt-4',
  context: 'web development support',
  capabilities: ['code-review', 'debugging', 'architecture-advice']
});
\`\`\`

## Performance Optimization

AI can optimize web applications automatically:

- **Image Optimization**: Smart compression and format selection
- **Code Splitting**: Intelligent bundle optimization
- **Caching Strategies**: Predictive content caching

## The Road Ahead

The integration of AI in web development will continue to accelerate, making development more efficient while enabling new types of user experiences.

Key areas to watch:
1. **No-Code/Low-Code**: AI-powered visual development tools
2. **Accessibility**: Automated accessibility improvements
3. **Security**: AI-driven threat detection and prevention

The future of web development is not about replacing developers, but empowering them with intelligent tools.`,
    excerpt:
      "Discover how AI is transforming web development with automated tools, intelligent UX, and performance optimization.",
    coverImage:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=400&fit=crop",
    status: "PUBLISHED" as ArticleStatus,
    authorId: "3",
    author: mockUsers[2],
    categoryId: "4",
    category: mockCategories[3], // AI
    tags: [mockTags[6], mockTags[7], mockTags[0]], // AI, Machine Learning, JavaScript
    views: 1456,
    likes: 102,
    publishedAt: new Date("2024-09-14"),
    createdAt: new Date("2024-09-12"),
    updatedAt: new Date("2024-09-14"),
  },
  {
    id: "4",
    title: "Building Scalable Node.js Applications",
    slug: "building-scalable-nodejs-applications",
    content: `# Building Scalable Node.js Applications

Node.js has become the go-to runtime for building scalable server-side applications. This guide covers best practices for creating Node.js applications that can handle growth and scale effectively.

## Architecture Patterns

### Microservices Architecture
Breaking your application into smaller, independent services:

\`\`\`typescript
// User Service
class UserService {
  async getUser(id: string) {
    return await this.userRepository.findById(id);
  }
  
  async createUser(userData: CreateUserDto) {
    return await this.userRepository.create(userData);
  }
}

// Article Service
class ArticleService {
  async getArticles(filters: ArticleFilters) {
    return await this.articleRepository.findMany(filters);
  }
}
\`\`\`

### Event-Driven Architecture
Using events for loose coupling between components:

\`\`\`typescript
import { EventEmitter } from 'events';

class ArticleEventHandler extends EventEmitter {
  constructor() {
    super();
    this.on('article:created', this.handleArticleCreated);
    this.on('article:published', this.handleArticlePublished);
  }

  private async handleArticleCreated(article: Article) {
    // Send notification, update search index, etc.
  }
}
\`\`\`

## Performance Optimization

### Caching Strategies
Implement multiple layers of caching:

\`\`\`typescript
import Redis from 'ioredis';

class CacheService {
  private redis = new Redis(process.env.REDIS_URL);

  async get<T>(key: string): Promise<T | null> {
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  async set(key: string, value: any, ttl = 3600) {
    await this.redis.setex(key, ttl, JSON.stringify(value));
  }
}
\`\`\`

### Database Optimization
- **Connection Pooling**: Manage database connections efficiently
- **Query Optimization**: Use indexes and optimize queries
- **Read Replicas**: Distribute read operations

### Load Balancing
Distribute traffic across multiple instances:

\`\`\`typescript
// Using PM2 for clustering
module.exports = {
  apps: [{
    name: 'article-hub',
    script: './dist/server.js',
    instances: 'max', // Use all CPU cores
    exec_mode: 'cluster'
  }]
};
\`\`\`

## Error Handling and Monitoring

### Centralized Error Handling
\`\`\`typescript
class ErrorHandler {
  static handle(error: Error, req: Request, res: Response, next: NextFunction) {
    console.error(error.stack);
    
    // Log to monitoring service
    logger.error('Unhandled error', { error: error.message, stack: error.stack });
    
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
\`\`\`

### Health Checks
\`\`\`typescript
app.get('/health', async (req, res) => {
  const health = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    database: await checkDatabaseHealth(),
    redis: await checkRedisHealth()
  };
  
  res.json(health);
});
\`\`\`

## Security Best Practices

1. **Input Validation**: Validate all user inputs
2. **Rate Limiting**: Prevent abuse with rate limits
3. **Authentication**: Use secure authentication methods
4. **HTTPS**: Always use HTTPS in production
5. **Security Headers**: Implement security headers

Building scalable Node.js applications requires careful planning, proper architecture, and adherence to best practices.`,
    excerpt:
      "Learn best practices for building scalable Node.js applications with proper architecture, caching, and optimization.",
    coverImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    status: "PUBLISHED" as ArticleStatus,
    authorId: "1",
    author: mockUsers[0],
    categoryId: "1",
    category: mockCategories[0], // Technology
    tags: [mockTags[5], mockTags[0], mockTags[9]], // Node.js, JavaScript, Performance
    views: 876,
    likes: 54,
    publishedAt: new Date("2024-09-15"),
    createdAt: new Date("2024-09-13"),
    updatedAt: new Date("2024-09-15"),
  },
  {
    id: "5",
    title: "TypeScript Best Practices for Large Applications",
    slug: "typescript-best-practices",
    content: `# TypeScript Best Practices for Large Applications

TypeScript has become essential for building maintainable large-scale applications. This guide covers best practices that will help you write better TypeScript code.

## Type Safety Fundamentals

### Strict Configuration
Always use strict mode in your \`tsconfig.json\`:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
\`\`\`

### Utility Types
Leverage TypeScript's built-in utility types:

\`\`\`typescript
// Pick only specific properties
type ArticlePreview = Pick<Article, 'id' | 'title' | 'excerpt' | 'coverImage'>;

// Make all properties optional
type PartialArticle = Partial<Article>;

// Make specific properties required
type RequiredArticleFields = Required<Pick<Article, 'title' | 'content'>>;
\`\`\`

## Advanced Type Patterns

### Conditional Types
\`\`\`typescript
type ApiResponse<T, E = Error> = T extends string 
  ? { success: true; data: T } 
  : { success: false; error: E };

// Usage
type UserResponse = ApiResponse<User>; // { success: true; data: User }
type ErrorResponse = ApiResponse<never, string>; // { success: false; error: string }
\`\`\`

### Mapped Types
\`\`\`typescript
// Create validation types
type ValidationRules<T> = {
  [K in keyof T]?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
};

const articleValidation: ValidationRules<Article> = {
  title: { required: true, minLength: 1, maxLength: 200 },
  content: { required: true, minLength: 10 },
  email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
};
\`\`\`

### Template Literal Types
\`\`\`typescript
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiRoute = \`/api/\${string}\`;
type ApiEndpoint = \`\${HttpMethod} \${ApiRoute}\`;

// Usage
const endpoint: ApiEndpoint = 'GET /api/articles'; // ✅ Valid
const invalid: ApiEndpoint = 'INVALID /api/users'; // ❌ Type error
\`\`\`

## Code Organization

### Barrel Exports
Organize exports in index files:

\`\`\`typescript
// types/index.ts
export type { User, Article, Category } from './models';
export type { CreateUserDto, UpdateUserDto } from './dtos';
export type { ApiResponse, PaginatedResponse } from './api';
\`\`\`

### Namespace Organization
\`\`\`typescript
namespace API {
  export namespace Articles {
    export interface GetRequest {
      page?: number;
      limit?: number;
      category?: string;
    }
    
    export interface GetResponse extends PaginatedResponse<Article> {}
  }
  
  export namespace Users {
    export interface CreateRequest extends CreateUserDto {}
    export interface CreateResponse extends ApiResponse<User> {}
  }
}
\`\`\`

## Error Handling

### Discriminated Unions for Errors
\`\`\`typescript
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

async function getArticle(id: string): Promise<Result<Article, string>> {
  try {
    const article = await articleService.findById(id);
    return { success: true, data: article };
  } catch (error) {
    return { success: false, error: 'Article not found' };
  }
}

// Usage with type guards
const result = await getArticle('123');
if (result.success) {
  console.log(result.data.title); // TypeScript knows this is Article
} else {
  console.error(result.error); // TypeScript knows this is string
}
\`\`\`

## Performance Considerations

### Type-Only Imports
\`\`\`typescript
// Runtime import
import { User } from './types';

// Type-only import (better for build performance)
import type { User } from './types';
\`\`\`

### Const Assertions
\`\`\`typescript
// Instead of this
const statuses = ['draft', 'published', 'archived'];
type Status = string; // Too broad

// Use const assertion
const statuses = ['draft', 'published', 'archived'] as const;
type Status = typeof statuses[number]; // 'draft' | 'published' | 'archived'
\`\`\`

Following these TypeScript best practices will help you build more maintainable and type-safe applications.`,
    excerpt:
      "Master TypeScript best practices for large applications including advanced types, error handling, and performance.",
    coverImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    status: "PUBLISHED" as ArticleStatus,
    authorId: "2",
    author: mockUsers[1],
    categoryId: "1",
    category: mockCategories[0], // Technology
    tags: [mockTags[1], mockTags[0]], // TypeScript, JavaScript
    views: 743,
    likes: 45,
    publishedAt: new Date("2024-09-16"),
    createdAt: new Date("2024-09-14"),
    updatedAt: new Date("2024-09-16"),
  },
];

// Export service functions
export const MockArticleService = {
  async getAllPublished(): Promise<Article[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockArticles.filter(
      (article) => article.status === ArticleStatus.PUBLISHED
    );
  },

  async getById(id: string): Promise<Article | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockArticles.find((article) => article.id === id) || null;
  },

  async getByCategory(categoryId: string): Promise<Article[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockArticles.filter(
      (article) =>
        article.categoryId === categoryId &&
        article.status === ("PUBLISHED" as ArticleStatus)
    );
  },
};

export { mockUsers, mockCategories, mockTags };
