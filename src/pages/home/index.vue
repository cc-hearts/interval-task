<template>
  <div>
    <Table
      :columns="tableProps.columns"
      :data-source="dataPropsImpl.dataSource"
      align="center"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import Table from "../../components/table/index.vue";
import { intervalTaskColumn } from "./const";
import { getList } from "./service";
import type { taskInterface } from "./type";
const tableProps = reactive({
  columns: intervalTaskColumn,
});
// TODO: make

const dataPropsImpl = reactive<{
  dataSource: Array<taskInterface>;
  total: number;
}>({
  dataSource: [],
  total: 0,
});

onMounted(() => {
  getList().then((res) => {
    const { data } = res;
    if (data) {
      dataPropsImpl.dataSource = data.list.map((val) => {
        return {
          idDelete: val.isDelete === 0 ? "正常" : '停止',
          ...val,
        };
      });
      dataPropsImpl.total = data.total;
    }
  });
});
</script>

<style></style>
