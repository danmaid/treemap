<template>
  <div id="app">
    <dm-treemap :value="sample" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DmTreemap from './components/DmTreemap.vue'

export default Vue.extend({
  name: 'App',
  components: {
    DmTreemap
  },
  data() {
    return {
      sample: {
        children: [
          { text: 'a', value: 10 },
          {
            text: 'b', value: 5, children: [
              { text: 'a', value: 10 },
              { text: 'b', value: 5 },
              { text: 'c', value: 3 },
              { text: 'd', value: 2 },
              { text: 'e', value: 1 }
            ]
          },
          { text: 'c', value: 3 },
          { text: 'd', value: 2 },
          { text: 'e', value: 1 },
          { text: 'f', value: 4 }
        ]
      }
    }
  }
})
</script>
