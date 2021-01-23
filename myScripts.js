// these are all the buttons from the page
let main = document.getElementById('main');
let addUserBtn = document.getElementById('add_user');
let doubleBtn = document.getElementById('double');
let millionareBtn = document.getElementById('show_millionare');
let sortBtn = document.getElementById('sort');
let calculateBtn = document.getElementById('calculate_wealth');

//people Data

let data = [];
//3 different users display on the ui
getRandomUser();
getRandomUser();
getRandomUser();

//fetch random user data from randomuser api

async function getRandomUser() {
    let res = await fetch('https://randomuser.me/api'); //this is from a fake api user database using async 
    let data = await res.json();

    let user = data.results[0];
    //adding the newUser and display the object info by name and last name aswell as their money
    let newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
        // math.floor rounds the number down... math.random generatos a random number multiply by a million
    };
    addData(newUser);
}
// add new object to data array

function addData(obj) {
    data.push(obj);
    updateDOM();
}

//double the money by clicking doubleBtn
function doubleMoney() {
    data = data.map((user) => { //using .map goes thru everysingle user in the arr and modifies it
        return { //using the three dots copys what is in the data already (is call spread operator ...user)
            ...user,
            money: user.money * 2
        };
    });
    updateDOM();
}
//sorting MONEY FUNCTION

function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}
// update dom to add user to the document and display it/ reset clear all the displayed user and start again
//FILTER ONLY MILLIONARES///////////////////


function show_millionare() {
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

//CALCULATING THE total WEALTH ////////////
function calculate_wealth() {
    let wealth = data.reduce((acc, user) => (acc += user.money), 0);
    let wealthEl = document.createElement('div');

    wealthEl.innerHTML = `<h3>Total Wealth : <strong>${formatM(wealth)}</strtong></h3>`;
    main.appendChild(wealthEl);
}



function updateDOM(providedData = data) { // providedData in this case is preset to the data arr

    //clear the main div
    main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>"; // this is to write on the page 
    providedData.forEach(function (item) { //declaring the forEach loup with the perimetro item, it should habe benn people instead of item
        let element = document.createElement('div'); // create a div for the information on the page
        element.classList.add('person'); // grabbing the class person and adding it with classList
        element.innerHTML = `<strong>${item.name}</strong> ${formatM(item.money)}`; //grabbing Element and creating the name and money wrapping money with the formatM funct

        main.appendChild(element); //appending the created info from the innerHTML and appdending it onto the page
    });
}
// format number as dinero

function formatM(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); //this is to concat and make it look like money qty 
}
// event listener BUTTONS 
addUserBtn.addEventListener("click", getRandomUser); // when you press button add user it will spit out different users (this is declare above getRandomUser)
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
millionareBtn.addEventListener("click", show_millionare);
calculateBtn.addEventListener("click", calculate_wealth);

// watch with ////punto y coma//// al final de cada linea de codigo que en VANILLAJS son muy importantes