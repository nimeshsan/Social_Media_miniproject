import React from "react"
const REACTIONS=[
  {key:"like", label:"Like", emoji:"👍"},
  {key:"love", label:"Love", emoji:"❤️"},
  {key:"care", label:"Care", emoji:"🤗"},
  {key:"haha", label:"Haha", emoji:"😂"},
  {key:"wow", label:"Wow", emoji:"😮"},
  {key:"sad", label:"Sad", emoji:"😢"},
  {key:"angry", label:"Angry", emoji:"😡"}
]
export default function ReactionPicker({onPick}){
  return (
    <div className="picker">
      {REACTIONS.map(r=>(
        <button key={r.key} className="react-emoji" title={r.label} onClick={()=>onPick(r.key)}>{r.emoji}</button>
      ))}
    </div>
  )
}
export {REACTIONS}
