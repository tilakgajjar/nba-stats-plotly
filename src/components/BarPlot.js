/* global Plotly:true */
import React from 'react';
import { connect } from 'react-redux'
import ChooseStatsBarPlotX from '../container/ChooseStatsBarPlotX'

let name = []
let statastics = []
let str = ''

class BarPlot extends React.Component {

  drawPlot = () => {

    Plotly.newPlot('plot', [{
        x: name,
        y: statastics,
        type: 'bar',
        name: 'Primary Product',
        width: .09,
        marker: {
          color: 'rgb(49,130,189)',
          opacity: 0.7,
        }
    }], {
      xaxis: {
        gridcolor: 'transparent',
        title: 'Player Name and Year',
        tickfont: {
          size: 10,
          color: 'rgb(107, 107, 107)'
        }
      },
      yaxis: {
        range: [0,50],
        title: `${str.toUpperCase()}`
      },

    }, {
      displayModeBar: false
    });
  }

  componentDidMount() {
    this.drawPlot();
  }

  componentDidUpdate() {
    this.drawPlot();
  }

  render() {
    const { playerInfo } = this.props
    str = playerInfo.statsBar
    name = []
    statastics = []

    let items =  playerInfo.stats.map((item)=> { return item; });

    items.map((item) => {
      name.push(item.name + ' ' + item.year);
      switch (str) {
        case 'ppg':
          statastics.push(item.stats[0].ppg)
          break;
        case 'apg':
          statastics.push(item.stats[0].apg)
          break;
        case 'rpg':
          statastics.push(item.stats[0].rpg)
          break;
        case 'fg%':
          statastics.push(item.stats[0].fgp)
          break;
        case '3p%':
          statastics.push(item.stats[0].fg3p)
          break;
        default:
          break;
      }
    }, []);

    return (
      <div>
        <div style={{marginTop: '10px'}}>Choose Stats: <ChooseStatsBarPlotX /></div>
        <div id="plot"></div>
      </div>
    );
  }
}

const mapStateToProps = ({playerInfo}) => ({playerInfo})

export default connect(mapStateToProps)(BarPlot)
