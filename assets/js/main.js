'use strict';

document.addEventListener('DOMContentLoaded', init);

function init() {
	document.querySelector("form fieldset div input").addEventListener('change', getCostumersName);
	document.querySelector("form fieldset div input[type=number]").addEventListener('change', procesChangeOfNumber);
	document.querySelector(".next").addEventListener('click', nextScreen);
}

function getCostumersName() {
	let nameOfTheCustomer = document.querySelector("form fieldset div input").value;
}

function procesChangeOfNumber() {
	let amountOfIceCreamHolders = document.querySelector("form fieldset div input[type=number]").value;

	putTheIceCreamHoldersOnTheScreen(amountOfIceCreamHolders)
	writeSInSummary(amountOfIceCreamHolders);
}

function putTheIceCreamHoldersOnTheScreen(amount) {
	let iceCreamHolders = "";
	for (let i = 1; i <= amount; i++) {
		iceCreamHolders += '<figure id="iceCream' + i + '"><div class="holder"><img src="images/cone.svg" alt="Cone" title="Cone"/></div></figure>';
	}
	document.querySelector("#customerconfiguration").innerHTML = iceCreamHolders;

	makeHoldersClickable();
}

function makeHoldersClickable() {
	let iceCreamHolders = document.querySelectorAll("#customerconfiguration figure");
	for (let iceCreamHolder of iceCreamHolders) {
		iceCreamHolder.addEventListener("click", selectOneIceCreamHolder);
	}
}

function selectOneIceCreamHolder(e) {
	for (let holder of document.querySelector('#customerconfiguration').children) {
		holder.classList.remove("active");
	}
	this.classList.add("active");
	makeConfigurable();
}

function getActiveHolder() {
	for (let thing of document.querySelector('#customerconfiguration').children) {
		if (thing.classList.contains("active")) {
			return thing;
		}
	}
}

function addEventListenerToConfigurationElement(clasification, functionName) {
	let allChoices = document.querySelectorAll("aside " + clasification + " li");
	for (let choice of allChoices) {
		choice.addEventListener('click', functionName);
	}
}

function makeConfigurable(){
	addEventListenerToConfigurationElement(".type", chooseTypeHolder);
	addEventListenerToConfigurationElement(".flavour", chooseFlavour);
	addEventListenerToConfigurationElement(".topping", chooseTopping);
}

function chooseTypeHolder(e) {
	let aHolder = e.target.dataset.value;
	let thing = getActiveHolder();
	let img = thing.querySelector('.holder').lastChild;

	img.alt = aHolder;
	img.title = aHolder;
	img.src = "images/" + aHolder + ".svg";
}

function chooseFlavour(e) {
	let parent = getActiveHolder().firstChild;
	let typeOfFlavour = e.target.dataset.value;
	let aTaste = '<img class="flavour" src="images/'+ typeOfFlavour +'.svg" alt="'+ typeOfFlavour +'" title="'+ typeOfFlavour +'"/>';
	parent.innerHTML = aTaste + parent.innerHTML;
}

function chooseTopping(e) {
	let parent = getActiveHolder().firstChild;
	let typeOfTopping = e.target.dataset.value;
	let aTopping = '<img src="images/'+ typeOfTopping +'.svg" alt="'+ typeOfTopping +'" title="'+ typeOfTopping +'"/>';
	parent.innerHTML = aTopping + parent.innerHTML;
}

// NEW PART OF CODE

function nextScreen(){
	document.querySelector("form fieldset").classList.remove("visible");
	document.querySelector(".df").classList.add("visible");
	document.getElementById("order").addEventListener("click", lastScreen);
}

function lastScreen(e) {
	e.preventDefault();
	document.querySelector(".df").classList.remove("visible");
	document.querySelector(".summary").classList.add("visible");
	details();
}

function details() {
	let total = '';
	let order = document.querySelector("#customerconfiguration");

	for (let i = 0; i < order.children.length; i++) {
		let arrayOfFlavoursAndToppings = theChild(order.children[i].firstChild, order);
		total += '<li><h3>#'+ (i + 1) + '</h3><p><strong>Type: </strong>' + order.children[i].firstChild.lastChild.title + '</p>'
		+ '<p><strong>flavours: </strong>' + arrayOfFlavoursAndToppings.flavour  + '</p>'
		+'<p><strong>Toppings: </strong> ' + arrayOfFlavoursAndToppings.topping + '</p></li>'
	}
	document.querySelector(".summary ul").innerHTML = total;
}

function writeSInSummary(amountOfIceCreams) {
	document.querySelector(".total").textContent = amountOfIceCreams;
	document.querySelector(".plural").textContent = "";
	if (amountOfIceCreams > 1) {
		document.querySelector(".plural").textContent = "s";
	}
}

function theChild(iceCream, order) {
	let arrayOfFlavoursAndToppings = {
		flavour : '',
		topping : ''
	};
	console.log(iceCream.children);
	for (let i = 0; i < iceCream.children.length - 1; i++) {
		let tasteOrTopping = iceCream.children[i].alt;
		console.log(tasteOrTopping);
		if (tasteOrTopping === 'vanilla' | tasteOrTopping === 'strawberry' | tasteOrTopping === 'pistachio' ) {
			arrayOfFlavoursAndToppings.flavour += tasteOrTopping + ' ';
		} else {
			arrayOfFlavoursAndToppings.topping += tasteOrTopping + ' ';
		}
	}
	return arrayOfFlavoursAndToppings;
}
