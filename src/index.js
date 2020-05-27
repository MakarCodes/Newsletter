import "./main.scss";
import { animateValue, counterId } from './app/app'

const scrollEventListenerHandler = function() {
    const heightOfHeaderBar = document.querySelector(`#${counterId}`).offsetHeight;
  
      if(window.pageYOffset >= heightOfHeaderBar) {
          animateValue(counterId, 30, 0, 2000);
          window.removeEventListener("scroll", scrollEventListenerHandler);
      } 
    }
window.addEventListener('scroll', scrollEventListenerHandler);
