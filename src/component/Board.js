import React,{useState,useEffect} from 'react'
//css
//import board from '../style/Board.module.css'
import style from '../style/BoardStyle'

function Board(){

    const [FrontRow,SetFrontRow] = useState(['empty_card.jpg','empty_card.jpg','empty_card.jpg'])
    const [BackRow,SetBackRow] = useState(['empty_card.jpg','empty_card.jpg'])
    
    const [Hand,SetHand] = useState(['https://images.littleakiba.com/tcg/card56988-large.jpg',
        'https://images.littleakiba.com/tcg/card34338-medium.jpg',
        'https://images.littleakiba.com/tcg/card34376-medium.jpg'])

    const [Clock,SetClock] = useState(['empty_card.jpg',
        'empty_card.jpg',
        'empty_card.jpg',
        'empty_card.jpg',
        'empty_card.jpg',
        'empty_card.jpg'])
    
    
    const [Stock,SetStock] = useState([])
    const [Level,SetLevel] = useState(['https://images.littleakiba.com/tcg/card56986-medium.jpg',
        'https://images.littleakiba.com/tcg/card56956-medium.jpg',
        'https://images.littleakiba.com/tcg/card57071-medium.jpg'])
    const [Deck,SetDeck] = useState(['https://images.littleakiba.com/tcg/card56715-large.jpg',
        'https://images.littleakiba.com/tcg/card56733-large.jpg',
        'https://images.littleakiba.com/tcg/card56713-medium.jpg'])
    const [WaitingRoom,SetWaitingRoom] = useState(['https://images.littleakiba.com/tcg/card56619-medium.jpg',
        'https://images.littleakiba.com/tcg/card56629-medium.jpg',
        'https://images.littleakiba.com/tcg/card56643-medium.jpg'])
    const [Memory,SetMemory] = useState(['https://images.littleakiba.com/tcg/card53658-medium.jpg',
        'https://images.littleakiba.com/tcg/card53686-medium.jpg',
        'https://images.littleakiba.com/tcg/card53664-medium.jpg'])
    
    useEffect(() => {
        console.log('Deck update')
    }, [Deck])

    /*Drag-Drop */
    const [src,Setsrc] = useState("empty_card.jpg")
    const [drop,Setdrop] = useState(false)
    const [swap,Setswap] = useState("")
    const [zone,Setzone] = useState("")

    const DragStart = (e)=>{
        let zone = ['stock','level','waitingroom','deck','memory']
        
        if(zone.includes(e.target.attributes['zone'].value)){
            Setsrc(e.target.attributes['real_src'].value) // real_src
            Setzone(e.target.attributes['zone'].value)
        }
        else if(!e.target.src.includes('empty_card.jpg')){
            Setsrc(e.target.src)
            Setzone(e.target.attributes['zone'].value)
        }
    }

    const DragOver = (e)=>{
        e.preventDefault()
    }

    const DragDrop = (e)=>{
        if(src !== 'empty_card.jpg'){
            let slot = ['hand','stock','level','waitingroom','deck','memory']
            let n = slot.indexOf(e.target.attributes['zone'].value) // check value in list ? number : -1
            if(n !== -1){
                let slot_array = [Hand,Stock,Level,WaitingRoom,Deck,Memory]
                let Setslot_array = [SetHand,SetStock,SetLevel,SetWaitingRoom,SetDeck,SetMemory]
                let Dummy = slot_array[n]
                Dummy.push(src)
                Setslot_array[n](Dummy)
            }else{
                let slot = ['frontrow','backrow','clock']
                let slot_array = [FrontRow,BackRow,Clock]
                let Setslot_array = [SetFrontRow,SetBackRow,SetClock]
                n = slot.indexOf(e.target.attributes['zone'].value)
                let Dummy = slot_array[n]
                Setswap(Dummy[parseInt(e.target.attributes[0].value)]) // swap card if card over in frontrow or backrow
                if(Dummy[parseInt(e.target.attributes[0].value)] !== 'empty_card.jpg' && (zone!=='frontrow' && zone!=='backrow')){ // add overed card in waiting room
                    WaitingRoom.push(Dummy[parseInt(e.target.attributes[0].value)])
                }
                Dummy[parseInt(e.target.attributes[0].value)] = src
                Setslot_array[n](Dummy)
            }
            Setsrc('empty_card.jpg')
            Setdrop(true)
        }
    }
    const DragEnd = (e) =>{
        if(drop){
            if(e.target.attributes['zone'].value === 'frontrow'){
                let DummyFrontRow = FrontRow
                DummyFrontRow[parseInt(e.target.attributes[0].value)] = swap
                SetFrontRow(DummyFrontRow)
            }else if(e.target.attributes['zone'].value === 'backrow'){
                let DummyBackRow = BackRow
                DummyBackRow[parseInt(e.target.attributes[0].value)] = swap
                SetBackRow(DummyBackRow)
            }else if(e.target.attributes['zone'].value === 'clock'){
                let DummyClock = Clock
                DummyClock[parseInt(e.target.attributes[0].value)] = 'empty_card.jpg'
                SetClock(DummyClock)
            }else if(e.target.attributes['zone'].value === 'stock'){
                let DummyStock = Stock
                DummyStock.pop()
                SetStock(DummyStock)
            }else if(e.target.attributes['zone'].value === 'deck'){
                let DummyDeck = Deck
                DummyDeck.pop()
                SetDeck(DummyDeck)
            }else if(e.target.attributes['zone'].value === 'level'){
                let DummyLevel = Level
                DummyLevel.pop()
                SetLevel(DummyLevel)
            }
            else{
                let DummyHand = Hand
                DummyHand.splice(parseInt(e.target.attributes['index'].value),1)
                SetHand(DummyHand)
            }
            Setdrop(false) 
            Setswap('empty_card.jpg')
        }
    }
    //Waiting Room
    const [WaitingRoomInfo,SetWaitingRoomInfo] = useState(false) // player
    const [WaitingRoomInfoOppoenet,SetWaitingRoomInfoOpponent] = useState(false) // opponent 
    const WaitingRoomInfoStyle = {
        width:'33rem',
        height:'200px',
        backgroundColor:'white',
        position:'absolute',
        zIndex:'2',
        overflowY:'scroll',
        left:'-33rem',
        top:'-7rem',
        display:WaitingRoomInfo ? 'block' : 'none'
    }
    const WaitingRoomInfoOpponentStyle = {
        display:WaitingRoomInfoOppoenet ? 'block' : 'none',
        left:'5rem',
        top:'2rem'
    }
    const HandleWaitingRoomInfoClicked = (e)=>{
        SetWaitingRoomInfo(!WaitingRoomInfo)
    }
    const HandleWaitingRoomInfoOpponentClicked = (e)=>{
        SetWaitingRoomInfoOpponent(!WaitingRoomInfoOppoenet)
    }
    //Memory
    const [MemoryInfo,SetMemoryInfo] = useState(false)
    const HandleMemoryInfoClicked = (e)=>{
        SetMemoryInfo(!MemoryInfo)
    }
    const MemoryInfoStyle = {
        position:'absolute',
        width:'300px',
        height:'100px',
        backgroundColor:'white',
        left:'5rem',
        zIndex:'2',
        display:MemoryInfo ? 'block' : 'none'
    }


    return(
        <div className="col-lg-9 col-md-12 col-sm-12" style={{float:'right'}}>
            {/* opponent */}
            <div className="container-fluid" style={style.Field}>  
                <div className="row">
                    {/* memory,deck and waiting room */}
                    <div className="col-2">
                        <div 
                            style={style.Zone}
                            zone='waitingroom'
                            draggable='false'
                            onDragOver={DragOver}
                            onDrop={DragDrop}
                        >
                            waiting room
                            <img style={style.UntapCard} src={WaitingRoom[WaitingRoom.length - 1]} zone='waitingroom' alt='...' onClick={HandleWaitingRoomInfoOpponentClicked}/>
                            <div style={{...WaitingRoomInfoStyle,...WaitingRoomInfoOpponentStyle}}>
                                <button className='btn btn-danger' style={{float:"right"}} onClick={HandleWaitingRoomInfoOpponentClicked}>close x</button>
                                {WaitingRoom.map((item,i)=>
                                    <img
                                        key={i} 
                                        style={{width:'3rem',position:'absolute',left:i*3+'rem'}}
                                        src={item}
                                        alt='...'
                                    />
                                )}
                            </div>
                        </div>
                        <div 
                            style={style.Zone}
                            zone='deck'
                            onDragOver={DragOver}
                            onDrop={DragDrop}
                            onDragEnd={DragEnd}
                        >
                            deck
                            {Deck.map((item,i)=>
                                <img 
                                    style={{...style.UntapCard,...{top:"25%"}}} 
                                    src='https://inwfile.com/s-l/z9w722.jpg'
                                    real_src={item}
                                    alt='...'
                                    key={i}
                                    zone='deck'
                                    draggable='true'
                                    onDragStart={DragStart}
                                    onDragOver={DragOver}
                                />    
                            )}                       
                        </div>
                        <div 
                            style={style.Zone}
                            onDragOver={DragOver}
                            onDrop={DragDrop}
                            zone='memory'
                        >
                            memory
                            <img 
                                style={{...style.UntapCard,...{top:"25%"}}} 
                                src={Memory[Memory.length - 1]}
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
                                {Memory.map((item,i)=>
                                    <img
                                        key={i} 
                                        style={{width:'3rem',position:'absolute',left:i*3 + 'rem'}} 
                                        src={item} 
                                        alt='...'
                                    />
                                )}                             
                            </div>
                        </div>
                    </div>
                    {/* main field */}
                    <div className="col-8">
                        {/* Hand */}
                        <div 
                            className="row"
                            style={style.HandStyle} 
                            zone='hand' 
                            draggable="true" 
                            onDragOver={DragOver}
                            onDrop={DragDrop}
                        >
                                {Hand.map((item,i)=><img 
                                    key={i} 
                                    index={i} // index of array
                                    zone='hand' // type of array
                                    style={style.CardStyle}  
                                    src={item} 
                                    draggable="true"
                                    onDragStart={DragStart} 
                                    onDragOver={DragOver}
                                    onDragEnd={DragEnd}
                                    alt="..."/>)}
                        </div>
                        {/* Clock */}
                        <div className="row justify-content-center">
                            {Clock.map((item,i)=><img 
                                key={i} 
                                index={i} // index of array
                                zone='clock' // type of array
                                style={item === 'empty_card.jpg' ? {...style.CardStyle,...style.ClockStyle,...style.EmptycardStyle} : {...style.CardStyle,...style.ClockStyle}}  
                                src={item}
                                draggable="true"
                                onDragStart={DragStart} 
                                onDragOver={DragOver}
                                onDrop={DragDrop} 
                                onDragEnd={DragEnd}
                                alt="..."/>)}
                        </div>
                        {/* Backrow */}
                        <div className="row justify-content-center">
                            {BackRow.map((item,i)=><img 
                                key={i} 
                                index={i} // index of array
                                zone='backrow' // type of array
                                style={item === 'empty_card.jpg' ? {...style.CardStyle,...style.EmptycardStyle} : style.CardStyle}  
                                src={item}
                                draggable="true"
                                onDragStart={DragStart} 
                                onDragOver={DragOver}
                                onDrop={DragDrop} 
                                onDragEnd={DragEnd}
                                alt="..."/>)}
                        </div>
                        {/* FrontRow */}
                        <div className="row justify-content-center" style={{marginBottom:"10px"}}>
                            {FrontRow.map((item,i)=><img 
                                key={i} 
                                index={i} // index of array
                                zone='frontrow' // type of array
                                style={item === 'empty_card.jpg' ? {...style.CardStyle,...style.EmptycardStyle} :  style.CardStyle} 
                                src={item}  
                                draggable="true"
                                onDragStart={DragStart}
                                onDragOver={DragOver}
                                onDrop={DragDrop} 
                                onDragEnd={DragEnd}
                                alt="..."/>)}
                        </div>
                    </div>
                    {/* stock and level */}
                    <div className="col-2">
                        <div 
                            style={style.Zone}
                            onDragOver={DragOver}
                            onDrop={DragDrop}
                            zone="level"
                        >
                            level
                            {Level.map((item,i)=>
                                <img 
                                    style={{...style.TapCard,...{top:20+(i*10)+'%'}}}
                                    real_src={item}
                                    src={item}
                                    alt="..."
                                    draggable="true"
                                    zone="level"
                                    onDragStart={DragStart}
                                    onDragEnd={DragEnd}
                                />
                            )}
                        </div>
                        <div 
                            style={style.Stock} 
                            zone='stock'
                            draggable="false" 
                            onDragOver={DragOver} 
                            onDrop={DragDrop}
                        >
                            stock
                            {Stock.map((item,i)=>
                                <img 
                                    key={i} 
                                    index={i} // index of array
                                    zone='stock' // type of array
                                    real_src={item} //real card url
                                    style={{...style.TapCard,...{top:''+(i*5+10)+'%'}}} 
                                    src='https://inwfile.com/s-l/z9w722.jpg' // sleeve url
                                    alt='...'
                                    onDragStart={DragStart}
                                    onDragEnd={DragEnd}
                                />
                            )}
                        </div> 
                    </div>
                </div>         
            </div>
            {/* player */}
            <div className="container-fluid" style={style.Field}>
                <div className="row">
                    {/* stock and level */}
                    <div className="col-2">
                        <div style={style.Stock}>
                            stock
                        </div>
                        <div style={style.Zone}>
                            level
                        </div>
                    </div>
                    {/* main field */}
                    <div className="col-8">
                        {/* FrontRow */}
                        <div className="row justify-content-center">
                            {FrontRow.map((item,i)=><img 
                                key={i} 
                                index={i} // index of array
                                zone='frontrow' // type of array
                                style={item === 'empty_card.jpg' ? {...style.CardStyle,...style.EmptycardStyle} :  style.CardStyle} 
                                src={item}  
                                draggable="true"
                                onDragStart={DragStart}
                                onDragOver={DragOver}
                                onDrop={DragDrop} 
                                onDragEnd={DragEnd}
                                alt="..."/>)}
                        </div>
                        {/* BackRow */}
                        <div className="row justify-content-center">
                            {BackRow.map((item,i)=><img 
                                key={i} 
                                index={i} // index of array
                                zone='backrow' // type of array
                                style={item === 'empty_card.jpg' ? {...style.CardStyle,...style.EmptycardStyle} :style.CardStyle}  
                                src={item}
                                draggable="true"
                                onDragStart={DragStart} 
                                onDragOver={DragOver}
                                onDrop={DragDrop} 
                                onDragEnd={DragEnd}
                                alt="..."/>)}
                        </div>
                        {/* Clock */}
                        <div className="row justify-content-center">
                            {Clock.map((item,i)=><img 
                                key={i}
                                index={i} // index of array
                                zone='clock' // type of array
                                style={item === 'empty_card.jpg' ? {...style.CardStyle,...style.ClockStyle,...style.EmptycardStyle} : {...style.CardStyle,...style.ClockStyle}}
                                src={item}  
                                draggable="true"
                                onDragStart={DragStart} 
                                onDragOver={DragOver}
                                onDrop={DragDrop}
                                onDragEnd={DragEnd}
                                alt="..."/>)}
                        </div>
                        {/* Hand */}
                        <div 
                            className="row"
                            style={style.HandStyle}
                            zone='hand'
                            draggable="true" 
                            onDragOver={DragOver}
                            onDrop={DragDrop}
                        >
                                {Hand.map((item,i)=><img 
                                    key={i} 
                                    index={i} // index of array
                                    zone='hand' // type of array
                                    style={style.CardStyle}  
                                    src={item} 
                                    draggable="true"
                                    onDragStart={DragStart} 
                                    onDragOver={DragOver}
                                    onDragEnd={DragEnd}
                                    alt="..."/>)}
                        </div>
                    </div>
                    {/* memory,deck and waiting room */}
                    <div className="col-2"> 
                        <div style={style.Zone}>
                            memory
                        </div>
                        <div style={style.Zone}>
                            deck
                        </div>
                        <div style={style.Zone}>
                            waiting room
                            <img style={style.UntapCard} src={WaitingRoom[WaitingRoom.length - 1]} alt='...' onClick={HandleWaitingRoomInfoClicked}/>
                            <div style={WaitingRoomInfoStyle}>
                                <button className='btn btn-danger' style={{float:"right"}} onClick={HandleWaitingRoomInfoClicked}>close x</button>
                                {WaitingRoom.map((item,i)=>
                                    <img
                                        key={i} 
                                        style={{width:'3rem',position:'absolute',left:i*3+'rem'}}
                                        src={item}
                                        alt='...'
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>           
            </div>
        </div>

        
    )
}

export default Board