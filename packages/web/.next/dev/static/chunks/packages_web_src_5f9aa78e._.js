(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/packages/web/src/components/sections/HeroSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2d$image$2f$dist$2f$mjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sanity-image/dist/mjs/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
/**
 * Utility to detect if image is dark or light
 */ function getImageBrightness(imageUrl) {
    return new Promise((resolve)=>{
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imageUrl;
        img.onload = ()=>{
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return resolve('dark');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                let r = 0, g = 0, b = 0;
                for(let i = 0; i < data.length; i += 4){
                    r += data[i];
                    g += data[i + 1];
                    b += data[i + 2];
                }
                const pixelCount = data.length / 4;
                r = Math.floor(r / pixelCount);
                g = Math.floor(g / pixelCount);
                b = Math.floor(b / pixelCount);
                const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                resolve(luminance > 0.5 ? 'light' : 'dark');
            } catch (err) {
                resolve('dark');
            }
        };
        img.onerror = ()=>resolve('dark');
    });
}
function HeroSection(props) {
    _s();
    const { heading, subheading, badgeText, buttons = [], media, textColor = 'auto' } = props;
    const [detectedTextColor, setDetectedTextColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('light');
    // Normalize variant - handle old values for backward compatibility
    let variant = props.variant || 'centered';
    if (variant === 'buttonBanner' || variant === 'badgeBanner' || variant === 'gridGallery') {
        variant = 'centered'; // Map old variants to centered
    }
    const bgUrl = (()=>{
        if (!media?.image || typeof media.image === 'object' && !media.image.asset) return null;
        try {
            const projectId = ("TURBOPACK compile-time value", "hs6e6yx5");
            const dataset = ("TURBOPACK compile-time value", "production");
            const baseUrl = ("TURBOPACK compile-time truthy", 1) ? `https://cdn.sanity.io/images/${projectId}/${dataset}/` : "TURBOPACK unreachable";
            const asset = media.image.asset;
            let assetId;
            if (typeof asset === 'string') {
                assetId = asset;
            } else if (asset && typeof asset === 'object') {
                const maybe = asset;
                assetId = maybe._ref || asset._id;
            }
            if (assetId && baseUrl) {
                const srcObj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2d$image$2f$dist$2f$mjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSrc"])({
                    id: assetId,
                    baseUrl,
                    width: 2400,
                    height: 1200,
                    mode: 'cover'
                });
                return srcObj?.src ?? null;
            }
        } catch (err) {
            return null;
        }
        return null;
    })();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroSection.useEffect": ()=>{
            if (textColor === 'auto' && bgUrl) {
                getImageBrightness(bgUrl).then({
                    "HeroSection.useEffect": (brightness)=>{
                        setDetectedTextColor(brightness === 'light' ? 'dark' : 'light');
                    }
                }["HeroSection.useEffect"]);
            }
        }
    }["HeroSection.useEffect"], [
        bgUrl,
        textColor
    ]);
    // Use design tokens when auto and no bg image, otherwise use detected/manual color
    const shouldUseTokens = textColor === 'auto' && !bgUrl;
    const finalTextColor = textColor === 'auto' ? detectedTextColor : textColor;
    const textColorClass = shouldUseTokens ? 'text-[hsl(var(--dc-text))]' : finalTextColor === 'light' ? 'text-white' : 'text-gray-900 dark:text-white';
    const mutedTextClass = shouldUseTokens ? 'text-[hsl(var(--dc-text-muted))]' : finalTextColor === 'light' ? 'text-white/70' : 'text-gray-600 dark:text-gray-300';
    // Render button component
    const renderButton = (button, idx)=>{
        const href = button.accessibleVersionUrl?.trim() || button.url || "#";
        const isPdfTarget = button.isPdf ?? /\.pdf(?:$|[?#])/i.test(button.url || "");
        const isExternal = /^https?:/i.test(href);
        const buttonVariant = button.variant || 'default';
        const icon = button.icon;
        let buttonClass = 'group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[hsl(var(--dc-focus))]';
        let buttonStyle = {};
        if (variant === 'minimal') {
            // Minimal variant: always outline style
            buttonClass += ' hover:scale-[1.01] backdrop-blur-sm';
            buttonStyle = {
                backgroundColor: 'transparent',
                color: finalTextColor === 'light' ? '#fff' : '#000',
                border: `1px solid ${finalTextColor === 'light' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}`
            };
        } else {
            switch(buttonVariant){
                case 'outline':
                    buttonClass += ' hover:scale-[1.01] backdrop-blur-sm';
                    buttonStyle = {
                        backgroundColor: finalTextColor === 'light' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        color: finalTextColor === 'light' ? '#fff' : '#000',
                        border: `1px solid ${finalTextColor === 'light' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}`,
                        backdropFilter: 'blur(8px)'
                    };
                    break;
                case 'ghost':
                    buttonClass += ' hover:scale-[1.01]';
                    buttonStyle = {
                        backgroundColor: finalTextColor === 'light' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                        color: finalTextColor === 'light' ? '#fff' : '#000'
                    };
                    break;
                default:
                    buttonClass += ' hover:scale-[1.01] hover:shadow-lg';
                    buttonStyle = {
                        background: 'linear-gradient(135deg, hsl(var(--dc-brand)) 0%, hsl(var(--dc-brand) / 0.9) 100%)',
                        color: 'hsl(var(--dc-on-primary))',
                        boxShadow: '0 2px 8px 0 hsl(var(--dc-brand) / 0.2)'
                    };
            }
        }
        const renderIcon = ()=>{
            if (icon === 'arrowRight') {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M13 7l5 5m0 0l-5 5m5-5H6"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                        lineNumber: 158,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                    lineNumber: 157,
                    columnNumber: 11
                }, this);
            }
            if (icon === 'phone') {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                        lineNumber: 165,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                    lineNumber: 164,
                    columnNumber: 11
                }, this);
            }
            return null;
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: href,
            className: buttonClass,
            style: buttonStyle,
            target: isExternal ? '_blank' : undefined,
            rel: isExternal ? 'noopener noreferrer' : undefined,
            children: [
                icon && icon !== 'none' && renderIcon(),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: button.label
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                    lineNumber: 182,
                    columnNumber: 9
                }, this),
                isExternal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "sr-only",
                    children: " (opent in nieuw venster)"
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                    lineNumber: 183,
                    columnNumber: 24
                }, this),
                isPdfTarget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "sr-only",
                    children: " (PDF-bestand)"
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                    lineNumber: 184,
                    columnNumber: 25
                }, this)
            ]
        }, button._key || idx, true, {
            fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
            lineNumber: 173,
            columnNumber: 7
        }, this);
    };
    // Variant: Centered (Default)
    if (variant === 'centered') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full py-32 lg:py-48 overflow-hidden",
            children: [
                bgUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 z-0",
                    style: {
                        backgroundImage: `url(${bgUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                    lineNumber: 194,
                    columnNumber: 11
                }, this),
                media?.image?.overlay?.enabled && (()=>{
                    const ov = media.image.overlay;
                    const opacity = ov?.opacity ?? 0.5;
                    const dir = ov?.direction || 'down';
                    const dirMap = {
                        up: 'to top',
                        down: 'to bottom',
                        left: 'to left',
                        right: 'to right'
                    };
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": true,
                        className: "absolute inset-0 z-[1]",
                        style: {
                            backgroundImage: `linear-gradient(${dirMap[dir] || 'to bottom'}, rgba(0,0,0,0), rgba(0,0,0,${opacity}))`
                        }
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                        lineNumber: 201,
                        columnNumber: 18
                    }, this);
                })(),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 sm:px-6 relative z-10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-4xl mx-auto flex flex-col items-center text-center gap-8 lg:gap-10",
                        children: [
                            badgeText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${textColorClass}`,
                                style: {
                                    backgroundColor: finalTextColor === 'light' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                    borderColor: finalTextColor === 'light' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                                },
                                children: badgeText
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                                lineNumber: 207,
                                columnNumber: 15
                            }, this),
                            heading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight ${textColorClass}`,
                                children: heading
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                                lineNumber: 214,
                                columnNumber: 15
                            }, this),
                            subheading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-3xl ${mutedTextClass}`,
                                children: subheading
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                                lineNumber: 220,
                                columnNumber: 15
                            }, this),
                            buttons.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-3 justify-center mt-2",
                                children: buttons.map((button, idx)=>renderButton(button, idx))
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                                lineNumber: 226,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                        lineNumber: 205,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                    lineNumber: 204,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
            lineNumber: 192,
            columnNumber: 7
        }, this);
    }
    // Variant: Split
    if (variant === 'split') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full py-24 lg:py-32",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 sm:px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-6 lg:gap-8",
                            children: [
                                badgeText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex self-start items-center rounded-full border border-gray-200 dark:border-gray-800 px-3 py-1 text-xs font-medium",
                                    children: badgeText
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                                    lineNumber: 245,
                                    columnNumber: 17
                                }, this),
                                heading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white",
                                    children: heading
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                                    lineNumber: 251,
                                    columnNumber: 17
                                }, this),
                                subheading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed",
                                    children: subheading
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                                    lineNumber: 257,
                                    columnNumber: 17
                                }, this),
                                buttons.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-3 mt-2",
                                    children: buttons.map((button, idx)=>renderButton(button, idx))
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                                    lineNumber: 263,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                            lineNumber: 243,
                            columnNumber: 13
                        }, this),
                        bgUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: bgUrl,
                                alt: (typeof media?.image === 'object' && media?.image && 'alt' in media.image ? media.image.alt : '') || '',
                                className: "w-full h-full object-cover"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                                lineNumber: 272,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                            lineNumber: 271,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                    lineNumber: 241,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                lineNumber: 240,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
            lineNumber: 239,
            columnNumber: 7
        }, this);
    }
    // Variant: Minimal
    if (variant === 'minimal') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full py-40 lg:py-56",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 sm:px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-3xl mx-auto flex flex-col items-center text-center gap-10 lg:gap-12",
                    children: [
                        badgeText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 px-3 py-1 text-xs font-medium",
                            children: badgeText
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                            lineNumber: 288,
                            columnNumber: 15
                        }, this),
                        heading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-gray-900 dark:text-white",
                            children: heading
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                            lineNumber: 294,
                            columnNumber: 15
                        }, this),
                        subheading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed",
                            children: subheading
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                            lineNumber: 300,
                            columnNumber: 15
                        }, this),
                        buttons.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-3 justify-center mt-4",
                            children: buttons.map((button, idx)=>renderButton(button, idx))
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                            lineNumber: 306,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                    lineNumber: 286,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                lineNumber: 285,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
            lineNumber: 284,
            columnNumber: 7
        }, this);
    }
    // Fallback to centered variant for any unexpected values
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full py-32 lg:py-48 overflow-hidden",
        children: [
            bgUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-0",
                style: {
                    backgroundImage: `url(${bgUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                lineNumber: 320,
                columnNumber: 9
            }, this),
            media?.image?.overlay?.enabled && (()=>{
                const ov = media.image.overlay;
                const opacity = ov?.opacity ?? 0.5;
                const dir = ov?.direction || 'down';
                const dirMap = {
                    up: 'to top',
                    down: 'to bottom',
                    left: 'to left',
                    right: 'to right'
                };
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "aria-hidden": true,
                    className: "absolute inset-0 z-[1]",
                    style: {
                        backgroundImage: `linear-gradient(${dirMap[dir] || 'to bottom'}, rgba(0,0,0,0), rgba(0,0,0,${opacity}))`
                    }
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                    lineNumber: 327,
                    columnNumber: 16
                }, this);
            })(),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 sm:px-6 relative z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto flex flex-col items-center text-center gap-8 lg:gap-10",
                    children: [
                        badgeText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${textColorClass}`,
                            style: {
                                backgroundColor: finalTextColor === 'light' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                borderColor: finalTextColor === 'light' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                            },
                            children: badgeText
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                            lineNumber: 333,
                            columnNumber: 13
                        }, this),
                        heading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight ${textColorClass}`,
                            children: heading
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                            lineNumber: 340,
                            columnNumber: 13
                        }, this),
                        subheading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: `text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-3xl ${mutedTextClass}`,
                            children: subheading
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                            lineNumber: 346,
                            columnNumber: 13
                        }, this),
                        buttons.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-3 justify-center mt-2",
                            children: buttons.map((button, idx)=>renderButton(button, idx))
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                            lineNumber: 352,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                    lineNumber: 331,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
                lineNumber: 330,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/src/components/sections/HeroSection.tsx",
        lineNumber: 318,
        columnNumber: 5
    }, this);
}
_s(HeroSection, "LtZoJ7f2Kf2f6xEQrB01cC3ikQQ=");
_c = HeroSection;
var _c;
__turbopack_context__.k.register(_c, "HeroSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/sections/FeatureSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FeatureSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function FeatureSection(props) {
    const { heading, subheading, badgeText, features = [] } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full py-20 lg:py-40",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4 flex-col items-center text-center",
                children: [
                    badgeText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                        children: badgeText
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/FeatureSection.tsx",
                        lineNumber: 13,
                        columnNumber: 13
                    }, this),
                    heading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl md:text-5xl tracking-tighter max-w-xl font-regular",
                        children: heading
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/FeatureSection.tsx",
                        lineNumber: 18,
                        columnNumber: 13
                    }, this),
                    subheading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg leading-relaxed text-muted-foreground max-w-xl",
                        children: subheading
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/FeatureSection.tsx",
                        lineNumber: 23,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full",
                        children: features.map((feature)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-medium",
                                        children: feature.title
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/sections/FeatureSection.tsx",
                                        lineNumber: 30,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground",
                                        children: feature.description
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/sections/FeatureSection.tsx",
                                        lineNumber: 31,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, feature._key, true, {
                                fileName: "[project]/packages/web/src/components/sections/FeatureSection.tsx",
                                lineNumber: 29,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/FeatureSection.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/sections/FeatureSection.tsx",
                lineNumber: 11,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/sections/FeatureSection.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/sections/FeatureSection.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = FeatureSection;
var _c;
__turbopack_context__.k.register(_c, "FeatureSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/SanityNextImage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SanityNextImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2d$image$2f$dist$2f$mjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sanity-image/dist/mjs/index.js [app-client] (ecmascript)");
;
;
;
;
function SanityNextImage(props) {
    const { image, src, alt = '', width, height, className, style, sizes, fill, priority, placeholder, blurDataURL } = props;
    // If a Sanity image object is provided, build a sensible default URL using urlFor
    let resolvedSrc = src;
    // If a Sanity image object is provided, prefer rendering with the `sanity-image` plugin
    if (image && typeof image === 'object' && image.asset) {
        // Determine asset id/ref
        const asset = image.asset;
        let assetId;
        if (typeof asset === 'string') {
            assetId = asset;
        } else if (asset && typeof asset === 'object') {
            const a = asset;
            assetId = a._ref || a._id;
        }
        if (assetId) {
            // Use the SanityImage component from the plugin. It will build srcSet and support preview LQIP.
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2d$image$2f$dist$2f$mjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SanityImage"], {
                id: assetId,
                projectId: ("TURBOPACK compile-time value", "hs6e6yx5"),
                dataset: ("TURBOPACK compile-time value", "production"),
                width: width,
                height: height,
                className: className,
                style: style,
                // supply a tiny preview if available (ensure undefined, not null)
                preview: blurDataURL ?? image?.blurDataURL ?? undefined,
                alt: alt ?? image?.alt ?? ''
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/SanityNextImage.tsx",
                lineNumber: 48,
                columnNumber: 9
            }, this);
        }
        // Try to use the plugin URL builder first
        try {
            const projectId = ("TURBOPACK compile-time value", "hs6e6yx5");
            const dataset = ("TURBOPACK compile-time value", "production");
            const baseUrl = ("TURBOPACK compile-time truthy", 1) ? `https://cdn.sanity.io/images/${projectId}/${dataset}/` : "TURBOPACK unreachable";
            const assetVal = image.asset;
            let maybeAssetId;
            if (typeof assetVal === 'string') maybeAssetId = assetVal;
            else if (assetVal && typeof assetVal === 'object') maybeAssetId = assetVal._ref || assetVal._id;
            if (maybeAssetId && baseUrl) {
                const srcObj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2d$image$2f$dist$2f$mjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSrc"])({
                    id: maybeAssetId,
                    baseUrl,
                    width,
                    height,
                    mode: fill ? 'cover' : 'contain'
                });
                resolvedSrc = srcObj?.src ?? undefined;
            }
        } catch (err) {
            resolvedSrc = undefined;
        }
        // Plugin-only: if plugin did not return a URL, do not fallback to legacy builder
        if (!resolvedSrc) {
            return null;
        }
    }
    // Fallback: if no resolved src, render nothing
    if (!resolvedSrc) return null;
    // Prefer Next Image's `fill` mode when `fill` is true
    if (fill) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: resolvedSrc,
            alt: alt,
            fill: true,
            className: className,
            style: style,
            sizes: sizes,
            priority: priority,
            placeholder: placeholder,
            blurDataURL: blurDataURL ?? image?.blurDataURL ?? undefined
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/SanityNextImage.tsx",
            lineNumber: 91,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        src: resolvedSrc,
        alt: alt,
        width: width,
        height: height,
        className: className,
        style: style,
        sizes: sizes,
        priority: priority,
        placeholder: placeholder,
        blurDataURL: blurDataURL ?? image?.blurDataURL ?? undefined
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/SanityNextImage.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
}
_c = SanityNextImage;
var _c;
__turbopack_context__.k.register(_c, "SanityNextImage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/lib/blogTranslations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Blog UI translations (hardcoded text that doesn't belong in Sanity Studio)
__turbopack_context__.s([
    "blogTranslations",
    ()=>blogTranslations,
    "getBlogTranslation",
    ()=>getBlogTranslation
]);
const blogTranslations = {
    nl: {
        // Navigation
        home: 'Home',
        blog: 'Blog',
        backToBlog: 'Terug naar blog',
        backToAllBlogs: 'Terug naar alle blogs',
        // Categories
        allCategories: 'Alle categorieën',
        filterByCategory: 'Filter op categorie',
        filteredByCategory: 'Gefilterd op categorie',
        postsFound: 'berichten gevonden',
        allCategoriesShown: 'Alle categorieën weergegeven',
        // Sorting
        sort: 'Sorteren',
        sortOptions: 'Sorteer opties',
        sortedBy: 'Gesorteerd op',
        newest: 'Nieuwste eerst',
        oldest: 'Oudste eerst',
        mostPopular: 'Populairste',
        shortestReadTime: 'Kortste leestijd',
        // View modes
        view: 'Weergave',
        viewOptions: 'Weergave opties',
        grid: 'Raster',
        list: 'Lijst',
        // Time and reading
        minRead: 'min leestijd',
        publishedOn: 'Gepubliceerd op',
        // Pagination
        page: 'Pagina',
        of: 'van',
        previous: 'Vorige',
        next: 'Volgende',
        // Posts
        noPosts: 'Geen berichten gevonden',
        readMore: 'Lees meer',
        // Highlighted
        highlightedPosts: 'Uitgelichte berichten',
        moreBlogs: 'Meer blogs'
    },
    en: {
        // Navigation
        home: 'Home',
        blog: 'Blog',
        backToBlog: 'Back to blog',
        backToAllBlogs: 'Back to all blogs',
        // Categories
        allCategories: 'All categories',
        filterByCategory: 'Filter by category',
        filteredByCategory: 'Filtered by category',
        postsFound: 'posts found',
        allCategoriesShown: 'All categories shown',
        // Sorting
        sort: 'Sort',
        sortOptions: 'Sort options',
        sortedBy: 'Sorted by',
        newest: 'Newest first',
        oldest: 'Oldest first',
        mostPopular: 'Most popular',
        shortestReadTime: 'Shortest read time',
        // View modes
        view: 'View',
        viewOptions: 'View options',
        grid: 'Grid',
        list: 'List',
        // Time and reading
        minRead: 'min read',
        publishedOn: 'Published on',
        // Pagination
        page: 'Page',
        of: 'of',
        previous: 'Previous',
        next: 'Next',
        // Posts
        noPosts: 'No posts found',
        readMore: 'Read more',
        // Highlighted
        highlightedPosts: 'Featured posts',
        moreBlogs: 'More blogs'
    }
};
function getBlogTranslation(lang, key) {
    const safeLang = lang === 'en' ? 'en' : 'nl';
    return blogTranslations[safeLang][key];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/pageBuilder/BlogCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$SanityNextImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/SanityNextImage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/icons/FeatherIcons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$blogTranslations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/lib/blogTranslations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const toneStyles = {
    surface: {
        background: 'hsl(var(--dc-surface))',
        border: 'hsl(var(--dc-border)/0.2)',
        color: 'hsl(var(--dc-text))'
    },
    accent: {
        background: 'hsl(var(--dc-brand)/0.08)',
        border: 'hsl(var(--dc-brand)/0.3)',
        color: 'hsl(var(--dc-text))'
    },
    contrast: {
        background: 'linear-gradient(135deg, hsl(var(--dc-primary)) 0%, hsl(var(--dc-brand)) 100%)',
        border: 'hsl(var(--dc-on-primary)/0.2)',
        color: 'hsl(var(--dc-on-primary))'
    }
};
// Helper function to calculate read time from text body
function calculateReadTimeFromBody(body) {
    if (!body || !Array.isArray(body)) return undefined;
    let wordCount = 0;
    const traverse = (blocks)=>{
        blocks.forEach((block)=>{
            if (typeof block === 'object' && block !== null) {
                const typedBlock = block;
                if (typedBlock._type === 'block' && Array.isArray(typedBlock.children)) {
                    typedBlock.children.forEach((child)=>{
                        if (typeof child === 'object' && child !== null) {
                            const typedChild = child;
                            if (typeof typedChild.text === 'string') {
                                wordCount += typedChild.text.split(/\s+/).filter(Boolean).length;
                            }
                        }
                    });
                }
                if (Array.isArray(typedBlock.children)) {
                    traverse(typedBlock.children);
                }
            }
        });
    };
    traverse(body);
    return wordCount > 0 ? Math.max(1, Math.round(wordCount / 200)) : undefined;
}
function BlogCardItem({ post, ctaLabel, tone, showAuthor = true, borderRadius = 'default', layout = 'grid', compact = false }) {
    _s();
    const style = toneStyles[tone];
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const lang = pathname?.split('/')?.[1] || 'nl';
    const t = (key)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$blogTranslations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBlogTranslation"])(lang, key);
    const href = post.slug ? `/${lang}/blog/${post.slug}` : '#';
    const isInternal = href.startsWith('/');
    const formattedDate = post.publishedAt ? new Intl.DateTimeFormat('nl-NL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(new Date(post.publishedAt)) : null;
    // Use presence of assets to gate rendering; actual rendering uses `SanityNextImage` which uses the plugin
    const hasMainImage = Boolean(post.mainImage?.asset);
    const hasAuthorImage = Boolean(post.author?.image?.asset);
    const categories = post.categories || [];
    const estimatedReadTime = post.estimatedReadTime ?? calculateReadTimeFromBody(post.body);
    const ClockIconComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFeatherIcon"])('clock');
    const roundedClass = borderRadius === 'small' ? 'rounded-xl' : 'rounded-3xl';
    const CARD_MIN_HEIGHT = compact ? '420px' : '520px';
    // Render different layouts for grid vs list
    if (layout === 'list') {
        // List layout: horizontal card with image on the left
        const ImageColumn = hasMainImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-shrink-0 w-36 sm:w-40 md:w-48 overflow-hidden rounded-l-lg",
            style: {
                backgroundColor: '#ffffff'
            },
            children: (()=>{
                const mainImageBlur = post.mainImage?.blurDataURL;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$SanityNextImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    image: post.mainImage,
                    alt: post.mainImage?.alt || '',
                    width: compact ? 360 : 480,
                    height: compact ? 220 : 300,
                    className: "h-full w-full object-cover",
                    priority: false,
                    placeholder: mainImageBlur ? 'blur' : undefined
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                    lineNumber: 90,
                    columnNumber: 13
                }, this);
            })()
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
            lineNumber: 86,
            columnNumber: 7
        }, this) : null;
        const CardInnerList = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
            "aria-labelledby": `blog-title-${post._id}`,
            className: `flex h-auto flex-row ${roundedClass} shadow-md transition hover:-translate-y-1 hover:shadow-xl focus-within:-translate-y-1 focus-within:shadow-xl overflow-hidden`,
            style: {
                background: style.background,
                border: `1px solid ${style.border}`,
                color: style.color
            },
            children: [
                ImageColumn,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-1 flex-col gap-4 p-6 min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: `${compact ? 'text-base' : 'text-lg'} font-semibold leading-snug tracking-tight break-words whitespace-normal`,
                                    children: post.title
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                    lineNumber: 113,
                                    columnNumber: 13
                                }, this),
                                post.summary ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm leading-relaxed text-[hsl(var(--dc-text)/0.85)] break-words whitespace-normal",
                                    style: {
                                        display: '-webkit-box',
                                        WebkitLineClamp: 8,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    },
                                    children: post.summary
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                    lineNumber: 115,
                                    columnNumber: 15
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                            lineNumber: 112,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-auto flex items-center justify-between gap-3 min-w-0",
                            children: [
                                showAuthor && (post.author?.name || post.author?.role) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        hasAuthorImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$SanityNextImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            image: post.author?.image,
                                            alt: post.author?.name || '',
                                            width: 40,
                                            height: 40,
                                            className: "h-10 w-10 rounded-full object-cover ring-2 ring-[hsl(var(--dc-border)/0.4)]"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                            lineNumber: 122,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--dc-brand)/0.15)] text-[hsl(var(--dc-brand))]",
                                            "aria-hidden": true,
                                            children: post.author?.name ? post.author.name.charAt(0) : 'A'
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                            lineNumber: 130,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col min-w-0",
                                            children: [
                                                post.author?.name ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium leading-tight max-w-[10rem] sm:max-w-[12rem]",
                                                    style: {
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden'
                                                    },
                                                    children: post.author.name
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                                    lineNumber: 136,
                                                    columnNumber: 21
                                                }, this) : null,
                                                post.author?.role ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-[hsl(var(--dc-text)/0.65)] max-w-[10rem] sm:max-w-[12rem]",
                                                    style: {
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden'
                                                    },
                                                    children: post.author.role
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 21
                                                }, this) : null
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                            lineNumber: 134,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                    lineNumber: 120,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex-shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "sr-only",
                                            children: ctaLabel
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                            lineNumber: 145,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative inline-flex items-center justify-center h-9 w-9 rounded-full bg-[hsl(var(--dc-surface-98))] text-[hsl(var(--dc-text))] shadow-sm overflow-hidden transition-all duration-200 transform group-hover:scale-[1.06] group-focus-within:scale-[1.06] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-brand)/0.28)]",
                                            "aria-hidden": true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "aria-hidden": true,
                                                    className: "absolute inset-0 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-30",
                                                    style: {
                                                        background: 'hsl(var(--dc-brand))'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "h-4 w-4 relative z-10 transition-colors duration-200",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    "aria-hidden": true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M7 17L17 7M17 7H7M17 7V17"
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                                        lineNumber: 150,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                            lineNumber: 146,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                    lineNumber: 144,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
            lineNumber: 105,
            columnNumber: 7
        }, this);
        if (isInternal) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: href,
                "aria-label": `${ctaLabel}: ${post.title}`,
                "aria-describedby": post.summary ? `blog-summary-${post._id}` : undefined,
                className: "group block rounded-lg overflow-clip focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]",
                onKeyDown: (e)=>{
                    if (e.key === ' ') {
                        e.preventDefault();
                        e.currentTarget.click();
                    }
                },
                children: CardInnerList
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                lineNumber: 161,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: href,
            "aria-label": `${ctaLabel}: ${post.title}`,
            "aria-describedby": post.summary ? `blog-summary-${post._id}` : undefined,
            className: "group block rounded-lg overflow-clip focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]",
            onKeyDown: (e)=>{
                if (e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            },
            children: CardInnerList
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
            lineNumber: 178,
            columnNumber: 7
        }, this);
    }
    // Default (grid) layout follows below
    const CardInner = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: `flex h-full flex-col ${roundedClass} shadow-md transition hover:-translate-y-1 hover:shadow-xl focus-within:-translate-y-1 focus-within:shadow-xl`,
        style: {
            background: style.background,
            border: `1px solid ${style.border}`,
            color: style.color
        },
        children: [
            hasMainImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative overflow-hidden ${borderRadius === 'small' ? 'rounded-t-xl' : 'rounded-t-3xl'}`,
                style: {
                    backgroundColor: '#ffffff',
                    maxHeight: compact ? '160px' : '220px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full transition-transform duration-300 group-hover:scale-[1.03]",
                    children: [
                        (()=>{
                            const mainImageBlur = post.mainImage?.blurDataURL;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$SanityNextImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                image: post.mainImage,
                                alt: post.mainImage?.alt || '',
                                width: compact ? 640 : 800,
                                height: compact ? 160 : 220,
                                className: compact ? 'block h-[160px] w-full object-cover' : 'block h-[220px] w-full object-cover',
                                priority: false,
                                style: {
                                    display: 'block',
                                    width: '100%'
                                },
                                placeholder: mainImageBlur ? 'blur' : undefined
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                lineNumber: 211,
                                columnNumber: 17
                            }, this);
                        })(),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pointer-events-none absolute",
                            style: {
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.3) 0%, transparent 50%)'
                            },
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                            lineNumber: 224,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pointer-events-none absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100",
                            style: {
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.2) 85%, transparent 100%)'
                            },
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                            lineNumber: 236,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pointer-events-none absolute inset-0 z-10 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100",
                            style: {
                                color: '#ffffff'
                            },
                            "aria-hidden": "true",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-end justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: categories.filter(Boolean).map((category, idx)=>{
                                            const typedCategory = category;
                                            const key = typedCategory._id || `${typedCategory.slug || 'cat'}-${idx}`;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-block rounded-full bg-[rgba(255,255,255,0.2)] px-3 py-1 text-sm font-medium backdrop-blur-sm",
                                                children: category.title
                                            }, key, false, {
                                                fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                                lineNumber: 260,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                        lineNumber: 255,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-end gap-1.5 text-sm font-medium shrink-0",
                                        children: [
                                            formattedDate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "inline-flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CalendarIcon"], {
                                                        "aria-hidden": true,
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                                        lineNumber: 272,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                                        dateTime: post.publishedAt,
                                                        children: formattedDate
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                                        lineNumber: 273,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                                lineNumber: 271,
                                                columnNumber: 21
                                            }, this) : null,
                                            estimatedReadTime ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "inline-flex items-center gap-1.5",
                                                children: [
                                                    ClockIconComponent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClockIconComponent, {
                                                        "aria-hidden": true,
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                                        lineNumber: 278,
                                                        columnNumber: 45
                                                    }, this) : null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            estimatedReadTime,
                                                            " ",
                                                            t('minRead')
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                                        lineNumber: 279,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                                lineNumber: 277,
                                                columnNumber: 21
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                        lineNumber: 269,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                lineNumber: 254,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                            lineNumber: 249,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                    lineNumber: 207,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                lineNumber: 206,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 flex-col gap-4 p-6 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                id: `blog-title-${post._id}`,
                                className: `${compact ? 'text-base' : 'text-lg'} font-semibold leading-snug tracking-tight break-words whitespace-normal`,
                                children: post.title
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                lineNumber: 290,
                                columnNumber: 11
                            }, this),
                            post.summary ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                id: `blog-summary-${post._id}`,
                                className: "text-sm leading-relaxed text-[hsl(var(--dc-text)/0.85)] break-words whitespace-normal",
                                style: {
                                    display: '-webkit-box',
                                    WebkitLineClamp: 8,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                },
                                children: post.summary
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                lineNumber: 292,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-auto flex items-center justify-between gap-3 min-w-0",
                        children: [
                            showAuthor && (post.author?.name || post.author?.role) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    hasAuthorImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$SanityNextImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        image: post.author?.image,
                                        alt: post.author?.name || '',
                                        width: 48,
                                        height: 48,
                                        className: "h-12 w-12 rounded-full object-cover ring-2 ring-[hsl(var(--dc-border)/0.4)]"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                        lineNumber: 299,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--dc-brand)/0.15)] text-[hsl(var(--dc-brand))]",
                                        "aria-hidden": true,
                                        children: post.author?.name ? post.author.name.charAt(0) : 'A'
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                        lineNumber: 307,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col min-w-0",
                                        children: [
                                            post.author?.name ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium leading-tight max-w-[12rem]",
                                                style: {
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                },
                                                children: post.author.name
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                                lineNumber: 316,
                                                columnNumber: 19
                                            }, this) : null,
                                            post.author?.role ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-[hsl(var(--dc-text)/0.65)] max-w-[12rem]",
                                                style: {
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                },
                                                children: post.author.role
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                                lineNumber: 319,
                                                columnNumber: 19
                                            }, this) : null,
                                            post.author?.company ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-[hsl(var(--dc-text)/0.5)] max-w-[12rem]",
                                                style: {
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                },
                                                children: post.author.company
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                                lineNumber: 322,
                                                columnNumber: 19
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                        lineNumber: 314,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                lineNumber: 297,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex-shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "sr-only",
                                        children: ctaLabel
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                        lineNumber: 328,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative inline-flex items-center justify-center h-9 w-9 rounded-full bg-[hsl(var(--dc-surface-98))] text-[hsl(var(--dc-text))] shadow-sm overflow-hidden transition-all duration-200 transform group-hover:scale-[1.06] group-focus-within:scale-[1.06] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-brand)/0.28)]",
                                        "aria-hidden": true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                "aria-hidden": true,
                                                className: "absolute inset-0 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-30",
                                                style: {
                                                    background: 'hsl(var(--dc-brand))'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                                lineNumber: 330,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "h-4 w-4 relative z-10 transition-colors duration-200",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                "aria-hidden": true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M7 17L17 7M17 7H7M17 7V17"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                                    lineNumber: 332,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                                lineNumber: 331,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                        lineNumber: 329,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                                lineNumber: 327,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                        lineNumber: 295,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                lineNumber: 288,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
        lineNumber: 197,
        columnNumber: 5
    }, this);
    if (isInternal) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            "aria-label": `${ctaLabel}: ${post.title}`,
            "aria-describedby": post.summary ? `blog-summary-${post._id}` : undefined,
            className: "group block rounded-3xl overflow-clip focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]",
            onKeyDown: (e)=>{
                if (e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            },
            children: CardInner
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
            lineNumber: 343,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: href,
        "aria-label": `${ctaLabel}: ${post.title}`,
        "aria-describedby": post.summary ? `blog-summary-${post._id}` : undefined,
        className: "group block rounded-3xl overflow-clip focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]",
        onKeyDown: (e)=>{
            if (e.key === ' ') {
                e.preventDefault();
                e.currentTarget.click();
            }
        },
        children: CardInner
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
        lineNumber: 360,
        columnNumber: 5
    }, this);
}
_s(BlogCardItem, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = BlogCardItem;
function BlogCard({ component }) {
    const posts = Array.isArray(component.resolvedPost) ? component.resolvedPost : component.resolvedPost ? [
        component.resolvedPost
    ] : [];
    const tone = component.tone ?? 'surface';
    const ctaLabel = component.ctaLabel ?? 'Read more';
    const gridMode = component.gridMode ?? 'default';
    const showAuthor = component.showAuthor ?? true;
    const borderRadius = component.borderRadius ?? 'default';
    if (posts.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-3xl border border-dashed border-[hsl(var(--dc-border)/0.4)] p-6 text-sm text-[hsl(var(--dc-text)/0.7)]",
            children: "Geen blog gevonden voor de gekozen criteria."
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
            lineNumber: 391,
            columnNumber: 7
        }, this);
    }
    // Support 'list' gridMode which renders a stacked list of horizontal items
    if (gridMode === 'list') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col",
            children: posts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BlogCardItem, {
                        post: post,
                        ctaLabel: ctaLabel,
                        tone: tone,
                        showAuthor: showAuthor,
                        borderRadius: borderRadius,
                        layout: "list",
                        compact: component.compact
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                        lineNumber: 403,
                        columnNumber: 13
                    }, this)
                }, post._id, false, {
                    fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                    lineNumber: 402,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
            lineNumber: 400,
            columnNumber: 7
        }, this);
    }
    // Use CSS Grid with clamp + minmax + fr units for fully responsive columns.
    // The `auto-fit` behaviour collapses empty tracks so cards fill the
    // available space. `clamp()` provides a sensible min/ideal/max width
    // for each card — change the values if you want wider or narrower cards.
    const gridStyle = gridMode === 'single' ? {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1.5rem',
        width: '100%'
    } : {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(16rem, 20ch, 28rem), 1fr))',
        gap: '1.5rem',
        width: '100%',
        alignItems: 'stretch'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: gridStyle,
        children: posts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BlogCardItem, {
                post: post,
                ctaLabel: ctaLabel,
                tone: tone,
                showAuthor: showAuthor,
                borderRadius: borderRadius,
                compact: component.compact
            }, post._id, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
                lineNumber: 427,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/pageBuilder/BlogCard.tsx",
        lineNumber: 425,
        columnNumber: 5
    }, this);
}
_c1 = BlogCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "BlogCardItem");
__turbopack_context__.k.register(_c1, "BlogCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/sections/BlogSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/sanity/lib/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$BlogCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/pageBuilder/BlogCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$blogTranslations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/lib/blogTranslations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function BlogSection(props) {
    _s();
    const { heading, subheading, limit = 3, tone = "surface", ctaLabel, viewAllLink, category, sortBy = 'newest', tags, author, minReadTime, maxReadTime } = props;
    const resolvedLimit = Math.min(Math.max(limit ?? 3, 1), 12);
    const categoryRef = category?._ref ?? null;
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const lang = pathname?.split('/')?.[1] === 'en' ? 'en' : 'nl';
    const t = (key)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$blogTranslations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBlogTranslation"])(lang, key);
    const resolvedCtaLabel = ctaLabel ?? t('readMore');
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BlogSection.useEffect": ()=>{
            let isSubscribed = true;
            async function fetchPosts() {
                setIsLoading(true);
                setError(null);
                try {
                    // Build GROQ filter and ordering based on props
                    const filters = [
                        '_type == "blogPost"',
                        'defined(publishedAt)'
                    ];
                    if (categoryRef) {
                        filters.push(`$categoryId in categories[]._ref`);
                    }
                    if (tags && Array.isArray(tags) && tags.length > 0) {
                        // $tagRefs will be an array of tag _refs
                        filters.push(`count(tags[]._ref[@ in $tagRefs]) > 0`);
                    }
                    if (author?._ref) {
                        filters.push(`author._ref == $authorRef`);
                    }
                    if (typeof minReadTime === 'number') {
                        filters.push(`estimatedReadTime >= $minReadTime`);
                    }
                    if (typeof maxReadTime === 'number') {
                        filters.push(`estimatedReadTime <= $maxReadTime`);
                    }
                    let orderBy = 'publishedAt desc';
                    switch(sortBy){
                        case 'oldest':
                            orderBy = 'publishedAt asc';
                            break;
                        case 'viewCount':
                            orderBy = 'viewCount desc';
                            break;
                        case 'readTime':
                            orderBy = 'estimatedReadTime asc';
                            break;
                        case 'newest':
                        default:
                            orderBy = 'publishedAt desc';
                            break;
                    }
                    const filterString = filters.join(' && ');
                    const query = `* [${filterString}] | order(${orderBy}) [0...$limit] {\n  _id,\n  title,\n  "slug": slug.current,\n  publishedAt,\n  excerpt,\n  body,\n  estimatedReadTime,\n  mainImage{ ..., },\n  author->{ name, role, company, image{ ... } },\n  categories[]->{ title, slug }\n}`;
                    const vars = {
                        limit: resolvedLimit
                    };
                    if (categoryRef) vars['categoryId'] = categoryRef;
                    if (tags && Array.isArray(tags) && tags.length > 0) vars['tagRefs'] = tags.map({
                        "BlogSection.useEffect.fetchPosts": (t)=>t._ref
                    }["BlogSection.useEffect.fetchPosts"]).filter(Boolean);
                    if (author?._ref) vars['authorRef'] = author._ref;
                    if (typeof minReadTime === 'number') vars['minReadTime'] = minReadTime;
                    if (typeof maxReadTime === 'number') vars['maxReadTime'] = maxReadTime;
                    const results = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].fetch(query, vars);
                    if (!isSubscribed) return;
                    const mapped = results.map({
                        "BlogSection.useEffect.fetchPosts.mapped": (post)=>({
                                _id: post._id,
                                title: post.title ?? "Untitled",
                                slug: post.slug,
                                publishedAt: post.publishedAt,
                                summary: post.excerpt,
                                body: post.body,
                                mainImage: post.mainImage,
                                author: post.author,
                                categories: post.categories,
                                estimatedReadTime: post.estimatedReadTime
                            })
                    }["BlogSection.useEffect.fetchPosts.mapped"]);
                    setPosts(mapped);
                } catch (err) {
                    if (!isSubscribed) return;
                    const message = err instanceof Error ? err.message : "Er ging iets mis bij het laden van blogs.";
                    setError(message);
                } finally{
                    if (isSubscribed) {
                        setIsLoading(false);
                    }
                }
            }
            fetchPosts();
            return ({
                "BlogSection.useEffect": ()=>{
                    isSubscribed = false;
                }
            })["BlogSection.useEffect"];
        }
    }["BlogSection.useEffect"], [
        resolvedLimit,
        categoryRef,
        sortBy,
        tags,
        tags?.length,
        author?._ref,
        minReadTime,
        maxReadTime
    ]);
    const cardComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BlogSection.useMemo[cardComponent]": ()=>({
                _type: "blogCardComponent",
                _key: "blog-section",
                tone,
                ctaLabel: resolvedCtaLabel,
                borderRadius: 'small',
                resolvedPost: posts
            })
    }["BlogSection.useMemo[cardComponent]"], [
        posts,
        tone,
        resolvedCtaLabel
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full py-20 lg:py-32",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-2xl text-center",
                    children: [
                        heading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl font-semibold tracking-tight md:text-5xl",
                            children: heading
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/BlogSection.tsx",
                            lineNumber: 168,
                            columnNumber: 13
                        }, this) : null,
                        subheading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-4 text-base text-muted-foreground md:text-lg",
                            children: subheading
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/BlogSection.tsx",
                            lineNumber: 171,
                            columnNumber: 13
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/sections/BlogSection.tsx",
                    lineNumber: 166,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-12",
                    "aria-live": "polite",
                    children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3",
                        children: Array.from({
                            length: Math.min(resolvedLimit, 3)
                        }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-80 animate-pulse rounded-xl bg-[hsl(var(--dc-surface))/0.6]"
                            }, `skeleton-${index}`, false, {
                                fileName: "[project]/packages/web/src/components/sections/BlogSection.tsx",
                                lineNumber: 179,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/BlogSection.tsx",
                        lineNumber: 177,
                        columnNumber: 13
                    }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-[hsl(var(--dc-border)/0.4)] bg-[hsl(var(--dc-surface)/0.5)] p-6 text-center text-sm text-[hsl(var(--dc-error))]",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/BlogSection.tsx",
                        lineNumber: 186,
                        columnNumber: 13
                    }, this) : posts.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$BlogCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                component: cardComponent
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/BlogSection.tsx",
                                lineNumber: 191,
                                columnNumber: 15
                            }, this),
                            viewAllLink?.url && viewAllLink?.label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-12 flex justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: viewAllLink.url,
                                    className: "inline-flex items-center gap-2 rounded-full bg-[hsl(var(--dc-brand))] px-6 py-3 text-sm font-semibold text-[hsl(var(--dc-on-primary))] transition hover:bg-[hsl(var(--dc-brand)/0.9)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]",
                                    children: [
                                        viewAllLink.label,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "aria-hidden": true,
                                            children: "→"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/sections/BlogSection.tsx",
                                            lineNumber: 198,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/src/components/sections/BlogSection.tsx",
                                    lineNumber: 194,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/BlogSection.tsx",
                                lineNumber: 193,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-dashed border-[hsl(var(--dc-border)/0.4)] p-6 text-center text-sm text-[hsl(var(--dc-text)/0.7)]",
                        children: "Geen blogberichten gevonden."
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/BlogSection.tsx",
                        lineNumber: 204,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/BlogSection.tsx",
                    lineNumber: 175,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/src/components/sections/BlogSection.tsx",
            lineNumber: 165,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/sections/BlogSection.tsx",
        lineNumber: 164,
        columnNumber: 5
    }, this);
}
_s(BlogSection, "EQl2J3Po7Mme7BJqjbpbyL5sM/A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = BlogSection;
var _c;
__turbopack_context__.k.register(_c, "BlogSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/sections/TestimonialsSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TestimonialsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function TestimonialsSection(props) {
    const { heading, subheading, testimonials = [] } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full py-20 lg:py-40",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-8 text-center",
                children: [
                    heading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl md:text-5xl tracking-tighter",
                        children: heading
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/TestimonialsSection.tsx",
                        lineNumber: 12,
                        columnNumber: 23
                    }, this),
                    subheading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground",
                        children: subheading
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/TestimonialsSection.tsx",
                        lineNumber: 13,
                        columnNumber: 26
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8",
                        children: testimonials.map((testimonial)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-4 p-6 border rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground",
                                        children: [
                                            '"',
                                            testimonial.quote,
                                            '"'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/components/sections/TestimonialsSection.tsx",
                                        lineNumber: 17,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-medium",
                                        children: testimonial.name
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/sections/TestimonialsSection.tsx",
                                        lineNumber: 18,
                                        columnNumber: 17
                                    }, this),
                                    testimonial.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-muted-foreground",
                                        children: testimonial.title
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/sections/TestimonialsSection.tsx",
                                        lineNumber: 19,
                                        columnNumber: 39
                                    }, this)
                                ]
                            }, testimonial._key, true, {
                                fileName: "[project]/packages/web/src/components/sections/TestimonialsSection.tsx",
                                lineNumber: 16,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/TestimonialsSection.tsx",
                        lineNumber: 14,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/sections/TestimonialsSection.tsx",
                lineNumber: 11,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/sections/TestimonialsSection.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/sections/TestimonialsSection.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = TestimonialsSection;
var _c;
__turbopack_context__.k.register(_c, "TestimonialsSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/sections/PricingSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PricingSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function PricingSection(props) {
    const { heading, subheading, plans = [] } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full py-20 lg:py-40",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-8 text-center",
                children: [
                    heading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl md:text-5xl tracking-tighter",
                        children: heading
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/PricingSection.tsx",
                        lineNumber: 12,
                        columnNumber: 23
                    }, this),
                    subheading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground",
                        children: subheading
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/PricingSection.tsx",
                        lineNumber: 13,
                        columnNumber: 26
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-8 mt-8",
                        children: plans.map((plan)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-4 p-6 border rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold",
                                        children: plan.title
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/sections/PricingSection.tsx",
                                        lineNumber: 17,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-3xl font-bold",
                                        children: plan.price
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/sections/PricingSection.tsx",
                                        lineNumber: 18,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground",
                                        children: plan.description
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/sections/PricingSection.tsx",
                                        lineNumber: 19,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, plan._key, true, {
                                fileName: "[project]/packages/web/src/components/sections/PricingSection.tsx",
                                lineNumber: 16,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/PricingSection.tsx",
                        lineNumber: 14,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/sections/PricingSection.tsx",
                lineNumber: 11,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/sections/PricingSection.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/sections/PricingSection.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = PricingSection;
var _c;
__turbopack_context__.k.register(_c, "PricingSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/sections/CTASection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CTASection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2d$image$2f$dist$2f$mjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sanity-image/dist/mjs/index.js [app-client] (ecmascript)");
"use client";
;
;
function CTASection(props) {
    const { heading, subheading, badgeText, buttons = [], bannerBackground = false, backgroundColor = 'soft', layout = 'noImage', image } = props;
    // Safely extract image metadata with proper null checks
    const hasImage = image && typeof image === 'object' && layout !== 'noImage';
    const altText = (hasImage && 'alt' in image ? image.alt : '') || '';
    const caption = (hasImage && 'caption' in image ? image.caption : '') || '';
    const objectFit = (hasImage && 'objectFit' in image ? image.objectFit : 'cover') || 'cover';
    const aspectRatio = (hasImage && 'aspectRatio' in image ? image.aspectRatio : 'auto') || 'auto';
    const displaySize = hasImage && 'displaySize' in image && typeof image.displaySize === 'number' ? image.displaySize : 100;
    // Build image URL with proper parameters based on objectFit
    const imageUrl = (()=>{
        if (!hasImage || !image.asset) return null;
        try {
            const projectId = ("TURBOPACK compile-time value", "hs6e6yx5");
            const dataset = ("TURBOPACK compile-time value", "production");
            const baseUrl = ("TURBOPACK compile-time truthy", 1) ? `https://cdn.sanity.io/images/${projectId}/${dataset}/` : "TURBOPACK unreachable";
            const asset = image.asset;
            let assetId;
            if (typeof asset === 'string') {
                assetId = asset;
            } else if (asset && typeof asset === 'object') {
                const maybe = asset;
                assetId = maybe._ref || maybe._id;
            }
            if (assetId && baseUrl) {
                const buildParams = objectFit === 'contain' ? {
                    id: assetId,
                    baseUrl,
                    width: 1200,
                    mode: 'contain'
                } : {
                    id: assetId,
                    baseUrl,
                    width: 1200,
                    height: 800,
                    mode: 'cover'
                };
                const srcObj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2d$image$2f$dist$2f$mjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSrc"])(buildParams);
                return srcObj?.src ?? null;
            }
        } catch (err) {
            console.error('Error building image URL:', err);
            return null;
        }
        return null;
    })();
    // Calculate fractional widths based on displaySize (for contain mode only)
    const getGridColumnClass = ()=>{
        if (objectFit !== 'contain') {
            return 'lg:grid-cols-2'; // Default 50/50 split for cover mode
        }
        // For contain mode, adjust based on displaySize percentage
        // When imageLeft: image is column 1, text is column 2
        // When imageRight: text is column 1, image is column 2
        const isImageLeft = layout === 'imageLeft';
        // Calculate fraction based on percentage (e.g., 25% = 1fr, 75% = 3fr)
        const imageFr = Math.round(displaySize / 25) || 1;
        const textFr = Math.round((100 - displaySize) / 25) || 1;
        if (imageFr === textFr) {
            return 'lg:grid-cols-2'; // Equal split
        }
        return isImageLeft ? `lg:grid-cols-[${imageFr}fr_${textFr}fr]` : `lg:grid-cols-[${textFr}fr_${imageFr}fr]`;
    };
    // Get background color class based on selected color
    const getBgColorClass = ()=>{
        switch(backgroundColor){
            case 'soft':
                return 'bg-[hsl(var(--dc-bg-soft))]';
            case 'accent':
                return 'bg-[hsl(var(--dc-primary))]';
            case 'none':
                return 'bg-transparent';
            default:
                return 'bg-[hsl(var(--dc-bg-soft))]';
        }
    };
    // Render image block with format controls (similar to SplitSection)
    const ImageBlock = ()=>{
        if (!imageUrl) return null;
        // When aspectRatio is auto and objectFit is contain, let image determine size naturally
        if (aspectRatio === 'auto' && objectFit === 'contain') {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
                className: "relative flex justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: imageUrl,
                        alt: altText,
                        className: "h-auto object-contain",
                        style: {
                            maxWidth: `${displaySize}%`,
                            width: '100%'
                        },
                        loading: "lazy"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this),
                    caption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                        className: "mt-3 text-sm text-[hsl(var(--dc-text-muted))] text-center",
                        children: caption
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                        lineNumber: 110,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                lineNumber: 101,
                columnNumber: 9
            }, this);
        }
        // For all other cases, use container with aspect ratio
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
            className: "relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `relative w-full flex justify-center ${objectFit === 'cover' ? 'rounded-2xl shadow-lg bg-[hsl(var(--dc-bg-soft))] overflow-hidden' : ''}`,
                    style: {
                        aspectRatio: aspectRatio === 'auto' ? '16/9' : aspectRatio
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: imageUrl,
                        alt: altText,
                        className: objectFit === 'contain' ? 'h-full object-contain' : 'w-full h-full object-cover',
                        style: objectFit === 'contain' ? {
                            maxWidth: `${displaySize}%`
                        } : {},
                        loading: "lazy"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                        lineNumber: 127,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this),
                caption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                    className: "mt-3 text-sm text-[hsl(var(--dc-text-muted))] text-center",
                    children: caption
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                    lineNumber: 136,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
            lineNumber: 120,
            columnNumber: 7
        }, this);
    };
    // Render content block
    const ContentBlock = ()=>{
        // Determine text color based on background
        const needsLightText = bannerBackground && backgroundColor === 'accent';
        const headingClass = needsLightText ? 'text-3xl md:text-5xl tracking-tighter text-[hsl(var(--dc-on-primary))]' : 'text-3xl md:text-5xl tracking-tighter';
        const subheadingClass = needsLightText ? 'max-w-xl text-[hsl(var(--dc-on-primary)/0.9)]' : 'text-muted-foreground max-w-xl';
        const badgeClass = needsLightText ? 'inline-flex items-center rounded-full border border-[hsl(var(--dc-on-primary))] text-[hsl(var(--dc-on-primary))] px-2.5 py-0.5 text-xs font-semibold' : 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold';
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-8 items-center text-center",
            children: [
                badgeText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: badgeClass,
                    children: badgeText
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                    lineNumber: 161,
                    columnNumber: 11
                }, this),
                heading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: headingClass,
                    children: heading
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                    lineNumber: 165,
                    columnNumber: 21
                }, this),
                subheading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: subheadingClass,
                    children: subheading
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                    lineNumber: 166,
                    columnNumber: 24
                }, this),
                buttons.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-4 flex-wrap justify-center",
                    children: buttons.map((button)=>{
                        const accessibleHref = button.accessibleVersionUrl?.trim();
                        const href = accessibleHref || button.url || '#';
                        const isPdfTarget = button.isPdf ?? /\.pdf(?:$|[?#])/i.test(button.url || '');
                        const hasAccessiblePdf = Boolean(accessibleHref);
                        const showAccessibleBadge = hasAccessiblePdf && isPdfTarget;
                        const isExternal = /^https?:/i.test(href);
                        const variant = button.variant || 'filled';
                        const baseClass = 'inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]';
                        // Determine if we need high contrast based on background color
                        const needsLightButtons = bannerBackground && backgroundColor === 'accent';
                        let style = {};
                        switch(variant){
                            case 'outline':
                                if (needsLightButtons) {
                                    // Light outline on dark background
                                    style = {
                                        backgroundColor: 'transparent',
                                        color: 'hsl(var(--dc-on-primary))',
                                        border: '1px solid hsl(var(--dc-on-primary))'
                                    };
                                } else {
                                    // Default outline
                                    style = {
                                        backgroundColor: 'transparent',
                                        color: 'hsl(var(--dc-primary))',
                                        border: '1px solid hsl(var(--dc-primary))'
                                    };
                                }
                                break;
                            case 'ghost':
                                if (needsLightButtons) {
                                    // Light ghost on dark background
                                    style = {
                                        backgroundColor: 'hsl(var(--dc-on-primary)/0.15)',
                                        color: 'hsl(var(--dc-on-primary))',
                                        border: '1px solid transparent'
                                    };
                                } else {
                                    // Default ghost
                                    style = {
                                        backgroundColor: 'hsl(var(--dc-primary)/0.08)',
                                        color: 'hsl(var(--dc-primary))',
                                        border: '1px solid transparent'
                                    };
                                }
                                break;
                            default:
                                if (needsLightButtons) {
                                    // White/light button on dark background
                                    style = {
                                        backgroundColor: 'hsl(var(--dc-on-primary))',
                                        color: 'hsl(var(--dc-primary))',
                                        border: '1px solid hsl(var(--dc-on-primary))'
                                    };
                                } else {
                                    // Default filled button
                                    style = {
                                        backgroundColor: 'hsl(var(--dc-primary))',
                                        color: 'hsl(var(--dc-on-primary))',
                                        border: '1px solid hsl(var(--dc-primary)/0.85)'
                                    };
                                }
                        }
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: href,
                            className: baseClass,
                            style: style,
                            target: isExternal ? '_blank' : undefined,
                            rel: isExternal ? 'noopener noreferrer' : undefined,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hy-btn__label",
                                    children: button.label
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                                    lineNumber: 246,
                                    columnNumber: 19
                                }, this),
                                showAccessibleBadge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "ml-1 rounded bg-[hsl(var(--dc-bg-soft))] px-2 py-0.5 text-xs font-semibold text-[hsl(var(--dc-text))]",
                                    children: "Toegankelijke PDF"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                                    lineNumber: 248,
                                    columnNumber: 21
                                }, this),
                                isPdfTarget && !hasAccessiblePdf && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "sr-only",
                                    children: " (PDF-bestand zonder toegankelijke versie beschikbaar)"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                                    lineNumber: 253,
                                    columnNumber: 21
                                }, this),
                                button.accessibilityNote && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "sr-only",
                                    children: [
                                        " ",
                                        button.accessibilityNote
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                                    lineNumber: 256,
                                    columnNumber: 21
                                }, this),
                                isExternal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "sr-only",
                                    children: " (opent in nieuw venster)"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                                    lineNumber: 258,
                                    columnNumber: 34
                                }, this)
                            ]
                        }, button._key, true, {
                            fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                            lineNumber: 238,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                    lineNumber: 168,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
            lineNumber: 159,
            columnNumber: 7
        }, this);
    };
    // Layout: No Image (original CTA section)
    if (layout === 'noImage') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full py-20 lg:py-40",
            children: bannerBackground ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-full ${getBgColorClass()} py-14`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 sm:px-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentBlock, {}, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                        lineNumber: 275,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                    lineNumber: 274,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                lineNumber: 273,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 sm:px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[hsl(var(--dc-bg-soft))] rounded-lg p-14",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentBlock, {}, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                        lineNumber: 281,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                    lineNumber: 280,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                lineNumber: 279,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
            lineNumber: 271,
            columnNumber: 7
        }, this);
    }
    // Layout: Image Top
    if (layout === 'imageTop') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full py-20 lg:py-40",
            children: bannerBackground ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-full ${getBgColorClass()} py-14`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 sm:px-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageBlock, {}, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                                lineNumber: 297,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentBlock, {}, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                                lineNumber: 298,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                        lineNumber: 296,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                    lineNumber: 295,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                lineNumber: 294,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 sm:px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[hsl(var(--dc-bg-soft))] rounded-lg p-14 flex flex-col gap-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageBlock, {}, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                            lineNumber: 305,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentBlock, {}, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                            lineNumber: 306,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                    lineNumber: 304,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                lineNumber: 303,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
            lineNumber: 292,
            columnNumber: 7
        }, this);
    }
    // Layout: Image Bottom
    if (layout === 'imageBottom') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full py-20 lg:py-40",
            children: bannerBackground ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-full ${getBgColorClass()} py-14`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 sm:px-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentBlock, {}, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                                lineNumber: 322,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageBlock, {}, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                                lineNumber: 323,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                        lineNumber: 321,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                    lineNumber: 320,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                lineNumber: 319,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 sm:px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[hsl(var(--dc-bg-soft))] rounded-lg p-14 flex flex-col gap-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentBlock, {}, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                            lineNumber: 330,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageBlock, {}, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                            lineNumber: 331,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                    lineNumber: 329,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                lineNumber: 328,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
            lineNumber: 317,
            columnNumber: 7
        }, this);
    }
    // Layout: Image Left or Right (two columns with responsive fractions)
    const gridColClass = getGridColumnClass();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full py-20 lg:py-40",
        children: bannerBackground ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full ${getBgColorClass()} py-14`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 sm:px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `grid ${gridColClass} gap-12 lg:gap-16 items-center ${layout === 'imageRight' ? 'lg:grid-flow-dense' : ''}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: layout === 'imageRight' ? 'lg:col-start-2' : '',
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageBlock, {}, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                                lineNumber: 349,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                            lineNumber: 348,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: layout === 'imageRight' ? 'lg:col-start-1 lg:row-start-1' : '',
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentBlock, {}, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                                lineNumber: 352,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                            lineNumber: 351,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                    lineNumber: 347,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                lineNumber: 346,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
            lineNumber: 345,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 sm:px-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[hsl(var(--dc-bg-soft))] rounded-lg p-14",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `grid ${gridColClass} gap-12 lg:gap-16 items-center ${layout === 'imageRight' ? 'lg:grid-flow-dense' : ''}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: layout === 'imageRight' ? 'lg:col-start-2' : '',
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageBlock, {}, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                                lineNumber: 362,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                            lineNumber: 361,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: layout === 'imageRight' ? 'lg:col-start-1 lg:row-start-1' : '',
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentBlock, {}, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                                lineNumber: 365,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                            lineNumber: 364,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                    lineNumber: 360,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
                lineNumber: 359,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
            lineNumber: 358,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/sections/CTASection.tsx",
        lineNumber: 343,
        columnNumber: 5
    }, this);
}
_c = CTASection;
var _c;
__turbopack_context__.k.register(_c, "CTASection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/sections/FAQSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FAQSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function FAQSection(props) {
    const { heading, subheading, badgeText, faqItems = [] } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full py-20 lg:py-40",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            badgeText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-4",
                                children: badgeText
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/FAQSection.tsx",
                                lineNumber: 14,
                                columnNumber: 15
                            }, this),
                            heading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl md:text-5xl tracking-tighter",
                                children: heading
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/FAQSection.tsx",
                                lineNumber: 18,
                                columnNumber: 25
                            }, this),
                            subheading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground mt-4",
                                children: subheading
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/FAQSection.tsx",
                                lineNumber: 19,
                                columnNumber: 28
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/sections/FAQSection.tsx",
                        lineNumber: 12,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-3xl mx-auto w-full space-y-4 mt-8",
                        children: faqItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                                className: "border rounded-lg p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                        className: "font-medium cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]",
                                        children: item.question
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/sections/FAQSection.tsx",
                                        lineNumber: 24,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground mt-2",
                                        children: item.answer
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/sections/FAQSection.tsx",
                                        lineNumber: 25,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, item._key, true, {
                                fileName: "[project]/packages/web/src/components/sections/FAQSection.tsx",
                                lineNumber: 23,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/FAQSection.tsx",
                        lineNumber: 21,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/sections/FAQSection.tsx",
                lineNumber: 11,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/sections/FAQSection.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/sections/FAQSection.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = FAQSection;
var _c;
__turbopack_context__.k.register(_c, "FAQSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/lib/translations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// General UI translations for non-blog pages
__turbopack_context__.s([
    "getTranslation",
    ()=>getTranslation,
    "translations",
    ()=>translations
]);
const translations = {
    nl: {
        // Welcome page (no content yet)
        welcomeTitle: 'Welkom bij Jouw Nieuwe Next.js & Sanity App!',
        welcomeMessage: 'Het lijkt erop dat je nog geen homepage content hebt ingesteld. Om te beginnen, ga naar de Sanity Studio en maak je homepage door modules en content toe te voegen.',
        // Fallback notices
        notTranslatedToEnglish: 'Deze pagina is nog niet vertaald naar het Engels — we tonen de standaardinhoud.',
        notTranslatedToDutch: 'Deze pagina is nog niet vertaald naar Nederlands — we tonen de standaardinhoud.',
        // Contact form
        contactFormLabel: 'Contactformulier',
        nameLabel: 'Naam',
        emailLabel: 'E-mail',
        messageLabel: 'Bericht',
        required: 'vereist',
        namePlaceholder: 'Uw volledige naam',
        emailPlaceholder: 'uw.email@voorbeeld.nl',
        emailHint: 'We delen uw e-mailadres nooit met anderen.',
        messagePlaceholder: 'Vertel ons hoe we u kunnen helpen...',
        sendMessage: 'Bericht versturen',
        sending: 'Versturen...',
        successMessage: '✓ Bedankt! Uw bericht is succesvol verzonden.',
        errorMessage: '✗ Er is iets misgegaan. Probeer het opnieuw.'
    },
    en: {
        // Welcome page (no content yet)
        welcomeTitle: 'Welcome to Your New Next.js & Sanity App!',
        welcomeMessage: "It looks like you haven't set up your home page content yet. To get started, head over to the Sanity Studio and create your home page by adding modules and content.",
        // Fallback notices
        notTranslatedToEnglish: 'This page is not yet translated to English — showing the default language content.',
        notTranslatedToDutch: 'This page is not yet translated to Dutch — showing the default language content.',
        // Contact form
        contactFormLabel: 'Contact form',
        nameLabel: 'Name',
        emailLabel: 'Email',
        messageLabel: 'Message',
        required: 'required',
        namePlaceholder: 'Your full name',
        emailPlaceholder: 'your.email@example.com',
        emailHint: "We'll never share your email with anyone else.",
        messagePlaceholder: 'Tell us how we can help you...',
        sendMessage: 'Send Message',
        sending: 'Sending...',
        successMessage: '✓ Thank you! Your message has been sent successfully.',
        errorMessage: '✗ Something went wrong. Please try again.'
    }
};
function getTranslation(lang, key) {
    const safeLang = lang === 'en' ? 'en' : 'nl';
    return translations[safeLang][key];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/sections/ContactSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ContactSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/lib/translations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ContactSection(props) {
    _s();
    const { heading, badgeText, description } = props;
    const [formStatus, setFormStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const lang = pathname?.split('/')?.[1] === 'en' ? 'en' : 'nl';
    const t = (key)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTranslation"])(lang, key);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setFormStatus("submitting");
        // Simulate form submission
        await new Promise((resolve)=>setTimeout(resolve, 1000));
        setFormStatus("success");
        // Reset after 3 seconds
        setTimeout(()=>setFormStatus("idle"), 3000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full py-20 lg:py-40",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-8 max-w-2xl mx-auto",
                children: [
                    badgeText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold w-fit",
                        children: badgeText
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                        lineNumber: 32,
                        columnNumber: 13
                    }, this),
                    heading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl md:text-5xl tracking-tighter",
                        children: heading
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                        lineNumber: 36,
                        columnNumber: 23
                    }, this),
                    description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                        lineNumber: 37,
                        columnNumber: 27
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        className: "flex flex-col gap-4 mt-4",
                        onSubmit: handleSubmit,
                        "aria-label": t('contactFormLabel'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "contact-name",
                                        className: "text-sm font-medium",
                                        children: [
                                            t('nameLabel'),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-600",
                                                "aria-label": t('required'),
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                                                lineNumber: 49,
                                                columnNumber: 34
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                                        lineNumber: 45,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "contact-name",
                                        name: "name",
                                        type: "text",
                                        placeholder: t('namePlaceholder'),
                                        required: true,
                                        "aria-required": "true",
                                        className: "border border-dc rounded-md px-4 py-2 ring-dc-focus focus:outline-none focus:ring-2 transition-shadow",
                                        disabled: formStatus === "submitting"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                                        lineNumber: 51,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "contact-email",
                                        className: "text-sm font-medium",
                                        children: [
                                            t('emailLabel'),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-600",
                                                "aria-label": t('required'),
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                                                lineNumber: 68,
                                                columnNumber: 35
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                                        lineNumber: 64,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "contact-email",
                                        name: "email",
                                        type: "email",
                                        placeholder: t('emailPlaceholder'),
                                        required: true,
                                        "aria-required": "true",
                                        "aria-describedby": "email-hint",
                                        className: "border border-dc rounded-md px-4 py-2 ring-dc-focus focus:outline-none focus:ring-2 transition-shadow",
                                        disabled: formStatus === "submitting"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        id: "email-hint",
                                        className: "text-xs text-muted-foreground",
                                        children: t('emailHint')
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                                        lineNumber: 81,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "contact-message",
                                        className: "text-sm font-medium",
                                        children: [
                                            t('messageLabel'),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-600",
                                                "aria-label": t('required'),
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                                                lineNumber: 91,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "contact-message",
                                        name: "message",
                                        placeholder: t('messagePlaceholder'),
                                        rows: 5,
                                        required: true,
                                        "aria-required": "true",
                                        className: "border border-dc rounded-md px-4 py-2 ring-dc-focus focus:outline-none focus:ring-2 transition-shadow resize-vertical",
                                        disabled: formStatus === "submitting"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                                        lineNumber: 93,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            formStatus === "success" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                role: "status",
                                "aria-live": "polite",
                                className: "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-md px-4 py-3 text-sm",
                                children: t('successMessage')
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                                lineNumber: 106,
                                columnNumber: 15
                            }, this),
                            formStatus === "error" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                role: "alert",
                                "aria-live": "assertive",
                                className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-md px-4 py-3 text-sm",
                                children: t('errorMessage')
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                                lineNumber: 116,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: formStatus === "submitting",
                                className: "rounded-md px-4 py-2 text-sm font-medium ring-dc-focus focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all",
                                style: {
                                    backgroundColor: "hsl(var(--dc-primary))",
                                    color: "white"
                                },
                                "aria-busy": formStatus === "submitting",
                                children: formStatus === "submitting" ? t('sending') : t('sendMessage')
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/sections/ContactSection.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(ContactSection, "AZkb3svP29Li+F+Eb5h0tAVYOyA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ContactSection;
var _c;
__turbopack_context__.k.register(_c, "ContactSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/sections/NewsletterSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NewsletterSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function NewsletterSection(props) {
    _s();
    const { heading, subheading, badgeText, inputPlaceholder, buttonText } = props;
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [formStatus, setFormStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setFormStatus("submitting");
        // Simulate form submission
        await new Promise((resolve)=>setTimeout(resolve, 1000));
        setFormStatus("success");
        setEmail("");
        // Reset after 3 seconds
        setTimeout(()=>setFormStatus("idle"), 3000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full py-20 lg:py-40",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-8 items-center text-center bg-muted rounded-lg p-14",
                children: [
                    badgeText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                        children: badgeText
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/NewsletterSection.tsx",
                        lineNumber: 29,
                        columnNumber: 13
                    }, this),
                    heading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "newsletter-heading",
                        className: "text-3xl md:text-5xl tracking-tighter",
                        children: heading
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/NewsletterSection.tsx",
                        lineNumber: 34,
                        columnNumber: 13
                    }, this),
                    subheading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        id: "newsletter-description",
                        className: "text-muted-foreground max-w-xl",
                        children: subheading
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/NewsletterSection.tsx",
                        lineNumber: 39,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        className: "flex flex-col sm:flex-row gap-2 w-full max-w-md",
                        onSubmit: handleSubmit,
                        "aria-labelledby": "newsletter-heading",
                        "aria-describedby": "newsletter-description",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "newsletter-email",
                                        className: "sr-only",
                                        children: "Email address"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/sections/NewsletterSection.tsx",
                                        lineNumber: 51,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "newsletter-email",
                                        name: "email",
                                        type: "email",
                                        value: email,
                                        onChange: (e)=>setEmail(e.target.value),
                                        placeholder: inputPlaceholder || "Enter your email",
                                        required: true,
                                        "aria-required": "true",
                                        "aria-describedby": formStatus === "error" ? "newsletter-error" : undefined,
                                        "aria-invalid": formStatus === "error",
                                        className: "w-full border border-dc rounded-md px-4 py-2 ring-dc-focus focus:outline-none focus:ring-2 transition-shadow",
                                        disabled: formStatus === "submitting" || formStatus === "success"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/sections/NewsletterSection.tsx",
                                        lineNumber: 54,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/components/sections/NewsletterSection.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: formStatus === "submitting" || formStatus === "success",
                                className: "rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap ring-dc-focus focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all",
                                style: {
                                    backgroundColor: "hsl(var(--dc-primary))",
                                    color: "white"
                                },
                                "aria-busy": formStatus === "submitting",
                                children: formStatus === "submitting" ? "Subscribing..." : formStatus === "success" ? "Subscribed!" : buttonText || "Subscribe"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/NewsletterSection.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/sections/NewsletterSection.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this),
                    formStatus === "success" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        role: "status",
                        "aria-live": "polite",
                        className: "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-md px-4 py-3 text-sm w-full max-w-md",
                        children: "✓ Thank you for subscribing! Check your inbox for confirmation."
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/NewsletterSection.tsx",
                        lineNumber: 81,
                        columnNumber: 13
                    }, this),
                    formStatus === "error" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "newsletter-error",
                        role: "alert",
                        "aria-live": "assertive",
                        className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-md px-4 py-3 text-sm w-full max-w-md",
                        children: "✗ Something went wrong. Please try again."
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/NewsletterSection.tsx",
                        lineNumber: 91,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/sections/NewsletterSection.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/sections/NewsletterSection.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/sections/NewsletterSection.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(NewsletterSection, "+7RxWFvIsdarZCNdCk9Ui9Jiyuc=");
_c = NewsletterSection;
var _c;
__turbopack_context__.k.register(_c, "NewsletterSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/sections/MediaSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MediaSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// plugin-only URL building
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2d$image$2f$dist$2f$mjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sanity-image/dist/mjs/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$SanityNextImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/SanityNextImage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function MediaSection(props) {
    _s();
    const { variant = "contained", heading, description, mediaType = "image", image, video, aspectRatio = "auto", maxWidth = "lg", rounded = true, shadow = false, ariaLabel, ariaDescribedBy } = props;
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showTranscript, setShowTranscript] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const effectiveAutoplay = !!(video?.autoplay && !prefersReducedMotion);
    // Respect prefers-reduced-motion for autoplaying videos
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MediaSection.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") === 'undefined' || mediaType !== 'video') return;
            const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            setPrefersReducedMotion(mediaQuery.matches);
            const listener = {
                "MediaSection.useEffect.listener": (event)=>setPrefersReducedMotion(event.matches)
            }["MediaSection.useEffect.listener"];
            mediaQuery.addEventListener('change', listener);
            return ({
                "MediaSection.useEffect": ()=>mediaQuery.removeEventListener('change', listener)
            })["MediaSection.useEffect"];
        }
    }["MediaSection.useEffect"], [
        mediaType
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MediaSection.useEffect": ()=>{
            if (!prefersReducedMotion && !effectiveAutoplay) return;
            const vid = videoRef.current;
            if (!vid) return;
            if (prefersReducedMotion && !vid.paused) {
                vid.pause();
            }
        }
    }["MediaSection.useEffect"], [
        prefersReducedMotion,
        effectiveAutoplay
    ]);
    // Generate unique IDs for ARIA relationships
    const mediaId = `media-${props._key}`;
    const transcriptId = `transcript-${props._key}`;
    const captionId = `caption-${props._key}`;
    // Handle video play/pause for keyboard users
    const handleVideoKeyPress = (e)=>{
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (videoRef.current) {
                if (isPlaying) {
                    videoRef.current.pause();
                } else {
                    videoRef.current.play();
                }
            }
        }
    };
    // Update playing state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MediaSection.useEffect": ()=>{
            const videoElement = videoRef.current;
            if (!videoElement) return;
            const handlePlay = {
                "MediaSection.useEffect.handlePlay": ()=>setIsPlaying(true)
            }["MediaSection.useEffect.handlePlay"];
            const handlePause = {
                "MediaSection.useEffect.handlePause": ()=>setIsPlaying(false)
            }["MediaSection.useEffect.handlePause"];
            videoElement.addEventListener('play', handlePlay);
            videoElement.addEventListener('pause', handlePause);
            return ({
                "MediaSection.useEffect": ()=>{
                    videoElement.removeEventListener('play', handlePlay);
                    videoElement.removeEventListener('pause', handlePause);
                }
            })["MediaSection.useEffect"];
        }
    }["MediaSection.useEffect"], []);
    // Container class names based on variant
    const containerClasses = {
        fullWidth: "w-full",
        contained: "container mx-auto px-4",
        splitScreen: "container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center",
        card: "container mx-auto px-4"
    };
    // Max width classes
    const maxWidthClasses = {
        sm: "max-w-screen-sm",
        md: "max-w-screen-md",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        full: "max-w-full"
    };
    // Media wrapper classes
    const mediaClasses = [
        "relative",
        "overflow-hidden",
        rounded && "rounded-lg",
        shadow && "shadow-lg"
    ].filter(Boolean).join(" ");
    // Aspect ratio style - default to 16:9 for videos if not specified
    const getAspectRatioStyle = ()=>{
        if (aspectRatio !== "auto") {
            return {
                aspectRatio
            };
        }
        // Default to 16:9 for videos, auto for images
        if (mediaType === "video") {
            return {
                aspectRatio: "16/9"
            };
        }
        return undefined;
    };
    const aspectRatioStyle = getAspectRatioStyle();
    // Build image URL with plugin when possible
    const makeSrc = (img, w, h, mode = 'contain')=>{
        if (!img) return null;
        try {
            const projectId = ("TURBOPACK compile-time value", "hs6e6yx5");
            const dataset = ("TURBOPACK compile-time value", "production");
            const baseUrl = ("TURBOPACK compile-time truthy", 1) ? `https://cdn.sanity.io/images/${projectId}/${dataset}/` : "TURBOPACK unreachable";
            let assetId;
            if (typeof img === 'string') assetId = img;
            else if (img && typeof img === 'object') {
                const maybeAsset = img.asset;
                if (typeof maybeAsset === 'string') assetId = maybeAsset;
                else if (maybeAsset && typeof maybeAsset === 'object') assetId = maybeAsset._ref || maybeAsset._id;
            }
            if (assetId && baseUrl) {
                const srcObj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2d$image$2f$dist$2f$mjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSrc"])({
                    id: assetId,
                    baseUrl,
                    width: w,
                    height: h,
                    mode
                });
                return srcObj?.src ?? null;
            }
        } catch (err) {
        // fall through
        }
        return null;
    };
    const imageUrl = makeSrc(image, 1920, 1080, 'contain');
    const posterUrl = makeSrc(video?.posterImage, 1920, 1080, 'cover');
    // Determine if video is embedded (YouTube, Vimeo) or direct
    const isEmbeddedVideo = (url)=>{
        if (!url) return false;
        return url.includes("youtube.com") || url.includes("youtu.be") || url.includes("vimeo.com");
    };
    // Convert YouTube/Vimeo URLs to embed format
    const getEmbedUrl = (url)=>{
        if (!url) return null;
        // If already an embed URL, return as-is
        if (url.includes("/embed/") || url.includes("player.vimeo.com")) {
            return url;
        }
        // YouTube
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            const videoId = url.includes("youtu.be") ? url.split("youtu.be/")[1]?.split("?")[0] : new URL(url).searchParams.get("v");
            return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : null;
        }
        // Vimeo
        if (url.includes("vimeo.com")) {
            const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
            return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
        }
        return url;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: `py-12 md:py-16 lg:py-20`,
        "aria-label": ariaLabel || `Media section${heading ? `: ${heading}` : ""}`,
        "aria-describedby": ariaDescribedBy,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: containerClasses[variant],
            children: [
                (heading || description) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `mb-8 ${variant === "splitScreen" ? "" : "text-center mx-auto"} ${variant !== "fullWidth" ? maxWidthClasses[maxWidth] : ""}`,
                    children: [
                        heading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
                            children: heading
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                            lineNumber: 223,
                            columnNumber: 15
                        }, this),
                        description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg text-gray-600 dark:text-gray-300",
                            children: description
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                            lineNumber: 228,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                    lineNumber: 217,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: variant !== "fullWidth" && variant !== "splitScreen" ? `mx-auto ${maxWidthClasses[maxWidth]}` : "",
                    children: mediaType === "image" && imageUrl && image?.alt ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
                        className: mediaClasses,
                        style: aspectRatioStyle,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                id: mediaId,
                                "aria-describedby": image.caption ? captionId : undefined,
                                className: "relative block w-full h-full",
                                children: [
                                    (()=>{
                                        const asset = image?.asset;
                                        const imgWidth = asset && typeof asset === 'object' ? asset.metadata?.dimensions?.width : undefined;
                                        const imgHeight = asset && typeof asset === 'object' ? asset.metadata?.dimensions?.height : undefined;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$SanityNextImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            image: image,
                                            alt: image?.alt,
                                            width: imgWidth || 1600,
                                            height: imgHeight || 900,
                                            className: "w-full h-full object-cover",
                                            sizes: "(max-width: 768px) 100vw, 70vw",
                                            placeholder: image?.blurDataURL ? 'blur' : undefined
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                                            lineNumber: 251,
                                            columnNumber: 21
                                        }, this);
                                    })(),
                                    image?.overlay?.enabled && (()=>{
                                        const ov = image.overlay;
                                        const overlayOpacity = typeof ov?.opacity === 'number' ? ov.opacity : 0.5;
                                        const start = 'rgba(0,0,0,0)';
                                        const end = `rgba(0,0,0,${Math.max(0, Math.min(1, overlayOpacity))})`;
                                        const dir = ov?.direction || 'down';
                                        const dirToCss = {
                                            up: 'to top',
                                            down: 'to bottom',
                                            left: 'to left',
                                            right: 'to right'
                                        };
                                        const cssDir = dirToCss[dir] || 'to bottom';
                                        const bgImage = `linear-gradient(${cssDir}, ${start}, ${end})`;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            "aria-hidden": true,
                                            style: {
                                                position: 'absolute',
                                                inset: 0,
                                                pointerEvents: 'none',
                                                zIndex: 1,
                                                backgroundImage: bgImage
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                                            lineNumber: 279,
                                            columnNumber: 21
                                        }, this);
                                    })()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                                lineNumber: 245,
                                columnNumber: 15
                            }, this),
                            image.caption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                                id: captionId,
                                className: "mt-4 text-sm text-center text-gray-600 dark:text-gray-400",
                                children: image.caption
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                                lineNumber: 293,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                        lineNumber: 244,
                        columnNumber: 13
                    }, this) : mediaType === "video" && video?.videoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            isEmbeddedVideo(video.videoUrl) ? // Embedded video (YouTube/Vimeo)
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: mediaClasses,
                                style: aspectRatioStyle,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                    id: mediaId,
                                    src: getEmbedUrl(video.videoUrl) || "",
                                    title: video.videoTitle || "Video content",
                                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                                    allowFullScreen: true,
                                    loading: "lazy",
                                    className: "absolute inset-0 w-full h-full",
                                    "aria-label": video.videoTitle || "Video content",
                                    "aria-describedby": video.transcript ? transcriptId : undefined
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                                    lineNumber: 309,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                                lineNumber: 305,
                                columnNumber: 17
                            }, this) : // Direct video file
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: mediaClasses,
                                style: aspectRatioStyle,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                    ref: videoRef,
                                    id: mediaId,
                                    controls: video.controls !== false,
                                    autoPlay: effectiveAutoplay,
                                    loop: video.loop || false,
                                    muted: effectiveAutoplay || video.loop || false,
                                    playsInline: true,
                                    poster: posterUrl || undefined,
                                    className: "w-full h-full",
                                    "aria-label": video.videoTitle || "Video content",
                                    "aria-describedby": video.transcript ? transcriptId : undefined,
                                    onKeyDown: handleVideoKeyPress,
                                    tabIndex: 0,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                                            src: video.videoUrl,
                                            type: "video/mp4"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                                            lineNumber: 343,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("track", {
                                            kind: "captions",
                                            src: video.captionsUrl || "",
                                            srcLang: "nl",
                                            label: "Nederlands",
                                            default: true
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                                            lineNumber: 344,
                                            columnNumber: 21
                                        }, this),
                                        "Your browser does not support the video tag."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                                    lineNumber: 326,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                                lineNumber: 325,
                                columnNumber: 17
                            }, this),
                            video.transcript && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowTranscript(!showTranscript),
                                        className: "inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md",
                                        style: {
                                            backgroundColor: "hsl(var(--dc-surface-90))",
                                            color: "hsl(var(--dc-on-surface))"
                                        },
                                        "aria-expanded": showTranscript,
                                        "aria-controls": transcriptId,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: `w-4 h-4 transition-transform ${showTranscript ? "rotate-180" : ""}`,
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M19 9l-7 7-7-7"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                                                    lineNumber: 377,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                                                lineNumber: 369,
                                                columnNumber: 21
                                            }, this),
                                            showTranscript ? "Hide" : "Show",
                                            " Transcript"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                                        lineNumber: 359,
                                        columnNumber: 19
                                    }, this),
                                    showTranscript && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        id: transcriptId,
                                        className: "p-4 rounded-md text-sm",
                                        style: {
                                            backgroundColor: "hsl(var(--dc-surface-95))",
                                            color: "hsl(var(--dc-on-surface))"
                                        },
                                        role: "region",
                                        "aria-label": "Video transcript",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold mb-2",
                                                children: "Transcript"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                                                lineNumber: 397,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "whitespace-pre-wrap",
                                                children: video.transcript
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                                                lineNumber: 398,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                                        lineNumber: 387,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                                lineNumber: 358,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                        lineNumber: 302,
                        columnNumber: 13
                    }, this) : // Fallback for missing or incomplete media
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${mediaClasses} flex items-center justify-center bg-gray-100 dark:bg-gray-800 min-h-[300px]`,
                        style: aspectRatioStyle,
                        role: "img",
                        "aria-label": "No media available",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 dark:text-gray-400",
                            children: "Media content unavailable"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                            lineNumber: 412,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                        lineNumber: 406,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
                    lineNumber: 236,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
            lineNumber: 214,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/sections/MediaSection.tsx",
        lineNumber: 209,
        columnNumber: 5
    }, this);
}
_s(MediaSection, "oRmzhy3BoYBYXpgS00GygasQ+5E=");
_c = MediaSection;
var _c;
__turbopack_context__.k.register(_c, "MediaSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/DocumentViewer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DocumentViewer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function DocumentViewer({ id, title, description, htmlUrl, pdfUrl, pdfFileSizeLabel, showPreview = true }) {
    // stable heading id referenced by aria-labelledby
    const headingId = id ?? `doc-${String(title || 'document').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;
    const downloadText = pdfFileSizeLabel ? `Download PDF (${pdfFileSizeLabel})` : 'Download PDF';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-labelledby": headingId,
        className: "doc-viewer",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "doc-viewer__header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: headingId,
                        className: "doc-viewer__title",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/DocumentViewer.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "doc-viewer__description",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/DocumentViewer.tsx",
                        lineNumber: 35,
                        columnNumber: 24
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/DocumentViewer.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "doc-viewer__actions",
                role: "group",
                "aria-label": `Document actions for ${title}`,
                children: [
                    htmlUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: htmlUrl,
                        className: "btn-primary",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        children: "Read accessible HTML version"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/DocumentViewer.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this) : null,
                    pdfUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: pdfUrl,
                        download: true,
                        className: "btn-secondary",
                        rel: "noopener noreferrer",
                        children: downloadText
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/DocumentViewer.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/DocumentViewer.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            htmlUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "doc-viewer__html-preview",
                style: {
                    marginTop: 16
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        border: '1px solid hsl(var(--dc-border)/0.6)',
                        borderRadius: 6,
                        overflow: 'hidden'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                        src: htmlUrl,
                        title: `${title} — toegankelijke weergave`,
                        width: "100%",
                        height: 560,
                        style: {
                            border: 'none',
                            display: 'block'
                        },
                        role: "document"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/DocumentViewer.tsx",
                        lineNumber: 56,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/DocumentViewer.tsx",
                    lineNumber: 55,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/DocumentViewer.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this) : // If there's no HTML alternative, show the PDF preview (visual-only)
            showPreview && pdfUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "doc-viewer__preview",
                "aria-hidden": "true",
                style: {
                    marginTop: 16
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "doc-viewer__preview-inner",
                    style: {
                        border: '1px solid hsl(var(--dc-border)/0.6)',
                        borderRadius: 6,
                        overflow: 'hidden'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                        src: pdfUrl,
                        title: `${title} — preview (visual only)`,
                        width: "100%",
                        height: 560,
                        tabIndex: -1,
                        style: {
                            border: 'none',
                            display: 'block'
                        }
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/DocumentViewer.tsx",
                        lineNumber: 71,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/DocumentViewer.tsx",
                    lineNumber: 70,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/DocumentViewer.tsx",
                lineNumber: 69,
                columnNumber: 11
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/src/components/DocumentViewer.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = DocumentViewer;
var _c;
__turbopack_context__.k.register(_c, "DocumentViewer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/sections/DocumentAssetSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DocumentAssetSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$DocumentViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/DocumentViewer.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function humanFileSize(bytes) {
    if (bytes === null || bytes === undefined) return undefined;
    const thresh = 1024;
    if (Math.abs(bytes) < thresh) return bytes + ' B';
    const units = [
        'KB',
        'MB',
        'GB',
        'TB'
    ];
    let u = -1;
    let b = bytes;
    do {
        b /= thresh;
        ++u;
    }while (Math.abs(b) >= thresh && u < units.length - 1)
    return b.toFixed(1) + ' ' + units[u];
}
function DocumentAssetSection(props) {
    _s();
    const { title, summary, documentFile, htmlAlternativeFile, htmlAlternativePortableText, language } = props;
    // Remove development debug logging for production build
    const originalPdfUrl = documentFile?.asset?.url;
    const [pdfSrc, setPdfSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(originalPdfUrl || undefined);
    const [htmlSrc, setHtmlSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [pdfFileSizeLabel, setPdfFileSizeLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    // Set HTML source - prioritize uploaded HTML file, then portable text
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DocumentAssetSection.useEffect": ()=>{
            // First, check if there's an uploaded HTML file
            if (htmlAlternativeFile?.asset?.url) {
                setHtmlSrc(htmlAlternativeFile.asset.url);
                return;
            }
            // Fallback to portable text (legacy support) - create blob URL
            if (htmlAlternativePortableText && htmlAlternativePortableText.length > 0) {
                try {
                    // If the first block's first child looks like raw HTML, use it
                    const first = htmlAlternativePortableText[0];
                    const childText = Array.isArray(first.children) && first.children[0]?.text ? first.children[0].text : '';
                    if (typeof childText === 'string' && childText.trim().length > 0) {
                        const htmlContent = childText.trim();
                        const hasDoctype = /^<!doctype/i.test(htmlContent);
                        const hasHtmlTag = /<html[\s>]/i.test(htmlContent);
                        let htmlDocument = htmlContent;
                        // If it's a fragment without proper HTML structure, wrap it
                        if (!hasDoctype && !hasHtmlTag) {
                            const lang = language && typeof language === 'string' ? language : 'nl';
                            const safeTitle = title && typeof title === 'string' ? title.replace(/</g, '&lt;').replace(/>/g, '&gt;') : 'Document';
                            htmlDocument = `<!DOCTYPE html>\n<html lang="${lang}">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>${safeTitle}</title>\n</head>\n<body>\n${htmlContent}\n</body>\n</html>`;
                        }
                        const blob = new Blob([
                            htmlDocument
                        ], {
                            type: 'text/html;charset=utf-8'
                        });
                        const url = URL.createObjectURL(blob);
                        setHtmlSrc(url);
                        return ({
                            "DocumentAssetSection.useEffect": ()=>URL.revokeObjectURL(url)
                        })["DocumentAssetSection.useEffect"];
                    }
                } catch (err) {
                    console.warn('[DocumentAsset] htmlAlternativePortableText parse failed', err);
                }
            }
        }
    }["DocumentAssetSection.useEffect"], [
        htmlAlternativeFile,
        htmlAlternativePortableText,
        language,
        title
    ]);
    // Try to fetch PDF as a blob to avoid iframe frame-ancestors blocking.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DocumentAssetSection.useEffect": ()=>{
            let cancelled = false;
            let objectUrl;
            async function tryFetch() {
                if (!originalPdfUrl) return;
                try {
                    // First try HEAD to get content-length
                    const head = await fetch(originalPdfUrl, {
                        method: 'HEAD'
                    });
                    const len = head.headers.get('content-length');
                    if (len) {
                        const size = humanFileSize(parseInt(len, 10));
                        if (size) setPdfFileSizeLabel(size);
                    }
                } catch (e) {
                    console.debug('[DocumentAsset] HEAD request failed or blocked', e);
                }
                try {
                    const res = await fetch(originalPdfUrl, {
                        mode: 'cors'
                    });
                    if (!res.ok) throw new Error('Fetch failed');
                    const blob = await res.blob();
                    objectUrl = URL.createObjectURL(blob);
                    if (!cancelled) {
                        setPdfSrc(objectUrl);
                        // If size wasn't set from HEAD, use blob size
                        if (!pdfFileSizeLabel && blob.size) setPdfFileSizeLabel(humanFileSize(blob.size));
                    }
                } catch (err) {
                    // Can't fetch as blob (CORS or network). Keep original URL as fallback.
                    console.warn('Could not fetch PDF as blob, will use original URL as fallback.', err);
                }
            }
            tryFetch();
            return ({
                "DocumentAssetSection.useEffect": ()=>{
                    cancelled = true;
                    if (objectUrl) URL.revokeObjectURL(objectUrl);
                }
            })["DocumentAssetSection.useEffect"];
        }
    }["DocumentAssetSection.useEffect"], [
        originalPdfUrl,
        pdfFileSizeLabel
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$DocumentViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        id: `doc-${props._key ?? title}`,
        title: title ?? 'Document',
        description: summary ?? undefined,
        htmlUrl: htmlSrc || '',
        pdfUrl: pdfSrc || '',
        pdfFileSizeLabel: pdfFileSizeLabel,
        showPreview: Boolean(originalPdfUrl)
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/sections/DocumentAssetSection.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, this);
}
_s(DocumentAssetSection, "Ng7aiFjSb7p84JP4/87Mfm3Ct8E=");
_c = DocumentAssetSection;
var _c;
__turbopack_context__.k.register(_c, "DocumentAssetSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/lib/sanityImage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildImageUrl",
    ()=>buildImageUrl,
    "urlForImage",
    ()=>urlForImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$image$2d$url$2f$lib$2f$_chunks$2d$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@sanity/image-url/lib/_chunks-es/index.js [app-client] (ecmascript)");
;
const projectId = ("TURBOPACK compile-time value", "hs6e6yx5");
const dataset = ("TURBOPACK compile-time value", "production");
const builder = ("TURBOPACK compile-time truthy", 1) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$image$2d$url$2f$lib$2f$_chunks$2d$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createImageUrlBuilder"])({
    projectId,
    dataset
}) : "TURBOPACK unreachable";
function urlForImage(source) {
    if (!source || !builder) {
        return null;
    }
    return builder.image(source).auto('format');
}
function buildImageUrl(source, opts) {
    const b = urlForImage(source);
    if (!b) return null;
    let chain = b;
    if (opts?.width) chain = chain.width(opts.width);
    if (opts?.height) chain = chain.height(opts.height);
    if (opts?.fit) chain = chain.fit(opts.fit);
    if (opts?.quality) chain = chain.quality(opts.quality);
    return chain.url();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/sections/TeamSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s([
    "default",
    ()=>TeamSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$sanityImage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/lib/sanityImage.ts [app-client] (ecmascript)");
"use client";
;
;
;
function TeamSection({ heading, subheading, autoIncludeAll, allTeamMembers = [], teamSettings }) {
    let effectiveMembers = [];
    if (autoIncludeAll) {
        effectiveMembers = (allTeamMembers || []).filter((m)=>m?.includeInTeam !== false);
    } else {
        effectiveMembers = [];
    }
    // Group members by category (category may be a referenced document or a legacy string)
    const groups = {};
    effectiveMembers.forEach((m)=>{
        if (!m) return;
        let catKey = 'uncategorized';
        if (typeof m.category === 'string') {
            catKey = m.category.toString().toLowerCase();
        } else if (m.category && typeof m.category === 'object') {
            const c = m.category;
            catKey = c._id || c.slug && c.slug.current || (c.title || 'uncategorized').toString().toLowerCase();
        }
        if (!groups[catKey]) groups[catKey] = [];
        groups[catKey].push(m);
    });
    // Build ordered list of category keys based on teamSettings if provided
    const settingsOrder = teamSettings && Array.isArray(teamSettings.categoriesOrder) ? teamSettings.categoriesOrder.map((c)=>{
        const cc = c;
        return cc._id || cc.slug && cc.slug.current || (cc.title || '').toString().toLowerCase();
    }) : [];
    const remainingKeys = Object.keys(groups).filter((k)=>!settingsOrder.includes(k));
    const renderOrder = [
        ...settingsOrder.filter((k)=>groups[k]),
        ...remainingKeys
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-labelledby": "team-heading",
        className: "py-12",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4",
            children: [
                heading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    id: "team-heading",
                    className: "text-2xl font-semibold mb-2",
                    children: heading
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                    lineNumber: 49,
                    columnNumber: 21
                }, this),
                subheading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted mb-6",
                    children: subheading
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                    lineNumber: 50,
                    columnNumber: 24
                }, this),
                renderOrder.map((catKey)=>{
                    const items = groups[catKey] || [];
                    if (!items.length) return null;
                    // determine label from first member's category object or fallback to settings or key
                    const first = items[0];
                    const label = typeof first.category === 'string' ? first.category : first.category && first.category.title || teamSettings && teamSettings.defaultCategoryTitle || catKey;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-medium mb-4",
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                                lineNumber: 62,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
                                children: items.map((member)=>{
                                    const imageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$sanityImage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildImageUrl"])(member.image?.asset || undefined) || undefined;
                                    const imageAlt = (member.image && typeof member.image !== 'string' ? member.image?.alt : undefined) || member.name || "team member";
                                    const key = member._id || member._key || member.name;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: "flex items-center gap-4 bg-dc-surface-98 p-4 rounded",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-16 h-16 relative shrink-0 rounded-full overflow-hidden bg-gray-100",
                                                children: imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: imageUrl,
                                                    alt: imageAlt,
                                                    fill: true,
                                                    sizes: "64px",
                                                    className: "object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                                                    lineNumber: 72,
                                                    columnNumber: 27
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-center w-full h-full text-sm font-medium text-gray-600",
                                                    children: (member.name || "").split(' ').map((s)=>s[0]).slice(0, 2).join('')
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                                                    lineNumber: 74,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                                                lineNumber: 70,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-semibold",
                                                        children: member.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                                                        lineNumber: 78,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-muted",
                                                        children: member.position
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                                                        lineNumber: 79,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                                                lineNumber: 77,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, String(key), true, {
                                        fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                                        lineNumber: 69,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                                lineNumber: 63,
                                columnNumber: 15
                            }, this)
                        ]
                    }, catKey, true, {
                        fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                        lineNumber: 61,
                        columnNumber: 13
                    }, this);
                }),
                effectiveMembers.length > 0 && (()=>{
                    const displayedCount = Object.keys(groups).reduce((sum, k)=>sum + (groups[k]?.length || 0), 0);
                    if (displayedCount === 0) {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-md font-medium mb-2",
                                    children: "Other team members"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                                    lineNumber: 95,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted mb-3",
                                    children: "No members matched the configured categories; showing all members as a fallback."
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                                    lineNumber: 96,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
                                    children: effectiveMembers.map((member)=>{
                                        const imageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$sanityImage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildImageUrl"])(member.image?.asset || undefined) || undefined;
                                        const imageAlt = (member.image && typeof member.image !== 'string' ? member.image?.alt : undefined) || member.name || "team member";
                                        const key = member._id || member._key || member.name;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: "flex items-center gap-4 bg-dc-surface-98 p-4 rounded",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-16 h-16 relative shrink-0 rounded-full overflow-hidden bg-gray-100",
                                                    children: imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: imageUrl,
                                                        alt: imageAlt,
                                                        fill: true,
                                                        sizes: "64px",
                                                        className: "object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                                                        lineNumber: 106,
                                                        columnNumber: 29
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center w-full h-full text-sm font-medium text-gray-600",
                                                        children: (member.name || "").split(' ').map((s)=>s[0]).slice(0, 2).join('')
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                                                        lineNumber: 108,
                                                        columnNumber: 29
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-semibold",
                                                            children: member.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                                                            lineNumber: 112,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-muted",
                                                            children: [
                                                                member.position,
                                                                " — ",
                                                                typeof member.category === 'string' ? member.category : member.category?.title
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                                                            lineNumber: 113,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, String(key), true, {
                                            fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                                            lineNumber: 103,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                                    lineNumber: 97,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                            lineNumber: 94,
                            columnNumber: 15
                        }, this);
                    }
                    return null;
                })(),
                effectiveMembers.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm text-muted mt-4",
                    children: autoIncludeAll ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "No team members found. Check authors have ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Include in team listings"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                                lineNumber: 128,
                                columnNumber: 63
                            }, this),
                            " enabled in the Studio."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                        lineNumber: 128,
                        columnNumber: 15
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Team auto-include is disabled for this section. Enable it in the Studio to show members."
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                        lineNumber: 130,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
                    lineNumber: 126,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
            lineNumber: 48,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/sections/TeamSection.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_c = TeamSection;
