/**
 * Shared configuration for optional API integration tests.
 * Environment variables:
 *  - API_BASE_URL: target server for API calls (default http://localhost:3001)
 *  - RUN_API_TESTS: when set to "true", executes live API tests instead of skipping
 *  - TEST_AUTH_COOKIE: optional session cookie used for authenticated requests
 */
const baseUrl = process.env.API_BASE_URL || 'http://localhost:3001';
const describeApi = process.env.RUN_API_TESTS === 'true' ? describe : describe.skip;

function getAuthHeaders() {
    const cookie = process.env.TEST_AUTH_COOKIE;
    return cookie ? { Cookie: cookie } : undefined;
}

module.exports = {
    baseUrl,
    describeApi,
    getAuthHeaders
};
