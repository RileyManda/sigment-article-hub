import { NavigateTo } from "sigment";

function Articles(props: any): HTMLElement {
  function handleNavigate() {
    NavigateTo("/articles")
      .then(() => console.log("Navigated to articles"))
      .catch(console.error);
  }

  return div(
    p(`Articles Page`),
    props.id && div(`the param id is  ${props.id}`),
    div(button({ onClick: () => handleNavigate() }, "back"))
  );
}

export default Articles;
