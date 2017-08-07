# bookapi
api for books - docker application

docker-compose -f docker-compose-production.yml up -d

docker build -t bookapi/prod -f ./Dockerfile.production .

docker build -t bookapi.0.0.2 -f ./Dockerfile.production .

docker push leighhalliday/rails-alpine

 heroku container:push webtest -f ./Dockerfile.production


docker tag bookapi-prod.0.0.2 registry.heroku.com/limitless-lowlands-90529/bookapi.0.0.2
docker tag <image> registry.heroku.com/limitless-lowlands-90529/bookapi-prod.0.0.1

docker push registry.heroku.com/limitless-lowlands-90529/webnew


[registry.heroku.com/limitless-lowlands-90529/testweb]

docker-compose -f docker-compose.yml -f docker-compose-production.yml -p bookapi_prod up --build


docker tag bookapiprod_web registry.heroku.com/limitless-lowlands-90529/bookapiprod_web
