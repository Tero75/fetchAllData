console.log("started....")

//Free Star Wars api
let url = 'https://swapi.dev/api/';

const fetchAllRobotsButton = document.querySelector("#fetchAllRobotsButton")
const fetchAllMalesButton = document.querySelector("#fetchAllMalesButton")
const fetchAllFemalesButton = document.querySelector("#fetchAllFemalesButton")
const fetchAllVehiclesButton = document.querySelector("#fetchAllVehiclesButton")
const fetchAllPlanetsButton = document.querySelector("#fetchAllPlanetsButton")
const fetchAllSpeciesButton = document.querySelector("#fetchAllSpeciesButton")
const fetchAllStarshipsButton = document.querySelector("#fetchAllStarshipsButton")
const fetchAllFilmsButton = document.querySelector("#fetchAllFilmsButton")
const resultArea = document.querySelector("#resultArea")
const fetchInput = document.querySelector("#fetchInput")
const getAllDataButton = document.querySelector("#getAllDataButton")
const clearResultsButton = document.querySelector("#clearResultsButton")
const refreshPageButton = document.querySelector("#refreshPageButton")
let resultsArray = new Array

fetchInput.addEventListener("input",(e)=>{
    let searchParameter = new RegExp(e.data,'i') 
    resultsArray.map(element => element.name ||element.title).forEach(element => {if(element.match(searchParameter)) resultArea.insertAdjacentHTML("beforeend",element + "\n")})   
})

fetchAllRobotsButton.addEventListener("click", async ()=> {
    document.querySelector("#fetchAllRobotsButton").disabled = true
    resultArea.insertAdjacentHTML("beforeend","fetching robots...\n")
    let results = await GetResultByGender("n/a")
    resultsArray.push(...results)//so that you can search all added robots persons and vehicles
    results.forEach(element => resultArea.insertAdjacentHTML("beforeend",element.name +" / ") )
})

fetchAllMalesButton.addEventListener("click", async ()=> {
    document.querySelector("#fetchAllMalesButton").disabled = true
    resultArea.insertAdjacentHTML("beforeend","\nfetching males......\n")
    let results = await GetResultByGender("male")
    resultsArray.push(...results)
    results.forEach(element => resultArea.insertAdjacentHTML("beforeend",element.name +" / ") )
})

fetchAllFemalesButton.addEventListener("click", async ()=> {
    document.querySelector("#fetchAllFemalesButton").disabled = true
    resultArea.insertAdjacentHTML("beforeend","\nfetching females......\n")
    let results = await GetResultByGender("female")
    resultsArray.push(...results)
    results.forEach(element => resultArea.insertAdjacentHTML("beforeend",element.name +" / ") )
})

fetchAllVehiclesButton.addEventListener("click", async ()=> {
    document.querySelector("#fetchAllVehiclesButton").disabled = true
    resultArea.insertAdjacentHTML("beforeend","\nfetching vehicles......\n")
    let results = await GetAllVehicles()
    resultsArray.push(...results)
    results.forEach(element => resultArea.insertAdjacentHTML("beforeend",element.name +" / ") )
})

fetchAllPlanetsButton.addEventListener("click", async ()=> {
    document.querySelector("#fetchAllPlanetsButton").disabled = true
    resultArea.insertAdjacentHTML("beforeend","\nfetching planets......\n")
    let results = await GetAllPlanets()
    resultsArray.push(...results)
    results.forEach(element => resultArea.insertAdjacentHTML("beforeend",element.name +" / ") )
})

fetchAllSpeciesButton.addEventListener("click", async ()=> {
    document.querySelector("#fetchAllSpeciesButton").disabled = true
    resultArea.insertAdjacentHTML("beforeend","\nfetching planets......\n")
    let results = await GetAllSpecies()
    resultsArray.push(...results)
    results.forEach(element => resultArea.insertAdjacentHTML("beforeend",element.name +" / ") )
})

fetchAllStarshipsButton.addEventListener("click", async ()=> {
    document.querySelector("#fetchAllStarshipsButton").disabled = true
    resultArea.insertAdjacentHTML("beforeend","\nfetching planets......\n")
    let results = await GetAllStarships()
    resultsArray.push(...results)
    results.forEach(element => resultArea.insertAdjacentHTML("beforeend",element.name +" / ") )
})

fetchAllFilmsButton.addEventListener("click", async ()=> {
    document.querySelector("#fetchAllFilmsButton").disabled = true
    resultArea.insertAdjacentHTML("beforeend","\nfetching films......\n")
    let results = await GetAllFilms()
    resultsArray.push(...results)
    results.forEach(element => resultArea.insertAdjacentHTML("beforeend",element.title +" / ") )
})


clearResultsButton.addEventListener("click",()=> {resultArea.innerHTML = ""})
refreshPageButton.addEventListener("click",()=>{window.location.reload()})
getAllDataButton.addEventListener("click",()=>{ getAllData()})

function getAllData (){
    resultsArray.forEach((element,index) =>{if(element.name==fetchInput.value||element.title==fetchInput.value) resultArea.insertAdjacentHTML("beforeend", Object.entries(resultsArray[index]).map(([key, value]) => `${key}: ${value}\n`).join(''))} )
}

async function GetResultByGender(gender){
    let data = await APICall_swapi("people")
    return data.filter(element => element.gender == gender )
}

async function GetAllVehicles(){
    let data = await APICall_swapi("vehicles")
    return data.filter(element => element.passengers)
}

async function GetAllPlanets(){
    let data = await APICall_swapi("planets")
    return data
}

async function GetAllSpecies(){
    let data = await APICall_swapi("species")
    return data
}

async function GetAllStarships(){
    let data = await APICall_swapi("starships")
   return data
}

async function GetAllFilms(){
    let data = await APICall_swapi("films")
    return data
}

async function APICall_swapi(args){
    let response = await fetch(url+args);
    if(response.ok){
        let data = await response.json(); // read response body and parse as JSON
        return data.results
    }else{
        console.log(response.status)
    }
}