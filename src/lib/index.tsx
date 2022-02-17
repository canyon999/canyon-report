import {
  FC,
  useState
} from "react";
import {Spin, Tag} from "antd";
import TreeFileDir from "./components/TreeFileDir";
import TableDetail from "./components/TableDetail";
import EditorDetail from "./components/EditorDetail";
import './i18n/i18'
import './index.css'
import React from "react";
import {calculateLv, percent} from "./util";
import {defaultWatermarks} from "./config";

interface CoverageReportProps {
  fileDetail: any
  fileCoverage: any
  onSelect: any
  watermarks?: any
  treeSummary: any
  loading: boolean
}

const initSelectFile = {
  key: '',
  "statistics": {
    "statements": {
      "total": 0,
      "covered": 0,
      "skipped": 0
    },
    "functions": {
      "total": 0,
      "covered": 0,
      "skipped": 0
    },
    "lines": {
      "total": 0,
      "covered": 0,
      "skipped": 0
    },
    "branches": {
      "total": 0,
      "covered": 0,
      "skipped": 0
    }
  }
}

const CoverageReport: FC<CoverageReportProps> = (props) => {
  const {fileDetail, onSelect, watermarks = defaultWatermarks, treeSummary, fileCoverage,loading} = props
  // 选择的文件路径
  const [selectFile, setSelectFile] = useState<any>(initSelectFile)
  const statusLineColor = calculateLv(percent(selectFile.statistics['statements'].covered, selectFile.statistics['statements'].total), watermarks).color

  function controlSelectFile(val: any) {
    setSelectFile(val)
    onSelect(val)
  }

  return (
    <div className={'coverage-report'}>
      <div className={'tree-file-dir'}>
        <TreeFileDir treeSummary={treeSummary} controlSelectFile={controlSelectFile}/>
      </div>
      <div className={'right-detail'}>
        <div style={{padding: '0 0 0 20px'}}>
          <h2>{selectFile.key}</h2>
          <div style={{display: 'flex'}}>
            {
              Object.keys(selectFile.statistics).map((item, index) => {
                return <div style={{marginRight: '20px'}} key={index}>
                  <span style={{
                    marginRight: '10px',
                    fontWeight: 'bolder'
                  }}>{percent(selectFile.statistics[item].covered, selectFile.statistics[item].total)}%</span>
                  <span style={{marginRight: '10px'}}>{item}</span>
                  <Tag>{selectFile.statistics[item].covered}/{selectFile.statistics[item].total}</Tag>
                </div>
              })
            }
          </div>
          <div style={{height: '10px', marginTop: '20px', backgroundColor: statusLineColor}}/>
        </div>

        <Spin spinning={loading}>
          {
            selectFile.isLeaf ? <div style={{padding: '20px'}}>
                {
                  fileCoverage.path ? <EditorDetail fileDetail={fileDetail}
                                                    fileCoverage={fileCoverage}/> : null
                }
              </div> :
              <div style={{padding: '20px'}}>
                <TableDetail watermarks={watermarks} tableSummary={selectFile}/>
              </div>
          }
        </Spin>
      </div>
    </div>
  );
};

export default CoverageReport
