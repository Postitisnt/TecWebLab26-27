// Esercizio JS - Lista dei desideri

// Per ogni bottone (id) il nome del prodotto -> creiamo un oggetto 
// e lo usiamo come rubrica, perciò:
// PRODOTTI["btnZaino"] vale "Zaino"
const PRODOTTI = {
    btnZaino: "Zaino",
    btnBorraccia: "Borraccia",
    btnCuffie: "Cuffie"
};

// Pezzi in magazzino per ogni prodotto
const MAX_PEZZI = 10;

// Al click su "Aggiungi alla lista" aggiunge il prodotto (se non presente ancora) o aumenta il suo conteggio
function aggiungi(idBottone) {
    const lista = document.getElementById("lista");
    const nome = PRODOTTI[idBottone];

    // lista.children sono i <p> già nella lista: è una HTMLCollection, che non ha i metodi
    // degli array. Array.from la trasforma in un array vero
    const righe = Array.from(lista.children);

    // find restituisce il PRIMO elemento per cui la funzione dà true (undefined se non ce n'è).
    // Qui cerchiamo il <p> che ha data-nome uguale (===) al nome del prodotto
    const riga = righe.find((r) => r.dataset.nome === nome);
    /*
    Il .find funziona tipo un for,ma è un metodo degli array.
    Sarebbe equivalente a fare:

        let riga = undefined;
        for (let i = 0; i < righe.length; i++) {
            if (righe[i].dataset.nome === nome) {
                riga = righe[i];
                break;   // trovato, perciò usciamo dal ciclo
            }
        }
    */
    // !== significa "diverso"
    if (riga !== undefined) { // se il prodotto esiste, entriamo nello scope dell'if
        // Il prodotto è già nella lista: aumentiamo il numero scritto nello <span>
        const contatore = riga.querySelector("span");
        // textContent è sempre testo ("3"): parseInt lo trasforma nel numero 3
        const pezzi = parseInt(contatore.textContent) + 1;
        contatore.textContent = pezzi;

        // Finiti i pezzi in magazzino: il bottone si disattiva
        if (pezzi === MAX_PEZZI) {
            document.getElementById(idBottone).disabled = true;
        }
    } else { // il prodotto non è ancora nella lista, quindi lo creiamo...
        // Primo pezzo: creiamo il suo <p>, es. <p data-nome="Zaino">Zaino: <span>1</span></p>
        const nuovaRiga = document.createElement("p");
        nuovaRiga.dataset.nome = nome; // crea l'attributo data-nome="Zaino": serve a ritrovarlo con find
        nuovaRiga.innerHTML = nome + ": <span>1</span>";   // innerHTML perché dentro c'è un tag
        lista.appendChild(nuovaRiga);
    }

    ordina();
}

// Mette in ordine alfabetico i <p> della lista dei desideri
function ordina() {
    const lista = document.getElementById("lista");
    const righe = Array.from(lista.children);

    // sort con una funzione di confronto tra due elementi a e b:
    // localeCompare restituisce un numero negativo se a viene prima di b, positivo se dopo, 0 se uguali
    righe.sort((a, b) => a.dataset.nome.localeCompare(b.dataset.nome));

    // L'array ora è in ordine, la pagina non ancora. appendChild su un elemento che è GIÀ nella
    // pagina non lo copia: lo SPOSTA in fondo. 
    // Spostando in fondo tutti i <p>, uno dopo l'altro nell'ordine dell'array,
    // la pagina finisce in ordine (e restano sempre gli stessi, senza copie)
    righe.forEach((r) => lista.appendChild(r)); // forEach: esegue la funzione per ogni elemento
}

// Quando la pagina è pronta colleghiamo i bottoni.
// Object.keys(PRODOTTI) è l'array delle chiavi: ["btnZaino", "btnBorraccia", "btnCuffie"]
document.addEventListener("DOMContentLoaded", () => {
    Object.keys(PRODOTTI).forEach((id) => {
        document.getElementById(id).addEventListener("click", () => {
            aggiungi(id);
        });
    });
});

