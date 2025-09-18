import { signal } from "sigment";
import { AuthService, LoginCredentials } from "../services/authService";
import { setShowLoginForm } from "./global/globalState";
import "../assets/css/loginForm.css";

function LoginForm(): HTMLElement {
  const [email, setEmail] = signal("");
  const [password, setPassword] = signal("");
  const [isLoading, setIsLoading] = signal(false);
  const [error, setError] = signal("");

  async function handleSubmit(e: Event) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const credentials: LoginCredentials = {
        email: email(),
        password: password(),
      };

      await AuthService.login(credentials);
      // State will be updated by AuthService
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  function handleClose() {
    setShowLoginForm(false);
  }

  function handleEmailInput(e: Event) {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
  }

  function handlePasswordInput(e: Event) {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
  }

  return div(
    {
      class: "login-form-page",
    },
    div(
      { class: "login-form-container" },
      div(
        { class: "login-form-header" },
        h2("Login"),
        button(
          {
            class: "close-btn",
            onClick: handleClose,
          },
          "×"
        )
      ),
      form(
        {
          class: "login-form",
          onSubmit: handleSubmit,
        },
        div(
          { class: "form-group" },
          label({ for: "email" }, "Email"),
          input({
            type: "email",
            id: "email",
            onInput: handleEmailInput,
            required: true,
            placeholder: "Enter your email",
          })
        ),
        div(
          { class: "form-group" },
          label({ for: "password" }, "Password"),
          input({
            type: "password",
            id: "password",
            onInput: handlePasswordInput,
            required: true,
            placeholder: "Enter your password",
          })
        ),
        error() ? div({ class: "error-message" }, error()) : null,
        button(
          {
            type: "submit",
            class: "login-btn",
            disabled: isLoading(),
          },
          isLoading() ? "Logging in..." : "Login"
        )
      ),
      div(
        { class: "login-form-footer" },
        p("Demo credentials:"),
        p("Email: john@example.com"),
        p("Password: password123")
      )
    )
  );
}

export default LoginForm;
