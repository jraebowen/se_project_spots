//Card display on page load
let initialCards = [
  { name: "Maine Coon", link: "../images/mainecoon.jpg" },
  { name: "Playful Kitten", link: "../images/kittenplay.jpg" },
  { name: "Meowing Kitten", link: "../images/kittenmeow.jpg" },
  { name: "Curious Cat", link: "../images/cathello.jpg" },
  { name: "Roaring Kitten", link: "../images/kittenroar.jpg" },
  { name: "Sunglass Cat", link: "../images/catsunglasses.jpg" },
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
const profileForm = editProfileModal.querySelector(".form");

//Post variables
const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__post-button");
const cardForm = newPostModal.querySelector(".form");
const imageLink = newPostModal.querySelector("#image-link");
const imageCaption = newPostModal.querySelector("#image-caption");

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
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

const closeButtons = document.querySelectorAll(".modal__close-button");

closeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const modal = button.closest(".modal");
    if (modal) {
      closeModal(modal);
    }
  });
});

//Profile functions
editProfileBtn.addEventListener("click", editProfile);

function editProfile(evt) {
  evt.preventDefault();
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
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
  openModal(newPostModal);
});

newPostBtn.addEventListener("click", () => {
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

  imageLink.value = "";
  imageCaption.value = "";

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
