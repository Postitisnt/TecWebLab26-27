// Esercizio d'esame - Variante con l'array
// Stessa funzione, ma ora a mutate passiamo un ARRAY di numeri invece di una stringa.
// Qual è il contenuto di c? E il suo tipo? Rispondere prima di eseguire.

function mutate(a) {
    let b = "3";
    for (let i = 1; i < 7; i = i + 1) {
        b = b + a[i];
        //console.log(`i = ${i}, a[i] = ${a[i]}, b = ${b}`);
        // Template literal: stringa tra apici inversi `, con ${...} si inserisce il valore di una variabile
        // (equivale a "i = " + i + ", a[i] = " + a[i] + ", b = " + b). NON è jQuery: è JS normale
    }
    return b;
}

const c = mutate([0, 8, 3, 5, 1, 9, 7, 2, 4, 6]);   // a è un ARRAY: le virgole separano gli elementi
console.log(c);
console.log(typeof c);

/*
SOLUZIONE

c vale la stringa "3835197" (typeof c -> "string")

Ora a[i] è l'ELEMENTO in posizione i dell'array: le virgole non sono più elementi.
    elemento:    0  8  3  5  1  9  7  2  4  6
    posizione:   0  1  2  3  4  5  6  7  8  9

    prima del ciclo:   b = "3"
    i = 1:  a[1] = 8  ->  b = "38"
    i = 2:  a[2] = 3  ->  b = "383"
    i = 3:  a[3] = 5  ->  b = "3835"
    i = 4:  a[4] = 1  ->  b = "38351"
    i = 5:  a[5] = 9  ->  b = "383519"
    i = 6:  a[6] = 7  ->  b = "3835197"

Perché "38" e non 11? Perché b è una STRINGA: stringa + numero -> il numero viene
trasformato in testo e "attaccato" in fondo (concatenazione), non sommato.

E se b partisse dal NUMERO 3 (let b = 3;, senza virgolette)?
    - con l'array:   3 + 8 + 3 + 5 + 1 + 9 + 7 = 36   -> numero + numero = somma (typeof -> "number")
    - con la stringa "0,8,3,5,...":  "3,8,3,5"        -> già al primo giro 3 + "," = "3,":
                                                        da lì in poi b è una stringa
Regola: con +, se almeno uno dei due è una stringa, il risultato è una stringa.
*/