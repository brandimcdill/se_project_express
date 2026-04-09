#!/bin/bash

# Set environment variables for testing
export JWT_SECRET='your-secret-key'
export PORT=3001
export NODE_ENV=test

# Make sure the database name is correct
export MONGO_URL='mongodb://127.0.0.1:27017/wtwr_db'

echo "Test configuration complete"
echo "JWT_SECRET=$JWT_SECRET"
echo "PORT=$PORT"
