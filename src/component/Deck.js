import React,{useState} from 'react'
import style from '../style/BoardStyle'

function Deck(props){

    const [DeckOption,SetDeckOption] = useState(false)
    const [ViewDeck,SetViewDeck] = useState(false)
    const [CardInDeckOption,SetCardInDeckOption] = useState({display:'none'})
    const [ChooseCard,SetChooseCard] = useState(0)

    const HandleDeckOptionClicked = (e)=>{
        SetDeckOption(!DeckOption)
        SetCardInDeckOption({display:'none'})
    }

    const HandleViewDeckClicked = (e)=>{
        SetViewDeck(!ViewDeck)
        SetDeckOption(false)
    }

    const HandleCardInDeckOptionClicked = (e)=>{
        let i = e.target.attributes['index'].value
        SetCardInDeckOption({
            display:'block',
            position:'absolute',
            left:(i-(8*parseInt(i/8))+1)*3+'rem',
            top:parseInt(i/8) * 4+'rem'
        })
        SetChooseCard(i)
    }

    const HandleReturnToHandClicked = (e)=>{
        props.ReturnCardInDeckToHand(ChooseCard)
        SetCardInDeckOption({display:'none'})
    }

    const HandleDeckShuffleClicked = (e)=>{
        props.DeckShuffle()
        SetDeckOption(false)
    }
    
    return(
        <div 
            style={style.Zone}
            zone='deck'
            onDragOver={props.DragOver}
            onDrop={props.DragDrop}
            onDragEnd={props.DragEnd}
        >
            {/* Deck Image */}
            deck
            {(props.Deck).length > 0 ? props.Deck.map((item,i)=>
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
                    onClick={props.role === 'player' ? HandleDeckOptionClicked : ()=>{}}
                />    
            ) : ''}
            {/* Deck Option */}
            <div
                style={
                    {
                        position:'absolute',
                        left:props.role === 'opponent' ? '4rem' : '-5.5rem',
                        width:'6rem',
                        display:DeckOption ? 'block' : 'none'
                    }
                }
            >
                <button style={{width:'100%'}} onClick={HandleViewDeckClicked}>view deck</button>
                <button style={{width:'100%'}} onClick={HandleDeckShuffleClicked}>shuffle</button>
            </div> 
            {/* View deck*/}
            <div
                style={
                    {
                        position:'absolute',
                        width:'500px',
                        height:'300px',
                        backgroundColor:'white',
                        zIndex:'2',
                        left:props.role === 'opponent' ? '5rem' : '-31.5rem',
                        top:props.role === 'opponent' ? '0' : '-5rem',
                        display:ViewDeck ? 'block' : 'none',
                        overflowY:'scroll'
                    }
                }    
            >
                <div
                    style={
                        {
                            float:'right'
                        }
                    }
                >
                    {props.Deck.length > 0 ? props.Deck.map((item,i)=>
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
                            onClick={HandleCardInDeckOptionClicked}
                            alt='...'
                        />
                    ) : ''}
                    <button className='btn btn-danger' style={{display:'block',width:'100%'}} onClick={HandleViewDeckClicked}>close x</button>
                </div>
                <div
                    style={CardInDeckOption}
                >
                    <button onClick={HandleReturnToHandClicked}>return to hand</button>
                </div>
            </div>
        </div>
    )   
}

export default Deck