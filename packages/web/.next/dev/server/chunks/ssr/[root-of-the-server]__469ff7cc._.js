module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/packages/web/src/components/icons/FeatherIcons.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowRightIcon",
    ()=>ArrowRightIcon,
    "BookOpenIcon",
    ()=>BookOpenIcon,
    "CalendarIcon",
    ()=>CalendarIcon,
    "ChevronDownIcon",
    ()=>ChevronDownIcon,
    "ChevronLeftIcon",
    ()=>ChevronLeftIcon,
    "ChevronRightIcon",
    ()=>ChevronRightIcon,
    "ClockIcon",
    ()=>ClockIcon,
    "CloseIcon",
    ()=>CloseIcon,
    "DarkIcon",
    ()=>DarkIcon,
    "DownloadIcon",
    ()=>DownloadIcon,
    "ExternalLinkIcon",
    ()=>ExternalLinkIcon,
    "FileTextIcon",
    ()=>FileTextIcon,
    "FlagIcon",
    ()=>FlagIcon,
    "GlobeIcon",
    ()=>GlobeIcon,
    "HomeIcon",
    ()=>HomeIcon,
    "ImageIcon",
    ()=>ImageIcon,
    "LayersIcon",
    ()=>LayersIcon,
    "LightIcon",
    ()=>LightIcon,
    "LinkedInIcon",
    ()=>LinkedInIcon,
    "MailIcon",
    ()=>MailIcon,
    "MenuIcon",
    ()=>MenuIcon,
    "MoonIcon",
    ()=>MoonIcon,
    "PackageIcon",
    ()=>PackageIcon,
    "PlayIcon",
    ()=>PlayIcon,
    "SearchIcon",
    ()=>SearchIcon,
    "SettingsIcon",
    ()=>SettingsIcon,
    "ShieldIcon",
    ()=>ShieldIcon,
    "SunIcon",
    ()=>SunIcon,
    "TagIcon",
    ()=>TagIcon,
    "UserIcon",
    ()=>UserIcon,
    "UsersIcon",
    ()=>UsersIcon,
    "VideoIcon",
    ()=>VideoIcon,
    "ZapIcon",
    ()=>ZapIcon,
    "featherIconMap",
    ()=>featherIconMap,
    "getFeatherIcon",
    ()=>getFeatherIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const baseStrokeProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
};
function createIcon(children) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(function FeatherIcon({ title, role, ariaHidden, ...props }, ref) {
        const computedRole = role ?? (title ? 'img' : 'presentation');
        const computedAriaHidden = ariaHidden ?? (title ? undefined : true);
        if ("TURBOPACK compile-time truthy", 1) {
            // Warn if conflicting props that harm accessibility
            if (title && computedAriaHidden) {
                console.warn('[FeatherIcon] Received `title` along with `ariaHidden=true`. This hides the icon from assistive tech despite having a title. Prefer omitting `ariaHidden` or removing `title`.');
            }
            if (!title && computedRole === 'img') {
                console.warn('[FeatherIcon] Role set to `img` without a `title`. Provide a `title` or omit role to allow the component to set `presentation` + `aria-hidden`.');
            }
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ref: ref,
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            width: "1em",
            height: "1em",
            "aria-hidden": computedAriaHidden,
            role: computedRole,
            focusable: "false",
            ...baseStrokeProps,
            ...props,
            children: [
                title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                    children: title
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
                    lineNumber: 56,
                    columnNumber: 18
                }, this) : null,
                children
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, this);
    });
}
const LightIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "12",
            cy: "12",
            r: "4"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 66,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 67,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const DarkIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "12",
            cy: "12",
            r: "9"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 74,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 3v18"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 75,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 3a9 9 0 0 1 0 18",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 76,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const SunIcon = LightIcon;
