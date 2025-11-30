# 4330_Project_LaCulture

LaCulture 
A webapp showcasing the riches of Louisiana culture and getting users in touch with cultural experiences around the state.

SETUP: 

### 1. Clone the Repository

git clone https://github.com/LandonW-CSC-LSU/4330_Project_LaCulture.git
cd 4330_Project_LaCulture

### 2. Set Up the Backend (API)

cd LaCulture_API

# Restore dependencies
dotnet restore

# Apply database migrations
dotnet ef database update

# Run the API (runs on https://localhost:5189)
dotnet run

The API will be available at `https://localhost:5189`

### 3. Set Up the Frontend (UI)

Open a new terminal:

cd LaCulture_UI

# Install dependencies
npm install

# Run the development server (runs on http://localhost:4200)
npm start

The application will be available at `http://localhost:4200`
