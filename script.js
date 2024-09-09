/**
 * Generates an avatar based on the input text and size, and appends it to the specified element.
 *
 * @param {string} text - the input text used for generating the avatar
 * @param {number} size - the size of the avatar
 * @param {HTMLElement} el - the element to which the avatar will be appended
 */
function generateAvatar(text, size, el) {
  let svg = `<svg width="${size}" height="${size}"  viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">`;
  const colorPattern = getMoreColor(textToColor(text));
  const textLength = text.length;

  const variaton = Math.floor(text.charCodeAt(0) % 30);
  const variaton2 = Math.floor(text.charCodeAt(0) % 100);

  ///triangles
  svg += `<polygon points="${variaton2},0 ${
    100 - variaton2
  } ,0 50,${variaton}" fill="${colorPattern[2]}"/>`;
  svg += `<polygon points="${variaton2},100 ${100 - variaton2},100 50,${
    100 - variaton
  }" fill="${colorPattern[2]}"/>`;
  svg += `<polygon points="0,${
    100 - variaton2
  } 0,${variaton2} ${variaton},50" fill="${colorPattern[2]}"/>`;
  svg += `<polygon points="100,${100 - variaton2} 100,${variaton2} ${
    100 - variaton
  },50" fill="${colorPattern[2]}"/>`;
  ///triangles2
  svg += `<polygon points="${variaton2 * 3},0 ${100 - variaton2 * 3} ,0 50,${
    variaton / 2
  }" fill="${colorPattern[1]}"/>`;
  svg += `<polygon points="${variaton2 * 3},100 ${100 - variaton2 * 3},100 50,${
    100 - variaton / 2
  }" fill="${colorPattern[1]}"/>`;
  svg += `<polygon points="0,${100 - variaton2 * 3} 0,${variaton2 * 3} ${
    variaton / 2
  },50" fill="${colorPattern[1]}"/>`;
  svg += `<polygon points="100,${100 - variaton2 * 3} 100,${variaton2 * 3} ${
    100 - variaton / 2
  },50" fill="${colorPattern[1]}"/>`;

  /// lines
  svg += `<line x1="0" y1="0" x2="100" y2="100" stroke="${
    colorPattern[0]
  }" stroke-width="${(variaton * 2) / variaton2}" />`;
  svg += `<line x1="100" y1="0" x2="0" y2="100" stroke="${
    colorPattern[0]
  }" stroke-width="${(variaton * 2) / variaton2}" />`;

  /// circle
  for (let i = 0; i < 3; i++) {
    const charCode = text.charCodeAt(i % textLength);
    const cx = 50;
    const cy = 50;
    const r = ((charCode + i) * 3) % 30;
    svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${colorPattern[i]}"/>`;
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

/**
 * Generate a color pattern based on the input color.
 *
 * @param {string} inputColor - The input color to generate the pattern from.
 * @return {array} An array containing the input color and three additional colors in the pattern.
 */
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
const getWarning = document.querySelector(".warning");

avatarText.addEventListener("keyup", function (event) {
  getWarning.style.display = "none";
  if (event.key === "Enter") {
    buttonGenerate.click();
  }
});

buttonGenerate.addEventListener("click", function () {
  if (avatarText.value) {
    generateAvatar(avatarText.value, avatarSize.value, avatar);
  } else {
    getWarning.style.display = "block";
  }
});

const text = document.querySelectorAll("[data-genav_text]");

window.onload = function () {
  if (text.length) {
    text.forEach(function (el) {
      generateAvatar(el.dataset.genav_text, parseInt(el.dataset.genav_size), el);
    });
  }
};
