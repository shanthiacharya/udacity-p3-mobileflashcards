import React, {Component} from 'react'
import { View,Text,TextInput,Button } from 'react-native';
import {receiveDecks} from '../actions';
import {fetchDecks,getDeckById,addDeck} from '../utils/api'
import {objectToArray} from '../utils/utils'
import {connect} from 'react-redux'


class AddQuestion extends Component {


  constructor(props) {
    super(props);
    this.state = {
         question: '',
         answer: ' '
     }
   }


    componentDidMount(){


    }


    addQuestion = () => {

      console.log("Add Question")
      const {question, answer} = this.state
      if (question && question.length > 0 && answer && answer.length > 0){
        const {dispatch, decks} = this.props
        const {id} = this.props.navigation.state.params

        getDeckById(id)
        .then(deck => {
          deck.questions.push({question,answer})
            console.log("GetDeckbyId Deck:" + JSON.stringify(deck) + "qUESTIONS" + deck.questions  )
            addDeck (deck)
            .then(() => {
              fetchDecks().then((decksNew) => {
                dispatch(receiveDecks(decksNew))
                this.props.navigation.navigate ('Deck',{id:id})
              })
            })
          })



        }

    }




    render() {

       return (
          <View style ={{flex:1}}>
           <Text> Add Question </Text>
           <Text>  Question </Text>
           <TextInput style ={{height:40,borderColor:'gray',borderWidth:1,margin:10}}
             onChangeText = {(question) => this.setState({question})}
             value= {this.state.question}
             />
             <Text>  Answer </Text>
             <TextInput  multiline ={true} numberOfLines = {4} style ={{height:300,borderColor:'gray',borderWidth:1,margin:10}}
               onChangeText = {(answer) => this.setState({answer})}
               value= {this.state.answer}
               />
               <Button title="Add Question" onPress = {this.addQuestion } />


          </View>
       );
    }
}


function mapStateToProps ( decks ) {
   console.log("Map State to Props DeckList: " + decks)
    return {
          decks
       }

}
export default connect(mapStateToProps) (AddQuestion)
