mm-up: ## Spin up the matchmaking services
			docker-compose up --build -d matchmaking-frontend matchmaking-backend matchmaking-database 

mm-up-b: ## Spin up the matchmaking backend services
			docker-compose up --build -d matchmaking-backend matchmaking-database 
