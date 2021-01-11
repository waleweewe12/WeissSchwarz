import React from 'react'

function CheckZone(props){

    const CheckZoneStyle = {
        backgroundColor:'rgba(255, 255, 255, 0.5)',
        border:"1px solid black",
        borderRadius: "5px",
        width:'80%',
        height:'100%',
        textAlign:'center',
        float:props.role === 'opponent' ? 'none' : 'right'
    }

    const CardInCheckZone = {
        width:'2rem',
        marginLeft:'2px'
    }

    return(
        <div className="col-4">
            <div 
                style={CheckZoneStyle} 
                onDragOver={props.DragOver}
                onDrop={props.DragDrop}
                zone='checkzone'
            >
                check zone
                <div
                    style={{
                        position:'absolute'
                    }}
                >
                    {
                    !props.CheckZone ? '' :
                    props.CheckZone.map((item,i)=>
                        <img
                            zone='checkzone'
                            key={i} 
                            index={i}
                            src={item}
                            style={CardInCheckZone}
                            onDragStart={props.DragStart}
                            onDragEnd={props.DragEnd}
                            onDragOver={props.DragOver}
                            alt='...'
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default CheckZone