import React,{useState} from 'react'

function LogIn(props){

    const [username,Setusername] = useState("")
    const HandleusernameChanged = (e)=>{
        Setusername(e.target.value)
    }
    const Submit = (e)=>{
        e.preventDefault()
        props.SetplayerName(username)
    }

    return(
        <div className="row justify-content-center">
            <div className="col-6">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="username" 
                        placeholder="Input your uername" 
                        value={username} 
                        onChange={HandleusernameChanged}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">password</label>
                    <input type="password" className="form-control" id="password" placeholder="Input your password" />
                </div>
                <button className="btn btn-primary" onClick={Submit}>Submit</button>
            </div>
        </div>
    )
}

export default LogIn