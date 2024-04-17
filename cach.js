const redis = require("redis");

const redisClient = redis.createClient();

redisClient.on("connect", () => {
    console.log("Connected to Redis server");
});

// Handle connection error event
redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
});

// Handle connection end event (optional)
redisClient.on("end", () => {
    console.log("Redis connection closed");
});

const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl || req.url;
    redisClient.get(key, (err, cachedData) => {
        if (err) {
            console.error("Redis GET Error:", err);
            return next(); // Proceed without caching if there's an error
        }
        if (cachedData) {
            res.send(JSON.parse(cachedData));
        } else {
            next(); // Proceed to the next middleware if data is not cached
        }
    });
};

module.exports = cacheMiddleware;
