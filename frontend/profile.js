let data = sessionStorage.getItem("token");
console.log(data);
let loginContainer = document.querySelector(".login");
let loggedIn = document.querySelector(".logged-in");
let loggedInPara = document.querySelector(".login-para");
let userContainer = document.querySelector("#user-info");

const checkUser = async () => {
    let response = await axios.get("http://localhost:1337/api/users/me",
    {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    })
    console.log(response);
    let createdAt = response.data.createdAt;
    // createdAt.toISOString();
   console.log( createdAt.slice(0,10));
    
    loggedInPara.innerText = "Welcome " + response.data.username;
    userContainer.innerHTML = `<p>Username: ${response.data.username} <br>
    Email: ${response.data.email}<br>
    User ID: ${response.data.id}<br>
    Created: ${createdAt.slice(0,10)}</p><br>
    <h2>My Books</h2>`

if(data != null){
loggedIn.style.display = "block";
}

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