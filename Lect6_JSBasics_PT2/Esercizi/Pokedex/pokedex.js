// Esercizio JS - Pokédex: esplora l'erba alta, cattura e libera i Pokémon
//
// Dati e funzioni stanno FUORI dal listener di DOMContentLoaded: così potrà usarli anche
// un secondo file .js caricato dopo questo (lo aggiungeremo la prossima volta)

// Tutti i Pokémon che si possono incontrare: un array di oggetti
const POKEMON = [
    { nome: "Charmander", img: "img/charmander.png", tipo: "Fuoco",    classeTipo: "fuoco" },
    { nome: "Squirtle",   img: "img/squirtle.png",   tipo: "Acqua",    classeTipo: "acqua" },
    { nome: "Bulbasaur",  img: "img/bulbasaur.png",  tipo: "Erba",     classeTipo: "erba" },
    { nome: "Pikachu",    img: "img/pikachu.png",    tipo: "Elettro",  classeTipo: "elettro" },
    { nome: "Snorlax",    img: "img/snorlax.png",    tipo: "Normale",  classeTipo: "normale" },
    { nome: "Gyarados",   img: "img/gyarados.png",   tipo: "Acqua",    classeTipo: "acqua" },
    { nome: "Vulpix",     img: "img/vulpix.png",     tipo: "Fuoco",    classeTipo: "fuoco" },
    { nome: "Poliwag",    img: "img/poliwag.png",    tipo: "Acqua",    classeTipo: "acqua" },
    { nome: "Horsea",     img: "img/horsea.png",     tipo: "Acqua",    classeTipo: "acqua" },
    { nome: "Nidoran♂",   img: "img/nidoran.png",    tipo: "Veleno",   classeTipo: "veleno" },
    { nome: "Machop",     img: "img/machop.png",     tipo: "Lotta",    classeTipo: "lotta" },
    { nome: "Cubone",     img: "img/cubone.png",     tipo: "Terra",    classeTipo: "terra" },
    { nome: "Dragonite",  img: "img/dragonite.png",  tipo: "Drago",    classeTipo: "drago" },
    { nome: "Mewtwo",     img: "img/mewtwo.png",     tipo: "Psico",    classeTipo: "psico",    leggendario: true },
    { nome: "Articuno",   img: "img/articuno.png",   tipo: "Ghiaccio", classeTipo: "ghiaccio", leggendario: true },
    { nome: "Zapdos",     img: "img/zapdos.png",     tipo: "Elettro",  classeTipo: "elettro",  leggendario: true },
    { nome: "Moltres",    img: "img/moltres.png",    tipo: "Fuoco",    classeTipo: "fuoco",    leggendario: true }
];

// Nomi dei Pokémon catturati almeno una volta: di questi conosciamo il nome
const registrati = [];

// Nomi dei Pokémon che sono ADESSO in squadra: questi non possono apparire nell'erba
const inSquadra = [];

// Al massimo 6 Pokémon in squadra
const MAX_SQUADRA = 6;

// Zaino: let perché le quantità cambiano. Le pozioni le useremo nella lotta (prossima lezione)
let pokeBall = 10;
let pozioni = 3;

// Sceglie a caso un Pokémon tra quelli che NON sono in squadra
// In squadra ce ne sono al massimo 6 e in POKEMON di più: qualcuno disponibile c'è sempre
function pokemonCasuale() {
    // filter tiene solo i Pokémon per cui la funzione da true, cioè quelli NON in squadra
    const disponibili = POKEMON.filter((p) => !inSquadra.includes(p.nome)); // filter chiama la funzione su ogni elemento di POKEMON (di volta in volta è "p"):
                                                                            // tiene quelli per cui restituisce true (cioè NON in squadra, visto il "!") e li mette in un nuovo array
    // posizione a caso, da 0 a disponibili.length - 1
    const i = Math.floor(Math.random() * disponibili.length); // Posizione a caso: Math.random() dà un numero tra 0 e 1 (0 incluso, 1 escluso -> arriva a 0.999...), 
                                                              // lo moltiplichiamo per il numero di elementi, poi Math.floor toglie i decimali. Con 14 elementi esce da 0 a 13
                                                              // Es. con 14 elementi: Math.random() = 0.73 -> 0.73 * 14 = 10.22 -> Math.floor(10.22) = 10
    return disponibili[i];
}

