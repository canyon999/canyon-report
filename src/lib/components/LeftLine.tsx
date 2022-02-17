import React from "react";

export const LeftLine = ({size,times}) => {
  function fn(time:any) {
    if (time?.count>0){
      return <div className={'cline-any cline-yes'}>{time.count + 'x'}</div>
    } else if (time?.count === 0) {
      return <div className={'cline-any cline-no'}/>
    }
    else {
      return <div className={'cline-any'}/>
    }
  }

 return (
   <div style={{paddingTop:'2px'}}>
     {
       [...Array(size)].map((_,index)=>{
         return <div key={index} style={{height:'22px',boxSizing:'border-box'}}>
           {fn(times.find((item:any)=>item.lineNumber === String(index + 1)))}
         </div>
       })
     }
   </div>
 )
}
