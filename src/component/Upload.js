import React,{useState} from 'react'
import firebase from '../firebase'
import axios from 'axios'

function Upload() {

    const [series,Setseries] = useState("Konosuba")
    const [name,Setname] = useState("")
    const [level,Setlevel] = useState(0)
    const [text,Settext] = useState("")
    const [cost,Setcost] = useState(0)
    const [counter,Setcounter] = useState(false)
    const [trigger,Settrigger] = useState("none")
    const [color,Setcolor] = useState("red")
    const [power,Setpower] = useState(null)
    const [soul,Setsoul] = useState(null)
    const [CharacterType,SetCharacterType] = useState(null)
    const [CardType,SetCardType] = useState("character")
    const [CardId,SetCardId] = useState("")
    const [image,Setimage] = useState(null)
    const [UploadProgress,SetUploagProgress] = useState(0)
    const [UploadSuccess,SetUploadSuccess] = useState(false)

    const HandleseriesSelected = (e)=>{
        Setseries(e.target.value)
    }
    const HandlenameChanged = (e)=>{
        Setname(e.target.value)
    }
    const HandletextChanged = (e)=>{
        Settext(e.target.value)
    }
    const HandlelevelSelected = (e)=>{
        Setlevel(parseInt(e.target.value))
    }
    const HandlecostChanged = (e)=>{
        Setcost(parseInt(e.target.value))
    }
    const HandlecounterSelected = (e)=>{
        Setcounter(e.target.value)
    }
    const HandletriggerSelected = (e)=>{
        Settrigger(e.target.value)
    }
    const HandlecolorSelected = (e)=>{
        Setcolor(e.target.value)
    }
    const HandlepowerChanged = (e)=>{
        Setpower(e.target.value)
    }
    const HandlesoulChanged = (e)=>{
        Setsoul(e.target.value)
    }
    const HandleCharacterTypeChanged = (e)=>{
        SetCharacterType(e.target.value)
    }
    const HandleCardTypeSelected = (e)=>{
        SetCardType(e.target.value)
    }
    const HandleCardIdChanged = (e)=>{
        SetCardId(e.target.value)
    }
    const HandleimageSelected = (e)=>{
        Setimage(e.target.files[0])
    }

    const submit=(e)=>{
        e.preventDefault()
        const storageRef = firebase.storage().ref('card/'+series+'/'+name)
        const task = storageRef.put(image)
        SetUploadSuccess(false)
        task.on('state_changed', function(snapshot){
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            SetUploagProgress(progress)
          }, function(error) {
            console.log(error)
          }, function() {
            SetUploagProgress(0)
            SetUploadSuccess(true)
          })

        let CardData = {
            series,
            name,
            level,
            text,
            cost,
            counter,
            trigger,
            color,
            power,
            soul,
            CharacterType,
            CardType,
            CardId
        }

        axios.post('http://localhost:5000/weissschwarz-f48e0/us-central1/app/card/addCard',CardData)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }

    const ClearAll = (e)=>{
        window.location.reload()
    }
    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 shadow-lg p-3 mb-5 bg-white rounded">
                    <div className="mb-3">
                        <label for="Series" className="form-label">Series</label>
                        <select className="form-select" id="series" onChange={HandleseriesSelected}>
                            <option value="Konosuba">Konosuba</option>
                            <option value="Slime">Slime</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" onChange={HandlenameChanged}/>
                    </div>
                    <div className="mb-3">
                        <label for="text" className="form-label">text</label>
                        <textarea class="form-control" id="text" rows="3" onChange={HandletextChanged} />
                    </div>
                    <div className="mb-3">
                        <label for="level" className="form-label">level</label>
                        <select className="form-select" id="level" onChange={HandlelevelSelected}>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="cost" className="form-label">cost</label>
                        <input type="text" className="form-control" id="cost" onChange={HandlecostChanged} />
                    </div>
                    <div className="mb-3">
                        <label for="counter" className="form-label">counter</label>
                        <select className="form-select"  id="counter" onChange={HandlecounterSelected}>
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="trigger" className="form-label">trigger</label>
                        <select className="form-select"  id="trigger" onChange={HandletriggerSelected}>
                            <option value="none">none</option>
                            <option value="choice">choice</option>
                            <option value="wind">wind</option>
                            <option value="flame">flame</option>
                            <option value="gold">gold</option>
                            <option value="bag">bag</option>
                            <option value="door">door</option>
                            <option value="switch">switch</option>
                            <option value="book">book</option>
                            <option value="arch">arch</option>
                            <option value="1soul">1soul</option>
                            <option value="2soul">2soul</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="color" className="form-label">color</label>
                        <select className="form-select"  id="color" onChange={HandlecolorSelected}>
                            <option value="red">red</option>
                            <option value="green">green</option>
                            <option value="yellow">yellow</option>
                            <option value="blue">blue</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="power" className="form-label">power</label>
                        <input type="text" className="form-control" id="power" onChange={HandlepowerChanged} />
                    </div>
                    <div className="mb-3">
                        <label for="soul" className="form-label">soul</label>
                        <input type="text" className="form-control" id="soul" onChange={HandlesoulChanged} />
                    </div>
                    <div className="mb-3">
                        <label for="CharacterType" className="form-label">CharacterType</label>
                        <textarea class="form-control" id="CharacterType" rows="3" onChange={HandleCharacterTypeChanged} />
                    </div>
                    <div className="mb-3">
                        <label for="CardType" className="form-label">CardType</label>
                        <select className="form-select"  id="CardType" onChange={HandleCardTypeSelected}>
                            <option value="character">character</option>
                            <option value="event">event</option>
                            <option value="climax">climax</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="CardId" className="form-label">CardId</label>
                        <input type="text" className="form-control" id="CardId" onChange={HandleCardIdChanged} />
                    </div>
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Card Image</label>
                        <input class="form-control" type="file" accept="image/*" id="formFile" onChange={HandleimageSelected}/>
                    </div>
                    {UploadProgress !== 0 && 
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{width: UploadProgress+"%"}} aria-valuenow={UploadProgress.toString()} aria-valuemin="0" aria-valuemax="100">{UploadProgress}%</div>
                        </div>
                    }
                    { !UploadSuccess ? "" : <div>Upload Success!</div>}
                    <div className="mb-3">
                        <button className="btn btn-primary" type="submit" onClick={submit}>Submit</button>
                        <button className="btn btn-danger" onClick={ClearAll}>Clear All!</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload