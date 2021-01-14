import React,{useState} from 'react'
import style from '../style/BoardStyle'

function BackRow(props){

    const [Rotate,SetRotate] = useState([{},{}])
    const [BackRowOption,SetBackRowOption] = useState([false,false])

    const HandleTapClicked = (e)=>{
        let cloneRotate = [...Rotate]
        cloneRotate[e.target.attributes['index'].value] = {
            transform: 'rotate(90deg)',
            marginLeft:'15px',
            marginRight:'5px'
        }
        SetRotate(cloneRotate)
        //close when rotated
        let cloneBackRowOption = [...BackRowOption]
        cloneBackRowOption[e.target.attributes['index'].value] = false
        SetBackRowOption(cloneBackRowOption)
    }
    const HandleUntapClicked = (e)=>{
        let cloneRotate = [...Rotate]
        cloneRotate[e.target.attributes['index'].value] = {}
        SetRotate(cloneRotate)
        //close when rotated
        let cloneBackRowOption = [...BackRowOption]
        cloneBackRowOption[e.target.attributes['index'].value] = false
        SetBackRowOption(cloneBackRowOption)
    }
    const HandleReverseClicked = (e)=>{
        let cloneRotate = [...Rotate]
        cloneRotate[e.target.attributes['index'].value] = {transform: 'rotate(180deg)'}
        SetRotate(cloneRotate)
        //close when rotated
        let cloneBackRowOption = [...BackRowOption]
        cloneBackRowOption[e.target.attributes['index'].value] = false
        SetBackRowOption(cloneBackRowOption)
    }

    const HandleBackRowOptionClicked = (e)=>{
        let cloneBackRowOption = [...BackRowOption]
        cloneBackRowOption[e.target.attributes['index'].value] = !cloneBackRowOption[e.target.attributes['index'].value]
        SetBackRowOption(cloneBackRowOption)
    }

    return(
        <>
            {props.BackRow.map((item,i)=>
                <div key={i} className="col-2">
                    <img 
                        index={i} // index of array
                        zone='backrow' // type of array
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
                        onClick={item === 'empty_card.jpg' ? ()=>{} : HandleBackRowOptionClicked}
                        alt="..."
                    />

                    {BackRowOption[i] ?
                        <div style={{position:'absolute',width:'70px',zIndex:'2',display:'inline-block'}}>
                            <button index={i} style={{width:'100%'}} onClick={HandleUntapClicked}>Untap</button>
                            <button index={i} style={{width:'100%'}} onClick={HandleTapClicked}>Tap</button>
                            <button index={i} style={{width:'100%'}} onClick={HandleReverseClicked}>Reverse</button>
                        </div>
                        : ""
                    }
                </div>
            )}
        </>
    )
}

export default BackRow