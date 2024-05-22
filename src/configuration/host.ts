const domain = window.location.origin;

const host = domain.indexOf('localhost') >= 0 ? 'http://localhost:3001' : 'https://users-mubx.onrender.com/';

export default host;
