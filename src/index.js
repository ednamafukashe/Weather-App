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
    iconImage.innerHTML = `<img src="${response.data.condition.icon_url}" alt="Weather icon" class="weather-icon"/>`;
    cityElement.innerHTML = response.data.city
    windElement.innerHTML = `${response.data.wind.speed}km/h`
    descriptionElement.innerHTML = `, ${response.data.condition.description}`
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`
    temperatureElement.innerHTML= Math.round(temperature)
    timeElement.innerHTML = formatDate(date)
}

function formatDate(date){
    
    let minutes=date.getMinutes()
    let hours=date.getHours()

    let days=['Sunday', 'Monday' ,'Tuesday','Wednesday','Thursday' ,'Friday', 'Saturday']
    let day= days[date.getDay()]

    if (minutes<10){
        `0${minutes}`
    }

    return`${day} ${hours}:${minutes}`

}

function searchCity(city){
    let apiKey="982o4f7ffabt7303d3885b043bf71d70"
    apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
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

function displayForecast(){
let forecastElement =document.querySelector("#forecast")
let days = ['Tue', 'Wed' ,'Thu','Fri','Sat']
let forecastHtml=""
 
days.forEach(function(day){
forecastHtml =forecastHtml +
`<div class="weather-forecast-day">
    <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
            <div class="weather-forecast-temp">
                <div class="temp-1">
                    <strong>15&deg</strong>
                </div> 
                <div class="temp-1"> 12&deg</div>
            </div>
</div>
`;})
forecastElement.innerHTML =forecastHtml
}

displayForecast()

