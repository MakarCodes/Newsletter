import "./main.scss";
import { animateValue, counterId } from './app/app'

function triggerEventEmitter() {
  const heightOfHeaderBar = document.querySelector(`#${counterId}`).getBoundingClientRect().top;
  const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  const scrollEventListenerHandler = function() {
      if(window.pageYOffset >= (heightOfHeaderBar - viewportHeight/2)) {
          animateValue(counterId, 30, 0, 2000);
          window.removeEventListener("scroll", scrollEventListenerHandler);
      } 
    }

  window.addEventListener('scroll', scrollEventListenerHandler);
}

triggerEventEmitter();