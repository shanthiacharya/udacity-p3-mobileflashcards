import React, {Component} from 'react'
import { StyleSheet,View,Text, TextInput,Button } from 'react-native';
import {connect} from 'react-redux'
import {fetchDecks,addDeck} from '../utils/api'
import {receiveDecks} from '../actions'
import {uniqueNumber} from '../utils/utils'
import {Bubble} from 'nachos-ui'

class CreateDeck extends Component {

  constructor (props) {
    super (props)
    this.state = {
      title :'',
      id :'',
      emptyfield:false
    }
  }

  createDeck = () =>  {

    console.log("create Deck :" + this.state.title)
    const {dispatch} = this.props
    const {title,emptyfield} = this.state
    let deckId = uniqueNumber()
    this.state.id = deckId
    if (title === "")
      this.setState ({emptyfield:true})
    else {

        const deck = {
          id: this.state.id,
          title: this.state.title,
          questions: []
        }
        addDeck(deck).then(()=> {
          fetchDecks().then ((decks) => {
            dispatch (receiveDecks(decks))
            this.props.navigation.navigate ('AddQuestion', {id:this.state.id})
            this.state ={title:''};
          })
        })
    }

  }

    render() {
          const {title,emptyfield} = this.state
       return (
          <View  style = {{flex:1,justifyContent:'center' }}>
          <TextInput style ={{height:40,borderColor:'gray',borderWidth:1,margin:10}}
            onChangeText = {(title) => this.setState({title,emptyfield:false})}
            value= {this.state.title}
            />
            {(emptyfield) && <Bubble  arrowPosition='top'color='#ff0000'> Name cannot be empty!</Bubble>}
            <Button title="Create Deck" onPress = {this.createDeck} />
          </View>

       );
    }
}



function mapStatetoProps (decks) {
  return {
    decks
  }
}





export default connect (mapStatetoProps ) (CreateDeck)
