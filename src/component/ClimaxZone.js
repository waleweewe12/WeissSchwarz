import React from 'react'

function ClimaxZone(props){
    
    const ClimaxZoneStyle = {
        backgroundColor:'rgba(255, 255, 255, 0.5)',
        width:'6rem',
        border:"1px solid black",
        borderRadius: "5px",
        marginTop:'10px',
        height:'100%',
        float:props.role === 'opponent' ? 'right' : 'left',
        textAlign:'center'
    }

    return(
        <div className="col-4">
            <div 
                style={ClimaxZoneStyle}
                onDragOver={props.DragOver}
                onDrop={props.DragDrop}
                zone='climaxzone'
            >
                climax zone
                <div
                    style={{
                        position:'absolute',
                        marginTop:'-10px',
                        marginLeft:'20px'
                    }}
                >
                    {
                    !props.ClimaxZone ? '' :
                    props.ClimaxZone.map((item,i)=>
                        <img
                            zone='climaxzone'
                            key={i} 
                            index={i}
                            src={item}
                            style={{
                                width:'3rem',
                                transform: props.role === 'player' ? 'rotate(270deg)' : 'rotate(90deg)'
                            }}
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

export default ClimaxZone