import React, {Component} from 'react'
import {Text,View,StyleSheet,Button} from 'react-native'
import {connect} from 'react-redux'
import {receiveDeckById} from '../actions'
import * as API from '../utils/api'
import {objectToArray} from '../utils/utils'

class Deck extends Component {

    state: {
      deck:null,
      deckId:null
    }

    constructor(props) {
      super(props);

     }


    componentDidMount(){
      const {id} = this.props.navigation.state.params
      this.setState({deckId:id})
      const {dispatch} = this.props
      API.getDeckById(id).then((deck)=> {
          dispatch (receiveDeckById(deck))
      })
    }

   addMoreQuestion = () => {
     console.log (this.props)
      this.props.navigation.navigate ('AddQuestion', {id:this.state.deckId})

   }

   startQuiz = () => {
      this.props.navigation.navigate ('Quiz', {id:this.state.deckId})
   }


   render(){

      const {deck} = this.props

      if (deck) {

        const questions_in_deck = objectToArray(deck.questions)
        return(
          <View style = {{flex:1}}>
          <Text> {deck.title} </Text>
          <Text> {questions_in_deck.length}  </Text>
          <Button title="Add More Questions"  onPress = {this.addMoreQuestion}/>
          <Button title="Start Quiz" onPress = {this.startQuiz} />

          </View>
        );
      }

      return (
        <Text> No Deck </Text>
      )

   }



}



function mapStateToProps(deck,{ navigation }) {
  console.log ("Deck Component: " + JSON.stringify(deck))
  return {
     deck
  }
}
export default connect (mapStateToProps)(Deck)
