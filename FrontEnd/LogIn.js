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
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('mail').value;
  const password_1 = document.getElementById('password_1').value;
  const password_2 = document.getElementById('password_2').value;

  fetch('/api/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ mail, password })
})
.then(response => response.json())
.then(data => {
    if (data.message === "Login successful") {
        const message = document.getElementById('message');
        message.innerHTML = `¡Bienvenido, ${data.user.username}!`;
    } else {
        const message = document.getElementById('message');
        message.innerHTML = data.message;
    }
})
.catch(error => {
    console.error(error);
});

});