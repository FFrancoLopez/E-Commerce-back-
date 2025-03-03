"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerGlobal = loggerGlobal;
function loggerGlobal(req, res, next) {
    const now = new Date().toISOString();
    console.log(`[${now}] Estás ejecutando un método: ${req.method}, en la ruta: ${req.url}`),
        next();
}
//# sourceMappingURL=logger.middleware.js.map