import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import firebase from '../firebase';

function ViewDeck(props){

    const { deckId } = useParams();
    const [deck, setDeck] = useState([]);
    
    const getImageUrlByCardId = (cardId) => {
        axios.get()
    }

    useEffect(() => {
        async function loadDeckById(deckId){
            try {
                let response  = await axios.get('http://localhost:5000/weissschwarz-f48e0/us-central1/app/deck/getDeckByDeckId/' + deckId);
                console.log(response.data);
                if(response.data.status === 'success'){
                    setDeck(response.data.deck.CardIdList);
                }
            } catch (error) {
                console.log(error);
                throw error;
            }
            
        }
        loadDeckById(deckId);
    }, []);
    return(
        <>
            <div>
                {deck.map((item, index) => (
                    <div key={index}>
                        <img 
                            src={getImageUrlByCardId(item.cardId)} 
                            alt="..."
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default ViewDeck;