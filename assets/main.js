const fa = document.querySelector('#fromAmount');
const fc = document.querySelector('#fromCurrency');
const ta = document.querySelector('#toAmount');
const tc = document.querySelector('#toCurrency');

const api = new XMLHttpRequest();
let currVal = {};

function main() {
    api.open('GET', `https://v6.exchangerate-api.com/v6/0af8f215916d5c52c7200e44/latest/USD`);
    api.send();

    api.onload = () => {
        if(api.readyState === 4 && api.status === 200) {
            const apiRes = JSON.parse(api.responseText);
            const curr = Object.keys(apiRes.conversion_rates);

            currVal = apiRes.conversion_rates;

            curr.forEach(sym => {
                const newFc = document.createElement('option');
                const newTc = document.createElement('option');

                sym === 'USD' && newFc.setAttribute('selected', true) && newTc.setAttribute('selected', true);

                newFc.innerText = sym;
                newTc.innerText = sym;

                // fa.setAttribute('value', 1);
                // ta.setAttribute('value', 1);

                fa.value = 1;
                ta.value = 1;

                fc.append(newFc);
                tc.append(newTc);
            });
        }
    }
}

function updateToValue() { ta.value =  fa.value*currVal[tc.value]; }
function updateFromValue() { fa.value = ta.value/currVal[tc.value]; };

function setCurrencyValue() {
    api.open('GET', `https://v6.exchangerate-api.com/v6/0af8f215916d5c52c7200e44/latest/${fc.value}`);
    api.send();
    api.onload = () => { api.readyState === 4 && api.status === 200; currVal = JSON.parse(api.responseText).conversion_rates; updateValue(); }
}

main();

fa.addEventListener('keyup', updateToValue);
fc.addEventListener('change', setCurrencyValue);
ta.addEventListener('keyup', updateFromValue);
tc.addEventListener('change', updateToValue);