import React,{useState,useEffect} from 'react'

//css
import style from '../style/CardInfoStyle'

function CardInfo(props){

    const [text,Settext] = useState([]) 
    
    useEffect(()=>{
        let cardtext = props.text.filter(item=>item.url === props.image)
        if(cardtext.length > 0)
            Settext(cardtext[0].text)
    },[props.text,props.image])

    return(
        <div className="col-lg-3 col-md-2 col-sm-12" style={{float:"left"}}>
            {/* card image */}
            <div className="card" style={{width:"16rem"}}>
                <img src={props.image} className="card-img-top" alt="..."/>
            </div>
            {/* card text */}
            <div className="mt-3" style={style.cardtext} >
                {
                    text.map((item,i)=><p key={i} style={{padding:'10px'}}>{item}</p>)
                }
            </div>
        </div>
    )
}

export default CardInfo