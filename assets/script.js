const api_key = '12fc90c9a77ced59fe91b1235a552b05';

$(function () {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${api_key}`)
        .then(result => result.json())//result.json()
        .then(data => console.log(data))
        .catch(err => { console.log(err) })
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${api_key}`)
        .then(result => result.json())
        .then(data => console.log(data))
        .catch(err => { console.log(err) })
})
