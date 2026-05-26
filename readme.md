# K6 Performance Tests

Performance testing suite built using K6 and Docker to analyze public endpoint behavior under different traffic conditions
`https://jsonplaceholder.typicode.com/posts`

To validate SLA compliance, max capacity, and simulate real world traffic scenarios the following test types are created:
- Load tests
- Stress tests
- Spike tests

## Tech stack
- K6
- Docker 
- K6 integrated web dahsboard

## Execute tests
- Run any test
`./execute-tests.sh <test-name>`
- Run a test with real life dashboard
`./execute-tests.sh <test-name> --dashboard`