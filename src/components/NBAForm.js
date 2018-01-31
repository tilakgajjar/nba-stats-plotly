import React, { Component } from 'react';
import { Form, Input, Button, Label } from 'semantic-ui-react'
import logo from '../logo.jpg';
import PlayerList from './PlayerList'

class NBAForm extends Component {
  constructor(props) {
  super(props);
  this.state = {
    fname: '',
    lname: '',
    year: '',
  };
}

onPlayerClick = (player_id, player_name) => {
  let data = { id: player_id, year: this.state.year, name: player_name}
  this.props.fetchPlayerStatsRequest(data)
}

onChange = (e, {value}) => {
  let str = value.split(' ')
  this.setState({fname: str[0], lname: str[1]})
}

onChangeYear = (e) => {
  this.setState({year: e.target.value})
}

onSubmit = (e) => {
  e.preventDefault();
  const input = document.querySelector('input[name=year]')

  if (!input.value.trim()) {
    return
  }

  this.props.showLoader(true)
  this.props.fetchPlayerIDRequest(this.state.fname, this.state.lname, input.value);
  input.value = ''
}


  render() {

    const { playerInfo } = this.props

    let playerLable = null
    let addButton = null
    let yearInput = null

    if(playerInfo.err.yearInputErr){
      yearInput =  <Form.Field>
                      <Label size='mini' color='red' pointing='below'>Invalid Year</Label>
                      <Input fluid size='small' type="number" name="year"  style={{ marginBottom: '1em' }}   placeholder='Year' />
                   </Form.Field>
    } else {
      yearInput = <Form.Field>
                      <Label size='mini' pointing='below' color='basic' style={{  color: 'white', border: '0px' }}> ABCD </Label>
                      <Input fluid size='small' type="number" name="year"  style={{ marginBottom: '1em' }}   placeholder='Year' />
                  </Form.Field>
    }

    if(playerInfo.showLoader){
      addButton = <Button loading fluid color="black" type="submit" onClick={this.onSubmit}>Add Player</Button>
    }else {
      addButton = <Button fluid color="black" type="submit" onClick={this.onSubmit}>Add Player</Button>
    }


    return (
      <div className="App" align='center'>
          <img src={logo} className="App-logo" alt="logo" />
          <Form onSubmit={this.onSubmit} >
            <div>
              <PlayerList onChange={this.onChange.bind(this)}/>
              {yearInput}
              <div style={{marginBottom: '5px', marginTop: '5px'}}>
                {addButton}
              </div>
            </div>
            <div>
              {playerLable}
            </div>
          </Form>
      </div>
    );
  }
}


export default NBAForm;
