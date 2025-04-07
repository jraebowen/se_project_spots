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

function editProfile(evt) {
  evt.preventDefault();
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  editProfileModal.classList.add("modal_is-opened");
}

editProfileBtn.addEventListener("click", editProfile);

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

profileForm.addEventListener("submit", submitProfileForm);

editModalCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

function submitPostForm(evt) {
  evt.preventDefault();
  console.log(imageLink.value);
  console.log(imageCaption.value);
  newPostModal.classList.remove("modal_is-opened");
}

cardForm.addEventListener("submit", submitPostForm);

postModalCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});
