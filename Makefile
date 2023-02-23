CYAN=\033[36m
RESET=\033[0m

imbc-up: # Spin up the imbc services.
	@echo -e "$(CYAN)Starting imbc services...$(RESET)"
	@docker-compose up -d imbc-frontend imbc-backend imbc-database
	@echo -e "$(CYAN)Done.$(RESET)"

imbc-down: # Stop and remove all containers, images, and volumes.
	@echo -e "$(CYAN)Stopping imbc services...$(RESET)"
	@docker-compose down
	@echo -e "$(CYAN)Done.$(RESET)"

imbc-rebuild-frontend: # Rebuild imbc frontend image.
	@echo -e "$(CYAN)Rebuilding imbc frontend...$(RESET)"
	@docker-compose down imbc-frontend
	@docker rmi -f citz-imb-build-with-us-1_imbc-frontend
	@docker-compose up -d imbc-frontend
	@echo -e "$(CYAN)Done.$(RESET)"

imbc-rebuild-backend: # Rebuild imbc backend image.
	@echo -e "$(CYAN)Rebuilding imbc backend...$(RESET)"
	@docker-compose down imbc-backend
	@docker rmi -f citz-imb-build-with-us-1_imbc-backend
	@docker-compose up -d imbc-backend
	@echo -e "$(CYAN)Done.$(RESET)"

imbc-down-all: # Stop and remove all containers, images, and volumes.
	@echo -e "$(CYAN)Stopping imbc services...$(RESET)"
	@docker-compose down --rmi all imbc-frontend imbc-backend imbc-database
	@docker-compose rm -f -v -s
	@docker volume rm -f citz-imb-build-with-us-1_imbc-database-data
	@echo -e "$(CYAN)Done.$(RESET)"
	
imbc-npm-reset: # Remove and re-install npm packages.
	@echo -e "$(CYAN)Resetting npm packages...$(RESET)"
	@echo -e "$(CYAN)Frontend...$(RESET)"
	@cd imb-campus/frontend; rm -rf node_modules; npm i
	@echo -e "$(CYAN)Backend...$(RESET)"
	@cd imb-campus/backend; rm -rf node_modules; npm i
	@echo -e "$(CYAN)Done.$(RESET)"

imbc-reset: # Reset all containers, images, volumes. Reinstall npm packages. Then start up imbc services.
	make imbc-down-all
	make imbc-npm-reset
	make imbc-up

imbc-reset-skip-npm: # Reset all containers, images, volumes. Then start up imbc services.
	make imbc-down-all
	make imbc-up
