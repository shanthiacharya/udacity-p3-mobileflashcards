import React, {Component} from 'react'
import { View,Text,FlatList,StyleSheet } from 'react-native';
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


    _renderItem = ({item}) => {
        return (
          <DeckListItem key={item.id} {...item} navigation = {this.props.navigation}/>
        );
    }

    render() {
      const {decksList} = this.state
       return (
          <View style = {styles.maindeckListStyle}>

            <FlatList
            data = {decksList}
            renderItem = {this._renderItem}
            keyExtractor={(item, index) => index} />
          </View>
       );
    }
}

const styles = StyleSheet.create ({
  maindeckListStyle: {
    paddingTop:40,
    paddingBottom:100

  }
})

function mapStateToProps ( decks ) {
   // console.log("Map State to Props DeckList: " + decks)
    return {
         decks
       }

}
export default connect(mapStateToProps) (DeckList)
