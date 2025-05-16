const configObjects = {
  formSelector: ".form",
  submitButton: ".form__button",
  formInput: ".form__input",
  submitButtonInactive: "form__button_inactive",
  errorActive: "form__input-error_active",
  inputErrorType: "form__input_type_error",
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  configObjects
) => {
  const errorElement = formElement.querySelector(
    `.input-error-${inputElement.id}`
  );
  inputElement.classList.add(configObjects.inputErrorType);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configObjects.errorActive);
};

const hideInputError = (formElement, inputElement, configObjects) => {
  const errorElement = formElement.querySelector(
    `.input-error-${inputElement.id}`
  );
  inputElement.classList.remove(configObjects.inputErrorType);
  errorElement.classList.remove(configObjects.errorActive);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, configObjects) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      configObjects
    );
  } else {
    hideInputError(formElement, inputElement, configObjects);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, configObjects) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(configObjects.submitButtonInactive);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(configObjects.submitButtonInactive);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, configObjects) => {
  const inputList = Array.from(
    formElement.querySelectorAll(configObjects.formInput)
  );
  const buttonElement = formElement.querySelector(configObjects.submitButton);
  toggleButtonState(inputList, buttonElement, configObjects);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, configObjects);
      toggleButtonState(inputList, buttonElement, configObjects);
    });
  });
};

const enableValidation = (configObjects) => {
  const formList = document.querySelectorAll(configObjects.formSelector);
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation(configObjects);

const resetValidation = (formElement, inputList, configObjects) => {
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, configObjects);
  });
};
