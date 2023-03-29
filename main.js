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
const datalist = document.querySelector("#suggestion")
let resultsArray = new Array

fetchInput.addEventListener("input",()=>{
    fetchInputAdded()
})

fetchAllRobotsButton.addEventListener("click", async ()=> {
    resultArea.insertAdjacentHTML("beforeend","fetching robots...\n")
    let results = await GetResultByGender("n/a")
    fetchAllRobotsButtonPressed(results)
})

fetchAllMalesButton.addEventListener("click", async ()=> {
    resultArea.insertAdjacentHTML("beforeend","\nfetching males......\n")
    let results = await GetResultByGender("male")
    fetchAllMalesButtonPressed(results)
})

fetchAllFemalesButton.addEventListener("click", async ()=> {
    resultArea.insertAdjacentHTML("beforeend","\nfetching females......\n")
    let results = await GetResultByGender("female")
    fetchAllFemalesButtonPressed(results)
})

fetchAllVehiclesButton.addEventListener("click", async ()=> {
    resultArea.insertAdjacentHTML("beforeend","\nfetching vehicles......\n")
    let results = await GetAllVehicles()
    fetchAllVehiclesButtonPressed(results)
})

fetchAllPlanetsButton.addEventListener("click", async ()=> {
    resultArea.insertAdjacentHTML("beforeend","\nfetching planets......\n")
    let results = await GetAllPlanets()
    fetchAllPlanetsButtonPressed(results)
})

fetchAllSpeciesButton.addEventListener("click", async ()=> {
    resultArea.insertAdjacentHTML("beforeend","\nfetching species......\n")
    let results = await GetAllSpecies()
    fetchAllSpeciesButtonPressed(results)
})

fetchAllStarshipsButton.addEventListener("click", async ()=> {
    resultArea.insertAdjacentHTML("beforeend","\nfetching starships......\n")
    let results = await GetAllStarships()
    fetchAllStarshipsButtonPressed(results)
})


fetchAllFilmsButton.addEventListener("click", async ()=> {
    resultArea.insertAdjacentHTML("beforeend","\nfetching films......\n")
    let results = await GetAllFilms()
    fetchAllFilmsButtonPressed(results)
})

clearResultsButton.addEventListener("click",()=> {resultArea.innerHTML = ""})
refreshPageButton.addEventListener("click",()=>{window.location.reload()})
getAllDataButton.addEventListener("click",()=>{ getAllData()})

function fetchInputAdded (){    
    removeAllChildNodes(datalist) // delete previous datalist before creating new
    resultsArray.map(element => element.name ||element.title).forEach(element => {if(element.match(new RegExp(fetchInput.value,'gi'))) showSuggestions(element)})
}

function showSuggestions(searchItem){
    let options = document.createElement("option")
    options.value = searchItem
    datalist.appendChild(options)
}

function fetchAllRobotsButtonPressed (results){
    document.querySelector("#fetchAllRobotsButton").disabled = true
    
    resultsArray.push(...results)//so that you can search all added robots persons and vehicles
    results.forEach(element => resultArea.insertAdjacentText("beforeend",element.name +" / ") )
    
}

function fetchAllMalesButtonPressed(results){
    document.querySelector("#fetchAllMalesButton").disabled = true    
    resultsArray.push(...results)
    results.forEach(element => resultArea.insertAdjacentText("beforeend",element.name +" / ") )
    
}

function fetchAllFemalesButtonPressed(results){
    document.querySelector("#fetchAllFemalesButton").disabled = true    
    resultsArray.push(...results)
    results.forEach(element => resultArea.insertAdjacentText("beforeend",element.name +" / ") )
    
}

function fetchAllVehiclesButtonPressed(results){
    document.querySelector("#fetchAllVehiclesButton").disabled = true    
    resultsArray.push(...results)
    results.forEach(element => resultArea.insertAdjacentText("beforeend",element.name +" / ") )
    
}

function fetchAllPlanetsButtonPressed(results){
    document.querySelector("#fetchAllPlanetsButton").disabled = true    
    resultsArray.push(...results)
    results.forEach(element => resultArea.insertAdjacentText("beforeend",element.name +" / ") )
    
}

function fetchAllSpeciesButtonPressed(results){
    document.querySelector("#fetchAllSpeciesButton").disabled = true    
    resultsArray.push(...results)
    results.forEach(element => resultArea.insertAdjacentText("beforeend",element.name +" / ") )
    
}

function fetchAllStarshipsButtonPressed(results){
    document.querySelector("#fetchAllStarshipsButton").disabled = true    
    resultsArray.push(...results)
    results.forEach(element => resultArea.insertAdjacentText("beforeend",element.name +" / ") )
    
}

function fetchAllFilmsButtonPressed(results){
    document.querySelector("#fetchAllFilmsButton").disabled = true    
    resultsArray.push(...results)
    results.forEach(element => resultArea.insertAdjacentText("beforeend",element.title +" / ") )

}

function getAllData (){
    resultsArray.forEach((element,index) =>{if(element.name==fetchInput.value||element.title==fetchInput.value) resultArea.insertAdjacentText("beforeend", Object.entries(resultsArray[index]).map(([key, value]) => `${key}: ${value}\n`).join(''))} )
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

async function GetResultByGender(gender){
    let data = await APICall_swapi("people")
    return data.filter(element => element.gender == gender )
}

async function GetAllVehicles(){
    let data = await APICall_swapi("vehicles")
    return data
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