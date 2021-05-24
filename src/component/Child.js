import React from 'react'

function Child(props){

    const HandleInputChange = (e) =>{
        let data = ['hello','world']
        props.Setdata(data)
    }
    return(
        <div>
            <button onClick={HandleInputChange}>click me</button>
        </div>
    )
}

export default Child