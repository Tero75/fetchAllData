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

suggestion.addEventListener("click", (event)=> {
      //to catch selected option
      fetchInput.value = event.target.value
})

fetchAllRobotsButton.addEventListener("click", async ()=> {
    resultArea.insertAdjacentHTML("beforeend","fetching robots...\n")
    let results = await GetResults("people","n/a")
    processQueryResults(results,fetchAllRobotsButton)
})

fetchAllMalesButton.addEventListener("click", async ()=> {
    resultArea.insertAdjacentHTML("beforeend","\nfetching males......\n")
    let results = await GetResults("people","male")
    processQueryResults(results,fetchAllMalesButton)
})

fetchAllFemalesButton.addEventListener("click", async ()=> {
    resultArea.insertAdjacentHTML("beforeend","\nfetching females......\n")
    let results = await GetResults("people","female")
    processQueryResults(results,fetchAllFemalesButton)
})

fetchAllVehiclesButton.addEventListener("click", async ()=> {
    resultArea.insertAdjacentHTML("beforeend","\nfetching vehicles......\n")
    let results = await GetResults("vehicles",null)
    processQueryResults(results,fetchAllVehiclesButton)
})

fetchAllPlanetsButton.addEventListener("click", async ()=> {
    resultArea.insertAdjacentHTML("beforeend","\nfetching planets......\n")
    let results = await GetResults("planets",null)
    processQueryResults(results,fetchAllPlanetsButton)
})

fetchAllSpeciesButton.addEventListener("click", async ()=> {
    resultArea.insertAdjacentHTML("beforeend","\nfetching species......\n")
    let results = await GetResults("species",null)
    processQueryResults(results,fetchAllSpeciesButton)
})

fetchAllStarshipsButton.addEventListener("click", async ()=> {
    resultArea.insertAdjacentHTML("beforeend","\nfetching starships......\n")
    let results = await GetResults("starships",null)
    processQueryResults(results,fetchAllStarshipsButton)
})


fetchAllFilmsButton.addEventListener("click", async ()=> {
    resultArea.insertAdjacentHTML("beforeend","\nfetching films......\n")
    let results = await GetResults("films",null)
    processQueryResults(results,fetchAllFilmsButton)
})

clearResultsButton.addEventListener("click",()=> resultArea.value = "")
refreshPageButton.addEventListener("click",()=> window.location.reload())
getAllDataButton.addEventListener("click",()=> getAllData(fetchInput.value))

function fetchInputAdded (dropDownList){ 
    console.log(suggestion)
    console.log(dropDownList)
    suggestion.size = 1 //resets dropdown list size to default
    
    if ( fetchInput.value != 0) {
        dropDownList.forEach(element => {if (element.label.match(new RegExp(fetchInput.value,'gi'))){element.hidden = false; suggestion.size = suggestion.size + 1;} else element.hidden = true})//hides or reveals options based on regex       
        suggestion.hidden = false //makes dropdown visible       
    }  else {
        suggestion.hidden = true //hides dropdown
    }
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

function getAllData (e){
    const found = resultsArray.find(element => (element.name == e|| element.title == e))
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