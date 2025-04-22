//TO DO:
//1. clarification on semi-colon after functions
//2. re-organize variables vs. functions
//3. refactor to arrow functions for practice
//4. delete un-used photos

let initialCards = [
  { name: "Maine Coon", link: "../images/mainecoon.jpg" },
  { name: "Playful Kitten", link: "../images/kittenplay.jpg" },
  { name: "Meowing Kitten", link: "../images/kittenmeow.jpg" },
  { name: "Curious Cat", link: "../images/cathello.jpg" },
  { name: "Roaring Kitten", link: "../images/kittenroar.jpg" },
  { name: "Sunglass Cat", link: "../images/catsunglasses.jpg" },
];

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileBtn = document.querySelector(".profile__edit-button");
const editModalCloseBtn = editProfileModal.querySelector(
  ".modal__close-button"
);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const nameInput = editProfileModal.querySelector("#full-name");
const descriptionInput = editProfileModal.querySelector(
  "#personal-description"
);
const profileForm = editProfileModal.querySelector(".form");

const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__post-button");
const postModalCloseBtn = newPostModal.querySelector(".modal__close-button");
const cardForm = newPostModal.querySelector(".form");
const imageLink = newPostModal.querySelector("#image-link");
const imageCaption = newPostModal.querySelector("#image-caption");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function editProfile(evt) {
  evt.preventDefault();
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
}

editProfileBtn.addEventListener("click", editProfile);

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editProfileModal);
}

profileForm.addEventListener("submit", submitProfileForm);

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

function submitPostForm(evt) {
  evt.preventDefault();
  console.log(imageLink.value);
  console.log(imageCaption.value);
  closeModal(newPostModal);
}

cardForm.addEventListener("submit", submitPostForm);

const closeButtons = document.querySelectorAll(".modal__close-button");

closeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const modal = button.closest(".modal");
    if (modal) {
      closeModal(modal);
    }
  });
});

const cardTemplate = document.querySelector("#card-template");
const cardContainer = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__text");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardText.textContent = data.name;

  return cardElement;
}

initialCards.forEach(function (cardElementData) {
  const cardDetails = getCardElement(cardElementData);
  cardContainer.prepend(cardDetails);
});
