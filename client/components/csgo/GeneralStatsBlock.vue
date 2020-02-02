<template>
  <div class="flex flex-row w-128 text-xl">
    <div class="flex flex-col">
      <span>Time played</span>
      <span>MVP</span>
      <span>Headshot</span>
      <span>Shot accuracy</span>
    </div>
    <div class="flex flex-col pl-8">
      <span>{{ playerStats[0] }}</span>
      <span>{{ playerStats[1] }}</span>
      <span>{{ playerStats[2] }}</span>
      <span>{{ playerStats[3] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playerStats: {
      type: Array,
      require: true,
      default: null
    }
  },
  data: () => ({})
}
</script>
