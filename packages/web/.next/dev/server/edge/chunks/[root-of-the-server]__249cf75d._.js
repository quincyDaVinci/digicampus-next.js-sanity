(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__249cf75d._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/packages/web/src/lib/i18n.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultLanguage",
    ()=>defaultLanguage,
    "isSupportedLang",
    ()=>isSupportedLang,
    "supportedLanguages",
    ()=>supportedLanguages
]);
const supportedLanguages = [
    'en',
    'nl'
];
const defaultLanguage = 'nl';
function isSupportedLang(lang) {
    return !!lang && supportedLanguages.includes(lang);
}
}),
"[project]/packages/web/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$i18n$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/lib/i18n.ts [middleware-edge] (ecmascript)");
;
;
function middleware(request) {
    // Clone the request headers
    const requestHeaders = new Headers(request.headers);
    const [maybeLang] = request.nextUrl.pathname.split('/').filter(Boolean);
    const lang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$i18n$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isSupportedLang"])(maybeLang) ? maybeLang : __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$i18n$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["defaultLanguage"];
    requestHeaders.set('x-dc-lang', lang);
    // Create response
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
        request: {
            headers: requestHeaders
        }
    });
    // Remove X-Frame-Options to allow embedding in Sanity Studio
    response.headers.delete('X-Frame-Options');
    // Set CSP to control frame ancestors (more modern approach)
    response.headers.set('Content-Security-Policy', "frame-ancestors 'self' https://*.sanity.io https://*.sanity.studio https://*.vercel.app");
    return response;
}
const config = {
    matcher: '/:path*'
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__249cf75d._.js.map