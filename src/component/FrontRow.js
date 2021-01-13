import React,{useState} from 'react'
import style from '../style/BoardStyle'

function FrontRow(props){

    const [Tap,SetTap] = useState([false,false,false]) 
    const HandleTapClicked = (e)=>{
        let dummyTap = [...Tap]
        dummyTap[e.target.attributes['index'].value] = true
        SetTap(dummyTap)
    }

    const TapStyle = {
        transform: 'rotate(90deg)',
        marginLeft:'15px',
        marginRight:'5px'
    }

    return(
        <div className="row justify-content-center" style={{marginBottom:"10px"}}>
            {props.FrontRow.map((item,i)=><img 
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
                alt="..."/>)
            }
            <div 
                style={{
                    position:'absolute',
                    width:'80px',
                    backgroundColor:'white',
                    padding:'0',
                    top:'45%',
                    left:'58%',
                    padding:'2px',
                    border:'1px solid black',
                    borderRadius:'10px'
                }}
            >
                <button style={{width:'100%',borderRadius:'10px'}}>Tap</button>
                <button style={{width:'100%',borderRadius:'10px'}}>UnTap</button>
                <button style={{width:'100%',borderRadius:'10px'}}>Reverse</button>
            </div>

            <div 
                style={{
                    position:'absolute',
                    width:'80px',
                    backgroundColor:'white',
                    padding:'0',
                    left:'63%'
                }}
            >
                <button style={{width:'100%'}}>Tap</button>
            </div>

            <div 
                style={{
                    position:'absolute',
                    width:'80px',
                    backgroundColor:'white',
                    padding:'0',
                    left:'68%'
                }}
            >
                <button style={{width:'100%'}}>Tap</button>
            </div>
            {/* <div 
                style={{
                    position:'absolute',
                    width:'80px',
                    backgroundColor:'white',
                    padding:'0',
                    left:'100px'
                }}
            >
                <button style={{width:'100%'}}>Tap</button>
            </div>
            <div 
                style={{
                    position:'absolute',
                    width:'80px',
                    backgroundColor:'white',
                    padding:'0'
                }}
            >
                <button style={{width:'100%'}}>Tap</button>
            </div> */}
        </div>
    )
}

export default FrontRow