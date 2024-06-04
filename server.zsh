#!/bin/bash
cd ./backend
npm i -y
node --watch server.js &
cd ../frontend
npm i -y
npm run build
