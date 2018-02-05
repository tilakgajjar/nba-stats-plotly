import { createSelector } from 'reselect'
//selectors

const getPlayerList = (state) => state.playerInfo.playerList

export const makeGetPlayersListState = () => createSelector(
  getPlayerList,
  (playerList) => (playerList)
)
