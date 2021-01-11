import React,{useState,useEffect} from 'react'
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
import CheckZoneComponent from './CheckZone'
import ClimaxZoneComponent from './ClimaxZone'
//firebase
import firebase from '../firebase'

function Board(props){

    //player data
    const [playerrole,Setplayerrole] = useState(props.playerrole)
    const [FrontRow,SetFrontRow] = useState(['empty_card.jpg','empty_card.jpg','empty_card.jpg'])
    const [BackRow,SetBackRow] = useState(['empty_card.jpg','empty_card.jpg'])
    const [Hand,SetHand] = useState([])
    const [Clock,SetClock] = useState(['empty_card.jpg',
        'empty_card.jpg',
        'empty_card.jpg',
        'empty_card.jpg',
        'empty_card.jpg',
        'empty_card.jpg'])
    const [Stock,SetStock] = useState([])
    const [Level,SetLevel] = useState([])
    const [Deck,SetDeck] = useState(props.playerDeck)
    const [WaitingRoom,SetWaitingRoom] = useState([])
    const [Memory,SetMemory] = useState([])
    const [CheckZone,SetCheckZone] = useState([])
    const [ClimaxZone,SetClimaxZone] = useState([])
    
    //update real-time player board
    const updateplayerdata = ()=>{
        const db = firebase.firestore()
        let data = {}
        //console.log('update')
        if(playerrole === 'player1'){
            console.log('update player1')
            data = {
                player1deck:Deck,
                player1backrow:BackRow,
                player1checkzone:CheckZone,
                player1climaxzone:ClimaxZone,
                player1clock:Clock,
                player1frontrow:FrontRow,
                player1hand:Hand,
                player1level:Level,
                player1memory:Memory,
                player1stock:Stock,
                player1waitingroom:WaitingRoom,
            }
        }else if(playerrole === 'player2'){
            console.log('update player2')
            data = {
                player2deck:Deck,
                player2backrow:BackRow,
                player2checkzone:CheckZone,
                player2climaxzone:ClimaxZone,
                player2clock:Clock,
                player2frontrow:FrontRow,
                player2hand:Hand,
                player2level:Level,
                player2memory:Memory,
                player2stock:Stock,
                player2waitingroom:WaitingRoom,
            }
        }
        db.collection("board").doc("1234").update(data)
        .then(()=>{})
        .catch(err=>console.log(err))
    }

    useEffect(updateplayerdata,[Deck,BackRow,CheckZone,ClimaxZone,Clock,
        FrontRow,Hand,Level,Memory,Stock,WaitingRoom,playerrole])
    
    //opponent data
    const [OpponentFrontRow,SetOpponentFrontRow] = useState(['empty_card.jpg','empty_card.jpg','empty_card.jpg'])
    const [OpponentBackRow,SetOpponentBackRow] = useState(['empty_card.jpg','empty_card.jpg'])
    const [OpponentHand,SetOpponentHand] = useState([])
    const [OpponentClock,SetOpponentClock] = useState(['empty_card.jpg',
        'empty_card.jpg',
        'empty_card.jpg',
        'empty_card.jpg',
        'empty_card.jpg',
        'empty_card.jpg'])
    const [OpponentStock,SetOpponentStock] = useState([])
    const [OpponentLevel,SetOpponentLevel] = useState([])
    const [OpponentDeck,SetOpponentDeck] = useState(props.opponentDeck)
    const [OpponentWaitingRoom,SetOpponentWaitingRoom] = useState([])
    const [OpponentMemory,SetOpponentMemory] = useState([])
    const [OpponentCheckZone,SetOpponentCheckZone] = useState([])
    const [OpponentClimaxZone,SetOpponentClimaxZone] = useState([])
    
    const [Unknown,SetUnKnown] = useState([])
    //update real-time opponent board
    // const db = firebase.firestore()
    // let test = ''
    
    // db.collection("board").doc("1234") // test board id is "1234"
    //     .onSnapshot(function(doc) {
    //         console.log(doc.data().player1backrow)
    //         test = doc.data().player1backrow
    //         SetUnKnown('hello')
        //    SetUnKnown(doc.data().player1backrow)
        //     if(playerrole === 'player1'){
        //         SetOpponentBackRow(doc.data().player2backrow)
        //         SetOpponentFrontRow(doc.data().player2frontrow)
        //         SetOpponentHand(doc.data().player2hand)
        //         SetOpponentClock(doc.data().player2clock)
        //         SetOpponentStock(doc.data().player2stock)
        //         SetOpponentLevel(doc.data().player2level)
        //         SetOpponentDeck(doc.data().player2deck)
        //         SetOpponentWaitingRoom(doc.data().player2waitingroom)
        //         SetOpponentMemory(doc.data().player2memory)
        //         SetOpponentCheckZone(doc.data().player2checkzone)
        //         SetOpponentClimaxZone(doc.data().player2climaxzone)   
        //     }else if(playerrole === 'player2'){
        //         SetOpponentBackRow(doc.data().player1backrow)
        //         SetOpponentFrontRow(doc.data().player1frontrow)
        //         SetOpponentHand(doc.data().player1hand)
        //         SetOpponentClock(doc.data().player1clock)
        //         SetOpponentStock(doc.data().player1stock)
        //         SetOpponentLevel(doc.data().player1level)
        //         SetOpponentDeck(doc.data().player1deck)
        //         SetOpponentWaitingRoom(doc.data().player1waitingroom)
        //         SetOpponentMemory(doc.data().player1memory)
        //         SetOpponentCheckZone(doc.data().player1checkzone)
        //         SetOpponentClimaxZone(doc.data().player1climaxzone)
            // }
        // }, function(error) {
        //     console.log(error)
        // })
    
    useEffect(() => {
        const db = firebase.firestore()
        db.collection("board").doc("1234")
        .onSnapshot(function(doc) {
            console.log(doc.data())
            if(playerrole === 'player1'){
                SetOpponentBackRow(doc.data().player2backrow)
                SetOpponentFrontRow(doc.data().player2frontrow)
                SetOpponentHand(doc.data().player2hand)
                SetOpponentClock(doc.data().player2clock)
                SetOpponentStock(doc.data().player2stock)
                SetOpponentLevel(doc.data().player2level)
                SetOpponentDeck(doc.data().player2deck)
                SetOpponentWaitingRoom(doc.data().player2waitingroom)
                SetOpponentMemory(doc.data().player2memory)
                SetOpponentCheckZone(doc.data().player2checkzone)
                SetOpponentClimaxZone(doc.data().player2climaxzone)   
            }else if(playerrole === 'player2'){
                SetOpponentBackRow(doc.data().player1backrow)
                SetOpponentFrontRow(doc.data().player1frontrow)
                SetOpponentHand(doc.data().player1hand)
                SetOpponentClock(doc.data().player1clock)
                SetOpponentStock(doc.data().player1stock)
                SetOpponentLevel(doc.data().player1level)
                SetOpponentDeck(doc.data().player1deck)
                SetOpponentWaitingRoom(doc.data().player1waitingroom)
                SetOpponentMemory(doc.data().player1memory)
                SetOpponentCheckZone(doc.data().player1checkzone)
                SetOpponentClimaxZone(doc.data().player1climaxzone)
            }
        }, function(error) {
            console.log(error)
        });
    }, [])

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
            let slot = ['hand','stock','level','waitingroom','deck','memory','checkzone','climaxzone']
            let n = slot.indexOf(e.target.attributes['zone'].value) // check value in list ? number : -1
            if(n !== -1){
                let slot_array = [Hand,Stock,Level,WaitingRoom,Deck,Memory,CheckZone,ClimaxZone]
                let Setslot_array = [SetHand,SetStock,SetLevel,SetWaitingRoom,SetDeck,SetMemory,SetCheckZone,SetClimaxZone]
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
            }else if(e.target.attributes['zone'].value === 'checkzone'){
                let DummyCheckZone = CheckZone
                DummyCheckZone.splice(parseInt(e.target.attributes['index'].value),1)
                SetCheckZone(DummyCheckZone)
            }else if(e.target.attributes['zone'].value === 'climaxzone'){
                let DummyClimaxZone = ClimaxZone
                DummyClimaxZone.splice(parseInt(e.target.attributes['index'].value),1)
                SetClimaxZone(DummyClimaxZone)
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
    const ReturnToHand = (index)=>{
        index = parseInt(index)
        let DummyHand = [...Hand]
        let DummyWaitingRoom = [...WaitingRoom]
        DummyHand.push(DummyWaitingRoom[index])
        DummyWaitingRoom.splice(index,1)
        SetHand(DummyHand)
        SetWaitingRoom(DummyWaitingRoom)
    }

    const shuffle = (array,shuffle_array) =>{
        let n = array.length
        let r = Math.floor(Math.random() * n)
        if(n === 0){
            return shuffle_array
        }else{
            shuffle_array.push(array[r])
            array.splice(r,1)
            shuffle(array,shuffle_array)
        }
    }

    const RefreshWaitingRoom = ()=>{
        console.log('refresh from Board')
        let Refresh = [...Deck,...WaitingRoom]
        let RefreshDeck = []
        shuffle(Refresh,RefreshDeck)
        SetDeck(RefreshDeck)
        SetWaitingRoom([])
    }

    const ReturnCardInDeckToHand = (index)=>{
        index = parseInt(index)
        let DummyDeck = [...Deck]
        let DummyHand = [...Hand]
        DummyHand.push(DummyDeck[index])
        DummyDeck.splice(index,1)
        SetDeck(DummyDeck)
        SetHand(DummyHand)
    }

    const DeckShuffle = ()=>{
        let DummyDeck = [...Deck]
        let ShuffleDeck = []
        shuffle(DummyDeck,ShuffleDeck)
        SetDeck(ShuffleDeck)
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
                            WaitingRoom ={OpponentWaitingRoom}
                            role='opponent'
                            ReturnToHand={ReturnToHand}
                            RefreshWaitingRoom={RefreshWaitingRoom}
                        />
                        <DeckComponent
                            Deck={OpponentDeck}
                            DragStart={DragStart}
                            DragOver={DragOver}
                            DragDrop={DragDrop}
                            DragEnd={DragEnd}
                            role='opponent'
                            ReturnCardInDeckToHand={ReturnCardInDeckToHand}
                            DeckShuffle={DeckShuffle}
                        />
                        <MemoryComponent 
                            role='opponent'
                            Memory={OpponentMemory}
                            DragOver={DragOver}
                            DragDrop={DragDrop}
                        />
                    </div>
                    {/* main field */}
                    <div className="col-8">
                        {/* Hand */}
                        <HandComponent
                            role='opponent' 
                            Hand={OpponentHand}
                            DragOver={DragOver}
                            DragDrop={DragDrop}
                            DragStart={DragStart} 
                            DragEnd={DragEnd}
                        />
                        {/* Clock */}
                        <ClockComponent
                            Clock={OpponentClock}
                            DragStart={DragStart} 
                            DragOver={DragOver}
                            DragDrop={DragDrop} 
                            DragEnd={DragEnd}
                        />
                        {/* Backrow,CheckZone, ClimaxZone */}
                        <div className="row justify-content-center">
                            <CheckZoneComponent
                                role='opponent'
                                CheckZone={OpponentCheckZone}
                                DragStart={DragStart} 
                                DragOver={DragOver}
                                DragDrop={DragDrop} 
                                DragEnd={DragEnd}
                            />
                            <BackRowComponent
                                BackRow={OpponentBackRow}
                                DragStart={DragStart} 
                                DragOver={DragOver}
                                DragDrop={DragDrop} 
                                DragEnd={DragEnd}
                            />
                            <ClimaxZoneComponent
                                role='opponent'
                                ClimaxZone={OpponentClimaxZone}
                                DragStart={DragStart} 
                                DragOver={DragOver}
                                DragDrop={DragDrop} 
                                DragEnd={DragEnd}
                            />
                        </div>
                        {/* FrontRow */}
                        <FrontRowComponet
                            FrontRow={OpponentFrontRow}
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
                            Level={OpponentLevel}
                            DragOver={DragOver}
                            DragDrop={DragDrop}
                            DragStart={DragStart}
                            DragEnd={DragEnd}
                        />
                        {/* stock */}
                        <StockComponent
                            role='opponent'
                            Stock={OpponentStock}
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
                        {/* Backrow,CheckZone, ClimaxZone */}
                        <div className="row justify-content-center">
                            <ClimaxZoneComponent
                                role='player'
                                ClimaxZone={ClimaxZone}
                                DragStart={DragStart} 
                                DragOver={DragOver}
                                DragDrop={DragDrop} 
                                DragEnd={DragEnd}
                            />
                            <BackRowComponent
                                BackRow={BackRow}
                                DragStart={DragStart} 
                                DragOver={DragOver}
                                DragDrop={DragDrop} 
                                DragEnd={DragEnd}
                            />
                            <CheckZoneComponent
                                role='player'
                                CheckZone={CheckZone}
                                DragStart={DragStart} 
                                DragOver={DragOver}
                                DragDrop={DragDrop} 
                                DragEnd={DragEnd}
                            />
                        </div>
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
                            role='player'
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
                            role='player'
                            ReturnCardInDeckToHand={ReturnCardInDeckToHand}
                            DeckShuffle={DeckShuffle}
                        />
                        <WaitingRoomComponent
                            DragOver={DragOver} 
                            DragDrop={DragDrop} 
                            WaitingRoom ={WaitingRoom}
                            role='player'
                            ReturnToHand={ReturnToHand}
                            RefreshWaitingRoom={RefreshWaitingRoom}
                        />
                    </div>
                </div>           
            </div>
        </div>

        
    )
}

export default Board