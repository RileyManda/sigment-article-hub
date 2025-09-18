import { PrismaClient } from "../generated/prisma/index.js";
import type { Article, Category, User, Tag } from "../types";

const prisma = new PrismaClient();

export class ArticleService {
  static async getAllPublished(): Promise<Article[]> {
    try {
      const articles = await prisma.article.findMany({
        where: {
          status: "PUBLISHED",
        },
        include: {
          author: true,
          category: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
        orderBy: {
          publishedAt: "desc",
        },
      });
      const transformedArticles = articles.map((article) => ({
        ...article,
        coverImage: article.coverImage || undefined,
        tags: article.tags.map((at: any) => ({
          ...at.tag,
          color: at.tag.color || undefined,
        })),
      }));

      return transformedArticles as unknown as Article[];
    } catch (error) {
      throw new Error("Failed to fetch articles");
    }
  }

  static async getBySlug(slug: string): Promise<Article | null> {
    try {
      const article = await prisma.article.findUnique({
        where: { slug },
        include: {
          author: true,
          category: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      if (!article) {
        return null;
      }

      return {
        ...article,
        coverImage: article.coverImage || undefined,
        tags: article.tags.map((at: any) => ({
          ...at.tag,
          color: at.tag.color || undefined,
        })),
      } as unknown as Article;
    } catch (error) {
      throw new Error("Failed to fetch article");
    }
  }

  static async getById(id: string): Promise<Article | null> {
    try {
      const article = await prisma.article.findUnique({
        where: { id },
        include: {
          author: true,
          category: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      if (!article) {
        return null;
      }
      return {
        ...article,
        coverImage: article.coverImage || undefined,
        tags: article.tags.map((at: any) => ({
          ...at.tag,
          color: at.tag.color || undefined,
        })),
      } as unknown as Article;
    } catch (error) {
      throw new Error("Failed to fetch article");
    }
  }

  static async create(data: any): Promise<Article> {
    try {
      const { tagIds, hashtags, ...articleData } = data;
      const slug =
        data.slug ||
        data.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      let finalTagIds = tagIds || [];
      if (hashtags && hashtags.length > 0) {
        const hashtagTagIds = await TagService.findOrCreateFromHashtags(
          hashtags
        );
        finalTagIds = [...finalTagIds, ...hashtagTagIds];
      }

      const article = await prisma.article.create({
        data: {
          ...articleData,
          slug,
          publishedAt: data.status === "PUBLISHED" ? new Date() : null,
          tags: finalTagIds?.length
            ? {
                create: finalTagIds.map((tagId: string) => ({
                  tag: { connect: { id: tagId } },
                })),
              }
            : undefined,
        },
        include: {
          author: true,
          category: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      return {
        ...article,
        coverImage: article.coverImage || undefined,
        tags: article.tags.map((at: any) => ({
          ...at.tag,
          color: at.tag.color || undefined,
        })),
      } as unknown as Article;
    } catch (error) {
      throw new Error("Failed to create article");
    }
  }

  static async update(id: string, data: any): Promise<Article | null> {
    try {
      const { tagIds, hashtags, ...articleData } = data;
      if (data.title) {
        articleData.slug = data.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }
      let finalTagIds = tagIds;
      if (hashtags && hashtags.length > 0) {
        const hashtagTagIds = await TagService.findOrCreateFromHashtags(
          hashtags
        );
        finalTagIds = hashtagTagIds;
      }

      const article = await prisma.article.update({
        where: { id },
        data: {
          ...articleData,
          tags: finalTagIds
            ? {
                deleteMany: {},
                create: finalTagIds.map((tagId: string) => ({
                  tag: { connect: { id: tagId } },
                })),
              }
            : undefined,
        },
        include: {
          author: true,
          category: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      return {
        ...article,
        coverImage: article.coverImage || undefined,
        tags: article.tags.map((at: any) => ({
          ...at.tag,
          color: at.tag.color || undefined,
        })),
      } as unknown as Article;
    } catch (error) {
      if ((error as any).code === "P2025") {
        return null;
      }
      throw new Error("Failed to update article");
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      await prisma.articleTag.deleteMany({
        where: { articleId: id },
      });

      await prisma.article.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      if ((error as any).code === "P2025") {
        return false;
      }
      throw new Error("Failed to delete article");
    }
  }

  static async updateStatus(
    id: string,
    status: string
  ): Promise<Article | null> {
    try {
      const article = await prisma.article.update({
        where: { id },
        data: {
          status: status as any,
          publishedAt: status === "PUBLISHED" ? new Date() : null,
        },
        include: {
          author: true,
          category: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      return {
        ...article,
        coverImage: article.coverImage || undefined,
        tags: article.tags.map((at: any) => ({
          ...at.tag,
          color: at.tag.color || undefined,
        })),
      } as unknown as Article;
    } catch (error) {
      if ((error as any).code === "P2025") {
        return null;
      }
      throw new Error("Failed to update article status");
    }
  }

  static async incrementViews(id: string): Promise<void> {
    await prisma.article.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  }
}

export class CategoryService {
  static async getAll(): Promise<Category[]> {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
      });
      return categories.map((cat) => ({
        ...cat,
        description: cat.description || undefined,
        color: cat.color || undefined,
        icon: cat.icon || undefined,
      })) as Category[];
    } catch (error) {
      throw new Error("Failed to fetch categories");
    }
  }

  static async create(data: any): Promise<Category> {
    try {
      const slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const category = await prisma.category.create({
        data: {
          ...data,
          slug,
        },
      });
      return {
        ...category,
        description: category.description || undefined,
        color: category.color || undefined,
        icon: category.icon || undefined,
      } as Category;
    } catch (error) {
      throw new Error("Failed to create category");
    }
  }

  static async update(id: string, data: any): Promise<Category | null> {
    try {
      if (data.name) {
        data.slug = data.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }

      const category = await prisma.category.update({
        where: { id },
        data,
      });
      return {
        ...category,
        description: category.description || undefined,
        color: category.color || undefined,
        icon: category.icon || undefined,
      } as Category;
    } catch (error) {
      if ((error as any).code === "P2025") {
        return null;
      }
      throw new Error("Failed to update category");
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      await prisma.category.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      if ((error as any).code === "P2025") {
        return false;
      }
      throw new Error("Failed to delete category");
    }
  }
}

export class UserService {
  static async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user as User | null;
  }

  static async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user as User | null;
  }

  static async validateCredentials(
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return null;
      }

      // For demo purposes, we'll use a simple password check
      // In production, you'd use proper password hashing (bcrypt, etc.)
      if (user.password === password) {
        return user as User;
      }

      return null;
    } catch (error) {
      throw new Error("Failed to validate credentials");
    }
  }

  static async getAll(): Promise<User[]> {
    try {
      const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
      });
      return users as User[];
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  }
}

export class TagService {
  static async findOrCreateFromHashtags(hashtags: string[]): Promise<string[]> {
    try {
      const tagIds: string[] = [];

      for (const hashtag of hashtags) {
        const cleanName = hashtag.replace(/^#+/, "").toLowerCase().trim();
        if (!cleanName) continue;
        let existingTag = await prisma.tag.findFirst({
          where: {
            OR: [
              { name: { equals: cleanName, mode: "insensitive" } },
              {
                slug: {
                  equals: cleanName
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, ""),
                  mode: "insensitive",
                },
              },
            ],
          },
        });

        if (!existingTag) {
          const slug = cleanName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

          existingTag = await prisma.tag.create({
            data: {
              name: cleanName,
              slug: slug,
              color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            },
          });
        }

        tagIds.push(existingTag.id);
      }

      return tagIds;
    } catch (error) {
      throw new Error("Failed to process hashtags");
    }
  }

  static async getAll(): Promise<Tag[]> {
    try {
      const tags = await prisma.tag.findMany({
        orderBy: { name: "asc" },
      });
      return tags.map((tag) => ({
        ...tag,
        color: tag.color || undefined,
      })) as Tag[];
    } catch (error) {
      throw new Error("Failed to fetch tags");
    }
  }

  static async create(data: any): Promise<Tag> {
    try {
      const slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const tag = await prisma.tag.create({
        data: {
          ...data,
          slug,
        },
      });
      return {
        ...tag,
        color: tag.color || undefined,
      } as Tag;
    } catch (error) {
      throw new Error("Failed to create tag");
    }
  }

  static async update(id: string, data: any): Promise<Tag | null> {
    try {
      if (data.name) {
        data.slug = data.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }

      const tag = await prisma.tag.update({
        where: { id },
        data,
      });
      return {
        ...tag,
        color: tag.color || undefined,
      } as Tag;
    } catch (error) {
      if ((error as any).code === "P2025") {
        return null;
      }
      throw new Error("Failed to update tag");
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      await prisma.articleTag.deleteMany({
        where: { tagId: id },
      });

      await prisma.tag.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      if ((error as any).code === "P2025") {
        return false;
      }
      throw new Error("Failed to delete tag");
    }
  }
}
