import React from 'react'
import style from '../style/BoardStyle'

function BackRow(props){
    return(
        <div className="col-4">
            <div className="row justify-content-center">
                {props.BackRow.map((item,i)=><img 
                    key={i} 
                    index={i} // index of array
                    zone='backrow' // type of array
                    style={item === 'empty_card.jpg' ? {...style.CardStyle,...style.EmptycardStyle} : style.CardStyle}  
                    src={item}
                    draggable="true"
                    onDragStart={props.DragStart} 
                    onDragOver={props.DragOver}
                    onDrop={props.DragDrop} 
                    onDragEnd={props.DragEnd}
                    alt="..."/>)
                }
            </div>
        </div>
    )
}

export default BackRow