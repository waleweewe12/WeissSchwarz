import React from 'react'

//css
import '../style/CardInfo.css'

function CardInfo(){
    
    return(
        <div className="col-lg-3 col-md-2 col-sm-12" style={{float:"left"}}>
            {/* card image */}
            <div className="card" style={{width:"16rem"}}>
                <img src="https://images.littleakiba.com/tcg/card56952-large.jpg" className="card-img-top" alt="..."/>
            </div>
            {/* card text */}
            <div className="mt-3 cardtext">
                <p>【A】When this card is placed on Stage from Hand, you may place 3 cards from your top Deck into Waiting Room.</p>
                <p>【A】[(1) Place 1 Climax from Hand into Waiting Room] When this card is placed on Stage from Hand, you may pay the cost. If you did, choose 1 Climax from your Waiting Room, return it to Hand.</p>   
            </div>
        </div>
    )
}

export default CardInfo