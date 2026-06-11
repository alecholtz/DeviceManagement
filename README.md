# DeviceManagement

A sample application for managin devices containing a minimal backend, MSSQL database, and Typescript frontend.

Environment configurations, authentication, and all CICD has been left out of the project as no context was provided for implmentation.

## Database Setup

1. Install MSSQL Server & SSMS
1. Connect to localhost
1. Run the 'DeviceManagementv0.1.0.sql' script
1. Using Visual Studio, run the schema compare against the database to verify the script ran successfully
1. Run the 'DataSeed.sql' script

## Backend Setup

1. Ensure .NET 9 is installed

## Frontend Setup

1. Open the Frontend folder in termal
1. Run 'npm install'

### Running the application

1. Using your chosen IDE, start the backend. Swagger should start automatically.
1. Open the frontend directory in a terminal
1. Run 'npm start'
1. Open http://localhost:5173/ in a browser
