import React, { Component } from 'react';
import { Table, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { removePlayer } from '../actions'
import { makeGetPlayersStatsState } from '../selectors/selectedplayers'

class SelectedPlayers extends Component {

  render(){

  const {stats, dispatch} = this.props

  return(
      <div style={{marginTop: '10px'}}>
          <Table selectable singleLine>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    {`Player Name`}
                  </Table.Cell>
                  <Table.Cell>
                    {`Year`}
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    <Icon color='basic' style={{color:'white', border:'0px'}} name='remove circle' />
                  </Table.Cell>
                </Table.Row>
                {stats.map((player, i) =>
                <Table.Row key={i}>
                  <Table.Cell>
                    {player.name}
                  </Table.Cell>
                  <Table.Cell>
                    {player.year}
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    <Icon onClick={() => dispatch(removePlayer(player.id, player.year))}  name='remove circle' />
                  </Table.Cell>
                </Table.Row>)}
              </Table.Body>
          </Table>
     </div>
    )
  }
}

const makeMapStateToProps = () => {

 const getStatsState = makeGetPlayersStatsState()

 const mapStateToProps = (playerInfo) => {
   return {
      stats: getStatsState(playerInfo)
   }
  }
 return mapStateToProps
}

export default connect(makeMapStateToProps)(SelectedPlayers)
