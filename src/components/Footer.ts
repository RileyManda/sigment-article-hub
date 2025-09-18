function Footer(): HTMLElement {
  return div(
    { class: "footer" },
    div(
      { class: "footer-content" },
      div(
        { class: "footer-main" },
        div(
          { class: "footer-brand" },
          h3("Sigment Article Hub"),
          p("Discover, create, and share amazing articles with the community.")
        ),
        div(
          { class: "footer-links" },
          div(
            { class: "footer-section" },
            h4("Platform"),
            a({ href: "#", class: "footer-link" }, "Articles"),
            a({ href: "#", class: "footer-link" }, "Create Article"),
            a({ href: "#", class: "footer-link" }, "About")
          ),
          div(
            { class: "footer-section" },
            h4("Community"),
            a({ href: "#", class: "footer-link" }, "Guidelines"),
            a({ href: "#", class: "footer-link" }, "Support"),
            a({ href: "#", class: "footer-link" }, "Contact")
          )
        )
      ),
      div(
        { class: "footer-bottom" },
        div(
          { class: "footer-copyright" },
          "© 2025 Sigment Article Hub. Built with curiosity for ",
          a(
            {
              href: "https://sigment.dev",
              class: "footer-link-external",
              target: "_blank",
            },
            "sigment.dev"
          )
        ),
        div(
          { class: "footer-social" },
          a({ href: "#", class: "social-link", "aria-label": "GitHub" }, "🐙"),
          a({ href: "#", class: "social-link", "aria-label": "Twitter" }, "🐦"),
          a({ href: "#", class: "social-link", "aria-label": "LinkedIn" }, "💼")
        )
      )
    )
  );
}

export default Footer;
