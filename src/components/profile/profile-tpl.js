export const createProfileTemplate = (profile) => {
    return `<section class="header__profile profile">
              <p class="profile__rating">${profile.rating}</p>
              <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
            </section>`;
}