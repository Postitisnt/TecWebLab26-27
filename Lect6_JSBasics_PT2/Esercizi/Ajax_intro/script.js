// Primo esempio Ajax: al click scarichiamo un file JSON e mostriamo i titoli degli eventi,
// senza ricaricare la pagina

// Indirizzo dei dati: un file JSON sul nostro GitHub.
// ATTENZIONE: durante l'esame questo link NON sarà utilizzabile (l'accesso a internet è bloccato)
const URL_EVENTI = "https://raw.githubusercontent.com/Postitisnt/TecWebLab26-27/refs/heads/main/Lect6_JSBasics_PT2/raw/eventi.json";

function caricaEventi() {
    const stato = document.getElementById("stato");

    // 1. Creiamo la richiesta
    const richiesta = new XMLHttpRequest();

    // 2. Diciamo cosa chiedere, con GET quindi "dammi questa risorsa", e diciamo da dove prenderla (url)
    richiesta.open("GET", URL_EVENTI);

    // 3. Cosa fare QUANDO arriva la risposta (non adesso, ma più tardi)
    richiesta.onload = () => {
        if (richiesta.status === 200) {  // 200 = tutto ok
            // responseText è TESTO, e JSON.parse lo trasforma in un array di oggetti JavaScript
            console.log("Testo ricevuto:", richiesta.responseText);
            const eventi = JSON.parse(richiesta.responseText);
            console.log("Dopo JSON.parse:", eventi);

            const elenco = document.getElementById("eventi");
            elenco.innerHTML = "";   // svuotiamo, se clicchiamo due volte si risvuota quindi (come è giusto che sia)
            // for...of -> a ogni giro "evento" è il prossimo elemento dell'array (un oggetto del JSON),
            // senza bisogno dell'indice i 
            for (const evento of eventi) {
                const riga = document.createElement("li");
                riga.textContent = evento.title;   // ogni evento è un oggetto, e qui ne prendiamo il campo "title"
                elenco.appendChild(riga);
            }
            stato.textContent = "Arrivati " + eventi.length + " eventi.";
        } else {
            stato.textContent = "Errore " + richiesta.status; // es. 404 = file non trovato
        }
    };

    // Se la richiesta non parte proprio (es. niente connessione o indirizzo irraggiungibile)
    richiesta.onerror = () => {
        stato.textContent = "Richiesta fallita: controlla la connessione.";
    };

    // 4. Inviamo la richiesta
    richiesta.send();

    // Questa riga viene eseguita SUBITO, prima che arrivi la risposta: Ajax è asincrono
    stato.textContent = "Caricamento in corso...";
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("carica").addEventListener("click", caricaEventi);
});