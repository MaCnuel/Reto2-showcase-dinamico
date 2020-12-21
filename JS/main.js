
/************************************************/
/***************Filling the market***************/
/************************************************/

/***************Defining classes*****************/

const Products = [['apple', 3, 10], ['orange', 4, 10], [ 'bannana', 2, 8],['milk',2,20, 1]];

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

/***************Filling the HTML*****************/

const FillMarketHTML = (product, number) => {
    return `
    <img class = '${product}s' id='${product}${number}' src="./IMG/${product}.png" draggable="true" ondragstart="drag(event)" alt="${product}">
    `
} 

function renderFruits(product, number) {
    const Container = `#${product}Container`;
    document.querySelector(Container).innerHTML = "" //First we clean up the container.
    for (i=1; i<=number; i++) {
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
/*****************FUNCTIONS**********************/
/************************************************/

function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
  
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}