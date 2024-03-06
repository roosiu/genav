const text = document.querySelectorAll("[data-genav_text]");

function generateAvatar(text, size, el) {
  let svg = `<svg width="${size}" height="${size}" style="background-color: #fdff" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">`;

  for (let index = 0; index < 3; index++) {
    const r = Math.floor(Math.random() * 100);
    svg += `<circle cx="${Math.floor(Math.random() * 100)}" cy="${Math.floor(
      Math.random() * 100
    )}" r="${Math.floor(Math.random() * 50)}" fill="#00d"/>`;
  }

  svg += `<rect width="100" height="100"  style="fill:none;stroke:#fdff;stroke-width:23"/>`;
  svg += "</svg>";
  el.innerHTML = svg;
}

window.onload = function () {
  if (text.length) {
    text.forEach(function (el) {
      generateAvatar(el.dataset.genav_text, el.dataset.genav_size, el);
    });
  }
};
