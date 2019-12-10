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
        'https://steam-auth.herokuapp.com/auth/steam/session',
        {
          credentials: 'include'
        }
      )

      const { session } = await request.json()
      if (session && session.user) commit('setUserProfile', session.user)

      return session && session.user
    } catch (e) {
      console.error('Error while getting session : ', e)
    }
  }
}
