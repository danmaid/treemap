<template>
  <div id="app">
    <dm-treemap :value="sample" style="width: 1024px; height: 768px;" #default="{ value }">
      <div>{{ value.text }}</div>
    </dm-treemap>
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
          { label: 'a', value: 10 },
          {
            label: 'b', value: 5, children: [
              { label: 'b1', value: 10 },
              { label: 'b2', value: 5 },
              {
                label: 'b3', value: 3, children: [
                  { text: 'b3-1 text', value: 2 },
                  { text: 'b3-2 text', value: 2 },
                  { text: 'b3-3 text', value: 1 }
                ]              },
              { label: 'b4', value: 2 },
              { label: 'b5', value: 1 }
            ]
          },
          {
            label: 'c', value: 3, children: [
              { label: 'c1', value: 10 },
              { label: 'c2', value: 5 },
              { label: 'c3', value: 3 }
            ]
          },
          { label: 'd', value: 2 },
          { label: 'e', value: 1 },
          { label: 'f', value: 4 }
        ]
      }
    }
  }
})
</script>
