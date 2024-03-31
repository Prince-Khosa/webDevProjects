
const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies`;

const dropowns = document.querySelectorAll(".select select");
const fromCurr = document.querySelector('#f');
const toCurr = document.querySelector('#t');
const result = document.querySelector(".msg");
const btn = document.querySelector("button");


for(let select of dropowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name === "from" & currCode === "USD"){
            newOption.selected="selected"
        }
        if(select.name === "to" & currCode === "INR"){
            newOption.selected="selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        newflag(evt.target);
        console.log(evt);
    })
}


const newflag = (element)=>{
    let currCode = element.value;
    let contCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${contCode}/flat/64.png`;
    let imgs = element.parentElement.querySelector("img");
    imgs.src = newSrc;
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector("input");
    let amountVal = amount.value;
    if(amountVal === "" || amountVal<1){
        amount = 1;
        amount.value = 1;
    }
    const url1 = `${url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(url1);
    console.log(response);
    let data = await response.json();
    console.log(data);
    let exchange = data[toCurr.value.toLowerCase()];
    let finalAmaount = amountVal*exchange;
    result.innerHTML=`${amountVal}${fromCurr.value} = ${finalAmaount}${toCurr.value}`;
});