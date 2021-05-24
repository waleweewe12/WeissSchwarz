import React,{useState,useEffect} from 'react'
import Child from './Child'

function Root(){

    const [data,Setdata] = useState([])
    const HandledataChange = (Childdata)=>{
        let dummy = [...data]
        dummy.push(Childdata)
        Setdata(dummy)
    }
    return(
        <div>
            {data.map((item,i)=>
                <div key={i}>{item}</div>
            )}
            <Child Setdata={HandledataChange}/>
        </div>
    )
}

export default Root