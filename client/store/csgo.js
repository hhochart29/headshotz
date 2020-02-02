export const state = () => ({
  stats: undefined
})

export const getters = {
  playerStatsGames: (state) => [
    'W / L',
    (state.stats.wins.value / state.stats.losses.value).toFixed(2),
    Math.round(50 * (state.stats.wins.value / state.stats.losses.value)),
    `Wins : ${state.stats.wins.value}`,
    `Losses : ${state.stats.losses.value}`
  ],
  playerStatsKD: (state) => [
    'K / D',
    state.stats.kd.displayValue,
    Math.round(50 * state.stats.kd.displayValue),
    `Kills : ${state.stats.kills.value}`,
    `Deaths : ${state.stats.deaths.value}`
  ],
  playerStatsGeneral: (state) => [
    state.stats.timePlayed.displayValue,
    `${state.stats.mvp.value} times`,
    state.stats.headshotPct.displayValue,
    state.stats.shotsAccuracy.displayValue
  ]
}

export const mutations = {
  setStats(state, stats) {
    state.stats = stats
  }
}

export const actions = {
  async getStats({ commit, rootState }, steamId) {
    const id = steamId || rootState.user.profile.steamid

    const res = await fetch(`${process.env.API_URL}/csgo/stats/${id}`, {
      credentials: 'include'
    })

    const { results } = await res.json()

    const stats = results.data.segments[0].stats
    console.log(stats)
    commit('setStats', stats)
  }
}
