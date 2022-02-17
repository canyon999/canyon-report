import { Tree } from 'antd';
import React from 'react';
import {useEffect, useState} from "react";
const {DirectoryTree} = Tree
const TreeFileDir = (props:any) => {
  const [treeData,setTreeData] = useState<any>([])
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
    props.controlSelectFile(info.node)
  };
  const onCheck:any = (checkedKeys: React.Key[], info: any) => {
    console.log('onCheck', checkedKeys, info);
  };
  useEffect(()=>{
    setTreeData(props.treeSummary)
  },[props.treeSummary])
  return (
    treeData.length>0?
    <DirectoryTree
      defaultSelectedKeys={[treeData[0].key]}
      defaultExpandedKeys={[treeData[0].key]}
      onSelect={onSelect}
      treeData={treeData}
    />
      :null
  );
};
export default TreeFileDir
