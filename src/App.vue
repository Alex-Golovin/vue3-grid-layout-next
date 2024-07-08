<script setup lang="ts">
import {ref, computed, reactive, watch, onMounted, nextTick, onUnmounted} from "vue"
import {testData} from "./test"

import GridLayout from "./components/Grid/GridLayout.vue"
import GridItem from "./components/Grid/GridItem.vue"
let testLayout = ref(testData)

const responsive = ref<boolean>(true)

function onResetSelected() {
  testLayout.value.forEach(item => {
    if (item.selected) {
      item.selected = false
    }
  })
}

const selectedItems = computed(() => {
  return testLayout.value.filter(item => item.selected).map(item => item.i)
})

function handleEscape(event: KeyboardEvent) {
  if (event.key === "Escape") {
    onResetSelected()
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleEscape)
})

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape)
})

// @ts-ignore
function preventCollisionCheck({layout, layoutItem}) {
  // console.log('preventCollisionCheck', layout, layoutItem)
  return false
}
</script>

<template>
  <div class="layout">
    <div id="content">
      <GridLayout
        :layout.sync="testLayout"
        :col-num="12"
        :keep-aspect-ratio="true"
        :is-draggable="true"
        :is-resizable="true"
        :vertical-compact="false"
        :prevent-collision="preventCollisionCheck"
        :use-css-transforms="true"
        @reset-selected="onResetSelected"
      >
        <grid-item
          v-for="item in testLayout"
          :key="item.i"
          class="test"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :selected="item.selected"
          :selected-items="selectedItems"
          :min-h="3"
          :min-w="3"
          :static="item.static"
        >
          <!--<custom-drag-element :text="item.i"></custom-drag-element>-->
          <div>
            <input v-model="item.selected" type="checkbox" />
            <span>{{ item.i }}</span>
          </div>
          <!--<button @click="clicked">CLICK ME!</button>-->
        </grid-item>
      </GridLayout>
    </div>
  </div>
</template>

<style scoped>
.vue-grid-layout {
  background: #eee;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
}

.vue-grid-item .resizing {
  opacity: 0.9;
}

.vue-grid-item .static {
  background: #cce;
}

.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}

.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}

.vue-grid-item .minMax {
  font-size: 12px;
}

.vue-grid-item .add {
  cursor: pointer;
}

.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}

.grid-item-selected {
  outline: 2px solid blue !important;
}
</style>