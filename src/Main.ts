import { MyApp, mount } from "sigment";
import "./components/sigments/sigments";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import CreateArticleForm from "./components/CreateArticleForm";
import { showLoginForm, showCreateArticleForm } from "./components/global/globalState";
import { AuthService } from "./services/authService";
import "./assets/css/index.css";
import Routes from "./router/Routes";

MyApp.cleanHtml(true); //in development use false in production use true
MyApp.setMaxCacheSize(50); // cache 50 components
MyApp.setRoute(Routes); // set the route map

async function Main() {
  // Initialize authentication state from localStorage
  await AuthService.initializeAuth();

  const bodyContent = await Body();

  const app = div(Header(), () => {
    const shouldShowLogin = showLoginForm();
    const shouldShowCreateArticle = showCreateArticleForm();

    if (shouldShowLogin) {
      return LoginForm();
    } else if (shouldShowCreateArticle) {
      return CreateArticleForm();
    } else {
      return div(bodyContent, Footer());
    }
  });

  mount("root", app);
}

Main();

export default Main;
