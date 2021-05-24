import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, 
    Row,
    Col,
    Modal, 
    Button, 
    Table,
} from 'react-bootstrap';

export default () => {
    const { series } = useParams();
    const [cards, setCards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalItem, setModalItem] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5000/weissschwarz-f48e0/us-central1/app/card/getCardBySeriesName/' + series)
        .then((response) => {
            console.log(response.data.cards);
            let red_card = response.data.cards.filter(card => card.color === 'red');
            console.log(red_card);
            setCards(response.data.cards);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    const handleCardClicked = (card) =>{
        const characterOrder = [ 'name', 'CardId', 'color', 'level', 'cost', 'power', 'soul', 'trigger', 'CardType', 'CharacterType', 'cardUrl', 'text' ];
        const climaxOrder = [ 'name', 'CardId','color', 'trigger', 'CardType', 'cardUrl', 'text' ];
        const eventOrder = [ 'level', 'cost', 'name', 'CardId','color', 'trigger', 'CardType', 'cardUrl', 'text' ];
        const tableItem = {};
        if(card.CardType === 'character'){
            characterOrder.forEach(key => {
                tableItem[key] = card[key];
            });
        }else if(card.CardType === 'event'){
            eventOrder.forEach(key => {
                tableItem[key] = card[key];
            })
        }else{
            climaxOrder.forEach(key => {
                tableItem[key] = card[key];
            })
        }
        setModalItem(tableItem);
        setShowModal(true);
    }
    
    const handleModalClosed = () =>{
        setShowModal(false);
    }

    const addCardToDeck = (card) =>{
        console.log(card);
    }
    
    return(
        <>
            <Container style={{marginTop:'2%'}}>
                <Row>
                    <Col>
                        <img style={{width:'16rem'}} src="https://animekimi.com/wp-content/uploads/2020/01/cU4jHfo1Q9AEPnFqFqtuSA74gdi-185x278.jpg" alt="..."/>
                        <hr />
                    </Col>
                </Row>
                {['red', 'green', 'blue', 'yellow'].map((color, index) => (
                    <Row key={index}>
                        {cards.filter(value => value.color === color).map((value, index) => (
                            <img 
                                key={index} 
                                style={style.cardStyle} 
                                src={value.cardUrl} 
                                alt="..."
                                onClick={() => {handleCardClicked(value)}}
                            />
                        ))}
                    </Row>
                ))}
            </Container>
            <Modal 
                show={showModal} 
                aria-labelledby="contained-modal-title-vcenter" 
                onHide={handleModalClosed}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {modalItem.CardId} {modalItem.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                    <Row>
                        <Col xs={12} md={12} lg={6}>
                            <img style={{width:'16rem'}} src={modalItem.cardUrl} alt="..."/>
                        </Col>
                        <Col xs={12} md={12} lg={6}>
                            <Table striped bordered hover responsive>
                                <tbody>
                                    {Object.keys(modalItem).map((prop, index) =>(
                                        prop !== 'cardUrl' && prop !== 'name' && prop !== 'CardId' && prop !== 'text' &&
                                        <tr key={index}>
                                            <td>{prop}</td>
                                            <td>{modalItem[prop]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                        <Col>
                            <h2>text : </h2>
                            {Array.isArray(modalItem['text']) &&
                                modalItem['text'].map((value, index) => (
                                    <p key={index}>{value}</p>
                            ))}
                        </Col>
                    <Row>

                    </Row>

                    <Row className="justify-content-center">
                        <Col xs={6} md={4} lg={6}>
                            <Button 
                                variant="danger" 
                                style={{
                                    width:'100%', 
                                    marginTop:'20px'
                                }}
                                onClick={() => {addCardToDeck(modalItem)}}
                            >
                                เพิ่มลงเด็ค
                            </Button>
                        </Col>
                    </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleModalClosed}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

const style = {
    cardStyle:{
        width:'6rem', 
        padding:'0px',
        margin:'5px 5px',
    }
};