const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-75001.jpg"
  },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/sao-paulo-brazil-temple/sao-paulo-brazil-temple-2737.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-3556.jpg"
  }
];

const templeGrid = document.querySelector("#temple-grid");
const templeCount = document.querySelector("#temple-count");
const pageTitle = document.querySelector("#page-title");
const filterLinks = document.querySelectorAll("[data-filter]");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");

function getDedicatedYear(temple) {
  return Number(temple.dedicated.split(",")[0]);
}

function formatDedicatedDate(temple) {
  const [year, month, day] = temple.dedicated.split(", ");
  const date = new Date(`${month} ${day}, ${year} UTC`);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  }).format(date);
}

function createTempleCard(temple) {
  return `
    <article class="temple-card">
      <h2>${temple.templeName}</h2>
      <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" width="640" height="400" loading="lazy" />
      <dl>
        <dt>Location</dt>
        <dd>${temple.location}</dd>
        <dt>Dedicated</dt>
        <dd>${formatDedicatedDate(temple)}</dd>
        <dt>Area</dt>
        <dd>${temple.area.toLocaleString("en-US")} sq ft</dd>
      </dl>
    </article>
  `;
}

function displayTemples(filter = "home") {
  const filteredTemples = temples.filter((temple) => {
    const year = getDedicatedYear(temple);

    switch (filter) {
      case "old":
        return year < 1900;
      case "new":
        return year > 2000;
      case "large":
        return temple.area > 90000;
      case "small":
        return temple.area < 10000;
      default:
        return true;
    }
  });

  templeGrid.innerHTML = filteredTemples.map(createTempleCard).join("");
  pageTitle.textContent = filter === "home"
    ? "Home"
    : `${filter.charAt(0).toUpperCase()}${filter.slice(1)} Temples`;
  templeCount.textContent = `Showing ${filteredTemples.length} of ${temples.length} temples`;
}

displayTemples();
currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

filterLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    filterLinks.forEach((filterLink) => filterLink.removeAttribute("aria-current"));
    link.setAttribute("aria-current", "page");
    displayTemples(link.dataset.filter);
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    menuButton.textContent = "☰";
  });
});

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  menuButton.textContent = isOpen ? "✕" : "☰";
});
