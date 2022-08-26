let appId = 'a5e074f2662e9ca48260fe12b76c3e11';
let units = 'standard';
let searchMethod;

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}    

function searchWeather(cityLocation) {
   var { lat } = cityLocation;
   var { lon } = cityLocation;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`)
    //fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appId}`)
    .then(result => {
       return result.json();
    }).then(weatherData => {
       console.log("Weather Info: "+JSON.stringify(weatherData));
       initCurrentWeather(weatherData);
    })    
}

function initCurrentWeather(resultFromServer) {
    console.log(resultFromServer);
    var pTemp = document.createElement("p");
    pTemp.innerHTML = "Temp: "+resultFromServer.main.temp;
    var pHumidity = document.createElement("p");
    pHumidity.innerHTML = "Humidity: "+resultFromServer.main.humidity;
    var tIcon = document.createElement("img");
    tIcon.setAttribute("src", `https://openweathermap.org/img/w/${resultFromServer.weather[0].icon}.png`);

document.getElementById("weatherContainer").append(pTemp,pHumidity,tIcon);
}

function getGeo(city)
{
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${appId}`)
    .then(function(res){
        return res.json();
    })
    .then(function (data){
        console.log("Data: "+JSON.stringify(data));
        searchWeather(data[0]);
    })
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchImput').value;
    getGeo(searchTerm); 
})