const MoonIcon = DarkIcon;
const SearchIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "11",
            cy: "11",
            r: "7"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 86,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "21",
            y1: "21",
            x2: "16.65",
            y2: "16.65"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 87,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const MenuIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "3",
            y1: "12",
            x2: "21",
            y2: "12"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 93,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "3",
            y1: "6",
            x2: "21",
            y2: "6"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 94,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "3",
            y1: "18",
            x2: "21",
            y2: "18"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 95,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const CloseIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "18",
            y1: "6",
            x2: "6",
            y2: "18"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 101,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "6",
            y1: "6",
            x2: "18",
            y2: "18"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 102,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const ChevronDownIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
    points: "6 9 12 15 18 9"
}, void 0, false, {
    fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
    lineNumber: 107,
    columnNumber: 3
}, ("TURBOPACK compile-time value", void 0)));
const ChevronLeftIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
    points: "15 18 9 12 15 6"
}, void 0, false, {
    fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
    lineNumber: 111,
    columnNumber: 3
}, ("TURBOPACK compile-time value", void 0)));
const ChevronRightIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
    points: "9 18 15 12 9 6"
}, void 0, false, {
    fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
    lineNumber: 115,
    columnNumber: 3
}, ("TURBOPACK compile-time value", void 0)));
const ArrowRightIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "5",
            y1: "12",
            x2: "19",
            y2: "12"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 120,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
            points: "12 5 19 12 12 19"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 121,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const UsersIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M17 21v-2a4 4 0 0 0-3-3.87"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 127,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M7 21v-2a4 4 0 0 1 3-3.87"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 128,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "12",
            cy: "7",
            r: "4"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 129,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M22 21v-2a4 4 0 0 0-2-3.4"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 130,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M2 21v-2a4 4 0 0 1 2-3.4"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 131,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const FileTextIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 137,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
            points: "14 2 14 8 20 8"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 138,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "16",
            y1: "13",
            x2: "8",
            y2: "13"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 139,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "16",
            y1: "17",
            x2: "8",
            y2: "17"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 140,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "10",
            y1: "9",
            x2: "8",
            y2: "9"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 141,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const HomeIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M3 9L12 2l9 7"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 147,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M5 10v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 148,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M9 22V12h6v10"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 149,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const TagIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M20.59 13.41 11 3H3v8l9.59 9.59a2 2 0 0 0 2.82 0l5.18-5.18a2 2 0 0 0 0-2.82z"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 155,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "7",
            y1: "7",
            x2: "7.01",
            y2: "7"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 156,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const VideoIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
            points: "23 7 16 12 23 17 23 7"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 162,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
            x: "1",
            y: "5",
            width: "15",
            height: "14",
            rx: "2",
            ry: "2"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 163,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const ImageIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
            x: "3",
            y: "3",
            width: "18",
            height: "18",
            rx: "2",
            ry: "2"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 169,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "8.5",
            cy: "8.5",
            r: "1.5"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 170,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
            points: "21 15 16 10 5 21"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 171,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const UserIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "12",
            cy: "7",
            r: "4"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 177,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M20 21v-2a4 4 0 0 0-3-3.87"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 178,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M4 21v-2a4 4 0 0 1 3-3.87"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 179,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const LayersIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
            points: "12 2 2 7 12 12 22 7 12 2"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 185,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
            points: "2 12 12 17 22 12"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 186,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
            points: "2 17 12 22 22 17"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 187,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const ZapIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
    points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2"
}, void 0, false, {
    fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
    lineNumber: 192,
    columnNumber: 3
}, ("TURBOPACK compile-time value", void 0)));
const FlagIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 197,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "4",
            y1: "22",
            x2: "4",
            y2: "15"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 198,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const ShieldIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
}, void 0, false, {
    fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
    lineNumber: 203,
    columnNumber: 3
}, ("TURBOPACK compile-time value", void 0)));
const BookOpenIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M2 3h6a4 4 0 0 1 4 4v14"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 208,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M22 3h-6a4 4 0 0 0-4 4v14"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 209,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "2",
            y1: "9",
            x2: "10",
            y2: "9"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 210,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "22",
            y1: "9",
            x2: "14",
            y2: "9"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 211,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const CalendarIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
            x: "3",
            y: "4",
            width: "18",
            height: "18",
            rx: "2",
            ry: "2"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 217,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "16",
            y1: "2",
            x2: "16",
            y2: "6"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 218,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "8",
            y1: "2",
            x2: "8",
            y2: "6"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 219,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "3",
            y1: "10",
            x2: "21",
            y2: "10"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 220,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const ClockIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "12",
            cy: "12",
            r: "10"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 226,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
            points: "12 6 12 12 16 14"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 227,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const PlayIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
    points: "5 3 19 12 5 21 5 3"
}, void 0, false, {
    fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
    lineNumber: 232,
    columnNumber: 3
}, ("TURBOPACK compile-time value", void 0)));
const GlobeIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "12",
            cy: "12",
            r: "10"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 237,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "2",
            y1: "12",
            x2: "22",
            y2: "12"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 238,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 2a15.3 15.3 0 0 1 0 20"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 239,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 2a15.3 15.3 0 0 0 0 20"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 240,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const DownloadIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 246,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
            points: "7 10 12 15 17 10"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 247,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "12",
            y1: "15",
            x2: "12",
            y2: "3"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 248,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const ExternalLinkIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 254,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
            points: "15 3 21 3 21 9"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 255,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "10",
            y1: "14",
            x2: "21",
            y2: "3"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 256,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const SettingsIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "12",
            cy: "12",
            r: "3"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 262,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 1v6m0 6v6M5.6 5.6l4.2 4.2m4.4 4.4l4.2 4.2M1 12h6m6 0h6M5.6 18.4l4.2-4.2m4.4-4.4l4.2-4.2"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 263,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const PackageIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M16.5 9.4l-9-5.19"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 269,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 270,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
            points: "3.27 6.96 12 12.01 20.73 6.96"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 271,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
            x1: "12",
            y1: "22.08",
            x2: "12",
            y2: "12"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 272,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const MailIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 278,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
            points: "22,6 12,13 2,6"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 279,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const LinkedInIcon = createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 285,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
            x: "2",
            y: "9",
            width: "4",
            height: "12"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 286,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "4",
            cy: "4",
            r: "2"
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
            lineNumber: 287,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const featherIconMap = {
    sun: SunIcon,
    moon: MoonIcon,
    search: SearchIcon,
    menu: MenuIcon,
    close: CloseIcon,
    'chevron-down': ChevronDownIcon,
    'chevron-left': ChevronLeftIcon,
    'chevron-right': ChevronRightIcon,
    'arrow-right': ArrowRightIcon,
    users: UsersIcon,
    'file-text': FileTextIcon,
    home: HomeIcon,
    tag: TagIcon,
    video: VideoIcon,
    image: ImageIcon,
    user: UserIcon,
    layers: LayersIcon,
    zap: ZapIcon,
    flag: FlagIcon,
    shield: ShieldIcon,
    'book-open': BookOpenIcon,
    calendar: CalendarIcon,
    clock: ClockIcon,
    play: PlayIcon,
    globe: GlobeIcon,
    download: DownloadIcon,
    external: ExternalLinkIcon,
    settings: SettingsIcon,
    package: PackageIcon,
    hourglass: createIcon(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6 2h12"
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
                lineNumber: 355,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6 22h12"
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
                lineNumber: 356,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 2h8c0 2-2 4-4 4s-4-2-4-4Z"
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
                lineNumber: 357,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 22H8c0-2 2-4 4-4s4 2 4 4Z"
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
                lineNumber: 358,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 8v4"
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
                lineNumber: 359,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 12v4"
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/icons/FeatherIcons.tsx",
                lineNumber: 360,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true))
};
function getFeatherIcon(symbol) {
    return symbol ? featherIconMap[symbol] : undefined;
}
}),
"[project]/packages/web/src/components/navigation/MegaMenu.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MegaMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/icons/FeatherIcons.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function MegaMenu({ menus, language, currentPath }) {
    const [openIndex, setOpenIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [focusedItemIndex, setFocusedItemIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const navRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const triggerRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const itemRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const closeTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Clear close timeout
    const clearCloseTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    }, []);
    // Close dropdown with optional delay
    const closeDropdown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((immediate = false)=>{
        clearCloseTimeout();
        if (immediate) {
            setOpenIndex(null);
        } else {
            closeTimeoutRef.current = setTimeout(()=>{
                setOpenIndex(null);
            }, 150);
        }
    }, [
        clearCloseTimeout
    ]);
    // Open dropdown
    const openDropdown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((index)=>{
        clearCloseTimeout();
        setOpenIndex(index);
        setFocusedItemIndex(0);
    }, [
        clearCloseTimeout
    ]);
    // Handle keyboard navigation
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e, triggerIndex, isInDropdown = false)=>{
        const currentMenu = menus[openIndex ?? -1];
        const itemCount = currentMenu?.items?.length ?? 0;
        switch(e.key){
            case 'Escape':
                e.preventDefault();
                closeDropdown(true);
                triggerRefs.current[triggerIndex]?.focus();
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!isInDropdown && openIndex === null) {
                    openDropdown(triggerIndex);
                } else if (isInDropdown) {
                    const nextIndex = focusedItemIndex < itemCount - 1 ? focusedItemIndex + 1 : 0;
                    setFocusedItemIndex(nextIndex);
                    itemRefs.current[nextIndex]?.focus();
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (isInDropdown) {
                    const prevIndex = focusedItemIndex > 0 ? focusedItemIndex - 1 : itemCount - 1;
                    setFocusedItemIndex(prevIndex);
                    itemRefs.current[prevIndex]?.focus();
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (!isInDropdown) {
                    const nextTrigger = triggerIndex < menus.length - 1 ? triggerIndex + 1 : 0;
                    triggerRefs.current[nextTrigger]?.focus();
                    if (openIndex !== null) {
                        openDropdown(nextTrigger);
                    }
                }
                break;
            case 'ArrowLeft':
                e.preventDefault();
                if (!isInDropdown) {
                    const prevTrigger = triggerIndex > 0 ? triggerIndex - 1 : menus.length - 1;
                    triggerRefs.current[prevTrigger]?.focus();
                    if (openIndex !== null) {
                        openDropdown(prevTrigger);
                    }
                }
                break;
            case 'Home':
                if (isInDropdown) {
                    e.preventDefault();
                    setFocusedItemIndex(0);
                    itemRefs.current[0]?.focus();
                }
                break;
            case 'End':
                if (isInDropdown) {
                    e.preventDefault();
                    setFocusedItemIndex(itemCount - 1);
                    itemRefs.current[itemCount - 1]?.focus();
                }
                break;
            case 'Tab':
                // Allow Tab to work naturally but close dropdown
                if (isInDropdown) {
                    closeDropdown(true);
                }
                break;
        }
    }, [
        menus,
        openIndex,
        focusedItemIndex,
        closeDropdown,
        openDropdown
    ]);
    // Click outside to close
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onClick = (e)=>{
            if (!navRef.current?.contains(e.target)) {
                closeDropdown(true);
            }
        };
        document.addEventListener('mousedown', onClick);
        return ()=>document.removeEventListener('mousedown', onClick);
    }, [
        closeDropdown
    ]);
    // Focus first item when dropdown opens
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (openIndex !== null) {
            // Small delay to ensure DOM is ready
            setTimeout(()=>{
                itemRefs.current[0]?.focus();
            }, 50);
        }
    }, [
        openIndex
    ]);
    // Cleanup timeout on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>clearCloseTimeout();
    }, [
        clearCloseTimeout
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "col-start-1 row-start-2 flex items-end gap-2 flex-wrap sm:flex-nowrap",
        ref: navRef,
        children: menus.map((m, idx)=>{
            // Check menu configuration
            const hasDropdown = Boolean(m.items && m.items.length > 0);
            const isDirectLink = Boolean(m.href && !hasDropdown);
            // Check active states
            const hasActiveItem = currentPath && m.items?.some((item)=>currentPath === item.href || currentPath?.startsWith(item.href + '/'));
            const isActive = isDirectLink && currentPath && (currentPath === m.href || currentPath?.startsWith(m.href + '/'));
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    isDirectLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: m.href || '#',
                        "aria-current": isActive ? 'page' : undefined,
                        className: `
                  relative inline-flex items-center gap-2 rounded-lg px-4 py-2.5
                  focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]
                  whitespace-nowrap transition-[background-color,transform] duration-200
                  ${isActive ? 'text-[hsl(var(--dc-brand))] font-semibold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-0.5 after:bg-[hsl(var(--dc-brand))] after:rounded-full' : 'hover:text-[hsl(var(--dc-brand))] hover:bg-[hsl(var(--dc-brand)/0.08)]'}
                `,
                        style: {
                            minWidth: '44px',
                            minHeight: '44px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-fluid-md font-medium",
                            children: m.label
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/navigation/MegaMenu.tsx",
                            lineNumber: 189,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/navigation/MegaMenu.tsx",
                        lineNumber: 175,
                        columnNumber: 15
                    }, this),
                    hasDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                ref: (el)=>{
                                    triggerRefs.current[idx] = el;
                                },
                                "aria-expanded": openIndex === idx,
                                "aria-haspopup": "true",
                                "aria-controls": `mega-${idx}`,
                                "aria-label": `${m.label} menu`,
                                "aria-current": hasActiveItem ? 'true' : undefined,
                                onMouseEnter: ()=>openDropdown(idx),
                                onMouseLeave: ()=>closeDropdown(false),
                                onClick: ()=>{
                                    if (openIndex === idx) {
                                        closeDropdown(true);
                                    } else {
                                        openDropdown(idx);
                                    }
                                },
                                onKeyDown: (e)=>handleKeyDown(e, idx, false),
                                className: `
                    relative inline-flex items-center gap-2 rounded-lg px-4 py-2.5
                    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]
                    whitespace-nowrap transition-[background-color,transform] duration-200
                    ${hasActiveItem ? 'text-[hsl(var(--dc-brand))] font-semibold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-0.5 after:bg-[hsl(var(--dc-brand))] after:rounded-full' : openIndex === idx ? 'text-[hsl(var(--dc-brand))] bg-[hsl(var(--dc-brand)/0.1)]' : 'hover:text-[hsl(var(--dc-brand))] hover:bg-[hsl(var(--dc-brand)/0.08)]'}
                  `,
                                style: {
                                    minWidth: '44px',
                                    minHeight: '44px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-fluid-md font-medium",
                                        children: m.label
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/navigation/MegaMenu.tsx",
                                        lineNumber: 226,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChevronDownIcon"], {
                                        "aria-hidden": true,
                                        focusable: "false",
                                        className: `h-4 w-4 transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/navigation/MegaMenu.tsx",
                                        lineNumber: 227,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/components/navigation/MegaMenu.tsx",
                                lineNumber: 196,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                id: `mega-${idx}`,
                                role: "menu",
                                "aria-label": `${m.label} submenu`,
                                onMouseEnter: clearCloseTimeout,
                                onMouseLeave: ()=>closeDropdown(false),
                                className: `
                    absolute left-0 mt-2 min-w-[240px] rounded-xl overflow-hidden
                    shadow-xl
                    transform transition-all duration-200 origin-top
                    ${openIndex === idx ? 'opacity-100 scale-100 visible translate-y-0' : 'opacity-0 scale-95 invisible pointer-events-none -translate-y-1'}
                  `,
                                style: {
                                    backgroundColor: 'hsl(var(--dc-surface))',
                                    border: '1px solid hsl(var(--dc-border) / 0.2)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "py-2",
                                    children: m.items?.map((it, i)=>{
                                        const hasHref = Boolean(it.href);
                                        const isItemActive = currentPath && (currentPath === it.href || currentPath?.startsWith(it.href + '/'));
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            ref: (el)=>{
                                                if (openIndex === idx) {
                                                    itemRefs.current[i] = el;
                                                }
                                            },
                                            href: it.href || '#',
                                            role: "menuitem",
                                            tabIndex: openIndex === idx ? 0 : -1,
                                            onClick: (e)=>{
                                                if (!hasHref) {
                                                    e.preventDefault();
                                                    return;
                                                }
                                                closeDropdown(true);
                                            },
                                            onKeyDown: (e)=>handleKeyDown(e, idx, true),
                                            "aria-disabled": !hasHref,
                                            "aria-current": isItemActive ? 'page' : undefined,
                                            className: `
                            group/link relative block px-4 py-3 text-sm
                            transition-all duration-200 ease-out
                            ${isItemActive ? 'bg-[hsl(var(--dc-brand)/0.12)] text-[hsl(var(--dc-brand))] font-semibold border-l-2 border-[hsl(var(--dc-brand))]' : hasHref ? 'hover:bg-gradient-to-r hover:from-[hsl(var(--dc-brand)/0.08)] hover:to-transparent hover:text-[hsl(var(--dc-brand))] hover:translate-x-1 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
                            focus:outline-none focus-visible:bg-[hsl(var(--dc-brand)/0.08)] focus-visible:translate-x-1
                          `,
                                            style: {
                                                minHeight: '44px'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            hasHref && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-1 h-1 rounded-full bg-[hsl(var(--dc-brand))] opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"
                                                            }, void 0, false, {
                                                                fileName: "[project]/packages/web/src/components/navigation/MegaMenu.tsx",
                                                                lineNumber: 296,
                                                                columnNumber: 33
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `${hasHref ? 'font-medium group-hover/link:font-semibold transition-all' : 'italic text-[hsl(var(--dc-text)/0.6)]'}`,
                                                                children: it.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/packages/web/src/components/navigation/MegaMenu.tsx",
                                                                lineNumber: 298,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/packages/web/src/components/navigation/MegaMenu.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 29
                                                    }, this),
                                                    !hasHref && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs px-2 py-0.5 rounded bg-[hsl(var(--dc-text)/0.08)] text-[hsl(var(--dc-text)/0.5)]",
                                                        children: "Binnenkort"
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/components/navigation/MegaMenu.tsx",
                                                        lineNumber: 303,
                                                        columnNumber: 31
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/src/components/navigation/MegaMenu.tsx",
                                                lineNumber: 293,
                                                columnNumber: 27
                                            }, this)
                                        }, i, false, {
                                            fileName: "[project]/packages/web/src/components/navigation/MegaMenu.tsx",
                                            lineNumber: 260,
                                            columnNumber: 25
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/navigation/MegaMenu.tsx",
                                    lineNumber: 254,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/navigation/MegaMenu.tsx",
                                lineNumber: 234,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, m.label, true, {
                fileName: "[project]/packages/web/src/components/navigation/MegaMenu.tsx",
                lineNumber: 172,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/navigation/MegaMenu.tsx",
        lineNumber: 157,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/web/src/components/navigation/LanguageDropdown.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LanguageDropdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/icons/FeatherIcons.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function LanguageDropdown({ currentLang, onChangeLang }) {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const languages = [
        {
            code: 'nl',
            label: 'Nederlands',
            short: 'NL'
        },
        {
            code: 'en',
            label: 'English',
            short: 'EN'
        }
    ];
    const currentLanguage = languages.find((lang)=>lang.code === currentLang);
    // Close on click outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (e)=>{
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, [
        isOpen
    ]);
    // Close on Escape
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleEscape = (e)=>{
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
                buttonRef.current?.focus();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return ()=>document.removeEventListener('keydown', handleEscape);
    }, [
        isOpen
    ]);
    const handleSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((lang)=>{
        onChangeLang(lang);
        setIsOpen(false);
        buttonRef.current?.focus();
    }, [
        onChangeLang
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        ref: dropdownRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                ref: buttonRef,
                onClick: ()=>setIsOpen(!isOpen),
                "aria-expanded": isOpen,
                "aria-haspopup": "true",
                "aria-label": `Current language: ${currentLanguage?.label}. Click to change language`,
                className: `
          group inline-flex items-center gap-2 rounded-lg px-3 py-2
          transition-all duration-200
          focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]
          ${isOpen ? 'bg-[hsl(var(--dc-brand)/0.1)] text-[hsl(var(--dc-brand))]' : 'hover:bg-[hsl(var(--dc-brand)/0.08)] hover:text-[hsl(var(--dc-brand))]'}
        `,
                style: {
                    minWidth: '44px',
                    minHeight: '44px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GlobeIcon"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/navigation/LanguageDropdown.tsx",
                        lineNumber: 78,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium",
                        children: currentLanguage?.short
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/navigation/LanguageDropdown.tsx",
                        lineNumber: 79,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChevronDownIcon"], {
                        className: `h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'group-hover:rotate-180'}`
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/navigation/LanguageDropdown.tsx",
                        lineNumber: 80,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/navigation/LanguageDropdown.tsx",
                lineNumber: 61,
                columnNumber: 13
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "menu",
                className: `
            absolute right-0 mt-2 min-w-[140px] rounded-xl overflow-hidden
            shadow-xl
            transform transition-all duration-200 origin-top-right
            ${isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}
          `,
                style: {
                    backgroundColor: 'hsl(var(--dc-surface))',
                    border: '1px solid hsl(var(--dc-border) / 0.2)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-1",
                    children: languages.map((lang)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            role: "menuitem",
                            onClick: ()=>handleSelect(lang.code),
                            className: `
                  w-full text-left px-4 py-3 text-sm
                  transition-colors duration-200
                  ${lang.code === currentLang ? 'bg-[hsl(var(--dc-brand)/0.1)] text-[hsl(var(--dc-brand))] font-semibold' : 'hover:bg-[hsl(var(--dc-brand)/0.08)] hover:text-[hsl(var(--dc-brand))]'}
                `,
                            style: {
                                minHeight: '44px'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: lang.label
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/navigation/LanguageDropdown.tsx",
                                        lineNumber: 119,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs opacity-60",
                                        children: lang.short
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/navigation/LanguageDropdown.tsx",
                                        lineNumber: 120,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/components/navigation/LanguageDropdown.tsx",
                                lineNumber: 118,
                                columnNumber: 33
                            }, this)
                        }, lang.code, false, {
                            fileName: "[project]/packages/web/src/components/navigation/LanguageDropdown.tsx",
                            lineNumber: 104,
                            columnNumber: 29
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/navigation/LanguageDropdown.tsx",
                    lineNumber: 102,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/navigation/LanguageDropdown.tsx",
                lineNumber: 86,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/src/components/navigation/LanguageDropdown.tsx",
        lineNumber: 60,
        columnNumber: 9
    }, this);
}
}),
"[project]/packages/web/src/lib/i18n.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/packages/web/src/lib/language.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/lib/i18n.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({
    lang: 'nl',
    // typed noop to avoid unused-var warnings
    setLang: ()=>{}
});
function LanguageProvider({ children, initialLang }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    // Start as null to avoid SSR hydration mismatch / flicker. Populate on first client render.
    const [lang, setLangState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialLang ?? null);
    const updateDocumentLang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((nextLang)=>{
        if (typeof document === 'undefined') return;
        document.documentElement.lang = nextLang;
        document.documentElement.setAttribute('data-lang', nextLang);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Client-only initialization: prefer stored setting, fall back to navigator.
        try {
            const stored = localStorage.getItem('dc_lang');
            if (stored === 'nl' || stored === 'en') {
                setLangState(stored);
                updateDocumentLang(stored);
                return;
            }
        } catch  {
        // ignore
        }
        if (initialLang && (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSupportedLang"])(initialLang)) {
            setLangState(initialLang);
            updateDocumentLang(initialLang);
            return;
        }
        if (typeof navigator !== 'undefined') {
            const n = navigator.language?.toLowerCase();
            if (n?.startsWith('nl')) setLangState('nl');
            else setLangState('en');
        } else {
            setLangState('nl');
        }
    }, [
        initialLang,
        updateDocumentLang
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (lang == null) return;
        try {
            localStorage.setItem('dc_lang', lang);
        } catch  {}
        updateDocumentLang(lang);
    }, [
        lang,
        updateDocumentLang
    ]);
    const navigateWithLang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((nextLang)=>{
        if (!pathname) return;
        const segments = pathname.split('/').filter(Boolean);
        // Replace first segment when it is a supported language, otherwise prefix.
        if (segments.length > 0 && __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supportedLanguages"].includes(segments[0])) {
            segments[0] = nextLang;
        } else {
            segments.unshift(nextLang);
        }
        const nextPath = '/' + segments.join('/');
        try {
            const result = router.push(nextPath || '/');
            if (result && typeof result.then === 'function') {
                ;
                result.then(()=>{
                    try {
                        router.refresh();
                    } catch  {}
                }).catch(()=>{});
            } else {
                // If push is synchronous/void, call refresh on next tick to allow
                // the navigation to complete.
                setTimeout(()=>{
                    try {
                        router.refresh();
                    } catch  {}
                }, 0);
            }
        } catch (err) {
            // If router.push throws for any reason, fallback to a full reload.
            console.warn('[language] navigateWithLang push failed, falling back to hard navigation', err);
            try {
                window.location.href = nextPath;
            } catch  {}
        }
    }, [
        pathname,
        router
    ]);
    // Expose a stable lang value to consumers to avoid making them handle null.
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            lang: lang ?? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultLanguage"],
            setLang: (next)=>{
                setLangState(next);
                updateDocumentLang(next);
                navigateWithLang(next);
            }
        }), [
        lang,
        navigateWithLang,
        updateDocumentLang
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/web/src/lib/language.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
function useLanguage() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
}
}),
"[project]/packages/web/src/components/headerData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildFallbackMenus",
    ()=>buildFallbackMenus,
    "extractCtasFromSiteSettings",
    ()=>extractCtasFromSiteSettings,
    "extractLogoFromSiteSettings",
    ()=>extractLogoFromSiteSettings,
    "extractMenusFromSiteSettings",
    ()=>extractMenusFromSiteSettings
]);
(()=>{
    const e = new Error("Cannot find module '@sanity/lib/image'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
// Fallback menus removed - navigation should be configured in Sanity Studio
const fallbackMenus = [];
const buildFallbackMenus = (lang)=>[];
const extractMenusFromSiteSettings = (siteData, lang)=>{
    if (!siteData?.header?.items || siteData.header.items.length === 0) return [];
    // For new navigationItem structure
    return siteData.header.items.map((item)=>{
        // Get the label based on language
        const label = item.label || '';
        const links = item.links || [];
        // Transform links to MenuItem format
        const menuItems = links.filter((link)=>link.href && link.label).map((link)=>{
            // Find translated label if available
            const translation = link.translations?.find((t)=>t.language === lang);
            return {
                label: translation?.label || link.label || '',
                href: link.href || ''
            };
        });
        return {
            label,
            items: menuItems
        };
    }).filter((menu)=>menu.items.length > 0);
};
const extractLogoFromSiteSettings = (siteData)=>{
    if (!siteData?.logo) return null;
    try {
        const targetWidth = 800;
        const assetDims = siteData.logo?.asset?.metadata?.dimensions;
        const targetHeight = assetDims?.width && assetDims?.height ? Math.round(assetDims.height / assetDims.width * targetWidth) : undefined;
        const builder = urlFor(siteData.logo).width(targetWidth);
        const imgUrl = targetHeight ? builder.height(targetHeight).fit('crop').auto('format').url() : builder.auto('format').url();
        return {
            url: imgUrl,
            alt: siteData.logoAlt || siteData.title || 'Site logo',
            width: assetDims?.width,
            height: assetDims?.height
        };
    } catch (err) {
        console.warn('Logo image builder failed', err);
        if (siteData.logo?.asset?.url) {
            return {
                url: siteData.logo.asset.url || '',
                alt: siteData.logoAlt || siteData.title || 'Site logo'
            };
        }
        return null;
    }
};
const extractCtasFromSiteSettings = (siteData)=>siteData?.ctas?.filter((cta)=>Boolean(cta.href && cta.label)) || [];
}),
"[project]/packages/web/src/components/HeaderClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/icons/FeatherIcons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$navigation$2f$MegaMenu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/navigation/MegaMenu.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$navigation$2f$LanguageDropdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/navigation/LanguageDropdown.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$language$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/lib/language.tsx [app-ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@sanity/lib/client'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@sanity/lib/queries/site'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$headerData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/headerData.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
function Header({ menus, logo, ctas = [] }) {
    const { lang: language, setLang: setLanguage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$language$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguage"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [liveMessage, setLiveMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const firstLangRender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(true);
    const hasSanityCredentials = Boolean(("TURBOPACK compile-time value", "hs6e6yx5") && ("TURBOPACK compile-time value", "production"));
    const [menuData, setMenuData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(menus);
    const [logoData, setLogoData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(logo ?? null);
    const [ctaData, setCtaData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(ctas ?? []);
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [openIndex, setOpenIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mobileOpen, setMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dark, setDark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const navRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mobileMenuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mobileMenuButtonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const homeHref = `/${language}`;
    const searchAction = `/${language || 'nl'}/search`;
    const searchLabel = language === 'nl' ? 'Zoeken' : 'Search';
    // Keep menus/logo/ctas in sync with language switches
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let ignore = false;
        const loadMenus = async ()=>{
            if (!language) return;
            if (!hasSanityCredentials) {
                if (!ignore) {
                    setMenuData([]);
                    setLogoData(logo ?? null);
                    setCtaData(ctas ?? []);
                }
                return;
            }
            try {
                // Fetch dev settings
                const devSettings = await client.fetch(devSettingsQuery);
                const showIncompleteNavItems = devSettings?.showIncompleteNavItems ?? false;
                // Fetch site settings for logo and CTAs
                const siteData = await client.fetch(siteSettingsQuery, {
                    lang: language
                });
                if (ignore) return;
                // Extract logo and CTAs from site settings
                setLogoData((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$headerData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractLogoFromSiteSettings"])(siteData));
                setCtaData((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$headerData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractCtasFromSiteSettings"])(siteData));
                // Fetch navigation directly
                const navData = await client.fetch(navigationByLangQuery, {
                    lang: language
                });
                if (navData?.items && navData.items.length > 0) {
                    const transformedMenus = navData.items.map((item)=>{
                        // Extract href from top-level menu item
                        const topLevelHref = item.href || null;
                        return {
                            label: item.label || '',
                            href: topLevelHref,
                            items: (item.links || []).filter((link)=>{
                                // If showIncompleteNavItems is true, only require label
                                // Otherwise, require both label and href
                                if (showIncompleteNavItems) {
                                    return link.label;
                                }
                                return link.href && link.label;
                            }).map((link)=>{
                                const translation = link.translations?.find((t)=>t.language === language);
                                return {
                                    label: translation?.label || link.label,
                                    href: link.href || '#' // Ensure href is always a string
                                };
                            })
                        };
                    });
                    setMenuData(transformedMenus.length > 0 ? transformedMenus : []);
                } else {
                    setMenuData([]);
                }
            } catch (err) {
                console.error('Could not fetch site settings:', err);
                if (!ignore) {
                    setMenuData([]);
                    setLogoData(logo ?? null);
                    setCtaData(ctas ?? []);
                }
            }
        };
        loadMenus();
        return ()=>{
            ignore = true;
        };
    }, [
        language,
        hasSanityCredentials,
        ctas,
        logo,
        menus
    ]);
    // Persist dark mode
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const stored = localStorage.getItem("dc_dark");
            setDark(stored === "true");
        } catch  {}
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            localStorage.setItem("dc_dark", dark ? "true" : "false");
        } catch  {}
        if (typeof document !== "undefined") document.body.classList.toggle("dark", dark);
    }, [
        dark
    ]);
    // Scroll
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onScroll = ()=>setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, {
            passive: true
        });
        return ()=>window.removeEventListener("scroll", onScroll);
    }, []);
    // Close menus on outside click / escape
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onKey = (e)=>{
            if (e.key === "Escape") {
                if (mobileOpen) {
                    setMobileOpen(false);
                    setLiveMessage(language === 'nl' ? 'Menu gesloten' : 'Menu closed');
                    setTimeout(()=>setLiveMessage(''), 2000);
                    // Return focus to menu button
                    mobileMenuButtonRef.current?.focus();
                }
                setOpenIndex(null);
            }
        };
        const onClick = (e)=>{
            if (!navRef.current?.contains(e.target)) setOpenIndex(null);
        };
        document.addEventListener("keydown", onKey);
        document.addEventListener("mousedown", onClick);
        return ()=>{
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("mousedown", onClick);
        };
    }, [
        mobileOpen,
        language
    ]);
    // Keep focusable order logical when menu opens and trap focus
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
            // Announce menu opened
            setLiveMessage(language === 'nl' ? 'Menu geopend' : 'Menu opened');
            setTimeout(()=>setLiveMessage(''), 2000);
            // Focus first interactive element in mobile menu
            setTimeout(()=>{
                const firstFocusable = mobileMenuRef.current?.querySelector('a, button, input, [tabindex]:not([tabindex="-1"])');
                firstFocusable?.focus();
            }, 100);
        } else {
            document.body.style.overflow = "";
        }
    }, [
        mobileOpen,
        language
    ]);
    // Language change handler (also updates provider)
    const changeLanguage = (l)=>{
        setLanguage(l);
    };
    // announce language changes politely but skip the initial set to avoid spurious announcement
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (firstLangRender.current) {
            firstLangRender.current = false;
            return;
        }
        setLiveMessage(language === 'nl' ? 'Nederlands geselecteerd' : 'English selected');
        const t = setTimeout(()=>setLiveMessage(''), 2000);
        return ()=>clearTimeout(t);
    }, [
        language
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        ref: navRef,
        role: "banner",
        className: [
            "sticky top-0 z-50 transition-all duration-300 motion-reduce:transition-none",
            scrolled ? "backdrop-blur shadow-lg" : "bg-transparent"
        ].join(" "),
        style: scrolled ? {
            backgroundColor: 'hsl(var(--dc-bg) / 0.3)'
        } : undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-live": "polite",
                className: "sr-only",
                role: "status",
                children: liveMessage
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                "aria-label": language === 'nl' ? 'Hoofdnavigatie' : 'Main navigation',
                className: [
                    "mx-auto max-w-7xl px-4 sm:px-6",
                    scrolled ? "py-2" : "py-4"
                ].join(" "),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:grid grid-cols-2 grid-rows-2 gap-4 items-start w-full",
                        style: {
                            minHeight: "8rem"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-start-1 row-start-1 flex items-start min-w-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: homeHref,
                                    className: "flex items-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] rounded-lg transition-opacity duration-200 hover:opacity-90",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "sr-only",
                                            children: "Digicampus homepage"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                            lineNumber: 223,
                                            columnNumber: 15
                                        }, this),
                                        logoData ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: logoData.url,
                                            alt: logoData.alt,
                                            width: logoData.width || 320,
                                            height: logoData.height || 80,
                                            className: [
                                                scrolled ? "h-12" : "h-16",
                                                "w-auto drop-shadow max-w-[60vw] sm:max-w-[320px]"
                                            ].join(" "),
                                            style: {
                                                maxWidth: "320px"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                            lineNumber: 225,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: dark ? "/assets/images/logo-digicampus-dark.svg" : "/assets/images/logo-digicampus-light.svg",
                                            alt: "Digicampus logo",
                                            width: 320,
                                            height: 80,
                                            className: [
                                                scrolled ? "h-12" : "h-16",
                                                "w-auto drop-shadow max-w-[60vw] sm:max-w-[320px]"
                                            ].join(" "),
                                            style: {
                                                maxWidth: "320px"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                            lineNumber: 234,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                lineNumber: 221,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-start-2 row-start-1 flex items-center gap-3 justify-end min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        "aria-pressed": dark,
                                        "aria-label": dark ? "Schakel lichtmodus in" : "Schakel donker modus in",
                                        onClick: ()=>{
                                            setDark((d)=>!d);
                                            setLiveMessage(dark ? language === 'nl' ? 'Lichtmodus actief' : 'Light mode active' : language === 'nl' ? 'Donkere modus actief' : 'Dark mode active');
                                            setTimeout(()=>setLiveMessage(''), 2000);
                                        },
                                        className: "flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--dc-border)/0.2)] text-[hsl(var(--dc-text))] transition-all duration-200 hover:bg-[hsl(var(--dc-brand)/0.08)] hover:text-[hsl(var(--dc-brand))] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]",
                                        children: [
                                            dark ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MoonIcon"], {
                                                "aria-hidden": true,
                                                focusable: "false"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                lineNumber: 258,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SunIcon"], {
                                                "aria-hidden": true,
                                                focusable: "false"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                lineNumber: 258,
                                                columnNumber: 68
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: dark ? language === 'nl' ? 'Donkere modus actief' : 'Dark mode active' : language === 'nl' ? 'Lichtmodus actief' : 'Light mode active'
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                lineNumber: 259,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                        lineNumber: 248,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$navigation$2f$LanguageDropdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        currentLang: language,
                                        onChangeLang: changeLanguage
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                        lineNumber: 262,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        role: "search",
                                        className: "relative min-w-0",
                                        action: searchAction,
                                        method: "get",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "q",
                                                className: "sr-only",
                                                children: searchLabel
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                lineNumber: 265,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "q",
                                                name: "q",
                                                type: "search",
                                                placeholder: searchLabel,
                                                className: "w-28 sm:w-44 rounded-full outline-none px-4 py-2 pr-10 min-w-0 text-fluid-sm transition-all duration-200 hover:bg-[hsl(var(--dc-brand)/0.08)] hover:text-[hsl(var(--dc-brand))]",
                                                style: {
                                                    backgroundColor: 'hsl(var(--dc-text) / 0.06)',
                                                    color: 'hsl(var(--dc-text))',
                                                    border: '1px solid hsl(var(--dc-border) / 0.2)'
                                                },
                                                onFocus: (e)=>{
                                                    e.currentTarget.style.boxShadow = `0 0 0 4px hsl(var(--dc-focus))`;
                                                    e.currentTarget.style.backgroundColor = 'hsl(var(--dc-brand) / 0.08)';
                                                    e.currentTarget.style.color = 'hsl(var(--dc-brand))';
                                                },
                                                onBlur: (e)=>{
                                                    e.currentTarget.style.boxShadow = '';
                                                    e.currentTarget.style.backgroundColor = '';
                                                    e.currentTarget.style.color = '';
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                lineNumber: 266,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                "aria-label": searchLabel,
                                                className: "absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[hsl(var(--dc-text)/0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--dc-focus))] rounded transition-all duration-200 hover:text-[hsl(var(--dc-brand))] hover:scale-110",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SearchIcon"], {
                                                        "aria-hidden": true,
                                                        focusable: "false"
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                        lineNumber: 272,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "sr-only",
                                                        children: searchLabel
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                        lineNumber: 273,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                lineNumber: 267,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                        lineNumber: 264,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                lineNumber: 247,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$navigation$2f$MegaMenu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                menus: menuData,
                                language: language,
                                currentPath: pathname
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-start-2 row-start-2 flex items-end justify-end gap-2",
                                children: ctaData.length > 0 ? ctaData.map((cta, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: cta.href,
                                        className: "group relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden",
                                        style: {
                                            background: 'linear-gradient(135deg, hsl(var(--dc-brand)) 0%, hsl(var(--dc-brand) / 0.85) 100%)',
                                            color: 'hsl(var(--dc-on-primary))',
                                            boxShadow: '0 4px 14px 0 hsl(var(--dc-brand) / 0.25)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                lineNumber: 291,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative",
                                                children: cta.label
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                lineNumber: 292,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArrowRightIcon"], {
                                                "aria-hidden": true,
                                                focusable: "false",
                                                className: "relative transition-transform group-hover:translate-x-1"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                lineNumber: 293,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                        lineNumber: 285,
                                        columnNumber: 17
                                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/${language}/contact`,
                                    className: "group relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden",
                                    style: {
                                        background: 'linear-gradient(135deg, hsl(var(--dc-brand)) 0%, hsl(var(--dc-brand) / 0.85) 100%)',
                                        color: 'hsl(var(--dc-on-primary))',
                                        boxShadow: '0 4px 14px 0 hsl(var(--dc-brand) / 0.25)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                            lineNumber: 302,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative",
                                            children: "Contact"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                            lineNumber: 303,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArrowRightIcon"], {
                                            "aria-hidden": true,
                                            focusable: "false",
                                            className: "relative transition-transform group-hover:translate-x-1"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                            lineNumber: 304,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                    lineNumber: 297,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                lineNumber: 282,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                        lineNumber: 219,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:hidden flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                ref: mobileMenuButtonRef,
                                "aria-expanded": mobileOpen,
                                "aria-controls": "mobile-menu",
                                onClick: ()=>setMobileOpen((v)=>!v),
                                className: "flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--dc-border)/0.2)] text-[hsl(var(--dc-text))] transition-colors duration-200 hover:bg-[hsl(var(--dc-text)/0.08)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]",
                                "aria-label": mobileOpen ? language === 'nl' ? 'Sluit menu' : 'Close menu' : language === 'nl' ? 'Open menu' : 'Open menu',
                                children: mobileOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CloseIcon"], {
                                    "aria-hidden": true,
                                    focusable: "false"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                    lineNumber: 320,
                                    columnNumber: 27
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuIcon"], {
                                    "aria-hidden": true,
                                    focusable: "false"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                    lineNumber: 320,
                                    columnNumber: 73
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                lineNumber: 312,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: homeHref,
                                className: "flex items-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] rounded-lg transition-opacity duration-200 hover:opacity-90",
                                children: logoData ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    src: logoData.url,
                                    alt: logoData.alt,
                                    width: logoData.width || 160,
                                    height: logoData.height || 40,
                                    className: "h-10 w-auto drop-shadow",
                                    style: {
                                        maxWidth: "40vw"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                    lineNumber: 325,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/assets/images/logo-digicampus.svg",
                                    alt: "Digicampus logo",
                                    width: 160,
                                    height: 40,
                                    className: "h-10 w-auto drop-shadow",
                                    style: {
                                        maxWidth: "40vw"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                    lineNumber: 327,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                lineNumber: 323,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setDark((d)=>!d);
                                            setLiveMessage(dark ? language === 'nl' ? 'Lichtmodus actief' : 'Light mode active' : language === 'nl' ? 'Donkere modus actief' : 'Dark mode active');
                                            setTimeout(()=>setLiveMessage(''), 2000);
                                        },
                                        "aria-pressed": dark,
                                        "aria-label": dark ? language === 'nl' ? 'Schakel lichtmodus in' : 'Switch to light mode' : language === 'nl' ? 'Schakel donker modus in' : 'Switch to dark mode',
                                        className: "flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--dc-border)/0.2)] text-[hsl(var(--dc-text))] transition-all duration-200 hover:bg-[hsl(var(--dc-brand)/0.08)] hover:text-[hsl(var(--dc-brand))] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]",
                                        children: [
                                            dark ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MoonIcon"], {
                                                "aria-hidden": true,
                                                focusable: "false"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                lineNumber: 342,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SunIcon"], {
                                                "aria-hidden": true,
                                                focusable: "false"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                lineNumber: 342,
                                                columnNumber: 68
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: dark ? language === 'nl' ? 'Donkere modus actief' : 'Dark mode active' : language === 'nl' ? 'Lichtmodus actief' : 'Light mode active'
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                lineNumber: 343,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                        lineNumber: 332,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>changeLanguage("nl"),
                                                "aria-pressed": language === "nl",
                                                className: [
                                                    "px-2 py-1 rounded-lg font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] text-fluid-sm transition-colors duration-200",
                                                    language === "nl" ? "" : "hover:bg-[hsl(var(--dc-text)/0.08)]"
                                                ].join(" "),
                                                style: language === "nl" ? {
                                                    backgroundColor: 'hsl(var(--dc-brand))',
                                                    color: 'hsl(var(--dc-on-primary))'
                                                } : {
                                                    border: '1px solid hsl(var(--dc-border)/0.18)',
                                                    color: 'hsl(var(--dc-text))'
                                                },
                                                children: "NL"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                lineNumber: 346,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>changeLanguage("en"),
                                                "aria-pressed": language === "en",
                                                className: [
                                                    "px-2 py-1 rounded-lg font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] text-fluid-sm transition-colors duration-200",
                                                    language === "en" ? "" : "hover:bg-[hsl(var(--dc-text)/0.08)]"
                                                ].join(" "),
                                                style: language === "en" ? {
                                                    backgroundColor: 'hsl(var(--dc-brand))',
                                                    color: 'hsl(var(--dc-on-primary))'
                                                } : {
                                                    border: '1px solid hsl(var(--dc-border)/0.18)',
                                                    color: 'hsl(var(--dc-text))'
                                                },
                                                children: "EN"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                lineNumber: 347,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                        lineNumber: 345,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                lineNumber: 331,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                        lineNumber: 311,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: mobileMenuRef,
                        id: "mobile-menu",
                        role: "navigation",
                        "aria-label": language === 'nl' ? 'Mobiel menu' : 'Mobile menu',
                        className: [
                            "md:hidden transition-all duration-300 overflow-hidden motion-reduce:transition-none",
                            mobileOpen ? "max-h-[80vh] mt-3" : "max-h-0"
                        ].join(" "),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl p-3 backdrop-blur",
                            style: {
                                border: '1px solid hsl(var(--dc-border)/0.1)',
                                backgroundColor: 'hsl(var(--dc-surface)/0.9)',
                                color: 'hsl(var(--dc-text))'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2",
                                    children: menuData.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                                                className: "group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                                        className: "cursor-pointer list-none rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-[hsl(var(--dc-text)/0.08)]",
                                                        style: {
                                                            color: 'hsl(var(--dc-text))'
                                                        },
                                                        children: m.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                        lineNumber: 365,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "mt-1 ml-2 space-y-1",
                                                        children: m.items.map((it, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: it.href,
                                                                    onClick: ()=>setMobileOpen(false),
                                                                    className: "block rounded-lg px-3 py-2 text-fluid-sm transition-colors duration-200 hover:bg-[hsl(var(--dc-text)/0.08)]",
                                                                    style: {
                                                                        color: 'hsl(var(--dc-text))'
                                                                    },
                                                                    children: it.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                                    lineNumber: 368,
                                                                    columnNumber: 62
                                                                }, this)
                                                            }, `${m.label}-mobile-${idx}`, false, {
                                                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                                lineNumber: 368,
                                                                columnNumber: 25
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                        lineNumber: 366,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                lineNumber: 364,
                                                columnNumber: 19
                                            }, this)
                                        }, m.label, false, {
                                            fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                            lineNumber: 363,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                    lineNumber: 361,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 flex items-center gap-2 flex-wrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>changeLanguage("nl"),
                                            "aria-pressed": language === "nl",
                                            className: [
                                                "px-2 py-1 rounded-lg font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] text-fluid-sm transition-colors",
                                                language === "nl" ? "bg-[--color-brand] text-black" : "border border-white/30 text-white/90 hover:bg-white/10"
                                            ].join(" "),
                                            children: "NL"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                            lineNumber: 377,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>changeLanguage("en"),
                                            "aria-pressed": language === "en",
                                            className: [
                                                "px-2 py-1 rounded-lg font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] text-fluid-sm transition-colors",
                                                language === "en" ? "bg-[--color-brand] text-black" : "border border-white/30 text-white/90 hover:bg-white/10"
                                            ].join(" "),
                                            children: "EN"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                            lineNumber: 378,
                                            columnNumber: 15
                                        }, this),
                                        ctaData.length > 0 ? ctaData.map((cta, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: cta.href,
                                                className: "group relative ml-auto inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden",
                                                style: {
                                                    background: 'linear-gradient(135deg, hsl(var(--dc-brand)) 0%, hsl(var(--dc-brand) / 0.85) 100%)',
                                                    color: 'hsl(var(--dc-on-primary))',
                                                    boxShadow: '0 4px 14px 0 hsl(var(--dc-brand) / 0.25)'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "relative",
                                                        children: cta.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                        lineNumber: 388,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArrowRightIcon"], {
                                                        "aria-hidden": true,
                                                        focusable: "false",
                                                        className: "relative transition-transform group-hover:translate-x-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                        lineNumber: 389,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                lineNumber: 381,
                                                columnNumber: 19
                                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/${language}/contact`,
                                            className: "group relative ml-auto inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden",
                                            style: {
                                                background: 'linear-gradient(135deg, hsl(var(--dc-brand)) 0%, hsl(var(--dc-brand) / 0.85) 100%)',
                                                color: 'hsl(var(--dc-on-primary))',
                                                boxShadow: '0 4px 14px 0 hsl(var(--dc-brand) / 0.25)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                    lineNumber: 398,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "relative",
                                                    children: "Contact"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                    lineNumber: 399,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArrowRightIcon"], {
                                                    "aria-hidden": true,
                                                    focusable: "false",
                                                    className: "relative transition-transform group-hover:translate-x-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                    lineNumber: 400,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                            lineNumber: 393,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                    lineNumber: 376,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    role: "search",
                                    className: "mt-3 flex gap-2",
                                    action: searchAction,
                                    method: "get",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "q-m",
                                            className: "sr-only",
                                            children: searchLabel
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                            lineNumber: 406,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "q-m",
                                            name: "q",
                                            type: "search",
                                            placeholder: searchLabel,
                                            className: "w-full rounded-full bg-white/10 text-white placeholder-white/70 outline-none px-4 py-2 border border-white/20 focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] text-fluid-sm"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                            lineNumber: 407,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold text-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]",
                                            style: {
                                                backgroundColor: 'hsl(var(--dc-brand))',
                                                border: '1px solid hsl(var(--dc-border)/0.2)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SearchIcon"], {
                                                    "aria-hidden": true,
                                                    focusable: "false"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                    lineNumber: 413,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "sr-only",
                                                    children: searchLabel
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                    lineNumber: 414,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "aria-hidden": true,
                                                    children: language === 'nl' ? 'Zoek' : 'Search'
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                                    lineNumber: 415,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                            lineNumber: 408,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                                    lineNumber: 405,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                            lineNumber: 360,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                        lineNumber: 353,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/src/components/HeaderClient.tsx",
        lineNumber: 211,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/web/src/components/VisualEditing.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VisualEditing",
    ()=>VisualEditing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$react$2d$loader$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@sanity/react-loader/dist/index.js [app-ssr] (ecmascript) <locals>");
(()=>{
    const e = new Error("Cannot find module '@sanity/lib/client'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function VisualEditing() {
    // Get the current origin for studio URL
    const studioOrigin = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000';
    // This hook enables live queries with the preview client
    // It listens to document mutations and automatically refetches queries
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$react$2d$loader$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useLiveMode"])({
        client: previewClient,
        allowStudioOrigin: studioOrigin
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Dynamically import and enable visual editing overlays
        let disableFn;
        __turbopack_context__.A("[project]/node_modules/@sanity/visual-editing/dist/index.js [app-ssr] (ecmascript, async loader)").then(({ enableVisualEditing })=>{
            disableFn = enableVisualEditing({
                // Don't refresh on mutation - let useLiveMode handle updates smoothly
                refresh: async (payload)=>{
                    // Only refresh on publish events for a clean update
                    if (payload.source === 'manual') {
                        window.location.reload();
                    }
                // For mutations (draft changes), return without reloading
                // The useLiveMode hook will handle live updates
                }
            });
        }).catch((err)=>{
            console.error('Failed to enable visual editing:', err);
        });
        return ()=>{
            if (disableFn) {
                disableFn();
            }
        };
    }, []);
    return null;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__469ff7cc._.js.map