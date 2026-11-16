// Esercizio 1 - Sintassi a freccia
// La funzione viene salvata in una costante: il nome (onclick_fn) è lo stesso usato nell'HTML
// Chiamarla esegue l'alert. Restituisce anche il risultato di alert (undefined),
// ma il pulsante lo ignora: conta solo l'azione
const onclick_fn = () => alert("Hello World");
// Per vedere l'undefined: scrivete console.log(onclick_fn()) nella Console (tasto destro, poi Ispeziona, poi Console) 
// del browser (non nel file .js, altrimenti l'alert partirebbe subito al caricamento della pagina)

/*
Quale forma usare?
    - Una sola istruzione -> forma corta (se l'istruzione produce un valore, viene restituito
      in automatico; qui alert non produce valori, quindi non restituisce nulla):
        const onclick_fn = () => alert("Hello World");   <- la scelta giusta qui
        const somma = (a, b) => a + b;                    <- restituisce a + b
    - Più istruzioni -> graffe (per restituire un valore serve return):
        const onclick_fn = () => { alert("Hello World"); };
    - Oggetto da restituire con la forma corta -> tonde attorno alle graffe,
      altrimenti le graffe dell'oggetto vengono lette come le graffe della funzione:
        const crea = nome => ({ nome: nome });
*/
