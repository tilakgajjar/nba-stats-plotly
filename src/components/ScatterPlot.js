/* global Plotly:true */
import React from 'react';
import { connect } from 'react-redux'
import ChooseStatsScatterPlotX from '../container/ChooseStatsScatterPlotX'
import ChooseStatsScatterPlotY from '../container/ChooseStatsScatterPlotY'

let name = []
let statasticsX = []
let statasticsY = []
let strX = ''
let strY = ''


class ScatterPlot extends React.Component {

  drawPlot = () => {

    Plotly.newPlot('scatterplot', [{
        x:  statasticsX,
        y: statasticsY,
        text: name,
        type: 'scatter',
        name: 'Primary Product',
        mode: 'markers',
        marker: {
          color: 'rgb(49,130,189)',
          opacity: 0.7,
          size: 12
        }
    }], {

      xaxis: {

        title: `${strX.toUpperCase()}`
      },
      yaxis: {

        title: `${strY.toUpperCase()}`
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

    strX = playerInfo.statsScatterX
    strY = playerInfo.statsScatterY

    let items =  playerInfo.stats.map((item)=> { return item; });

    name = []
    statasticsX = []
    statasticsY = []

    items.map((item) => {
      name.push(item.name + ' ' + item.year);
      switch (strX) {
        case 'ppg':
          statasticsX.push(item.stats[0].ppg)
          break;
        case 'apg':
          statasticsX.push(item.stats[0].apg)
          break;
        case 'rpg':
          statasticsX.push(item.stats[0].rpg)
          break;
        case 'fg%':
          statasticsX.push(item.stats[0].fgp)
          break;
        case '3p%':
          statasticsX.push(item.stats[0].fg3p)
          break;
        default:
          break;

      }

      switch (strY) {
        case 'ppg':
          statasticsY.push(item.stats[0].ppg)
          break;
        case 'apg':
          statasticsY.push(item.stats[0].apg)
          break;
        case 'rpg':
          statasticsY.push(item.stats[0].rpg)
          break;
        case 'fg%':
          statasticsY.push(item.stats[0].fgp)
          break;
        case '3p%':
          statasticsY.push(item.stats[0].fg3p)
          break;
        default:
          break;

      }

    }, []);

    return (
      <div>
        <div style={{marginTop: '10px'}}>
          <span style={{marginRight: '10px'}}>
            Choose Stats X-Axis: <ChooseStatsScatterPlotX />
          </span>
          <span>
            Choose Stats Y-Axis: <ChooseStatsScatterPlotY />
          </span>
        </div>
        <div id="scatterplot"></div>
      </div>
    );
  }
}

const mapStateToProps = ({playerInfo}) => ({playerInfo})

export default connect(mapStateToProps)(ScatterPlot)
