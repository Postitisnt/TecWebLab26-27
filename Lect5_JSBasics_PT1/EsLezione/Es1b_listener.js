// Esercizio 1b - Event listener
// Prendiamo il pulsante dalla pagina (il primo, e unico, <button>)
const button = document.querySelector("button");

// addEventListener collega una funzione a un evento dell'elemento:
// - primo parametro: il tipo di evento ("click")
// - secondo parametro: la funzione da eseguire quando l'evento accade
button.addEventListener("click", () => alert("Hello World"));

/*
Versione A (senza freccia): funzione anonima scritta direttamente dentro addEventListener

    button.addEventListener("click", function () {
        alert("Hello World");
    });
*/

/*
Versione B (senza freccia): funzione con un nome, definita prima e poi passata al listener

    function saluta() {
        alert("Hello World");
    }
    button.addEventListener("click", saluta);

Attenzione: si scrive saluta, SENZA parentesi. Con saluta() la funzione verrebbe
eseguita subito (l'alert parte al caricamento della pagina) e al listener passeremmo
il suo risultato (undefined), non la funzione da eseguire al click.
*/

/*
Perché è meglio di onclick="..." nell'HTML?
    - HTML e JS restano separati: l'HTML descrive la pagina, il JS il comportamento
    - si possono collegare più funzioni allo stesso evento
Attenzione: lo script deve partire DOPO che il pulsante esiste nella pagina.
Per questo nell'HTML usiamo <script ... defer>: senza, querySelector restituirebbe null
(se al partire della funzione il button non è ancora stato caricato).
*/