import React from 'react'

function Child(props){

    const HandleInputChange = (e) =>{
        props.Setdata(e.target.value)
    }
    return(
        <div>
            <input type='text' onChange={HandleInputChange}/>
        </div>
    )
}

export default Child