/*  ATTRIBUTI data-* e dataset
  
        In HTML possiamo aggiungere a qualsiasi tag degli attributi inventati da noi, purché il nome
        inizi con "data-". Il browser non li usa per niente: servono solo a noi per conservare
        informazioni dentro un elemento. 
        Esempio:
        
            <p data-nome="Zaino">Zaino: <span>3</span></p>
        
        Da JavaScript si leggono e si scrivono con dataset, e il nome dopo il punto è quello
        dell'attributo senza "data-".
        
            riga.dataset.nome = "Zaino";   // SCRIVE: crea (o cambia) l'attributo data-nome="Zaino"
            riga.dataset.nome              // LEGGE: vale "Zaino"
        
        Il nome lo scegliamo noi (dataset.colore -> data-colore), e le maiuscole diventano trattini:
            dataset.nomeProdotto --(diventa)--> data-nome-prodotto (per sceglierlo nei selettori, vedi sotto)

        ATTENZIONE: nei selettori (querySelector e CSS) si scrive il nome dell'attributo come appare
        nell'HTML, cioè con "data-" davanti e con i trattini:

            document.querySelector('[data-nome-prodotto="Zaino"]')   // GIUSTO: la trova
            document.querySelector('[data-nomeProdotto="Zaino"]')    // SBAGLIATO: cerca un altro attributo e non lo trova -> ritorna null

        Il selettore sbagliato NON dà errore: non trova niente e restituisce null.
        L'errore arriva dopo, quando proviamo a usare quel null.
        
        Nella lista dei desideri lo usiamo per RITROVARE la riga di un prodotto:
            1. quando creiamo il <p> di un prodotto gli scriviamo data-nome con il suo nome;
            2. al click successivo, find scorre i <p> e confronta r.dataset.nome con il nome del
                prodotto cliccato e il primo uguale è la riga da aggiornare (undefined se non c'è ancora).
        Lo stesso attributo ci serve anche in ordina(), per confrontare i nomi con localeCompare.
*/

/*  ORDINARE CON sort e localeCompare

        sort ordina un array. Con un array di stringhe basta chiamarlo così: ["Zaino", "Cuffie"].sort().
        I nostri elementi però sono <p>, non stringhe, e sort non sa come confrontarli: gli passiamo
        noi una FUNZIONE DI CONFRONTO.

        sort prende due elementi alla volta (li chiama a e b) e chiede alla funzione localeCompare chi va prima.
        La funzione risponde con un numero:
            negativo -> a va prima di b
            positivo -> b va prima di a
            0        -> sono uguali, restano come sono

        localeCompare confronta due stringhe in ordine alfabetico e restituisce proprio questo numero:
            "Borraccia".localeCompare("Zaino")   -> -1  (Borraccia prima di Zaino)
            "Zaino".localeCompare("Cuffie")      ->  1  (Zaino dopo Cuffie)
            "Zaino".localeCompare("Zaino")       ->  0  (uguali)

        Quindi in ordina():
            righe.sort((a, b) => a.dataset.nome.localeCompare(b.dataset.nome));
        significa "confronta due <p> in base al loro data-nome".

        Esempio: [Zaino, Cuffie, Borraccia]
            Zaino con Cuffie       -> positivo -> scambia -> [Cuffie, Zaino, Borraccia]
            Zaino con Borraccia    -> positivo -> scambia -> [Cuffie, Borraccia, Zaino]
            Cuffie con Borraccia   -> positivo -> scambia -> [Borraccia, Cuffie, Zaino]

        Differenze con forEach, find e filter:
            - la funzione non viene chiamata una volta per elemento, ma una volta per ogni COPPIA da
              confrontare. Quante volte e su quali coppie lo decide il browser, a noi basta che la
              funzione risponda bene a "chi va prima?"
            - sort MODIFICA l'array stesso, non ne crea uno nuovo!
*/