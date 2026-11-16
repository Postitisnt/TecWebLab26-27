// Esercizio 2b - Creare elementi
// A ogni click aggiungiamo alla pagina un nuovo paragrafo: "Click n. 1", "Click n. 2", ...
const button = document.querySelector("button");

// Contatore dei click: let perché il suo valore cambia.
// Sta FUORI dalla funzione: se fosse dentro, ripartirebbe da 0 a ogni click
let conta = 0;

// Più istruzioni -> funzione freccia con le graffe
button.addEventListener("click", () => {
    conta = conta + 1;                       // aumentiamo il contatore di 1

    // createElement crea un nuovo <p>, che per ora esiste solo in memoria: non si vede ancora
    const p = document.createElement("p");

    p.textContent = "Click n. " + conta;     // il + unisce testo e numero in un'unica stringa

    // appendChild lo inserisce come ultimo figlio di <body>: da qui in poi è visibile nella pagina
    document.body.appendChild(p);
});

/*
Perché p può essere const se a ogni click creiamo un paragrafo diverso?
Perché a ogni click la funzione riparte da capo e crea una NUOVA costante p.
Dentro una singola esecuzione p non viene mai riassegnata.

Alternativa per comporre il testo (template literal, con gli apici inversi `):
    p.textContent = `Click n. ${conta}`;
*/

/*
E se nella pagina ci fossero più <button>?
querySelector("button") prende solo il PRIMO: il listener funziona solo su quello,
gli altri non fanno nulla (e la console non dà errori).
Perciò, per prendere:

    - Un pulsante preciso -> selettore più specifico (id o classe):
          const button = document.querySelector("#invia");          // <button id="invia">
    - Il secondo, senza id né classi -> indice (si conta da 0):
          const button = document.querySelectorAll("button")[1];
      Attenzione: dipende dall'ordine nell'HTML. Se si aggiunge un pulsante prima, l'indice
      punta a quello sbagliato: quando si può, meglio un id o una classe.
      (Esiste anche "button:nth-of-type(2)", ma vuol dire "secondo button DENTRO IL SUO
      GENITORE", non "secondo della pagina": se i pulsanti sono in contenitori diversi non funziona)
    - Tutti -> querySelectorAll + forEach, collegando il listener a ognuno:
          document.querySelectorAll("button").forEach(b => b.addEventListener("click", ...));
      Attenzione: document.querySelectorAll("button").addEventListener(...) dà errore,
      perché addEventListener esiste sul singolo elemento, non sulla NodeList
*/

/*
appendChild si può usare su QUALSIASI elemento, non solo su body: il nuovo elemento
diventa l'ultimo figlio di quello su cui lo chiamiamo. Per esempio, dentro un div:
    const lista = document.querySelector("#lista");   // nell'HTML: <div id="lista"></div>
    lista.appendChild(p);
Attenzione: se il div non esiste nella pagina, querySelector restituisce null
e al click la console dà errore (Cannot read properties of null).

Altri modi per scegliere DOVE inserirlo:
    lista.prepend(p);    // come PRIMO figlio del div (i paragrafi nuovi compaiono in cima)
    button.after(p);     // subito DOPO il pulsante, come suo "fratello"
    button.before(p);    // subito PRIMA del pulsante
*/