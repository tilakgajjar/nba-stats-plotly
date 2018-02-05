import { createSelector } from 'reselect'
//selectors

const getBar = (state) => state.playerInfo.statsBar

export const makeGetBarState = () => createSelector(
  getBar,
  (statsBar) => (statsBar)
)

const getStats = (state) => state.playerInfo.stats

export const makeGetStatsState = () => createSelector(
  getStats,
  (stats) => (stats)
)
