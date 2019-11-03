export const state = () => ({
  sidebarCollapsed: false,
  appLoaded: true
})

export const mutations = {
  setSidebarCollapsed(state) {
    state.sidebarCollapsed = !state.sidebarCollapsed
  },
  setLoaded(state, val) {
    state.appLoaded = val
  }
}

export const actions = {
  nuxtServerInit({ commit }) {
    commit('setLoaded', false)
  }
}
