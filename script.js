function generateAvatar(text, size, el) {
  console.log(textToColor(text));
  let svg = `<svg width="${size}" height="${size}" style="background-color: ${textToColor(
    text
  )}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">`;
  const textLength = text.length;
  for (let index = 0; index < 3; index++) {
    const r = Math.floor(Math.random() * 100);
    svg += `<circle cx="${Math.floor(Math.random() * 100)}" cy="${Math.floor(
      Math.random() * 100
    )}" r="${Math.floor(Math.random() * 50)}" fill="#00d"/>`;
  }

  svg += "</svg>";
  el.innerHTML = svg;
}

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
const avatar_text = document.getElementById("avatar_text");
const avatar_size = document.getElementById("avatar_size");
const avatar = document.getElementById("avatar");
avatar_text.addEventListener("input", function () {
  console.log(avatar_size.value); // FIX IT
  // generateAvatar(avatar_text.value, avatar_size.value, avatar);
});
const text = document.querySelectorAll("[data-genav_text]");
window.onload = function () {
  if (text.length) {
    text.forEach(function (el) {
      generateAvatar(el.dataset.genav_text, el.dataset.genav_size, el);
    });
  }
};
