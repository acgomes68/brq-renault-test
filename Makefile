# Makefile for Docker NodeJS Postgres Redis

include .env

help:
	@echo ""
	@echo "usage: make COMMAND"
	@echo ""
	@echo "Commands:"
	@echo "  clean      Clean directories for reset"
	@echo "  update     Update Node dependencies with yarn"
	@echo "  install    Create and start containers"
	@echo "  uninstall  Stop and clear all services"
	@echo "  logs       Watch log output"
	@echo "  start      Start all containers"
	@echo "  stop       Stop all services"
	@echo "  restart    Restart all containers"
	@echo "  test       Test application"

init:
	@$(shell cp -n $(shell pwd)/frontend/web/app/composer.json.dist $(shell pwd)/frontend/web/app/composer.json 2> /dev/null)

clean:
	@rm -Rf ./frontend/data/db/mysql/*
	@rm -Rf ./frontend/web/app/vendor
	@rm -Rf ./frontend/web/app/composer.lock
	@rm -Rf ./frontend/web/app/doc
	@rm -Rf ./frontend/web/app/report
	@rm -Rf ./frontend/etc/ssl/*

update: init
	@docker run --rm -v $(shell pwd)/frontend/web/public:/app acgomes68/alpine-php-cli-composer:7.2.15 update

install: init
	@make start
	@make create-db
    @make migrations
    @make seeds

migrations:
    @docker run --rm -v $(shell pwd)/app:/app yarn sequelize db:migrate

seeds:
    @docker run --rm -v $(shell pwd)/app:/app yarn sequelize db:seed:all

uninstall:
	@make stop
	@make clean

start:
	@docker-compose up -d
	@make resetOwner

stop:
	@docker-compose down -v --remove-orphans

restart:
	@docker-compose restart
	@make resetOwner

logs:
	@docker-compose logs -f

test: code-sniff
	@docker-compose exec -T php ./app/vendor/bin/phpunit --colors=always --configuration ./app/
	@make resetOwner

resetOwner:
	@$(shell chown -Rf $(SUDO_USER):$(shell id -g -n $(SUDO_USER)) $(MYSQL_DUMPS_DIR) "$(shell pwd)/frontend/etc/ssl" "$(shell pwd)/frontend/web/app" 2> /dev/null)

.PHONY: clean test code-sniff init
