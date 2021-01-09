import React from 'react'
import Board from './component/Board'
import CardInfo from './component/CardInfo'
// import Child from './component/Child'
// import Root from './component/Root'
// import {useSelector,useDispatch} from 'react-redux'

//css
import './style/AppStyle.css'

function App() {

  return (
    <div className="container-fluid background">
      <div className="row">
        <CardInfo/>
        <Board/>
      </div>
    </div>
  )
}

export default App;
