const domain = window.location.origin;

const host = domain.indexOf('localhost') >= 0 ? 'http://localhost:3001' : 'http://72.167.50.134:3001';

export default host;
