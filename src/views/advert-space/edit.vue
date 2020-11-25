<template>
  <div class="advert-space-create">
    <create-or-edit :is-edit="true" :spaceId="spaceId" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'AdvertSpaceCreate',
  components: {
    CreateOrEdit
  },
  props: {
    spaceId: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {}
  }
})
</script>

<style lang="scss" scoped></style>
