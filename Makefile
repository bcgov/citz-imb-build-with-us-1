imbc-up: ## Spin up the imb campus services
			docker-compose up --build -d imbc-frontend imbc-backend imbc-database 

imbc-up-b: ## Spin up the imb campus backend services
			docker-compose up --build -d imbc-backend imbc-database 
