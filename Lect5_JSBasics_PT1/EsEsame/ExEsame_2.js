// Esercizio d'esame per casa
// Testo: la funzione inserisca il contenuto testuale di tutti gli elementi di classe "C1" e "C2"
// in un array associativo (Object) array_1, con chiavi univoche a scelta. Poi crei array_2 con
// gli stessi valori e le stesse chiavi, ma terminanti con "placeholder". Infine ritorni entrambi.

function raccogliElementi() {
    // querySelectorAll accetta selettori CSS: ".C1, .C2" = tutti gli elementi con classe C1 OPPURE C2.
    // Ogni elemento compare UNA sola volta, anche se ha entrambe le classi (es. <p class="C1 C2">),
    // e nell'ordine in cui si trova nell'HTML
    const elementi = document.querySelectorAll(".C1, .C2");
    //console.log(typeof elementi, elementi);   // NodeList (simile a un array, ma non è un vero array)

    // "Array associativo" in JS = oggetto = una raccolta di coppie chiave:valore, tra graffe { }
    const array_1 = {};
    const array_2 = {};

    // Per ogni elemento creiamo una chiave univoca (key_0_, key_1_, ...) usando la sua posizione i
    for (let i = 0; i < elementi.length; i++) {
        const chiave = "key_" + i + "_";
        // textContent = solo il testo, senza tag (con innerHTML, per div e section avremmo anche i <p>)
        // trim() toglie spazi e a capo all'inizio e alla fine (dovuti all'indentazione dell'HTML)
        array_1[chiave] = elementi[i].textContent.trim();
    }

    // for...in scorre le CHIAVI di un oggetto, e per ogni chiave di array_1 creiamo in array_2
    // la stessa chiave con "placeholder" in fondo, e con lo stesso valore che aveva in array_1
    for (const chiave in array_1) {
        array_2[chiave + "placeholder"] = array_1[chiave];   // "key_0_" -> "key_0_placeholder"
    }

    // Una funzione può restituire un solo valore, quindi per restituirne due li mettiamo in un array
    return [array_1, array_2];
}

// DOMContentLoaded = evento che scatta quando il browser ha finito di leggere tutto l'HTML.
// Aspettandolo, la funzione trova gli elementi anche se lo script è nell'<head> senza defer
document.addEventListener("DOMContentLoaded", () => {
    const risultati = raccogliElementi();
    console.log("array_1:", risultati[0]);
    console.log("array_2:", risultati[1]);
    // console.table mostra un oggetto come tabella (più leggibile in Console)
    console.table(risultati[0]);
    console.table(risultati[1]);
});

/*
Casi particolari (il testo chiede di non fare assunzioni sulla pagina):
    - nessun elemento C1 o C2 -> elementi.length è 0, i cicli non girano:
      la funzione restituisce due oggetti vuoti, senza errori
    - elemento con entrambe le classi -> preso una volta sola grazie a ".C1, .C2"

Perché non due getElementsByClassName separati?
    const c1 = document.getElementsByClassName("C1");
    const c2 = document.getElementsByClassName("C2");
Un elemento con class="C1 C2" sta in ENTRAMBE le collezioni, quindi verrebbe inserito due volte
(provate: nella pagina ci sono 4 elementi C1 e 3 C2, ma gli elementi diversi sono 6, non 7).
In più, prima arriverebbero tutti i C1 e poi tutti i C2, non nell'ordine della pagina.
*/