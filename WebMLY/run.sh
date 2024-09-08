#!/bin/bash

# Function to stop the backend when Ctrl + C is pressed
cleanup() {
    echo -e "\n\nStopping backend..."
    kill $BACKEND_PID  # Kill the backend process
    exit 0  # Exit the script
}

# Set a trap to catch Ctrl + C (SIGINT) and call cleanup
trap cleanup SIGINT

# Ensure the logs directory exists
mkdir -p logs  # Create the logs directory if it doesn't exist

# Start the backend and log output/errors to separate files
echo "Starting backend..."
cd backend
node index.js > ../logs/backend.log 2>&1 &  # Logs both output and errors to backend.log
BACKEND_PID=$!  # Capture backend process ID

# Start the frontend
echo -e "\n\nStarting frontend..."
cd ../frontend
npm start 2>&1 | tee ../logs/frontend.log  # Show frontend logs in the terminal and save to a file

# Wait for frontend to finish, then kill backend
wait $BACKEND_PID
