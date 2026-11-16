// Esercizio 3 - Timer
// Al click: il pulsante si disabilita e nel paragrafo compare un contatore che va da 0 a 10,
// aumentando di 1 ogni secondo. Arrivati a 10, il timer si ferma e il pulsante torna cliccabile.
function onclick_fn() {
    // const: i riferimenti a questi elementi non cambiano mai
    const button = document.getElementsByTagName("button")[0];
    const para = document.getElementById("para1");

    // disabled = true -> il pulsante diventa grigio e non cliccabile
    button.disabled = true;

    let sec = 10;          // let: secondi rimanenti, diminuisce a ogni giro (valore cambia)
    const max_sec = sec;   // const: durata totale, il valore non cambia mai

    para.textContent = 0;  // il contatore parte da 0

    // setInterval(funzione, millisecondi): esegue "funzione" ogni 1000 ms (= 1 secondo), finché non lo fermiamo.
    // La funzione è una freccia ANONIMA scritta direttamente come primo parametro (come in addEventListener
    // nell'Es1b): non serve darle un nome perché la usa solo setInterval. 
    // Equivale a:
    //     const giro = () => { ... };
    //     const timer = setInterval(giro, 1000);
    // In "timer" NON c'è la funzione, ma un numero che identifica il timer: serve a fermarlo con clearInterval
    const timer = setInterval(() => {
        // --sec (decremento PREFISSO): prima toglie 1 a sec, poi ne usa il valore nuovo
        // giro 1: sec 10 -> 9, mostriamo 10 - 9 = 1   ...   giro 10: sec 1 -> 0, mostriamo 10 - 0 = 10
        para.textContent = max_sec - (--sec);

        // Per seguire il timer: aprite la Console del browser (F12)
        console.log("ID interno del timer: ", timer);
        console.log("sec rimanenti:", sec, "| mostrato:", max_sec - sec);

        if (sec <= 0) {
            clearInterval(timer);      // ferma il timer: la funzione non viene più eseguita
            button.disabled = false;   // il pulsante torna cliccabile
        }
    }, 1000);
}

/*
--sec oppure sec--?
    --sec (prefisso):  prima toglie 1, poi restituisce il valore NUOVO    -> con sec = 10, modifica e restituisce 9
    sec-- (postfisso): restituisce il valore VECCHIO, poi toglie 1        -> con sec = 10, restituisce 10 e poi modifica a 9
In entrambi i casi, alla fine sec vale 9: cambia solo il valore usato nell'espressione.
Con sec-- il contatore mostrerebbe 0, 1, ..., 9 e si fermerebbe a 9 invece che a 10 (provate!)
(Lo stesso vale per ++sec e sec++)
*/

/*
Versione più leggibile, senza decremento: contiamo i secondi PASSATI invece di quelli rimanenti

    let passati = 0;
    const timer = setInterval(() => {
        passati = passati + 1;
        para.textContent = passati;
        if (passati >= max_sec) {
            clearInterval(timer);
            button.disabled = false;
        }
    }, 1000);
*/

