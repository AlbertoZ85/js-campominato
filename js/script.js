// Il computer deve generare 16 numeri casuali tra 1 e 100.
// I numeri non possono essere duplicati
// In seguito deve chiedere all'utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
// L’utente non può inserire più volte lo stesso numero.
// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all'utente un altro numero.
// La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
// BONUS: (da fare solo se funziona tutto il resto)
// all'inizio il software richiede anche una difficoltà all'utente che cambia il range di numeri casuali:
// con difficoltà 0 => tra 1 e 100
// con difficoltà 1 =>  tra 1 e 80
// con difficoltà 2 => tra 1 e 50


// *** VARIANTE BONUS ***//
// Inizializzo una variabile in cui salvare il livello di difficoltà, su cui effettuo un controllo dell'input dell'utente con un ciclo do-while
do {
    var difficulty = parseInt(prompt('Inserisci il livello di difficoltà: 0 - Facile, 1 - Medio, 2 - Difficile','0 - 1 - 2'));
} while (difficulty > 2 || difficulty < 0);

// Creo una variabile che memorizza l'estremo superiore dell'intervallo del gioco, variabile a seconda dell'input dell'utente
var upperBound;

// Utilizzo lo switch case per le varie opzioni
switch (difficulty) {
    case 0:
        upperBound = 100;
        break;
    case 1:
        upperBound = 80;
        break;
    case 2:
        upperBound = 50;
        break;
    // default: alert('Scegli uno dei seguenti numeri: 0, 1, 2');
    // se faccio il controllo dell'input di 'difficulty' non serve default
}

// Creo la variabile 'tentativi' per l'utente
var tentativi = upperBound - 16;
console.log('Difficoltà:',difficulty);

// 1. Genero 16 numeri casuali nell'intervallo [1,upperBound] e li salvo in un array, usando la funzione che controlla eventuali ripetizioni. In questo caso utilizzo il ciclo while perché, pur conoscendo la lunghezza finale dell'array, non so quante volte verrà effettuato il ciclo, per via del controllo sulle ripetizioni che blocca il push del numero già presente

var arrPc = [];
var numPc;
while (arrPc.length < 16) {
    numPc = numRandom(1,upperBound);
    if (!checkNum(arrPc,numPc)) {
        arrPc.push(numPc);
    }
}

console.log('Array PC:',arrPc);

// 2. Inserimento dei numeri digitati dall'utente in un array. Scelgo di usare il ciclo do-while perché non conosco a priori la lunghezza dell'array dell'utente (si interrompe non appena trova una bomba) ma devo comunque inserire almeno un elemento per effettuare il controllo con l'array del pc

// Inizializzo l'array dell'utente e la variabile che terrà conto del punteggio ottenuto (numero di volte di inserimenti consentiti)

// var arrUser = [];
// var numUser;
// var punteggio = 0;
// do {
//     // Chiedo all'utente tanti numeri quanti stabiliti dalla var 'tentativi' nell'intervallo [1,upperBound]
//     numUser = parseInt(prompt('Inserisci un numero da 1 a ' + upperBound,'1-' + upperBound));
//     // Effettuo il controllo che siano all'interno dell'intervallo stabilito e che non siano stati precedentemente inseriti. A esito positivo inserisco il numero nell'array dell'utente e aggiorno la variabile del punteggio
//     if (!checkNum(arrUser,numUser) && numUser >= 1 && numUser <= upperBound) {
//         arrUser.push(numUser);
//         punteggio++;
//     }   else {
//         alert('Sono ammessi solo numeri nell\'intervallo [1,' + upperBound + '] che non hai già inserito');
//     }
// // fino a quando non raggiungo la lunghezza max dell'array dell'utente o il numero inserito corrisponde a un elemento dell'array del pc (bomba!)
// } while (arrUser.length < tentativi && !checkNum(arrPc,numUser));

// *** Con WHILE e l'ausilio della variabile sentinella 'trovato' posso evitare di pushare l'elemento che fa scattare la bomba *** //
var arrUser = [];
var trovato = false;

while (arrUser.length < tentativi && trovato == false) {
    numUser = parseInt(prompt('Inserisci un numero da 1 a ' + upperBound,'1-' + upperBound));
    while (numUser <= 0 || numUser > upperBound) { //oppure (!(numUser > 0 && numUser <= upperBound))
        numUser = parseInt(prompt('Sono ammessi solo numeri nell\'intervallo [1,' + upperBound + ']'));
    }
    if (checkNum(arrPc,numUser)) {
        trovato = true;
    }   else if (!checkNum(arrUser,numUser)) {
        arrUser.push(numUser);
    }   else {
        alert('Attenzione! Il numero è già presente, inseriscine un altro');
    }
}

if (trovato) {
    alert('Boom! Hai beccato una bomba, mi spiace. Hai totalizzato ' + arrUser.length + ' punti');
}   else {
    alert('Hai vinto!');
}

console.log('Array utente:',arrUser);

// *** Alert per il ciclo do-while con la variabile 'punteggio' *** //
// alert('Boom! Hai beccato una bomba, mi spiace. Hai totalizzato',--punteggio,'punti');
// alert('Boom! Hai beccato una bomba, mi spiace. Hai totalizzato',arrUser.length - 1,'punti');


// *** FUNZIONI *** //
// a. Funzione che genera un numero random in un dato intervallo (estremi compresi)
function numRandom(min,max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}

// b. Funzione che verifica la presenza di un numero all'interno di un array
function checkNum(arr,num) {
    var i = 0;
    while (i < arr.length) {
        if (num == arr[i]) {
            return true;
        }
        i++;
    }
    return false;
}
