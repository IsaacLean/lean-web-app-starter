#!/bin/bash

# Basic Node.js Version

PREFIX="[🚀 init.sh]"

echo "${PREFIX} Beginning the initialization script..."

if [ "${NODE_ENV}" == "production" ]; then
    echo "${PREFIX} Installing production package dependencies..."
    npm ci
    echo "${PREFIX} Package dependency installation completed!"
elif [ -d "./node_modules" ]; then
    echo "${PREFIX} The node_modules directory already exists, so skip package dependency installation." 
else
    echo "${PREFIX} Installing all package dependencies..."
    npm install
    echo "${PREFIX} Package dependency installation completed!"
fi

if [ -f "./build/app.js" ]; then
    echo "${PREFIX} The build already exists, so skip the initial build process."
else
    echo "${PREFIX} Starting the build process..."
    npm run build
    echo "${PREFIX} Build process completed!"
fi

echo "${PREFIX} Initialization script completed!"