// Attiva o disattiva "Esplora": si disattiva se c'è un Pokémon nell'erba o se la squadra è piena
function aggiornaEsplora() {
    // querySelector restituisce null se non trova niente (false): true se c'è una carta nell'erba
    const selvaticoPresente = document.querySelector("#erba .carta") !== null;
    // true se in squadra ci sono già 6 Pokémon
    const squadraPiena = inSquadra.length >= MAX_SQUADRA;
    // || significa "oppure": basta che uno dei due sia true e il bottone si disattiva, se entrambi sono false il bottone si attiva
    document.getElementById("esplora").disabled = selvaticoPresente || squadraPiena;
}

// Crea la carta di un Pokémon: immagine, nome (o "???" se non è registrato) e tipo
function creaCarta(dati) {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    // dataset scrive gli attributi "data-...": la riga sotto aggiunge al div data-nome="Snorlax" (ecc...),
    // un attributo inventato da noi (non letto dal browser) che servirà per ritrovare la carta con querySelector
    // Es. <div class="carta" data-nome="Snorlax"> ... </div>
    carta.dataset.nome = dati.nome;  // le maiuscole diventano trattini: dataset.nomePokemon -> data-nome-pokemon
    if (dati.leggendario) {
        carta.classList.add("leggendario");
    }

    const img = document.createElement("img");
    img.src = dati.img;
    img.alt = dati.nome;
    carta.appendChild(img);

    const titolo = document.createElement("h3");
    if (registrati.includes(dati.nome)) {  // includes: l'array contiene questo valore?
        titolo.textContent = dati.nome;
    } else {
        titolo.textContent = "???";
    }
    carta.appendChild(titolo);

    const tipo = document.createElement("p");
    tipo.textContent = "Tipo: ";
    const nomeTipo = document.createElement("span");
    nomeTipo.classList.add(dati.classeTipo); // la classe dà il colore del tipo (vedi CSS)
    nomeTipo.textContent = dati.tipo;
    tipo.appendChild(nomeTipo);
    carta.appendChild(tipo);

    return carta;
}

// Mette un Pokémon tra gli avvistati: tutti quelli incontrati che ADESSO non sono in squadra.
// Lo chiamiamo quando un Pokémon viene lasciato andare o liberato. Se c'è già, non fa niente
function avvista(dati) {
    const avvistati = document.getElementById("avvistati");
    // Selettore di attributo (come in CSS): cerca una carta con data-nome="Snorlax", ecc..., se non la trova torna null 
    // Perciò: null !== null è false, mentre se la trova è true, perché un elemento !== null è vero. In pratica: true se c'è già tra gli avvistati, false se non c'è
    const giaAvvistato = avvistati.querySelector('[data-nome="' + dati.nome + '"]') !== null; // come sapete i selettori di attribut si puntano
                                                                                              // con le quadre in CSS, tipo con input[type="text"] 
                                                                                              // stiamo selezionando un elemento di tipo input con attributo 
                                                                                              // type che ha valore "text"
    if (giaAvvistato) { // se c'è già tra gli avvistati non facciamo niente
        return;
    }
    const carta = creaCarta(dati);
    // Mai catturato: classe "sconosciuto", il CSS lo mostra come sagoma nera
    if (!registrati.includes(dati.nome)) { // registrati contiene il nome? Se no, mai catturato
        carta.classList.add("sconosciuto");
    }
    avvistati.appendChild(carta);
}

// Mette un Pokémon in squadra: lo registra, crea la sua carta con il bottone "Libera"
// e la aggiunge alla sezione #squadra. La usiamo per la squadra iniziale e per ogni cattura
function aggiungiAllaSquadra(dati) {
    if (!registrati.includes(dati.nome)) { // se non era mai stato catturato, aggiungiamo il nome a registrati (l'if evita i doppioni)
        registrati.push(dati.nome); // .push() aggiunge un elemento alla fine dell'array (in questo caso alla fine di "registrati")
    }

    // cerchiamo la sua carta negli Avvistati: querySelector restituisce la carta, o null se non c'è
    const avvistato = document.querySelector('#avvistati [data-nome="' + dati.nome + '"]'); // ritorna il div della carta negli Avvistati, o null se non c'è
    if (avvistato !== null) { // se c'è, la togliamo: ora è in squadra, non più tra gli avvistati
        avvistato.remove(); // toglie dalla pagina la carta del Pokémon dagli Avvistati (div compreso)
    }
    inSquadra.push(dati.nome); // aggiungiamo il nome alla lista dei Pokémon in squadra

    const carta = creaCarta(dati); // dopo la push in registrati: la carta mostra il nome, non "???"

    const bottoneLibera = document.createElement("button");
    bottoneLibera.textContent = "Libera";
    bottoneLibera.addEventListener("click", () => {
        carta.remove(); // rimuove la carta (il div) quando cliccato
        // Togliamo il nome da inSquadra in due passi.
        // Es. inSquadra = ["Charmander", "Squirtle", "Snorlax"] e liberiamo Snorlax:
        const posizione = inSquadra.indexOf(dati.nome); // indexOf dà la posizione del nome, ovvero nell'esempio ritorna 2
        inSquadra.splice(posizione, 1); // splice toglie 1 elemento da quella posizione (index=2) -> ["Charmander", "Squirtle"]
        // splice(posizione, quanti): toglie "quanti" elementi a partire da "posizione" (qui 1: solo quello)
        document.getElementById("nSquadra").textContent = inSquadra.length;
        avvista(dati); // non è più in squadra: lo ritroviamo tra gli avvistati
        aggiornaEsplora(); // se la squadra era piena, ora c'è posto
        document.getElementById("messaggio").textContent = dati.nome + " è tornato in libertà.";
    });
    carta.appendChild(bottoneLibera);

    document.getElementById("squadra").appendChild(carta);
    document.getElementById("nSquadra").textContent = inSquadra.length;
}

