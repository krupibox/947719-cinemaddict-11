import {getProfileStatus} from '../../utils/get-profile-status';

export const createProfileTemplate = (userStatus) => {
  const userStatusName = getProfileStatus(userStatus);
  
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userStatusName}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};