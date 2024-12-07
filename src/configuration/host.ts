const domain = window.location.origin;

const host = domain.indexOf('localhost') >= 0 ? 'http://localhost:3001' : 'https://bff-kkt4.onrender.com';

export default host;
