import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import monacoEditorPlugins from "vite-plugin-monaco-editor";
export default defineConfig({
  // @ts-ignore
  plugins: [vue(), monacoEditorPlugins.default({})],
});
