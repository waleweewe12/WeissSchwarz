import React,{useState,useEffect} from 'react'
import Child from './Child'

function Root(){

    const [data,Setdata] = useState([])
    const HandledataChange = (Childdata)=>{
        let dummy = [...data]
        dummy.push(Childdata)
        Setdata(dummy)
    }

    useEffect(() => {
        console.log('data update')
    }, [data])

    return(
        <div>
            {/* {data} */}
            <Child Setdata={HandledataChange}/>
        </div>
    )
}

export default Root