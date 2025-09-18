import { NavigateTo } from "sigment";
import { AuthService } from "../services/authService";
import {
  isAuthenticated,
  user,
  setShowLoginForm,
  setShowCreateArticleForm,
} from "./global/globalState";
import "../assets/css/header.css";

function Header(): HTMLElement {
  function handleAboutClick(e: Event) {
    e.preventDefault();
    NavigateTo("/").catch(() => {});
  }

  function handleArticlesClick(e: Event) {
    e.preventDefault();
    NavigateTo("/articles").catch(() => {});
  }

  function handleCreateArticleClick(e: Event) {
    e.preventDefault();
    setShowCreateArticleForm(true);
  }

  function handleLoginClick(e: Event) {
    e.preventDefault();
    setShowLoginForm(true);
  }

  async function handleLogoutClick(e: Event) {
    e.preventDefault();
    await AuthService.logout();
  }

  return div(
    { class: "header" },
    nav(
      { class: "header-nav" },
      div({ class: "header-logo" }, "SigmentArticle Hub"),
      div(
        { class: "header-center" },
        a(
          {
            id: "about",
            href: "/about",
            onClick: handleAboutClick,
            class: "nav-link",
          },
          "🏠 About"
        ),
        a(
          {
            id: "articles",
            href: "/articles",
            onClick: handleArticlesClick,
            class: "nav-link",
          },
          "📚 Articles"
        )
      ),
      div(
        { class: "header-right" },
        // Function child for reactive authentication state
        () => {
          const authState = isAuthenticated();
          const userData = user() as any;

          if (authState && userData) {
            return div(
              { class: "user-menu" },
              div(
                { class: "user-info" },
                img({
                  src: userData?.avatar || "https://via.placeholder.com/32",
                  alt: "User Avatar",
                  class: "user-avatar",
                }),
                span({ class: "user-name" }, userData?.firstName || "User")
              ),
              button(
                { class: "btn btn-primary", onClick: handleCreateArticleClick },
                "✍️ Create Article"
              ),
              button(
                { class: "btn btn-danger", onClick: handleLogoutClick },
                "Logout"
              )
            );
          }
          return button(
            { class: "btn btn-primary", onClick: handleLoginClick },
            "Login"
          );
        }
      )
    )
  );
}
export default Header;
