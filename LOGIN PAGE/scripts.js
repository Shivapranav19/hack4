document.getElementById('signupButton').addEventListener('click', function() {
    window.location.href = '../SIGNUP PAGE/signup.html'; // Redirect to signup page
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Example login credentials (username: user, password: pass)
    const validUsername = 'user';
    const validPassword = 'pass';

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === validUsername && password === validPassword) {
        alert('Logged in successfully!');
        window.location.href = '../WEB PAGE/web.html'; // Redirect to main page after successful login
    } else {
        alert('Invalid username or password. Please try again.');
    }
});
