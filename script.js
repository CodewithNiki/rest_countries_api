const checkbox = document.querySelector("header input");
let htmlElement = document.documentElement;
const select = document.querySelector(".select div");
const selectOption = document.querySelector(".select ul");
const countriesContainer = document.querySelector(".countries-container");
const countriesDetails = document.querySelector(".countries-details");
const main = document.querySelector("main");
const searchCountry = document.querySelector(".search input");

htmlElement.setAttribute("data-theme", "light");

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    htmlElement.setAttribute("data-theme", "dark");
  } else {
    htmlElement.setAttribute("data-theme", "light");
  }
});

select.addEventListener("click", () => {
  selectOption.classList.remove("display");
});

selectOption.addEventListener("click", (e) => {
  let regionValue = e.target.attributes.value.value;
  select.innerHTML = regionValue;
  selectOption.classList.add("display")
});

const getData = async () => {
  const data = await fetch("db.json");
  const response = await data.json();

  response.map((data) => {
    showCountry(data);
  });
};
getData();

const showCountry = (country) => {
  const countryInfo = document.createElement("div");
  countryInfo.classList.add("country");
  countryInfo.innerHTML = `
  <div class="country-img">
    <img src=${country.flags.svg} alt=${country.name} >
  </div>
  <div class="country-details">
    <h4 class="countryName">${country.name}</h4>
    <p><strong>Population: </strong>${country.population}</p>
    <p><strong>Region: </strong><span class="region">${country.region}</span></p>
    <p><strong>Capital: </strong>${country.capital}</p>
  </div>
    `;
  countriesContainer.appendChild(countryInfo);
  countryInfo.addEventListener("click", () => {
    showDetails(country);
  });
};

const showDetails = (countryDetails) => {
  const details = document.createElement("div");
  details.classList.add("details-container");
  details.innerHTML = `
<div class="details-back">
<span class="material-symbols-outlined">
arrow_back
</span>Back
</div>
<div class="details-content">
  <div class="details-img">
    <img src=${countryDetails.flags.svg} alt=${countryDetails.name} >
  </div>
  <div class="details-detail">
     <h4>${countryDetails.name}</h4>
     <div class="detail">
       <div>
        <p><strong>Native Name: </strong>${countryDetails.nativeName}</p>
        <p><strong>Population: </strong>${countryDetails.population}</p>
        <p><strong>Region: </strong>${countryDetails.region}</p>
        <p><strong>Sub Region: </strong>${countryDetails.subregion}</p>
        <p><strong>Capital: </strong>${countryDetails.capital}</p>
       </div> 
       <div>
        <p><strong>Top Level Domain: </strong>${countryDetails.topLevelDomain}</p>
        <p><strong>Currencies: </strong>${countryDetails.currencies[0].name}</p>
        <p><strong>Languages: </strong>${countryDetails.languages[0].name}</p>
       </div>
     </div>
  </div>
</div>
`;
  countriesDetails.appendChild(details);

  countriesContainer.classList.add("show");
  countriesDetails.classList.add("show");
  main.classList.add("show");

  countriesDetails.addEventListener("click", (e) => {
    if (e.target.className === "details-back") {
      countriesDetails.removeChild(details);
      countriesContainer.classList.remove("show");
      countriesDetails.classList.remove("show");
      main.classList.remove("show");
    }
  });
};

const countryName = document.getElementsByClassName("countryName");
searchCountry.addEventListener("input", ()=>{
  (Array.from(countryName).map(country=>{
    if(country.innerText.toLowerCase().includes(searchCountry.value.toLowerCase())){
     country.parentElement.parentElement.style.display = "flex";
    }
    else{
      country.parentElement.parentElement.style.display = "none"
    }
  }));
});

const region = document.getElementsByClassName("region");
selectOption.addEventListener("click", ()=>{
  Array.from(region).map(country=>{
    if(country.innerText.includes(select.innerText) || country.innerText === "All"){
      country.parentElement.parentElement.parentElement.style.display = "flex";
    }
    else{
      country.parentElement.parentElement.parentElement.style.display = "none"
    }
  })
})