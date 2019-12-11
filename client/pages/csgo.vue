<template>
  <nuxt />
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch('csgo/getStats')
  }
}
</script>
