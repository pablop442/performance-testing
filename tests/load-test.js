import http from 'k6/http';
import { sleep, check } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const BASE_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';
const responseTimeTrend = new Trend('response_time');
const errorRate = new Rate('error_rate');


export const options = {
    stages: [
        { duration: '30s', target: 50 },
        { duration: '120s', target: 50 },
        { duration: '30s', target: 0 }
    ],

    thresholds: {
        'http_req_duration': ['p(95)<500', 'p(99)<1000'],
        'error_rate': ['rate<0.01'],
        'checks': ['rate>0.99']
    }
};

export default function () {
    const response = http.get(BASE_ENDPOINT);
    responseTimeTrend.add(response.timings.duration);
    errorRate.add(response.status != 200);

    check(response, {
        'status is 200': (response) => response.status === 200,
        'response time < 500': (response) => response.timings.duration < 500
    })

    sleep(1);
}