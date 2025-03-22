# PowerSpring: Energy Dashboard & Forecasting System ⚡ 

## 📌 **Overview**  
PowerSpring is a web-based energy analytics and forecasting dashboard that displays power production insights from multiple energy sources — including solar, wind, hydroelectric, biomass, coal, oil & gas, and nuclear. A trained Recurrent Neural Network (RNN) model predicts future electricity demand and production based on 24-hour sequences of historical energy data.

This project integrates a deep learning model with a responsive dashboard built using HTML, CSS, and JavaScript, with Flask serving as the bridge between the frontend and the DL backend.


## 🚀 Features

- Real-time prediction of next-hour electricity consumption and production
- Production breakdown by energy source (solar, wind, hydro, etc.)
- Visual performance indicators with dynamic dashboard cards
- Clean, intuitive UI for quick energy insights
- Flask-based backend API to communicate with the DL model
- Postman used to test backend API endpoints


## 🧠 Deep Learning Model

A Recurrent Neural Network (RNN) was trained using a publicly available dataset from [Kaggle](https://www.kaggle.com/code/marianadeem755/forecasting-electricity-by-hour-rnn-vs-lstm), which includes:

- Total electricity consumption
- Total electricity production
- Hourly production by source (e.g., solar, wind, coal)

### ✅ Model Highlights

- **Model type:** RNN (Deep Learning)
- **Training Input:** 24-hour sequence of energy usage and production data
- **Output:**  
  - **Next-hour electricity consumption**
  - **Next-hour electricity production by source**
- **Performance:** R² Score: **88%**

Model was trained and evaluated in **Jupyter Notebook**, with full exploratory data analysis and visualizations.


## 💡 Energy Sources Tracked

The dashboard provides insights into the following energy types:

- 🔆 **Solar** – Sunlight and weather-based production prediction  
- 🌬️ **Wind** – Weather and historical trends used for prediction  
- 🌊 **Hydroelectric** – Water flow analysis for power generation  
- ⚛ **Nuclear** – Long-term stability and energy trend tracking  
- 🛢 **Oil & Gas** – Fossil fuel estimation based on market dynamics  
- 🪨 **Coal** – Forecasting with attention to resource efficiency  
- 🌱 **Biomass** – Sustainable source production monitoring  


## 🧰 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python, Flask
- **DL Environment:** Jupyter Notebook
- **Model Type:** Recurrent Neural Network (RNN)
- **Testing Tools:** Postman (API testing)

## 🎥 Demo Video
[![Watch the Demo](https://img.youtube.com/vi/r5lKiIhQjfo/maxresdefault.jpg)](https://www.youtube.com/watch?v=r5lKiIhQjfo)


## 🏗 Installation & Setup

### 🔧 Prerequisites

- Python 3.7+
- Flask
- Jupyter Notebook
- Postman (for API testing)

### 🚀 Steps to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/powerspring.git
   cd powerspring

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt

3. **Run the Flask server**
   ```bash
   python app.py

4. **Open the frontend**
   - Open main.html in your browser, or use a local server to serve it (e.g., Live Server extension in VS Code).

