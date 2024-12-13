let locationSearch = document.querySelector("#locationSearch");
let forecastContainer = document.querySelector("#forecastContainer");
let api = "http://api.weatherapi.com/v1";
let key = "f947fdf875054fa7a72204535241012";
let weatherLocation = "cairo";

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
});

locationSearch.addEventListener("input", function () {
  weatherLocation = locationSearch.value;
  getForcastData();
});

async function getForcastData() {
  let req = await fetch(`${api}/forecast.json?key=${key}&q=${weatherLocation}&days=3`);
  let reqData = await req.json();
  if (req.ok) {
    displayData(reqData);
  }
}

(function () {
  getForcastData();
})();

function displayData(list) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let blackBox = ``;

  for (let i = 0; i < list.forecast.forecastday.length; i++) {
    let date = new Date(list.forecast.forecastday[i].date);

    if (i === 0) {
      blackBox += `<div class="col-12 col-lg-4 p-0 forecast today">
      <div class="forecast-header d-flex justify-content-between fs-14">
                <span class="day">${days[date.getDay()]}</span>
                <span class="date">${date.getDate()}${
        monthNames[date.getMonth()]
      }</span>
              </div>
              <div class="forecast-content bg-alt">
                <p id="locationDisplay" class="location"> ${
                  list.location.name
                } </p>
                <h2 class="degree text-white fw-bold mb-0">
                  <span>${list.current.temp_c}</span><sup>o</sup>C
                </h2>
                <img src="${
                  list.current.condition.icon
                }" alt="weather custom" />
                <div class="custom fs-14 text-main mb-3">${
                  list.current.condition.text
                }</div>
                <div class="status">
                  <ul class="list-unstyled d-flex gap-3 mb-0">
                    <li class="fs-14">
                      <img
                        src="./assets/images/icons/icon-umberella@2x.png"
                        alt="rain"
                      />
                      <span>${
                        list.forecast.forecastday[i].hour[date.getHours()]
                          .chance_of_rain
                      }%</span>
                    </li>
                    <li class="fs-14">
                      <img
                        src="./assets/images/icons/icon-wind@2x.png"
                        alt="wind"
                      />
                      <span>${list.current.wind_kph}km/h</span>
                    </li>
                    <li class="fs-14">
                      <img
                        src="./assets/images/icons/icon-compass@2x.png"
                        alt="compass"
                      />
                      <span>${list.current.wind_dir}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>`;
    } else {
      blackBox += `<div class="col-12 col-lg-4 p-0 forecast text-center">
        <div class="forecast-header fs-14">
          <span class="day">${days[date.getDay()]}</span>
        </div>
        <div class="forecast-content bg-alt">
          <div class="forecast-icon mb-3">
            <img
              src="${list.forecast.forecastday[i].day.condition.icon}"
              alt="weather custom"
            />
          </div>
          <div class="degree mb-3">
            <h2 class="text-white fs-3 fw-bold mb-0">
              <span>${
                list.forecast.forecastday[i].day.maxtemp_c
              }</span><sup>o</sup>C
            </h2>
            <span>${
              list.forecast.forecastday[i].day.mintemp_c
            }<sup>o</sup></span>
          </div>
          <div class="custom fs-14 text-main mb-3">${
            list.forecast.forecastday[i].day.condition.text
          }</div>
        </div>
      </div>`;
    }
  }

  forecastContainer.innerHTML = blackBox;
}
