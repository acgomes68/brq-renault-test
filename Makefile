# Makefile for Docker NodeJS Postgres

include .env

NODE_UP := $(shell docker-compose ps | grep node)
POSTGRES_UP := $(shell docker-compose ps | grep postgres)

help:
	@echo ""
	@echo "usage: make COMMAND"
	@echo ""
	@echo "Commands:"
	@echo "  clean      Drop database and clean dependencies"
	@echo "  install    Create and start containers, create database, run migrations and seeds"
	@echo "  logs       Watch log output"
	@echo "  restart    Restart all containers"
	@echo "  start      Start all containers"
	@echo "  status     Show containers current status"
	@echo "  stop       Stop all services"
	@echo "  test       Run eslint and application unit tests "
	@echo "  uninstall  Stop and clear all services"
	@echo "  update     Update Node dependencies with yarn"

init:
	@docker run --rm -v $(shell pwd):/home/node/app acgomes68/alpine-node:latest yarn install && yarn upgrade

clean:
	@make node-up
	@docker-compose exec node rm -Rf app/node_modules

create-db:
	@make drop-db
	@docker-compose exec postgres psql -U $(POSTGRES_USER) --command="CREATE DATABASE $(POSTGRES_DATABASE)"

drop-db:
	@make postgres-up
	@docker-compose exec postgres psql -U $(POSTGRES_USER) --command="DROP DATABASE IF EXISTS $(POSTGRES_DATABASE);"
	# @make postgres-down

install: init
	@make start
	@make create-db
	@make migrations
	@make seeds
	@make test

lint:
	@docker-compose exec node yarn eslint --fix src --ext .js

logs:
	@docker-compose logs -f

migrations:
	@docker-compose exec node yarn sequelize db:migrate

node-up:
	@if [ "$(NODE_UP)" = '' ]; then\
		echo "Node is down";\
		docker-compose up -d node;\
	else\
		echo "Node is up";\
	fi;

node-down:
	@if [ "$(NODE_UP)" = '' ]; then\
		echo "Node is down";\
	else\
		echo "Node is up";\
        docker-compose down -v node;\
	fi;

postgres-down:
	@if [ "$(POSTGRES_UP)" = '' ]; then\
		echo "Postgres is down";\
	else\
		echo "Postgres is up";\
        docker-compose down -v postgres;\
	fi;

postgres-up:
	@if [ "$(POSTGRES_UP)" = '' ]; then\
		echo "Postgres is down";\
		docker-compose up -d postgres;\
	else\
		echo "Postgres is up";\
	fi;

restart:
	@docker-compose restart

seeds:
	@docker-compose exec node yarn sequelize db:seed:all

start:
	@docker-compose up -d

status:
	@docker-compose ps

stop:
	@docker-compose down -v --remove-orphans

test:
	@make lint
	@#make unit

uninstall:
	@make clean
	@make stop
	@make drop-db;

unit:
	@docker-compose exec node yarn eslint --fix src --ext .js

update: init


.PHONY: clean test init
