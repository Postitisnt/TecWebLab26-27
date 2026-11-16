// Esercizio 2 - Manipolazione del DOM
// Al click: copiamo il contenuto del primo <h1> dentro il paragrafo con id="para1"
function onclick_fn() {
    // getElementsByTagName restituisce TUTTI gli <h1> della pagina in una collezione (HTMLCollection):
    // simile a un array (ha gli indici e .length) ma non è un vero array. Con [0] prendiamo il primo.
    // innerHTML legge il contenuto dell'elemento, compresi i tag HTML al suo interno (qui: "Prove <strong>Javascript</strong>")
    const H1_inner_html = document.getElementsByTagName("h1")[0].innerHTML;

    // getElementById restituisce l'elemento con quell'id (un id è unico nella pagina, quindi niente [0])
    const para1 = document.getElementById("para1");

    // textContent scrive il valore come testo semplice: i tag NON vengono interpretati,
    // quindi nella pagina compare letteralmente "Prove <strong>Javascript</strong>"
    para1.textContent = H1_inner_html;
}

/*
Variante 1 - con innerHTML al posto di textContent:

    para1.innerHTML = H1_inner_html;

Ora i tag vengono interpretati: compare "Prove Javascript", con Javascript in grassetto.

    - textContent -> scrive testo semplice (più sicuro: non può inserire HTML nella pagina)
    - innerHTML   -> scrive HTML, che il browser interpreta

Variante 2 - stessi elementi presi con querySelector (selettori CSS, come nell'esercizio 1b):
    const H1_inner_html = document.querySelector("h1").innerHTML;   // primo <h1>, senza bisogno di [0]
    const para1 = document.querySelector("#para1");                // # = id, come nel CSS
*/

/*
Anche querySelectorAll prende TUTTI gli elementi trovati (come getElementsByTagName),
ma accetta qualsiasi selettore CSS (es. ".C1", "h1 strong"), non solo il nome del tag:
    const titoli = document.querySelectorAll("h1");
Restituisce una NodeList: come la HTMLCollection non è un vero array (ha gli indici e .length),
ma a differenza di lei:
    - ha forEach, quindi si può scorrere direttamente:
          titoli.forEach(t => console.log(t.textContent));
      (la HTMLCollection no: si scorre con for...of, oppure Array.from(...).forEach)
    - non si aggiorna da sola: contiene gli elementi presenti nel momento in cui l'abbiamo presa.
      La HTMLCollection invece sì: se aggiungiamo un <h1> alla pagina, compare anche in lei
*/