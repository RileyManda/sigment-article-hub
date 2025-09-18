
import '../sigments/sigments';
import './hello.css'
import styles from './hello.module.css'

function Hello(): HTMLElement  {

  return div(

    hello({class:"fnt " + styles.bold600},'Hello from sigment ,' ,
       br(), 
       'inspect this element , ', 
       br(), 
       'and see element tag is s-hello'),

  )

}

export default Hello;