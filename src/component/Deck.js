import React from 'react'
import style from '../style/BoardStyle'

function Deck(props){
    return(
        <div 
            style={style.Zone}
            zone='deck'
            onDragOver={props.DragOver}
            onDrop={props.DragDrop}
            onDragEnd={props.DragEnd}
        >
            deck
            {props.Deck.map((item,i)=>
                <img 
                    style={{...style.UntapCard,...{top:"25%"}}} 
                    src='https://inwfile.com/s-l/z9w722.jpg'
                    real_src={item}
                    alt='...'
                    key={i}
                    zone='deck'
                    draggable='true'
                    onDragStart={props.DragStart}
                    onDragOver={props.DragOver}
                />    
            )}                       
        </div>
    )   
}

export default Deck