function newDate(date){
    let d = new Date(date)
    let da =  d.getFullYear() +"-" + d.getMonth() + "-"+  d.getDate()  
    return da ;
}

const res = newDate("2021-11-27T14:59:54.000Z")

console.log(res)