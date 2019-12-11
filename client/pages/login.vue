<template>
  <a :href="loginURL">
    <span>
      Login with steam
    </span>
    <img
      src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_02.png"
      alt="Steam Login"
    />
  </a>
</template>

<script>
export default {
  computed: {
    loginURL() {
      return `${process.env.API_URL}/auth/steam/login`
    }
  }
}
</script>
