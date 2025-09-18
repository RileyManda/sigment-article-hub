function About(props: any): HTMLElement {
  return div(
    { class: "about-page" },
    div(
      { class: "about-hero" },
      div(
        { class: "about-hero-content" },
        h1({ class: "about-title" }, "Welcome to Sigment Article Hub"),
        p(
          { class: "about-description" },
          "A modern, intuitive platform for discovering, creating, and sharing amazing articles. Built with the Sigment framework, we provide a seamless experience for writers and readers alike."
        ),
        div(
          { class: "about-features" },
          div(
            { class: "feature-item" },
            div({ class: "feature-icon" }, "📝"),
            h3("Create Articles"),
            p("Share your knowledge and insights with our easy-to-use editor")
          ),
          div(
            { class: "feature-item" },
            div({ class: "feature-icon" }, "🔍"),
            h3("Discover Content"),
            p("Explore a diverse collection of articles from talented writers")
          ),
          div(
            { class: "feature-item" },
            div({ class: "feature-icon" }, "👥"),
            h3("Join Community"),
            p("Connect with like-minded individuals and grow together")
          )
        )
      )
    )
  );
}

export default About;