/*
=====================================================================
const, let e var
=====================================================================
    - const -> valore che non viene riassegnato (qui: button, para, max_sec, timer)
    - let   -> valore che cambia nel tempo (qui: sec)
    - var   -> vecchio modo di dichiarare le variabili: oggi si evita

    Regola: const di default, let solo se il valore cambia, var mai.

---------------------------------------------------------------------
DOVE "VIVE" UNA VARIABILE (scope)
---------------------------------------------------------------------
Uno scope è la zona di codice in cui una variabile esiste. Ce ne sono tre:

    - GLOBALE  -> dichiarata fuori da ogni funzione e da ogni blocco { }:
                  visibile ovunque nella pagina (anche dalla Console e dagli altri script)
    - FUNZIONE -> dichiarata dentro una funzione: esiste solo dentro quella funzione
    - BLOCCO   -> dichiarata dentro delle graffe { } (if, for, while, ...): esiste solo lì dentro

Differenza chiave:
    - let e const rispettano il BLOCCO: fuori dalle graffe non esistono più
    - var rispetta solo la FUNZIONE: "esce" dalle graffe di if/for, ma non dalla funzione

    function prova() {
        if (true) {
            var a = 1;
            let b = 2;
            const c = 3;
        }
        console.log(a);   // 1                          -> var esce dal blocco dell'if
        console.log(b);   // ReferenceError: b is not defined -> let resta nel blocco
        console.log(c);   // ReferenceError: c is not defined -> const resta nel blocco
    }
    console.log(a);       // ReferenceError: a is not defined -> var non esce dalla funzione

Dentro e fuori da un blocco:
    - da DENTRO si vedono le variabili di FUORI:
          const x = 1;
          { console.log(x); }   // 1
    - da FUORI non si vedono quelle di DENTRO (con let/const): vedi b e c sopra
    - stesso nome dentro un blocco -> è una variabile NUOVA e separata, che dentro il blocco
      "nasconde" quella di fuori (shadowing); quella fuori non cambia:
          const x = 1;
          {
              const x = 2;          // nessun errore: questa x esiste solo dentro le graffe
              console.log(x);       // 2 -> dentro vince la x più vicina, quella del blocco
          }
          console.log(x);           // 1 -> fuori torna visibile la x esterna
      Attenzione: dentro il blocco la x esterna è nascosta DALL'INIZIO delle graffe, quindi
      un console.log(x) scritto PRIMA di const x = 2 dà errore (Cannot access 'x' before
      initialization), non 1
      (per questo nell'Es2b "const p" dentro il listener non dà errore a ogni click)

Variabile globale "per sbaglio": se assegniamo un valore a una variabile MAI dichiarata
(senza const, let o var), JS la crea in automatico come GLOBALE, anche se siamo dentro una funzione:
    function prova() {
        sec = 10;         // nessuna dichiarazione -> sec diventa globale
    }

---------------------------------------------------------------------
COSA DA' ERRORE E COSA NO
---------------------------------------------------------------------
1. Cambiare il valore
       const x = 1;   x = 5;      -> errore
       let y = 1;     y = 5;      -> ok
       var z = 1;     z = 5;      -> ok
   Con const è errore QUALSIASI modifica: x = 5, x--, x++, x += 1, ...
   Lo script si ferma quando arriva a quella riga: le righe prima vengono eseguite normalmente.

2. Dichiarare due volte lo stesso nome nello stesso blocco
       const x = 1;   const x = 2;   -> errore
       let y = 1;     let y = 2;     -> errore
       var z = 1;     var z = 2;     -> nessun errore: z viene sovrascritta senza avvisi

3. Usare la variabile prima di averla dichiarata
       console.log(x);   const x = 1;   -> errore
       console.log(y);   let y = 1;     -> errore
       console.log(z);   var z = 1;     -> nessun errore, stampa undefined
   Con var il problema non viene segnalato: il codice va avanti con un valore vuoto
   e il bug resta nascosto.

4. Dichiarare senza dare un valore
       const x;   -> errore: una const va inizializzata subito
       let y;     -> ok, per ora vale undefined (il valore si può dare dopo, tipo con: y = 5;)
       var z;     -> ok, per ora vale undefined

Non danno errore:
    - una variabile con lo stesso nome in un ALTRO blocco { }: è una variabile nuova
    - modificare le PROPRIETÀ o il contenuto di una const:
          button.disabled = true;      // ok: button è const, ma cambiamo una sua proprietà
          const lista = [1];
          lista.push(2);               // ok: cambiamo il contenuto dell'array
      const blocca la VARIABILE (button = altro_elemento -> errore), non l'oggetto a cui punta.

---------------------------------------------------------------------
ATTENZIONE A UNA SCORCIATOIA CHE SI TROVA SPESSO
---------------------------------------------------------------------
    var max_sec = sec = 10;
JS la legge come var max_sec = (sec = 10): prima esegue sec = 10, un'assegnazione SENZA
dichiarazione (quindi sec diventa GLOBALE), poi mette il risultato (10) in max_sec,
l'unica davvero dichiarata. Con let o const al posto di var succede lo stesso:
la parola all'inizio vale solo per la prima variabile.

Per vederlo: mettete questa riga al posto di let sec / const max_sec, cliccate e scrivete sec
nella Console -> compare il suo valore. Con la versione con let, invece, sec esiste solo
dentro la funzione e la Console risponde: sec is not defined.

Qui funzionerebbe lo stesso, ma in codice più grande è un problema:
    - se due funzioni fanno la stessa cosa (es. due timer), usano lo STESSO sec e si disturbano
    - il valore resta in giro anche dopo che la funzione è finita
    - in strict mode ("use strict" o <script type="module">) dà errore: sec is not defined

Versione corretta: ogni variabile dichiarata a parte
    let sec = 10;
    const max_sec = sec;
*/