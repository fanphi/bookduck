let bookList = document.querySelector("#books");
let audioList = document.querySelector("#audio");

//funktion för att skriva ut alla vanliga böcker
let renderBooks = async () => {
    let response = await axios.get("http://localhost:1337/api/books?populate=*");
    let book = response.data.data;
    console.log(book);

    book.forEach(book => {
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
        genre.innerText = "Genre: ";
        let cover = document.createElement("img");
        console.log(book.attributes.genres.data)
        book.attributes.genres.data.forEach((x)=>{
            genre.innerText +=  x.attributes.genre + " ";
        })
        
       
        
         bookList.append(cover,title,author,pages, review, genre, username, email);
       
        if(book.attributes.cover.data) {
        cover.src = "http://localhost:1337" + book.attributes.cover.data.attributes.url;
        }


       
    });
}

let renderAudio = async () => {
    let response = await axios.get("http://localhost:1337/api/audios?populate=*");
    let audio = response.data.data;
    console.log(audio);

audio.forEach(audio => {
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

        let cover = document.createElement("img");
        let genre = document.createElement("p");
        genre.innerText = "Genre: " ;
        audio.attributes.genres.data.forEach((x)=>{
            genre.innerText +=  x.attributes.genre + " ";
        })
        
      

        if(audio.attributes.cover.data) {
        cover.src = "http://localhost:1337" + audio.attributes.cover.data.attributes.url;
        }
        audioList.append(cover,title,minutes, review, published, genre, username, email);

      
    });
}
//funktion för att logga in

let login = async () => {
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    let response = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: username,
        password,
    });

    let token = response.data.jwt;
    sessionStorage.setItem("token", token);

    location.reload();


}

//funktion för att registrera en ny användare

let newUser = document.querySelector("#username-new");
let newPassword = document.querySelector("#password-new");
let newEmail = document.querySelector("#email-new");


let register = async () => {

    let response = await axios.post(
        "http://localhost:1337/api/auth/local/register",
    {
        //body
        username: newUser.value,
        password: newPassword.value,
        email: newEmail.value
    });
    let token = response.data.jwt;
    console.log("Got the JWT!", token);
    sessionStorage.setItem("token", token)
    location.reload();
}



// loggar ut användaren
let logout = document.querySelector("#logout");

logout.addEventListener("click",() =>{
sessionStorage.clear();
location.reload();
})

// Kollar om användare är inloggad och ändar styling om användaren är inloggad
let data = sessionStorage.getItem("token");
console.log(data);
let loginContainer = document.querySelector(".login");
let loggedIn = document.querySelector(".logged-in");
let loggedInPara = document.querySelector(".login-para");



const checkMe = async () => {
    let response = await axios.get("http://localhost:1337/api/users/me",
    {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    })
    // user = response.data.username;
  
    console.log(response.data.username);
    loggedInPara.innerText = "Välkommen " + response.data.username;

if(data != null){
loginContainer.style.display = "none";
loggedIn.style.display = "block";
}
}

// let profileBtn = document.querySelector("#profile");

// profileBtn.addEventListener("click",()=>{
//     if (data != null){
//         window.location.href = "./profil.html"
   
//     }
  
// })


checkMe()
renderBooks()
renderAudio()
