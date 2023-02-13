console.log("started....")

//Free Star Wars api
let url = 'https://swapi.dev/api/';

const fetchButton = document.querySelector("#fetchButton")
const fetchAllMalesButton = document.querySelector("#fetchAllMalesButton")
const fetchAllFemalesButton = document.querySelector("#fetchAllFemalesButton")
const fetchAllVehiclesButton = document.querySelector("#fetchAllVehiclesButton")
const fetchInput = document.querySelector("#fetchInput")
const resultArea = document.querySelector("#resultArea")
const clearResultsButton = document.querySelector("#clearResultsButton")

fetchButton.addEventListener("click", async ()=> {
    console.log("Fetch Button pressed")
    let results = await GetResultByGender("n/a")
    results.forEach(element => resultArea.innerHTML += element.name.toString()+"\n")
})

fetchAllMalesButton.addEventListener("click", async ()=> {
    console.log("Fetch Button pressed")
    let results = await GetResultByGender("male")
    results.forEach(element => resultArea.innerHTML += element.name.toString()+"\n")
})

fetchAllFemalesButton.addEventListener("click", async ()=> {
    console.log("Fetch Button pressed")
    let results = await GetResultByGender("female")
    results.forEach(element => resultArea.innerHTML += element.name.toString()+"\n")
})

fetchAllVehiclesButton.addEventListener("click", async ()=> {
    console.log("Fetch Button pressed")
    let results = await GetAllVehicles()
    results.forEach(element => resultArea.innerHTML += element.name.toString()+"\n")
})

clearResultsButton.addEventListener("click",()=> {
    console.log("Clear Result Button pressed")
    let results = ""
    resultArea.innerHTML = results
})

async function GetResultByGender(gender){
    console.log("Getting names")
    let data = await APICall_swapi("people")
    let robots = new Array();
    let temp = new Array();
    let input = document.getElementById("fetchInput").value
    robots = data.filter(element => element.gender == gender )
    temp = robots.filter(element => element.name == input)
    if (temp.length > 0){
        await PrintSomeData(temp)
    }
    return robots
}

async function GetAllVehicles(){
    console.log("Getting vehicles")
    let data = await APICall_swapi("vehicles")
    let robots = new Array();
    let input = document.getElementById("fetchInput").value
    robots = data.filter(element => element.passengers >= input )    
    console.log(robots)
    return robots
}

async function PrintSomeData(temp){

    resultArea.innerHTML += "name: " + temp[0].name.toString()+"\n"
    resultArea.innerHTML += "Birth year: " + temp[0].birth_year.toString()+"\n"
    resultArea.innerHTML += "Eye color: " + temp[0].eye_color.toString()+"\n"
    resultArea.innerHTML += "Gender: " + temp[0].gender.toString()+"\n"
    resultArea.innerHTML += "Hair color: " + temp[0].hair_color.toString()+"\n"
    resultArea.innerHTML += "Mass: "  + temp[0].mass.toString()+"\n"
    resultArea.innerHTML += "Skin color: " + temp[0].skin_color.toString()+"\n"
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