import React, {Component} from 'react'
import {Text,View,StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {Button} from 'nachos-ui'
import {receiveDeckById} from '../actions'
import * as API from '../utils/api'
import {objectToArray} from '../utils/utils'
import {black} from '../utils/colors'

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

   goBack = () => {
      this.props.navigation.navigate ('Home')
   }


   render(){

      const {deck} = this.props

      if (deck) {

        const questions_in_deck = objectToArray(deck.questions)
        return(
          <View style = {styles.deckView}>
          <Text style={styles.cardTitle} > DeckName: {deck.title} </Text>
          <Text style={styles.questionsCount}> Questions: {questions_in_deck.length}  </Text>
          <Button onPress = {this.addMoreQuestion}> New Question</Button>
          <Button type='success' onPress = {this.startQuiz} >Start Quiz</Button>
          <Button type='danger' onPress = {this.goBack} >Go Back</Button>

          </View>
        );
      }

      return (
        <Text> No Deck </Text>
      )

   }



}
const styles = StyleSheet.create({
  deckView: {
    flex:1/2,
    margin:40,
    alignItems: "stretch",
    justifyContent: "space-around",
  },
  btnStyle: {
    margin: 50,
  },
  cardTitle : {
     fontSize: 28,
     color: black,
     fontWeight: "400",
     marginBottom: 0,
     paddingBottom: 5
   },
    questionsCount : {
     fontSize: 20,
     fontWeight: "200",
     paddingBottom: 50
   }

})


function mapStateToProps(deck,{ navigation }) {
  console.log ("Deck Component: " + JSON.stringify(deck))
  return {
     deck
  }
}
export default connect (mapStateToProps)(Deck)
