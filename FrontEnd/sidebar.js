let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
    
closeBtn.addEventListener("click", ()=>{
        sidebar.classList.toggle("open");
        menuBtnChange();//calling the function(optional)
      });      
    
searchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
        sidebar.classList.toggle("open");
        menuBtnChange(); //calling the function(optional)
      });
    
      // following are the code to change sidebar button(optional)
function menuBtnChange() {
       if(sidebar.classList.contains("open")){
         closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
       }else {
         closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
       }
      }

const goIndice = document.getElementById('goIndice'); //te lleva al indice
const goHistory = document.getElementById('goHistory'); //te lleva al history.html
const goImage = document.getElementById('goImage'); //te lleva al upload-image.html
const goSearch = document.getElementById('goSearch'); //te lleva al search.html
const goNews = document.getElementById('goNewa'); //redirecciona al NASA-news.html
const goApod = document.getElementById('goApod'); //te lleva a apod.html
const goAbout = document.getElementById('goAbout'); //te lleva a un about que todavia no esta
const LogOut = document.getElementById('LogOut'); //te log out
