const listElements=[];

let addToList = ()=>{
    if(txtBox.value!==""){
    listElements.push(txtBox.value);}
    displayList();
}
let displayList = () =>{
    let str="";
    listElements.forEach((value,index)=>{
        str+=`<ul><li>${value}
              <button onclick='deleteElements(${index})'><i class="bi bi-trash-fill"></i></button></li></ul><br><br>        
        `
    })
    list.innerHTML=str;
}
let deleteElements = (index) =>{
    delete listElements[index]
    displayList();
}
