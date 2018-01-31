import React, { Component } from 'react';
import { Table, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { removePlayer } from '../actions'

class SelectedPlayers extends Component {

  render(){

  const {playerInfo, dispatch} = this.props

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
                {playerInfo.stats.map((player, i) =>
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

const mapStateToProps = ({playerInfo}) => ({playerInfo})

export default connect(mapStateToProps)(SelectedPlayers)
