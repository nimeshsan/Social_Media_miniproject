import React,{useRef,useState} from "react"
import Avatar from "../lib/avatar"
export default function PostCreator({onCreate}){
  const [text,setText]=useState("")
  const [url,setUrl]=useState("")
  const [busy,setBusy]=useState(false)
  const [fileData,setFileData]=useState("") // dataURL from device
  const fileRef=useRef(null)
  function pickFile(){ fileRef.current?.click() }
  function onFile(e){
    const f=e.target.files&&e.target.files[0]
    if(!f) return
    const reader=new FileReader()
    reader.onload=()=> setFileData(reader.result)
    reader.readAsDataURL(f)
  }
  function removeFile(){ setFileData(""); if(fileRef.current) fileRef.current.value="" }
  async function submit(e){
    e.preventDefault()
    if(!text.trim() && !url.trim() && !fileData) return
    setBusy(true)
    const image = fileData || url.trim()
    const p={id:"local-"+crypto.randomUUID(),user:"You",content:text.trim(),image,reaction:null,reactionCount:0,comments:Math.floor(Math.random()*6),ts:Date.now()}
    onCreate(p)
    setText(""); setUrl(""); removeFile(); setBusy(false)
  }
  return (
    <div className="composer card">
      <form onSubmit={submit}>
        <div className="composer-head">
          <Avatar name="You"/>
          <div className="input-wrap">
            <input className="input" placeholder="What's on your mind?" value={text} onChange={e=>setText(e.target.value)}/>
          </div>
        </div>
        <div className="row">
          <input className="input-url" placeholder="Image URL (optional)" value={url} onChange={e=>setUrl(e.target.value)}/>
          <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={onFile}/>
          <button type="button" className="btn secondary" onClick={pickFile}>Photo/Video</button>
          <button className="btn" disabled={busy || (!text.trim() && !url.trim() && !fileData)}>{busy?"Posting...":"Post"}</button>
        </div>
        {fileData?(
          <div className="preview">
            <img src={fileData} alt="preview"/>
            <button type="button" className="remove" onClick={removeFile}>Remove</button>
          </div>
        ):null}
      </form>
    </div>
  )
}
