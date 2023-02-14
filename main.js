console.log("started....")

//Free Star Wars api
let url = 'https://swapi.dev/api/';

const fetchAllRobotsButton = document.querySelector("#fetchAllRobotsButton")
const fetchAllMalesButton = document.querySelector("#fetchAllMalesButton")
const fetchAllFemalesButton = document.querySelector("#fetchAllFemalesButton")
const fetchAllVehiclesButton = document.querySelector("#fetchAllVehiclesButton")
const fetchInput = document.querySelector("#fetchInput")//text inputfield
const resultArea = document.querySelector("#resultArea")//where results are written
const clearResultsButton = document.querySelector("#clearResultsButton")

fetchAllRobotsButton.addEventListener("click", async ()=> {
    let results = await GetResultByGender("n/a")
    results.forEach(element => resultArea.innerHTML += element.name.toString()+"\n")
})

fetchAllMalesButton.addEventListener("click", async ()=> {
    let results = await GetResultByGender("male")
    results.forEach(element => resultArea.innerHTML += element.name.toString()+"\n")
})

fetchAllFemalesButton.addEventListener("click", async ()=> {
    let results = await GetResultByGender("female")
    results.forEach(element => resultArea.innerHTML += element.name.toString()+"\n")
})

fetchAllVehiclesButton.addEventListener("click", async ()=> {
    let results = await GetAllVehicles()
    results.forEach(element => resultArea.innerHTML += element.name.toString()+"\n")
})

clearResultsButton.addEventListener("click",()=> {
    resultArea.innerHTML = ""
})

async function GetResultByGender(gender){
    let data = await APICall_swapi("people")
    return data.filter(element => element.gender == gender )
}

async function GetAllVehicles(){
    let data = await APICall_swapi("vehicles")
    return data.filter(element => element.passengers)
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