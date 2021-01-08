import React from 'react'
import style from '../style/BoardStyle'

function Clock(props){
    return(
        <div className="row justify-content-center">
            {props.Clock.map((item,i)=><img 
                key={i} 
                index={i} // index of array
                zone='clock' // type of array
                style={item === 'empty_card.jpg' ? {...style.CardStyle,...style.ClockStyle,...style.EmptycardStyle} : {...style.CardStyle,...style.ClockStyle}}  
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

export default Clock