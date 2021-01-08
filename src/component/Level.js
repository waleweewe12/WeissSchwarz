import React from 'react'
import style from '../style/BoardStyle'

function Level(props){
    return(
        <div 
            style={style.Zone}
            onDragOver={props.DragOver}
            onDrop={props.DragDrop}
            zone="level"
        >
            level
            {props.Level.map((item,i)=>
                <img
                    key={i} 
                    style={props.role === 'opponent' ? 
                        {...style.TapCard,...{top:20+(i*10)+'%'}}:
                        {...style.TapCard,...style.TapCardLeft,...{top:20+(i*10)+'%'}}
                    }
                    real_src={item}
                    src={item}
                    alt="..."
                    draggable="true"
                    zone="level"
                    onDragStart={props.DragStart}
                    onDragEnd={props.DragEnd}
                />
            )}
        </div>
    )
}

export default Level