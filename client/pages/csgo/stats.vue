<template>
  <div>
    <!-- {{ JSON.stringify(stats) }} -->
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
    const stats = await fetch(
      `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${this.profile.steamid}`,
      {
        method: 'GET',
        headers: {
          'TRN-Api-Key': process.env.trackerGG
        }
      }
    )
    console.log(stats)
  }
}
</script>
