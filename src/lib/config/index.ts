// 等级枚举
export const lvMap = [
  {
    status:'unknown',
    color:'#06f'
  },
  {
    status:'low',
    color:'#C21F39'
  },
  {
    status:'medium',
    color:'#f9cd0b'
  },
  {
    status:'high',
    color:'rgb(77,146,33)'
  }
]
// 四个维度
export const dimensions = [
  {
    dimension:'statements',
    abbreviation:'s'
  },
  {
    dimension:'branches',
    abbreviation:'b'
  },
  {
    dimension:'functions',
    abbreviation:'f'
  },
  {
    dimension:'lines',
    abbreviation:'l'
  },
]
// 默认范围
export const defaultWatermarks = [50,80]
