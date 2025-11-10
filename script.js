let cars = [];

const carsGrid = document.getElementById("carsGrid");
const brandFilter = document.getElementById("brandFilter");
const priceFilter = document.getElementById("priceFilter");
const applyFilterBtn = document.getElementById("applyFilter");

// Загрузка данных из JSON
fetch("cars.json")
  .then((res) => res.json())
  .then((data) => {
    cars = data;
    populateBrandFilter();
    displayCars(cars);
  })
  .catch((err) => console.error(err));

// Заполняем фильтр марок
function populateBrandFilter() {
  const brands = [...new Set(cars.map((c) => c.brand))];
  brands.forEach((brand) => {
    const option = document.createElement("option");
    option.value = brand;
    option.textContent = brand;
    brandFilter.appendChild(option);
  });
}

// Отображение машин
function displayCars(list) {
  carsGrid.innerHTML = "";
  list.forEach((car) => {
    const card = document.createElement("div");
    card.className = "car-card";
    card.innerHTML = `
      <img src="images/${car.image}" alt="${car.brand} ${car.model}">
      <h3>${car.brand} ${car.model}</h3>
      <p>Год: ${car.year}</p>
      <p>Цена: $${car.price}</p>
      <a href="car.html?id=${car.id}">Подробнее</a>
    `;
    carsGrid.appendChild(card);
  });
}

// Применение фильтров
applyFilterBtn.addEventListener("click", () => {
  let filtered = cars;
  const selectedBrand = brandFilter.value;
  const maxPrice = parseInt(priceFilter.value);

  if (selectedBrand !== "Все") {
    filtered = filtered.filter((c) => c.brand === selectedBrand);
  }
  if (!isNaN(maxPrice)) {
    filtered = filtered.filter((c) => c.price <= maxPrice);
  }

  displayCars(filtered);
});
