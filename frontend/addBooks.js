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