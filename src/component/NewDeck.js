import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";

function NewDeck(){

    const [allCardSeries, setAllCardSeries] = useState([]);
    const [allSeries, setAllSeries] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/weissschwarz-f48e0/us-central1/app/series/getAllSeries')
        .then((response) => {
            setAllSeries(response.data.series);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return(
        <>
            <Container>
                <Row>
                    {/* Display all series */}
                    {allSeries.map((value, index) => (
                        <Col key={index}>
                            <Link to={'NewDeck/' + value.seriesName}>
                                <img 
                                    src={value.seriesImage} 
                                    style={{ width:'18rem' }} 
                                    alt="..."
                                />
                            </Link>
                            <p>{value.seriesName}</p>
                        </Col>
                    ))
                    }
                    {/* Displays the cards according to the selected series. */}
                    {allCardSeries.map((value, index) => (
                        <Col md={1} key={index}>
                            <img 
                                src={value.cardUrl} 
                                style={{ width:'6rem' }} 
                                alt="..."
                            />
                        </Col>
                    ))
                    }
                </Row>
            </Container>
        </>
    )
}

export default NewDeck;