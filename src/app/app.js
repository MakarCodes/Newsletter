export const counterId = 'counter';

export const animateValue = (id, start, end, duration) => {
  const range = end - start;
  let current = start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  var obj = document.getElementById(id);
  const timer = setInterval(() => {
      current += increment;
      obj.innerHTML = current;
      if (current == end) {
          clearInterval(timer);
      }
  }, stepTime);
}

const errorMessages = {
  requiredField: 'To pole jest wymagane',
  email: 'Podaj prawidłowy adres e-mail',
  tel: 'Podaj numer telefonu w formacie 123456789',
}

function removeCurrentErrors(currentInput) {
  let errorField = null;
  const children = currentInput.parentNode.childNodes;
  console.log(currentInput.parentNode);
  for (var i=0; i < children.length; i++) {
    // children[i].nodeType === 1 checks if iterated element has type of `element node`, so we can check it's classList
    if (children[i].nodeType === 1 && children[i].classList.contains("errorField")) {
        errorField= children[i];
        break;
    }
  }

  if (errorField) {
    errorField.parentNode.removeChild(errorField);
    currentInput.classList.remove('errorInput');
  }
}

//VALIDATION RULES

const phoneNumberValidatorRule = (telephone_number) => telephone_number.match(/^\d{9,10}$/);
const emailValidatorRule = email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

const validation_rules = {
  telephone_number: (currentInput) => phoneNumberValidatorRule(currentInput.value) ? false : errorMessages.tel,
  email: (currentInput) => emailValidatorRule(currentInput.value) ? false : errorMessages.email,
}

const applyErrorMessage = (item, errorMessage) => {
  item.classList.add('errorInput');
  const errorField = document.createElement('p');
  errorField.classList.add('errorField');
  errorField.innerText = errorMessage;
  item.nextSibling.nextSibling.after(errorField);
}

const applyErrorDependingOnValue = (currentInput, errorValue) => {
  const isRequired = currentInput.getAttribute('required');
  if(!isRequired && !currentInput.value) {
    return;
  }
  if(isRequired && !currentInput.value) {
    applyErrorMessage(currentInput, errorMessages.requiredField);
    return;
  }
  if(errorValue) {
    applyErrorMessage(currentInput, errorValue);
    return;
  }
}

const validationEngine = (validationTrigger) => {

  const inputsNodeList = validationTrigger.closest('form').querySelectorAll('[data-validation_type]');
  const inputsArray = Array.from(inputsNodeList);

  inputsArray.forEach(currentInput => {
    if (currentInput.getAttribute('data-validation_type') === 'telephone_number') { 
      const errorValue = validation_rules.telephone_number(currentInput);
      removeCurrentErrors(currentInput);
      applyErrorDependingOnValue(currentInput, errorValue);
    };

    if (currentInput.getAttribute('data-validation_type') === 'email') {
      const errorValue = validation_rules.email(currentInput);
      removeCurrentErrors(currentInput);
      applyErrorDependingOnValue(currentInput, errorValue);

    };

  });
}

document.querySelector('.submit_form_button').addEventListener('click', function (e) {
  validationEngine(this);
  if(document.querySelectorAll('.errorField') && document.querySelectorAll('.errorField') !== null && [...document.querySelectorAll('.errorField')].length > 0) {
    e.preventDefault();
  };
});