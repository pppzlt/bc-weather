const api_key = "12fc90c9a77ced59fe91b1235a552b05";

const cityEl = $("#city");
const dateEl = $("#c_date");
const c_temp_span = $("#c_temp");
const c_wind_span = $("#c_wind");
const c_hum_span = $("#c_humidity");
const f_five_dateEl = $("p[id='f-date']");
const f_five_tempEl = $("span[id='f-temp']");
const f_five_windEl = $("span[id='f-wind']");
const f_five_humEl = $("span[id='f-humidity']");
const f_five_img = $("img[id='f-img']");

let city_name = "Cleveland"; //default city
let c_temp;
let c_wind;
let c_humidity;
let c_date;
let c_timezone;
let c_img;
let c_img_url;
let f_date;
let f_timezone;
let f_time_5days = [];
let f_img_url;

/* based on city name set the url. created two helper functions */
function c_api_f(city_name) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}&units=imperial`;
}
function f_api_f(city_name) {
  return `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${api_key}&units=imperial`;
}
let c_api = c_api_f(city_name);
let f_api = f_api_f(city_name);

$(":submit").on("click", (e) => {
  e.preventDefault();
  if (e.target.value === "Search") {
    city_name = $(":text").val();
    // if (city_name === '') {
    //   return;
    // }
    localStorage.setItem(city_name, null);
    appendHistory();
  } else {
    city_name = e.target.value;
  }
  c_api = c_api_f(city_name);
  f_api = f_api_f(city_name);
  cityEl.text(city_name);

  /* chagne fetch to a function */
  getAPI_c();
  getAPI_f();
  /* set local storage */
  /* set a helper function to pop up all storage values to box */
});

/* Helper function that convert unix UTC time to formatted time based on timezone */
function convert(input, timezone) {
  let date = dayjs.unix(input);
  return date.utcOffset(timezone / 3600).format("MM/DD/YYYY");
  // let date = new Date((input + timezone) * 1000);
  // return date.toLocaleDateString("en-US", { timeZone: "UTC" });
}
/* Helper function: get next 5 days data only if their time equals 12:00:00 */
function get12(data) {
  for (let i = 0; i < 40; i++) {
    if (data.list[i].dt_txt.substring(11) === "12:00:00") {
      f_time_5days.push(data.list[i]);
    }
  }
}
/* put all the fetch inside of a function for resusing */
//need one more thing to add a weather img dynamically
function getAPI_f() {
  fetch(f_api)
    .then((result) => result.json()) //result.json()
    .then((data) => {
      console.log(data);
      /*       get next five days data only if their time is 12:00
      return in f_time_5days */
      f_time_5days = []; //otherwise push will add up.
      get12(data);

      //select the target

      f_five_dateEl.each(function (index) {
        let f_date_temp = f_time_5days[index].dt;
        f_timezone = data.city.timezone;
        f_date = convert(f_date_temp, f_timezone);
        $(this).text(f_date);
      });
      f_five_tempEl.each(function (index) {
        $(this).text(f_time_5days[index].main.temp);
      });
      f_five_windEl.each(function (index) {
        $(this).text(f_time_5days[index].wind.speed);
      });
      f_five_humEl.each(function (index) {
        $(this).text(f_time_5days[index].main.humidity);
      });
      f_five_img.each(function (index) {
        f_img_url = "http://openweathermap.org/img/wn/" + f_time_5days[index].weather[0].icon + "@2x.png";
        $(this).attr({'src': f_img_url, "height": "45em"})
      })
    })
    .catch((err) => {
      console.log(err);
    });
}
/* put all the fetch inside of a function for resusing */
//need one more thing to add a weather img dynamically
function getAPI_c() {
  fetch(c_api)
    .then((result) => result.json())
    .then((data) => {
      // console.log(data);
      console.log(data);
      c_temp = data.main.temp;
      c_humidity = data.main.humidity;
      c_wind = data.wind.speed;
      let c_date_temp = data.dt;
      c_timezone = data.timezone;
      c_date = convert(c_date_temp, c_timezone);
      dateEl.text(c_date);
      c_temp_span.text(c_temp);
      c_hum_span.text(c_humidity);
      c_wind_span.text(c_wind);
      /* retreive img from url */
      c_img = data.weather[0].icon
      c_img_url = 'http://openweathermap.org/img/wn/' + c_img + '@2x.png';
      $('#c_img').attr({ 'src': c_img_url, 'height': '45em' });
    })
    .catch((err) => {
      console.log(err);
    });
}
/* set a helper function to pop up all storage values to box */
function appendHistory() {
  let keys = Object.keys(localStorage);
  $("#history").empty();
  for (let i = 0; i < keys.length; i++) {
    let btnEl = document.createElement("input");
    btnEl.className = "btn btn-secondary";
    btnEl.setAttribute("type", "submit");
    btnEl.setAttribute("value", keys[i]);
    $("#history").append(btnEl);
    $(":submit").on("click", (e) => {
      e.preventDefault();

      city_name = e.target.value;

      c_api = c_api_f(city_name);
      f_api = f_api_f(city_name);
      cityEl.text(city_name);

      /* chagne fetch to a function */
      getAPI_c();
      getAPI_f();
      /* set local storage */
      /* set a helper function to pop up all storage values to box */
    });
  }
}

//set a default page view
cityEl.text(city_name);
getAPI_c();
getAPI_f();

/* need to fix one more thing that is that I am targeting the date with 12:00 but still would result in same date */
