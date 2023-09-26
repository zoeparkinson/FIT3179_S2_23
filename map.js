// Function to load data and create the map
function createMap() {
    
    // Load your CSV data
    fetch('matches_1991_2023.csv')
        .then(response => response.text())
        .then(csvData => {
            const rows = csvData.split('\n'); // Split the CSV into rows
            const header = rows[0].split(','); // Extract column names
            const countryIndex = 0; // Assuming country is in the first column

            // Initialize an object to store country counts
            const countryCounts = {};
           
            // Process each row (skip the header row)
            for (let i = 1; i < rows.length; i++) {
                const columns = rows[i].split(',');

                // Extract the country name from the first column
                const country = columns[countryIndex];

                // Update the country count
                countryCounts[country] = (countryCounts[country] || 0) + 1;
            }

            // Convert the country counts object into an array of objects
            const data = Object.entries(countryCounts).map(([country, count]) => ({
                Country: country,
                Count: count
            }));
            

            // Load the Vega-Lite specification from the separate JSON file
            fetch('map.json')
                .then(response => response.json())
                .then(spec => {
                    // Merge the specification with the data
                    spec.data.values = data;

                    // Embed the visualization in the "map" div
                    vegaEmbed('#map', spec);
                })
                .catch(error => {
                    console.error("Error loading Vega-Lite specification:", error);
                });
        })
        .catch(error => {
            console.error("Error loading data:", error);
        });
}

// Call the createMap function when the page loads
window.addEventListener('load', createMap);
