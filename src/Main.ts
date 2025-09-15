import {MyApp,mount} from  "sigment"
import Header from "./components/Header"
import Body from "./components/Body"
import Footer from "./components/Footer"
import './assets/css/index.css'
import Routes from "./router/Routes"

MyApp.cleanHtml(true); //in development use false in production use true
MyApp.setMaxCacheSize(50); // cache 50 components
MyApp.setRoute(Routes);  // set the route map

async function Main() {  


     const app = fragment(
      Header(),
        await Body(),
      Footer()
    );

    mount("root",app);

}

 Main();


export default Main;