var _c;
__turbopack_context__.k.register(_c, "TeamSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/sections/SplitSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SplitSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2d$image$2f$dist$2f$mjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sanity-image/dist/mjs/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
"use client";
;
;
;
function SplitSection(props) {
    const { layout = 'imageLeft', tagline, heading, body, infoList, cta, image } = props;
    // Safely extract image metadata with proper null checks
    const hasImage = image && typeof image === 'object';
    const altText = (hasImage && 'alt' in image ? image.alt : '') || '';
    const caption = (hasImage && 'caption' in image ? image.caption : '') || '';
    const objectFit = (hasImage && 'objectFit' in image ? image.objectFit : 'cover') || 'cover';
    const aspectRatio = (hasImage && 'aspectRatio' in image ? image.aspectRatio : 'auto') || 'auto';
    const displaySize = hasImage && 'displaySize' in image && typeof image.displaySize === 'number' ? image.displaySize : 100;
    // Build image URL with proper parameters based on objectFit
    const imageUrl = (()=>{
        if (!hasImage || !image.asset) return null;
        try {
            const projectId = ("TURBOPACK compile-time value", "hs6e6yx5");
            const dataset = ("TURBOPACK compile-time value", "production");
            const baseUrl = ("TURBOPACK compile-time truthy", 1) ? `https://cdn.sanity.io/images/${projectId}/${dataset}/` : "TURBOPACK unreachable";
            const asset = image.asset;
            let assetId;
            if (typeof asset === 'string') {
                assetId = asset;
            } else if (asset && typeof asset === 'object') {
                const maybe = asset;
                assetId = maybe._ref || maybe._id;
            }
            if (assetId && baseUrl) {
                // When using contain, use contain mode without forced height to preserve aspect ratio
                // When using cover, use cover mode with dimensions for proper cropping
                const buildParams = objectFit === 'contain' ? {
                    id: assetId,
                    baseUrl,
                    width: 1200,
                    mode: 'contain'
                } : {
                    id: assetId,
                    baseUrl,
                    width: 1200,
                    height: 800,
                    mode: 'cover'
                };
                const srcObj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2d$image$2f$dist$2f$mjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSrc"])(buildParams);
                return srcObj?.src ?? null;
            }
        } catch (err) {
            console.error('Error building image URL:', err);
            return null;
        }
        return null;
    })();
    // Render content block
    const ContentBlock = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-6",
            children: [
                tagline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm font-semibold text-[hsl(var(--dc-brand))] uppercase tracking-wide",
                    children: tagline
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                    lineNumber: 54,
                    columnNumber: 17
                }, this),
                heading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[hsl(var(--dc-text))]",
                    children: heading
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                    lineNumber: 60,
                    columnNumber: 17
                }, this),
                body && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg text-[hsl(var(--dc-text-muted))] leading-relaxed",
                    children: body
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                    lineNumber: 66,
                    columnNumber: 17
                }, this),
                infoList && infoList.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "space-y-3",
                    children: infoList.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-6 h-6 text-[hsl(var(--dc-brand))] flex-shrink-0 mt-0.5",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M5 13l4 4L19 7"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                                        lineNumber: 76,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                                    lineNumber: 75,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[hsl(var(--dc-text))]",
                                    children: item
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                                    lineNumber: 78,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, idx, true, {
                            fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                            lineNumber: 74,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                    lineNumber: 72,
                    columnNumber: 17
                }, this),
                cta && cta.label && cta.url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: cta.url,
                        className: `inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[hsl(var(--dc-focus))] ${cta.variant === 'outline' ? 'border border-[hsl(var(--dc-border))] hover:bg-[hsl(var(--dc-bg-soft))]' : 'bg-[hsl(var(--dc-brand))] text-[hsl(var(--dc-on-primary))] hover:opacity-90 shadow-sm'}`,
                        children: cta.label
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                        lineNumber: 86,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                    lineNumber: 85,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
            lineNumber: 52,
            columnNumber: 9
        }, this);
    // Render image block with format controls
    const ImageBlock = ()=>{
        if (!imageUrl) return null;
        // When aspectRatio is auto and objectFit is contain, let image determine size naturally
        if (aspectRatio === 'auto' && objectFit === 'contain') {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
                className: "relative flex justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: imageUrl,
                        alt: altText,
                        className: `h-auto object-contain`,
                        style: {
                            maxWidth: `${displaySize}%`,
                            width: '100%'
                        },
                        loading: "lazy"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                        lineNumber: 108,
                        columnNumber: 21
                    }, this),
                    caption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                        className: "mt-3 text-sm text-[hsl(var(--dc-text-muted))] text-center",
                        children: caption
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                        lineNumber: 116,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                lineNumber: 107,
                columnNumber: 17
            }, this);
        }
        // For all other cases, use container with aspect ratio
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
            className: "relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `relative w-full flex justify-center ${objectFit === 'cover' ? 'rounded-2xl shadow-lg bg-[hsl(var(--dc-bg-soft))] overflow-hidden' : ''}`,
                    style: {
                        aspectRatio: aspectRatio === 'auto' ? '16/9' : aspectRatio
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: imageUrl,
                        alt: altText,
                        className: objectFit === 'contain' ? 'h-full object-contain' : 'w-full h-full object-cover',
                        style: objectFit === 'contain' ? {
                            maxWidth: `${displaySize}%`
                        } : {},
                        loading: "lazy"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                        lineNumber: 133,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                    lineNumber: 127,
                    columnNumber: 17
                }, this),
                caption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                    className: "mt-3 text-sm text-[hsl(var(--dc-text-muted))] text-center",
                    children: caption
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                    lineNumber: 142,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
            lineNumber: 126,
            columnNumber: 13
        }, this);
    };
    // Layout: Image Top
    if (layout === 'imageTop') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "w-full py-16 sm:py-24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 sm:px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto flex flex-col gap-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageBlock, {}, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                            lineNumber: 156,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentBlock, {}, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                            lineNumber: 157,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                    lineNumber: 155,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                lineNumber: 154,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
            lineNumber: 153,
            columnNumber: 13
        }, this);
    }
    // Layout: Image Bottom
    if (layout === 'imageBottom') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "w-full py-16 sm:py-24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 sm:px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto flex flex-col gap-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentBlock, {}, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                            lineNumber: 170,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageBlock, {}, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                            lineNumber: 171,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                    lineNumber: 169,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                lineNumber: 168,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
            lineNumber: 167,
            columnNumber: 13
        }, this);
    }
    // Calculate fractional widths based on displaySize (for contain mode only)
    const getGridColumnClass = ()=>{
        if (objectFit !== 'contain') {
            return 'lg:grid-cols-2'; // Default 50/50 split for cover mode
        }
        // For contain mode, adjust based on displaySize percentage
        // When imageLeft: image is column 1, text is column 2
        // When imageRight: text is column 1, image is column 2
        const isImageLeft = layout === 'imageLeft';
        // Calculate fraction based on percentage (e.g., 25% = 1fr, 75% = 3fr)
        const imageFr = Math.round(displaySize / 25) || 1; // Convert percentage to fraction
        const textFr = Math.round((100 - displaySize) / 25) || 1;
        if (imageFr === textFr) {
            return 'lg:grid-cols-2'; // Equal split
        }
        return isImageLeft ? `lg:grid-cols-[${imageFr}fr_${textFr}fr]` : `lg:grid-cols-[${textFr}fr_${imageFr}fr]`;
    };
    // Layout: Image Left or Right (two columns)
    const gridColClass = getGridColumnClass();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full py-16 sm:py-24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 sm:px-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `grid ${gridColClass} gap-12 lg:gap-16 items-center ${layout === 'imageRight' ? 'lg:grid-flow-dense' : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: layout === 'imageRight' ? 'lg:col-start-2' : '',
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageBlock, {}, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                            lineNumber: 211,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                        lineNumber: 210,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: layout === 'imageRight' ? 'lg:col-start-1 lg:row-start-1' : '',
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentBlock, {}, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                            lineNumber: 214,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                        lineNumber: 213,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
                lineNumber: 208,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
            lineNumber: 207,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/sections/SplitSection.tsx",
        lineNumber: 206,
        columnNumber: 9
    }, this);
}
_c = SplitSection;
var _c;
__turbopack_context__.k.register(_c, "SplitSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/sections/SectionHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SectionHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function SectionHeader(props) {
    const { tagline, title, body, alignment = 'center' } = props;
    const alignmentClass = alignment === 'center' ? 'text-center mx-auto' : 'text-left';
    const maxWidthClass = alignment === 'center' ? 'max-w-3xl' : 'max-w-4xl';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full py-12 sm:py-16",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 sm:px-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex flex-col gap-4 ${alignmentClass} ${maxWidthClass}`,
                children: [
                    tagline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-semibold text-[hsl(var(--dc-brand))] uppercase tracking-wide",
                        children: tagline
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/SectionHeader.tsx",
                        lineNumber: 16,
                        columnNumber: 25
                    }, this),
                    title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[hsl(var(--dc-text))]",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/SectionHeader.tsx",
                        lineNumber: 22,
                        columnNumber: 25
                    }, this),
                    body && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg text-[hsl(var(--dc-text-muted))] leading-relaxed mt-2",
                        children: body
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/sections/SectionHeader.tsx",
                        lineNumber: 28,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/sections/SectionHeader.tsx",
                lineNumber: 14,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/sections/SectionHeader.tsx",
            lineNumber: 13,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/sections/SectionHeader.tsx",
        lineNumber: 12,
        columnNumber: 9
    }, this);
}
_c = SectionHeader;
var _c;
__turbopack_context__.k.register(_c, "SectionHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/sections/LogoCloudSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LogoCloudSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2d$image$2f$dist$2f$mjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sanity-image/dist/mjs/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
"use client";
;
;
;
function LogoCloudSection(props) {
    const { title, logos = [], grayscale = false } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full py-16 sm:py-24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 sm:px-6",
            children: [
                title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl sm:text-3xl font-bold text-center text-[hsl(var(--dc-text))] mb-12",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/LogoCloudSection.tsx",
                    lineNumber: 14,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center",
                    children: logos.map((logo, idx)=>{
                        // Build image URL
                        const imageUrl = (()=>{
                            if (!logo.image || typeof logo.image === 'object' && !logo.image.asset) return null;
                            try {
                                const projectId = ("TURBOPACK compile-time value", "hs6e6yx5");
                                const dataset = ("TURBOPACK compile-time value", "production");
                                const baseUrl = ("TURBOPACK compile-time truthy", 1) ? `https://cdn.sanity.io/images/${projectId}/${dataset}/` : "TURBOPACK unreachable";
                                const asset = logo.image.asset;
                                let assetId;
                                if (typeof asset === 'string') {
                                    assetId = asset;
                                } else if (asset && typeof asset === 'object') {
                                    const maybe = asset;
                                    assetId = maybe._ref || maybe._id;
                                }
                                if (assetId && baseUrl) {
                                    const srcObj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2d$image$2f$dist$2f$mjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSrc"])({
                                        id: assetId,
                                        baseUrl,
                                        width: 400,
                                        height: 200,
                                        mode: 'cover'
                                    });
                                    return srcObj?.src ?? null;
                                }
                            } catch (err) {
                                return null;
                            }
                            return null;
                        })();
                        if (!imageUrl) return null;
                        const logoImage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: imageUrl,
                            alt: logo.alt || '',
                            className: `w-full h-auto max-w-[120px] sm:max-w-[140px] object-contain transition-all duration-300 ${grayscale ? 'grayscale hover:grayscale-0 opacity-70 hover:opacity-100' : 'opacity-80 hover:opacity-100'}`,
                            loading: "lazy"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/sections/LogoCloudSection.tsx",
                            lineNumber: 49,
                            columnNumber: 29
                        }, this);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center",
                            children: logo.url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: logo.url,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[hsl(var(--dc-focus))] rounded",
                                children: logoImage
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/sections/LogoCloudSection.tsx",
                                lineNumber: 61,
                                columnNumber: 37
                            }, this) : logoImage
                        }, logo._key || idx, false, {
                            fileName: "[project]/packages/web/src/components/sections/LogoCloudSection.tsx",
                            lineNumber: 59,
                            columnNumber: 29
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/LogoCloudSection.tsx",
                    lineNumber: 19,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/src/components/sections/LogoCloudSection.tsx",
            lineNumber: 12,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/sections/LogoCloudSection.tsx",
        lineNumber: 11,
        columnNumber: 9
    }, this);
}
_c = LogoCloudSection;
var _c;
__turbopack_context__.k.register(_c, "LogoCloudSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/pageBuilder/RichTextBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RichTextBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$portabletext$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@portabletext/react/dist/index.js [app-client] (ecmascript) <locals>");
;
;
const maxWidthMap = {
    narrow: 'max-w-2xl',
    default: 'max-w-3xl',
    wide: 'max-w-5xl'
};
const portableTextComponents = {
    block: {
        normal: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-fluid-md leading-relaxed text-[hsl(var(--dc-text))]",
                children: children
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/RichTextBlock.tsx",
                lineNumber: 14,
                columnNumber: 29
            }, ("TURBOPACK compile-time value", void 0)),
        h1: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-fluid-xl font-bold tracking-tight text-[hsl(var(--dc-navy))]",
                children: children
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/RichTextBlock.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
        h2: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-fluid-lg font-semibold text-[hsl(var(--dc-navy))]",
                children: children
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/RichTextBlock.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
        h3: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-fluid-md font-semibold text-[hsl(var(--dc-navy))]",
                children: children
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/RichTextBlock.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
        h4: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                className: "text-fluid-sm font-semibold uppercase tracking-wide text-[hsl(var(--dc-text)/0.75)]",
                children: children
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/RichTextBlock.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
        blockquote: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
                className: "border-l-4 border-[hsl(var(--dc-brand)/0.5)] pl-4 italic text-[hsl(var(--dc-text))]",
                children: children
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/RichTextBlock.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
    },
    marks: {
        link: ({ children, value })=>{
            const href = value?.href || '#';
            const isExternal = value?.isExternal ?? /^https?:/.test(href);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: href,
                className: "text-[hsl(var(--dc-brand))] underline decoration-2 decoration-[hsl(var(--dc-brand)/0.4)] underline-offset-4 hover:decoration-[hsl(var(--dc-brand))] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]",
                rel: isExternal ? 'noopener noreferrer' : undefined,
                target: isExternal ? '_blank' : undefined,
                children: [
                    children,
                    isExternal ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "sr-only",
                        children: " (opent in nieuw venster)"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/pageBuilder/RichTextBlock.tsx",
                        lineNumber: 45,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)) : null
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/pageBuilder/RichTextBlock.tsx",
                lineNumber: 38,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0));
        }
    },
    list: {
        bullet: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "ml-6 list-disc space-y-2 text-[hsl(var(--dc-text))]",
                children: children
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/RichTextBlock.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
        number: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                className: "ml-6 list-decimal space-y-2 text-[hsl(var(--dc-text))]",
                children: children
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/RichTextBlock.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
    }
};
function RichTextBlock({ component }) {
    const align = component.textAlign ?? 'left';
    const maxWidthClass = component.maxWidth ? maxWidthMap[component.maxWidth] : maxWidthMap.default;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: [
            'w-full',
            maxWidthClass,
            'space-y-4',
            'text-[hsl(var(--dc-text))]',
            align === 'center' ? 'mx-auto text-center' : '',
            align === 'right' ? 'ml-auto text-right' : '',
            align === 'justify' ? 'mx-auto text-justify' : ''
        ].filter(Boolean).join(' '),
        "aria-label": component.ariaLabel,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$portabletext$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PortableText"], {
            value: component.content,
            components: portableTextComponents
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/pageBuilder/RichTextBlock.tsx",
            lineNumber: 83,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/pageBuilder/RichTextBlock.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_c = RichTextBlock;
var _c;
__turbopack_context__.k.register(_c, "RichTextBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/pageBuilder/colorUtils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TOKEN_TO_VAR",
    ()=>TOKEN_TO_VAR,
    "tokenToCss",
    ()=>tokenToCss
]);
const TOKEN_TO_VAR = {
    surface: '--dc-surface',
    'bg-soft': '--dc-bg-soft',
    bg: '--dc-bg',
    brand: '--dc-brand',
    primary: '--dc-primary',
    navy: '--dc-navy',
    text: '--dc-text'
};
function tokenToCss(token, alpha = 1) {
    if (!token) return undefined;
    const cssVar = TOKEN_TO_VAR[token];
    const alphaSuffix = alpha < 1 ? ` / ${alpha}` : '';
    return `hsl(var(${cssVar})${alphaSuffix})`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/pageBuilder/BackgroundLayer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BackgroundLayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2d$image$2f$dist$2f$mjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sanity-image/dist/mjs/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/pageBuilder/colorUtils.ts [app-client] (ecmascript)");
;
;
;
function BackgroundLayer({ background, className }) {
    if (!background) return null;
    const baseStyle = {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };
    const layers = [];
    let backgroundColor;
    if (background.mode === 'color') {
        backgroundColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenToCss"])(background.colorToken) ?? background.customColor ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenToCss"])('surface');
    }
    if (background.mode === 'gradient') {
        const first = background.customColor ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenToCss"])(background.colorToken) ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenToCss"])('brand');
        const second = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenToCss"])(background.secondaryColorToken) ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenToCss"])('primary') ?? first;
        layers.push(`linear-gradient(135deg, ${first}, ${second})`);
    }
    if (background.mode === 'image' && background.image?.asset) {
        const tintColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenToCss"])(background.imageTint, background.imageTintOpacity ?? 0.45);
        if (tintColor) {
            layers.push(`linear-gradient(${tintColor}, ${tintColor})`);
        }
        // Build a plugin-generated URL via `sanity-image` for better srcset/parameters
        try {
            const projectId = ("TURBOPACK compile-time value", "hs6e6yx5");
            const dataset = ("TURBOPACK compile-time value", "production");
            const baseUrl = ("TURBOPACK compile-time truthy", 1) ? `https://cdn.sanity.io/images/${projectId}/${dataset}/` : "TURBOPACK unreachable";
            // Resolve asset id
            const asset = background.image.asset;
            let assetId;
            if (typeof asset === 'string') {
                assetId = asset;
            } else if (asset && typeof asset === 'object') {
                const maybe = asset;
                assetId = maybe._ref || asset._id;
            }
            if (assetId && baseUrl) {
                const srcObj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2d$image$2f$dist$2f$mjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSrc"])({
                    id: assetId,
                    baseUrl,
                    width: 2400,
                    mode: 'contain'
                });
                if (srcObj && srcObj.src) layers.push(`url(${srcObj.src})`);
            }
        // Plugin-only: do not fallback to legacy url builder
        } catch (err) {
        // If plugin fails, do not inject a background image
        }
    }
    if (background.mode === 'texture') {
        const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenToCss"])(background.colorToken) ?? 'hsl(var(--dc-bg-soft))';
        backgroundColor = base;
        const patternColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenToCss"])('brand', 0.1) ?? 'hsl(var(--dc-text)/0.05)';
        switch(background.texture){
            case 'dots':
                layers.push(`radial-gradient(circle at 1px 1px, ${patternColor} 1px, transparent 0)`);
                baseStyle.backgroundSize = '24px 24px';
                break;
            case 'grid':
                layers.push(`linear-gradient(${patternColor} 1px, transparent 0), linear-gradient(90deg, ${patternColor} 1px, transparent 0)`);
                baseStyle.backgroundSize = '32px 32px';
                break;
            case 'diagonal':
                layers.push(`repeating-linear-gradient(135deg, transparent, transparent 16px, ${patternColor} 16px, ${patternColor} 32px)`);
                break;
            default:
                layers.push(`linear-gradient(${patternColor}, ${patternColor})`);
                break;
        }
    }
    if (background.overlay) {
        const overlayColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenToCss"])(background.overlay, background.overlayOpacity ?? 0.32);
        if (overlayColor) {
            layers.unshift(`linear-gradient(${overlayColor}, ${overlayColor})`);
        }
    }
    if (!layers.length && !backgroundColor) {
        backgroundColor = 'hsl(var(--dc-bg-soft))';
    }
    const style = {
        ...baseStyle,
        backgroundColor,
        backgroundImage: layers.length ? layers.join(',') : undefined,
        // Default to overlay blend when multiple layers are present so gradients/tints combine nicely
        backgroundBlendMode: layers.length > 1 ? 'overlay' : undefined,
        borderRadius: 'inherit'
    };
    const isDecorative = !background.ariaLabel;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: [
            'absolute inset-0 overflow-hidden rounded-[inherit]',
            className
        ].filter(Boolean).join(' '),
        style: style,
        "aria-hidden": isDecorative ? true : undefined,
        role: isDecorative ? undefined : 'img',
        "aria-label": isDecorative ? undefined : background.ariaLabel
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/pageBuilder/BackgroundLayer.tsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
_c = BackgroundLayer;
var _c;
__turbopack_context__.k.register(_c, "BackgroundLayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/pageBuilder/ImageBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ImageBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$SanityNextImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/SanityNextImage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2d$image$2f$dist$2f$mjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sanity-image/dist/mjs/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$BackgroundLayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/pageBuilder/BackgroundLayer.tsx [app-client] (ecmascript)");
;
;
;
;
;
const widthClassMap = {
    narrow: 'max-w-sm',
    default: 'max-w-2xl',
    wide: 'max-w-4xl',
    full: 'w-full'
};
const alignmentClassMap = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right'
};
function ImageBlock({ component }) {
    if (!component.image?.asset) return null;
    const alignmentClass = component.alignment ? alignmentClassMap[component.alignment] : alignmentClassMap.center;
    const widthClass = component.displayWidth ? widthClassMap[component.displayWidth] : widthClassMap.default;
    const { width = 1600, height = 900 } = component.image.asset.metadata?.dimensions ?? {
        width: 1600,
        height: 900
    };
    let imageUrl = null;
    try {
        const projectId = ("TURBOPACK compile-time value", "hs6e6yx5");
        const dataset = ("TURBOPACK compile-time value", "production");
        const baseUrl = ("TURBOPACK compile-time truthy", 1) ? `https://cdn.sanity.io/images/${projectId}/${dataset}/` : "TURBOPACK unreachable";
        const asset = component.image.asset;
        let assetId;
        if (typeof asset === 'string') {
            assetId = asset;
        } else if (asset && typeof asset === 'object') {
            const maybe = asset;
            assetId = maybe._ref || asset._id;
        }
        if (assetId && baseUrl) {
            const srcObj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2d$image$2f$dist$2f$mjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSrc"])({
                id: assetId,
                baseUrl,
                width: 1600,
                height: 900,
                mode: 'cover'
            });
            imageUrl = srcObj?.src ?? null;
        }
    } catch (err) {
        imageUrl = null;
    }
    // Plugin-only: if we could not build a plugin URL, leave `imageUrl` null
    const rounded = component.rounded ?? true;
    // Determine wrapper type and props properly
    const hasLink = Boolean(component.link?.href);
    const hasZoom = Boolean(component.allowZoom);
    const WrapperElement = hasLink ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] : hasZoom ? 'a' : 'div';
    const wrapperProps = hasLink && component.link ? {
        href: component.link.href,
        'aria-label': component.link.label
    } : hasZoom ? {
        href: imageUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `${component.image.alt || 'Afbeelding'} openen in nieuw venster`
    } : {};
    const WrapperComponent = WrapperElement;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
        className: [
            'relative flex w-full flex-col gap-3',
            widthClass,
            alignmentClass,
            rounded ? 'rounded-3xl' : 'rounded-lg',
            'p-4 sm:p-6',
            component.background ? 'overflow-hidden' : ''
        ].filter(Boolean).join(' '),
        style: {
            color: 'hsl(var(--dc-text))'
        },
        children: [
            component.background ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$BackgroundLayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                background: component.background
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/ImageBlock.tsx",
                lineNumber: 83,
                columnNumber: 31
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WrapperComponent, {
                ...wrapperProps,
                className: [
                    'relative block w-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]'
                ].join(' '),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "relative block w-full",
                    style: {
                        borderRadius: rounded ? '1.5rem' : '0.75rem',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px hsl(var(--dc-text)/0.12)'
                    },
                    children: (()=>{
                        const imgBlur = component.image?.blurDataURL;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$SanityNextImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            image: component.image,
                            alt: component.image.alt || '',
                            width: width,
                            height: height,
                            className: "h-auto w-full object-cover",
                            sizes: "(max-width: 768px) 100vw, 70vw",
                            placeholder: imgBlur ? 'blur' : undefined
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/pageBuilder/ImageBlock.tsx",
                            lineNumber: 101,
                            columnNumber: 15
                        }, this);
                    })()
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/pageBuilder/ImageBlock.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/ImageBlock.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            component.image.caption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                className: "relative text-center text-sm text-[hsl(var(--dc-text)/0.7)]",
                children: component.image.caption
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/ImageBlock.tsx",
                lineNumber: 115,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/src/components/pageBuilder/ImageBlock.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_c = ImageBlock;
