let data = sessionStorage.getItem("token");
console.log(data);
let loginContainer = document.querySelector(".login");
let loggedIn = document.querySelector(".logged-in");
let loggedInPara = document.querySelector(".login-para");
let userContainer = document.querySelector("#user-info");
let profileBooks = document.querySelector("#profile-books");

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
    
    loggedInPara.innerText = "Welcome " + response.data.username;
    userContainer.innerHTML = `<h2>My Info</h2><p>Username: ${response.data.username} <br>
    Email: ${response.data.email}<br>
    User ID: ${id}<br>
    Created: ${createdAt.slice(0,10)}</p><br>`

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

            title.innerText = "Title: " + book.attributes.title;
            author.innerText = "Author: " + book.attributes.author;
            pages.innerText = "Number of pages: " + book.attributes.pages;
            review.innerText = "Review: " + book.attributes.review + "/10";
            username.innerText = "Username: " + book.attributes.users_permissions_user.data.attributes.username;
            email.innerText = "Email: " + book.attributes.users_permissions_user.data.attributes.email;
            genre.innerText = "Genre: " ;
            let cover = document.createElement("img");
            book.attributes.genres.data.forEach((x)=>{
                genre.innerText +=  x.attributes.genre + " ";
            })
           profileBooks.append(cover,title,author,pages,review, genre, username, email);
           
          
  
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
    
            title.innerText = "Title: " + audio.attributes.title;
            minutes.innerText = "Minutes: " + audio.attributes.minutes;
            review.innerText = "Review: " + audio.attributes.review + "/10";
            published.innerText = "Publishing date: " + audio.attributes.published;
            username.innerText = "Username: " + audio.attributes.users_permissions_user.data.attributes.username;
            email.innerText = "Email: " + audio.attributes.users_permissions_user.data.attributes.email;
            let genre = document.createElement("p");
            genre.innerText = "Genre: " ;
            let cover = document.createElement("img");
          
            audio.attributes.genres.data.forEach((x)=>{
                genre.innerText +=  x.attributes.genre + " ";
            })
            profileBooks.append(cover,title,minutes, review, published,genre, username, email);
       
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

checkUser();

let startBtn = document.querySelector("#start");

startBtn.addEventListener("click", ()=>{
    window.location.href = "./index.html"
})

let logoutBtn = document.querySelector("#logout-start");

logoutBtn.addEventListener("click", ()=>{
    sessionStorage.clear();
    window.location.href = "./index.html"  
})

