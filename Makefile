mm-up: ## Spin up the matchmaking services
			docker-compose up -d matchmaking-frontend matchmaking-backend matchmaking-database --build

mm-up-b: ## Spin up the matchmaking backend services
			docker-compose up -d matchmaking-backend matchmaking-database --build
