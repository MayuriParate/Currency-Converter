//console.log("javascript started !!!");
const URL =
  "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_0kgRspgeFVULPghtrqTyguBlN8W8oKYoUpD89Jzv";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const message = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerHTML = currcode;
    newOption.value = currcode;
    if (select.name === "from" && currcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target); //select
  });
}

const updateFlag = (element) => {
  let currcode = element.value;
  //console.log(currcode);
  let countryCode = countryList[currcode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

let updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  //console.log(amtVal);
  if (amtVal === "" || amtVal < 1 || isNaN(amtVal)) {
    amtVal = 1;
    amount.value = "1";
  }
  const fromCurrency = fromCurr.value;
  const toCurrency = toCurr.value;
  let responce = await fetch(URL);
  let rdata = await responce.json();

  //let fromExchangeRate = rdata.data[fromCurrency];
  let toExchangeRate = rdata.data[toCurrency];
  let finalAmount = (amtVal * toExchangeRate).toFixed(2);
  //message.innerText = `${amtVal}${fromCurrency} = ${finalAmount}${toCurrency}`;
  document.querySelector("#amt").innerText = `${amtVal}`;
  document.querySelector("#froomcurr").innerText = `${fromCurrency}`;
  document.querySelector(".equal").innerText = " = ";
  document.querySelector("#toval").innerText = `${finalAmount}`;
  document.querySelector("#tocurr").innerText = `${toCurrency}`;
  // console.log(fromExchangeRate);
  // console.log(toExchangeRate);
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault(); // it prevents the default behavior of an event from occurring that is if we click on a link it would navigate to the url specified in href attribute but by using preventDefault() method we stop this default behaviour.
  updateExchangeRate();
});
window.addEventListener("load", () => {
  updateExchangeRate();
});
