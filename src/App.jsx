import React,{useEffect,useState} from "react"
import PostCreator from "./components/PostCreator.jsx"
import SocialPost from "./components/SocialPost.jsx"
export default function App(){
  const [posts,setPosts]=useState([])
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    let alive=true
    async function load(){
      try{
        const r=await fetch("https://jsonplaceholder.typicode.com/posts?_limit=8")
        const data=await r.json()
        const rc=await fetch("https://jsonplaceholder.typicode.com/comments")
        const cdata=await rc.json()
        const counts=cdata.reduce((m,x)=>{m[x.postId]=(m[x.postId]||0)+1;return m},{})
        const enriched=data.map(d=>({id:d.id,user:`User ${d.userId||Math.ceil(Math.random()*9)}`,content:d.title.charAt(0).toUpperCase()+d.title.slice(1)+".\n"+d.body,image:Math.random()>0.55?`https://picsum.photos/seed/${d.id}/900/500`:"",reaction:null,reactionCount:Math.floor(Math.random()*120),comments:counts[d.id]||Math.floor(Math.random()*10),ts:Date.now()-Math.floor(Math.random()*86400000*5)}))
        if(alive) setPosts(enriched)
      } finally { if(alive) setLoading(false) }
    }
    load()
    return ()=>{alive=false}
  },[])
  function addPost(p){ setPosts(x=>[p,...x]) }
  function reactTo(id,key){
    setPosts(x=>x.map(p=>{
      if(p.id!==id) return p
      const had=Boolean(p.reaction)
      const next=key
      if(next===null) return {...p,reaction:null,reactionCount:Math.max(0,p.reactionCount-(had?1:0))}
      if(!had) return {...p,reaction:next,reactionCount:p.reactionCount+1}
      return {...p,reaction:next}
    }))
  }
  return (
    <div>
      <div className="topbar"><div className="brand"><div className="logo"></div><span>The Interactor</span></div></div>
      <div className="container">
        <PostCreator onCreate={addPost}/>
        <div className="feed">
          {loading?(
            Array.from({length:4}).map((_,i)=>(
              <div key={i} className="card skeleton">
                <div className="skel-row">
                  <div className="skel-a"></div>
                  <div className="skel-b">
                    <div className="ph" style={{width:"40%"}}></div>
                    <div className="ph" style={{width:"70%"}}></div>
                  </div>
                </div>
                <div className="ph ph-lg"></div>
              </div>
            ))
          ):(
            posts.map(p=> <SocialPost key={p.id} post={p} onReact={reactTo} />)
          )}
        </div>
        <div className="footer">LO1–LO3 • React + CSS • Reactions • Device Upload</div>
      </div>
    </div>
  )
}
