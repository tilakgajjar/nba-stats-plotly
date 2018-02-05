import React, { Component } from 'react';
import './App.css';
import NBAForm from '../container/index'
import SelectedPlayers from './SelectedPlayers'
import BarPlot from './BarPlot'
import ScatterPlot from './ScatterPlot'
import { Segment } from 'semantic-ui-react'

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    statsValue: []
  };
}

  render() {
    
  return (
    <div align='center'>
      <div className="App" align='center'>
          <NBAForm />
          <div className='App-results'>
            <div>
              <SelectedPlayers />
            </div>
          </div>
      </div>
      <div style={{marginTop: '10px',marginBottom: '10px', width: '800px'}}>
          <Segment><BarPlot /></Segment>
      </div>
      <div style={{marginTop: '10px',marginBottom: '10px', width: '800px'}}>
          <Segment><ScatterPlot /></Segment>
      </div>
    </div>
    );
  }

}


export default App;
