export const state = () => ({
  profile: undefined
})

export const getters = {
  isLoggedIn: (state) => !!state.profile
}

export const mutations = {
  setUserProfile(state, profile) {
    state.profile = profile || undefined
  }
}

export const actions = {
  async getSession({ commit }) {
    try {
      const request = await fetch(
        'https://steam-auth.herokuapp.com/steam/session',
        {
          credentials: 'include'
        }
      )

      const { req } = await request.json()
      if (req && req.user) commit('setUserProfile', req.user)

      return req && req.user
    } catch (e) {
      console.error('Error while getting session : ', e)
    }
  }
}
