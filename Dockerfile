version: '3.9'
services:
  besu:
    image: hyperledger/besu:latest
    command: --network=dev --rpc-http-enabled
    ports:
      - "8545:8545"
  registry:
    build: ./registry-service
    depends_on:
      - besu
  gateway:
    build: ./w3smtp-gateway
    ports:
      - "2525:2525"
    depends_on:
      - registry
  db:
    image: postgres:17
    environment:
      POSTGRES_PASSWORD: $secret
