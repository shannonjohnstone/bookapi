# bookapi
api for books - docker application

docker-compose -f docker-compose-production.yml up -d

docker build -t bookapi/prod -f ./Dockerfile.production .

docker push leighhalliday/rails-alpine

 heroku container:push production
