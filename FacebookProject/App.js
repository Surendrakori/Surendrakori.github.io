let divMenu = document.createElement("div");
let divContent=document.createElement("div");
divMenu.classList.add("divMenu");
divContent.classList.add("divContent");
let userId;
const validateUser =async () =>{
    userId = txtUserId.value;
    userName.innerHTML = await getName(userId);
    container.innerHTML="";
    let str= `
            <p onclick='showData(1)'><i class="bi bi-bookmarks-fill"></i>Feeds [ALL]</p>
            <p onclick='showData(2)'><i class="bi bi-file-earmark-post-fill"></i>My post</p>
            <p onclick='showData(3)'><i class="bi bi-journal-album"></i>My Albums</p>
            <p onclick='showData(4)'><i class="bi bi-person"></i>My Profile</p>    
            <p onclick='showData(5)'><i class="bi bi-door-open"></i>Logout</p>
            <p onclick='showData(6)'><i class="bi bi-ui-checks"></i>ToDo's</p>
    `;
    divMenu.innerHTML=str;
    container.append(divMenu);
    divContent.innerHTML = await getFeeds();
    container.append(divContent);
}
const fetchData = async (url) =>{
    const response = await fetch(url);
    const json = await response.json();
    return json;
}
const getName = async (id) =>{
    const url=`https://jsonplaceholder.typicode.com/users/${userId}`;
    const json= await fetchData(url);
    return json.name;
}
const getFeeds= async ()=>{
    const url="https://jsonplaceholder.typicode.com/posts";
    const json = await fetchData(url)
    let str="<div><h2>Feeds [All Feeds]<h2>";
    json.map((value)=>{
        str+=`<p><b>User : </b>${value.userId}<p>
        <p><b>Title : </b>${value.title}</p>
        <p><b>Body : </b>${value.body}</p>
        <p onclick=getComments(${value.id})>View Comments</p>
        `
    })
    str+="</div>";
    return str;
}
const showData = async (pageId)=>{
    if(pageId===1){
        divContent.innerHTML= await getFeeds();
    }
    else if(pageId===2){
        divContent.innerHTML= await getPosts();
    }
    else if(pageId===3){
        divContent.innerHTML= await getAlbums();
    }
    else if(pageId===4){
        divContent.innerHTML= await getProfile();
    }
    else if(pageId===5){
        location.reload();
    }
    else if (pageId===6){
        divContent.innerHTML= await getToDos();
    }
}
const getPosts= async (id)=>{
    const url=`https://jsonplaceholder.typicode.com/posts/?userId=${userId}`;
    const json = await fetchData(url)
    let str="<div><h2>Feeds [My Posts]<h2>";
    json.map((value)=>{
        str+=`<p><b>User : </b>${value.userId}<p>
        <p><b>Title : </b>${value.title}</p>
        <p><b>Body : </b>${value.body}</p>
        <p onclick=getComments(${value.id})>View Comments</p>
        `
    }) 
    str+="</div>";
    return str;
}
const getComments = async (postId) => {
    const url = `https://jsonplaceholder.typicode.com/comments/?postId=${postId}`;
    const json = await fetchData(url);
    let str = `<div><h2>View Comments on Post Id: ${postId}</h2>`;
    json.map((element) => {
      str += `<p><b>${element.email}:</b>
      ${element.body}</b>
      <hr>`;
    });
    str += "</div";
    divContent.innerHTML = str;
  };
  
  
const getAlbums = async () =>{
    const url=`https://jsonplaceholder.typicode.com/albums/?userId=${userId}`;
    const json = await fetchData(url) 
    let str="<div><h2> [My Albums]<h2>";
    json.map((value)=>{
        str+=`
        <p onclick='getPhotos(${value.userId})'><b>Title : </b>${value.title}</p>
        `
    })
    str+="</div>";
    return str;
}
const getPhotos = async (id) =>{
    const url=`https://jsonplaceholder.typicode.com/photos/?albumId=${userId}`;
    const json = await fetchData(url) 
    let str="<div><h2> [My photos]<h2>";
    json.map((value)=>{
        str+=`
        <a href="${value.url}"><img src="${value.thumbnailUrl}" onclick="getPhoto(${value.id})" width=250px height=250px></a>
        `
    })
    str+="</div>";
    return str;
}

const getProfile = async () =>{
    const url=`https://jsonplaceholder.typicode.com/users/${userId}`;
    const json = await fetchData(url) 
    let str="<div><h2>My Profile<h2>";
        str += `
        <p><b> User Name:</b>${json.username}</p>
        <p><b>Name:</b>${json.name}</p>
        <p><b>Email:</b>${json.email}</p>
        <p><b>Address:</b></br>
        <b>Suite:</b>${json.address.suit}
        <b>Street:</b>${json.address.street}
        <b>City:</b>${json.address.city}</p>
        `;
    str+="</div>";
    return str;
}
const getToDos= async () =>{
    const url=`https://jsonplaceholder.typicode.com/todos/?userId=${userId}`
    const json = await fetchData(url);
    let str = "<div> <h2>[ToDo's]</h2>";
    json.map((value)=>{
        str+=`
        <p><b>Title : </b>
        ${value.title}
        </p>
        <p><b>Completed : </b>`
        if(value.completed){ // For boolean 
       str+=` <input type='checkbox' checked></input>`
        }
            else {
       str+= `<input type='checkbox'></input>`
    }
        
    })
    str+="</div>";
    return str;
} 

