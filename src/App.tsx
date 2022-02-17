import CoverageReport from "./lib";
import {useEffect, useState} from "react";
import {CoverageService} from "./services/CoverageService";
import {getDecode} from "./lib/util";

const App = () => {
  const [treeSummary,setTreeSummary] = useState<any>([])
  const [loading,setLoading] = useState<any>(false)
  const [fileDetail,setFileDetail] = useState<any>({
    fileName:'.js',
    content:''
  })
  const [fileCoverage,setFileCoverage] = useState<any>({})
  useEffect(()=>{
    CoverageService.retrieveACoverageForAProject({
    }).then(res=>{
      setTreeSummary(res)
    })
  },[])
  function onSelect(val:any) {
    if (!val.isLeaf){
      return
    }
    const filePath = encodeURIComponent(val.fullPath)
    const params = {
      filePath,
    }
    setLoading(true)
    CoverageService.fileContent(params).then(res=>{
      setFileDetail({
        fileName:res.fileDetail.file_name,
        content:getDecode(res.fileDetail.content)
      })
      setFileCoverage(res.fileCoverage)
      setLoading(false)
    })
  }
  return (
    <div style={{backgroundColor:'#fff',padding:'20px'}}>
      <CoverageReport
        loading={loading}
        treeSummary={treeSummary}
        fileDetail={fileDetail}
        fileCoverage={fileCoverage}
        onSelect={(val:any)=>{onSelect(val)}}/>
    </div>
  )
};
export default App;
