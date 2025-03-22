document.addEventListener("DOMContentLoaded", function () {
    // ====== TOP DASHBOARD: HARDCODED VALUES + PROGRESS + STATUS ======
    const consumption = 2000;
    const production = 4970;

    document.getElementById("gen-consumption-value").textContent = consumption + " MW";
    document.getElementById("gen-production-value").textContent = production + " MW";

    const maxCapacity = 7000;
    const consumptionPercent = (consumption / maxCapacity) * 100;
    const productionPercent = (production / maxCapacity) * 100;

    document.getElementById("consumption-progress").style.width = `${consumptionPercent}%`;
    document.getElementById("production-progress").style.width = `${productionPercent}%`;

    function setStatus(percent, statusEl) {
        if (percent < 30) {
            statusEl.textContent = "Low";
            statusEl.className = "badge low";
        } else if (percent < 60) {
            statusEl.textContent = "Normal";
            statusEl.className = "badge normal";
        } else if (percent < 85) {
            statusEl.textContent = "High";
            statusEl.className = "badge warning";
        } else {
            statusEl.textContent = "Critical";
            statusEl.className = "badge critical";
        }
    }

    setStatus(consumptionPercent, document.getElementById("consumption-status"));
    setStatus(productionPercent, document.getElementById("production-status"));

    // ====== FORECAST SECTION: SHOW ON FETCH BUTTON CLICK ======
    const forecastContainer = document.querySelector(".prediction-container");
    const fetchBtn = document.getElementById("fetch-btn");

    fetchBtn.addEventListener("click", function () {
        const features = [[
            [5323, 6668, 1392, 1673, 1934, 1086, 516, 0, 65], 
            [4998, 6174, 1393, 1246, 1794, 1127, 548, 0, 64], 
            [4860, 5939, 1391, 1009, 1835, 1103, 537, 0, 64], 
            [4668, 5592, 1393, 841, 1715, 1032, 546, 0, 64], 
            [4653, 5524, 1393, 773, 1723, 1028, 542, 0, 64], 
            [4735, 5363, 1391, 702, 1695, 1005, 505, 0, 65], 
            [4725, 5356, 1392, 576, 1810, 1012, 502, 0, 64], 
            [4761, 5492, 1392, 447, 2068, 1002, 469, 54, 65], 
            [4760, 5463, 1390, 249, 2044, 1005, 454, 256, 63], 
            [4651, 5120, 1398, 118, 1552, 1017, 469, 498, 64], 
            [4458, 4709, 1392, 104, 1085, 970, 437, 655, 64], 
            [4563, 5609, 1394, 426, 1296, 889, 452, 749, 64], 
            [4430, 5609, 1395, 462, 1130, 672, 451, 794, 64], 
            [4428, 5577, 1396, 414, 983, 670, 452, 777, 64], 
            [4083, 3824, 1393, 126, 564, 569, 418, 689, 63], 
            [4145, 3715, 1392, 141, 508, 573, 439, 597, 65], 
            [4859, 5498, 1395, 528, 1368, 731, 523, 424, 64], 
            [5172, 5761, 1395, 556, 1760, 917, 539, 232, 64], 
            [5424, 6228, 1395, 555, 2219, 918, 548, 47, 65], 
            [5618, 5902, 1398, 505, 2294, 1012, 620, 6, 65], 
            [6107, 6205, 1395, 671, 2389, 1037, 645, 0, 66], 
            [5991, 5855, 1395, 868, 2201, 705, 621, 0, 66], 
            [5527, 5726, 1393, 908, 2088, 648, 622, 0, 66], 
            [5111, 5551, 1391, 1011, 1845, 633, 607, 0, 66]
        ]];

        fetchPredictionData(features);
        forecastContainer.classList.remove("hidden"); // Reveal cards
    });
});

function fetchPredictionData(featuresArray) {
    fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: featuresArray })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Prediction Data:", data);
        Object.keys(data).forEach(source => {
            const value = data[source].Prediction;
            const confidence = data[source].Confidence;

            const valueEl = document.getElementById(source.toLowerCase() + "-value");
            const confidenceEl = document.getElementById(source.toLowerCase() + "-confidence");

            if (valueEl) valueEl.textContent = value;
            if (confidenceEl) confidenceEl.textContent = `Confidence: ${confidence}`;
        });
    })
    .catch(error => console.error("Error fetching data:", error));
}
