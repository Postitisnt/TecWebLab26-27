// Esercizio JS - Semaforo, versione con listener e qualche miglioramento:
// 1. il click si collega nel JS (addEventListener), non con onclick nell'HTML
// 2. la luce accesa ha una CLASSE, non un id: l'id identifica un elemento e non dovrebbe cambiare
// 3. un ciclo for spegne tutte le luci, invece di tre righe uguali
// 4. l'operatore % riporta la posizione a 0, invece dell'if

let posizione = 0; // luce accesa: 0 = verde, 1 = giallo, 2 = rosso
const colori = ["verde", "giallo", "rosso"]; // le classi del CSS, nello stesso ordine delle luci

function cambia() {
    const luci = document.getElementsByClassName("luce");

    // Spegniamo tutte le luci: togliamo a ognuna la classe del suo colore
    for (let i = 0; i < luci.length; i++) {
        luci[i].classList.remove(colori[i]);
    }

    // Luce successiva. % è il resto della divisione: dopo il rosso si torna al verde
    // (0 + 1) % 3 = 1  -> (1 + 1) % 3 = 2  -> (2 + 1) % 3 = 0 -> RIPARTE...
    posizione = (posizione + 1) % colori.length;

    // Accendiamo la nuova luce
    luci[posizione].classList.add(colori[posizione]);
}

// Quando la pagina è pronta colleghiamo il bottone alla funzione (senza parentesi: la passiamo, non la chiamiamo)
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cambia").addEventListener("click", cambia);
});