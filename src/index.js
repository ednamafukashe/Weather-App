
function handleSearch(event){
    event.preventDefault();
    let searchInputElement = document.querySelector("#searchInput")
    let cityElement =document.querySelector("#city")
    cityElement.innerHTML = searchInputElement.value


}

let searchForm = document.querySelector("#search") 
searchForm.addEventListener("submit",handleSearch)