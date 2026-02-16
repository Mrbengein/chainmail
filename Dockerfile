version: "3.9"

services:

  besu:
    image: hyperledger/besu:latest
    command: >
      --network=dev
      --rpc-http-enabled
      --rpc-http-api=ETH,NET,WEB3
    ports:
      - "8545:8545"

  registry:
    build: ./registry-service
    environment:
      RPC_URL: http://besu:8545
    depends_on:
      - besu

  gateway:
    build: ./gateway
    ports:
      - "2525:2525"
    depends_on:
      - registry

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: $secret

  message:
    build: ./message-service
    depends_on:
      - db
