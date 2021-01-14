import React,{useState} from 'react'
import style from '../style/BoardStyle'

function WaitingRoom(props){

    const [WaitingRoomInfo,SetWaitingRoomInfo] = useState(false) // opponent 
    const [WaitingRoomFunction,SetWaitingRoomFunction] = useState({display:'none'})
    const [ChooseCard,SetChooseCard] = useState(0)

    const WaitingRoomInfoStyle = {
        width:'33rem',
        height:'200px',
        backgroundColor:'white',
        position:'absolute',
        zIndex:'2',
        overflowY:'scroll',
        left:props.role === 'player' ? '-33rem' : '5rem',
        top:props.role === 'player' ? '-7rem' : '2rem',
        display:WaitingRoomInfo ? 'block' : 'none'
    }

    const HandleWaitingRoomInfoClicked = (e)=>{
        SetWaitingRoomInfo(!WaitingRoomInfo)
        SetWaitingRoomFunction({display:'none'})
    }

    const HandleWaitingRoomFunctionClicked = (e)=>{
        let i = e.target.attributes['index'].value
        SetWaitingRoomFunction({
            display:'block',
            position:'absolute',
            left:(i-(8*parseInt(i/8))+1)*3+'rem',
            top:parseInt(i/8) * 4+'rem'
        })
        SetChooseCard(i)
    }
    
    const ReturnToHand = (e)=>{
        props.ReturnToHand(ChooseCard)
        SetWaitingRoomFunction({display:'none'})
    }

    const HandleRefreshClicked = (e)=>{
        console.log('refresh from waitingroom')
        props.RefreshWaitingRoom()
        SetWaitingRoomInfo(false)
    }

    return(
        <div 
            style={style.Zone}
            zone='waitingroom'
            draggable='false'
            onDragOver={props.DragOver}
            onDrop={props.DragDrop}
        >
            waiting room
            {
                (props.WaitingRoom).length > 0 ?
                <img style={style.UntapCard} src={props.WaitingRoom[(props.WaitingRoom).length - 1]} zone='waitingroom' alt='...' onClick={HandleWaitingRoomInfoClicked}/> :
                ''
            }
            <div style={WaitingRoomInfoStyle}>
                <div style={{float:'right'}}>
                    <button className='btn btn-danger' style={{display:'block',width:'100%'}} onClick={HandleWaitingRoomInfoClicked}>close x</button>
                    <button className='btn btn-info' style={{display:props.role === 'player' ? 'block' : 'none'}} onClick={HandleRefreshClicked}>
                        Refresh <img src='refresh.svg' style={{width:'10px',height:'10px'}} alt='...'/> 
                    </button>
                </div>
                {props.WaitingRoom.sort().map((item,i)=>
                    <img
                        key={i} 
                        index={i}
                        style={
                            {
                                width:'3rem',
                                position:'absolute',
                                left:(i-(8*parseInt(i/8)))*3+'rem',
                                top:parseInt(i/8) * 4+'rem',
                                cursor:'pointer'
                            }
                        }
                        src={item}
                        onClick={HandleWaitingRoomFunctionClicked}
                        alt='...'
                    />
                )}
                {/* Return to hand */}
                <div
                    style={WaitingRoomFunction}
                >
                    <button onClick={ReturnToHand}>return to hand</button>
                </div>
            </div>
        </div>
    )
}

export default WaitingRoom