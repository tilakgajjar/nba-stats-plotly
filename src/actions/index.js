import { call, put } from 'redux-saga/effects'
import * as TYPES from '../types'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response; 
  throw error;
}

function parseJSON(response) {
  return response.json();
}

//API function

export const api = (url) => {
  return fetch(url, {
    accept: 'application/json',
  }).then(checkStatus)
  .then(parseJSON);
}

//actions

//fetch all the players

export const fetchAllPlayerRequest = () => ({
    type: TYPES.FETCH_ALL_PLAYER_REQUEST
})

//fetch player name and year

export const fetchPlayerIDRequest = (fname, lname, year) => ({
    type: TYPES.FETCH_PLAYER_ID_REQUEST,
    fname: fname,
    lname: lname,
    year: year
})

//fetch stats for selected player

export const fetchPlayerStatsRequest = (data) => ({
  type: TYPES.FETCH_PLAYER_STATS_REQUEST,
  data: data
})

//show input errorlable

export const showInputError = (err) => ({
  type: TYPES.SHOW_INPUT_ERROR,
  yearInput: err.y
})

//remove player from the selected playerlist

export const removePlayer = (id, year) => ({
  type: TYPES.REMOVE_PLAYER,
  id: id,
  year: year
})

//choose stats for barplot

export const addStatsForBarPlot = (data) => ({
  type: TYPES.UPDATE_STATS_BAR_PLOT,
  stats: data
})

//choose stats for scatter plot x-axis

export const addStatsForScatterPlotX = (data) => ({
  type: TYPES.UPDATE_STATS_SCATTER_PLOT_X,
  stats: data
})

//choose stats for scatter plot y-axis

export const addStatsForScatterPlotY = (data) => ({
  type: TYPES.UPDATE_STATS_SCATTER_PLOT_Y,
  stats: data
})

//show loader while fetching player info and stats

export const showLoader = (data) => ({
  type: TYPES.SHOW_LOADER,
  data: data
})


const headers = new Headers()
headers.append('Content-Type', 'application/json')
headers.append('Accept', 'application/json')

//sagas generator functions

//generator function to fetch all players

export function* fetchAllPlayer(action) {

  try{
    const playerList = yield call(api, `http://localhost:5000/player?api_key=T8bcils9hULxNAY0eK3n4HuJ7dkQy6Zf&first_name=&last_name=`);
    const finalList = playerList.map(person => ({ key: person.id, value: `${person.first_name} ${person.last_name}`, first_name: person.first_name, last_name: person.last_name, text: person.player_name }))
    yield put({type: TYPES.FETCH_ALL_PLAYER_SUCCESS, data: finalList});

  } catch (e) {
    console.log('something went wrong!');
  }
}

//generator function to fetch player id and name

export function* fetchPerson(action) {

   try {
      if((action.fname==='' && action.lname==='') || action.year===''){
        let err = { y: true }
        yield put({type: TYPES.SHOW_INPUT_ERROR, err});

      }else {
        const person = yield call(api, `http://localhost:5000/player?api_key=T8bcils9hULxNAY0eK3n4HuJ7dkQy6Zf&first_name=${action.fname}&last_name=${action.lname}`);
        yield put({type: TYPES.FETCH_PLAYER_ID_SUCCESS, data: person});

        let pl_id = person.map(person => person.id);
        let pl_name = person.map(person => person.player_name);

        if(pl_id.length===1){
          let data = { id: pl_id[0], year: action.year, name: pl_name[0] }
          yield put({type: TYPES.FETCH_PLAYER_STATS_REQUEST, data});
        }
      }

   } catch (e) {
     let err = { y: false }
     yield put({type: TYPES.SHOW_INPUT_ERROR, err});
   }
}

//generator function to fetch stats for added player

export function* fetchStats(action) {

  try{
    const stats = yield call(api, `http://localhost:5000/boxscore?api_key=T8bcils9hULxNAY0eK3n4HuJ7dkQy6Zf&player_id=${action.data.id}&year=${action.data.year}`);
    const statsWithId = { id: action.data.id, name: action.data.name, year: action.data.year, stats: stats}

    yield put({type: TYPES.FETCH_PLAYER_STATS_SUCCESS, data: statsWithId});

    let err = { y: false }
    yield put({type: TYPES.SHOW_INPUT_ERROR, err});
    yield put({type: TYPES.SHOW_LOADER, data: false});

  } catch (e) {
    let err = { y: true }
    yield put({type: TYPES.SHOW_INPUT_ERROR, err});
    yield put({type: TYPES.SHOW_LOADER, data: false});

  }
}
