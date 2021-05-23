console.log('Client side js loading');

const weatherform = document.querySelector('form');
const searchElement = document.querySelector('input');

const msg1 = document.getElementById('mesg1');
const meg2 = document.getElementById('mesg2');



weatherform.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = searchElement.value;

    msg1.textContent = 'Loading....';
    mesg2.textContent = "";

    fetch('http://localhost:3000/weather?address=' + location)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                mesg1.textContent = data.error;
                console.log(data.error);
                return;
            } else {
                mesg1.textContent = data.location;
                mesg2.textContent = data.forecast;
            }
        });
});