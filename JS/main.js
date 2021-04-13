
import {countElements, Products} from './module.js'

/************************************************/
/***************Defining classes*****************/
/************************************************/

class Product {
    constructor(typus, number, price, volume){
        this.typus = typus;
        this.number = number;
        this.price = price;
        this.volume = volume;
    }
}

class Fruit extends Product{
    constructor(volume){
        super(volume);
        this.volume = null;
    }
}

const appleClass = new Fruit(Products[0,0],Products[0,1], Products[0,2]);
const orangeClass = new Fruit(Products[1,0],Products[1,1], Products[1,2]);
const bannanaClass = new Fruit(Products[2,0],Products[2,1], Products[2,2]);
const milkClass = new Product(Products[3,0],Products[3,1], Products[3,2], Products[3,3]);

/************************************************/
/*****************FUNCTIONS**********************/
/************************************************/

/***************General Functions****************/


String.prototype.removeCharAt = function () { 
    var tmp = this.split(''); // convert to an array
    tmp.splice(- 1 , 1); // remove 1 element from the array (adjusting for non-zero-indexed counts)
    return tmp.join(''); // reconstruct the string
}


/************************************************/

/***************Filling the market***************/

/* As a repetitive stuff on the html document, we choose to fill the market in here*/

const FillMarketHTML = (product, number) => {
    return `
    <img class = '${product}s' id='${product}${number}' src="./IMG/${product}.png" draggable="true" ondragstart="drag(event)" alt="${product}">
    `
} 

function renderFruits(product, number) {
    const Container = `#${product}Container`;
    document.querySelector(Container).innerHTML = "" //First we clean up the container.
    for (let i=1; i<=number; i++) {
        document.querySelector(Container).innerHTML += FillMarketHTML(product, i);
    }
}

function renderBoxes(productMatrix) {
    for (const product of productMatrix) {
        renderFruits(product[0], product[1]);
    }
}
renderBoxes(Products);

/************************************************/
/***************Drag & Drop functions************/

function allowDrop(ev) {
    ev.preventDefault();
}  
function drag(ev) {
    ev.dataTransfer.setData("text",ev.target.id);
}
  
function drop(ev) {
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data))

    dragAndDropElement(data);
}

async function dragAndDropElement (element){    
    try {
        await countElements(element); 
    } catch (error) {
        console.error(error);
    }
}

window.allowDrop = allowDrop;
window.drag = drag;
window.drop = drop;

/************************************************/

/*****************Clean Button Functions*********/

let cleanProcess = () => {
    document.querySelector('#innerTroller').innerHTML="";
    return new Promise(function (resolve, reject){
        resolve(`Troller empty`);
        reject('Error');
    })
}

async function cleanTroller() {
    renderBoxes(Products);
    var cleaning = await cleanProcess();
    document.querySelector('#pricesTable').innerHTML="";
    console.log(cleaning);
}

window.cleanTroller = cleanTroller; //globalizing the function

/***********************************************/

/*******************Shop Functions**************/

async function openShopPage(){
    window.open('./shop.html','',);
}

window.openShopPage = openShopPage
