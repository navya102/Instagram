import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'
const NavBar = ()=>{
    const  searchModal = useRef(null)
    const [search,setSearch] = useState('')
    const [userDetails,setUserDetails] = useState([])
     const {state,dispatch} = useContext(UserContext)
     const history = useHistory()
     useEffect(()=>{
         M.Modal.init(searchModal.current)
     },[])
     const renderList = ()=>{
       if(state){
           return [
            <li key="1" className="nav-item" ><i  data-target="modal1" className="large bi-search modal-trigger" style={{color:"black"}}>search</i></li>,
            <li key="2" className="nav-item" ><Link style={{ color:"black"}} className="nav-link " to="/profile">Profile</Link></li>,
            <li key="3" className="nav-item" ><Link style={{ color:"black"}} className="nav-link " to="/create">Create post</Link></li>,
            <li key="4" className="nav-item" ><Link style={{ color:"black"}} className="nav-link " to="/myfollowingpost">My following Posts</Link></li>,
            <li  key="5" className="nav-item" >
             <button className="btn btn-danger nav-item me-auto"
            onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }}
            >
                Logout
            </button>
            </li>
         
            
           ]
       }else{
         return [
          <li  key="6" className="nav-item" ><Link to="/signin" style={{color:"black"}}>Signin</Link></li>,
          <li  key="7" className="nav-item" ><Link to="/signup">Signup</Link></li>
         
         ]
       }
     }


     const fetchUsers = (query)=>{
        setSearch(query)
        fetch('/search-users',{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            query
          })
        }).then(res=>res.json())
        .then(results=>{
          setUserDetails(results.user)
        })
     }
    return(
      <div>
        <nav>
        <div className="navbar mr-auto navbar-expand-lg navbar-light bg-light">
          <Link to={state?"/":"/signin"}  className="navbar-brand">Instagram</Link>
          <ul id="nav-mobile" className="right">
             {renderList()}
  
          </ul>
        </div>
        <div id="modal1" class="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            className="nav-item"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
            <div className="collapse navbar-collapse" id="navbarNav">
             <ul className="navbar-nav">
               {userDetails.map(item=>{
                 return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li style={{display:"inline-block"}} className="collection-item">{item.email}</li></Link> 
               })}
               
              </ul></div>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
      </nav>
      </div>
    )
}



export default NavBar
