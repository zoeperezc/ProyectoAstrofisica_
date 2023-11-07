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

  const register = document.getElementById('signupForm');
  const logIn = document.getElementById('login');

  register.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const username = document.getElementById('username').value;
    const mail = document.getElementById('mail').value;
    const password_1 = document.getElementById('password_1').value;
    const password_2 = document.getElementById('password_2').value;

    fetch('http://localhost:3000/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        mail: mail,
        password: password_1,
        passwordConfirm: password_2,
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          // Redirige al usuario a la página de subir imágenes si el registro es exitoso
          window.location.href = "http://localhost:3000/upload-image";
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
  
      })
      .catch(error => {
        console.error(error);
      });

  logIn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.success) {
            window.location.href = "http://localhost:3000/upload-image";
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
