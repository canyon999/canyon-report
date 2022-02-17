import {useEffect} from "react";

function init(content) {
  let rows1 = ['']
  let index1 = 0
  for (let i = 0; i < content.length; i++) {
    if (content[i] ==='\n'){
      index1+=1
      rows1.push('')
    } else {
      rows1[index1] +=content[i]
    }
  }
  const max = Math.max(...rows1.map(item=>item.length))
  const maxIndex = rows1.map(item=>item.length).findIndex(item=>item===max)
  // @ts-ignore
  const unitWidth = (document.getElementsByClassName(' CodeMirror-line')[maxIndex]?.children[0].offsetWidth || 0) / max
  // @ts-ignore
  const unitHeight = document.getElementsByClassName('CodeMirror-line')[0].offsetHeight
  // @ts-ignore
  const positionLeft = document.getElementsByClassName('CodeMirror-linenumber')[0].offsetWidth + 4
  const positionTop = 4

  return {
    unitWidth,unitHeight,positionLeft,positionTop
  }
}

const Mask = ({data,edMaxWidth,rows}) => {
  const content = data.fileDetail.content
  // 初始化
  const {
    unitWidth,unitHeight,positionLeft,positionTop
  } = init(content)
  useEffect(()=>{
    if (data.fileCoverage.path){
      const file = data
      const originalMarksFn = []
      const originalMarksStatement = []
      const fileCoverage = file.fileCoverage
      const fnStats = fileCoverage.f;
      const fnMeta = fileCoverage.fnMap;
      if (!fnStats) {
        return;
      }
      Object.entries(fnStats).forEach(([fName, count]:any) => {
        const meta = fnMeta[fName];
        const type = count > 0 ? 'yes' : 'no';
        const decl = meta.decl || meta.loc;
        const startCol = decl.start.column;
        let endCol = decl.end.column + 1;
        const startLine = decl.start.line - 1;
        const endLine = decl.end.line - 1;
        if (type === 'no'){
          originalMarksFn.push({start:[startCol,startLine],end:[endCol,endLine]})
        }
      });
      // console.log(originalMarks,'m')
      // 语句标记
      const statementStats = fileCoverage.s;
      const statementMeta = fileCoverage.statementMap;
      Object.entries(statementStats).forEach(([stName, count]:any) => {
        const meta = statementMeta[stName];
        const type = count > 0 ? 'yes' : 'no';
        const startCol = meta.start.column;
        let endCol = meta.end.column + 1;
        const startLine = meta.start.line - 1;
        const endLine = meta.end.line - 1;
        let text;
        if (type === 'no') {
          originalMarksStatement.push({start:[startCol,startLine],end:[endCol,endLine]})
        }
      });
      function convertToRectangularDataFormatOfSketchpad(content,marks) {
        // 1.生成rows
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
        const newMarks = []
        for (let mark = 0; mark < marks.length; mark++) {
          if (marks[mark].start[1]<marks[mark].end[1]){
            // 开始
            const startX = marks[mark].start[0]
            const startY = marks[mark].start[1]
            const startRowLen = rows[startY].length - 1
            newMarks.push({
              start: [startX,startY],
              end: [startRowLen,startY]
            })
            // 结束
            const endX = marks[mark].end[0]
            const endY = marks[mark].end[1]
            newMarks.push({
              start: [0,endY],
              end: [endX,endY]
            })
            for (let i = 0; i < (endY - startY) - 1; i++) {
              // 找到第Y行
              const Y = startY + (i + 1)
              const mRowLen = rows[Y].length
              newMarks.push({
                start: [0,Y],
                end: [mRowLen,Y]
              })
            }
          } else {
            newMarks.push(marks[mark])
          }
        }
        return newMarks
      }
      // 参数 content
      let marks = originalMarksFn
      var canvas:any = document.getElementById('canvas');
      console.log(canvas,'canvas')
      var ctx = canvas.getContext('2d');
      canvas.width = edMaxWidth * unitWidth;
      canvas.height = rows.length * unitHeight;
      // canvas.style.border = '1px dashed #999';
      const newMarks1 = convertToRectangularDataFormatOfSketchpad(content,originalMarksStatement)
      for (let i = 0; i < newMarks1.length; i++) {
        ctx.fillStyle = 'pink';
        ctx.fillRect((newMarks1[i].start[0]) * unitWidth,newMarks1[i].start[1] * unitHeight,unitWidth * (newMarks1[i].end[0] - newMarks1[i].start[0]),unitHeight);
      }

      const newMarks = convertToRectangularDataFormatOfSketchpad(content,marks)
      for (let i = 0; i < newMarks.length; i++) {
        ctx.fillStyle = 'red';
        ctx.fillRect((newMarks[i].start[0]) * unitWidth,newMarks[i].start[1] * unitHeight,unitWidth * (newMarks[i].end[0] - newMarks[i].start[0]),unitHeight);
      }
    }
  },[data.fileCoverage])
  return <div className={'mark'} style={{left:positionLeft+'px',top:positionTop+'px'}}>
    <canvas id={'canvas'} style={{opacity:'1'}}>
      你的浏览器不支持canvas，请升级浏览器
    </canvas>
  </div>
}

export default Mask
