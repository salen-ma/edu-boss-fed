<template>
  <div class="advert-space">
    <space-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SpaceList from './components/SpaceList.vue'

export default Vue.extend({
  name: 'AdvertSpaceIndex',
  components: {
    SpaceList
  }
})
</script>

<style lang="scss" scoped></style>
