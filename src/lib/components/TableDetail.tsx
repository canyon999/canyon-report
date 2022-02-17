import {Progress, Table} from "antd";
import {calculateLv, percent} from "../util";
import {useTranslation} from "react-i18next";
import React from "react";

function getProgressStatus(num: number) {
  if (num > 90) {
    return 'success'
  } else if (num <= 90 && num > 60) {
    return 'normal'
  } else {
    return 'exception'
  }
}


const TableDetail = (props: any) => {
  const {watermarks} = props
  const { t } = useTranslation();




  const testMap = [
    {
      value:'statements',
      label:t('statements')
    },
    {
      value:'branches',
      label:t('branches')
    },
    {
      value:'functions',
      label:t('functions')
    },
    {
      value:'lines',
      label:t('lines')
    }
  ]
  const c:any = []
  testMap.forEach(item=>{
    c.push(        {
      title: item.label,
      dataIndex: 'statistics',
      render(_:any) {
        const {covered, total} = _[item.value]
        const per = percent(covered, total)
        return <div style={{color:calculateLv(per,watermarks).color}}>{`${per}%`}</div>
      },
      colSpan: 2,
    })
    c.push({
      dataIndex: 'statistics',
      render(_:any) {
        const {covered, total} = _[item.value]
        const per = percent(covered, total)
        return <span style={{color: calculateLv(per,watermarks).color}}>{`${covered + '/' + total}`}</span>
      },
      colSpan: 0,
    })
  })

  const columns = [
    {
      title: t('file'),
      dataIndex: 'title',
    },
    {
      title: '',
      dataIndex: 'statistics',
      width: 200,
      render(_:any) {
        const per = percent(_.statements.covered, _.statements.total)
        return <Progress strokeColor={calculateLv(per,watermarks).color} showInfo={false} percent={per}/>
      }
    },
    ...c,
  ];


  return <div>
    <div>
    </div> <Table size={"small"} bordered={true} expandable={{childrenColumnName: 'none'}} dataSource={props.tableSummary.children} columns={columns}/>
  </div>;
}

export default TableDetail
