docker stop $(docker container ls -aq)
docker rm $(docker container ls -aq)
docker-compose up -d --build --force-recreate
sudo rm -rf api-ceiba/node_modules api-ceiba/package-lock.json
cd api-ceiba
npm i
npm run start

