export const checkImage = (url) => {
  return new Promise((resolve, reject) => {
    let isValid = false;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onload = () => {
      if (xhr.status === 200) isValid = true;
      resolve(isValid);
    };

    xhr.send();
  });
};

export const configureImageUrl = (primaryImg, secondaryImg) => {
  return new Promise((resolve, reject) => {
    primaryImg &&
      checkImage(primaryImg).then((isValid) => {
        isValid && resolve(primaryImg);

        secondaryImg &&
          checkImage(secondaryImg).then((isValid) => {
            isValid && resolve(secondaryImg);
          });
      });

    !primaryImg &&
      secondaryImg &&
      checkImage(secondaryImg).then((isValid) => {
        isValid && resolve(secondaryImg);
      });
  });
};
