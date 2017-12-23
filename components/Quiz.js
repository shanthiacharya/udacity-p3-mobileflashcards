import React, {Component} from 'react'
import {Text, View, StyleSheet, Button} from 'react-native'
import {connect} from 'react-redux'
import {receiveDeckById} from '../actions'
import * as API from '../utils/api'
import {objectToArray} from '../utils/util'

class Quiz extends Component {

  state :{
   deckId:null,
   questionIndex: null,
   showAnswer:null,
   correctAnswerCount:0

  }

  constructor (props){


  }

  componentDidMount(){
    const {id} = this.props.navigation.state.params
    this.setState({deckId:id})
    const {dispatch} = this.props
    API.getDeckById(id).then((deck)=> {
        dispatch (receiveDeckById(deck))
    })
  }


  render() {
      const {deck} = this.props
      if (deck){
        const questions_in_deck = objectToArray(deck.questions)
        return (
          <View style={{flex:1}}>
            {questionIndex < questions_in_deck.length }
            <Text> Question </Text>

            <Text> Answer </Text>
            


          </View>


        )
      }
      return (

        <Text> No Deck </Text>

      )

  }
}




function mapStateToProps(deck) {
  console.log ("Deck Component: " + JSON.stringify(deck))
  return {
     deck
  }
}
export default connect (mapStateToProps)(Quiz)
