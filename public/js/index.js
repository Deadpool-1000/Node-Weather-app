const btn_search = document.querySelector('.submit');
const answer_box = document.querySelector('.answer');
const location_box = document.querySelector('.location');
const weather_img = document.querySelector('.weather-desc');
const results_div = document.querySelector('.results');
let foundData;
let userQuery;
let foundLocation;
btn_search.addEventListener('click', (e) => {
    
    answer_box.textContent = 'Loading....';
    location_box.textContent = '';
    weather_img.src='';
    weather_img.alt='';
    e.preventDefault();
    userQuery = document.getElementById('query').value;
    const url = `/weather?address=${userQuery}`;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return answer_box.textContent = "Error Invalid Location😭";

            } else {
                const {
                    sendData,
                    location,
                    src
                } = data;
                console.log(sendData);
                results_div.style.display='block';
                answer_box.textContent = `Forecast: ${sendData}`;
                location_box.textContent = `Location: ${location}`;
                weather_img.src = src;
                weather_img.alt="weather icon"
            }
        })
    });
});

function clearData() {
    results_div.style.display='none';
    document.getElementById('query').value = '';
}