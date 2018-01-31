import { takeLatest, all } from 'redux-saga/effects'

import * as TYPES from '../types'
import { fetchPerson, fetchStats, fetchAllPlayer } from '../actions'

//sagas
function* mySaga() {
  yield all([takeLatest(TYPES.FETCH_ALL_PLAYER_REQUEST, fetchAllPlayer),
        takeLatest(TYPES.FETCH_PLAYER_ID_REQUEST, fetchPerson),
        takeLatest(TYPES.FETCH_PLAYER_STATS_REQUEST, fetchStats)])
}

export default mySaga
