document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    if (newUsername && newPassword) {
        alert('Signed up successfully!');
        window.location.href = '../WEB PAGE/web.html'; // Redirect to main page after signup
    } else {
        alert('Please fill in all fields.');
    }
});
