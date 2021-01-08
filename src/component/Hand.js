import React from 'react'
import style from '../style/BoardStyle'

function Hand(props){
    return(
        <div 
            className="row"
            style={style.HandStyle} 
            zone='hand' 
            draggable="true" 
            onDragOver={props.DragOver}
            onDrop={props.DragDrop}
        >
            {props.Hand.map((item,i)=><img 
                key={i} 
                index={i} // index of array
                zone='hand' // type of array
                style={style.CardStyle}  
                src={item} 
                draggable="true"
                onDragStart={props.DragStart} 
                onDragOver={props.DragOver}
                onDragEnd={props.DragEnd}
                alt="..."/>)
            }
        </div>
    )
}

export default Hand
