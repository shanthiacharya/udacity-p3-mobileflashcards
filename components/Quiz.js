import React, {Component} from 'react'
import {Text, View, StyleSheet,TextInput} from 'react-native'
import {connect} from 'react-redux'
import {receiveDeckById} from '../actions'
import * as API from '../utils/api'
import {objectToArray} from '../utils/utils'
import {Button} from 'nachos-ui'
import {black} from '../utils/colors'

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
    this.setState({deckId:id})
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

 startQuiz = () => {
    this.props.navigation.navigate ('Quiz', {id:this.state.deckId})
 }

 gobacktoDeck = () => {
    this.props.navigation.navigate ('Deck',{id:this.state.deckId})
 }


  render() {
      const {deck} = this.props
      const {showAnswer,questionIndex,correctAnswerCount } = this.state
      if (deck){
        const questions_in_deck = objectToArray(deck.questions)
        return (
          <View style={{flex:1}}>
          {(questionIndex <  questions_in_deck.length) ?
          <View style={{flex:1}} >
              <View style={{flex:1}}>
                  <Text style ={styles.cardTitle}> {deck.title} </Text>
                  <Text style ={styles.questionsCount}>  Correct Answers :{this.state.correctAnswerCount} </Text>
                  <Text style ={styles.fieldTitle}> Question {questionIndex + 1 } of {questions_in_deck.length} </Text>
                  <Text style ={styles.fieldTitle}> {questions_in_deck[questionIndex].question} </Text>
                  { showAnswer &&

                    (  <View style={{flex:1/4, backgroundColor:'#ffffff'}}>
                       <Text style = {styles.fieldTitle}> Answer </Text>
                       <Text> {questions_in_deck[questionIndex].answer} </Text>

                     </View>
                   )
                   }
                  <Button style={btnStyle}   onPress = {this.toggleShowAnswer}> Show Answer </Button>

                  <View style ={styles.replybuttons}>
                     <Button style={newStyle2}  type='danger' onPress = {this.handleIncorrect} > Incorrect </Button>
                    <Button type='success'  onPress = {this.handleCorrect}> Correct </Button>

                  </View>
              </View>

          </View> :
             <View style={{flex:1}}>
                  <Text> Your Results : {Math.round(this.state.correctAnswerCount/questions_in_deck.length) *100 }  %</Text>
                  <Button type='success' onPress = {this.startQuiz}> Retake Quiz </Button>
                  <Button  onPress = {this.gobacktoDeck}> Back to Deck </Button>
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
const btnStyle = {
  margin:20,
  width:250,
  justifyContent:'center',
  alignItems: "center",

}
const newStyle2 = {
  marginRight:20
}
const styles = StyleSheet.create ({

    replybuttons: {
      flex:1,
      flexDirection: 'row',
      justifyContent: "space-between",
      margin:20


    },
    deckView: {
      flex:1,
      margin:40,
      alignItems: "stretch",
      justifyContent: "space-around",
    },
    correctIncorrectStyle: {
     margin:10
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
     },
     fieldTitle : {
        fontSize: 20,
        color: black,
        fontWeight: "300",
        marginBottom: 0,
        paddingBottom: 5
      },



})


function mapStateToProps(deck) {
  console.log ("Deck Component: " + JSON.stringify(deck))
  return {
     deck
  }
}
export default connect (mapStateToProps)(Quiz)
