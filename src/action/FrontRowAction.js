const FrontRow = (data) =>{
    if(data.type === 'opponent'){
        return{
            type:'opponent',
            FrontRow:data.FrontRow
        }
    }else{
        return{
            type:'player',
            FrontRow:data.FrontRow
        }
    }
}

export default FrontRow