import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { Handle, Position } from 'reactflow';

import useStore from '../store';

import DragIcon from './DragIcon';
import RefIcon from './RefIcon';

function MindMapNode({ id, data }) {
  const inputRef = useRef(null);
  const updateNodeLabel = useStore(state => state.updateNodeLabel);
  if (!data.label) {
    data.label = '';
  }

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 1);
  }, []);

  useLayoutEffect(() => {
    if (inputRef.current) {
      let charWidth = 9;

      if (data.label.length < 3) {
        charWidth = 12;
      } else if (data.label.length < 14) {
        charWidth = 10;
      } else {
        charWidth = 9;
      }
      inputRef.current.style.width = `${data.label.length * charWidth}px`;
    }
  }, [data.label.length]);

  return (
    <>
      <div className="inputWrapper">
        <div
          className="dragHandle"
          style={{
            backgroundColor: data.color,
            height: 'calc(100% + 12px)',
            marginTop: '-6px',
            width: 25,
            marginLeft: '-11px',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            justifyContent: 'center'
          }}
        >
          <DragIcon />
        </div>
        <input
          value={data.label}
          onChange={evt => updateNodeLabel(id, evt.target.value)}
          className="input"
          ref={inputRef}
        />
        <div
          className="dragHandle"
          style={{
            height: 'calc(100% + 12px)',
            marginTop: '-6px',
            width: 25,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            justifyContent: 'center'
          }}
        >
          <RefIcon />
        </div>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Top} />
    </>
  );
}

export default MindMapNode;
