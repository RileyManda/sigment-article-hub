import type { User, Category, Tag } from "../types";

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

export { mockUsers, mockCategories, mockTags };
