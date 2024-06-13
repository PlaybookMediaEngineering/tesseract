.PHONY: start-docker

start-docker:
	@echo "Starting Docker Desktop..."
	@open -a Docker
	@echo "Docker Desktop started."

.PHONY: stop-docker
stop-docker:
	@echo "Stopping Docker Desktop..."
	@pkill Docker
	@echo "Docker Desktop stopped."

.PHONY: docker-status
docker-status:
	@echo "Docker Desktop status:"
	@docker system info
	@echo "Docker Desktop status done."

.PHONY: exportenv
exportenv:
	@echo "Exporting environment variables..."
	@dotenv -e .env -- env
	@echo "Environment variables exported."

.PHONY: start-supabase
start-supabase:
	@echo "Starting Supabase..."
	@supabase start
	@echo "Supabase started."

.PHONY: stop-supabase
stop-supabase:
	@echo "Stopping Supabase..."
	@supabase stop
	@echo "Supabase stopped."

.PHONY: stop-and-restart-supabase
stop-and-restart-supabase:
	@echo "Stopping And Resetting Supabase..."
	@supabase stop --no-backup
	@echo "Supabase stopped."

.PHONY: supabase-migrate
supabase-migrate:
	@echo "Migrating Supabase..."
	@supabase db reset
	@echo "Supabase migrated."

.PHONY: supabase-diff
supabase-diff:
	@echo "Diffing Supabase..."
	@supabase db diff --schema public 
	@echo "Supabase diffed."

.PHONY: supabase-restart
supabase-restart: exportenv
	@echo "Restarting Supabase..."
	@supabase stop
	@supabase start
	@echo "Supabase restarted."