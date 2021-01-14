import React,{useState} from 'react'
import style from '../style/BoardStyle'

function FrontRow(props){

    const [Rotate,SetRotate] = useState([{},{},{}])
    const [FrontRowOption,SetFrontRowOption] = useState([false,false,false])

    const HandleTapClicked = (e)=>{
        let cloneRotate = [...Rotate]
        cloneRotate[e.target.attributes['index'].value] = {
            transform: 'rotate(90deg)',
            marginLeft:'15px',
            marginRight:'5px'
        }
        SetRotate(cloneRotate)
        //close when rotated
        let cloneFrontRowOption = [...FrontRowOption]
        cloneFrontRowOption[e.target.attributes['index'].value] = false
        SetFrontRowOption(cloneFrontRowOption)
    }
    const HandleUntapClicked = (e)=>{
        let cloneRotate = [...Rotate]
        cloneRotate[e.target.attributes['index'].value] = {}
        SetRotate(cloneRotate)
        //close when rotated
        let cloneFrontRowOption = [...FrontRowOption]
        cloneFrontRowOption[e.target.attributes['index'].value] = false
        SetFrontRowOption(cloneFrontRowOption)
    }
    const HandleReverseClicked = (e)=>{
        let cloneRotate = [...Rotate]
        cloneRotate[e.target.attributes['index'].value] = {transform: 'rotate(180deg)'}
        SetRotate(cloneRotate)
        //close when rotated
        let cloneFrontRowOption = [...FrontRowOption]
        cloneFrontRowOption[e.target.attributes['index'].value] = false
        SetFrontRowOption(cloneFrontRowOption)
    }

    const HandleFrontRowOptionClicked = (e)=>{
        let cloneFrontRowOption = [...FrontRowOption]
        cloneFrontRowOption[e.target.attributes['index'].value] = !cloneFrontRowOption[e.target.attributes['index'].value]
        SetFrontRowOption(cloneFrontRowOption)
    }

    return(
        <div className="row justify-content-center" style={{marginBottom:"10px"}}>
            {props.FrontRow.map((item,i)=>
                <div key={i} className="col-2">
                    <img
                        index={i} // index of array
                        zone='frontrow' // type of array
                        style={
                            item === 'empty_card.jpg' ? {...style.CardStyle,...style.EmptycardStyle} :  
                            {...style.CardStyle,...Rotate[i]}
                        } 
                        src={item}  
                        draggable="true"
                        onDragStart={props.DragStart}
                        onDragOver={props.DragOver}
                        onDrop={props.DragDrop} 
                        onDragEnd={props.DragEnd}
                        onClick={item === 'empty_card.jpg' ? ()=>{} : HandleFrontRowOptionClicked}
                        onMouseOver={props.HandleCardOver}
                        alt="..."
                    />
                    {FrontRowOption[i] ?
                        <div style={{position:'absolute',width:'70px',zIndex:'2',display:'inline-block'}}>
                            <button index={i} style={{width:'100%'}} onClick={HandleUntapClicked}>Untap</button>
                            <button index={i} style={{width:'100%'}} onClick={HandleTapClicked}>Tap</button>
                            <button index={i} style={{width:'100%'}} onClick={HandleReverseClicked}>Reverse</button>
                        </div>
                        : ""
                    }
                </div>
            )}
        </div>
    )
}

export default FrontRow