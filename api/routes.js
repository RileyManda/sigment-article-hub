import express from 'express';
import cors from 'cors';
import { ArticleService, CategoryService, UserService } from '../src/services/database.js';

const router = express.Router();

// Enable CORS for API routes
router.use(cors());

// Parse JSON bodies
router.use(express.json());

// Articles endpoints
router.get('/articles', async (req, res) => {
  try {
    console.log('API: Fetching articles...');
    const articles = await ArticleService.getAllPublished();
    console.log(`API: Found ${articles.length} articles`);
    res.json({
      success: true,
      data: articles,
      count: articles.length
    });
  } catch (error) {
    console.error('API Error fetching articles:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch articles',
      message: error.message
    });
  }
});

router.get('/articles/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await ArticleService.getBySlug(slug);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found'
      });
    }

    // Increment view count
    await ArticleService.incrementViews(article.id);

    res.json({
      success: true,
      data: article
    });
  } catch (error) {
    console.error('API Error fetching article:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch article',
      message: error.message
    });
  }
});

// Categories endpoints
router.get('/categories', async (req, res) => {
  try {
    const categories = await CategoryService.getAll();
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('API Error fetching categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories',
      message: error.message
    });
  }
});

// Users endpoints
router.get('/users', async (req, res) => {
  try {
    const users = await UserService.getAll();
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('API Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users',
      message: error.message
    });
  }
});

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString()
  });
});

export default router;
