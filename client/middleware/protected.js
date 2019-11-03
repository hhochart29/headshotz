export default function({ store, route, redirect }) {
  if (!store.getters['user/isLoggedIn'])
    redirect({ name: route.fullPath.split('/')[1] })
}
