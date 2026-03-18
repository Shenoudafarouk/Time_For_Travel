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
