module.exports = {
  apps: [
    {
      name: "wod-apidb",
      script: "npm",
      args: "start",
      interpreter: "none",
      env: {
        NODE_ENV: "development"
      }
    }
  ]
};
