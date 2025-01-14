#!/bin/bash

# Todo List Version

PREFIX="[🚀 (LJAS) init.sh]"

echo "${PREFIX} Starting the initialization script..."

# Navigate to script directory just in case working directory is not the same
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd $SCRIPT_DIR

# Read possible CLI flags
while [ $# -gt 0 ] ; do
    case $1 in
        --skip-env-file) SKIP_ENV_FILE=true ;;
        --skip-yarn) SKIP_YARN=true ;;
    esac

    shift
done

if [ "$SKIP_ENV_FILE" != "true" ]; then
    # Create .env file if it doesn't already exist
    if [ -f ".env.example" ]; then
        if [ ! -f ".env" ]; then
            cp .env.example .env
            echo "${PREFIX} New .env file was created."
        else
            echo "${PREFIX} Existing .env file was found, so skip the .env creation process."
        fi
    elif [ ! -f ".env" ]; then
        echo ".env file could not be created because .env.example was not found."
    fi
fi

if [ "$SKIP_YARN" != "true" ]; then
    if [ "${NODE_ENV}" == "production" ]; then
        # Always install Yarn dependencies if the environment is production
        echo "${PREFIX} Installing production Yarn dependencies..."
        yarn
        echo "${PREFIX} Yarn dependency installation completed!"
    elif [ -d "./node_modules" ]; then
        echo "${PREFIX} The node_modules directory already exists, so skip Yarn dependency installation."
    else
        # Install Yarn dependencies if node_modules doesn't exist and environment is not production
        echo "${PREFIX} Installing all Yarn dependencies..."
        yarn
        echo "${PREFIX} Yarn dependency installation completed!"
    fi
fi

echo "${PREFIX} Initialization script completed!"
