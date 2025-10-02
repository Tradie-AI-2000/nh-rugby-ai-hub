# Makefile for the AI Intelligence Hub

# Stop the development servers
stop:
	@echo "Stopping development servers..."
	@lsof -t -i:9003 | xargs kill -9 || true
	@lsof -t -i:4000 | xargs kill -9 || true
	@lsof -t -i:4033 | xargs kill -9 || true

# Clean install of dependencies
install:
	@echo "Performing clean install of dependencies..."
	rm -rf node_modules package-lock.json
	npm install

# Run both frontend and Genkit dev servers
dev: stop
	@echo "Starting Next.js and Genkit development servers..."
	npm run dev & npm run genkit:dev &

# Build the Next.js application for production
build:
	@echo "Building Next.js application..."
	npm run build

# Run the linter
lint:
	@echo "Running linter..."
	npm run lint

# Run the TypeScript type checker
typecheck:
	@echo "Running TypeScript type checker..."
	npm run typecheck

# Remove all generated files and dependencies
clean: stop
	@echo "Cleaning project..."
	rm -rf .next .genkit/cache .genkit/traces .genkit/traces_idx node_modules

# Git Operations
git-status:
	@echo "Checking Git status..."
	git status

git-add:
	@echo "Staging all changes..."
	git add .

git-commit:
	@echo "Committing changes..."
	@read -p "Enter commit message: " msg; \
	git commit -m "$$msg"

git-push:
	@echo "Pushing changes to remote..."
	git push origin main # Assuming 'main' branch and 'origin' remote

git-all: git-add git-commit git-push
	@echo "All Git operations completed."

.PHONY: stop install dev build lint typecheck clean git-status git-add git-commit git-push git-all