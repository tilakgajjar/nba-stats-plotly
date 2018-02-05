/* global Plotly:true */
import React from 'react';
import { connect } from 'react-redux'
import ChooseStatsBarPlotX from '../container/ChooseStatsBarPlotX'
import { makeGetBarState, makeGetStatsState } from '../selectors/barplot'

let statistics = []
let str = ''
let data = []

class BarPlot extends React.Component {

  drawBarPlot = () => {

    Plotly.newPlot('plot', data, {
      xaxis: {
        gridcolor: 'transparent',
        title: 'Player Name and Year',
        tickfont: {
          size: 10
        }
      },
      yaxis: {
        title: `${str.toUpperCase()}`,
        tickfont: {
          size: 10
        }
      },

    }, {
      displayModeBar: false,
      hovermode:'closest'
    });
  }

  componentDidMount() {
    this.drawBarPlot();
  }

  componentDidUpdate() {
    this.drawBarPlot();
  }

  render() {

    const { statsBar, stats } = this.props

    str = statsBar
    statistics = []

    let items =  stats.map((item)=> { return item; });

    const getStatistics = (str) => {
      statistics = items.map((item) => {
         let Obj = {}
         Obj = {index: item.index, id: item.id, name: item.name, year: item.year, stat: Number(item.stats[0][str]).toFixed(3)}
         return Obj
      })
    }

    if(str!==''){
      getStatistics(str)
    }

    let ids = statistics.map((item)=> item.id)

    let uniqueIds =  ids.filter(function(item, pos){
      return ids.indexOf(item)=== pos;
    });


    let trace = {}
    data = []

    for(let val of uniqueIds){
      let temp = statistics.filter((item)=>{
        if(val===item.id){
          return item.id
        }
      })


      let stat = temp.map((item)=> item.stat)

      let NameAndYear = temp.map((item)=> `${item.name} ${item.year}`)

      let name = temp.map((item)=> `${item.name}`)

      let uniqueName =  name.filter(function (value, index, self) {
          return self.indexOf(value) === index;
      });

      trace = {
          id: val,
          x: NameAndYear,
          y: stat,
          mode: 'markers',
          type: 'bar',
          name: uniqueName[0].toString(),
          width: .09,
          hoverinfo: "x+y"
      }

      data.push(trace)

    }

    return (
      <div>
        <div style={{marginTop: '10px'}}>
          Choose Stats: <ChooseStatsBarPlotX />
        </div>
        <div id="plot"></div>
      </div>
    );
  }
}

const makeMapStateToProps = () => {

 const getBarState = makeGetBarState()
 const getStatsState = makeGetStatsState()

 const mapStateToProps = (playerInfo) => {
   return {
      statsBar: getBarState(playerInfo),
      stats: getStatsState(playerInfo)
   }
  }
 return mapStateToProps
}

export default connect(makeMapStateToProps)(BarPlot)
