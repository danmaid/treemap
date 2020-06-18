<template>
  <div class="dm-treemap">
    <div style="color:white;min-height:1em;">{{ value.label }}</div>
    <div ref="child" style="position:relative;flex:1 1 100%;">
      <template v-if="d3t">
        <dm-treemap
          v-for="(child, i) of d3t.children"
          :key="i"
          :value="child.data"
          :width="width"
          :height="height"
          style="position:absolute"
          :style="{ ...getPosition(child), ...getSize(child) }"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Hierarchy } from '../main'
import * as d3 from 'd3-hierarchy'

function treemap<T>(width: number, height: number): d3.TreemapLayout<T> {
  return d3.treemap<T>().tile(d3.treemapBinary).size([width, height])
}

export default Vue.extend({
  name: 'DmTreemap',
  props: {
    value: { type: Object as PropType<Hierarchy>, required: true }
  },
  data(): { d3t?: d3.HierarchyRectangularNode<Hierarchy> } {
    return {
      d3t: undefined
    }
  },
  computed: {
    d3h() {
      const { value } = this
      return d3.hierarchy(value).sum((d) => d.children ? 0 : 1)
    }
  },
  mounted() {
    const { d3h, $refs } = this
    if ($refs.child instanceof Element) {
      const childWidth = $refs.child.clientWidth
      const childHeight = $refs.child.clientHeight
      this.d3t = treemap<Hierarchy>(childWidth, childHeight)(d3h)
    }
  },
  methods: {
    getPosition(rect: d3.HierarchyRectangularNode<Hierarchy>) {
      const { x0, y0 } = rect
      return { top: `${y0}px`, left: `${x0}px` }
    },
    getSize(rect: d3.HierarchyRectangularNode<Hierarchy>) {
      const { x0, x1, y0, y1 } = rect
      const width = `${x1 - x0 - 16 - 1}px`
      const height = `${y1 - y0 - 16 - 1}px`
      return { width, height }
    }
  }
})
</script>

<style scoped>
.dm-treemap {
  border: 1px solid #fff;
  background-color: rgba(0, 0, 255, 0.6);
  display: flex;
  flex-direction: column;
  padding: 8px;
}
</style>
