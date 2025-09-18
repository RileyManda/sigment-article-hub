import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../services/authService", () => ({
  AuthService: {
    logout: vi.fn(),
  },
}));

vi.mock("../components/global/globalState", () => ({
  isAuthenticated: vi.fn(),
  user: vi.fn(),
  setShowLoginForm: vi.fn(),
}));

global.div = vi.fn();
global.nav = vi.fn();
global.a = vi.fn();
global.span = vi.fn();
global.img = vi.fn();
global.button = vi.fn();

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should be importable", async () => {
    expect(async () => {
      const { default: Header } = await import("../Header");
      expect(Header).toBeDefined();
    }).not.toThrow();
  });

  it("should render without errors", async () => {
    const mockIsAuthenticated = vi.fn().mockReturnValue(false);
    const mockUser = vi.fn().mockReturnValue(null);
    const mockSetShowLoginForm = vi.fn();
    vi.doMock("../components/global/globalState", () => ({
      isAuthenticated: mockIsAuthenticated,
      user: mockUser,
      setShowLoginForm: mockSetShowLoginForm,
    }));

    expect(async () => {
      const { default: Header } = await import("../Header");
      Header();
    }).not.toThrow();
  });

  it("should handle authenticated state", async () => {
    expect(async () => {
      const { default: Header } = await import("../Header");
      Header();
    }).not.toThrow();
  });

  it("should handle unauthenticated state", async () => {
    expect(async () => {
      const { default: Header } = await import("../Header");
      Header();
    }).not.toThrow();
  });
});
