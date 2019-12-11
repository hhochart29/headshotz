export const state = () => ({
  stats: undefined
})

export const getters = {}

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
    commit('setStats', stats)
  }
}
