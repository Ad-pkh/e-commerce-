const fs=require("fs");

const randomstring=(value)=>{
    const str="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const len=str.length;
    let random="";
    for(let i=0;i<value;i++){
        const position=Math.ceil(Math.random()*(len-1))
        random+=str[position]
    }
    return random;
}

//delete image when validation error
const filedelete=(path)=>{
    if(fs.existsSync(path)){
        fs.unlinkSync(path)

    }
}

module.exports={
    randomstring,
    filedelete
}