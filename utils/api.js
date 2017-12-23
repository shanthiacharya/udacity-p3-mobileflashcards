import {AsyncStorage} from 'react-native'
import {FLASHCARDS_STORAGE_KEY} from './_decks'
import {uniqueNumber} from './utils'
import {objectToArray} from './utils'


export function clearAll () {
    AsyncStorage.clear()
    .then(() => {})
    .catch (e => {
      console.log(e)
    })
}
//getDecks: return all of the decks along with their titles, questions, and answers.
export function fetchDecks () {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
}

//getDeck: take in a single id argument and return the deck associated with that id.
export function getDeckById(id) {
       return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
      .then((results) => {
            const data = JSON.parse(results)
            let deck = data[id]
            return deck
        })
}


//saveDeckTitle: take in a single title argument and add it to the decks.
export function addDeck (newdeck) {
    clearAll()
   return AsyncStorage.mergeItem (FLASHCARDS_STORAGE_KEY, JSON.stringify({
       // [newdeck.title]:newdeck
       [newdeck.id]:newdeck
     }))
}
