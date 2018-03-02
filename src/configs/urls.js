"use strict";

const urls: any = {
    development: {
        hostname: "localhost",
        apiUrl: "http://localhost:3001",
    },
    production: {
        hostname: "example.com",  // here will be set production domain name
        apiUrl: "http://localhost:3001",
    },
    test: {
        hostname: "example.com",  // here will be set production domain name
        apiUrl: "http://localhost:3001",
    },
};

export default urls[process.env.NODE_ENV || "development"];
