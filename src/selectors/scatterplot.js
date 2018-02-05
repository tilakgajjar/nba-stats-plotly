import { createSelector } from 'reselect'
//selectors

const getstatsScatterX = (state) => state.playerInfo.statsScatterX

export const makeGetScatterXState = () => createSelector(
  getstatsScatterX,
  (statsScatterX) => (statsScatterX)
)
const getstatsScatterY = (state) => state.playerInfo.statsScatterY

export const makeGetScatterYState = () => createSelector(
  getstatsScatterY,
  (statsScatterY) => (statsScatterY)
)

const getstats = (state) => state.playerInfo.stats

export const makeGetStats = () => createSelector(
  [ getstats ],
  (stats) => (stats)
)
