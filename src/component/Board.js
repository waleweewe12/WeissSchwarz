import React,{useState} from 'react'
//css
import style from '../style/BoardStyle'
//component
import WaitingRoomComponent from './WaitingRoom'
import DeckComponent from './Deck'
import MemoryComponent from './Memory'
import HandComponent from './Hand'
import ClockComponent from './Clock'
import FrontRowComponet from './FrontRow'
import BackRowComponent from './BackRow'
import LevelComponent from './Level'
import StockComponent from './Stock'

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
        'https://images.littleakiba.com/tcg/card53664-medium.jpg',
        'https://images.littleakiba.com/tcg/card53664-medium.jpg',
        'https://images.littleakiba.com/tcg/card53664-medium.jpg',
        'https://images.littleakiba.com/tcg/card53664-medium.jpg'])

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
    const ReturnToHand = (data)=>{
       // console.log(data)
        SetHand(data)
       // SetWaitingRoom(data.WaitingRoom)
    }

    return(
        <div className="col-lg-9 col-md-12 col-sm-12" style={{float:'right'}}>
            {/* opponent */}
            <div className="container-fluid" style={style.Field}>  
                <div className="row">
                    {/* memory,deck and waiting room */}
                    <div className="col-2">
                        <WaitingRoomComponent 
                            DragOver={DragOver} 
                            DragDrop={DragDrop} 
                            WaitingRoom ={WaitingRoom}
                            role='opponent'
                            Hand={Hand}
                            ReturnToHand={ReturnToHand}
                            SetHand={SetHand}
                        />
                        <DeckComponent
                            Deck={Deck}
                            DragStart={DragStart}
                            DragOver={DragOver}
                            DragDrop={DragDrop}
                            DragEnd={DragEnd}
                        />
                        <MemoryComponent 
                            role='opponent'
                            Memory={Memory}
                            DragOver={DragOver}
                            DragDrop={DragDrop}
                        />
                    </div>
                    {/* main field */}
                    <div className="col-8">
                        {/* Hand */}
                        <HandComponent 
                            Hand={Hand}
                            DragOver={DragOver}
                            DragDrop={DragDrop}
                            DragStart={DragStart} 
                            DragEnd={DragEnd}
                        />
                        {/* Clock */}
                        <ClockComponent
                            Clock={Clock}
                            DragStart={DragStart} 
                            DragOver={DragOver}
                            DragDrop={DragDrop} 
                            DragEnd={DragEnd}
                        />
                        {/* Backrow */}
                        <BackRowComponent
                            BackRow={BackRow}
                            DragStart={DragStart} 
                            DragOver={DragOver}
                            DragDrop={DragDrop} 
                            DragEnd={DragEnd}
                        />
                        {/* FrontRow */}
                        <FrontRowComponet
                            FrontRow={FrontRow}
                            DragStart={DragStart}
                            DragOver={DragOver}
                            DragDrop={DragDrop} 
                            DragEnd={DragEnd}
                        />
                    </div>
                    {/* stock and level */}
                    <div className="col-2">
                        {/* level */}
                        <LevelComponent
                            role='opponent'
                            Level={Level}
                            DragOver={DragOver}
                            DragDrop={DragDrop}
                            DragStart={DragStart}
                            DragEnd={DragEnd}
                        />
                        {/* stock */}
                        <StockComponent
                            role='opponent'
                            Stock={Stock}
                            DragStart={DragStart}
                            DragOver={DragOver}
                            DragDrop={DragDrop} 
                            DragEnd={DragEnd}
                        />
                    </div>
                </div>         
            </div>
            {/* player */}
            <div className="container-fluid" style={style.Field}>
                <div className="row">
                    {/* stock and level */}
                    <div className="col-2">
                        {/* stock */}
                        <StockComponent
                            role='player'
                            Stock={Stock}
                            DragStart={DragStart}
                            DragOver={DragOver}
                            DragDrop={DragDrop} 
                            DragEnd={DragEnd}
                        />
                        {/* level */}
                        <LevelComponent
                            role='player'
                            Level={Level}
                            DragOver={DragOver}
                            DragDrop={DragDrop}
                            DragStart={DragStart}
                            DragEnd={DragEnd}
                        />
                    </div>
                    {/* main field */}
                    <div className="col-8">
                        {/* FrontRow */}
                        <FrontRowComponet
                            FrontRow={FrontRow}
                            DragStart={DragStart}
                            DragOver={DragOver}
                            DragDrop={DragDrop} 
                            DragEnd={DragEnd}
                        />
                        {/* BackRow */}
                        <BackRowComponent
                            BackRow={BackRow}
                            DragStart={DragStart} 
                            DragOver={DragOver}
                            DragDrop={DragDrop} 
                            DragEnd={DragEnd}
                        />
                        {/* Clock */}
                        <ClockComponent
                            Clock={Clock}
                            DragStart={DragStart} 
                            DragOver={DragOver}
                            DragDrop={DragDrop} 
                            DragEnd={DragEnd}
                        />
                        {/* Hand */}
                        <HandComponent 
                            Hand={Hand}
                            DragOver={DragOver}
                            DragDrop={DragDrop}
                            DragStart={DragStart} 
                            DragEnd={DragEnd}
                        />
                    </div>
                    {/* memory,deck and waiting room */}
                    <div className="col-2"> 
                        <MemoryComponent
                            role='player' 
                            Memory={Memory}
                            DragOver={DragOver}
                            DragDrop={DragDrop}
                        />
                        <DeckComponent
                            Deck={Deck}
                            DragStart={DragStart}
                            DragOver={DragOver}
                            DragDrop={DragDrop}
                            DragEnd={DragEnd}
                        />
                        <WaitingRoomComponent
                            DragOver={DragOver} 
                            DragDrop={DragDrop} 
                            WaitingRoom ={WaitingRoom}
                            role='player'
                            Hand={Hand}
                            ReturnToHand={ReturnToHand}
                            SetHand={SetHand}
                        />
                    </div>
                </div>           
            </div>
        </div>

        
    )
}

export default Board