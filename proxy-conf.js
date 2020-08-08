const PROXY_CONFIG = [
    {
        context: [
            "/api",
            "/socket.io"
        ],
        target: "http://192.168.99.100:3001",
        secure: false,
        changeOrigin: true
    }
]

module.exports = PROXY_CONFIG;
