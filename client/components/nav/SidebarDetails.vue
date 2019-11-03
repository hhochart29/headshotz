<template>
  <div
    class="sidebar-details h-full ml-16 py-16 px-10 z-0 rounded-r-xl text-white w-128 shadow bg-black-100 bg-no-repeat bg-cover bg-center"
    :class="{ closed: !sidebarIsOpen }"
    :style="{ backgroundImage: `url(${menuHeader})` }"
  >
    <div class="absolute h-full right-0 top-0 flex items-center w-8 p-2">
      <span
        class="arrow-toggle relative cursor-pointer w-8 h-8"
        :class="{ inverted: !sidebarIsOpen }"
        @click.prevent="toggleSidebar"
      >
        <i
          class="lni-chevron-left absolute top-0 left-0 w-full h-full leading-loose text-xs"
          style="margin-left: -3px;"
        />
        <i
          class="lni-chevron-left absolute top-0 left-0 w-full h-full leading-loose text-xs"
          style="margin-left: 3px;"
        />
      </span>
    </div>

    <div class="sidebar-content">
      <div v-if="userProfile" class="flex wrap justify-between items-center">
        <div class="flex items-center px-2 py-2 flex-grow-0">
          <img
            :src="userProfile.avatarmedium"
            alt="user avatar"
            class="rounded-full shadow w-10"
          />
          <span class="px-2 font-bold font-sans">
            {{ userProfile.personaname }}
          </span>
        </div>

        <a
          href="https://steam-auth.herokuapp.com/steam/logout"
          class="px-3 py-2 flex-grow-0"
        >
          <i class="lni-exit font-bold" />
        </a>
      </div>

      <div class="sub-menu relative mt-10 p-3">
        <div
          v-for="(menuItem, index) in menuItems"
          :key="`${menuItem.name}-${index}`"
          class="flex items-center relative"
        >
          <transition @enter="enter" @leave="leave">
            <div
              v-if="index === 0 && activeLinkIndex !== -1"
              class="active-menu w-full h-full absolute top-0 left-0 rounded-full"
              :style="{
                transform: `translateY(calc(100% * ${activeLinkIndex}))`
              }"
            />
          </transition>
          <nuxt-link :to="{ name: menuItem.to }" class="p-5 w-full flex">
            <i
              :class="`lni-${menuItem.icon} mr-3 text-xl relative text-white`"
            />
            <span class="uppercase text-sm relative text-white">
              {{ menuItem.name }}
            </span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sidebarData from './data'
import { mapState, mapGetters } from 'vuex'
export default {
  data: () => ({
    sidebarIsOpen: true,
    sidebarData: undefined,
    oldActiveLinkIndex: undefined
  }),
  computed: {
    ...mapState('user', {
      userProfile: 'profile'
    }),
    ...mapGetters('user', {
      isLoggedIn: 'isLoggedIn'
    }),
    menuItems() {
      if (!this.sidebarData) return
      return this.sidebarData.menuItems
    },
    menuHeader() {
      if (!this.sidebarData || !this.sidebarData.image) return
      return this.sidebarData.image
    },
    activeLinkIndex() {
      if (!this.sidebarData) return
      return this.sidebarData.menuItems.findIndex(
        (game) => game.to === this.$route.name
      )
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        const parentPageName = route.fullPath.split('/')[1]
        if (!parentPageName) return
        this.sidebarData = sidebarData[parentPageName]
      }
    }
  },
  methods: {
    async enter(el, done) {
      el.animate(
        [
          {
            opacity: 0,
            transform: `translateY(calc(100% * ${this.activeLinkIndex})) translateX(25%)`
          },
          {
            opacity: 1,
            transform: `translateY(calc(100% * ${this.activeLinkIndex})) translateX(16%)`
          },
          {
            opacity: 1,
            transform: `translateY(calc(100% * ${this.activeLinkIndex})) translateX(8%)`
          },
          {
            opacity: 1,
            transform: `translateY(calc(100% * ${this.activeLinkIndex})) translateX(0%)`
          }
        ],
        {
          duration: 300,
          easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)'
        }
      )
      await this.$delay(300)
      done()
    },
    async leave(el, done) {
      el.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 300,
        easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)'
      })
      await this.$delay(300)
      done()
    },
    toggleSidebar() {
      this.sidebarIsOpen = !this.sidebarIsOpen
    }
  }
}
</script>

<style lang="postcss" scoped>
.active-menu {
  transition: transform 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  background: theme('colors.white');
}

.nuxt-link-exact-active {
  & span,
  & > i {
    @apply text-black-0;
  }
}
.sub-menu > div {
  & span,
  & i {
    transition: color 300ms ease-in-out;
  }
}

.sidebar-details {
  transition: transform 600ms ease-in-out, width 600ms ease-in-out,
    padding-left 600ms ease-in-out;
  transition-delay: 100ms;
  background-blend-mode: luminosity;
  background-color: theme('colors.black.100');

  & > .sidebar-content {
    transition: opacity 300ms ease-in-out;
    transition-delay: 600ms;
  }
  &.closed {
    transform: translateX(calc(-100% + theme(spacing.10)));
    width: 0px;
    padding-left: 0px;
    transition-delay: 0s;
    & > .sidebar-content {
      transition-delay: 0s;
      opacity: 0;
    }
  }
}

span.arrow-toggle {
  & i {
    height: 2em;
    transition: transform 0.4s ease-in-out;
  }

  &.inverted i {
    transform: rotateZ(-180deg);
  }
}
</style>
