import React,{useState} from 'react'
import Board from './component/Board'
import CardInfo from './component/CardInfo'
// import Child from './component/Child'
// import Root from './component/Root'
// import {useSelector,useDispatch} from 'react-redux'
import LogIn from './component/LogIn'
// import Upload from './component/Upload'
import axios from 'axios'
import firebase from './firebase'

//css
import './style/AppStyle.css'

function App() {

  const [playerName,SetplayerName] = useState("")
  const [playerDeck,SetplayerDeck] = useState([])
  const [playerCardtext,SetplayerCardtext] = useState([])
 
  const HandleplayerSubmitted = async (Childdata)=>{
      SetplayerName(Childdata)
      let deckplayerid = '7ada5f4a-9b4e-4266-86b3-ca4fac938b2a'

      if(Childdata !== 'butter'){
        deckplayerid = '2e105c7e-feef-49e2-be1f-8232c83cdf97'
      }
        //load player deck
      try {
        let playerDeck = await axios.post('http://localhost:5000/weissschwarz-f48e0/us-central1/app/deck/getDeck',{
              DeckId:deckplayerid
        })
        playerDeck = playerDeck.data.deck[0].CardIdList
        // load card in deck
        let allcarddata = []
        for(let i=0;i<playerDeck.length;i++){
            let carddata = await axios.post('http://localhost:5000/weissschwarz-f48e0/us-central1/app/card/getCard',{
              CardId:playerDeck[i].CardId
            }) 
            allcarddata.push(carddata.data.card[0]) 
        }
        //load card_url and card_text in deck
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
        //update deck in database
        const db = firebase.firestore()
        db.collection("board").doc(Childdata === 'butter' ? "1234" : "5678")
          .update({deck:allcardurl})
          .then(()=>{})
          .catch(err=>console.log(err))
      } catch (error) {
          console.log('error fom load player data ' + error)
      }
  }

  return (
    <div className="container-fluid background">
      {(playerName !== "" && playerDeck.length > 0) ?  
        <div className="row">
          <CardInfo/>
          <Board 
            playerDeck={playerDeck} 
            playerName={playerName}
            playerCardtext={playerCardtext}
          />
        </div> : ""
      }
      {playerName === "" ? <LogIn SetplayerName={HandleplayerSubmitted}/> : ""}
    
    </div>
  )
}

export default App;
