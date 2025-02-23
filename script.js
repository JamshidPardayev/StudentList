let inpName = document.getElementById("name");
let inpSurname = document.getElementById("surname");
let inpDate = document.getElementById("date");
let inpBall = document.getElementById("ball");
let resetBtn = document.getElementById("reset")
let submitBtn = document.getElementById("submit")
let form = document.querySelector("form")
let table = document.querySelector("table")
let addStudent = document.getElementById("addStudent")
let closeStudent = document.getElementById("closeStudent")
let users = [];
let currentIndex = null;

addStudent.addEventListener("click", function(){
    if (form.classList.toggle("active")) {
        addStudent.style.display = "block"
        addStudent.textContent = "Close Form Student";
        table.style.marginTop = "30px"
    } else {
        addStudent.textContent = "Add New Student";
        table.style.marginTop = "-300px"
    }
})



form.addEventListener("submit", function(event){
    event.preventDefault();
    check();
});
function check(){
    let count = 0;
    if(inpName.value.trim() != ""){
        count++;
    }
    if(inpSurname.value.trim() != ""){
        count++
    }
    if(inpDate.value.trim() != ""){
        count++
    }
    if(inpBall.value.trim() != ""){
        count++
    }
    if(count == 4){
        create();
    }
}

function create(){
    if(currentIndex !== null){
        users[currentIndex] = {
            name: inpName.value,
            surname: inpSurname.value,
            date: inpDate.value,
            ball: inpBall.value,
        };
        currentIndex = null;
    }
    else{
        users.push({
            name: inpName.value,
            surname: inpSurname.value,
            date: inpDate.value,
            ball: inpBall.value,
        })
    }
    localStorage.setItem("usersKey", JSON.stringify(users));
    read();
    resetForm();
}
(function () {
    users = JSON.parse(localStorage.getItem('usersKey'))
      ? JSON.parse(localStorage.getItem('usersKey'))
      : []
    read()
  })()
function read(){
    table.innerHTML = "";
    users.sort((a, b) => {
       return b.ball - a.ball;
    }  ).map((user, index) => {
        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.surname}</td>
                <td>${user.date}</td>
                <td>${user.ball}</td>
                <td><button onclick="deleteUser(${index})">Delete</button></td>
                <td><button onclick="updateUser(${index})">Update</button></td>
            </tr>
        `
    });
}
function deleteUser(index){
    users.splice(index, 1);
    localStorage.setItem("usersKey", JSON.stringify(users));
    read();
}
function updateUser(index){
    currentIndex = index;
    inpName.value = users[index].name;
    inpSurname.value = users[index].surname;
    inpDate.value = users[index].date;
    inpBall.value = users[index].ball;
    form.classList.add("active");
    addStudent.style.display = "block"
    addStudent.textContent = "Close Form Student";
    table.style.marginTop = "30px"
}
function resetForm(){
    inpName.value = "";
    inpSurname.value = "";
    inpDate.value = "";
    inpBall.value = "";
}