// Al click su "Esplora": compare un Pokémon selvatico con i suoi bottoni
function esplora() {
    const erba = document.getElementById("erba");
    const messaggio = document.getElementById("messaggio");

    const dati = pokemonCasuale();
    const carta = creaCarta(dati);

    // I due bottoni della carta selvatica
    const bottoneLancia = document.createElement("button");
    bottoneLancia.textContent = "Lancia Poké Ball";
    carta.appendChild(bottoneLancia);

    const bottoneFuga = document.createElement("button");
    bottoneFuga.textContent = "Fuggi";
    carta.appendChild(bottoneFuga);

    // Senza Poké Ball il bottone per catturare nasce già disattivato
    if (pokeBall === 0) {
        bottoneLancia.disabled = true;
    }

    // "Fuggi": la carta sparisce e il Pokémon finisce tra gli avvistati
    bottoneFuga.addEventListener("click", () => {
        carta.remove();
        avvista(dati);
        aggiornaEsplora(); // l'erba è libera: si può esplorare di nuovo
        messaggio.textContent = "Il Pokémon selvatico se ne va.";
    });

    // "Lancia Poké Ball": costa una Poké Ball e riesce una volta su due.
    // Ogni lancio mostra il risultato anche in un alert: così due fallimenti di fila si notano.
    // Il testo lo costruiamo un pezzo alla volta: "\n" dentro una stringa vuol dire "a capo"
    bottoneLancia.addEventListener("click", () => {
        pokeBall = pokeBall - 1;
        document.getElementById("nPokeBall").textContent = pokeBall;

        let testo;
        // Math.random() genera un numero tra 0 e 1: è minore di 0.5 la metà delle volte
        if (Math.random() < 0.5) {
            carta.remove();               // la carta selvatica sparisce dall'erba...
            aggiungiAllaSquadra(dati);    // ...e il Pokémon entra in squadra con una carta nuova
            aggiornaEsplora();            // l'erba è libera, ma la squadra potrebbe essere piena
            testo = "Preso! " + dati.nome + " si è unito alla squadra.";
            if (inSquadra.length >= MAX_SQUADRA) {
                testo = testo + "\nLa squadra è al completo: libera un Pokémon per esplorare ancora.";
            }
        } else {
            testo = "Si è liberato dalla Poké Ball!";
        }

        if (pokeBall === 0) {
            testo = testo + "\nHai finito le Poké Ball!";
            bottoneLancia.disabled = true;   // niente più lanci (puoi solo lasciarlo andare)
        } else {
            testo = testo + "\nTi restano " + pokeBall + " Poké Ball.";
        }

        messaggio.textContent = testo;
        alert(testo); // finestra con il risultato: si chiude con OK
    });

    erba.appendChild(carta);
    aggiornaEsplora(); // c'è un Pokémon selvatico davanti: prima catturalo o lascialo andare
    if (pokeBall === 0) {
        messaggio.textContent = "Un Pokémon selvatico è apparso!\nNon hai più Poké Ball: puoi solo lasciarlo andare.";
    } else {
        messaggio.textContent = "Un Pokémon selvatico è apparso!";
    }
}

// Quando la pagina è pronta: squadra iniziale e bottone "Esplora".
// (Con defer nell'HTML basterebbe anche senza listener: lo teniamo per abitudine)
document.addEventListener("DOMContentLoaded", () => {
    // La squadra parte con i primi 3 Pokémon dell'array
    for (let i = 0; i < 3; i++) {
        aggiungiAllaSquadra(POKEMON[i]);
    }

    document.getElementById("esplora").addEventListener("click", esplora);
});