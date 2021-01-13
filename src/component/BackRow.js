import React from 'react'
import style from '../style/BoardStyle'

function BackRow(props){
    return(
        <>
            {props.BackRow.map((item,i)=>
                <div className="col-2">
                    <img 
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
                        alt="..."
                    />
                </div>
            )}
        </>
    )
}

export default BackRow