<template>
  <div>
    <span class="flex text-3xl">General stat</span>
    <div class="flex flex-row items-center">
      <generalStatsBlock :player-stats="playerStatsGeneral" />
      <!-- <svg width="1" height="275">
        <rect width="1" height="275" style="fill:rgb(255,255,255)" />
      </svg> -->
      <statsBlock :player-stats="playerStatsKD" :icon="playerStatsKDIcon" />
      <!-- <svg width="1" height="275">
        <rect width="1" height="275" style="fill:rgb(255,255,255)" />
      </svg> -->
      <statsBlock
        :player-stats="playerStatsGames"
        :icon="playerStatsGamesIcon"
      />
    </div>
  </div>
</template>

<script>
import GeneralStatsBlock from '@/components/csgo/GeneralStatsBlock'
import StatsBlock from '@/components/csgo/StatsBlock'
import { mapGetters } from 'vuex'
export default {
  components: {
    GeneralStatsBlock,
    StatsBlock
  },
  data: () => ({
    playerStatsKDIcon: 'shuffle',
    playerStatsGamesIcon: 'cup'
  }),
  computed: {
    ...mapGetters('csgo', {
      playerStatsKD: 'playerStatsKD',
      playerStatsGames: 'playerStatsGames',
      playerStatsGeneral: 'playerStatsGeneral'
    })
  }
}
</script>
