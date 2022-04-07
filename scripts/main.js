// Selectors
const form = document.querySelector('form');
const card = document.querySelector('.weather-card');
const details = document.querySelector('.weather-details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img')

// Event Listeners
form.addEventListener('submit',updateUI)


// Functions
function displayUI(data){
    // Object destructuring
    const { cityDetails , weatherDetails } = data;

    // Update image and icon
    let timeSrc = weatherDetails.IsDayTime ? 'https://img.freepik.com/free-vector/blank-sky-daytime-scene-with-blank-flood-landscape_1308-58059.jpg?size=626&ext=jpg&ga=GA1.1.521247047.1649295112' : 'https://img.freepik.com/free-vector/night-forest_1308-69877.jpg?size=626&ext=jpg&ga=GA1.1.521247047.1649295112';
    time.setAttribute('src',timeSrc);

    // set icon
    const iconSrc = `icons/${weatherDetails.WeatherIcon}.svg`
    icon.setAttribute('src',iconSrc);


    details.innerHTML = 
    `
    <h5>${cityDetails.EnglishName}</h5>
    <h4>${weatherDetails.WeatherText}</h4>
    <h2><span>${weatherDetails.Temperature.Metric.Value}</span> &deg;C</h2>
    `

    if(card.classList.contains('hidden')){ card.classList.remove('hidden')}
}

async function updateCity(city){
    const cityDetails = await getCity(city);
    const weatherDetails = await getWeather(cityDetails.Key);

    return {cityDetails,weatherDetails}
}

function updateUI(e){
    // Prevent default action
    e.preventDefault();

    //get city value
    const city = form.city.value.trim().toLowerCase();
    form.reset();

    //update city
    updateCity(city)
        .then(data => displayUI(data))
        .catch(err => console.log(err));
}
