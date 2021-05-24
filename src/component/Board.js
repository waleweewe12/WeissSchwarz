import React,{useState,useEffect} from 'react';
//css
import style from '../style/BoardStyle';
//component
import WaitingRoomComponent from './WaitingRoom';
import DeckComponent from './Deck';
import MemoryComponent from './Memory';
import HandComponent from './Hand';
import ClockComponent from './Clock';
import FrontRowComponet from './FrontRow';
import BackRowComponent from './BackRow';
import LevelComponent from './Level';
import StockComponent from './Stock';
import CheckZoneComponent from './CheckZone';
import ClimaxZoneComponent from './ClimaxZone';
//firebase
import firebase from '../firebase';

function Board(props){

    //player data
    const [FrontRow,setFrontRow] = useState(['empty_card.jpg','empty_card.jpg','empty_card.jpg']);
    const [BackRow,setBackRow] = useState(['empty_card.jpg','empty_card.jpg']);
    const [Hand,setHand] = useState([]);
    const [Clock,setClock] = useState(['empty_card.jpg',
        'empty_card.jpg',
        'empty_card.jpg',
        'empty_card.jpg',
        'empty_card.jpg',
        'empty_card.jpg']);
    const [Stock,setStock] = useState([]);
    const [Level,setLevel] = useState([]);
    const [Deck,setDeck] = useState(props.playerDeck);
    const [WaitingRoom,setWaitingRoom] = useState([]);
    const [Memory,setMemory] = useState([]);
    const [CheckZone,setCheckZone] = useState([]);
    const [ClimaxZone,setClimaxZone] = useState([]);
    
    //update real-time player board
    const updateplayerdata = ()=>{
        const db = firebase.firestore();
        let data = {
            deck:Deck,
            backrow:BackRow,
            checkzone:CheckZone,
            climaxzone:ClimaxZone,
            clock:Clock,
            frontrow:FrontRow,
            hand:Hand,
            level:Level,
            memory:Memory,
            stock:Stock,
            waitingroom:WaitingRoom,
        };
        db.collection("board").doc(props.playerName === 'butter' ? "1234" : "5678").update(data)
        .then(()=>{})
        .catch(err=>console.log(err));
    }

    useEffect(updateplayerdata,[Deck,BackRow,CheckZone,ClimaxZone,Clock,
        FrontRow,Hand,Level,Memory,Stock,WaitingRoom,props.playerName]);
    
    //opponent data
    const [OpponentFrontRow,setOpponentFrontRow] = useState([]);
    const [OpponentBackRow,setOpponentBackRow] = useState([]);
    const [OpponentHand,setOpponentHand] = useState([]);
    const [OpponentClock,setOpponentClock] = useState([]);
    const [OpponentStock,setOpponentStock] = useState([]);
    const [OpponentLevel,setOpponentLevel] = useState([]);
    const [OpponentDeck,setOpponentDeck] = useState([]);
    const [OpponentWaitingRoom,setOpponentWaitingRoom] = useState([]);
    const [OpponentMemory,setOpponentMemory] = useState([]);
    const [OpponentCheckZone,setOpponentCheckZone] = useState([]);
    const [OpponentClimaxZone,setOpponentClimaxZone] = useState([]);
        
    useEffect(() => {
        const db = firebase.firestore();
        db.collection("board").doc(props.playerName === 'butter' ? "5678" : "1234")
        .onSnapshot(function(doc) {
            //console.log(doc.data())
            setOpponentBackRow(doc.data().backrow)
            setOpponentFrontRow(doc.data().frontrow)
            setOpponentHand(doc.data().hand)
            setOpponentClock(doc.data().clock)
            setOpponentStock(doc.data().stock)
            setOpponentLevel(doc.data().level)
            setOpponentDeck(doc.data().deck)
            setOpponentWaitingRoom(doc.data().waitingroom)
            setOpponentMemory(doc.data().memory)
            setOpponentCheckZone(doc.data().checkzone)
            setOpponentClimaxZone(doc.data().climaxzone)   
        }, function(error) {
            console.log(error)
        });
    }, [props.playerName]);

    /*Drag-Drop */
    const [src,setSrc] = useState("empty_card.jpg");
    const [drop,setDrop] = useState(false);
    const [swap,setSwap] = useState("");
    const [zone,setZone] = useState("");

    const DragStart = (e)=>{
        let zone = ['stock','level','waitingroom','deck','memory'];
        
        if(zone.includes(e.target.attributes['zone'].value)){
            setSrc(e.target.attributes['real_src'].value); // real_src
            setZone(e.target.attributes['zone'].value);
        }
        else if(!e.target.src.includes('empty_card.jpg')){
            setSrc(e.target.src);
            setZone(e.target.attributes['zone'].value);
        }
    }

    const DragOver = (e)=>{
        e.preventDefault();
    }

    const DragDrop = (e)=>{
        if(src !== 'empty_card.jpg'){
            let slot = ['hand','stock','level','waitingroom','deck','memory','checkzone','climaxzone'];
            let n = slot.indexOf(e.target.attributes['zone'].value); // check value in list ? number : -1
            if(n !== -1){
                let slot_array = [Hand,Stock,Level,WaitingRoom,Deck,Memory,CheckZone,ClimaxZone];
                let setslot_array = [setHand,setStock,setLevel,setWaitingRoom,setDeck,setMemory,setCheckZone,setClimaxZone];
                let Dummy = [...slot_array[n]];
                Dummy.push(src);
                setslot_array[n](Dummy);
            }else{
                let slot = ['frontrow','backrow','clock'];
                let slot_array = [FrontRow,BackRow,Clock];
                let setslot_array = [setFrontRow,setBackRow,setClock];
                n = slot.indexOf(e.target.attributes['zone'].value);
                let Dummy = [...slot_array[n]];
                setSwap(Dummy[parseInt(e.target.attributes[0].value)]); // swap card if card over in frontrow or backrow
                if(Dummy[parseInt(e.target.attributes[0].value)] !== 'empty_card.jpg' && (zone!=='frontrow' && zone!=='backrow')){ // add overed card in waiting room
                    WaitingRoom.push(Dummy[parseInt(e.target.attributes[0].value)]);;;
                }
                Dummy[parseInt(e.target.attributes[0].value)] = src;
                setslot_array[n](Dummy);
            }
            setSrc('empty_card.jpg');
            setDrop(true);
        }
    }
    const DragEnd = (e) =>{
        if(drop){
            if(e.target.attributes['zone'].value === 'frontrow'){
                let DummyFrontRow = [...FrontRow];
                DummyFrontRow[parseInt(e.target.attributes[0].value)] = swap;
                setFrontRow(DummyFrontRow);
            }else if(e.target.attributes['zone'].value === 'backrow'){
                let DummyBackRow = [...BackRow];
                DummyBackRow[parseInt(e.target.attributes[0].value)] = swap;
                setBackRow(DummyBackRow);
            }else if(e.target.attributes['zone'].value === 'clock'){
                let DummyClock = [...Clock];
                DummyClock[parseInt(e.target.attributes[0].value)] = 'empty_card.jpg';
                setClock(DummyClock);
            }else if(e.target.attributes['zone'].value === 'stock'){
                let DummyStock = [...Stock];
                DummyStock.pop();
                setStock(DummyStock);
            }else if(e.target.attributes['zone'].value === 'deck'){
                let DummyDeck = [...Deck];
                DummyDeck.pop();
                setDeck(DummyDeck);
            }else if(e.target.attributes['zone'].value === 'level'){
                let DummyLevel = [...Level];
                DummyLevel.pop();
                setLevel(DummyLevel);
            }else if(e.target.attributes['zone'].value === 'checkzone'){
                let DummyCheckZone = [...CheckZone];
                DummyCheckZone.splice(parseInt(e.target.attributes['index'].value),1);
                setCheckZone(DummyCheckZone);
            }else if(e.target.attributes['zone'].value === 'climaxzone'){
                let DummyClimaxZone = [...ClimaxZone];
                DummyClimaxZone.splice(parseInt(e.target.attributes['index'].value),1);
                setClimaxZone(DummyClimaxZone);
            }
            else{
                let DummyHand = [...Hand];
                DummyHand.splice(parseInt(e.target.attributes['index'].value),1);
                setHand(DummyHand);
            }
            setDrop(false); 
            setSwap('empty_card.jpg');
        }
    }
    const ReturnToHand = (index)=>{
        index = parseInt(index);
        let DummyHand = [...Hand];
        let DummyWaitingRoom = [...WaitingRoom];
        DummyHand.push(DummyWaitingRoom[index]);
        DummyWaitingRoom.splice(index,1);
        setHand(DummyHand);
        setWaitingRoom(DummyWaitingRoom);
    }

    const shuffle = (array,shuffle_array) =>{
        let n = array.length;
        let r = Math.floor(Math.random() * n);
        if(n === 0){
            return shuffle_array;
        }else{
            shuffle_array.push(array[r]);
            array.splice(r,1);
            shuffle(array,shuffle_array);
        }
    }

    const RefreshWaitingRoom = ()=>{
        console.log('refresh from Board');
        let Refresh = [...Deck,...WaitingRoom];
        let RefreshDeck = [];
        shuffle(Refresh,RefreshDeck);
        setDeck(RefreshDeck);
        setWaitingRoom([]);
    }

    const ReturnCardInDeckToHand = (index)=>{
        index = parseInt(index);
        let DummyDeck = [...Deck];
        let DummyHand = [...Hand];
        DummyHand.push(DummyDeck[index]);
        DummyDeck.splice(index,1);
        setDeck(DummyDeck);
        setHand(DummyHand);
    }

    const DeckShuffle = ()=>{
        let DummyDeck = [...Deck];
        let ShuffleDeck = [];
        shuffle(DummyDeck,ShuffleDeck);
        setDeck(ShuffleDeck);
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
                            HandleCardOver={props.HandleCardOver}
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
                            HandleCardOver={props.HandleCardOver}
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