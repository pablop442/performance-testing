import http from 'k6/http';
import { sleep, check } from 'k6';
import { Rate } from 'k6/metrics';

const BASE_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';
const errorRate = new Rate('error_rate');

export const options = {
    stages: [
        { duration: '1m', target: 50 },
        { duration: '1m', target: 100 },
        { duration: '1m', target: 200 },
        { duration: '1m', target: 300 },
        { duration: '1m', target: 400 },
        { duration: '1m', target: 500 },
        { duration: '2m', target: 500 },
        { duration: '1m', target: 0 }
    ],
    thresholds: {
        'http_req_duration': ['p(95)<2000'],
        'error_rate': ['rate<0.05'],
    }
}

export default function () {
    const response = http.get(BASE_ENDPOINT);

    errorRate.add(response.status != 200);

    check(response, {
        'status is 200': (response) => response.status === 200,
        'response time < 2000': (response) => response.timings.duration < 2000
    })

    sleep(1);
}