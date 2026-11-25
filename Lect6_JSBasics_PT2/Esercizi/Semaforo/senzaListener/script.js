// Esercizio JS - Semaforo, versione con onclick nell'HTML

let posizione = 0; // luce accesa: 0 = verde, 1 = giallo, 2 = rosso
const colori = ["verde", "giallo", "rosso"]; // gli id del CSS, nello stesso ordine delle luci

function cambia() {
    const luci = document.getElementsByClassName("luce");

    // Spegniamo tutte le luci: senza id tornano bianche
    luci[0].removeAttribute("id");
    luci[1].removeAttribute("id");
    luci[2].removeAttribute("id");

    // Passiamo alla luce successiva (e dopo il rosso si torna al verde)
    posizione = posizione + 1;
    if (posizione >= 3) {
        posizione = 0;
    }

    // Accendiamo la nuova luce dandole l'id del suo colore
    luci[posizione].setAttribute("id", colori[posizione]);
}