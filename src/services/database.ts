import { PrismaClient } from "../generated/prisma";
import type { Article, Category, User, Tag } from "../types";

const prisma = new PrismaClient();

export class ArticleService {
  static async getAllPublished(): Promise<Article[]> {
    try {
      console.log("Fetching published articles...");
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

      console.log("Found articles:", articles.length);

      // Transform to match our interface
      const transformedArticles = articles.map((article) => ({
        ...article,
        tags: article.tags.map((at) => at.tag),
      })) as unknown as Article[];

      console.log("Transformed articles:", transformedArticles.length);
      return transformedArticles;
    } catch (error) {
      console.error("Error in getAllPublished:", error);
      throw error;
    }
  }

  static async getBySlug(slug: string): Promise<Article | null> {
    const article = await prisma.article.findUnique({
      where: {
        slug,
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

    if (!article) return null;

    return {
      ...article,
      tags: article.tags.map((at) => at.tag),
    } as unknown as Article;
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
    return (await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    })) as Category[];
  }
}

export class UserService {
  static async getAll(): Promise<User[]> {
    return (await prisma.user.findMany({
      orderBy: {
        firstName: "asc",
      },
    })) as User[];
  }
}
