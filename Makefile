project-up: ## Spins up and builds containers for the sandbox api
	@echo "Building containers..."
	docker-compose up -d --build --force-recreate

project-down: ## Stop and remove containers for the sandbox api
	@echo "Stopping and removing containers..."
	docker-compose down -v --rmi all

reload: ## Stop the dockerised API, and rebuilt it
	@echo "Reloading Sandbox API"
	make project-down
	make project-up

login-sandbox-api: ## Log into the sandbox api container
	docker-compose exec sandbox_api /bin/bash