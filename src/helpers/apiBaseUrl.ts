const { NODE_ENV, PORT, API_BASE_URL } = process.env;

let apiBaseUrl: string;

if (NODE_ENV === 'development') {
  apiBaseUrl = `http://localhost:${PORT || '3001'}`;
} else {
  apiBaseUrl = API_BASE_URL || '';
}

export default apiBaseUrl;
