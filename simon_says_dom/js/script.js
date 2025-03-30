// Recupero elementi del DOM
const form = document.getElementById("answers-form");
const inputFields = document.querySelectorAll("#input-group input");
const countdownElem = document.getElementById("countdown");
const numberList = document.getElementById("numbers-list");
const message = document.getElementById("message");
const instruction = document.getElementById("instructions");
const button = document.querySelector("button");

// Variabili per il gioco
const min = 1;
const max = 50;
const totalNumbers = 5;
let time = 5; // Cambiato da 30 a 5 per test più veloce
let li = "";

// Funzione per generare numeri casuali unici
const generateRandomNumbers = (min, max, tot) => {
    const numbers = new Set();
    while (numbers.size < tot) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        numbers.add(num);
    }
    return [...numbers]; // Convertiamo il Set in un array
};

// Generiamo i numeri casuali
const numbers = generateRandomNumbers(min, max, totalNumbers);

// Creiamo gli elementi <li> per mostrarli nella lista
for (let i = 0; i < numbers.length; i++) {
    li += `<li class="fs-2">${numbers[i]}</li>`;
}

// Inseriamo i numeri casuali nel DOM
numberList.innerHTML = li;

// Mostriamo il timer iniziale nel DOM
countdownElem.innerText = time;

// Avvio del countdown
const timer = setInterval(() => {
    countdownElem.innerText = --time;
    if (time === 0) {
        clearInterval(timer);
        form.classList.remove("d-none"); // Mostra il form
        numberList.classList.add("d-none"); // Nasconde i numeri
        instruction.innerText = "Inserisci i numeri che ricordi!";
    }
}, 1000);

// Evento per verificare i numeri inseriti
button.addEventListener("click", (e) => {
    e.preventDefault();

    // Creiamo un array per i numeri inseriti dall'utente
    const userNumbers = [];
    inputFields.forEach(input => {
        const value = parseInt(input.value);
        if (!isNaN(value)) {
            userNumbers.push(value);
        }
    });

    // Confrontiamo con i numeri generati
    const guessed = userNumbers.filter(num => numbers.includes(num));

    // Mostriamo il risultato all'utente
    message.classList.remove("text-danger");
    message.classList.add("text-success");
    message.innerText = `Hai indovinato ${guessed.length} numeri: ${guessed.join(", ")}`;
});




    
    

