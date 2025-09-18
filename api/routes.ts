import express, { Request, Response } from "express";
import cors from "cors";
import {
  ArticleService,
  CategoryService,
  TagService,
  UserService,
} from "../src/services/database";

const router = express.Router();

router.use(cors());

router.use(express.json());

// =================== AUTHENTICATION API ===================

// POST /api/auth/login - Login user
router.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }
    // Validate credentials
    const user = await UserService.validateCredentials(email, password);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    // Generate jwt session token
    const token = `prisma-session-${user.id}-${Date.now()}`;

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          bio: user.bio,
        },
        token: token,
      },
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Login failed",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// GET /api/auth/me - Get current user
router.get("/auth/me", async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token || !token.startsWith("prisma-session-")) {
      return res.status(401).json({
        success: false,
        error: "Invalid or missing token",
      });
    }

    // Extract user ID from token
    const tokenParts = token.split("-");
    const userId = tokenParts[2];
    const user = await UserService.findById(userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          bio: user.bio,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to get user",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// =================== ARTICLES API ===================

// GET /api/articles - Get all articles
router.get("/articles", async (req: Request, res: Response) => {
  try {
    const articles = await ArticleService.getAllPublished();
    res.json({
      success: true,
      data: articles,
      count: articles.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch articles",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// GET /api/articles/:slug - Get article by slug
router.get("/articles/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const article = await ArticleService.getBySlug(slug);

    if (!article) {
      return res.status(404).json({
        success: false,
        error: "Article not found",
      });
    }

    // Increment view count
    await ArticleService.incrementViews(article.id);

    res.json({
      success: true,
      data: article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch article",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// POST /api/articles - Create new article
router.post("/articles", async (req: Request, res: Response) => {
  try {
    // Check authentication
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token || !token.startsWith("prisma-session-")) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
      });
    }

    const tokenParts = token.split("-");
    const userId = tokenParts[2];
    const user = await UserService.findById(userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found",
      });
    }

    const {
      title,
      content,
      excerpt,
      categoryId,
      tagIds,
      coverImage,
      status = "DRAFT",
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: title, content",
      });
    }

    const articleExcerpt = excerpt || content.substring(0, 150) + "...";

    const article = await ArticleService.create({
      title,
      content,
      excerpt: articleExcerpt,
      coverImage: coverImage || null,
      categoryId: categoryId || null,
      tagIds: tagIds || [],
      status,
      authorId: user.id, // Use authenticated user's ID
    });

    res.status(201).json({
      success: true,
      data: article,
      message: "Article created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create article",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// PUT /api/articles/:id - Update article
router.put("/articles/:id", async (req: Request, res: Response) => {
  try {
    const {
      title,
      content,
      excerpt,
      coverImage,
      categoryId,
      hashtags,
      status,
    } = req.body;

    const updateData = {
      title,
      content,
      excerpt,
      coverImage,
      categoryId,
      hashtags,
      status,
    };

    const article = await ArticleService.update(req.params.id, updateData);

    if (!article) {
      return res.status(404).json({
        success: false,
        error: "Article not found",
      });
    }

    res.json({
      success: true,
      data: article,
      message: "Article updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update article",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// DELETE /api/articles/:id - Delete article
router.delete("/articles/:id", async (req: Request, res: Response) => {
  try {
    const deleted = await ArticleService.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "Article not found",
      });
    }

    res.json({
      success: true,
      message: "Article deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete article",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// PATCH /api/articles/:id/publish - Publish/unpublish article
router.patch("/articles/:id/publish", async (req: Request, res: Response) => {
  try {
    const { status } = req.body; // 'PUBLISHED' or 'DRAFT'

    const article = await ArticleService.updateStatus(req.params.id, status);

    if (!article) {
      return res.status(404).json({
        success: false,
        error: "Article not found",
      });
    }

    res.json({
      success: true,
      data: article,
      message: `Article ${status.toLowerCase()} successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update article status",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// =================== REFERENCE DATA ===================

// GET /api/categories - Get all categories
router.get("/categories", async (req: Request, res: Response) => {
  try {
    const categories = await CategoryService.getAll();
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch categories",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// GET /api/tags - Get all tags
router.get("/tags", async (req: Request, res: Response) => {
  try {
    const tags = await TagService.getAll();
    res.json({
      success: true,
      data: tags,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch tags",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Health check
router.get("/health", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "API is healthy",
    timestamp: new Date().toISOString(),
  });
});

export default router;
