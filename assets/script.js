const api_key = '12fc90c9a77ced59fe91b1235a552b05';

const city=$('#city');
const date=$('#date');
const c_temp_span = $('#c_temp');
const c_wind_span = $('#c_wind');
const c_hum_span = $('#c_humidity');


let city_name;
let c_temp;
let c_wind;
let c_humidity;
$(':submit').on('click', e => {
    e.preventDefault();
    city_name = $(':text').val();
    city.text(city_name)
    console.log(city_name);
    // fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${api_key}&units=imperial`)
    //     .then(result => result.json())//result.json()
    //     .then(data => {
    //         console.log(data);
    //     })
    //     .catch(err => { console.log(err) })
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}&units=imperial`)
        .then(result => result.json())
        .then(data => {
            c_temp=data.main.temp;
            c_humidity=data.main.humidity;
            c_wind=data.wind.speed;
            c_temp_span.text(c_temp);
            c_hum_span.text(c_humidity);
            c_wind_span.text(c_wind);
            console.log(`${c_humidity},${c_temp},${c_wind}`);
        })
        .catch(err => { console.log(err) })

});


