import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import ViewDeck from './ViewDeck';
import NewDeck from './NewDeck';
import Navbar from './Navbar';
import ViewCard from './ViewCard';

function Profile(){

    const [myDeck, setMyDeck] = useState([]);
    const [viewDeck, setViewDeck] = useState([]);

    const handleViewDeckClicked = (deckId) => {
        myDeck.forEach(item => {
            if(item.DeckId === deckId){
                setViewDeck(item);
            }
        })
    }

    useEffect(() => {
        async function loadMyDeck(){
            try {
                let token = localStorage.getItem('token');
                let response = await axios.post('http://localhost:5000/weissschwarz-f48e0/us-central1/app/deck/getDeck', {}, {
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Authorization': 'Bearer ' + token  
                    }
                })
                //get deck success
                console.log(response.data);
                if(response.data.status === 'success'){
                    setMyDeck(response.data.deck);
                }
            } catch (error) {
                //console.log(error);
                throw error;
            }
        }
        loadMyDeck();
    }, [])

    return(
        <>
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/MyDeck" />
                </Route>
                <Route exact path="/MyDeck">
                    <div 
                        className="row"
                        style={{
                            marginTop:'25px',
                            marginLeft:'10%',
                        }}
                    >
                        {myDeck.map((item, index) =>
                            <div
                                key={index}
                                className="card"
                                style={{
                                    width: "18rem",
                                }}
                            >
                                <img src={item.DeckImage} alt="..."/>
                                <p style={{textAlign:'center'}}>{item.DeckName}</p>
                                <Link to={"/MyDeck/" + item.DeckId}>
                                    <button 
                                        type="button" 
                                        className="btn btn-primary"
                                        style={{
                                            width:'100%',
                                        }}
                                        onClick={() => {handleViewDeckClicked(item.DeckId)}}
                                    >
                                        View Deck
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </Route>
                <Route exact path="/MyDeck/:deckId">
                    <ViewDeck viewDeck={viewDeck}/>
                </Route>
                <Route exact path="/NewDeck">
                    <NewDeck />
                </Route>
                <Route path="/NewDeck/:series">
                    <ViewCard />
                </Route>
                <Route path="/Friend">
                    <p>Friend</p>
                </Route>
                <Route path="/Invited">
                    <p>Invited</p>
                </Route>
            </Switch>
        </Router>
        </>
    )
}

export default Profile;

