import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useNavigate} from 'react-router-dom'
const CretePost = ()=>{
    const navigate = useNavigate();
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
       if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
    
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
               navigate('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    },[url])
  
   const postDetails = ()=>{
       const data = new FormData()
       data.append("file",image)
       data.append("upload_preset","Instagram-clone")
       data.append("cloud_name","navyayadav")
       fetch("https://api.cloudinary.com/v1_1/navyayadav/image/upload",{
           method:"post",
           body:data
       })
       .then(res=>res.json())
       .then(data=>{
          setUrl(data.url)
       })
       .catch(err=>{
           console.log(err)
       })

    
   }
 

   return(
    <div className="container mt-5">
        
    <div className="row d-flex justify-content-center">
        <div className="col-md-6" style={{padding:"100px" }} >
            
            <div className="card " id="form1" style={{height:"450px",borderColor:"black"}} >
       <div className="form-data">
       <div className="forms-inputs mb-4"> <span>Title</span> 
           <input 
           type="text"
            placeholder="title"
            style={{width: "500px"}}
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            /></div>
            <div className="forms-inputs mb-4"> <span>body</span> 
           <input
            type="text"
             placeholder="body"
             value={body}
             style={{width: "500px"}}
            onChange={(e)=>setBody(e.target.value)}
             /></div>
           <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Uplaod Image</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper" style={{padding:"2px"}}>
                <input className="file-path validate"  style={{width: "500px"}} type="text" />
            </div>
            </div>
            <div className="mb-3">
            <button className="btn btn-darken w-100" style={{backgroundColor: "blue", padding:"12px", color: "aliceblue"}} 
            onClick={()=>postDetails()}
            
            >
                Submit post
            </button>
            </div>

       </div>
       </div>
       </div>
       </div>
       </div>
   )
}


export default CretePost