var _c;
__turbopack_context__.k.register(_c, "ImageBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/pageBuilder/VideoBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VideoBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function VideoBlock({ component }) {
    const showControls = component.showControls ?? true;
    const muted = component.muted ?? true;
    const autoPlay = component.autoPlay ?? false;
    const loop = component.loop ?? false;
    const title = component.title || 'Video';
    const transcriptId = component.transcript ? `${component._key}-transcript` : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full space-y-4",
        "aria-label": title,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full overflow-hidden rounded-3xl bg-[hsl(var(--dc-text)/0.06)] shadow-lg",
                children: component.sourceType === 'file' && component.videoFile?.asset?.url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                    className: "h-full w-full object-cover",
                    controls: showControls,
                    muted: muted,
                    autoPlay: autoPlay,
                    loop: loop,
                    playsInline: true,
                    "aria-describedby": transcriptId,
                    poster: component.poster?.asset?.url,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                            src: component.videoFile.asset.url
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/pageBuilder/VideoBlock.tsx",
                            lineNumber: 29,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("track", {
                            kind: "captions",
                            src: component.captionsFile?.asset?.url || '',
                            srcLang: "nl",
                            label: "Nederlands",
                            default: !!component.captionsFile?.asset?.url
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/pageBuilder/VideoBlock.tsx",
                            lineNumber: 30,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/pageBuilder/VideoBlock.tsx",
                    lineNumber: 19,
                    columnNumber: 11
                }, this) : component.videoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative pt-[56.25%]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                        src: component.videoUrl,
                        title: title,
                        className: "absolute inset-0 h-full w-full",
                        allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
                        allowFullScreen: true
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/pageBuilder/VideoBlock.tsx",
                        lineNumber: 40,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/pageBuilder/VideoBlock.tsx",
                    lineNumber: 39,
                    columnNumber: 11
                }, this) : null
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/VideoBlock.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            component.transcript ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                id: transcriptId,
                className: "rounded-2xl border border-[hsl(var(--dc-border)/0.35)] bg-[hsl(var(--dc-surface))] p-4 text-sm leading-relaxed text-[hsl(var(--dc-text))]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                        className: "cursor-pointer font-semibold text-[hsl(var(--dc-brand))]",
                        children: "Transcript"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/pageBuilder/VideoBlock.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 whitespace-pre-wrap",
                        children: component.transcript
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/pageBuilder/VideoBlock.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/pageBuilder/VideoBlock.tsx",
                lineNumber: 51,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/src/components/pageBuilder/VideoBlock.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = VideoBlock;
