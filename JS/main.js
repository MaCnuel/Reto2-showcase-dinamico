/************************************************/
/***************Defining classes*****************/
/************************************************/

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

/****************Drag & Drop********************/

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

/************************************************/

/******************Prices Functions*************/

let priceFunction = (product) => { //Function to get the price of the product (multiplying the single product value (Products[i,2]) with the quantity of each product on the cart) 
    for (const prod of Products){
        switch (prod[0]){
            case product[0]:
                return prod[2]*product[1];
        }

    }
}
async function FillCartHTML(product) {
    let price = priceFunction(product); //First we calculate the price 
    return `
        <tr>
            <th>${product[0]}</th>
            <th>${product[1]}</th>
            <th>${price} €</th>
    `
}

async function TotalQuantity(productTable){ //function to get the total price of the whole cart

    let totalPrice = 0;
    for (const product of productTable){
        totalPrice += priceFunction(product)
    } 
    return totalPrice;
}

async function FillCart(productTable){

    const pricesTable = document.querySelector('#pricesTable')
    pricesTable.innerHTML=`<tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>` //initialicing table

    for(const product of productTable){//FILLING THE BODY
        pricesTable.innerHTML += await FillCartHTML(product);
    }

    let totalPrice = await TotalQuantity(productTable);//adding the last line with total cost
    pricesTable.innerHTML += `<tr>
                                <th>TOTAL</th>
                                <th></th>
                                <th>${totalPrice} €</th>
                            </tr>`;
}

async function countElements(element) {

    /*Generating the product table of the inner products in your troller*/
    const productTable = [];
    for (const product of Products) {
        var productQtyInTroller = document.getElementById('innerTroller').getElementsByClassName(`${product[0]}s`).length;
        //Qty of Product "i" in innerTroller
        productTable.push([product[0], productQtyInTroller]); //Table of Products inside the troller
    }
    console.log(productTable);
    /*Sending productTable to the HTML generator*/
    FillCart(productTable);

    return new Promise((res, rej) => {
        res(`A ${element} added to your cart`);
    });
}

async function dragAndDropElement (element){
//    element = element.removeCharAt(); //removing the last character from the fruit id (i.e. the number)

    try {
        await countElements(element); 
    } catch (error) {
        console.error(error);
    }
}
