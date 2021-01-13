import React,{useState} from 'react'
import style from '../style/BoardStyle'

function FrontRow(props){

    const [Tap,SetTap] = useState([false,false,false]) 
    const HandleTapClicked = (e)=>{
        let dummyTap = [...Tap]
        dummyTap[e.target.attributes['index'].value] = true
        SetTap(dummyTap)
    }
    const HandleUntapClicked = (e)=>{
        let dummyTap = [...Tap]
        dummyTap[e.target.attributes['index'].value] = false
        SetTap(dummyTap)
    }

    const TapStyle = {
        transform: 'rotate(90deg)',
        marginLeft:'15px',
        marginRight:'5px'
    }

    const ReverseStyle = {
        transform: 'rotate(360deg)'
    }

    return(
        <div className="row justify-content-center" style={{marginBottom:"10px"}}>
            {props.FrontRow.map((item,i)=>
                <div className="col-2">
                    <img 
                        key={i} 
                        index={i} // index of array
                        zone='frontrow' // type of array
                        style={
                            item === 'empty_card.jpg' ? {...style.CardStyle,...style.EmptycardStyle} :  
                            Tap[i] ? {...style.CardStyle,...TapStyle} : style.CardStyle
                        } 
                        src={item}  
                        draggable="true"
                        onDragStart={props.DragStart}
                        onDragOver={props.DragOver}
                        onDrop={props.DragDrop} 
                        onDragEnd={props.DragEnd}
                        onClick={HandleTapClicked}
                        alt="..."
                    />
                    <div style={{position:'absolute',width:'70px',zIndex:'2',display:'inline-block'}}>
                        <button index={i} style={{width:'100%'}}>Untap</button>
                        <button index={i} style={{width:'100%'}} onClick={HandleTapClicked}>Tap</button>
                        <button index={i} style={{width:'100%'}}>Reverse</button>
                    </div>
                </div>
            )}
                {/* <div
                    style={{
                        width:'100px',
                        height:'100px',
                        backgroundColor:'white',
                        top:'20%'
                    }}
                >
                </div> */}

        </div>
    )
}

export default FrontRow