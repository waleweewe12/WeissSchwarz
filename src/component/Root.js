import React,{useState} from 'react'
import Child from './Child'

function Root(){

    const [data,Setdata] = useState("")
    const HandledataChange = (Childdata)=>{
        Setdata(Childdata)
    }

    return(
        <div>
            {data}
            <Child Setdata={HandledataChange}/>
        </div>
    )
}

export default Root