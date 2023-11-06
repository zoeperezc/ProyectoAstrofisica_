$(function() {
    $(".btn").click(function() {
      $(".form-signin").toggleClass("form-signin-left");
      $(".form-signup").toggleClass("form-signup-left");
      $(".frame").toggleClass("frame-long");
      $(".signup-inactive").toggleClass("signup-active");
      $(".signin-active").toggleClass("signin-inactive");
      $(".forgot").toggleClass("forgot-left");
      $(this).removeClass("idle").addClass("active");
    });
  
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      .then(response => response.json())
      .then(data => {
        const message = document.getElementById('message');
        if (data.message === "Login successful") {
          message.innerHTML = `¡Bienvenido, ${data.user.username}!`;
        } else {
          message.innerHTML = data.message;
        }
      })
      .catch(error => {
        console.error(error);
      });
    });
  });

  document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password_1 = document.getElementById('password_1').value;
    const password_2 = document.getElementById('password_2').value;

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      const message = document.getElementById('message');
      if (data.message === "Login successful") {
        message.innerHTML = `¡Bienvenido, ${data.user.username}!`;
      } else {
        message.innerHTML = data.message;
      }
    })
    .catch(error => {
      console.error(error);
    });
  });
 

const username = document.getElementById('username').value;
const password = document.getElementById('password').value;
const email = document.getElementById('mail').value;
const password_1 = document.getElementById('password_1').value;
const password_2 = document.getElementById('password_2').value;