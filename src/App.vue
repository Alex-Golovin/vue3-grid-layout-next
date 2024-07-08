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
  return true
}
</script>

<template>
  <div class="layout">
    <div id="content">
      <GridLayout
        v-model:layout="testLayout"
        :responsive="responsive"
        :col-num="12"
        :row-height="30"
        :vertical-compact="false"
        :use-css-transforms="true"
        :prevent-collision="preventCollisionCheck"
        @reset-selected="onResetSelected"
        @keypress.esc="onResetSelected"
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
.layout {
  background-color: #eee;
}
.test {
  background-color: #ddd;
}
.droppable-element {
  width: 150px;
  text-align: center;
  background: #fdd;
  border: 1px solid black;
  margin: 10px 0;
  padding: 10px;
}

.grid-item-selected {
  outline: 2px solid blue;
}
</style>
