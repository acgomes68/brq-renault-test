# Makefile for Docker NodeJS Postgres

include .env

help:
	@echo ""
	@echo "usage: make COMMAND"
	@echo ""
	@echo "Commands:"
	@echo "  clean      Clean directories for reset"
	@echo "  install    Create and start containers, create database, run migrations and seeds"
	@echo "  logs       Watch log output"
	@echo "  restart    Restart all containers"
	@echo "  start      Start all containers"
	@echo "  stop       Stop all services"
	@echo "  test       Run eslint and application unit tests "
	@echo "  uninstall  Stop and clear all services"
	@echo "  update     Update Node dependencies with yarn"

init:
	@docker run --rm -v $(shell pwd)/app:/app yarn install

clean:
	@docker-compose exec node yarn eslint --fix src --ext .js

createdb:
	@docker-compose exec postgres psql -U $(POSTGRES_USER) --command="CREATE DATABASE $(POSTGRES_DATABASE)" > /dev/null

install: init
	@make start
	@make createdb
	@make migrations
	@make seeds
	@make test

lint:
	@docker-compose exec node yarn eslint --fix src --ext .js

logs:
	@docker-compose logs -f

migrations:
	@docker-compose exec node yarn sequelize db:migrate

restart:
	@docker-compose restart

seeds:
	@docker-compose exec node yarn sequelize db:seed:all

start:
	@docker-compose up -d

stop:
	@docker-compose down -v --remove-orphans

test:
	@make lint
	@#make unit

uninstall:
	@make stop
	@make clean

unit:
	@docker-compose exec node yarn eslint --fix src --ext .js

update: init
	@docker run --rm -v $(shell pwd):/app acgomes68/alpine-node:latest yarn install && yarn upgrade

.PHONY: clean test init
