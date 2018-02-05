import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addStatsForScatterPlotX } from '../actions'
import { Dropdown } from 'semantic-ui-react'
import { makeGetScatterXState } from '../selectors/scatterplot'

class ChooseStatsScatterPlotX extends Component {

  handleChange = (e, { value }) => {
    this.props.dispatch(addStatsForScatterPlotX(value))
  }

  render(){

    const options = [
      { key: 'PPG', text: 'PPG', value: 'ppg' },
      { key: 'APG', text: 'APG', value: 'apg' },
      { key: 'RPG', text: 'RPG', value: 'rpg' },
      { key: 'FG%', text: 'FG%', value: 'fg%' },
      { key: '3P%', text: '3P%', value: '3p%'}
    ]

    return(

        <Dropdown
           onChange={this.handleChange}
           options={options}
           placeholder='Stats'
           selection
           value={this.props.statsScatterX}
           compact
         />

    )
  }
}

const makeMapStateToProps = () => {

 const getScatterX = makeGetScatterXState()
 
 const mapStateToProps = (playerInfo) => {
   return {
      statsScatterX: getScatterX(playerInfo),
   }
  }
 return mapStateToProps
}

export default connect(makeMapStateToProps)(ChooseStatsScatterPlotX)