var _c;
__turbopack_context__.k.register(_c, "VideoBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/pageBuilder/ButtonBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ButtonBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/icons/FeatherIcons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/pageBuilder/colorUtils.ts [app-client] (ecmascript)");
;
;
;
;
const iconMap = {
    none: null,
    'arrow-right': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrowRightIcon"], {
        "aria-hidden": true
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/pageBuilder/ButtonBlock.tsx",
        lineNumber: 16,
        columnNumber: 18
    }, ("TURBOPACK compile-time value", void 0)),
    download: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DownloadIcon"], {
        "aria-hidden": true
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/pageBuilder/ButtonBlock.tsx",
        lineNumber: 17,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0)),
    external: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExternalLinkIcon"], {
        "aria-hidden": true
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/pageBuilder/ButtonBlock.tsx",
        lineNumber: 18,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0)),
    video: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$icons$2f$FeatherIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayIcon"], {
        "aria-hidden": true
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/pageBuilder/ButtonBlock.tsx",
        lineNumber: 19,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0))
};
function computeVariantStyles(component) {
    const baseClass = 'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]';
    const fullWidthClass = component.fullWidth ? 'w-full' : '';
    switch(component.variant){
        case 'filled':
            return {
                className: `${baseClass} ${fullWidthClass}`.trim(),
                style: {
                    backgroundColor: 'hsl(var(--dc-primary))',
                    color: 'hsl(var(--dc-on-primary))',
                    border: '2px solid hsl(var(--dc-primary)/0.85)'
                }
            };
        case 'outline':
            return {
                className: `${baseClass} ${fullWidthClass}`.trim(),
                style: {
                    backgroundColor: 'transparent',
                    color: 'hsl(var(--dc-primary))',
                    border: '2px solid hsl(var(--dc-primary)/0.6)'
                }
            };
        case 'ghost':
            return {
                className: `${baseClass} ${fullWidthClass}`.trim(),
                style: {
                    backgroundColor: 'hsl(var(--dc-primary)/0.08)',
                    color: 'hsl(var(--dc-primary))',
                    border: '2px solid transparent'
                }
            };
        case 'custom':
            {
                const bg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenToCss"])(component.customColorToken) ?? 'hsl(var(--dc-brand))';
                const text = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$colorUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenToCss"])(component.customTextColorToken) ?? 'hsl(var(--dc-on-primary))';
                return {
                    className: `${baseClass} ${fullWidthClass}`.trim(),
                    style: {
                        backgroundColor: bg,
                        color: text,
                        border: '2px solid hsl(var(--dc-border)/0.35)'
                    }
                };
            }
        case 'cta':
        default:
            return {
                className: `${baseClass} ${fullWidthClass}`.trim(),
                style: {
                    backgroundColor: 'hsl(var(--dc-brand))',
                    color: 'hsl(var(--dc-on-primary))',
                    border: '2px solid hsl(var(--dc-brand)/0.75)',
                    boxShadow: '0 20px 32px hsl(var(--dc-brand)/0.25)'
                }
            };
    }
}
function ButtonBlock({ component }) {
    const iconPosition = component.iconPosition ?? 'trailing';
    const icon = component.icon ? iconMap[component.icon] : null;
    const styles = computeVariantStyles(component);
    const ariaLabel = component.ariaLabel || component.link.label;
    const accessibleHref = component.accessibleVersionUrl?.trim();
    const href = accessibleHref || component.link.href;
    const isPdfTarget = component.isPdf ?? /\.pdf(?:$|[?#])/i.test(component.link.href);
    const hasAccessiblePdf = Boolean(accessibleHref);
    const showAccessibleBadge = hasAccessiblePdf && isPdfTarget;
    const isInternal = /^\//.test(href);
    const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "flex items-center gap-2",
        children: [
            iconPosition !== 'trailing' && icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "hy-btn__icon",
                children: icon
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/ButtonBlock.tsx",
                lineNumber: 97,
                columnNumber: 46
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "hy-btn__label",
                children: component.label
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/ButtonBlock.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            showAccessibleBadge ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ml-1 rounded bg-[hsl(var(--dc-bg-soft))] px-2 py-0.5 text-xs font-semibold text-[hsl(var(--dc-text))]",
                children: "Toegankelijke PDF"
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/ButtonBlock.tsx",
                lineNumber: 100,
                columnNumber: 9
            }, this) : null,
            iconPosition !== 'leading' && icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "hy-btn__icon",
                children: icon
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/ButtonBlock.tsx",
                lineNumber: 104,
                columnNumber: 45
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/src/components/pageBuilder/ButtonBlock.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
    if (isInternal) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            "aria-label": ariaLabel,
            className: styles.className,
            style: styles.style,
            children: [
                content,
                isPdfTarget && !hasAccessiblePdf ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "sr-only",
                    children: " (PDF-bestand zonder toegankelijke versie beschikbaar)"
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/pageBuilder/ButtonBlock.tsx",
                    lineNumber: 113,
                    columnNumber: 11
                }, this) : null,
                component.accessibilityNote ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "sr-only",
                    children: [
                        " ",
                        component.accessibilityNote
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/pageBuilder/ButtonBlock.tsx",
                    lineNumber: 115,
                    columnNumber: 40
                }, this) : null
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/src/components/pageBuilder/ButtonBlock.tsx",
            lineNumber: 110,
            columnNumber: 7
        }, this);
    }
    const isExternal = /^https?:/i.test(href);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: href,
        "aria-label": ariaLabel,
        className: styles.className,
        style: styles.style,
        target: isExternal ? '_blank' : undefined,
        rel: isExternal ? 'noopener noreferrer' : undefined,
        children: [
            content,
            isPdfTarget && !hasAccessiblePdf ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: " (PDF-bestand zonder toegankelijke versie beschikbaar)"
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/ButtonBlock.tsx",
                lineNumber: 133,
                columnNumber: 9
            }, this) : null,
            component.accessibilityNote ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: [
                    " ",
                    component.accessibilityNote
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/pageBuilder/ButtonBlock.tsx",
                lineNumber: 135,
                columnNumber: 38
            }, this) : null,
            isExternal ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: " (opent in nieuw venster)"
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/ButtonBlock.tsx",
                lineNumber: 136,
                columnNumber: 21
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/src/components/pageBuilder/ButtonBlock.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, this);
}
_c = ButtonBlock;
var _c;
__turbopack_context__.k.register(_c, "ButtonBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/pageBuilder/Carousel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Carousel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const spacingPadding = {
    tight: 'px-2 md:px-4',
    normal: 'px-4 md:px-8',
    loose: 'px-6 md:px-12'
};
function Carousel({ ariaLabel, autoPlay = false, interval = 8000, showIndicators = true, spacing = 'normal', children }) {
    _s();
    const slides = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Carousel.useMemo[slides]": ()=>Array.isArray(children) ? children : [
                children
            ]
    }["Carousel.useMemo[slides]"], [
        children
    ]);
    const slideCount = slides.length;
    const [current, setCurrent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Carousel.useEffect": ()=>{
            if (!autoPlay || slideCount <= 1) return undefined;
            const timer = window.setInterval({
                "Carousel.useEffect.timer": ()=>{
                    setCurrent({
                        "Carousel.useEffect.timer": (prev)=>(prev + 1) % slideCount
                    }["Carousel.useEffect.timer"]);
                }
            }["Carousel.useEffect.timer"], Math.max(interval, 3000));
            return ({
                "Carousel.useEffect": ()=>window.clearInterval(timer)
            })["Carousel.useEffect"];
        }
    }["Carousel.useEffect"], [
        autoPlay,
        interval,
        slideCount
    ]);
    const goTo = (index)=>{
        setCurrent((index + slideCount) % slideCount);
    };
    const paddingClass = spacingPadding[spacing];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative",
        "aria-roledescription": "carousel",
        "aria-label": ariaLabel,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-hidden rounded-3xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex transition-transform duration-500 ease-out",
                    style: {
                        transform: `translateX(-${current * 100}%)`
                    },
                    children: slides.map((slide, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-full shrink-0 ${paddingClass}`,
                            role: "group",
                            "aria-roledescription": "slide",
                            "aria-label": `Slide ${index + 1} van ${slideCount}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-full",
                                children: slide
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/pageBuilder/Carousel.tsx",
                                lineNumber: 66,
                                columnNumber: 15
                            }, this)
                        }, index, false, {
                            fileName: "[project]/packages/web/src/components/pageBuilder/Carousel.tsx",
                            lineNumber: 59,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/pageBuilder/Carousel.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/pageBuilder/Carousel.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            slideCount > 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>goTo(current - 1),
                        className: "rounded-full border border-[hsl(var(--dc-border)/0.5)] px-4 py-2 text-sm font-medium text-[hsl(var(--dc-text))] transition hover:bg-[hsl(var(--dc-text)/0.06)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]",
                        "aria-label": "Vorige slide",
                        children: "Vorige"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/pageBuilder/Carousel.tsx",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this),
                    showIndicators ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        "aria-hidden": true,
                        children: slides.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `h-2 w-8 rounded-full transition ${index === current ? 'bg-[hsl(var(--dc-brand))]' : 'bg-[hsl(var(--dc-border)/0.4)]'}`
                            }, index, false, {
                                fileName: "[project]/packages/web/src/components/pageBuilder/Carousel.tsx",
                                lineNumber: 84,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/pageBuilder/Carousel.tsx",
                        lineNumber: 82,
                        columnNumber: 13
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>goTo(current + 1),
                        className: "rounded-full border border-[hsl(var(--dc-border)/0.5)] px-4 py-2 text-sm font-medium text-[hsl(var(--dc-text))] transition hover:bg-[hsl(var(--dc-text)/0.06)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]",
                        "aria-label": "Volgende slide",
                        children: "Volgende"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/pageBuilder/Carousel.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/pageBuilder/Carousel.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/src/components/pageBuilder/Carousel.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(Carousel, "VDwHBkx+aiBFCpzU5d891bAem0Q=");
_c = Carousel;
var _c;
__turbopack_context__.k.register(_c, "Carousel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/sections/RenderSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RenderSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Import new section routers
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$HeroSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/sections/HeroSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$FeatureSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/sections/FeatureSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$BlogSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/sections/BlogSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$TestimonialsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/sections/TestimonialsSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$PricingSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/sections/PricingSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$CTASection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/sections/CTASection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$FAQSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/sections/FAQSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$ContactSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/sections/ContactSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$NewsletterSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/sections/NewsletterSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$MediaSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/sections/MediaSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$DocumentAssetSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/sections/DocumentAssetSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$TeamSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/sections/TeamSection.tsx [app-client] (ecmascript)");
// SchemaUI sections
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$SplitSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/sections/SplitSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$SectionHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/sections/SectionHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$LogoCloudSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/sections/LogoCloudSection.tsx [app-client] (ecmascript)");
// Import existing pageBuilder component renderers
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$RichTextBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/pageBuilder/RichTextBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$ImageBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/pageBuilder/ImageBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$VideoBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/pageBuilder/VideoBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$ButtonBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/pageBuilder/ButtonBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$BlogCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/pageBuilder/BlogCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$Carousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/pageBuilder/Carousel.tsx [app-client] (ecmascript)");
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
function RenderSection({ section }) {
    // Route to the appropriate component based on _type
    switch(section._type){
        // New modular sections
        case "heroSection":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$HeroSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...section
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                lineNumber: 49,
                columnNumber: 14
            }, this);
        case "featureSection":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$FeatureSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...section
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                lineNumber: 51,
                columnNumber: 14
            }, this);
        case "blogSection":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$BlogSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...section
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                lineNumber: 53,
                columnNumber: 14
            }, this);
        case "testimonialsSection":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$TestimonialsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...section
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                lineNumber: 55,
                columnNumber: 14
            }, this);
        case "pricingSection":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$PricingSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...section
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                lineNumber: 57,
                columnNumber: 14
            }, this);
        case "ctaSection":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$CTASection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...section
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                lineNumber: 59,
                columnNumber: 14
            }, this);
        case "faqSection":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$FAQSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...section
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                lineNumber: 61,
                columnNumber: 14
            }, this);
        case "contactSection":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$ContactSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...section
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                lineNumber: 63,
                columnNumber: 14
            }, this);
        case "newsletterSection":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$NewsletterSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...section
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                lineNumber: 65,
                columnNumber: 14
            }, this);
        case "mediaSection":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$MediaSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...section
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                lineNumber: 67,
                columnNumber: 14
            }, this);
        case "documentAsset":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$DocumentAssetSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...section
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                lineNumber: 69,
                columnNumber: 14
            }, this);
        case "teamSection":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$TeamSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...section
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                lineNumber: 71,
                columnNumber: 14
            }, this);
        // SchemaUI sections
        case "splitSection":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$SplitSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...section
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                lineNumber: 75,
                columnNumber: 14
            }, this);
        case "sectionHeader":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$SectionHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...section
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                lineNumber: 77,
                columnNumber: 14
            }, this);
        case "logoCloudSection":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$LogoCloudSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...section
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                lineNumber: 79,
                columnNumber: 14
            }, this);
        // Existing pageBuilder component types
        case "richTextComponent":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$RichTextBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                component: section
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                lineNumber: 83,
                columnNumber: 14
            }, this);
        case "imageComponent":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$ImageBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                component: section
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                lineNumber: 85,
                columnNumber: 14
            }, this);
        case "videoComponent":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$VideoBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                component: section
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                lineNumber: 87,
                columnNumber: 14
            }, this);
        case "buttonComponent":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$ButtonBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                component: section
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                lineNumber: 89,
                columnNumber: 14
            }, this);
        case "blogCardComponent":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$BlogCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                component: section
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                lineNumber: 91,
                columnNumber: 14
            }, this);
        case "carouselComponent":
            {
                const carouselSection = section;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$pageBuilder$2f$Carousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    ariaLabel: carouselSection.ariaLabel,
                    autoPlay: carouselSection.autoPlay,
                    interval: carouselSection.interval,
                    showIndicators: carouselSection.showIndicators,
                    spacing: carouselSection.spacing,
                    children: carouselSection.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RenderSection, {
                            section: item
                        }, item._key, false, {
                            fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                            lineNumber: 103,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/sections/RenderSection.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this);
            }
        // Unknown type
        default:
            console.warn(`Unknown section type: ${section._type}`);
            return null;
    }
}
_c = RenderSection;
var _c;
__turbopack_context__.k.register(_c, "RenderSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/app/HomePagePreview.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HomePagePreview",
    ()=>HomePagePreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/sanity/lib/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$RenderSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/sections/RenderSection.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function HomePagePreview({ query, params }) {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePagePreview.useEffect": ()=>{
            let cancelled = false;
            const fetchData = {
                "HomePagePreview.useEffect.fetchData": async ()=>{
                    try {
                        setLoading(true);
                        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewClient"].fetch(query, params ?? {});
                        if (!cancelled) {
                            setData(result);
                            setError(null);
                        }
                    } catch (err) {
                        console.error('HomePagePreview fetch error:', err);
                        if (!cancelled) {
                            setError(err instanceof Error ? err : new Error('Failed to fetch preview data'));
                        }
                    } finally{
                        if (!cancelled) {
                            setLoading(false);
                        }
                    }
                }
            }["HomePagePreview.useEffect.fetchData"];
            // Initial fetch
            fetchData();
            // Set up live listener for draft changes
            const subscription = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewClient"].listen(query, params ?? {}, {
                includeResult: true,
                visibility: 'query',
                events: [
                    'mutation'
                ]
            }).subscribe({
                next: {
                    "HomePagePreview.useEffect.subscription": (update)=>{
                        if (!cancelled && update.result) {
                            setData(update.result);
                        } else if (!cancelled) {
                            fetchData();
                        }
                    }
                }["HomePagePreview.useEffect.subscription"],
                error: {
                    "HomePagePreview.useEffect.subscription": (err)=>{
                        if (!cancelled) {
                            console.error('Live update error:', err);
                            fetchData();
                        }
                    }
                }["HomePagePreview.useEffect.subscription"]
            });
            return ({
                "HomePagePreview.useEffect": ()=>{
                    cancelled = true;
                    subscription.unsubscribe();
                }
            })["HomePagePreview.useEffect"];
        }
    }["HomePagePreview.useEffect"], [
        query,
        params
    ]);
    if (loading && !data) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6",
            children: "Loading preview..."
        }, void 0, false, {
            fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
            lineNumber: 81,
            columnNumber: 12
        }, this);
    }
    if (error) {
        console.error('Preview error:', error);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 text-red-600",
            children: [
                "Error loading preview: ",
                error.message
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
            lineNumber: 86,
            columnNumber: 12
        }, this);
    }
    if (!data) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 max-w-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold mb-4 text-red-600",
                    children: "Preview Not Configured"
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mb-4",
                    children: "The preview mode requires a Sanity API token to access draft content."
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-semibold mb-2",
                            children: "To enable draft previews:"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                            className: "list-decimal ml-5 space-y-2 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: [
                                        "Go to ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://www.sanity.io/manage",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "text-blue-600 underline",
                                            children: "sanity.io/manage"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
                                            lineNumber: 99,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "Select your project"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "Go to API → Tokens"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: 'Create a token with "Viewer" permissions'
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "Copy the token"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: [
                                        "Add to your ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                            className: "bg-gray-200 px-1 rounded",
                                            children: ".env.local"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
                                            lineNumber: 104,
                                            columnNumber: 29
                                        }, this),
                                        " file:",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
                                            lineNumber: 104,
                                            columnNumber: 95
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                            className: "block bg-gray-800 text-white p-2 rounded mt-2",
                                            children: "SANITY_API_READ_TOKEN=your_token_here"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
                                            lineNumber: 105,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: [
                                        "Restart your dev server: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                            className: "bg-gray-200 px-1 rounded",
                                            children: "npm run dev"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
                                            lineNumber: 109,
                                            columnNumber: 42
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
                    lineNumber: 96,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
            lineNumber: 91,
            columnNumber: 7
        }, this);
    }
    if (!data.modules || data.modules.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6",
            children: "No modules found. Add content in Sanity Studio."
        }, void 0, false, {
            fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
            lineNumber: 117,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "contents",
        "aria-label": "Home page preview",
        children: data.modules.map((module)=>{
            // Create a stable but content-sensitive key to force re-render on changes
            // This ensures React re-renders components when content changes in preview mode
            const contentHash = JSON.stringify(module).length; // Simple hash based on content length
            const stableKey = `${module._key}-${contentHash}`;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$sections$2f$RenderSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                section: module
            }, stableKey, false, {
                fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
                lineNumber: 128,
                columnNumber: 16
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/packages/web/src/app/HomePagePreview.tsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
_s(HomePagePreview, "RiL7vLwmC7ZWXKL/bXt2EIBjBYk=");
_c = HomePagePreview;
var _c;
__turbopack_context__.k.register(_c, "HomePagePreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=packages_web_src_5f9aa78e._.js.map