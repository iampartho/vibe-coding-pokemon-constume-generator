
# PokéCostume AI 📸🤖

Welcome to PokéCostume AI! This fun web application lets you snap a photo with your webcam, choose your favorite first-generation Pokémon, and uses the power of AI to generate an image of you wearing a cheap, homemade-style costume of that Pokémon.

It's the perfect way to see what you'd look like if you threw together a last-minute Halloween costume of Bulbasaur or Pikachu!

![App Screenshot](https://storage.googleapis.com/aistudio-project-files/55a7353b-d3a3-455b-80a9-2f275e076628/2a2a0740-155e-4c75-8149-a352554e2d36)

## ✨ Features

-   **Live Webcam Capture**: Easily take a photo directly in your browser.
-   **Full Gen 1 Pokédex**: Choose from all 151 original Pokémon.
-   **AI-Powered Transformations**: Leverages Google's Gemini API to create unique costume images.
-   **Instant Results**: See your original photo side-by-side with the AI-generated one.
-   **Responsive Design**: Works smoothly on both desktop and mobile phone browsers.
-   **Re-roll & Retake**: Not happy? Generate a new costume for the same photo or retake your picture entirely.

---

## 🚀 Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

-   [Git](https://git-scm.com/) installed on your machine.
-   [Node.js](https://nodejs.org/) (which includes `npm`) installed. Version 18 or higher is recommended.
-   A **Google Gemini API Key**. You can get one for free from [Google AI Studio](https://aistudio.google.com/app/apikey).
-   A device with a webcam (laptop or phone).

### Installation & Setup

1.  **Clone the Repository**
    Open your terminal or command prompt and clone the project from GitHub:
    ```bash
    git clone https://github.com/your-username/pokecostume-ai.git
    cd pokecostume-ai
    ```
    *(Note: Replace `your-username/pokecostume-ai.git` with the actual repository URL)*

2.  **Install Dependencies**
    Install the necessary `npm` packages:
    ```bash
    npm install
    ```

3.  **Set Up Your API Key**
    The application needs your Gemini API key to work. Create a file named `.env` in the root of the project directory:
    ```bash
    touch .env
    ```
    Open the `.env` file and add your API key like this. Make sure you are using a project that is compatible with the Gemini API. (For this project, you will need to use a project with the "AI Platform" API enabled).
    ```
    API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```
    *This file is included in `.gitignore` to ensure your key is not accidentally committed to version control.*

4.  **Run the Development Server**
    Start the local development server. You will need a tool like `vite` to run this project. If you don't have it, you can install it with `npm install -g vite`.
    ```bash
    vite
    ```
    The terminal will show you a local URL, usually `http://localhost:5173`. Open this URL in your web browser.

---

## 📱 Using the App on Your Phone

You can easily run this on your phone's browser for a mobile experience.

1.  **Start the dev server** as described above. The terminal will output your local network IP address (e.g., `http://192.168.1.10:5173`).
2.  **Connect your phone** to the **same Wi-Fi network** as your computer.
3.  **Open the browser** on your phone (like Chrome or Safari).
4.  **Navigate to the network URL** shown in your terminal (e.g., `http://192.168.1.10:5173`).

The app will load, and you can use your phone's camera to take a picture!

---

## 🕹️ How to Use

1.  **Start Camera**: Click the "Start Camera" button.
2.  **Grant Permission**: Your browser will ask for permission to use your webcam. Click "Allow".
3.  **Take Photo**: Position yourself in the frame and click the "Take Photo" button.
4.  **Choose a Pokémon**: Select a Pokémon from the dropdown list.
5.  **Generate**: Click the "Generate" button. The AI will take a moment to create your image.
6.  **View Results**: Your original and new photos will appear side-by-side.
7.  **Try Again!**:
    -   Use the **"Generate New"** button to create a different costume with the same photo.
    -   Use the **"Retake Photo"** button to go back to the webcam view.
    -   Use **"Start Over"** to go back to the main screen.

---

## 🛠️ Technologies Used

-   **Frontend**: React, TypeScript
-   **Styling**: Tailwind CSS
-   **AI Model**: Google Gemini (`gemini-2.5-flash-image`)
-   **Build Tool**: Vite (recommended)
