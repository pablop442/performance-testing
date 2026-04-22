#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: ./execute-tests.sh <test-name>"
  echo "Example: ./execute-tests.sh load-test"
  exit 1
fi

TEST_NAME=$1

echo "Starting docker and running $1 file \-_-/"

docker run --rm -v $(pwd)/tests:/tests grafana/k6 run /tests/$1.js