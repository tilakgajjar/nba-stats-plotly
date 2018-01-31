import { combineReducers } from 'redux'
import * as TYPES from '../types'

let counter = 0

//redux store
const initialState = {
    people: [],
    stats: [],
    playerList: [],
    showLoader: false,
    statsBar: '',
    statsScatterX: '',
    statsScatterY: '',
    err: {
            yearInputErr: false
        }
    }

//reducers
const handlePlayerIdFetchSuccess = (state, action) => {
    return {
      ...state,
      people : action.data
    }
}

const handlePlayerStatsSuccess = (state, action) => {

  let obj1 = { index: counter++, id: action.data.id, name: action.data.name, year: action.data.year, stats: action.data.stats }
  let obj2 = Object.assign({}, obj1);

  for (let value of state.stats) {
    if(value.id===action.data.id && value.year===action.data.year){
      return{
        ...state
      }
    }
  }

    return {
        ...state,
        stats : [...state.stats, obj2]
    }

}


const handleInputError = (state, action) => {

  return{
      ...state,
      err: {
        yearInputErr: action.err.y
      }
  }
}

const handleRemovePlayer = (state, action) => {

  let getIndex =  state.stats.filter(function(item) {
  	return item.id===action.id && item.year===action.year;
  });

  return{
      ...state,
      stats: state.stats.filter(st => st.index !== getIndex[0].index)
    }
}

const handleStatsBarPlot = (state, action) => {

  return{
      ...state,
      statsBar: action.stats
    }
}

const handleStatsScatterPlotX = (state, action) => {
  return{
      ...state,
      statsScatterX: action.stats
    }
}

const handleStatsScatterPlotY = (state, action) => {

  return{
      ...state,
      statsScatterY: action.stats
    }
}

const handleAllPlayerFetchSuccess = (state, action) => {

  return{
      ...state,
      playerList: action.data
    }
}

const handleShowLoader = (state, action) => {

  return{
      ...state,
      showLoader: action.data
    }
}



const playerInfo = (state = initialState, action) => {
    const handlers = {
        [TYPES.FETCH_PLAYER_ID_SUCCESS]: handlePlayerIdFetchSuccess,
        [TYPES.FETCH_PLAYER_STATS_SUCCESS]: handlePlayerStatsSuccess,
        [TYPES.FETCH_ALL_PLAYER_SUCCESS]: handleAllPlayerFetchSuccess,
        [TYPES.SHOW_INPUT_ERROR]: handleInputError,
        [TYPES.REMOVE_PLAYER]: handleRemovePlayer,
        [TYPES.UPDATE_STATS_BAR_PLOT]: handleStatsBarPlot,
        [TYPES.UPDATE_STATS_SCATTER_PLOT_X]: handleStatsScatterPlotX,
        [TYPES.UPDATE_STATS_SCATTER_PLOT_Y]: handleStatsScatterPlotY,
        [TYPES.SHOW_LOADER]: handleShowLoader
    }

    return handlers[action.type]
        ? handlers[action.type](state, action)
        : state
}

const rootReducer = combineReducers({
  playerInfo
})

export default rootReducer
