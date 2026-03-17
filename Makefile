SHELL := /bin/bash

NPM ?= npm
HOST ?= 0.0.0.0
PORT ?= 5173
DOCKER ?= docker
COMPOSE ?= docker compose

.PHONY: help install dev debug build preview lint clean docker-build docker-dev docker-watch docker-debug docker-down

help:
	@echo "Available targets:"
	@echo "  make install        Install dependencies"
	@echo "  make dev            Start local dev server"
	@echo "  make debug          Start dev server with Vite debug logs"
	@echo "  make build          Build production bundle"
	@echo "  make preview        Preview production build locally"
	@echo "  make lint           Run ESLint"
	@echo "  make clean          Remove build output"
	@echo "  make docker-build   Build Docker image"
	@echo "  make docker-dev     Start app with Docker Compose"
	@echo "  make docker-watch   Start app with Docker Compose watch mode"
	@echo "  make docker-debug   Start app with Docker Compose in debug mode"
	@echo "  make docker-down    Stop Docker Compose services"

install:
	$(NPM) install

dev:
	$(NPM) run dev -- --host $(HOST) --port $(PORT) --strictPort

debug:
	DEBUG=vite:* $(NPM) run dev -- --host $(HOST) --port $(PORT) --strictPort

build:
	$(NPM) run build

preview:
	$(NPM) run preview -- --host $(HOST) --port $(PORT) --strictPort

lint:
	$(NPM) run lint

clean:
	rm -rf dist

docker-build:
	$(DOCKER) build -t mitchou10-portfolio:dev .

docker-dev:
	$(COMPOSE) up app

docker-watch:
	$(COMPOSE) up --watch app

docker-debug:
	$(COMPOSE) up app-debug

docker-down:
	$(COMPOSE) down