let menus = [];

let prices = [];

let amounts = [];

function addToBasket(dish, price) {
    let index = getMenuIndex(dish);// kann geshen werden ob das menü elemant schon vohanden ist!
    if (index == -1) {// wenn es nicht vorhand ist pasiert das...
        menus.push(dish);
        prices.push(price);
        amounts.push(1);
    } else {//wenn es schon vorhanden ist wir nur die anzahl erhöt!!
        amounts[index]++;
    }
    shoppingBasket()
}

function getMenuIndex(menu) {  //um zu gucken ob das enlemen schon vorhanden ist!!
    return menus.indexOf(menu);
}

function shoppingBasket() {
    let items = document.getElementById('choosenDishes');
    items.innerHTML = '';
    let sum = 0;

    for (let i = 0; i < menus.length; i++) {
        items.innerHTML += basketTamplate(i);
        sum += prices[i] * amounts[i];
    }
    let finalSum = sum + 3.00;
    items.innerHTML += finalPriceTemplate(sum, finalSum);
    let smallDisplay = document.getElementById('small-screan')
    smallDisplay.innerHTML = `
    <div class="buy-button" onclick="buySamll()"><h2>Bezahlen ${finalSum.toFixed(2)} €</h2></div>
    `;
}

function finalPriceTemplate(sum, finalSum) {

    return `
    <div class="final-price" id="finalPrice">
        <div class="price">
        <p>Zwischensumme</p><p>${sum.toFixed(2)} €</p>
        </div>
        <div class="price">
        <p>Lieferkosten</p><p>3,00 €</p>
        </div>
        <div class="price">
        <h4>Gesamt</h4><h4>${finalSum.toFixed(2)} €</h4>
        </div>
    </div>
    <div class="buy-button" onclick="buy()"><h2>Bezahlen ${finalSum.toFixed(2)} €</h2></div>
    `;
}

function basketTamplate(i) {
    const dish = menus[i];
    let dishSum = prices[i] * amounts[i];

    return `
            <div class="dish">
                <div class="dish-top">
                    <h3>${dish}</h3>
                    <p id="priceDisch${i}">${dishSum.toFixed(2)} €</p>
                </div>
                <div class="dish-bottom">
                    <div>
                        <p>Menge: ${amounts[i]}</p>
                        <img src="./img/plus.png" alt="plus" onclick="addAmount(${i})">
                        <img src="./img/minus.png" alt="minus" onclick="subtractAmount(${i})">
                    </div>
                    <img class="bin" src="./img/bin.png" alt="delete" onclick="cancel(${i})">
                </div>
            </div>
        `;
}

function addAmount(i) {
    amounts[i]++;
    shoppingBasket();
}

function subtractAmount(i) {
    amounts[i]--;
    shoppingBasket();
    subtractCancel(i)

}
function subtractCancel(i) {
    if (menus.length === 1 && amounts[i] === 0) {
        menus.splice(i, 1);
        prices.splice(i, 1);
        amounts.splice(i, 1);
        let items = document.getElementById('choosenDishes');
        items.innerHTML = emtyBasketTemplate();
    }
    if (amounts[i] === 0) {
        menus.splice(i, 1);
        prices.splice(i, 1);
        amounts.splice(i, 1);
        shoppingBasket();
    }

}


function cancel(i) {
    if (menus.length > 1) {
        menus.splice(i, 1);
        prices.splice(i, 1);
        amounts.splice(i, 1);
        shoppingBasket()
    } else {
        menus.splice(i, 1);
        prices.splice(i, 1);
        amounts.splice(i, 1);
        let items = document.getElementById('choosenDishes');
        items.innerHTML = emtyBasketTemplate();
    }

}

function emtyBasketTemplate() {
    return `
   <div class="emty-basket">
        <img src="./img/tasche.png" alt="">
        <h2>Fülle deinen Warenkorb</h2>
        <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
    </div>
   `;
}

function buy() {
    let page = document.getElementById('mainSite');
    page.innerHTML = buyTamplate();
}

function buyTamplate() {
    return `
    <div class="buy-page">
        <h1>Vielen Dank für Ihren Kauf.</h1>
        <p>Schauen Sie sich gerne unser vielfältiges Angebot an, um weitere großartige Gerichte zu entdecken.</p>
    </div>    
    `;

}

// Small screen funktion for mobile use -------------------------------------------------------------------------------------------
function buySamll() {
    shoppingBasketSmall();
}

function shoppingBasketSmall() {
    let items = document.getElementById('mainSite');
    items.innerHTML = '';
    let sum = 0;

    for (let i = 0; i < menus.length; i++) {
        items.innerHTML += basketTamplateSmall(i);
        sum += prices[i] * amounts[i];
    }
    let finalSum = sum + 3.00;
    items.innerHTML += finalPriceSmallTemplate(sum, finalSum);
}

function finalPriceSmallTemplate(sum, finalSum) {
    return `
    <div class="final-price" id="finalPrice">
        <div class="price">
        <p>Zwischensumme</p><p>${sum.toFixed(2)} €</p>
        </div>
        <div class="price">
        <p>Lieferkosten</p><p>3,00 €</p>
        </div>
        <div class="price">
        <h4>Gesamt</h4><h4>${finalSum.toFixed(2)} €</h4>
        </div>
    </div>
    <div class="buy-button-small" onclick="buy()"><h2>Bezahlen ${finalSum.toFixed(2)} €</h2></div>
    `;
}

function basketTamplateSmall(i) {
    const dish = menus[i];
    let dishSum = prices[i] * amounts[i];

    return `
            <div class="dish">
                <div class="dish-top">
                    <h3>${dish}</h3>
                    <p id="priceDisch${i}">${dishSum.toFixed(2)} €</p>
                </div>
                <div class="dish-bottom">
                    <div>
                        <p>Menge: ${amounts[i]}</p>
                        <img src="./img/plus.png" alt="plus" onclick="addAmountSmall(${i})">
                        <img src="./img/minus.png" alt="minus" onclick="subtractAmountSmall(${i})">
                    </div>
                    <img class="bin" src="./img/bin.png" alt="delete" onclick="cancelSmall(${i})">
                </div>
            </div>
        `;
}

function addAmountSmall(i) {
    amounts[i]++;
    shoppingBasketSmall()
}

function subtractAmountSmall(i) {
    amounts[i]--;
    shoppingBasketSmall();
    subtractCancelSmall(i)

}
function subtractCancelSmall(i) {
    if (menus.length === 1 && amounts[i] === 0) {
        menus.splice(i, 1);
        prices.splice(i, 1);
        amounts.splice(i, 1);
        let items = document.getElementById('mainSite');
        items.innerHTML = emtyBasketTemplate();
    }
    if (amounts[i] === 0) {
        menus.splice(i, 1);
        prices.splice(i, 1);
        amounts.splice(i, 1);
        shoppingBasketSmall();
    }
}

function cancelSmall(i) {
    if (menus.length > 1) {
        menus.splice(i, 1);
        prices.splice(i, 1);
        amounts.splice(i, 1);
        shoppingBasketSmall()
    } else {
        menus.splice(i, 1);
        prices.splice(i, 1);
        amounts.splice(i, 1);
        let items = document.getElementById('mainSite');
        items.innerHTML = emtyBasketTemplate();
    }
}