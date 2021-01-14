import React from 'react'
import Board from './component/Board'
import CardInfo from './component/CardInfo'
import Root from './component/Root'

//css
import './style/AppStyle.css'

function App() {
  return (
    <div className="container-fluid background">
      <div className="row">
        <CardInfo/>
        <Board/>
      </div>
      {/* <Root/> */}
    </div>
  )
}

export default App;
