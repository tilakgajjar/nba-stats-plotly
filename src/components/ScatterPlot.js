/* global Plotly:true */
import React from 'react';
import { connect } from 'react-redux'
import ChooseStatsScatterPlotX from '../container/ChooseStatsScatterPlotX'
import ChooseStatsScatterPlotY from '../container/ChooseStatsScatterPlotY'
import { makeGetScatterXState, makeGetScatterYState, makeGetStats } from '../selectors/scatterplot'

let statisticsX = []
let statisticsY = []
let strX = ''
let strY = ''
let data = []

class ScatterPlot extends React.Component {

  drawScatterPlot = () => {

    Plotly.newPlot('scatterplot', data , {

      xaxis: {
        title: `${strX.toUpperCase()}`,
        tickfont: {
          size: 10
        }
      },
      yaxis: {
        title: `${strY.toUpperCase()}`,
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
    this.drawScatterPlot();
  }

  componentDidUpdate() {
    this.drawScatterPlot();
  }

  render() {

    const { statsScatterX, statsScatterY, stats } = this.props

    strX = statsScatterX
    strY = statsScatterY

    let items =  stats.map((item)=> { return item; });

    statisticsX = []
    statisticsY = []

    const getStatistics = (strX, strY) => {
      statisticsX = items.map((item) => {
         let Obj = {}
         Obj = {index: item.index, id: item.id, name: item.name, year: item.year, stat: Number(item.stats[0][strX]).toFixed(3)}
         return Obj
      })

      statisticsY = items.map((item) => {
        let Obj = {}
        Obj = {index: item.index, id: item.id, name: item.name, year: item.year, stat: Number(item.stats[0][strY]).toFixed(3)}
        return Obj
     })
    }

    if(strX!=='' && strY!==''){
      getStatistics(strX, strY)
    }

    let ids = statisticsX.map((item)=> item.id)

    let uniqueIds =  ids.filter(function(item, pos){
      return ids.indexOf(item)===pos;
    });


    let trace = {}
    data = []

    for(let val of uniqueIds){
      let tempX = statisticsX.filter((item)=>{
        if(val===item.id){
          return item.id
        }
      })

      let statX = tempX.map((item)=> item.stat)

      let NameAndYearX = tempX.map((item)=> `${item.name} ${item.year}`)

      let name = tempX.map((item)=> `${item.name}`)

      let uniqueName =  name.filter(function (value, index, self) {
          return self.indexOf(value) === index;
      });

      let tempY = statisticsY.filter((item)=>{
        if(val===item.id){
          return item.id
        }
      })

      let statY = tempY.map((item)=> item.stat)

      trace = {
          id: val,
          x:  statX,
          y: statY,
          text: NameAndYearX,
          mode: 'markers',
          type: 'scatter',
          name: uniqueName[0].toString(),
          marker: { size: 10 },
          hoverinfo: "x+y+text"
      }
      data.push(trace)
    }

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


const makeMapStateToProps = () => {

 const getScatterX = makeGetScatterXState()
 const getScatterY = makeGetScatterYState()
 const getStatsState = makeGetStats()

 const mapStateToProps = (playerInfo) => {
   return {
      statsScatterX: getScatterX(playerInfo),
      statsScatterY: getScatterY(playerInfo),
      stats: getStatsState(playerInfo)
   }
  }
 return mapStateToProps
}

export default connect(makeMapStateToProps)(ScatterPlot)
