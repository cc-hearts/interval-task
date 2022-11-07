/**
 * @author heart
 * @description 常亮定义
 * @Date 2022-11-03
 */

// 定时任务常量字段
const intervalTaskColumn = [
  { title: "定时任务名称", field: "title" },
  { title: "定时任务描述", field: "description" },
  { title: "创建时间", field: "createTime" },
  { title: "状态", field: "idDelete" },
  { title: "操作", field: "operation", slot: { name: "operation" } },
];

export { intervalTaskColumn };
