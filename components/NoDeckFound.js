import React, {Component} from 'react'
import {Button} from 'nachos-ui'
import {Text} from 'react-native'

class NoDeckFound extends Component {

   render () {
     return (
       <Text> No Decks Exists </Text>
       <Button> Add New Deck </Button>
     ) }


}
export default NoDeckFound
