export default () => ({
  port: parseInt(process.env.APP_PORT || "3000", 10),
  update_delay: parseInt(process.env.UPDATE_DELAY || "10"),
  service_fee: parseFloat(process.env.SERVICE_FEE || "0.01"),
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379", 10),
  },
});
