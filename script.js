function generateAvatar(text, size, el) {
  let svg = `<svg width="${size}" height="${size}"  viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">`;
  for (let index = 0; index < 3; index++) {
    const r = Math.floor(Math.random() * 100);
    svg += `<circle cx="${Math.floor(Math.random() * 100)}" cy="${Math.floor(
      Math.random() * 100
    )}" r="${Math.floor(Math.random() * 50)}" fill="${
      getMoreColor(textToColor(text))[index]
    }"/>`;
  }

  svg += "</svg>";
  el.innerHTML = svg;
}

/**
 * Converts a given text into a color code.
 *
 * @param {string} text - the input text to be converted
 * @return {string} the color code generated from the input text
 */
function textToColor(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let j = 0; j < 3; j++) {
    let value = (hash >> (j * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}

function getMoreColor(inputColor) {
  const colorPattern = [inputColor];
  for (let i = 0; i < 3; i++) {
    const red = parseInt(inputColor.substring(1, 3), 16);
    const green = parseInt(inputColor.substring(3, 5), 16);
    const blue = parseInt(inputColor.substring(5, 7), 16);

    const redIncrease = Math.round((255 - red) / 3);
    const greenIncrease = Math.round((255 - green) / 3);
    const blueIncrease = Math.round((255 - blue) / 3);

    let newRed = red + redIncrease * (i + 1);
    let newGreen = green + greenIncrease * (i + 1);
    let newBlue = blue + blueIncrease * (i + 1);

    if (newRed > 255) {
      newRed = 255;
    }
    if (newGreen > 255) {
      newGreen = 255;
    }
    if (newBlue > 255) {
      newBlue = 255;
    }

    const newColor =
      "rgb(" +
      newRed.toString(10) +
      "," +
      newGreen.toString(10) +
      "," +
      newBlue.toString(10) +
      ")";
    colorPattern.push(newColor);
  }
  return colorPattern;
}
const avatarText = document.getElementById("avatarText");
const avatar = document.getElementById("avatar");
const buttonGenerate = document.getElementById("buttonGenerate");
const avatarSize = document.getElementById("avatarSize");

buttonGenerate.addEventListener("click", function () {
  getMoreColor(textToColor(avatarText.value)).forEach((element) => {
    console.log(element);
    const div = document.createElement("div");
    div.style.width = "50px";
    div.style.height = "50px";
    div.style.backgroundColor = element;
    div.style.display = "inline-block";
    div.style.marginRight = "10px";
    document.body.appendChild(div);
  });
  generateAvatar(avatarText.value, avatarSize.value, avatar);
});
const text = document.querySelectorAll("[data-genav_text]");
window.onload = function () {
  if (text.length) {
    text.forEach(function (el) {
      generateAvatar(el.dataset.genav_text, el.dataset.genav_size, el);
    });
  }
};
