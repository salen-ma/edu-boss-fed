<template>
  <div class="menu-create">
    <create-or-edit :is-edit="true" :advertId="advertId" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'MenuCreate',
  components: {
    CreateOrEdit
  },
  props: {
    advertId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {}
  }
})
</script>

<style lang="scss" scoped></style>
