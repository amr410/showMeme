let input = document.querySelector("[data-search]");
let search = document.querySelector("form");
let showMeme = document.querySelector("[data-meme]");

search.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    let img = await data();
    let show = img.data.memes.find((m, mIndex) => {
      return input.value == mIndex;
    });
    input.value = "";

    if (show) {
      return (showMeme.innerHTML = `
            <div class="d-flex flex-column align-items-center gap-3">
              <h1 class="text-warning">${show.name}</h1>
              <img src="${show.url}" alt="${show.name}" style="width:${show.width}px; height:${show.height}px" />
            </div>`);
    } else {
      return (showMeme.innerHTML = `<div class="text-center text-warning"><h1>Please Enter Valid Number</h1></div>`);
    }
  } catch {
    showMeme.innerHTML = `
    <div class="text-center py-5 my-5 text-danger">
    <h2>ERROR 404</h2>
    <h1>Failed To Receive Data</h1></div>`;
  }
});

async function data() {
  let data = await fetch("https://api.imgflip.com/get_memes");
  let resault = await data.json();
  return resault;
}
