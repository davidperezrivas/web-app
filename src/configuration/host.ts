const domain = window.location.origin;

const host = domain.indexOf('localhost') >= 0 ? 'http://localhost:3002' : 'https://users-mubx.onrender.com';

export default host;
