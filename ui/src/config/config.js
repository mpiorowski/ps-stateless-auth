export const PROFILE = process.env.REACT_APP_STAGE === 'prod' ? 'prod' : 'dev';
export const ACCESS_TOKEN = 'jwtToken';

export const API_BASE_URL = PROFILE === 'dev' ? "http://localhost:9000" : "api";