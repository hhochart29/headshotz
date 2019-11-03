<template>
  <aside
    :class="{ collasped: storeSidebarCollapsed }"
    class="relative h-screen top-0 left-0 z-20 rounded-r-xl flex-shrink-0"
  >
    <div
      class="absolute shadow w-16 h-full py-5 px-3 z-10 flex flex-col bg-black-0"
    >
      <Logo />
      <nav class="flex-grow flex flex-col items-center mt-5">
        <div class="mb-5 relative">
          <transition name="fade" appear>
            <span
              v-if="activeLinkIndex !== -1"
              class="absolute top-0 h-10 w-1 -ml-3 bg-white rounded-r-lg"
              :style="{
                transform: `translateY(calc((100% * ${activeLinkIndex}) + 2.5rem * ${activeLinkIndex /
                  2}))`
              }"
            />
          </transition>

          <nuxt-link
            v-for="(menuItem, index) in menuItems"
            :key="`${menuItem.name}-${index}`"
            :to="{ name: menuItem.to }"
            class="block w-10 mb-5"
          >
            <img
              :src="menuItem.image"
              :alt="menuItem.name"
              class="rounded-lg shadow-lg bg-white p-1"
            />
          </nuxt-link>
        </div>
      </nav>
    </div>

    <sidebar-details />
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import Logo from '@/components/Logo'
import SidebarDetails from '@/components/nav/SidebarDetails'

export default {
  components: {
    Logo,
    SidebarDetails
  },
  data: () => ({
    games: [
      {
        to: 'csgo',
        name: 'CSGO',
        image:
          'https://www.escharts.com/storage/app/uploads/public/594/d3d/5d3/594d3d5d377ea524272878.png'
      }
    ]
  }),
  computed: {
    ...mapState({
      storeSidebarCollapsed: 'sidebarCollapsed'
    }),
    ...mapState('user', {
      userProfile: 'profile'
    }),
    activeLinkIndex() {
      return this.menuItems.findIndex((game) =>
        this.$route.matched.some((route) => route.name === game.to)
      )
    },
    menuItems() {
      return [
        this.userProfile
          ? {
              to: 'profile',
              name: 'Profile',
              image: this.userProfile.avatar
            }
          : {
              to: 'login',
              name: 'Login',
              image:
                'https://lukaspaul.com/persons/image-thumb__41__pfTeam/placeholder-avatar.png'
            },
        ...this.games
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
aside {
  & nav > div > span {
    transition: transform 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
