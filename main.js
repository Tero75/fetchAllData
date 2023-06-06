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
const suggestion = document.querySelector("#suggestion")
let resultsArray = []

fetchInput.addEventListener("input",()=>{
    //get text written to search... bar
    let nodeList = document.getElementsByTagName('option') // makes live nodelist
    const dropDownList = Array.from(nodeList) // convert nodelist to real array so you can foreach()
    if(dropDownList.map( x => x.label).join("").match(new RegExp(fetchInput.value,'gi'))) fetchInputAdded(dropDownList);
})

fetchAllRobotsButton.addEventListener("click",()=> handleButtonPress("robots","people","n/a",fetchAllRobotsButton))
fetchAllMalesButton.addEventListener("click", ()=> handleButtonPress("males","people","male",fetchAllMalesButton))
fetchAllFemalesButton.addEventListener("click", ()=> handleButtonPress("females","people","female",fetchAllFemalesButton))
fetchAllVehiclesButton.addEventListener("click", ()=> handleButtonPress("vehicles","vehicles",null,fetchAllVehiclesButton))
fetchAllPlanetsButton.addEventListener("click", ()=> handleButtonPress("planets","planets",null,fetchAllPlanetsButton))
fetchAllSpeciesButton.addEventListener("click", ()=> handleButtonPress("species","species",null,fetchAllSpeciesButton))
fetchAllStarshipsButton.addEventListener("click", ()=> handleButtonPress("starships","starships",null,fetchAllStarshipsButton))
fetchAllFilmsButton.addEventListener("click", ()=> handleButtonPress("films","films",null,fetchAllFilmsButton))
clearResultsButton.addEventListener("click",()=> resultArea.value = "")
refreshPageButton.addEventListener("click",()=> window.location.reload())
getAllDataButton.addEventListener("click",()=> getAllData(fetchInput.value))

async function handleButtonPress(collectionName, collection, filterCollectionWith, buttonToDisable){
    resultArea.insertAdjacentHTML("beforeend",`fetching ${collectionName} ...\n`)
    let results = await GetResults(collection,filterCollectionWith)
    processQueryResults(results,buttonToDisable)
}

function fetchInputAdded (dropDownList){ 
    dropDownList.forEach(element => {if (element.label.match(new RegExp(fetchInput.value,'gi'))){element.hidden = false} else element.hidden = true})//hides or reveals options based on regex       
}

function addToDropDownList(searchItem){
    let options = document.createElement("option")
    options.value = searchItem
    options.textContent = searchItem
    suggestion.appendChild(options)
}

function processQueryResults(results , buttonToDisable) {
    buttonToDisable.disabled = true
    resultsArray.push(...results)
    results.forEach(element => {addToDropDownList(element.title||element.name); resultArea.insertAdjacentText("beforeend",(element.title||element.name) + " / " );})
}

function getAllData (witchData){
    const found = resultsArray.find(element => (element.name == witchData|| element.title == witchData))
    resultArea.insertAdjacentText("beforeend", Object.entries(found).map(([key, value]) => `\n${key}: ${value}`).join(''))
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
    }else{
        console.log(response.status)
    }
}