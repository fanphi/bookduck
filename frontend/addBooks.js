let bookTitle = document.querySelector("#bookTitle");
let bookAuthor = document.querySelector("#bookAuthor");
let bookCover = document.querySelector("#bookCover");
let genre = document.querySelectorAll(".genres");
let pages = document.querySelector("#pages");
let review = document.querySelector("#review");

let audioTitle = document.querySelector("#audioTitle");
let audioPublished = document.querySelector("#published");
let audioCover = document.querySelector("#audioCover");
let audioGenre = document.querySelectorAll(".audioGenre");
let audioMinutes = document.querySelector("#minutes");
let audioReview = document.querySelector("#audioReview");

//funktion för att en inloggad användare ska lägga till en bok

let addBook = async () => {
    let user = await axios.get("http://localhost:1337/api/users/me",
    {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    })
   
        let values = [];
    for (let i = 0; i <genre.length; i++){
        if (genre[i].checked == true){
            values.push(genre[i].value)
        }
    }
    console.log(values);
         let img =document.querySelector("#bookCover").files;

    let imgData = new FormData();
    imgData.append("files", img[0])

    await axios.post("http://localhost:1337/api/upload", imgData).then( (response) => {

    
        axios.post("http://localhost:1337/api/books",{
            data: {
                        title: bookTitle.value,
                        author: bookAuthor.value,
                        pages: pages.value,
                        review: review.value,
                        cover: response.data[0].id,
                         genres: values,
                         users_permissions_user: user.data.id
    
            }
        },  {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }
        )}
        )}

// Funktion för att en inloggad användare ska kunna ladda upp en ljudbok
        
let addAudio = async () => {
    let user = await axios.get("http://localhost:1337/api/users/me",
    {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    })
   
        let values = [];
    for (let i = 0; i <audioGenre.length; i++){
        if (audioGenre[i].checked == true){
            values.push(audioGenre[i].value)
        }
    }
    console.log(values);
         let img = document.querySelector("#audioCover").files;

    let coverData = new FormData();
    coverData.append("files", img[0])

    await axios.post("http://localhost:1337/api/upload", coverData).then( (response) => {

    
        axios.post("http://localhost:1337/api/audios",{
            data: {
                        title: audioTitle.value,
                        published: audioPublished.value,
                        minutes: audioMinutes.value,
                        review: audioReview.value,
                        cover: response.data[0].id,
                         genres: values,
                         users_permissions_user: user.data.id
    
            }
        },  {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }
        )}
        )}
   
        let data = sessionStorage.getItem("token");
        let loggedIn = document.querySelector(".logged-in");
        let loggedInPara = document.querySelector(".login-para");
  
        //Visar vilken användare som är inloggad
        const checkUser = async () => {
            let response = await axios.get("http://localhost:1337/api/users/me",
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            })
            loggedInPara.innerText = "Välkommen " + response.data.username;

            if(data != null){
            loggedIn.style.display = "block";
            }
        }

        //Loggar ut användaren och skickar tillbaka till startsidan
        let logoutBtn = document.querySelector("#logout");

            logoutBtn.addEventListener("click", ()=>{
                sessionStorage.clear();
                window.location.href = "./index.html"  
            })


        checkUser();