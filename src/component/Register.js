import React from 'react'

function Register(){
    return(
        <div className="row justify-content-center" style={{alignItems: 'center'}}>
            <div className="col-lg-4 col-md-6 col-sm-12 shadow-lg bg-white rounded ">
                <h1 className="ms-5">Register</h1>
                <div className="mb-3 mt-3 ms-5 me-5">
                    <label htmlFor="email" className="form-label">email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder="Enter your email" 
                    />
                </div>
                <div className="mb-3 mt-3 ms-5 me-5">
                    <label htmlFor="username" className="form-label">username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="username" 
                        placeholder="Enter your uername" 
                    />
                </div>
                <div className="mb-3 ms-5 me-5">
                    <label htmlFor="password" className="form-label">password</label>
                    <input type="password" className="form-control" id="password" placeholder="Input your password" />
                </div>
                <button className="btn btn-primary mb-3 ms-5">Submit</button>
            </div>
        </div>
    )
}

export default Register