function refreshWeather(response){
    let temperatureElement=document.querySelector("#temperature")
    let temperature=response.data.temperature.current
    let cityElement=document.querySelector("#city")
    let descriptionElement =document.querySelector("#description")
    let humidityElement= document.querySelector("#humidity")
    let windElement=document.querySelector("#wind")
    let timeElement=document.querySelector("#time")
    let date= new Date(response.data.time*1000)
    let iconImage=document.querySelector("#icon")
    iconImage.innerHTML = `<img class="icon-1" src="${response.data.condition.icon_url}" alt="Weather icon" class="weather-icon"/>`;
    cityElement.innerHTML = response.data.city
    windElement.innerHTML = `${response.data.wind.speed}km/h`
    descriptionElement.innerHTML = `, ${response.data.condition.description}`
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`
    temperatureElement.innerHTML= Math.round(temperature)
    timeElement.innerHTML = formatDate(date)
    getForecast(response.data.city)
}

function formatDate(date){
    
    let minutes=date.getMinutes()
    let hours=date.getHours()

    let days=['Sunday', 'Monday' ,'Tuesday','Wednesday','Thursday' ,'Friday', 'Saturday']
    let day= days[date.getDay()]

 if (minutes < 10) {
        minutes = `0${minutes}`;  
    }

    return`${day} ${hours}:${minutes}`

}

function searchCity(city){
    let apiKey="982o4f7ffabt7303d3885b043bf71d70"
    apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
    console.log(apiUrl)

axios.get(apiUrl).then(refreshWeather)
}
function handleSearch(event){
    event.preventDefault();
    let searchInputElement = document.querySelector("#searchInput")
    searchCity(searchInputElement.value)


}

let searchForm = document.querySelector("#search") 
searchForm.addEventListener("submit",handleSearch)
searchCity("Harare");

function getForecast(city){
   let apiKey="982o4f7ffabt7303d3885b043bf71d70"
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response){
console.log(response.data)
let forecastElement =document.querySelector("#forecast")
let forecastHtml=""

response.data.daily.forEach(function(day,index){
    if (index<5){
forecastHtml =forecastHtml +
`<div class="weather-forecast-day">
    <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <div class="">
        <img class="weather-forecast-icon" id="weather-forecast-icon "src="${day.condition.icon_url}"/>
        </div>
            <div class="weather-forecast-temp">
                <div class="temp-1">
                    <strong>${Math.round(day.temperature.maximum)}</strong>
                </div> 
                <div class="temp-1"> ${Math.round(day.temperature.minimum)}</div>
            </div>
</div>
`;}
})

forecastElement.innerHTML =forecastHtml
}

function formatDay(timestamp){
    
    let date= new Date(timestamp*1000)
    let days=['Sun', 'Mon' ,'Tue','Wed','Thu' ,'Fri', 'Sat']

    return days[date.getDay()]

}
displayForecast()

