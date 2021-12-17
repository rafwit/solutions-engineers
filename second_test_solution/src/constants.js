module.exports = {
  PORT: 3000,
  ROUTES: {
    HOME: '/',
    ESCAPE: '*',
  },
  BASE_URLS: {
    LOCAL: 'http://localhost',
    MONGO: 'mongodb://localhost:27017',
  },
  DB_NAME: 'couriers',
  ALLOWED_USERS: {
    STUART_API: 'stuart_api',
    DISPATCHER: 'dispatcher',
  },
};
