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

// 1. Genero 16 numeri casuali nell'intervallo [1,100] e li salvo in un array, usando la funzione che controlla eventuali ripetizioni. In questo caso utilizzo il ciclo while perché, pur conoscendo la lunghezza finale dell'array, non so quante volte verrà effettuato il ciclo, per via del controllo sulle ripetizioni che blocca il push del numero doppione
var arrPc = [];
while (arrPc.length < 16) {
    var numPc = numRandom(1,100);
    if (!checkNum(arrPc,numPc)) {
        arrPc.push(numPc);
    }
}

console.log('Array PC:',arrPc);

// 2. Inserimento numeri digitati dall'utente in un array. Scelgo di usare il ciclo do-while perché non conosco a priori la lunghezza dell'array dell'utente (si interrompe non appena trova una bomba) ma devo comunque inserire almeno un elemento per effettuare il controllo con l'array del pc

// Inizializzo l'array dell'utente e la variabile che terrà conto del suo punteggio ottenuto (numero di volte di inserimenti consentiti)
var arrUser = [];
var punteggio = 0;
do {
    // Chiedo all'utente (100-16) numeri nell'intervallo [1,100]
    var numUser = parseInt(prompt('Inserisci un numero da 1 a 100','1-100'));
    // Effettuo il controllo che siano all'interno dell'intervallo stabilito e che non siano stati precedentemente inseriti
    if (!checkNum(arrUser,numUser) && numUser >= 1 && numUser <= 100) {
        arrUser.push(numUser);
        punteggio++;
    }   else {
        alert('Sono ammessi solo numeri nell\'intervallo [1,100] che non hai già inserito');
    }
// fino a quando non raggiungo la lunghezza max dell'array dell'utente o il numero inserito corrisponde a un elemento dell'array del pc (bomba!)
} while (arrUser.length < 84 && !checkNum(arrPc,numUser));

console.log('Array utente:',arrUser);

console.log('Boom! Hai beccato una bomba, mi spiace. Hai totalizzato',--punteggio,'punti');


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
