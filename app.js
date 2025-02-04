const list = document.getElementById("list")
async function getData() {
    const res = await fetch ("https://restcountries.com/v3.1/all") 
    const data = await res.json()
    if(! res.ok || res.status !== 200) {
        throw new Error("xatolik")
    }
    return data
}
getData() 
    .then((data) => {
        render(data)
    })
    .catch((err) =>{
        console.log(err)
    })
    .finally(() => {
    ;
    });


let countries = []; 
function render(data) {
    const list = document.getElementById("list");
    list.innerHTML = ""; 

    if (data.length) {
        data.map((country) => {
            const div = document.createElement("div");
            div.classList.add("country-card");
            div.innerHTML = `
                <img src="${country.flags.svg}" width="260" height="160" alt="${country.flags.alt}" />
                <b>${country.name.common}</b> 
                <p><b>Population:</b> ${country.population}</p> 
                <p><b>Region:</b> ${country.region}</p>
                <a href="${country.maps.googleMaps}" target="_blank">Google Maps</a>
            `;
            list.append(div);
        });
    } else {
        list.innerHTML = "<p>No countries found</p>";
    }
}

function searchCountries(event) {
    const searchQuery = event.target.value.toLowerCase();
    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchQuery)
    );
    render(filteredCountries);
}

function filterByRegion(event) {
    const region = event.target.value;
    const filteredCountries = countries.filter(country => 
        region === "all" || country.region === region
    );
    render(filteredCountries);
}

document.getElementById("search").addEventListener("input", searchCountries);



function fetchCountries() {
  
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            countries = data;
            render(countries); 
        })
        .catch(error => console.error("Error fetching country data: ", error));
}

window.onload = fetchCountries;

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
      
        const button = document.querySelector('.btn1 button span');
        const img = document.querySelector('.btn1 button img'); 
        
        if (document.body.classList.contains('dark-mode')) {
            button.textContent = 'Light Mode';  
            img.src = './icon/Group 3 (2).svg'; 
        } else {
            button.textContent = 'Dark Mode'; 
            img.src = './icon/Group 3 (1).svg'; 
        }
    }
    