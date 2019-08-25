import React from "react";
import './PopupContent.css';
import {convertMindMapModelToRaw, convertRawToMindMapModel, DiagramState} from 'blink-mind-react';
import {downloadFile} from "../utils";
import Popup from 'react-popup';

export function PopupExportContent(props) {

  const exportJSON = () => {
    let model = props.diagramState.mindMapModel;
    const data = convertMindMapModelToRaw(model);
    let json = JSON.stringify(data);
    let url = `data:text/plain,${encodeURIComponent(json)}`;
    downloadFile(url,`${model.getRootItem().getContent()}.json`);
    Popup.close();
  };

  return (
    <div className='popup-content'>
      <ul className='popup-content-list'>
        <li className='popup-content-list-item' onClick={exportJSON}>JSON (.json)</li>
      </ul>
    </div>
  )
}


export function PopupOpenFileContent(props) {
  let {diagramState,onChange} = props;
  const openFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.addEventListener('change',evt => {
      const file = evt.target.files[0];
      const fr = new FileReader();
      fr.onload = evt => {
        const txt = evt.target.result;
        let obj = JSON.parse(txt);
        let model = convertRawToMindMapModel(obj);
        let newDiagramState = DiagramState.setMindMapModel(diagramState,model);
        onChange(newDiagramState);
      };
      fr.readAsText(file);
    });
    input.click();
    Popup.close();
  };

  return (
    <div className='popup-content'>
      <div>
        支持打开以下格式的文件
      </div>
      <ul className='popup-content-list'>
        <li className='popup-content-list-item' >JSON (.json)</li>
      </ul>

      <div>
        <button onClick={openFile}>打开文件</button>
        <button>取消</button>
      </div>
    </div>
  )
}
