<template>
  <div>
    <Table
      :columns="tableProps.columns"
      :data-source="dataPropsImpl.dataSource"
      align="center"
    >
      <template v-slot:operation="data">
        <a class="cursor-operation" @click="handleShowParams(data)">请求参数</a>
      </template>
    </Table>
    <Dialog
      :visible="dialogProps.visible"
      @cancel="handleCancelDialog"
      :title="dialogProps.title"
    >
      <div ref="codeRef" style="width: 100%; min-height: 240px;"></div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from "vue";
import Table from "../../components/table/index.vue";
import { intervalTaskColumn } from "./const";
import { createMonacoEditor } from "../../feature/monaco/init";
import { getList } from "./service";
import type { taskInterface } from "./type";
import Dialog from "../../components/dialog/dialog.vue";
import type { editor } from "monaco-editor";
const tableProps = reactive({
  columns: intervalTaskColumn,
});

const dialogProps = reactive({
  visible: false,
  title: "编辑请求体参数",
});

const codeRef = ref<HTMLElement | null>(null);

let codeImpl: editor.IStandaloneCodeEditor | null;
const dataPropsImpl = reactive<{
  dataSource: Array<taskInterface>;
  total: number;
}>({
  dataSource: [],
  total: 0,
});

function handleCancelDialog() {
  dialogProps.visible = false;
}

function handleShowParams(data: any) {
  const { params } = data.record;
  dialogProps.visible = true;
  nextTick(() => {
    if (codeRef.value && codeImpl === void 0) {
      codeImpl = createMonacoEditor(
        codeRef.value,
        JSON.stringify(JSON.parse(params), null, 2),
        "json"
      );
    } else {
      codeImpl?.setValue(JSON.stringify(JSON.parse(params), null, 2));
    }
  });
}

onMounted(() => {
  getList().then((res) => {
    const { data } = res;
    if (data) {
      dataPropsImpl.dataSource = data.list.map((val) => {
        return {
          idDelete: val.isDelete === 0 ? "正常" : "停止",
          ...val,
        };
      });
      dataPropsImpl.total = data.total;
    }
  });
});
</script>

<style scoped>
.cursor-operation {
  cursor: pointer;
}
</style>
