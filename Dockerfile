FROM node:20.11.1
WORKDIR /app-node
ARG PORT_BUILD=3333
ENV PORT=$PORT_BUILD
EXPOSE $PORT_BUILD
COPY package*.json ./
RUN npm install

COPY . .
CMD ["npm", "run", "start:dev"]
# ENTRYPOINT ["npm", "run", "start:dev"]