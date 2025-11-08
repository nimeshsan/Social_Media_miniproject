export function relativeTime(ts){
  const rtf=new Intl.RelativeTimeFormat(undefined,{numeric:"auto"})
  const ranges={year:31536e6,month:2628e6,week:6048e5,day:864e5,hour:36e5,minute:6e4,second:1e3}
  const diff=Date.now()-ts
  for(const [unit,ms] of Object.entries(ranges)){
    const value=Math.round(diff/ms)
    if(Math.abs(value)>=1) return rtf.format(-value,unit)
  }
  return "just now"
}
