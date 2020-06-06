<template>
  <div class="dm-treemap">
    <svg v-if="treeMap" :width="width" :height="height">
      <g v-for="(d, i) of treeMap.children" :key="i" :fill="getColor(i)">
        <rect
          style="stroke-width:1; stroke:white"
          :x="d.x0"
          :y="d.y0"
          :width="d.x1 - d.x0"
          :height="d.y1 - d.y0"
        />
        <text fill="white" :x="d.x0 + 10" :y="d.y0 + 20">{{ d.data.text }} {{ d.value }}</text>
        <g v-for="(c, j) of d.children" :key="`${i}-${j}`" fill="transparent">
          <rect
            style="stroke-width:1; stroke:white; opacity:0.4;"
            :x="c.x0"
            :y="c.y0"
            :width="c.x1 - c.x0"
            :height="c.y1 - c.y0"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import * as d3 from 'd3-hierarchy'
import { schemeCategory10 } from 'd3-scale-chromatic'

export interface ValueType {
  children?: ValueType;
  text?: string;
}

export default Vue.extend({
  props: {
    value: {
      type: Object as PropType<ValueType>,
      required: true
    },
    width: {
      type: Number as PropType<number>,
      default: 1024
    },
    height: {
      type: Number as PropType<number>,
      default: 768
    },
    colors: {
      type: Array as PropType<string[]>,
      default: () => schemeCategory10
    }
  },
  data(): { treeMap?: d3.HierarchyRectangularNode<unknown> } {
    return {
      treeMap: undefined
    }
  },
  mounted() {
    this.treeMap = this.calculate()
  },
  methods: {
    calculate(v?: ValueType) {
      const { width, height } = this
      const value = v || this.value

      const d3h = d3.hierarchy(value)
        .sum((d) => d.children ? 0 : 1)

      const calculator = d3.treemap()
        .tile(d3.treemapBinary)
        .size([width, height])

      return calculator(d3h)
    },
    getColor(i: number) {
      const { colors } = this
      return colors[i % colors.length]
    }
  }
})
</script>
