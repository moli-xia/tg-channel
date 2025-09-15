import { c as createComponent, r as renderTemplate, a as addAttribute, u as unescapeHTML, m as maybeRenderHead, b as createAstro, e as renderComponent, f as renderSlot } from './astro/server_DLfV5Tyk.mjs';
import { $ as $$Header, a as $$Base } from './header_MAu7La_Q.mjs';
/* empty css                            */
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import updateLocale from 'dayjs/plugin/updateLocale.js';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import 'dayjs/locale/af.js';
import 'dayjs/locale/am.js';
import 'dayjs/locale/ar-dz.js';
import 'dayjs/locale/ar-iq.js';
import 'dayjs/locale/ar-kw.js';
import 'dayjs/locale/ar-ly.js';
import 'dayjs/locale/ar-ma.js';
import 'dayjs/locale/ar-sa.js';
import 'dayjs/locale/ar-tn.js';
import 'dayjs/locale/ar.js';
import 'dayjs/locale/az.js';
import 'dayjs/locale/be.js';
import 'dayjs/locale/bg.js';
import 'dayjs/locale/bi.js';
import 'dayjs/locale/bm.js';
import 'dayjs/locale/bn-bd.js';
import 'dayjs/locale/bn.js';
import 'dayjs/locale/bo.js';
import 'dayjs/locale/br.js';
import 'dayjs/locale/bs.js';
import 'dayjs/locale/ca.js';
import 'dayjs/locale/cs.js';
import 'dayjs/locale/cv.js';
import 'dayjs/locale/cy.js';
import 'dayjs/locale/da.js';
import 'dayjs/locale/de-at.js';
import 'dayjs/locale/de-ch.js';
import 'dayjs/locale/de.js';
import 'dayjs/locale/dv.js';
import 'dayjs/locale/el.js';
import 'dayjs/locale/en-au.js';
import 'dayjs/locale/en-ca.js';
import 'dayjs/locale/en-gb.js';
import 'dayjs/locale/en-ie.js';
import 'dayjs/locale/en-il.js';
import 'dayjs/locale/en-in.js';
import 'dayjs/locale/en-nz.js';
import 'dayjs/locale/en-sg.js';
import 'dayjs/locale/en-tt.js';
import 'dayjs/locale/en.js';
import 'dayjs/locale/eo.js';
import 'dayjs/locale/es-do.js';
import 'dayjs/locale/es-mx.js';
import 'dayjs/locale/es-pr.js';
import 'dayjs/locale/es-us.js';
import 'dayjs/locale/es.js';
import 'dayjs/locale/et.js';
import 'dayjs/locale/eu.js';
import 'dayjs/locale/fa.js';
import 'dayjs/locale/fi.js';
import 'dayjs/locale/fo.js';
import 'dayjs/locale/fr-ca.js';
import 'dayjs/locale/fr-ch.js';
import 'dayjs/locale/fr.js';
import 'dayjs/locale/fy.js';
import 'dayjs/locale/ga.js';
import 'dayjs/locale/gd.js';
import 'dayjs/locale/gl.js';
import 'dayjs/locale/gom-latn.js';
import 'dayjs/locale/gu.js';
import 'dayjs/locale/he.js';
import 'dayjs/locale/hi.js';
import 'dayjs/locale/hr.js';
import 'dayjs/locale/ht.js';
import 'dayjs/locale/hu.js';
import 'dayjs/locale/hy-am.js';
import 'dayjs/locale/id.js';
import 'dayjs/locale/is.js';
import 'dayjs/locale/it-ch.js';
import 'dayjs/locale/it.js';
import 'dayjs/locale/ja.js';
import 'dayjs/locale/jv.js';
import 'dayjs/locale/ka.js';
import 'dayjs/locale/kk.js';
import 'dayjs/locale/km.js';
import 'dayjs/locale/kn.js';
import 'dayjs/locale/ko.js';
import 'dayjs/locale/ku.js';
import 'dayjs/locale/ky.js';
import 'dayjs/locale/lb.js';
import 'dayjs/locale/lo.js';
import 'dayjs/locale/lt.js';
import 'dayjs/locale/lv.js';
import 'dayjs/locale/me.js';
import 'dayjs/locale/mi.js';
import 'dayjs/locale/mk.js';
import 'dayjs/locale/ml.js';
import 'dayjs/locale/mn.js';
import 'dayjs/locale/mr.js';
import 'dayjs/locale/ms-my.js';
import 'dayjs/locale/ms.js';
import 'dayjs/locale/mt.js';
import 'dayjs/locale/my.js';
import 'dayjs/locale/nb.js';
import 'dayjs/locale/ne.js';
import 'dayjs/locale/nl-be.js';
import 'dayjs/locale/nl.js';
import 'dayjs/locale/nn.js';
import 'dayjs/locale/oc-lnc.js';
import 'dayjs/locale/pa-in.js';
import 'dayjs/locale/pl.js';
import 'dayjs/locale/pt-br.js';
import 'dayjs/locale/pt.js';
import 'dayjs/locale/rn.js';
import 'dayjs/locale/ro.js';
import 'dayjs/locale/ru.js';
import 'dayjs/locale/rw.js';
import 'dayjs/locale/sd.js';
import 'dayjs/locale/se.js';
import 'dayjs/locale/si.js';
import 'dayjs/locale/sk.js';
import 'dayjs/locale/sl.js';
import 'dayjs/locale/sq.js';
import 'dayjs/locale/sr-cyrl.js';
import 'dayjs/locale/sr.js';
import 'dayjs/locale/ss.js';
import 'dayjs/locale/sv-fi.js';
import 'dayjs/locale/sv.js';
import 'dayjs/locale/sw.js';
import 'dayjs/locale/ta.js';
import 'dayjs/locale/te.js';
import 'dayjs/locale/tet.js';
import 'dayjs/locale/tg.js';
import 'dayjs/locale/th.js';
import 'dayjs/locale/tk.js';
import 'dayjs/locale/tl-ph.js';
import 'dayjs/locale/tlh.js';
import 'dayjs/locale/tr.js';
import 'dayjs/locale/tzl.js';
import 'dayjs/locale/tzm-latn.js';
import 'dayjs/locale/tzm.js';
import 'dayjs/locale/ug-cn.js';
import 'dayjs/locale/uk.js';
import 'dayjs/locale/ur.js';
import 'dayjs/locale/uz-latn.js';
import 'dayjs/locale/uz.js';
import 'dayjs/locale/vi.js';
import 'dayjs/locale/x-pseudo.js';
import 'dayjs/locale/yo.js';
import 'dayjs/locale/zh-cn.js';
import 'dayjs/locale/zh-hk.js';
import 'dayjs/locale/zh-tw.js';
import 'dayjs/locale/zh.js';
import { a as getEnv } from './index_CVafTiTZ.mjs';

dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a, _b;
const $$Astro$1 = createAstro();
const $$Item = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Item;
  const locale = getEnv(Object.assign(__vite_import_meta_env__, { CHANNEL: "miantiao_me", LOCALE: "zh-cn", TIMEZONE: "Asia/Shanghai", COMMENTS: "" }), Astro2, "LOCALE");
  const timezone = getEnv(Object.assign(__vite_import_meta_env__, { CHANNEL: "miantiao_me", LOCALE: "zh-cn", TIMEZONE: "Asia/Shanghai", COMMENTS: "" }), Astro2, "TIMEZONE");
  locale && dayjs.locale(locale);
  const { SITE_URL } = Astro2.locals;
  const { post, isItem } = Astro2.props;
  const channel = getEnv(Object.assign(__vite_import_meta_env__, { CHANNEL: "miantiao_me", LOCALE: "zh-cn", TIMEZONE: "Asia/Shanghai", COMMENTS: "" }), Astro2, "CHANNEL");
  const COMMENTS = getEnv(Object.assign(__vite_import_meta_env__, { CHANNEL: "miantiao_me", LOCALE: "zh-cn", TIMEZONE: "Asia/Shanghai", COMMENTS: "" }), Astro2, "COMMENTS");
  const datetime = dayjs(post.datetime).tz(timezone);
  const timeago = datetime.isBefore(dayjs().subtract(1, "w")) ? datetime.format("HH:mm · ll · ddd") : datetime.fromNow();
  return renderTemplate(_b || (_b = __template(["", '<div class="item"', '> <div class="time-box"> <div class="dot"></div> <div class="time"> <a', "", ' class="item-link"> <time', "", ">", "</time> </a> </div> </div> ", " ", " ", ` <script>
    (() => {
      const script = document.currentScript;
      const root = script?.closest('.item');
      if (!root) return;
      const content = root.querySelector('.content');
      if (!content) return;
      const imgs = Array.from(content.querySelectorAll('img'));
      if (imgs.length === 0) return;

      // 绑定点击打开预览
      imgs.forEach((img, idx) => {
        if (img.dataset.previewBound === '1') return;
        img.dataset.previewBound = '1';
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          openModal(idx);
        }, { passive: false });
      });

      let currentIndex = 0;
      let overlay = null;
      let modalImg = null;
      let scale = 1;
      let translateX = 0, translateY = 0;
      let isDragging = false, dragStartX = 0, dragStartY = 0, originX = 0, originY = 0;
      let touchStartX = 0, touchStartY = 0, touchMoved = false;
      let lastDbl = 0;
      let lastTap = 0, lastTapX = 0, lastTapY = 0;
      let bodyOverflowPrev = '';
      let pinchLastDist = 0;

      function buildOverlay() {
        overlay = document.createElement('div');
        overlay.className = 'modal';
        overlay.style.display = 'none';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.tabIndex = -1;
        // 添加图片与关闭按钮，挂载到 body 确保绝对置顶
        overlay.innerHTML = \`<img class="modal-img" alt="" /><button class="modal-close" aria-label="关闭预览">×</button>\`;
        document.body.appendChild(overlay);
        modalImg = overlay.querySelector('.modal-img');
        const closeBtn = overlay.querySelector('.modal-close');
        if (closeBtn) {
          closeBtn.addEventListener('click', (e) => { e.stopPropagation(); close(); });
        }

        // 点击遮罩关闭预览
        overlay.addEventListener('click', (ev) => {
          if (ev.target !== overlay) return; // 只在点击遮罩时
          close();
        });
        // 触摸点击遮罩关闭
        overlay.addEventListener('touchend', (ev) => {
          if (ev.target === overlay) close();
        });

        // 右键关闭
        overlay.addEventListener('contextmenu', (e) => { e.preventDefault(); close(); });

        // 键盘
        document.addEventListener('keydown', onKey);

        // 滚轮缩放（在图片上）
        modalImg.addEventListener('wheel', onWheel, { passive: false });

        // 拖拽平移
        modalImg.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        // 触摸：滑动切换/拖动
        modalImg.addEventListener('touchstart', onTouchStart, { passive: true });
        modalImg.addEventListener('touchend', onTouchEnd);
        modalImg.addEventListener('touchmove', onTouchMove, { passive: false });

        // 双击切换缩放
        modalImg.addEventListener('dblclick', (e) => { e.preventDefault(); e.stopPropagation(); lastDbl = Date.now(); toggleZoom(e); });

        // 图片区域单击处理
        modalImg.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (Date.now() - lastDbl < 300) return; // 刚双击过
          if (scale > 1) return; // 放大时不切换
          
          const rect = modalImg.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // 点击图片下方空白区域关闭预览
          if (y > rect.height * 0.8) {
            close();
            return;
          }
          
          // 点击图片左右半屏切换（仅在图片上半部分）
          if (imgs.length > 1) {
            if (x < rect.width / 2) prev(); else next();
          }
        });

        // 阻止页面滚动
        overlay.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
      }

      function openModal(index) {
        currentIndex = index;
        if (!overlay) buildOverlay();
        updateImage();
        resetTransform();
        overlay.style.display = 'flex';
        bodyOverflowPrev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        overlay.focus();
      }

      function close() {
        if (!overlay) return;
        overlay.style.display = 'none';
        document.body.style.overflow = bodyOverflowPrev || '';
      }

      function updateImage() {
        if (!modalImg) return;
        const src = imgs[currentIndex]?.getAttribute('src') || imgs[currentIndex]?.getAttribute('data-src');
        if (src) modalImg.src = src;
        modalImg.style.transform = '';
      }

      function prev() {
        currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
        updateImage();
        resetTransform();
      }

      function next() {
        currentIndex = (currentIndex + 1) % imgs.length;
        updateImage();
        resetTransform();
      }

      function resetTransform() {
        scale = 1; translateX = 0; translateY = 0;
        applyTransform();
      }

      function applyTransform() {
        if (!modalImg) return;
        modalImg.style.transform = \`translate(\${translateX}px, \${translateY}px) scale(\${scale})\`;
        modalImg.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
      }

      function onKey(e) {
        if (!overlay || overlay.style.display === 'none') return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowLeft' && imgs.length > 1) prev();
        else if (e.key === 'ArrowRight' && imgs.length > 1) next();
      }

      function onWheel(e) {
        e.preventDefault();
        const delta = -e.deltaY;
        const zoomIntensity = 0.0015;
        const newScale = clamp(scale * (1 + delta * zoomIntensity), 1, 5);
        const rect = modalImg.getBoundingClientRect();
        const cx = e.clientX - rect.left - rect.width / 2;
        const cy = e.clientY - rect.top - rect.height / 2;
        translateX += cx * (1 - newScale / scale);
        translateY += cy * (1 - newScale / scale);
        scale = newScale;
        applyTransform();
      }

      function onMouseDown(e) {
        if (scale <= 1) return;
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        originX = translateX;
        originY = translateY;
        modalImg.style.cursor = 'grabbing';
      }

      function onMouseMove(e) {
        if (!isDragging) return;
        translateX = originX + (e.clientX - dragStartX);
        translateY = originY + (e.clientY - dragStartY);
        applyTransform();
      }

      function onMouseUp() {
        if (!isDragging) return;
        isDragging = false;
        modalImg.style.cursor = 'grab';
      }

      function toggleZoom(e) {
        if (!modalImg) return;
        if (scale === 1) {
          const rect = modalImg.getBoundingClientRect();
          const cx = e.clientX - rect.left - rect.width / 2;
          const cy = e.clientY - rect.top - rect.height / 2;
          scale = 2;
          translateX -= cx;
          translateY -= cy;
        } else {
          scale = 1; translateX = 0; translateY = 0;
        }
        applyTransform();
      }

      function onTouchStart(e) {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          touchMoved = false;
        } else if (e.touches.length === 2) {
          const t1 = e.touches[0], t2 = e.touches[1];
          pinchLastDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY) || 0;
        }
      }

      function onTouchMove(e) {
        if (e.touches.length === 1) {
          const dx = e.touches[0].clientX - touchStartX;
          const dy = e.touches[0].clientY - touchStartY;
          if (scale > 1) {
            e.preventDefault();
            translateX += dx * 0.5;
            translateY += dy * 0.5;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            applyTransform();
          } else {
            if (Math.abs(dx) > 10) touchMoved = true;
          }
        } else if (e.touches.length === 2) {
          e.preventDefault();
          const t1 = e.touches[0], t2 = e.touches[1];
          const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY) || 0;
          if (pinchLastDist === 0) { pinchLastDist = dist; return; }
          const ratio = dist / (pinchLastDist || dist);
          const newScale = clamp(scale * ratio, 1, 5);
          const rect = modalImg.getBoundingClientRect();
          const midX = (t1.clientX + t2.clientX) / 2;
          const midY = (t1.clientY + t2.clientY) / 2;
          const cx = midX - rect.left - rect.width / 2;
          const cy = midY - rect.top - rect.height / 2;
          translateX += cx * (1 - newScale / scale);
          translateY += cy * (1 - newScale / scale);
          scale = newScale;
          pinchLastDist = dist;
          touchMoved = true;
          applyTransform();
        }
      }

      function onTouchEnd(e) {
        const now = Date.now();
        const endX = (e.changedTouches && e.changedTouches[0].clientX) || touchStartX;
        const endY = (e.changedTouches && e.changedTouches[0].clientY) || touchStartY;
        pinchLastDist = 0;
        // 双击触摸缩放（移动端）
        if (Math.abs(endX - touchStartX) < 10 && Math.abs(endY - touchStartY) < 10) {
          if (now - lastTap < 300) {
            lastDbl = now; // 抑制 overlay 点击切换
            // 构造一个类似鼠标事件的对象传给 toggleZoom
            toggleZoom({ clientX: endX, clientY: endY });
            lastTap = 0;
            return;
          }
          lastTap = now;
          lastTapX = endX; lastTapY = endY;
        }

        // 单击（轻触）图片左右半屏切换（仅缩放为 1 且没有滑动时）
        if (scale === 1 && !touchMoved) {
          const rect = modalImg.getBoundingClientRect();
          const x = endX - rect.left;
          if (imgs.length > 1) {
            if (x < rect.width / 2) prev(); else next();
            return;
          }
        }

        if (scale === 1 && touchMoved) {
          const diff = endX - touchStartX;
          if (Math.abs(diff) > 40) {
            if (diff > 0) prev(); else next();
          }
        }
      }

      function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
    })();
  </script> </div>`], ["", '<div class="item"', '> <div class="time-box"> <div class="dot"></div> <div class="time"> <a', "", ' class="item-link"> <time', "", ">", "</time> </a> </div> </div> ", " ", " ", ` <script>
    (() => {
      const script = document.currentScript;
      const root = script?.closest('.item');
      if (!root) return;
      const content = root.querySelector('.content');
      if (!content) return;
      const imgs = Array.from(content.querySelectorAll('img'));
      if (imgs.length === 0) return;

      // 绑定点击打开预览
      imgs.forEach((img, idx) => {
        if (img.dataset.previewBound === '1') return;
        img.dataset.previewBound = '1';
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          openModal(idx);
        }, { passive: false });
      });

      let currentIndex = 0;
      let overlay = null;
      let modalImg = null;
      let scale = 1;
      let translateX = 0, translateY = 0;
      let isDragging = false, dragStartX = 0, dragStartY = 0, originX = 0, originY = 0;
      let touchStartX = 0, touchStartY = 0, touchMoved = false;
      let lastDbl = 0;
      let lastTap = 0, lastTapX = 0, lastTapY = 0;
      let bodyOverflowPrev = '';
      let pinchLastDist = 0;

      function buildOverlay() {
        overlay = document.createElement('div');
        overlay.className = 'modal';
        overlay.style.display = 'none';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.tabIndex = -1;
        // 添加图片与关闭按钮，挂载到 body 确保绝对置顶
        overlay.innerHTML = \\\`<img class="modal-img" alt="" /><button class="modal-close" aria-label="关闭预览">×</button>\\\`;
        document.body.appendChild(overlay);
        modalImg = overlay.querySelector('.modal-img');
        const closeBtn = overlay.querySelector('.modal-close');
        if (closeBtn) {
          closeBtn.addEventListener('click', (e) => { e.stopPropagation(); close(); });
        }

        // 点击遮罩关闭预览
        overlay.addEventListener('click', (ev) => {
          if (ev.target !== overlay) return; // 只在点击遮罩时
          close();
        });
        // 触摸点击遮罩关闭
        overlay.addEventListener('touchend', (ev) => {
          if (ev.target === overlay) close();
        });

        // 右键关闭
        overlay.addEventListener('contextmenu', (e) => { e.preventDefault(); close(); });

        // 键盘
        document.addEventListener('keydown', onKey);

        // 滚轮缩放（在图片上）
        modalImg.addEventListener('wheel', onWheel, { passive: false });

        // 拖拽平移
        modalImg.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        // 触摸：滑动切换/拖动
        modalImg.addEventListener('touchstart', onTouchStart, { passive: true });
        modalImg.addEventListener('touchend', onTouchEnd);
        modalImg.addEventListener('touchmove', onTouchMove, { passive: false });

        // 双击切换缩放
        modalImg.addEventListener('dblclick', (e) => { e.preventDefault(); e.stopPropagation(); lastDbl = Date.now(); toggleZoom(e); });

        // 图片区域单击处理
        modalImg.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (Date.now() - lastDbl < 300) return; // 刚双击过
          if (scale > 1) return; // 放大时不切换
          
          const rect = modalImg.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // 点击图片下方空白区域关闭预览
          if (y > rect.height * 0.8) {
            close();
            return;
          }
          
          // 点击图片左右半屏切换（仅在图片上半部分）
          if (imgs.length > 1) {
            if (x < rect.width / 2) prev(); else next();
          }
        });

        // 阻止页面滚动
        overlay.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
      }

      function openModal(index) {
        currentIndex = index;
        if (!overlay) buildOverlay();
        updateImage();
        resetTransform();
        overlay.style.display = 'flex';
        bodyOverflowPrev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        overlay.focus();
      }

      function close() {
        if (!overlay) return;
        overlay.style.display = 'none';
        document.body.style.overflow = bodyOverflowPrev || '';
      }

      function updateImage() {
        if (!modalImg) return;
        const src = imgs[currentIndex]?.getAttribute('src') || imgs[currentIndex]?.getAttribute('data-src');
        if (src) modalImg.src = src;
        modalImg.style.transform = '';
      }

      function prev() {
        currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
        updateImage();
        resetTransform();
      }

      function next() {
        currentIndex = (currentIndex + 1) % imgs.length;
        updateImage();
        resetTransform();
      }

      function resetTransform() {
        scale = 1; translateX = 0; translateY = 0;
        applyTransform();
      }

      function applyTransform() {
        if (!modalImg) return;
        modalImg.style.transform = \\\`translate(\\\${translateX}px, \\\${translateY}px) scale(\\\${scale})\\\`;
        modalImg.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
      }

      function onKey(e) {
        if (!overlay || overlay.style.display === 'none') return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowLeft' && imgs.length > 1) prev();
        else if (e.key === 'ArrowRight' && imgs.length > 1) next();
      }

      function onWheel(e) {
        e.preventDefault();
        const delta = -e.deltaY;
        const zoomIntensity = 0.0015;
        const newScale = clamp(scale * (1 + delta * zoomIntensity), 1, 5);
        const rect = modalImg.getBoundingClientRect();
        const cx = e.clientX - rect.left - rect.width / 2;
        const cy = e.clientY - rect.top - rect.height / 2;
        translateX += cx * (1 - newScale / scale);
        translateY += cy * (1 - newScale / scale);
        scale = newScale;
        applyTransform();
      }

      function onMouseDown(e) {
        if (scale <= 1) return;
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        originX = translateX;
        originY = translateY;
        modalImg.style.cursor = 'grabbing';
      }

      function onMouseMove(e) {
        if (!isDragging) return;
        translateX = originX + (e.clientX - dragStartX);
        translateY = originY + (e.clientY - dragStartY);
        applyTransform();
      }

      function onMouseUp() {
        if (!isDragging) return;
        isDragging = false;
        modalImg.style.cursor = 'grab';
      }

      function toggleZoom(e) {
        if (!modalImg) return;
        if (scale === 1) {
          const rect = modalImg.getBoundingClientRect();
          const cx = e.clientX - rect.left - rect.width / 2;
          const cy = e.clientY - rect.top - rect.height / 2;
          scale = 2;
          translateX -= cx;
          translateY -= cy;
        } else {
          scale = 1; translateX = 0; translateY = 0;
        }
        applyTransform();
      }

      function onTouchStart(e) {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          touchMoved = false;
        } else if (e.touches.length === 2) {
          const t1 = e.touches[0], t2 = e.touches[1];
          pinchLastDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY) || 0;
        }
      }

      function onTouchMove(e) {
        if (e.touches.length === 1) {
          const dx = e.touches[0].clientX - touchStartX;
          const dy = e.touches[0].clientY - touchStartY;
          if (scale > 1) {
            e.preventDefault();
            translateX += dx * 0.5;
            translateY += dy * 0.5;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            applyTransform();
          } else {
            if (Math.abs(dx) > 10) touchMoved = true;
          }
        } else if (e.touches.length === 2) {
          e.preventDefault();
          const t1 = e.touches[0], t2 = e.touches[1];
          const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY) || 0;
          if (pinchLastDist === 0) { pinchLastDist = dist; return; }
          const ratio = dist / (pinchLastDist || dist);
          const newScale = clamp(scale * ratio, 1, 5);
          const rect = modalImg.getBoundingClientRect();
          const midX = (t1.clientX + t2.clientX) / 2;
          const midY = (t1.clientY + t2.clientY) / 2;
          const cx = midX - rect.left - rect.width / 2;
          const cy = midY - rect.top - rect.height / 2;
          translateX += cx * (1 - newScale / scale);
          translateY += cy * (1 - newScale / scale);
          scale = newScale;
          pinchLastDist = dist;
          touchMoved = true;
          applyTransform();
        }
      }

      function onTouchEnd(e) {
        const now = Date.now();
        const endX = (e.changedTouches && e.changedTouches[0].clientX) || touchStartX;
        const endY = (e.changedTouches && e.changedTouches[0].clientY) || touchStartY;
        pinchLastDist = 0;
        // 双击触摸缩放（移动端）
        if (Math.abs(endX - touchStartX) < 10 && Math.abs(endY - touchStartY) < 10) {
          if (now - lastTap < 300) {
            lastDbl = now; // 抑制 overlay 点击切换
            // 构造一个类似鼠标事件的对象传给 toggleZoom
            toggleZoom({ clientX: endX, clientY: endY });
            lastTap = 0;
            return;
          }
          lastTap = now;
          lastTapX = endX; lastTapY = endY;
        }

        // 单击（轻触）图片左右半屏切换（仅缩放为 1 且没有滑动时）
        if (scale === 1 && !touchMoved) {
          const rect = modalImg.getBoundingClientRect();
          const x = endX - rect.left;
          if (imgs.length > 1) {
            if (x < rect.width / 2) prev(); else next();
            return;
          }
        }

        if (scale === 1 && touchMoved) {
          const diff = endX - touchStartX;
          if (Math.abs(diff) > 40) {
            if (diff > 0) prev(); else next();
          }
        }
      }

      function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
    })();
  </script> </div>`])), maybeRenderHead(), addAttribute({ "view-transition-name": `post-${post.id}` }, "style"), addAttribute(`${SITE_URL}posts/${post.id}`, "href"), addAttribute(post.datetime, "title"), addAttribute(post.datetime, "datetime"), addAttribute(timeago, "title"), timeago, post.content.length > 0 && renderTemplate`<div${addAttribute(`text-box content`, "class")}>${unescapeHTML(post.content)}</div>`, post.tags.length > 0 && renderTemplate`<div class="tag-box"${addAttribute(post.content.length === 0 ? "padding-top: 30px;" : "", "style")}> <div class="tag-icon"></div> ${post.tags.map((tag) => renderTemplate`<a${addAttribute(`/search/%23${tag}`, "href")}${addAttribute(tag, "title")} class="tag"> ${tag} </a>`)} </div>`, COMMENTS && isItem && renderTemplate(_a || (_a = __template(['<div class="comments"> <script async src="https://telegram.org/js/telegram-widget.js"', ' data-comments-limit="50" data-colorful="1" data-color="454545"></script> </div>'])), addAttribute(`${channel}/${post.id}`, "data-telegram-discussion")));
}, "/www/wwwroot/baoxiao.fun/app/src/components/item.astro", void 0);

