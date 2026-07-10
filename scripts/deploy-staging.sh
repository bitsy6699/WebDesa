#!/usr/bin/env bash

# -----------------------------------------------------------------------------
# deploy-staging.sh
# 
# Automated deployment script for staging environment.
# -----------------------------------------------------------------------------

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="${SCRIPT_DIR}/deploy.env"

# -----------------------------------------------------------------------------
# 1. Load Configuration
# -----------------------------------------------------------------------------
if [ ! -f "$ENV_FILE" ]; then
    echo "❌ Error: Configuration file not found at $ENV_FILE"
    echo "Please copy deploy.env.example to deploy.env and configure it."
    exit 1
fi

# Load variables
source "$ENV_FILE"

# Ensure required variables are set
: "${STAGING_HOST:?Variable STAGING_HOST not set in deploy.env}"
: "${STAGING_USER:?Variable STAGING_USER not set in deploy.env}"
: "${STAGING_PATH:?Variable STAGING_PATH not set in deploy.env}"
: "${DEPLOY_BRANCH:?Variable DEPLOY_BRANCH not set in deploy.env}"
: "${API_BASE_URL:?Variable API_BASE_URL not set in deploy.env}"

echo "🚀 Starting deployment to ${STAGING_USER}@${STAGING_HOST}:${STAGING_PATH}"

# -----------------------------------------------------------------------------
# 2. Local Requirements Check
# -----------------------------------------------------------------------------
command -v ssh >/dev/null 2>&1 || { echo "❌ Error: ssh is required but not installed. Aborting."; exit 1; }
command -v curl >/dev/null 2>&1 || { echo "❌ Error: curl is required but not installed. Aborting."; exit 1; }

# -----------------------------------------------------------------------------
# 3. Remote Execution via SSH
# -----------------------------------------------------------------------------
echo "🔄 Connecting to staging server to execute deployment..."

ssh "${STAGING_USER}@${STAGING_HOST}" "bash -s" "$STAGING_PATH" "$DEPLOY_BRANCH" << 'ENDSSH'
    set -euo pipefail

    STAGING_PATH="$1"
    DEPLOY_BRANCH="$2"

    echo "▶️ [Remote] Verifying required commands..."
    command -v git >/dev/null 2>&1 || { echo "❌ Error: git not installed on remote."; exit 1; }
    command -v composer >/dev/null 2>&1 || { echo "❌ Error: composer not installed on remote."; exit 1; }
    command -v php >/dev/null 2>&1 || { echo "❌ Error: php not installed on remote."; exit 1; }
    command -v npm >/dev/null 2>&1 || { echo "❌ Error: npm not installed on remote."; exit 1; }

    echo "▶️ [Remote] Navigating to staging path: $STAGING_PATH"
    if [ ! -d "$STAGING_PATH" ]; then
        echo "❌ Error: Staging path does not exist on remote server."
        exit 1
    fi
    cd "$STAGING_PATH"

    echo "▶️ [Remote] Creating backup of current state..."
    BACKUP_DIR="../potensidesa-backup-$(date +%s)"
    cp -r . "$BACKUP_DIR"
    echo "   Backup created at $BACKUP_DIR"

    # Trap for rollback
    function rollback() {
        echo "⚠️ [Remote] Deployment failed! Rolling back..."
        cd "$STAGING_PATH"
        # Restore from backup, excluding .git if preferred, but a simple rsync or cp is fine.
        # Since we are inside the directory, we'll sync the backup back into the directory.
        rsync -a --delete "${BACKUP_DIR}/" "./"
        echo "✅ [Remote] Rollback complete."
    }
    trap rollback ERR

    echo "▶️ [Remote] Pulling latest code from branch: $DEPLOY_BRANCH..."
    git fetch origin
    git checkout "$DEPLOY_BRANCH"
    git reset --hard "origin/$DEPLOY_BRANCH"

    echo "▶️ [Remote] Installing PHP dependencies..."
    composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

    echo "▶️ [Remote] Installing NPM dependencies and building frontend..."
    npm ci
    npm run build

    echo "▶️ [Remote] Running database migrations..."
    php artisan migrate --force

    echo "▶️ [Remote] Running Laravel optimizations..."
    php artisan optimize
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache

    # Clear trap since we succeeded
    trap - ERR

    echo "✅ [Remote] Deployment script completed successfully on remote."
ENDSSH

# -----------------------------------------------------------------------------
# 4. Health Check Verification
# -----------------------------------------------------------------------------
echo "🔄 Verifying deployment via health check endpoint..."
HEALTH_URL="${API_BASE_URL}/health"
echo "   Pinging $HEALTH_URL"

# We use -f to fail on HTTP errors (>=400)
if curl -sS -f "$HEALTH_URL" > /dev/null; then
    echo "✅ Deployment verified! Health endpoint responded successfully."
else
    echo "❌ Health check failed. The deployment may have issues."
    exit 1
fi

echo "🎉 Staging deployment finished successfully!"

