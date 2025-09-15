
function Header(): HTMLElement  {
    return div(
      { class: "header" },
      nav(
        a({ id: "about", href: "/about" }, "About"),
        span(),
        a({ id: "articles", href: "/articles" }, "Articles")
      )
    ); 
}
export default Header;