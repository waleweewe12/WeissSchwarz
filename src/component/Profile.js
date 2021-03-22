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
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link to="/MyDeck">My Deck</Link>
                </li>
                <li className="nav-item">
                    <Link to="/NewDeck">+ New Deck</Link>
                </li>
                <li className="nav-item">
                    <Link to="/Friend">Friend</Link>
                </li>
                <li className="nav-item">
                    <Link to="/Invited">Invited</Link>
                </li>
            </ul>
            
            <Switch>
                <Route exact path="/">
                    <Redirect to="/Mydeck" />
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
                                <Link to={"/Mydeck/" + item.DeckId}>
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
                <Route path="/NewDeck">
                    <p>New Deck</p>
                </Route>
                <Route path="/Friend">
                    <p>Friend</p>
                </Route>
                <Route path="/Invited">
                    <p>Invired</p>
                </Route>
            </Switch>
        </Router>
        </>
    )
}

export default Profile;

