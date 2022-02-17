import {FC, useEffect, useState} from "react";
import React from 'react';
import {LeftLine} from "./LeftLine";
import Mask from "./Mask";
import {getDecode} from "../util";

interface IProps {
  fileCoverage:any
  fileDetail:any
}

const fileMap = [
  {
    postfix:'tsx',
    name:'jsx',
    typescript:true
  },
  {
    postfix:'ts',
    name:'javascript',
    typescript:true
  },
  {
    postfix:'js',
    name:'javascript',
    typescript:false
  },
  {
    postfix:'jsx',
    name:'jsx',
    typescript:false
  },
  {
    postfix:'vue',
    name:'vue',
    typescript:false
  }
]

function CoreFn({fileCoverage,fileDetail} ) {
  const {content} = fileDetail
  let rows = ['']
  let index = 0
  for (let i = 0; i < content.length; i++) {
    if (content[i] ==='\n'){
      index+=1
      rows.push('')
    } else {
      rows[index] +=content[i]
    }
  }
  const maxWidth = JSON.parse(JSON.stringify(rows)).sort((a,b)=>-(a.length-b.length))[0].length


  // console.log(fileCoverage,'fileCoverage')


  // 获取行覆盖率
  function getLineCoverage(data:any) {
    const statementMap = data.statementMap;
    const statements = data.s;
    const lineMap = Object.create(null);
    Object.entries(statements).forEach(([st, count]:any) => {
      if (!statementMap[st]) {
        return;
      }
      const { line } = statementMap[st].start;
      const prevVal = lineMap[line];
      if (prevVal === undefined || prevVal < count) {
        lineMap[line] = count;
      }
    });
    return lineMap;
  }
  // 计算行
  const lineStats = getLineCoverage(fileCoverage)
  if (!lineStats) {
    return;
  }
  const arr:any = []
  Object.entries(lineStats).forEach(([lineNumber, count]) => {
    arr.push({lineNumber,count})
    // 这边计算出了行的次数！！！！！！
  });
  return {
    times:arr,
    rows,
    maxWidth:maxWidth,
    maskCanvasProps:{
      width:8.64 * maxWidth,
      height: rows.length * 22
    }
  }
}

const EditorDetail:FC<IProps> = (props) => {
  const {fileCoverage,fileDetail} = props
  const {maxWidth,maskCanvasProps,rows,times} = CoreFn({fileCoverage,fileDetail})
  useEffect(() => {
    if (fileCoverage.path){
      const postfix = fileDetail?.fileName?.split('.').reverse()[0]
      const fileMapFind:any = fileMap.find(item=>item.postfix === postfix)
      const el:any = document.querySelector('#codemirror-editor')
      el.innerHTML = ''
      let off = el.innerHTML === ''
      if (off) {
        // @ts-ignore
        const myCodeMirror:any = CodeMirror(el, {
          value: fileDetail.content,
          mode: {
            name: fileMapFind.name,
            typescript: fileMapFind.typescript,
          },
          lineNumbers: true,
          theme: 'idea'
        });
        myCodeMirror.setSize('auto', 'auto');
        myCodeMirror.setOption("readOnly", 'nocursor');
      }
    }
  }, [fileCoverage])

  return <div>
    <div style={{display:"flex"}}>
      <div style={{backgroundColor:'rgb(234,234,234)'}}>
        {
          <LeftLine size={rows.length} times={times}/>
        }
      </div>
      <div style={{position:'relative'}}>
        <div id={'codemirror-editor'}/>
        <Mask canvasProps={{width:maskCanvasProps.width,height:maskCanvasProps.height}} data={{fileDetail,fileCoverage}}/>
      </div>
    </div>
  </div>
}

export default EditorDetail
