FROM node:12-alpine

ENV GRAPHQL_URL https://gql.nojus.me
ENV GRAPHQL_LOCAL_URL https://gql.nojus.me


# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
# RUN apk update && apk upgrade
# RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm install

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN env GRAPHQL_URL=${GRAPHQL_URL} GRAPHQL_LOCAL_URL=${GRAPHQL_LOCAL_URL} npm run build

# expose 5000 on container
EXPOSE 3000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000

# start the app
CMD [ "npm", "start" ]
