<template>
  <teleport to="body">
    <div
      :class="[
        'dialog-wrapper',
        props.visible ? false : 'dialog-visible-hidden',
      ]"
    >
      <div class="dialog-mask"></div>
      <div class="dialog-content">
        <DialogCard
          :title="props.title"
          @cancel="handleCancel"
          @ok="handleSubmit"
        >
          <slot></slot>
        </DialogCard>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import DialogCard from "./dialogCard.vue";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
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
.dialog-visible-hidden {
  display: none;
}

.dialog-wrapper {
  position: fixed;
  left: 0;
  top: 0;
}

.dialog-mask {
  height: 100vh;
  width: 100vw;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
