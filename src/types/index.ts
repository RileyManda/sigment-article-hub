

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  status: ArticleStatus;
  authorId: string;
  author: User;
  categoryId: string;
  category: Category;
  tags: Tag[];
  views: number;
  likes: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  articleId: string;
  article: Article;
  authorId: string;
  author: User;
  parentId?: string;
  parent?: Comment;
  replies: Comment[];
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

// Enums
export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

// DTOs for API operations
export interface CreateArticleDto {
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  status: ArticleStatus;
  categoryId: string;
  tagIds: string[];
}

export interface UpdateArticleDto extends Partial<CreateArticleDto> {
  id: string;
}

export interface CreateUserDto {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  bio?: string;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
}

export interface CreateTagDto {
  name: string;
  color?: string;
}

export interface CreateCommentDto {
  content: string;
  articleId: string;
  parentId?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

// Query parameters
export interface ArticleQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  authorId?: string;
  status?: ArticleStatus;
  sortBy?: 'createdAt' | 'updatedAt' | 'publishedAt' | 'views' | 'likes';
  sortOrder?: 'asc' | 'desc';
  tags?: string[];
}

export interface UserQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'createdAt' | 'username' | 'email';
  sortOrder?: 'asc' | 'desc';
}

// UI State types
export interface ArticleFormState {
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  status: ArticleStatus;
  categoryId: string;
  selectedTags: string[];
  isSubmitting: boolean;
  errors: Record<string, string>;
}

export interface ArticleListState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  pagination: PaginationMeta;
  filters: ArticleQueryParams;
}
