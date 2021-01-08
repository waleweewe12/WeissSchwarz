import React,{useState} from 'react'
import style from '../style/BoardStyle'

function Memory(props){
    
    const [MemoryInfo,SetMemoryInfo] = useState(false)
    const HandleMemoryInfoClicked = (e)=>{
        SetMemoryInfo(!MemoryInfo)
    }

    const MemoryInfoStyle = {
        position:'absolute',
        width:'300px',
        height:'8rem',
        backgroundColor:'white',
        left:props.role === 'player' ? '-19rem' : '5rem',
        zIndex:'2',
        display:MemoryInfo ? 'block' : 'none',
        overflowY:'scroll'
    }

    return(
        <div 
            style={style.Zone}
            onDragOver={props.DragOver}
            onDrop={props.DragDrop}
            zone='memory'
        >
            memory
            <img 
                style={{...style.UntapCard,...{top:"25%"}}} 
                src={props.Memory[(props.Memory).length - 1]}
                alt='...'
                onClick={HandleMemoryInfoClicked}
                zone='memory'
            />
            <div style={MemoryInfoStyle}>
                <button 
                    className='btn btn-danger' 
                    style={{float:'right'}} 
                    onClick={HandleMemoryInfoClicked}
                >close x
                </button>
                {props.Memory.map((item,i)=>
                    <img
                        key={i} 
                        style={
                            {
                                width:'3rem',
                                position:'absolute',
                                left:(i-(4*parseInt(i/4)))*3+'rem',
                                top:parseInt(i/4) * 4+'rem'
                            }
                        } 
                        src={item} 
                        alt='...'
                    />
                )}                        
            </div>
        </div>
    )
}

export default Memory