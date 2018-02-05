import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'
import { fetchAllPlayerRequest } from '../actions'
import { connect } from 'react-redux'
import { makeGetPlayersListState } from '../selectors/playerlist'

//List of Added Players
class PlayerList extends Component {
  constructor(props) {
  super(props);
  this.state = {
    options: []
  };
}

onChange = (e, {value}) => {
  let str = value.split(' ')
  this.setState({fname: str[0], lname: str[1]})
}

getResults = () => {
  this.props.dispatch(fetchAllPlayerRequest())
}

componentDidMount(){
  this.getResults()
}

render(){
  return(
    <Dropdown
      placeholder='Enter Player Name'
      fluid
      search
      selection
      options={this.props.playerList}
      onChange={this.props.onChange}
      />
    )
  }
}

const makeMapStateToProps = () => {

 const getPlayerListState = makeGetPlayersListState()

 const mapStateToProps = (playerInfo) => {
   return {
      playerList: getPlayerListState(playerInfo)
   }
  }
 return mapStateToProps
}

export default connect(makeMapStateToProps)(PlayerList)
