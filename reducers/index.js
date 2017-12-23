import {RECEIVE_DECKS,RECEIVE_DECK_BY_ID} from '../actions'

export default function decks (state= {} , action) {

  switch (action.type) {
    case RECEIVE_DECKS :
      return action.decks
    case RECEIVE_DECK_BY_ID:
      console.log("Reducer DeckbyId: " +JSON.stringify(action.deck) );
      return action.deck
      break;
    default:
      return state



  }
}
