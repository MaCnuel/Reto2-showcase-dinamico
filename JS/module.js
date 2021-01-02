var productTable = [];

/************************************************/
/***************Price Functions******************/
/************************************************/

const Products = [['apple', 3, 10], ['orange', 4, 10], [ 'bannana', 2, 8],['milk',2,20, 1]];

function priceFunction(product) {
    for (const prod of Products) {
        switch (prod[0]) {
            case product[0]:
                return prod[2] * product[1];
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

async function TotalQuantity(productsTable){ //function to get the total price of the whole cart

    let totalPrice = 0;
    for (const product of productsTable){
        totalPrice += priceFunction(product)
    } 
    return totalPrice;
}

async function FillCart(productsTable){

    const pricesTable = document.querySelector('#pricesTable')
    pricesTable.innerHTML=`<tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>` //initialicing table

    for(const product of productsTable){//FILLING THE BODY
        pricesTable.innerHTML += await FillCartHTML(product);        
    }

    let totalPrice = await TotalQuantity(productsTable);//adding the last line with total cost
    pricesTable.innerHTML += `<tr>
                                <th>TOTAL</th>
                                <th></th>
                                <th>${totalPrice} €</th>
                            </tr>`;
    console.log(productTable);
}

let countElementOnCart = () => {
    var productsTable = []
    /*Generating the product table of the inner products in your troller*/
    for (const product of Products) {
        var productQtyInTroller = document.getElementById('innerTroller').getElementsByClassName(`${product[0]}s`).length;
        //Qty of Product "i" in innerTroller
        productsTable.push([product[0], productQtyInTroller]); //Table of Products inside the troller
    }

    return productsTable;
}


async function countElements(element) {
    var productsTable = countElementOnCart();
    productTable = productsTable;

    /*Sending productTable to the HTML generator*/
    FillCart(productsTable);

    return new Promise((res, rej) => {
        res(`A ${element} added to your cart`);
    });
}

export {countElements, FillCart, Products, productTable};