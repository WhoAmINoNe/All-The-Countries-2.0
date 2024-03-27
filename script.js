let row = document.querySelector("#row");
const input = document.querySelector("input");
const select = document.querySelector("select");
const loader = document.querySelector(".loader");
const container = document.querySelector(".container");

function getCountryHtml(i) {
  row.innerHTML += `
  <div class="col mb-4">
    <div class="card">
        <img src="${i?.flags.png}" height="250" class="card-img-top" alt="">
        <div class="card-body">
          <h5 class="card-title">${i?.name.common}</h5>
          <p class="card-text">${i?.capital}</p>
          <a href="./detail.html?country=${i?.name.common}" class="btn btn-primary">Read More</a>
        </div>
    </div>
  </div>
`;
}

function getFetch() {
  const data = JSON.parse(localStorage.getItem("country"));
  if (data) {
    loader.classList.add("d-none");
    container.classList.remove("blur");

    return addCountry(data, "", select.value);
  }
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((res) => {
      addCountry(res, "", select.value);
      localStorage.setItem("country", JSON.stringify(res));
      loader.classList.add("d-none");
      container.classList.remove("blur");
    })
    .catch((err) => {
      console.log(err);
      loader.classList.add("d-none");
      container.classList.remove("blur");
    });
}

function addCountry(data, value, selected) {
  switch (selected) {
    case "default":
      data
        .filter((j) => j.name.common.toUpperCase().search(value) >= 0)
        .map((i) => getCountryHtml(i));
      break;
    case "A-Z":
      data
        .sort((a, b) => a.name.common.localeCompare(b.name.common))
        .filter((j) => j.name.common.toUpperCase().search(value) >= 0)
        .map((i) => getCountryHtml(i));

      break;
    case "Z-A":
      data
        .sort((a, b) => b.name.common.localeCompare(a.name.common))
        .filter((j) => j.name.common.toUpperCase().search(value) >= 0)
        .map((i) => getCountryHtml(i));

      break;
  }
}

input.addEventListener("keydown", ({ target }) => {
  const data = JSON.parse(localStorage.getItem("country"));
  row.innerHTML = "";

  addCountry(data, target.value.toUpperCase(), select.value);
});

select.addEventListener("change", ({ target }) => {
  const data = JSON.parse(localStorage.getItem("country"));
  row.innerHTML = "";

  addCountry(data, "", target.value);
});

getFetch();
