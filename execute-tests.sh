#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: ./execute-tests.sh <test-name>"
  echo "Example: ./execute-tests.sh load-test"
  echo "Example: ./execute-tests.sh load-test --dashboard"
  exit 1
fi

TEST_NAME=$1
DASHBOARD=$2

if [ "$DASHBOARD" = "--dashboard" ]; then
  echo "Starting tests and creating web dashboard at http://localhost:5665..."
  docker run --rm \
    -v $(pwd)/tests:/tests \
    -p 5665:5665 \
    -e K6_WEB_DASHBOARD=true \
    -e K6_WEB_DASHBOARD_OPEN=true \
    grafana/k6 run /tests/$TEST_NAME.js
else
  echo "Starting docker and running $TEST_NAME file \-_-/"
  docker run --rm -v $(pwd)/tests:/tests grafana/k6 run /tests/$TEST_NAME.js
fi