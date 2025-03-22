document.addEventListener("DOMContentLoaded", function () {
    setTimeout(async () => {
        await fetchPastHourData();
        fetchPredictionData();
    }, 500); // Small delay to ensure DOM is loaded
});

// Fetch past hour electricity data (for dashboard)
async function fetchPastHourData() {
    try {
        const response = await fetch("http://localhost:5000/past-hour");
        if (!response.ok) throw new Error("Failed to fetch past hour data");

        const data = await response.json();
        console.log("Past hour data received:", data);  // Debugging

        // Update UI with received values
        document.getElementById("consumption-value").textContent = `${data.Consumption[1]} MW`;
        document.getElementById("production-value").textContent = `${data.Production[1]} MW`;
        document.getElementById("coal-value").textContent = `${data.Coal[1]} MW`;
        document.getElementById("naturalgas-value").textContent = `${data.NaturalGas[1]} MW`;
        document.getElementById("nuclear-value").textContent = `${data.Nuclear[1]} MW`;
        document.getElementById("hydro-value").textContent = `${data.Hydro[1]} MW`;
        document.getElementById("wind-value").textContent = `${data.Wind[1]} MW`;
        document.getElementById("solar-value").textContent = `${data.Solar[1]} MW`;
        document.getElementById("biomass-value").textContent = `${data.Biomass[1]} MW`;

    } catch (error) {
        console.error("Error fetching past hour data:", error);
    }
}


// Fetch past 24 hours data and then use it to predict the next hour
async function fetchPredictionData() {
    try {
        const response = await fetch("http://localhost:5000/past-24-hours");
        if (!response.ok) throw new Error("Failed to fetch past 24-hour data");

        const pastData = await response.json();
        console.log("Past 24-hour data received:", pastData); // Debugging

        // Extract past 24-hour values
        const features = pastData.Consumption;

        // Ensure we have 24-hour data for prediction
        if (features.length !== 24) {
            console.error("Insufficient past data for prediction");
            return;
        }

        // Send request to prediction API
        const predictResponse = await fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ features: [features] }) // Send as nested array
        });

        if (!predictResponse.ok) throw new Error("Prediction API failed");

        const predictionData = await predictResponse.json();
        console.log("Prediction received:", predictionData); // Debugging

        // Update UI with predictions
        document.getElementById("consumption-value").textContent = predictionData.Consumption?.Prediction || "--";
        document.getElementById("production-value").textContent = predictionData.Production?.Prediction || "--";
        document.getElementById("prediction-value").textContent = predictionData.Nuclear?.Prediction || "--";

    } catch (error) {
        console.error("Error fetching prediction data:", error);
    }
}


// Refresh dashboard every minute
setInterval(fetchPastHourData, 60000);
