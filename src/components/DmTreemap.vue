<template>
  <div
    class="dm-treemap"
    :class="{ selected }"
    :style="{ ...size, ...position, ...override }"
    @click="toggle"
    @transitionend="calc"
  >
    <div class="label">{{ value.label }}</div>
    <slot :value="value"></slot>
    <div ref="child" style="position:relative;flex:1 1 100%;">
      <template v-if="d3t">
        <dm-treemap
          v-for="(child, i) of d3t.children"
          :key="i"
          :value="child.data"
          style="position:absolute"
          :size="getSize(child)"
          :position="getPosition(child)"
        >
          <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope" />
          </template>
        </dm-treemap>
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

export type Size = {
  width?: string;
  height?: string;
}
export type Position = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export default Vue.extend({
  name: 'DmTreemap',
  props: {
    value: { type: Object as PropType<Hierarchy>, required: true },
    size: { type: Object as PropType<Size>, default() { return {} } },
    position: { type: Object as PropType<Position>, default() { return {} } }
  },
  data(): { d3t?: d3.HierarchyRectangularNode<Hierarchy>; selected: boolean } {
    return {
      d3t: undefined,
      selected: false
    }
  },
  computed: {
    d3h() {
      const { value } = this
      return d3.hierarchy(value).sum((d) => d.children ? 0 : 1)
    },
    override() {
      return this.selected
        ? { width: '100%', height: '100%', top: 0, left: 0 }
        : undefined
    }
  },
  watch: {
    value() { this.calc() }
  },
  mounted() {
    this.calc()
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
    },
    toggle() { this.selected = !this.selected },
    calc() {
      const { d3h, $refs } = this
      if ($refs.child instanceof Element) {
        const childWidth = $refs.child.clientWidth
        const childHeight = $refs.child.clientHeight
        this.d3t = treemap<Hierarchy>(childWidth, childHeight)(d3h)
      }
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
  cursor: pointer;
  transition: 0.5s;
}
.label {
  color: white;
  background-color: rgba(0, 0, 255, 0.6);
  min-height: 1em;
  margin-left: -8px;
  margin-top: -8px;
  margin-right: -8px;
  padding: 4px 8px;
}
.selected {
  background-color: rgba(255, 0, 128, 1);
  z-index: 100;
}
</style>
