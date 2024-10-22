function fetchResources() {
    fetch('/resources')
        .then(response => response.json())
        .then(data => {
            let output = '<h3>Resources:</h3><ul>';
            data.forEach(resource => {
                output += `<li>${resource.title}: ${resource.content}</li>`;
            });
            output += '</ul>';
            document.getElementById('output').innerHTML = output;
        })
        .catch(error => console.error('Error fetching resources:', error));
}

function checkAvailability() {
    fetch('/counselor/availability')
        .then(response => response.json())
        .then(data => {
            let message = data.available ? 
                'Counselor is available!' : 
                'Counselor is currently unavailable.';
            document.getElementById('output').innerHTML = `<h3>${message}</h3>`;
        })
        .catch(error => console.error('Error checking availability:', error));
}

function getCrisisHotlines() {
    fetch('/crisis/hotlines')
        .then(response => response.json())
        .then(data => {
            let output = '<h3>Crisis Hotlines:</h3><ul>';
            data.forEach(hotline => {
                output += `<li>${hotline.country}: ${hotline.number}</li>`;
            });
            output += '</ul>';
            document.getElementById('output').innerHTML = output;
        })
        .catch(error => console.error('Error fetching hotlines:', error));
}

function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('output').innerHTML = `<h3>${data.message}</h3>`;
    })
    .catch(error => console.error('Error registering:', error));
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('output').innerHTML = `<h3>${data.message}</h3>`;
    })
    .catch(error => console.error('Error logging in:', error));
}

function viewProfile() {
    fetch('/profile')
        .then(response => response.json())
        .then(data => {
            if (data.email) {
                document.getElementById('output').innerHTML = `<h3>Email: ${data.email}</h3>`;
            } else {
                document.getElementById('output').innerHTML = `<h3>${data.message}</h3>`;
            }
        })
        .catch(error => console.error('Error fetching profile:', error));
}

function logout() {
    fetch('/logout', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('output').innerHTML = `<h3>${data.message}</h3>`;
    })
    .catch(error => console.error('Error logging out:', error));
}
