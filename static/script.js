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
