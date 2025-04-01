class CatFetcher {
    constructor(apiKey) {
        this.apiKey ="live_FDkCbFNEu4MQKmvu4P7zSoTQ3Tknntu3cqwtutIq8bASP7gsRozqMlgmiwObw1lR";
        this.apiUrl = "https://api.thecatapi.com/v1/images/search?include_breeds=true";
    
        
        // Select the necessary HTML elements
        this.button = document.getElementById("getCat");
        this.imageElement = document.getElementById("catImage");
        this.breedElement = document.getElementById("breedName");

        // Add event listener to the button
        this.button.addEventListener("click", () => this.getRandomCat());
    }

    getRandomCat() {
        // Fetch data from the API using the proxy and API key
        fetch(this.apiUrl, {
            headers: { "x-api-key": this.apiKey }
        })
        .then(response => response.json())  // Convert the response to JSON format
        .then(data => {
            const catData = data[0];  // Get the first object from the API response
            
            if (catData && catData.url) {
                this.imageElement.src = catData.url;  // Set image source to the cat image URL
            } else {
                console.error("No image URL found in API response:", catData);
            }

            // Display breed name if available, otherwise "Unknown Breed"
            this.breedElement.textContent = catData.breeds.length > 0 ? catData.breeds[0].name : "Unknown Breed";
        })
        .catch(error => {
            console.error("Error fetching cat:", error);
            this.breedElement.textContent = "Failed to fetch cat. Try again!";  // Display error message
        });
    }
}

// Create an instance of the CatFetcher class with your API key
const catApp = new CatFetcher("live_FDkCbFNEu4MQKmvu4P7zSoTQ3Tknntu3cqwtutIq8bASP7gsRozqMlgmiwObw1lR");
