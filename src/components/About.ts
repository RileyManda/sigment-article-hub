import { NavigateTo } from 'sigment';

function About(props : any): HTMLElement  {

  function handleNavigate() {
    NavigateTo("/")
      .then(() => console.log("Navigated to about"))
      .catch(console.error);
  }

  return div(
    p(`About Page`),
    props.id && div(`the param id is  ${props.id}`),
    div(button({ onClick: () => handleNavigate() }, "back"))
  );

}

export default About;