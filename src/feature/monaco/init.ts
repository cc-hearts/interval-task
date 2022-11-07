/**
 * @author heart
 * @description 创建monaco-editor
 * @Date 2022-11-07
 */
import * as MacroEditor from "monaco-editor";
function createMonacoEditor(
  refs: HTMLElement,
  code: string,
  language = "typescript"
) {
  const model = MacroEditor.editor.create(refs, {
    value: code,
    language,
    theme: 'vs-dark',
    autoIndent: 'full',
    formatOnPaste: true,
    formatOnType: true,
  });
  console.log(model);
  return model;
}

export { createMonacoEditor };

