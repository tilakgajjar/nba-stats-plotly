import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addStatsForBarPlot } from '../actions'
import { Dropdown } from 'semantic-ui-react'
import { makeGetBarState } from '../selectors/barplot'

class ChooseStatsBarPlotX extends Component {

  handleChange = (e, { value }) => {
    this.props.dispatch(addStatsForBarPlot(value))
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
           value={this.props.statsBar}
           compact
         />

    )
  }
}


const makeMapStateToProps = () => {

 const getBarState = makeGetBarState()

 const mapStateToProps = (playerInfo) => {
   return {
      statsBar: getBarState(playerInfo)
   }
  }
 return mapStateToProps
}

export default connect(makeMapStateToProps)(ChooseStatsBarPlotX)
