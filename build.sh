#!/bin/bash
# Load NVM and set Node.js version
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Use Node.js 20
nvm use 20

# Verify Node.js version
echo "Using Node.js version: $(node --version)"
echo "Using npm version: $(npm --version)"
echo "Node.js path: $(which node)"

# Clear any cached binaries
rm -rf node_modules/.cache 2>/dev/null || true

# Run the build
npm run build
