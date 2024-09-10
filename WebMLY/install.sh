#!/bin/bash

echo "Installing backend dependencies..."
cd backend
npm install  # Install backend dependencies

echo -e "\n\nInstalling frontend dependencies..."
cd ../frontend
npm install  # Install frontend dependencies

echo -e "\n\nDependencies are installed."
