function About(props: any): HTMLElement {
  return div(
    // Header
    div(
      h1("🏠 Welcome to Sigment Article Hub"),
      p("A modern blogging platform built with Sigment framework")
    ),

    // Content
    div({ class: "about-content" })
  );
}

export default About;
