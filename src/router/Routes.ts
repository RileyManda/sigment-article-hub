import type { RoutesMap } from 'sigment'

 const Routes: RoutesMap = {
   "/": {
     loader: () => import("../components/About"),
   },
   about: {
     loader: () => import("../components/About"),
   },
   articles: {
     path: "/articles/:id?",
     loader: () => import("../components/Articles"),
   },
   fallback: {
     loader: () => import("../components/About"),
   },
 };

export default Routes;