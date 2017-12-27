import React, {Component} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {receiveDeckById} from '../actions'
import * as API from '../utils/api'
import {objectToArray} from '../utils/utils'
import {Button} from 'nachos-ui'

class Quiz extends Component {



  constructor (props){
    super(props)
    this.state = {
       deckId:null,
       questionIndex: 0,
       showAnswer:false,
       correctAnswerCount:0
    }

  }

  componentDidMount(){
    const {id} = this.props.navigation.state.params

    const {dispatch} = this.props
    API.getDeckById(id).then((deck)=> {
        dispatch (receiveDeckById(deck))
    })
  }

 handleCorrect = () => {
  this.setState({correctAnswerCount: this.state.correctAnswerCount + 1 ,questionIndex : this.state.questionIndex + 1 })
  }

 handleIncorrect = () => {
   this.setState ({questionIndex: this.state.questionIndex + 1})
 }

 toggleShowAnswer = () => {
   this.setState({showAnswer:!this.state.showAnswer })
 }




  render() {
      const {deck} = this.props
      const {showAnswer,questionIndex,correctAnswerCount } = this.state
      if (deck){
        const questions_in_deck = objectToArray(deck.questions)
        return (
          <View style={{flex:1}}>
          {(questionIndex <  questions_in_deck.length) ?
          <View style={{flex:1}}>
              <Text> {questionIndex + 1 } of {questions_in_deck.length} </Text>
              <Text>  {this.state.correctAnswerCount} </Text>
              <Text> Question </Text>
              <Text> {questions_in_deck[questionIndex].question} </Text>
              { (showAnswer) && ( <Text> {questions_in_deck[questionIndex].answer} </Text>) }
              <Button  onPress = {this.toggleShowAnswer}> Show Answer </Button>
              <View style ={styles.replybuttons}>
                <Button type='success' onPress = {this.handleCorrect}> Correct </Button>
                <Button  type='danger' onPress = {this.handleIncorrect} > Incorrect </Button>
              </View>
          </View> :
             <View>
                  <Text> Results : {Math.round(this.state.correctAnswerCount/questions_in_deck.length) *100 }  %</Text>
             </View>
         }
        </View>
        )
      }
      return (

        <Text> No Deck </Text>

      )

  }
}

const styles = StyleSheet.create ({

    replybuttons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    }

})


function mapStateToProps(deck) {
  console.log ("Deck Component: " + JSON.stringify(deck))
  return {
     deck
  }
}
export default connect (mapStateToProps)(Quiz)