const $$Astro = createAstro();
const $$List = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$List;
  const { channel, currentPage = 1, hasNext = false, isItem = false } = Astro2.props;
  const posts = channel.posts ?? [];
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "channel": channel, "id": "main-container" }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["header"], renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "channel": channel })} `)} ${maybeRenderHead()}<div class="items"> ${posts.map((post) => renderTemplate`${renderComponent($$result2, "Item", $$Item, { "post": post, "isItem": isItem })}`)} </div> <nav class="pages-container" aria-label="分页导航"> ${currentPage > 1 ? renderTemplate`<a${addAttribute(currentPage === 2 ? "/" : `/page/${currentPage - 1}`, "href")} title="上一页" class="page" rel="prev">
上一页
</a>` : renderTemplate`<span class="page-placeholder" aria-hidden="true">&nbsp;</span>`} <div class="pages-info" role="status">第 ${currentPage} 页</div> ${hasNext ? renderTemplate`<a${addAttribute(`/page/${currentPage + 1}`, "href")} title="下一页" class="page" rel="next">
下一页
</a>` : renderTemplate`<span class="page-placeholder" aria-hidden="true">&nbsp;</span>`} </nav> ` })}`;
}, "/www/wwwroot/baoxiao.fun/app/src/components/list.astro", void 0);

export { $$List as $ };
