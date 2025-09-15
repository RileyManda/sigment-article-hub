import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

export class ArticleService {
  static async getAllPublished() {
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
      
      // Transform the data to match our interface
      const transformedArticles = articles.map(article => ({
        ...article,
        tags: article.tags.map(at => at.tag), // Flatten the tag relationship
      }));

      return transformedArticles;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw new Error("Failed to fetch articles");
    }
  }

  static async getById(id) {
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

      // Transform the data to match our interface
      return {
        ...article,
        tags: article.tags.map(at => at.tag), // Flatten the tag relationship
      };
    } catch (error) {
      console.error("Error fetching article:", error);
      throw new Error("Failed to fetch article");
    }
  }
}

export class CategoryService {
  static async getAll() {
    try {
      return await prisma.category.findMany({
        orderBy: { name: 'asc' }
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Failed to fetch categories");
    }
  }
}

export class UserService {
  static async getAll() {
    try {
      return await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  }
}
