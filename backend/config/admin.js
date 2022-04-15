module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '3d0bcd220afd4d17d294f1a573a2710f'),
  },
});
