import React from 'react'
import style from '../style/BoardStyle'

function Stock(props){
    return(
        <div 
            style={style.Stock} 
            zone='stock'
            draggable="false" 
            onDragOver={props.DragOver} 
            onDrop={props.DragDrop}
        >
            stock
            {props.Stock.map((item,i)=>
                <img 
                    key={i} 
                    index={i} // index of array
                    zone='stock' // type of array
                    real_src={item} //real card url
                    style={
                        props.role ==='opponent' ? 
                            {...style.TapCard,...{top:''+(i*5+10)+'%'}} : 
                            {...style.TapCard,...style.TapCardLeft,...{top:''+(i*5+10)+'%'}}
                    } 
                    src='https://inwfile.com/s-l/z9w722.jpg' // sleeve url
                    alt='...'
                    onDragStart={props.DragStart}
                    onDragEnd={props.DragEnd}
                />
            )}
        </div> 
    )
}

export default Stock