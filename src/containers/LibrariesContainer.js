import React, { useState } from 'react';
import Modal from '../components/Modals/Modal';
import Libraries from '../components/Libraries/Libraries';
import { libraries as presetLibraries } from '../constants/presets';

export default function LibrariesContainer({ isVisible, onHide }) {
  const [libraries, setLibraries] = useState([]);

  function addLibrary(library) {
    setLibraries([...libraries, library]);
    appendScriptToDOM(library.url);
  }

  function removeLibrary(library) {
    setLibraries(libraries.filter(lib => lib.name !== library.name));
    removeScriptFromDOM(library.url);
  }

  function appendScriptToDOM(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }

  function removeScriptFromDOM(src) {
    document.querySelectorAll('script').forEach(script => {
      if (script.src === src) {
        script.parentNode.removeChild(script);
      }
    });
  }

  return (
    <Modal
      isOpen={isVisible}
      title="Libraries"
      onClose={onHide}
      data-testid="libraries-modal">
      <Libraries
        libraries={libraries}
        presets={presetLibraries}
        onAdd={addLibrary}
        onRemove={removeLibrary}/>
    </Modal>
  );
}
