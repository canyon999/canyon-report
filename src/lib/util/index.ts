import {lvMap} from "../config";

export function percent(covered:any, total:any) {
  let tmp;
  if (total > 0) {
    tmp = (1000 * 100 * covered) / total;
    return Math.floor(tmp / 10) / 100;
  } else {
    return 100.0;
  }
};



export function calculateLv(value,watermarks) {
  if (!watermarks) {
    return lvMap.find(item => item.status === 'unknown');
  }
  if (value < watermarks[0]) {
    return lvMap.find(item => item.status === 'low');
  }
  if (value >= watermarks[1]) {
    return lvMap.find(item => item.status === 'high');
  }
  return lvMap.find(item => item.status === 'medium');
}

export function getDecode(str:string){
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

export function editorDetailCoreFunction({fileCoverage,fileDetail}) {
  return {
    maskWidth:0,
    maskHeight:0,
    maskFlagBits:[]
  }
}
