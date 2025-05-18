//Card display on page load
const initialCards = [
  {
    name: "Maine Coon",
    link: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=2630&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Playful Kitten",
    link: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2F0fGVufDB8fDB8fHwy",
  },
  {
    name: "Meowing Kitten",
    link: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhdHxlbnwwfHwwfHx8Mg%3D%3D",
  },
  {
    name: "Curious Cat",
    link: "https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNhdHxlbnwwfHwwfHx8Mg%3D%3D",
  },
  {
    name: "Roaring Kitten",
    link: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhdHxlbnwwfHwwfHx8Mg%3D%3D",
  },
  {
    name: "Sunglass Cat",
    link: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhdHxlbnwwfHwwfHx8Mg%3D%3D",
  },
];

//Profile variables
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileBtn = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const nameInput = editProfileModal.querySelector("#full-name");
const descriptionInput = editProfileModal.querySelector(
  "#personal-description"
);
const profileForm = document.forms["profile-form"];

//Post variables
const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__post-button");
const cardForm = document.forms["new-post-form"];
const cardFormElements = cardForm.elements;
const imageLink = cardFormElements["image-link"];
const imageCaption = cardFormElements["image-caption"];

//Card modal variables
const cardModal = document.querySelector("#card-modal");
const modalCardImage = cardModal.querySelector(".modal__card-image");
const modalCardText = cardModal.querySelector(".modal__card-text");

//Card template variables
const cardTemplate = document.querySelector("#card-template");
const cardContainer = document.querySelector(".cards__list");

//Modal open/close functions
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", escapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", escapeKey);
}

const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.addEventListener("click", function (evt) {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("modal__close-button")
    ) {
      closeModal(modal);
    }
  });
});

function closeModalEscapeKey(evt) {
  const openModal = document.querySelector(".modal_is-opened");
  if (evt.key === "Escape" && openModal) {
    closeModal(openModal);
  }
}

//Profile functions
editProfileBtn.addEventListener("click", openEditProfileModal);

function openEditProfileModal(evt) {
  evt.preventDefault();
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  const inputList = Array.from(
    profileForm.querySelectorAll(validationConfig.formInput)
  );
  resetValidation(profileForm, inputList, validationConfig);
  openModal(editProfileModal);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editProfileModal);
}

profileForm.addEventListener("submit", submitProfileForm);

//Post form functions
newPostBtn.addEventListener("click", () => {
  const inputList = Array.from(
    cardForm.querySelectorAll(validationConfig.formInput)
  );
  openModal(newPostModal);
});

function submitPostForm(evt) {
  evt.preventDefault();

  const newPostValues = {
    link: imageLink.value,
    name: imageCaption.value,
  };

  const newCardElement = getCardElement(newPostValues);

  cardContainer.prepend(newCardElement);

  evt.target.reset();

  const buttonElement = cardForm.querySelector(validationConfig.submitButton);
  buttonElement.disabled = true;

  closeModal(newPostModal);
}

cardForm.addEventListener("submit", submitPostForm);

//Post data/template functions and initial card functions
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__text");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardText.textContent = data.name;

  const cardLikeBtn = cardElement.querySelector(".card__like-button");

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_active");
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    modalCardImage.src = data.link;
    modalCardImage.alt = data.name;
    modalCardText.textContent = data.name;
    openModal(cardModal);
  });

  return cardElement;
}

initialCards.forEach((cardElementData) => {
  const cardDetails = getCardElement(cardElementData);
  cardContainer.append(cardDetails);
});
