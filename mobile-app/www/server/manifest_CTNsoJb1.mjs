import { g as decodeKey } from './chunks/astro/server_DLfV5Tyk.mjs';
import './chunks/shared_BQ26NZh_.mjs';
import './chunks/astro-designed-error-pages_Oe8HWFIm.mjs';

/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at ".concat(i));
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at ".concat(j));
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at ".concat(i));
            if (!pattern)
                throw new TypeError("Missing pattern at ".concat(i));
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function () {
        var result = "";
        var value;
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
        }
        return path;
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///www/wwwroot/baoxiao.fun/app/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.15.1_@types+node@22.0.0_rollup@4.21.0_typescript@5.5.4/node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"async function c(){await fetch(\"/api/admin/config\")}c();const l=document.getElementById(\"logoUrl\"),d=document.getElementById(\"logoFile\"),a=document.getElementById(\"logoPreview\");l.addEventListener(\"input\",()=>{a.src=l.value,a.style.display=l.value?\"block\":\"none\"});document.getElementById(\"uploadLogo\").onclick=async()=>{if(!d.files||!d.files[0]){alert(\"请选择要上传的图片文件\");return}const o=new FormData;o.append(\"file\",d.files[0]);const n=await fetch(\"/api/admin/upload\",{method:\"POST\",body:o});if(!n.ok){alert(\"上传失败\");return}const e=await n.json().catch(()=>({}));e.url&&(l.value=e.url,a.src=e.url,a.style.display=\"block\")};document.getElementById(\"save\").onclick=async()=>{const o=document.getElementById(\"robots\").value,[n,e]=o.split(\",\").map(t=>t.trim()),i={site:{channel:document.getElementById(\"channel\").value.trim(),title:document.getElementById(\"title\").value,theme:document.getElementById(\"theme\").value,staticProxy:document.getElementById(\"staticProxy\").value,description:document.getElementById(\"siteDesc\").value,subtitle:document.getElementById(\"subtitle\").value,logo:document.getElementById(\"logoUrl\").value,icp:document.getElementById(\"icp\").value},content:{maxPostsPerPage:parseInt(document.getElementById(\"pageSize\").value||\"20\",10),filterKeywords:document.getElementById(\"keywords\").value.split(\",\").map(t=>t.trim()).filter(Boolean),blockTags:document.getElementById(\"tags\").value.split(\",\").map(t=>t.trim()).filter(Boolean)},seo:{noIndex:n===\"noindex\",noFollow:e===\"nofollow\"},admin:{username:document.getElementById(\"adminUser\").value,password:document.getElementById(\"adminPass\").value}};(await fetch(\"/api/admin/config\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify(i)})).ok&&(document.getElementById(\"msg\").textContent=\"已保存\")};document.getElementById(\"logout\").onclick=async()=>{await fetch(\"/api/admin/logout\",{method:\"POST\"}),location.href=\"/admin\"};\n"}],"styles":[{"type":"inline","content":"body{font-family:ui-sans-serif,system-ui;padding:20px;background:#0f0f12;color:#e6e6ef}.row[data-astro-cid-nc6xuisf]{display:grid;grid-template-columns:220px 1fr;gap:10px;align-items:center;margin:12px 0}input[data-astro-cid-nc6xuisf],textarea[data-astro-cid-nc6xuisf],select[data-astro-cid-nc6xuisf]{width:100%;padding:10px 12px;border-radius:10px;border:1px solid #2a2a35;background:#13131a;color:#e6e6ef;outline:none}textarea[data-astro-cid-nc6xuisf]{min-height:80px}button[data-astro-cid-nc6xuisf]{padding:10px 16px;border-radius:10px;background:#4f46e5;color:#fff;border:0;font-weight:600;cursor:pointer}h1[data-astro-cid-nc6xuisf]{font-size:20px;margin:0 0 16px}.card[data-astro-cid-nc6xuisf]{background:linear-gradient(180deg,#1b1b22,#101015);border-radius:16px;padding:24px;box-shadow:0 10px 30px #0000004d}.group[data-astro-cid-nc6xuisf]{margin-bottom:20px}.two[data-astro-cid-nc6xuisf]{display:grid;grid-template-columns:1fr 1fr;gap:12px}.msg[data-astro-cid-nc6xuisf]{color:#a7f3d0;min-height:1em}a[data-astro-cid-nc6xuisf]{color:#93c5fd}.toolbar[data-astro-cid-nc6xuisf]{display:flex;gap:8px;align-items:center;justify-content:space-between;margin-bottom:12px}.logo-row[data-astro-cid-nc6xuisf]{grid-template-columns:220px auto max-content;align-items:center}.logo-preview[data-astro-cid-nc6xuisf]{max-height:56px;border-radius:10px;background:#111;padding:6px;border:1px solid #2a2a35}\n"}],"routeData":{"route":"/admin/settings","isIndex":false,"type":"page","pattern":"^\\/admin\\/settings\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/settings.astro","pathname":"/admin/settings","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.getElementById(\"b\").onclick=async()=>{const e=await fetch(\"/api/admin/login\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({username:document.getElementById(\"u\").value,password:document.getElementById(\"p\").value})});if(e.ok)location.href=\"/admin/settings\";else{const t=await e.json().catch(()=>({}));document.getElementById(\"m\").textContent=t.message||\"登录失败\"}};\n"}],"styles":[{"type":"inline","content":"body{font-family:ui-sans-serif,system-ui;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0f0f12;color:#fff}.card[data-astro-cid-u2h3djql]{width:360px;background:linear-gradient(180deg,#1b1b22,#101015);border-radius:16px;padding:24px;box-shadow:0 10px 30px #0000004d}h1[data-astro-cid-u2h3djql]{margin:0 0 16px;font-weight:700;font-size:20px}label[data-astro-cid-u2h3djql]{display:block;font-size:12px;color:#9aa;margin:12px 0 6px}input[data-astro-cid-u2h3djql]{width:100%;padding:10px 12px;border-radius:10px;border:1px solid #2a2a35;background:#13131a;color:#e6e6ef;outline:none}button[data-astro-cid-u2h3djql]{width:100%;margin-top:18px;padding:10px 12px;border-radius:10px;background:#4f46e5;color:#fff;border:0;font-weight:600;cursor:pointer}button[data-astro-cid-u2h3djql]:hover{background:#6366f1}.msg[data-astro-cid-u2h3djql]{margin-top:10px;font-size:12px;color:#fca5a5;min-height:1em}\n"}],"routeData":{"route":"/admin","isIndex":true,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/index.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_cursor_.G4i3VhTB.css"},{"type":"inline","content":".content{word-break:break-word;.image-list-container{display:grid;grid-template-columns:repeat(2,1fr);grid-template-rows:masonry;&.image-list-odd{:first-child{grid-column:1 / 3}}}img{width:calc(100% - var(--box-margin))}>pre{width:calc(100% - var(--box-margin));max-width:456px;overflow-x:auto}.tgme_widget_message_link_preview{margin-top:16px;display:none;.link_preview_site_name,.link_preview_title,.link_preview_description{display:none}}.tgme_widget_message_link_preview:has(.link_preview_site_name){display:block;background:var(--cell-background-color);border-left:3px solid var(--highlight-color);padding:6px 6px 6px 10px;border-radius:var(--box-border-radius);.link_preview_title{display:block;font-size:1em;font-weight:bolder;line-height:2}.link_preview_description{display:block;font-size:.8em;line-height:1.5}}.tgme_widget_message_video,.tgme_widget_message_roundvideo{aspect-ratio:1 / 1}.tgme_widget_message_link_preview:has(.link_preview_image){display:flex;position:relative;border:none;padding:0;background:transparent;.link_preview_image{aspect-ratio:1200 / 630;object-fit:cover}.link_preview_site_name{display:block;position:absolute;bottom:var(--box-margin);left:var(--box-margin);padding-left:4px;padding-right:4px;background-color:#000000a8;font-size:14px;color:#fff;line-height:1.5;border-radius:var(--box-border-radius);text-overflow:ellipsis;max-width:calc(100% - 28px);white-space:nowrap;overflow:hidden}.link_preview_title,.link_preview_description{display:none}}blockquote{margin:16px 0;font-size:.8em;background:var(--cell-background-color);border-left:3px solid var(--highlight-color);padding:6px 6px 6px 10px;border-radius:var(--box-border-radius)}.tgme_widget_message_sticker{display:block}&:has(.tgme_widget_message_user_photo){display:flex;.tgme_widget_message_user_photo{width:60px;height:60px}}.tgme_widget_message_voice{display:block!important}.tgme_widget_message_video_wrap{display:none}.tgme_widget_message_poll_options{display:block;.tgme_widget_message_poll_option_percent{float:left;margin-right:8px}}.tgme_widget_message_location_wrap{display:block;.tgme_widget_message_location{padding-top:50%;background:no-repeat center;background-size:cover}}.emoji{font-style:normal;margin-right:2px}.sticker{box-shadow:none;border:none}.spoiler-button{cursor:pointer;input{display:none}tg-spoiler{color:transparent;margin:auto 2px;border-radius:var(--box-border-radius);background:#ccc 60% 60% / 3000px 3000px;background-image:repeating-conic-gradient(#999 0 .0001%,#0000 0 .0002%)}input:checked+tg-spoiler{background:unset;color:unset}}}.tag-box{flex-wrap:wrap}[popover]{display:none;&:popover-open{display:block}}.image-preview-wrap{display:block}.image-preview-button{appearance:none;outline:none;border:none;background:transparent;padding:0;margin-bottom:16px}.modal{position:fixed;top:0;left:0;z-index:2147483647;width:100%;height:100%;background-color:#000c;backdrop-filter:blur(20px);overscroll-behavior:contain;touch-action:none}.modal-img{margin:auto;max-width:calc(100% - 40px)!important;max-height:calc(100% - 40px)!important;border-radius:var(--media-border-radius);border:1px solid var(--border-color);box-shadow:var(--shadows);cursor:pointer;object-fit:scale-down}.modal-close{position:fixed;top:48px;right:12px;z-index:2147483647;width:36px;height:36px;border-radius:18px;border:1px solid var(--border-color);background:#00000080;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:20px;line-height:1;cursor:pointer}@media screen and (min-width: 600px){.modal-img{max-width:calc(100% - 80px)!important;max-height:calc(100% - 80px)!important}}\n"}],"routeData":{"route":"/after/[cursor]","isIndex":false,"type":"page","pattern":"^\\/after\\/([^/]+?)\\/?$","segments":[[{"content":"after","dynamic":false,"spread":false}],[{"content":"cursor","dynamic":true,"spread":false}]],"params":["cursor"],"component":"src/pages/after/[cursor].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/config","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/config\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"config","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/config.js","pathname":"/api/admin/config","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/login","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/login\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/login.js","pathname":"/api/admin/login","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/logout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/logout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/logout.js","pathname":"/api/admin/logout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/upload","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/upload\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"upload","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/upload.js","pathname":"/api/admin/upload","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_cursor_.G4i3VhTB.css"},{"type":"inline","content":".content{word-break:break-word;.image-list-container{display:grid;grid-template-columns:repeat(2,1fr);grid-template-rows:masonry;&.image-list-odd{:first-child{grid-column:1 / 3}}}img{width:calc(100% - var(--box-margin))}>pre{width:calc(100% - var(--box-margin));max-width:456px;overflow-x:auto}.tgme_widget_message_link_preview{margin-top:16px;display:none;.link_preview_site_name,.link_preview_title,.link_preview_description{display:none}}.tgme_widget_message_link_preview:has(.link_preview_site_name){display:block;background:var(--cell-background-color);border-left:3px solid var(--highlight-color);padding:6px 6px 6px 10px;border-radius:var(--box-border-radius);.link_preview_title{display:block;font-size:1em;font-weight:bolder;line-height:2}.link_preview_description{display:block;font-size:.8em;line-height:1.5}}.tgme_widget_message_video,.tgme_widget_message_roundvideo{aspect-ratio:1 / 1}.tgme_widget_message_link_preview:has(.link_preview_image){display:flex;position:relative;border:none;padding:0;background:transparent;.link_preview_image{aspect-ratio:1200 / 630;object-fit:cover}.link_preview_site_name{display:block;position:absolute;bottom:var(--box-margin);left:var(--box-margin);padding-left:4px;padding-right:4px;background-color:#000000a8;font-size:14px;color:#fff;line-height:1.5;border-radius:var(--box-border-radius);text-overflow:ellipsis;max-width:calc(100% - 28px);white-space:nowrap;overflow:hidden}.link_preview_title,.link_preview_description{display:none}}blockquote{margin:16px 0;font-size:.8em;background:var(--cell-background-color);border-left:3px solid var(--highlight-color);padding:6px 6px 6px 10px;border-radius:var(--box-border-radius)}.tgme_widget_message_sticker{display:block}&:has(.tgme_widget_message_user_photo){display:flex;.tgme_widget_message_user_photo{width:60px;height:60px}}.tgme_widget_message_voice{display:block!important}.tgme_widget_message_video_wrap{display:none}.tgme_widget_message_poll_options{display:block;.tgme_widget_message_poll_option_percent{float:left;margin-right:8px}}.tgme_widget_message_location_wrap{display:block;.tgme_widget_message_location{padding-top:50%;background:no-repeat center;background-size:cover}}.emoji{font-style:normal;margin-right:2px}.sticker{box-shadow:none;border:none}.spoiler-button{cursor:pointer;input{display:none}tg-spoiler{color:transparent;margin:auto 2px;border-radius:var(--box-border-radius);background:#ccc 60% 60% / 3000px 3000px;background-image:repeating-conic-gradient(#999 0 .0001%,#0000 0 .0002%)}input:checked+tg-spoiler{background:unset;color:unset}}}.tag-box{flex-wrap:wrap}[popover]{display:none;&:popover-open{display:block}}.image-preview-wrap{display:block}.image-preview-button{appearance:none;outline:none;border:none;background:transparent;padding:0;margin-bottom:16px}.modal{position:fixed;top:0;left:0;z-index:2147483647;width:100%;height:100%;background-color:#000c;backdrop-filter:blur(20px);overscroll-behavior:contain;touch-action:none}.modal-img{margin:auto;max-width:calc(100% - 40px)!important;max-height:calc(100% - 40px)!important;border-radius:var(--media-border-radius);border:1px solid var(--border-color);box-shadow:var(--shadows);cursor:pointer;object-fit:scale-down}.modal-close{position:fixed;top:48px;right:12px;z-index:2147483647;width:36px;height:36px;border-radius:18px;border:1px solid var(--border-color);background:#00000080;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:20px;line-height:1;cursor:pointer}@media screen and (min-width: 600px){.modal-img{max-width:calc(100% - 80px)!important;max-height:calc(100% - 80px)!important}}\n"}],"routeData":{"route":"/before/[cursor]","isIndex":false,"type":"page","pattern":"^\\/before\\/([^/]+?)\\/?$","segments":[[{"content":"before","dynamic":false,"spread":false}],[{"content":"cursor","dynamic":true,"spread":false}]],"params":["cursor"],"component":"src/pages/before/[cursor].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_cursor_.G4i3VhTB.css"}],"routeData":{"route":"/links","isIndex":false,"type":"page","pattern":"^\\/links\\/?$","segments":[[{"content":"links","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/links.astro","pathname":"/links","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_cursor_.G4i3VhTB.css"},{"type":"inline","content":".content{word-break:break-word;.image-list-container{display:grid;grid-template-columns:repeat(2,1fr);grid-template-rows:masonry;&.image-list-odd{:first-child{grid-column:1 / 3}}}img{width:calc(100% - var(--box-margin))}>pre{width:calc(100% - var(--box-margin));max-width:456px;overflow-x:auto}.tgme_widget_message_link_preview{margin-top:16px;display:none;.link_preview_site_name,.link_preview_title,.link_preview_description{display:none}}.tgme_widget_message_link_preview:has(.link_preview_site_name){display:block;background:var(--cell-background-color);border-left:3px solid var(--highlight-color);padding:6px 6px 6px 10px;border-radius:var(--box-border-radius);.link_preview_title{display:block;font-size:1em;font-weight:bolder;line-height:2}.link_preview_description{display:block;font-size:.8em;line-height:1.5}}.tgme_widget_message_video,.tgme_widget_message_roundvideo{aspect-ratio:1 / 1}.tgme_widget_message_link_preview:has(.link_preview_image){display:flex;position:relative;border:none;padding:0;background:transparent;.link_preview_image{aspect-ratio:1200 / 630;object-fit:cover}.link_preview_site_name{display:block;position:absolute;bottom:var(--box-margin);left:var(--box-margin);padding-left:4px;padding-right:4px;background-color:#000000a8;font-size:14px;color:#fff;line-height:1.5;border-radius:var(--box-border-radius);text-overflow:ellipsis;max-width:calc(100% - 28px);white-space:nowrap;overflow:hidden}.link_preview_title,.link_preview_description{display:none}}blockquote{margin:16px 0;font-size:.8em;background:var(--cell-background-color);border-left:3px solid var(--highlight-color);padding:6px 6px 6px 10px;border-radius:var(--box-border-radius)}.tgme_widget_message_sticker{display:block}&:has(.tgme_widget_message_user_photo){display:flex;.tgme_widget_message_user_photo{width:60px;height:60px}}.tgme_widget_message_voice{display:block!important}.tgme_widget_message_video_wrap{display:none}.tgme_widget_message_poll_options{display:block;.tgme_widget_message_poll_option_percent{float:left;margin-right:8px}}.tgme_widget_message_location_wrap{display:block;.tgme_widget_message_location{padding-top:50%;background:no-repeat center;background-size:cover}}.emoji{font-style:normal;margin-right:2px}.sticker{box-shadow:none;border:none}.spoiler-button{cursor:pointer;input{display:none}tg-spoiler{color:transparent;margin:auto 2px;border-radius:var(--box-border-radius);background:#ccc 60% 60% / 3000px 3000px;background-image:repeating-conic-gradient(#999 0 .0001%,#0000 0 .0002%)}input:checked+tg-spoiler{background:unset;color:unset}}}.tag-box{flex-wrap:wrap}[popover]{display:none;&:popover-open{display:block}}.image-preview-wrap{display:block}.image-preview-button{appearance:none;outline:none;border:none;background:transparent;padding:0;margin-bottom:16px}.modal{position:fixed;top:0;left:0;z-index:2147483647;width:100%;height:100%;background-color:#000c;backdrop-filter:blur(20px);overscroll-behavior:contain;touch-action:none}.modal-img{margin:auto;max-width:calc(100% - 40px)!important;max-height:calc(100% - 40px)!important;border-radius:var(--media-border-radius);border:1px solid var(--border-color);box-shadow:var(--shadows);cursor:pointer;object-fit:scale-down}.modal-close{position:fixed;top:48px;right:12px;z-index:2147483647;width:36px;height:36px;border-radius:18px;border:1px solid var(--border-color);background:#00000080;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:20px;line-height:1;cursor:pointer}@media screen and (min-width: 600px){.modal-img{max-width:calc(100% - 80px)!important;max-height:calc(100% - 80px)!important}}\n"}],"routeData":{"route":"/page/[page]","isIndex":false,"type":"page","pattern":"^\\/page\\/([^/]+?)\\/?$","segments":[[{"content":"page","dynamic":false,"spread":false}],[{"content":"page","dynamic":true,"spread":false}]],"params":["page"],"component":"src/pages/page/[page].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_cursor_.G4i3VhTB.css"},{"type":"inline","content":".content{word-break:break-word;.image-list-container{display:grid;grid-template-columns:repeat(2,1fr);grid-template-rows:masonry;&.image-list-odd{:first-child{grid-column:1 / 3}}}img{width:calc(100% - var(--box-margin))}>pre{width:calc(100% - var(--box-margin));max-width:456px;overflow-x:auto}.tgme_widget_message_link_preview{margin-top:16px;display:none;.link_preview_site_name,.link_preview_title,.link_preview_description{display:none}}.tgme_widget_message_link_preview:has(.link_preview_site_name){display:block;background:var(--cell-background-color);border-left:3px solid var(--highlight-color);padding:6px 6px 6px 10px;border-radius:var(--box-border-radius);.link_preview_title{display:block;font-size:1em;font-weight:bolder;line-height:2}.link_preview_description{display:block;font-size:.8em;line-height:1.5}}.tgme_widget_message_video,.tgme_widget_message_roundvideo{aspect-ratio:1 / 1}.tgme_widget_message_link_preview:has(.link_preview_image){display:flex;position:relative;border:none;padding:0;background:transparent;.link_preview_image{aspect-ratio:1200 / 630;object-fit:cover}.link_preview_site_name{display:block;position:absolute;bottom:var(--box-margin);left:var(--box-margin);padding-left:4px;padding-right:4px;background-color:#000000a8;font-size:14px;color:#fff;line-height:1.5;border-radius:var(--box-border-radius);text-overflow:ellipsis;max-width:calc(100% - 28px);white-space:nowrap;overflow:hidden}.link_preview_title,.link_preview_description{display:none}}blockquote{margin:16px 0;font-size:.8em;background:var(--cell-background-color);border-left:3px solid var(--highlight-color);padding:6px 6px 6px 10px;border-radius:var(--box-border-radius)}.tgme_widget_message_sticker{display:block}&:has(.tgme_widget_message_user_photo){display:flex;.tgme_widget_message_user_photo{width:60px;height:60px}}.tgme_widget_message_voice{display:block!important}.tgme_widget_message_video_wrap{display:none}.tgme_widget_message_poll_options{display:block;.tgme_widget_message_poll_option_percent{float:left;margin-right:8px}}.tgme_widget_message_location_wrap{display:block;.tgme_widget_message_location{padding-top:50%;background:no-repeat center;background-size:cover}}.emoji{font-style:normal;margin-right:2px}.sticker{box-shadow:none;border:none}.spoiler-button{cursor:pointer;input{display:none}tg-spoiler{color:transparent;margin:auto 2px;border-radius:var(--box-border-radius);background:#ccc 60% 60% / 3000px 3000px;background-image:repeating-conic-gradient(#999 0 .0001%,#0000 0 .0002%)}input:checked+tg-spoiler{background:unset;color:unset}}}.tag-box{flex-wrap:wrap}[popover]{display:none;&:popover-open{display:block}}.image-preview-wrap{display:block}.image-preview-button{appearance:none;outline:none;border:none;background:transparent;padding:0;margin-bottom:16px}.modal{position:fixed;top:0;left:0;z-index:2147483647;width:100%;height:100%;background-color:#000c;backdrop-filter:blur(20px);overscroll-behavior:contain;touch-action:none}.modal-img{margin:auto;max-width:calc(100% - 40px)!important;max-height:calc(100% - 40px)!important;border-radius:var(--media-border-radius);border:1px solid var(--border-color);box-shadow:var(--shadows);cursor:pointer;object-fit:scale-down}.modal-close{position:fixed;top:48px;right:12px;z-index:2147483647;width:36px;height:36px;border-radius:18px;border:1px solid var(--border-color);background:#00000080;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:20px;line-height:1;cursor:pointer}@media screen and (min-width: 600px){.modal-img{max-width:calc(100% - 80px)!important;max-height:calc(100% - 80px)!important}}\n"}],"routeData":{"route":"/posts/[id]","isIndex":false,"type":"page","pattern":"^\\/posts\\/([^/]+?)\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/posts/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rules/prefetch.json","isIndex":false,"type":"endpoint","pattern":"^\\/rules\\/prefetch\\.json\\/?$","segments":[[{"content":"rules","dynamic":false,"spread":false}],[{"content":"prefetch.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rules/prefetch.json.js","pathname":"/rules/prefetch.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_cursor_.G4i3VhTB.css"},{"type":"inline","content":".content{word-break:break-word;.image-list-container{display:grid;grid-template-columns:repeat(2,1fr);grid-template-rows:masonry;&.image-list-odd{:first-child{grid-column:1 / 3}}}img{width:calc(100% - var(--box-margin))}>pre{width:calc(100% - var(--box-margin));max-width:456px;overflow-x:auto}.tgme_widget_message_link_preview{margin-top:16px;display:none;.link_preview_site_name,.link_preview_title,.link_preview_description{display:none}}.tgme_widget_message_link_preview:has(.link_preview_site_name){display:block;background:var(--cell-background-color);border-left:3px solid var(--highlight-color);padding:6px 6px 6px 10px;border-radius:var(--box-border-radius);.link_preview_title{display:block;font-size:1em;font-weight:bolder;line-height:2}.link_preview_description{display:block;font-size:.8em;line-height:1.5}}.tgme_widget_message_video,.tgme_widget_message_roundvideo{aspect-ratio:1 / 1}.tgme_widget_message_link_preview:has(.link_preview_image){display:flex;position:relative;border:none;padding:0;background:transparent;.link_preview_image{aspect-ratio:1200 / 630;object-fit:cover}.link_preview_site_name{display:block;position:absolute;bottom:var(--box-margin);left:var(--box-margin);padding-left:4px;padding-right:4px;background-color:#000000a8;font-size:14px;color:#fff;line-height:1.5;border-radius:var(--box-border-radius);text-overflow:ellipsis;max-width:calc(100% - 28px);white-space:nowrap;overflow:hidden}.link_preview_title,.link_preview_description{display:none}}blockquote{margin:16px 0;font-size:.8em;background:var(--cell-background-color);border-left:3px solid var(--highlight-color);padding:6px 6px 6px 10px;border-radius:var(--box-border-radius)}.tgme_widget_message_sticker{display:block}&:has(.tgme_widget_message_user_photo){display:flex;.tgme_widget_message_user_photo{width:60px;height:60px}}.tgme_widget_message_voice{display:block!important}.tgme_widget_message_video_wrap{display:none}.tgme_widget_message_poll_options{display:block;.tgme_widget_message_poll_option_percent{float:left;margin-right:8px}}.tgme_widget_message_location_wrap{display:block;.tgme_widget_message_location{padding-top:50%;background:no-repeat center;background-size:cover}}.emoji{font-style:normal;margin-right:2px}.sticker{box-shadow:none;border:none}.spoiler-button{cursor:pointer;input{display:none}tg-spoiler{color:transparent;margin:auto 2px;border-radius:var(--box-border-radius);background:#ccc 60% 60% / 3000px 3000px;background-image:repeating-conic-gradient(#999 0 .0001%,#0000 0 .0002%)}input:checked+tg-spoiler{background:unset;color:unset}}}.tag-box{flex-wrap:wrap}[popover]{display:none;&:popover-open{display:block}}.image-preview-wrap{display:block}.image-preview-button{appearance:none;outline:none;border:none;background:transparent;padding:0;margin-bottom:16px}.modal{position:fixed;top:0;left:0;z-index:2147483647;width:100%;height:100%;background-color:#000c;backdrop-filter:blur(20px);overscroll-behavior:contain;touch-action:none}.modal-img{margin:auto;max-width:calc(100% - 40px)!important;max-height:calc(100% - 40px)!important;border-radius:var(--media-border-radius);border:1px solid var(--border-color);box-shadow:var(--shadows);cursor:pointer;object-fit:scale-down}.modal-close{position:fixed;top:48px;right:12px;z-index:2147483647;width:36px;height:36px;border-radius:18px;border:1px solid var(--border-color);background:#00000080;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:20px;line-height:1;cursor:pointer}@media screen and (min-width: 600px){.modal-img{max-width:calc(100% - 80px)!important;max-height:calc(100% - 80px)!important}}\n"}],"routeData":{"route":"/search/[q]","isIndex":false,"type":"page","pattern":"^\\/search\\/([^/]+?)\\/?$","segments":[[{"content":"search","dynamic":false,"spread":false}],[{"content":"q","dynamic":true,"spread":false}]],"params":["q"],"component":"src/pages/search/[q].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/sitemap/[cursor].xml","isIndex":false,"type":"endpoint","pattern":"^\\/sitemap\\/([^/]+?)\\.xml\\/?$","segments":[[{"content":"sitemap","dynamic":false,"spread":false}],[{"content":"cursor","dynamic":true,"spread":false},{"content":".xml","dynamic":false,"spread":false}]],"params":["cursor"],"component":"src/pages/sitemap/[cursor].xml.js","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/sitemap.xml","isIndex":false,"type":"endpoint","pattern":"^\\/sitemap\\.xml\\/?$","segments":[[{"content":"sitemap.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sitemap.xml.js","pathname":"/sitemap.xml","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/static/[...url]","isIndex":false,"type":"endpoint","pattern":"^\\/static(?:\\/(.*?))?\\/?$","segments":[[{"content":"static","dynamic":false,"spread":false}],[{"content":"...url","dynamic":true,"spread":true}]],"params":["...url"],"component":"src/pages/static/[...url].js","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_cursor_.G4i3VhTB.css"}],"routeData":{"route":"/tags","isIndex":false,"type":"page","pattern":"^\\/tags\\/?$","segments":[[{"content":"tags","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tags.astro","pathname":"/tags","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/uploads/[...file]","isIndex":false,"type":"endpoint","pattern":"^\\/uploads(?:\\/(.*?))?\\/?$","segments":[[{"content":"uploads","dynamic":false,"spread":false}],[{"content":"...file","dynamic":true,"spread":true}]],"params":["...file"],"component":"src/pages/uploads/[...file].js","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_cursor_.G4i3VhTB.css"},{"type":"inline","content":".content{word-break:break-word;.image-list-container{display:grid;grid-template-columns:repeat(2,1fr);grid-template-rows:masonry;&.image-list-odd{:first-child{grid-column:1 / 3}}}img{width:calc(100% - var(--box-margin))}>pre{width:calc(100% - var(--box-margin));max-width:456px;overflow-x:auto}.tgme_widget_message_link_preview{margin-top:16px;display:none;.link_preview_site_name,.link_preview_title,.link_preview_description{display:none}}.tgme_widget_message_link_preview:has(.link_preview_site_name){display:block;background:var(--cell-background-color);border-left:3px solid var(--highlight-color);padding:6px 6px 6px 10px;border-radius:var(--box-border-radius);.link_preview_title{display:block;font-size:1em;font-weight:bolder;line-height:2}.link_preview_description{display:block;font-size:.8em;line-height:1.5}}.tgme_widget_message_video,.tgme_widget_message_roundvideo{aspect-ratio:1 / 1}.tgme_widget_message_link_preview:has(.link_preview_image){display:flex;position:relative;border:none;padding:0;background:transparent;.link_preview_image{aspect-ratio:1200 / 630;object-fit:cover}.link_preview_site_name{display:block;position:absolute;bottom:var(--box-margin);left:var(--box-margin);padding-left:4px;padding-right:4px;background-color:#000000a8;font-size:14px;color:#fff;line-height:1.5;border-radius:var(--box-border-radius);text-overflow:ellipsis;max-width:calc(100% - 28px);white-space:nowrap;overflow:hidden}.link_preview_title,.link_preview_description{display:none}}blockquote{margin:16px 0;font-size:.8em;background:var(--cell-background-color);border-left:3px solid var(--highlight-color);padding:6px 6px 6px 10px;border-radius:var(--box-border-radius)}.tgme_widget_message_sticker{display:block}&:has(.tgme_widget_message_user_photo){display:flex;.tgme_widget_message_user_photo{width:60px;height:60px}}.tgme_widget_message_voice{display:block!important}.tgme_widget_message_video_wrap{display:none}.tgme_widget_message_poll_options{display:block;.tgme_widget_message_poll_option_percent{float:left;margin-right:8px}}.tgme_widget_message_location_wrap{display:block;.tgme_widget_message_location{padding-top:50%;background:no-repeat center;background-size:cover}}.emoji{font-style:normal;margin-right:2px}.sticker{box-shadow:none;border:none}.spoiler-button{cursor:pointer;input{display:none}tg-spoiler{color:transparent;margin:auto 2px;border-radius:var(--box-border-radius);background:#ccc 60% 60% / 3000px 3000px;background-image:repeating-conic-gradient(#999 0 .0001%,#0000 0 .0002%)}input:checked+tg-spoiler{background:unset;color:unset}}}.tag-box{flex-wrap:wrap}[popover]{display:none;&:popover-open{display:block}}.image-preview-wrap{display:block}.image-preview-button{appearance:none;outline:none;border:none;background:transparent;padding:0;margin-bottom:16px}.modal{position:fixed;top:0;left:0;z-index:2147483647;width:100%;height:100%;background-color:#000c;backdrop-filter:blur(20px);overscroll-behavior:contain;touch-action:none}.modal-img{margin:auto;max-width:calc(100% - 40px)!important;max-height:calc(100% - 40px)!important;border-radius:var(--media-border-radius);border:1px solid var(--border-color);box-shadow:var(--shadows);cursor:pointer;object-fit:scale-down}.modal-close{position:fixed;top:48px;right:12px;z-index:2147483647;width:36px;height:36px;border-radius:18px;border:1px solid var(--border-color);background:#00000080;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:20px;line-height:1;cursor:pointer}@media screen and (min-width: 600px){.modal-img{max-width:calc(100% - 80px)!important;max-height:calc(100% - 80px)!important}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/www/wwwroot/baoxiao.fun/app/src/pages/admin/settings.astro",{"propagation":"none","containsHead":true}],["/www/wwwroot/baoxiao.fun/app/src/pages/admin/index.astro",{"propagation":"none","containsHead":true}],["/www/wwwroot/baoxiao.fun/app/src/pages/after/[cursor].astro",{"propagation":"none","containsHead":true}],["/www/wwwroot/baoxiao.fun/app/src/pages/before/[cursor].astro",{"propagation":"none","containsHead":true}],["/www/wwwroot/baoxiao.fun/app/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/www/wwwroot/baoxiao.fun/app/src/pages/page/[page].astro",{"propagation":"none","containsHead":true}],["/www/wwwroot/baoxiao.fun/app/src/pages/posts/[id].astro",{"propagation":"none","containsHead":true}],["/www/wwwroot/baoxiao.fun/app/src/pages/search/[q].astro",{"propagation":"none","containsHead":true}],["/www/wwwroot/baoxiao.fun/app/src/pages/links.astro",{"propagation":"none","containsHead":true}],["/www/wwwroot/baoxiao.fun/app/src/pages/tags.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.15.1_@types+node@22.0.0_rollup@4.21.0_typescript@5.5.4/node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/admin/settings@_@astro":"pages/admin/settings.astro.mjs","\u0000@astro-page:src/pages/admin/index@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/after/[cursor]@_@astro":"pages/after/_cursor_.astro.mjs","\u0000@astro-page:src/pages/api/admin/config@_@js":"pages/api/admin/config.astro.mjs","\u0000@astro-page:src/pages/api/admin/login@_@js":"pages/api/admin/login.astro.mjs","\u0000@astro-page:src/pages/api/admin/logout@_@js":"pages/api/admin/logout.astro.mjs","\u0000@astro-page:src/pages/api/admin/upload@_@js":"pages/api/admin/upload.astro.mjs","\u0000@astro-page:src/pages/before/[cursor]@_@astro":"pages/before/_cursor_.astro.mjs","\u0000@astro-page:src/pages/links@_@astro":"pages/links.astro.mjs","\u0000@astro-page:src/pages/page/[page]@_@astro":"pages/page/_page_.astro.mjs","\u0000@astro-page:src/pages/posts/[id]@_@astro":"pages/posts/_id_.astro.mjs","\u0000@astro-page:src/pages/rules/prefetch.json@_@js":"pages/rules/prefetch.json.astro.mjs","\u0000@astro-page:src/pages/search/[q]@_@astro":"pages/search/_q_.astro.mjs","\u0000@astro-page:src/pages/sitemap/[cursor].xml@_@js":"pages/sitemap/_cursor_.xml.astro.mjs","\u0000@astro-page:src/pages/sitemap.xml@_@js":"pages/sitemap.xml.astro.mjs","\u0000@astro-page:src/pages/static/[...url]@_@js":"pages/static/_---url_.astro.mjs","\u0000@astro-page:src/pages/tags@_@astro":"pages/tags.astro.mjs","\u0000@astro-page:src/pages/uploads/[...file]@_@js":"pages/uploads/_---file_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","/www/wwwroot/baoxiao.fun/app/node_modules/.pnpm/astro@4.15.1_@types+node@22.0.0_rollup@4.21.0_typescript@5.5.4/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_CTNsoJb1.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.DzbdxYkn.js","/astro/hoisted.js?q=0":"_astro/hoisted.CXw621fD.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/void.48wdlgMU.png","/_astro/back-to-top.CnE45Dm3.svg","/_astro/podcast.C2tLBMc1.svg","/_astro/twitter.DqUhhn25.svg","/_astro/github.z0dct1GQ.svg","/_astro/discord.DwdWJxoi.svg","/_astro/search.DsGSW3tX.svg","/_astro/theme-toggle.BFeb63U_.svg","/_astro/mastodon.BYNdYR6e.svg","/_astro/moon-icon.9XOh5Tl-.svg","/_astro/bluesky.DzsTfgug.svg","/_astro/_cursor_.G4i3VhTB.css","/baoxiaofang-144.png","/baoxiaofang-192.png","/baoxiaofang-48.png","/baoxiaofang-72.png","/baoxiaofang-96.png","/baoxiaofang-logo.svg","/favicon.ico","/favicon.svg","/robots.txt","/uploads/mfl5fpy2-u8bdyz.png"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"TUVcwc+Xr7oi/O/lZIeshenWK8LYmk8S75dhnaY/fuU=","experimentalEnvGetSecretEnabled":false});

export { manifest };
