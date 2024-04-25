console.log("started....")

//Free Star Wars api
let url = 'https://swapi.dev/api/';
let resultsArray = [];

//get data from html

const fetchAllRobotsButton = document.querySelector("#fetchAllRobotsButton")
const fetchAllMalesButton = document.querySelector("#fetchAllMalesButton")
const fetchAllFemalesButton = document.querySelector("#fetchAllFemalesButton")
const fetchAllVehiclesButton = document.querySelector("#fetchAllVehiclesButton")
const fetchAllPlanetsButton = document.querySelector("#fetchAllPlanetsButton")
const fetchAllSpeciesButton = document.querySelector("#fetchAllSpeciesButton")
const fetchAllStarshipsButton = document.querySelector("#fetchAllStarshipsButton")
const fetchAllFilmsButton = document.querySelector("#fetchAllFilmsButton")
const resultArea = document.querySelector("#resultArea")
const fetchInput = document.querySelector("#dropdown")
const getAllDataButton = document.querySelector("#getAllDataButton")
const clearResultsButton = document.querySelector("#clearResultsButton")
const refreshPageButton = document.querySelector("#refreshPageButton")
const suggestion = document.querySelector("#suggestion")

//eventListeners

fetchInput.addEventListener("input",()=>{
    //get text written to search... bar
    let nodeList = document.getElementsByTagName('option') // makes live nodelist
    const dropDownList = Array.from(nodeList) // convert's nodelist to real array so you can foreach()
    fetchInputAdded(dropDownList)
})

fetchAllRobotsButton.addEventListener("click", fetchAllRobotsButtonPressed)
fetchAllMalesButton.addEventListener("click", fetchAllMalesButtonPressed)
fetchAllFemalesButton.addEventListener("click", fetchAllFemalesButtonPressed)
fetchAllVehiclesButton.addEventListener("click", fetchAllVehiclesButtonPressed)
fetchAllPlanetsButton.addEventListener("click", fetchAllPlanetsButtonPressed)
fetchAllSpeciesButton.addEventListener("click", fetchAllSpeciesButtonPressed)
fetchAllStarshipsButton.addEventListener("click", fetchAllStarshipsButtonPressed)
fetchAllFilmsButton.addEventListener("click", fetchAllFilmsButtonPressed)
clearResultsButton.addEventListener("click",()=> resultArea.remove())
refreshPageButton.addEventListener("click",()=> window.location.reload())
getAllDataButton.addEventListener("click",()=> getAllData(fetchInput.value))

//button press handler functions

async function fetchAllRobotsButtonPressed(){
    resultArea.insertAdjacentHTML("beforeend","<br>Fetching all robots...<br>")
    let results = await GetResults("people","n/a")
    processQueryResults(results,fetchAllRobotsButton)
}

async function fetchAllMalesButtonPressed(){
    resultArea.insertAdjacentHTML("beforeend","<br>Fetching all males...<br>")
    let results = await GetResults("people","male")
    processQueryResults(results,fetchAllMalesButton)
}

async function fetchAllFemalesButtonPressed(){
    resultArea.insertAdjacentHTML("beforeend","<br>Fetching all females...<br>")
    let results = await GetResults("people","female")
    processQueryResults(results,fetchAllFemalesButton)
}

async function fetchAllVehiclesButtonPressed(){
    resultArea.insertAdjacentHTML("beforeend","<br>Fetching all vehicles...<br>")
    let results = await GetResults("vehicles")
    processQueryResults(results,fetchAllVehiclesButton)
}

async function fetchAllPlanetsButtonPressed(){
    resultArea.insertAdjacentHTML("beforeend","<br>Fetching all planets...<br>")
    let results = await GetResults("planets")
    processQueryResults(results,fetchAllPlanetsButton)
}

async function fetchAllSpeciesButtonPressed(){
    resultArea.insertAdjacentHTML("beforeend","<br>Fetching all species...<br>")
    let results = await GetResults("species")
    processQueryResults(results,fetchAllSpeciesButton)
}

async function fetchAllStarshipsButtonPressed(){
    resultArea.insertAdjacentHTML("beforeend","<br>Fetching all starships...<br>")
    let results = await GetResults("starships")
    processQueryResults(results,fetchAllStarshipsButton)
}

async function fetchAllFilmsButtonPressed(){
    resultArea.insertAdjacentHTML("beforeend","<br>Fetching all films...<br>")
    let results = await GetResults("films")
    processQueryResults(results,fetchAllFilmsButton)
}

//dropdownlist handler functions

function fetchInputAdded (dropDownList){ 
    let regex = new RegExp(fetchInput.value,'gi')
    let ELEMENT_HIDDEN_FALSE = "element.hidden = false"
    let ELEMENT_HIDDEN_TRUE = "element.hidden = true"
    dropDownList.forEach(element => (element.label.match(regex))? ELEMENT_HIDDEN_TRUE: ELEMENT_HIDDEN_FALSE)//hides or reveals options based on regex   
}

function addToDropDownList(searchItem){
    let options = document.createElement("option")
    options.value = searchItem
    options.textContent = searchItem
    suggestion.appendChild(options)
}

// results handler functions

function processQueryResults(results , buttonToDisable) {
    buttonToDisable.disabled = true
    resultsArray.push(...results)
    results.forEach(element => {addToDropDownList(element.title||element.name); resultArea.insertAdjacentText("beforeend",(element.title||element.name) + " / " );})
}

function getAllData (witchData){
    const found = resultsArray.find(element => (element.name == witchData|| element.title == witchData))
    resultArea.insertAdjacentHTML("beforeend",Object.entries(found).map(([key, value]) =>`<br>${key}: ${value}`).join(''))
}

async function GetResults(parameter,gender) {
    let data = await APICall_swapi(parameter)
    return data.filter(element => element.gender == gender)
}

async function APICall_swapi(args){
    let response = await fetch(url+args);
    if(response.ok){
        let data = await response.json(); // read response body and parse as JSON
        return data.results
    }
    if(!response.ok){
        console.log(response.status)
    }
}