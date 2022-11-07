<template>
  <div class="card-wrapper">
    <div class="card-title-wrapper">
      <!-- title -->
      {{ props.title }}
    </div>
    <div class="card-body">
      <slot></slot>
    </div>

    <div class="card-footer">
      <slot name="footer">
        <Button @click="handleCancel">取消</Button>
        <Button @click="handleSubmit">确定</Button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "../button/index.vue";
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

const emitsImpl = defineEmits<{
  (event: "cancel"): void;
  (event: "ok"): void;
}>();

function handleCancel() {
  emitsImpl("cancel");
}
function handleSubmit() {
  emitsImpl("ok");
}
</script>

<style scoped>
.card-wrapper {
  /*  */
  position: absolute;
  left: 50%;
  width: 50vw;
  background-color: var(--background-color-scheme);
  top: 10vh;
  overflow: auto;
  transform: translate(50%);
}

.card-title-wrapper {
  height: 44px;
  line-height: 44px;
  padding: 0 12px;
}

.card-body {
  padding: 6px;
}

.card-footer {
  text-align: right;
  margin: 6px 12px 12px 0;
}
.card-footer button:nth-child(1) {
  margin: 0 12px;
}
</style>
