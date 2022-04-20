let data = sessionStorage.getItem("token");
console.log(data);
let loginContainer = document.querySelector(".login");
let loggedIn = document.querySelector(".logged-in");
let loggedInPara = document.querySelector(".login-para");
let userContainer = document.querySelector("#user-info");
let profileBooks = document.querySelector("#profile-books");
let profileAudio = document.querySelector("#profile-audio");

//Funktion för att kolla vilken användare som är inloggad och skriva ut användarinfo + användarens 
//böcker och ljudböcker
const checkUser = async () => {
    let response = await axios.get("http://localhost:1337/api/users/me",
    {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    })
    console.log(response);
    let createdAt = response.data.createdAt;
    let id = response.data.id;
 
   console.log( createdAt.slice(0,10));
    
    loggedInPara.innerText = "Välkommen " + response.data.username;
    userContainer.innerHTML = `<h2>Användarinfo</h2><p>Användarnamn: ${response.data.username} <br>
   E-post: ${response.data.email}<br>
    Användar ID: ${id}<br>
    Datum för registrering: ${createdAt.slice(0,10)}</p><br>`

    let renderBooks = async () => {
        let bookResponse = await axios.get("http://localhost:1337/api/books?populate=*");
        let book = bookResponse.data.data;
        console.log(book);
    
        book.forEach(book => {
            if(id == book.attributes.users_permissions_user.data.id){
            let title = document.createElement("p");
            let author = document.createElement("p");
            let pages = document.createElement("p");
            let review = document.createElement("p");
            let username = document.createElement("p");
            let email = document.createElement("p");
            let genre = document.createElement("p");
            let listItem = document.createElement("li");
            title.classList.add("heading");

            title.innerText = "Titel: " + book.attributes.title;
            author.innerText = "Författare: " + book.attributes.author;
            pages.innerText = "Antal sidor: " + book.attributes.pages;
            review.innerText = "Betyg: " + book.attributes.review + "/10";
            username.innerText = "Användarnamn: " + book.attributes.users_permissions_user.data.attributes.username;
            email.innerText = "E-post: " + book.attributes.users_permissions_user.data.attributes.email;
            genre.innerText = "Genre: " ;
            let cover = document.createElement("img");
            book.attributes.genres.data.forEach((x)=>{
                genre.innerText +=  x.attributes.genre + " ";
            })
           listItem.append(cover,title,author,pages,review, genre);
           profileBooks.append(listItem);
          
  
            if(book.attributes.cover.data) {
            cover.src = "http://localhost:1337" + book.attributes.cover.data.attributes.url;
            }
    
    
        }
        });
    }

    let renderAudio = async () => {
        let audioResponse = await axios.get("http://localhost:1337/api/audios?populate=*");
        let audio = audioResponse.data.data;
        console.log(audio);
     
    audio.forEach(audio => {
        if(id == audio.attributes.users_permissions_user.data.id){
            console.log(audio.attributes.users_permissions_user.data.id)
            let title = document.createElement("p");
            let minutes = document.createElement("p");
            let review = document.createElement("p");
            let published = document.createElement("p");
            let username = document.createElement("p");
            let email = document.createElement("p");
            let listItem = document.createElement("li");
            title.classList.add("heading");
            title.innerText = "Titel: " + audio.attributes.title;
            minutes.innerText = "Längd i minuter: " + audio.attributes.minutes;
            review.innerText = "Betyg: " + audio.attributes.review + "/10";
            published.innerText = "Publicerad: " + audio.attributes.published;
            username.innerText = "Användarnamn: " + audio.attributes.users_permissions_user.data.attributes.username;
            email.innerText = "E-post: " + audio.attributes.users_permissions_user.data.attributes.email;
            let genre = document.createElement("p");
            genre.innerText = "Genre: " ;
            let cover = document.createElement("img");
          
            audio.attributes.genres.data.forEach((x)=>{
                genre.innerText +=  x.attributes.genre + " ";
            })
            listItem.append( cover,title,minutes, review, published,genre);
            profileAudio.append(listItem);
            if(audio.attributes.cover.data) {
            cover.src = "http://localhost:1337" + audio.attributes.cover.data.attributes.url;
            }
    
    
           
        }
        });
    }

if(data != null){
loggedIn.style.display = "block";
}

renderBooks();
renderAudio();

}
if (data == null){
    alert("Du måste vara inloggad för att använda denna sida")
    window.location.href = "./index.html"  
}
checkUser();

//funktion för att logga ut och skickas tillbaka till startsidan
let logoutBtn = document.querySelector("#logout");

logoutBtn.addEventListener("click", ()=>{
    sessionStorage.clear();
    window.location.href = "./index.html"  
})

