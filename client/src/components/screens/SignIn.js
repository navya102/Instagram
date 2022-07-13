import React,{useState,useContext,} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'
const SignIn  = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate();
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               dispatch({type:"USER",payload:data.user})
               M.toast({html:"signedin success",classes:"#43a047 green darken-1"})
               navigate("/")
           }
        }).catch(err=>{
            console.log(err)
        })
    }
   return (
    <div className="container mt-5">
        
    <div className="row d-flex justify-content-center">
        <div className="col-md-6" style={{padding:"100px" }} >
            
            <div className="card " id="form1" style={{height:"450px",borderColor:"black"}} >
               
                <div className="form-data" >
                    
                        <div className="forms-inputs mb-4"><h1>Instagram</h1></div>
                       
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
                    <div className="mb-3"> <button className="btn btn-darken w-100" style={{backgroundColor: "blue", padding:"12px", color: "aliceblue"}} onClick={()=>PostData()}
                    >Sign in</button> </div>
                </div>
                    
                   
                    <div className="success-data">
                        <div className="text-center d-flex flex-column"> <i className='bx bxs-badge-check'></i> <span className="text-center fs-1">Dont have an account? <br/> <Link  to="/signup">Create one</Link></span> </div>
                    </div>
                   </div>
                         
                        
                    </div>
                   
                
                </div>
        </div>
   )
}


export default SignIn
