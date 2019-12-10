<template>
  <div>
    stats
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // Uncomment. but fix because on refresh the store is not set
  // middleware: 'protected',

  data: () => ({
    stats: undefined
  }),

  computed: {
    ...mapState('user', {
      profile: 'profile'
    })
  },

  async created() {
    const res = await fetch(
      `https://steam-auth.herokuapp.com/csgo/stats/${this.profile.steamid}`,
      { credentials: 'include' }
    )
    const stats = await res.json()
    console.log('Stats for user ', this.profile.personaname, ' : ', stats)
  }
}
</script>
