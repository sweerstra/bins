import React from 'react';
import Editor from '../components/Editor/Editor';
import { useKeyDown } from '../hooks/event';
import { useSelectedBin } from '../context/SelectedBin';

function EditorContainer({ onRun }) {
  const { selectedBin, setSelectedBin } = useSelectedBin();

  useKeyDown(
    e => e.ctrlKey && e.key === 'Enter',
    true,
    () => runCode()
  );

  function runCode() {
    const { code } = selectedBin;
    if (code.trim()) {
      onRun(code);
    }
  }

  function onCodeChange(code) {
    setSelectedBin({ ...selectedBin, code });
  }

  return (
    <Editor
      code={selectedBin.code}
      onCodeChange={onCodeChange}/>
  );
}

export default EditorContainer;
