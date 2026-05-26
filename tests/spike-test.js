import http from 'k6/http';
import { sleep, check } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const BASE_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';
const errorRate = new Rate('error_rate');
const spikeDuration = new Trend('spike_response_time');

export const options = {
    stages: [
        { duration: '30s', target: 50 },
        { duration: '10s', target: 500 },
        { duration: '1m', target: 500 },
        { duration: '10s', target: 50 },
        { duration: '1m', target: 50 },
        { duration: '10s', target: 0 }
    ],
    thresholds: {
        'http_req_duration': ['p(95)<3000'],
        'error_rate': ['rate<0.10'],
    }
}

export default function () {
    const response = http.get(BASE_ENDPOINT);

    errorRate.add(response.status != 200);
    spikeDuration.add(response.timings.duration);

    check(response, {
        'status is 200': (response) => response.status === 200,
        'did not time out': (response) => response.timings.duration < 5000
    })

    sleep(0.5);
}