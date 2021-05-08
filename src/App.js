import React,{useState, useEffect} from 'react';
// import Board from './component/Board'
// import CardInfo from './component/CardInfo'
import LogIn from './component/LogIn';
import axios from 'axios';
import firebase from './firebase';
import Profile from './component/Profile';
import Upload from './component/Upload';
import Register from './component/Register';
import RegisterStatus from './component/RegisterStatus';
import ResetPassword from './component/ResetPassword';
import ResetPasswordStatus from './component/ResetPasswordStatus';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const [playerName,SetplayerName] = useState("")
  const [playerDeck,SetplayerDeck] = useState([])
  const [playerCardtext,SetplayerCardtext] = useState([])
  const [CardInfoImage,SetCardInfoImage] = useState("https://inwfile.com/s-l/z9w722.jpg")
  
  const HandleCardOver = (e)=>{
    let url = e.target.src
    if(!url.includes('empty_card.jpg'))
      SetCardInfoImage(url)  
  }
 
  const HandleplayerSubmitted = async (Childdata)=>{
      SetplayerName(Childdata)
      // let deckplayerid = '7ada5f4a-9b4e-4266-86b3-ca4fac938b2a'

      // if(Childdata !== 'butter')
      //   deckplayerid = '2e105c7e-feef-49e2-be1f-8232c83cdf97'
      //   //load player deck
      // try {
      //   let playerDeck = await axios.post('http://localhost:5000/weissschwarz-f48e0/us-central1/app/deck/getDeck',{
      //         DeckId:deckplayerid
      //   })
      //   playerDeck = playerDeck.data.deck[0].CardIdList
      //   // load card in deck
      //   let allcarddata = []
      //   for(let i=0;i<playerDeck.length;i++){
      //       let carddata = await axios.post('http://localhost:5000/weissschwarz-f48e0/us-central1/app/card/getCard',{
      //         CardId:playerDeck[i].CardId
      //       }) 
      //       allcarddata.push(carddata.data.card[0]) 
      //   }
      //   //load card_url and card_text in deck
      //   let allcardurl = []
      //   let allcardtext = []
      //   for(let i=0;i<allcarddata.length;i++){
      //       let storageRef = firebase.storage().ref('card/'+allcarddata[i].series)
      //       let url = await storageRef.child(allcarddata[i].name).getDownloadURL()
      //       allcardtext.push({
      //         url:url,
      //         text:allcarddata[i].text
      //       })
      //       playerDeck.forEach(item => {
      //         if(item.CardId === allcarddata[i].CardId){
      //           for(let j=0;j<item.count;j++){
      //             allcardurl.push(url)
      //           }
      //         }
      //       })
      //   }
      //   SetplayerDeck(allcardurl)
      //   SetplayerCardtext(allcardtext)
      //   //update deck in database
      //   const db = firebase.firestore()
      //   db.collection("board").doc(Childdata === 'butter' ? "1234" : "5678")
      //     .update({deck:allcardurl})
      //     .then(()=>{})
      //     .catch(err=>console.log(err))
      // } catch (error) {
      //     console.log('error from load player data ' + error)
      // }
  }

  useEffect(()=>{
    axios.post('http://localhost:5000/weissschwarz-f48e0/us-central1/app/signIn/auth', {}, {
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token')  
      }
    }).then((response) => {
      console.log(response.data);
      if(response.data.status === 'success'){
        HandleplayerSubmitted(response.data.username);
      }
    }).catch((error) => {
      console.log(error);
      throw error;
    })
  },[]);

  return (
    <div className="container-fluid">
      {/* {(playerName !== "" && playerDeck.length > 0)  &&  
        <div className="row">
          <CardInfo
            image={CardInfoImage}
            text={playerCardtext}
          />
          <Board 
            playerDeck={playerDeck} 
            playerName={playerName}
            playerCardtext={playerCardtext}
            HandleCardOver={HandleCardOver}
          />
        </div>
      } */}
      <Router>
        <Switch>
          {playerName !== '' ? <Route path="/" exact component={Profile}/> :
            <Route path="/" exact>
              <LogIn SetplayerName={HandleplayerSubmitted}/>
            </Route>
          }
          <Route path="/register" exact component={Register}/>
          <Route path="/register/:status" exact component={RegisterStatus}/>
          <Route path="/resetpassword" exact component={ResetPassword}/>
          <Route path="/resetpassword/:status/" exact component={ResetPasswordStatus}/>
          <Route path="/resetpassword/:status/:id" component={ResetPasswordStatus}/>
        </Switch>
      </Router>
      {/* <Upload/> */}
    </div>
  )
}

export default App;
