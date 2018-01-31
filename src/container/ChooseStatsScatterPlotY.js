import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addStatsForScatterPlotY } from '../actions'
import { Dropdown } from 'semantic-ui-react'

class ChooseStatsScatterPlotY extends Component {

  handleChange = (e, { value }) => {
    this.props.dispatch(addStatsForScatterPlotY(value))
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
           value={this.props.value}
           compact
         />

    )
  }
}

const mapStateToProps = ({playerInfo}) => ({playerInfo})

export default connect(mapStateToProps)(ChooseStatsScatterPlotY)
