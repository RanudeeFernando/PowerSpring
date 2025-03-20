document.addEventListener("DOMContentLoaded", function () {
    fetchPredictionData();
});

function fetchPredictionData() {
    fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            features: [[4772.98, 5140.37, 1359.83, 460.59, 1334.05, 392.90, 473.32, 0.00, 62.98]]
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("consumption-value").textContent = data.Consumption.Prediction || "--";
        document.getElementById("production-value").textContent = data.Production.Prediction || "--";
        document.getElementById("prediction-value").textContent = data.Nuclear.Prediction || "--";
    })
    .catch(error => console.error("Error fetching data:", error));
}
