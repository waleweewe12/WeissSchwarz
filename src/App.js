import React,{useState,useEffect} from 'react'
import Board from './component/Board'
import CardInfo from './component/CardInfo'
// import Child from './component/Child'
// import Root from './component/Root'
// import {useSelector,useDispatch} from 'react-redux'
import LogIn from './component/LogIn'
import Upload from './component/Upload'
import axios from 'axios'
import firebase from './firebase'

//css
import './style/AppStyle.css'

function App() {

  const [playerName,SetplayerName] = useState("")
  const [playerrole,Setplayerrole] = useState("")
  const [OpponentDeck,SetOpponentDeck] = useState("")
  const [playerDeck,SetplayerDeck] = useState([])
  const [playerCardtext,SetplayerCardtext] = useState([])
  const [OpponentCardtext,SetOpponentCardtext] = useState([])
 
  const HandleplayerSubmitted = (Childdata)=>{
    if(Childdata === 'butter' ){
      Setplayerrole('player1')
    }else{
      Setplayerrole('player2')
    }
    SetplayerName(Childdata)
  }

  useEffect(()=>{
    async function loadData(){

      let deckopponentid = '2e105c7e-feef-49e2-be1f-8232c83cdf97'
      let deckplayerid = '7ada5f4a-9b4e-4266-86b3-ca4fac938b2a'

      if(playerrole !== 'player1'){
        deckopponentid = '7ada5f4a-9b4e-4266-86b3-ca4fac938b2a'
        deckplayerid = '2e105c7e-feef-49e2-be1f-8232c83cdf97'
      }
        Setplayerrole(playerrole)

        //load player data
        try {
          let playerDeck = await axios.post('http://localhost:5000/weissschwarz-f48e0/us-central1/app/deck/getDeck',{
                DeckId:deckplayerid
          })
          playerDeck = playerDeck.data.deck[0].CardIdList
          // console.log(playerDeck)
          let allcarddata = []
          for(let i=0;i<playerDeck.length;i++){
            let carddata = await axios.post('http://localhost:5000/weissschwarz-f48e0/us-central1/app/card/getCard',{
              CardId:playerDeck[i].CardId
            }) 
            allcarddata.push(carddata.data.card[0]) 
          }
          //console.log(allcarddata)
          let allcardurl = []
          let allcardtext = []
          for(let i=0;i<allcarddata.length;i++){
            let storageRef = firebase.storage().ref('card/'+allcarddata[i].series)
            let url = await storageRef.child(allcarddata[i].name).getDownloadURL()
            allcardtext.push({
              url:url,
              text:allcarddata[i].text
            })
            playerDeck.forEach(item => {
              if(item.CardId === allcarddata[i].CardId){
                for(let j=0;j<item.count;j++){
                  allcardurl.push(url)
                }
              }
            })
          }
          SetplayerDeck(allcardurl)
          SetplayerCardtext(allcardtext)
        } catch (error) {
          console.log('error fom load player data ' + error)
        }

        //load opponent data
        try {
          let opponentDeck = await axios.post('http://localhost:5000/weissschwarz-f48e0/us-central1/app/deck/getDeck',{
                DeckId:deckopponentid
          })
          opponentDeck = opponentDeck.data.deck[0].CardIdList
          // console.log(playerDeck)
          let allcarddata = []
          for(let i=0;i<opponentDeck.length;i++){
            let carddata = await axios.post('http://localhost:5000/weissschwarz-f48e0/us-central1/app/card/getCard',{
              CardId:opponentDeck[i].CardId
            }) 
            allcarddata.push(carddata.data.card[0]) 
          }
          //console.log(allcarddata)
          let allcardurl = []
          let allcardtext = []
          for(let i=0;i<allcarddata.length;i++){
            let storageRef = firebase.storage().ref('card/'+allcarddata[i].series)
            let url = await storageRef.child(allcarddata[i].name).getDownloadURL()
            allcardtext.push({
              url:url,
              text:allcarddata[i].text
            })
            opponentDeck.forEach(item => {
              if(item.CardId === allcarddata[i].CardId){
                for(let j=0;j<item.count;j++){
                  allcardurl.push(url)
                }
              }
            })
          }
          SetOpponentDeck(allcardurl)
          SetOpponentCardtext(allcardtext)
        } catch (error) {
          console.log('error fom load player data ' + error)
        }
    }
    loadData()
  },[playerName])

  useEffect(()=>{
    let data ={}
    if(playerrole === 'player1'){
      data={
        player1deck:playerDeck,
        player2deck:OpponentDeck
      }
    }else{
      data={
        player1deck:OpponentDeck,
        player2deck:playerDeck
      }
    }
    const db = firebase.firestore()
    db.collection("board").doc("1234")
    .update(data)
    .then(()=>{})
    .catch(err=>console.log(err))
  },[playerrole,OpponentDeck,playerDeck])

  return (
    <div className="container-fluid background">
      {(playerName !== "" && OpponentDeck.length > 0 && playerDeck.length > 0) ?  
        <div className="row">
          <CardInfo/>
          <Board 
            playerDeck={playerDeck} 
            opponentDeck={OpponentDeck}
            playerrole={playerrole}
            playerName={playerName}
            playerCardtext={playerCardtext}
            OpponentCardtext={OpponentCardtext}
          />
        </div> : ""
      }
      {playerName === "" ? <LogIn SetplayerName={HandleplayerSubmitted}/> : ""}
    
    </div>
  )
}

export default App;
