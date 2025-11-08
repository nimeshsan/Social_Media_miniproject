import React,{useRef,useState} from "react"
import Avatar from "../lib/avatar.jsx"
import { relativeTime } from "../lib/relativeTime"
import ReactionPicker,{REACTIONS} from "./ReactionPicker.jsx"
import { MessageCircle } from "lucide-react"
function labelFromKey(key){const f=REACTIONS.find(r=>r.key===key);return f?f.label:null}
function emojiFromKey(key){const f=REACTIONS.find(r=>r.key===key);return f?f.emoji:""}
export default function SocialPost({post,onReact}){
  const [showPicker,setShowPicker]=useState(false)
  const likeRef=useRef(null)
  function pick(k){setShowPicker(false);onReact(post.id,k)}
  const reactionClass=post.reaction?`action-btn active ${post.reaction}`:"action-btn"
  const reactionLabel=post.reaction?labelFromKey(post.reaction):"Like"
  const reactionEmoji=post.reaction?emojiFromKey(post.reaction):"👍"
  return (
    <article className="card">
      <div className="post">
        <div className="post-head">
          <Avatar name={post.user}/>
          <div style={{flex:1,minWidth:0}}>
            <div className="meta"><span className="user">{post.user}</span><span>·</span><span>{relativeTime(post.ts)}</span></div>
            <div className="body">{post.content}</div>
            {post.image?(<div className="media"><img src={post.image} alt="post"/></div>):null}
          </div>
        </div>
      </div>
      <div className="statbar">
        <div>{post.reactionCount>0?`${post.reactionCount} ${post.reactionCount===1?"reaction":"reactions"}`:""}</div>
        <div>{post.comments} comments</div>
      </div>
      <div className="actions" style={{position:"relative"}}>
        <button ref={likeRef} className={reactionClass} onMouseEnter={()=>setShowPicker(true)} onMouseLeave={()=>setShowPicker(false)} onClick={()=>onReact(post.id, post.reaction?null:"like")}>
          <span>{reactionEmoji}</span><span>{reactionLabel}</span>
        </button>
        <button className="action-btn"><MessageCircle size={18}/>Comment</button>
        <button className="action-btn">Share</button>
        {showPicker?(<div style={{position:"absolute",left:"12px",bottom:"48px"}} onMouseEnter={()=>setShowPicker(true)} onMouseLeave={()=>setShowPicker(false)}><ReactionPicker onPick={pick}/></div>):null}
      </div>
    </article>
  )
}
