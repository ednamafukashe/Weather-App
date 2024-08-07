function refreshWeather(response){
    let temperatureElement=document.querySelector("#temperature")
    let temperature= response.data.temperature.current
    let cityElement =document.querySelector("#city")
    cityElement.innerHTML = response.data.city

    temperatureElement.innerHTML= Math.round(temperature)
   
    

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
searchCity("Harare")