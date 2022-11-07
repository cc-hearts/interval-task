<template>
  <div class="grid-table">
    <!-- 表格头 -->
    <div class="grid grid-title" :style="styleAttr">
      <template v-for="(item, index) in props.columns">
        <div :class="['grid-title', textAlignAttr]">
          {{ item.title }}
        </div>
      </template>
    </div>
    <!-- 表格内容 -->
    <div class="grid grid-body" :style="styleAttr">
      <template v-for="(item, index) in props.columns">
        <div :class="['grid-rows', textAlignAttr]">
          <template v-for="record in props.dataSource">
            <template v-if="item.slot">
              <slot
                :name="item.slot.name"
                :text="item.field ? record[item.field] : record"
                :record="record"
                :index="index"
              ></slot>
            </template>
            <template v-else>
              {{ record[item.field] || "" }}
            </template>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
interface tableColumns {
  width?: number | string;
  title?: string;
  slot?: { name?: string };
  align?: "left" | "center" | "right";
  [props: string]: any;
}
const props = defineProps({
  columns: { type: Array<tableColumns>, default: [] },
  dataSource: { type: Array<any>, default: [] },
  align: { type: String, default: "left" },
});

const tableWidthAttr = computed(() => {
  return props.columns.reduce((acc, cur) => {
    let width = cur.width;
    const cases = typeof width;
    switch (cases) {
      case "undefined":
      case "number":
        if (!width || width <= 0) {
          // minmax(0,1fr) 防止子元素撑开
          width = "minmax(0,1fr) ";
        } else {
          width = `${width}px`;
        }
        break;
    }
    acc += ` ${width} `;
    return acc;
  }, "");
});
const styleAttr = reactive({
  "grid-template-columns": tableWidthAttr.value,
});

const textAlignAttr = computed(() => {
  switch (props.align) {
    case "left":
      return "";
    case "center":
      return "text-center";
    case "right":
      return "text-right";
  }
});
</script>

<style scoped>
.grid {
  display: grid;
}

.grid-title {
  background-color: #464e5f;
  color: #b5b5c3;
  border-radius: 6px;
  line-height: 36px;
}

.grid-body {
  margin-top: 14px;
  line-height: 1.5;
}

.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
</style>
