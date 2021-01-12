import React from 'react'
import style from '../style/BoardStyle'

function FrontRow(props){

    return(
        <div className="row justify-content-center" style={{marginBottom:"10px"}}>
            {props.FrontRow.map((item,i)=><img 
                key={i} 
                index={i} // index of array
                zone='frontrow' // type of array
                style={item === 'empty_card.jpg' ? {...style.CardStyle,...style.EmptycardStyle} :  style.CardStyle} 
                src={item}  
                draggable="true"
                onDragStart={props.DragStart}
                onDragOver={props.DragOver}
                onDrop={props.DragDrop} 
                onDragEnd={props.DragEnd}
                alt="..."/>)}
        </div>
    )
}

export default FrontRow