<template>
  <div>
    <mainStats />
  </div>
</template>

<script>
import MainStats from '@/components/csgo/MainStats'
export default {
  // Uncomment. but fix because on refresh the store is not set
  // middleware: 'protected',
  components: {
    MainStats
  }
}
</script>
