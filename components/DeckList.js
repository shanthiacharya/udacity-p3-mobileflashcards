import React, {Component} from 'react'
import { View,Text,FlatList } from 'react-native';
import {receiveDecks} from '../actions';
import {fetchDecks} from '../utils/api'
import  { objectToArray } from '../utils/utils'
import {connect} from 'react-redux'
import DeckListItem from './DeckListItem'

class DeckList extends Component {

    state = {
      decksList:[],
      loading:true
    }

    componentDidMount(){
      this.getDeckList()

    }

     getDeckList(){
      const {dispatch} = this.props
      fetchDecks().then((decks) =>{
        dispatch(receiveDecks(decks))
        if (decks) {
            const decksList = Object.values(JSON.parse(decks))
            // decksList.map((d) => {
            //   d.key = d.id
            // })
            // console.log("GetDeckList:"+ decksList)
            this.setState(() => ({ decksList }))
        }
      })
    }


    _renderItem ({item})  {
        return (
          <Text key={item.id} > {item.title} </Text>
        );
    }

    render() {
      const {decksList} = this.state
       return (
          <View>
           <Text> DeckList </Text>
            <FlatList
            data = {decksList}
            renderItem = {this._renderItem} />
          </View>
       );
    }
}


function mapStateToProps ( decks ) {
   // console.log("Map State to Props DeckList: " + decks)
    return {
         decks
       }

}
export default connect(mapStateToProps) (DeckList)
