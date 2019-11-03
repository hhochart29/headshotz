<template>
  <transition name="fade" appear mode="in-out">
    <loader v-if="!appLoaded" />
    <div v-else id="app" class="bg-black-0 flex">
      <sidebar />
      <section class="flex flex-col flex-grow min-h-screen text-white">
        <nuxt class="container mx-auto flex-grow p-5" />
        <z-footer />
      </section>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import Sidebar from '@/components/nav/Sidebar'
import Loader from '@/components/Loader'
import ZFooter from '@/components/Footer'

export default {
  components: {
    Sidebar,
    Loader,
    ZFooter
  },
  computed: {
    ...mapState({
      appLoaded: 'appLoaded'
    })
  },

  async created() {
    const minDelay = 300
    const timeStart = Date.now()
    await this.$store.dispatch('user/getSession')
    const timeToWait = minDelay - (Date.now() - timeStart)

    if (timeToWait > 0) await this.$delay(timeToWait)

    this.$store.commit('setLoaded', true)
  }
}
</script>

<style lang="postcss">
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
}
</style>
