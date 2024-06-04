#!/bin/zsh

function finish {
  pids=$(jobs -p)

  for pid in $pids; do
    kill $pid
  done

  wait
}

trap finish SIGINT
cd ./backend
npm i -y
node --watch server.js &
cd ../frontend
npm i -y
npm run dev &
xdg-open http://localhost:5173
wait
