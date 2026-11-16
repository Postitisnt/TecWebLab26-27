// Esercizio d'esame - Qual è il contenuto della variabile c dopo l'esecuzione dello script?
// Provate a rispondere SENZA eseguire il codice, poi verificate nella Console del browser (F12).

function mutate(a) {
    let b = "3";                          // b parte come STRINGA "3" (tra virgolette)
    for (let i = 1; i < 7; i = i + 1) {   // i va da 1 a 6 (si ferma quando i < 7 diventa falso)
        b = b + a[i];                     // a[i] = carattere in posizione i della stringa a (si conta da 0)
        //console.log(`i = ${i}, a[i] = ${a[i]}, b = ${b}`);
        // Template literal: stringa tra apici inversi `, con ${...} si inserisce il valore di una variabile
        // (equivale a "i = " + i + ", a[i] = " + a[i] + ", b = " + b). NON è jQuery: è JS normale
    }
    return b;
}

const c = mutate("0,8,3,5,1,9,7,2,4,6");  // a è una STRINGA: le virgole sono caratteri come gli altri
console.log(c);                           // stampa il risultato
console.log(typeof c);                    // stampa il tipo del risultato

/*
SOLUZIONE

c vale la stringa "3,8,3,5" (typeof c -> "string")

a è una stringa, quindi a[i] è il carattere in posizione i. Le posizioni contano anche le virgole:
    carattere:   0  ,  8  ,  3  ,  5  ,  1  ,  9  ...
    posizione:   0  1  2  3  4  5  6  7  8  9  ...

    prima del ciclo:   b = "3"
    i = 1:  a[1] = ","  ->  b = "3,"
    i = 2:  a[2] = "8"  ->  b = "3,8"
    i = 3:  a[3] = ","  ->  b = "3,8,"
    i = 4:  a[4] = "3"  ->  b = "3,8,3"
    i = 5:  a[5] = ","  ->  b = "3,8,3,"
    i = 6:  a[6] = "5"  ->  b = "3,8,3,5"
    i = 7:  7 < 7 è falso -> il ciclo si ferma

N.B.: si parte da i = 1 (non da 0), e le virgole fanno parte della stringa.
*/