"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.padLeft = exports.padRight = exports.getAvailablePort = exports.checkPortAvailable = void 0;
const net_1 = __importDefault(require("net"));
const checkPortAvailable = (port) => {
    return new Promise((resolve) => {
        const server = net_1.default.createServer()
            .listen(port)
            .on('listening', () => {
            resolve(true);
            server.close();
        })
            .on('error', (err) => {
            if ((err === null || err === void 0 ? void 0 : err.code) === 'EADDRINUSE') {
                resolve(false);
            }
        });
    });
};
exports.checkPortAvailable = checkPortAvailable;
const getAvailablePort = async (port) => {
    if (port > 65535) {
        throw new Error('There is no available port');
    }
    const isAvailable = await (0, exports.checkPortAvailable)(port);
    if (!isAvailable) {
        return (0, exports.getAvailablePort)(port + 1);
    }
    return port;
};
exports.getAvailablePort = getAvailablePort;
function padRight(str, length, padStr) {
    if (isNaN(str.length) || length - str.length < 0) {
        return str;
    }
    return `${str}${(padStr || ' ').repeat(length - str.length)}`;
}
exports.padRight = padRight;
function padLeft(str, length, padStr) {
    if (isNaN(str.length) || length - str.length < 0) {
        return str;
    }
    return `${(padStr || ' ').repeat(length - str.length)}${str}`;
}
exports.padLeft = padLeft;
