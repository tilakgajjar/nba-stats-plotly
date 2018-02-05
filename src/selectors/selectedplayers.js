import { createSelector } from 'reselect'
//selectors

const getPlayerStats = (state) => state.playerInfo.stats

export const makeGetPlayersStatsState = () => createSelector(
  getPlayerStats,
  (stats) => (stats)
)
