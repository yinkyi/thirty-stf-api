# Makefile

include .env

.PHONY: build start stop clean

# Default service is empty
SERVICE :=

build:
	docker compose -f docker-compose.${NODE_ENV}.yml build --no-cache $(SERVICE)

start:
	docker compose -f docker-compose.${NODE_ENV}.yml up --detach $(SERVICE)

down:
	docker compose -f docker-compose.${NODE_ENV}.yml down $(SERVICE)

clean:
	docker compose -f docker-compose.${NODE_ENV}.yml down --volumes --remove-orphans $(SERVICE)

stop:
	docker compose -f docker-compose.${NODE_ENV}.yml rm --stop --force $(SERVICE)
