import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const Signup  = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
    const uploadPic = ()=>{
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
    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
       
    }

   return (
    <div className="container mt-5">
        
    <div className="row d-flex justify-content-center">
        <div className="col-md-6" style={{padding:"100px" }} >
            
            <div className="card " id="form1" style={{height:"450px",borderColor:"black"}} >
               
                <div className="form-data" >
                    
                        <div className="forms-inputs mb-4"><h1>Instagram</h1></div>
                        <div className="forms-inputs mb-4"> <span>Name</span> <input type="text"
                        style={{width: "500px"}}
                        value={name} 
                        onChange={(e)=>setName(e.target.value)}
                        />
                        
                        </div>
                        <div className="forms-inputs mb-4"> <span>Email or username</span> <input type="text" 
                        style={{width: "500px"}}
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)}
                         />
                        
                    </div>
                    <div className="forms-inputs mb-4"> <span>Password</span> <input type="password" 
                    value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                    style={{width: "500px"}}/>
                        
                    </div>
                    <div>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                    </div>
                    <div className="mb-3"> <button className="btn btn-darken w-100" style={{backgroundColor: "blue", padding:"12px", color: "aliceblue"}} onClick={()=>PostData()}
                    >Sign up</button> </div>
                </div>
                    
                   
                <h5>
                <Link to="/signin">Already have an account ?</Link>
            </h5>
                   </div>
                         
                        
                    </div>
                   
                
                </div>
        </div>
      
   )
}


export default Signup
