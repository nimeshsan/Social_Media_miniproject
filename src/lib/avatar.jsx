import React,{useMemo} from "react"
export default function Avatar({name}){
  const initials=useMemo(()=>name.split(" ").map(w=>w[0]?.toUpperCase()).slice(0,2).join(""),[name])
  return <div className="avatar">{initials||"U"}</div>
}
