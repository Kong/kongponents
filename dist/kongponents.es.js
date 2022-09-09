var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { defineComponent, reactive, ref, computed, watch, nextTick, onMounted, openBlock, createElementBlock, mergeProps, renderSlot, createElementVNode, normalizeClass, resolveComponent, createBlock, createCommentVNode, resolveDynamicComponent, withCtx, withModifiers, createVNode, createTextVNode, toDisplayString, withKeys, normalizeStyle, Fragment, renderList, h, getCurrentInstance, onUnmounted, toRefs, watchEffect, withDirectives, vShow, Transition, pushScopeId, popScopeId, vModelText, onBeforeUnmount, toHandlers, TransitionGroup, createApp } from "vue";
var index$4 = defineComponent({
  name: "KClipboardProvider",
  setup(props, { slots }) {
    const copyTextToClipboard = async (text) => {
      let isSuccess = true;
      const textArea = document.createElement("textarea");
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.width = "2em";
      textArea.style.height = "2em";
      textArea.style.padding = "0";
      textArea.style.border = "none";
      textArea.style.outline = "none";
      textArea.style.boxShadow = "none";
      textArea.style.background = "transparent";
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(textArea.value);
        } else {
          document.execCommand("copy");
        }
      } catch (e) {
        isSuccess = false;
      } finally {
        document.body.removeChild(textArea);
      }
      return isSuccess;
    };
    return () => (slots == null ? void 0 : slots.default) && slots.default({
      copyToClipboard: copyTextToClipboard
    });
  }
});
var index$3 = defineComponent({
  name: "KComponent",
  props: {
    data: {
      type: Object,
      default: {},
      required: true
    }
  },
  setup(props, { slots }) {
    const slotData = reactive(props.data);
    return () => (slots == null ? void 0 : slots.default) && slots.default({
      data: slotData
    });
  }
});
var KToggle = defineComponent({
  name: "KToggle",
  props: {
    toggled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["toggled"],
  setup(props, { slots, emit }) {
    const isToggled = ref(props.toggled);
    const toggle = () => {
      isToggled.value = !isToggled.value;
      emit("toggled", isToggled.value);
    };
    try {
      if (!slots.default) {
        throw new Error("KToggle expects slot content");
      }
      return () => (slots == null ? void 0 : slots.default) && slots.default({
        isToggled,
        toggle
      });
    } catch (_) {
      console.error(`KToggle expects to have slot content.

  Example usage:

    <KToggle>
      <button v-slot:default="{isToggled, toggle}" @click="toggle">
        {{ isToggled ? 'hello' : 'goodbye' }}
      </button>
      ^^------add slotted content
    </KToggle>
  `);
      return () => null;
    }
  }
});
var icnArrowDown = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 17">\n    <title>Down</title>\n    <path fill="#A3BBCC" fill-rule="evenodd" d="M11.2 11c.5-.6.3-1-.4-1H9.4V4a1.3 1.3 0 1 0-2.6 0v6H5.2c-.7 0-.9.4-.4 1l2.4 2.8a1 1 0 0 0 1.7 0l2.3-2.8Z" clip-rule="evenodd"/>\n</svg>';
var icnArrowLeft = '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Back</title>\n  <path d="M12.17 8.75H3M6.75 5 3 8.75l3.75 3.75" fill="none" stroke="#A3BBCC" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>\n';
var icnArrowRight = '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Forward</title>\n  <path d="M3 8.75h9.17M8.42 5l3.75 3.75-3.75 3.75" fill="none" stroke="#A3BBCC" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>\n';
var icnBack = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="8" viewBox="0 0 16 8">\n  <title>Back</title>\n  <path fill="#A3BBCC" fill-rule="evenodd" d="M16 5H5v3L0 4l3.371-2.697L5 0v3h11z"/>\n</svg>\n';
var icnBook = '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <path d="M21 3.97h-7c-.27 0-.52.1-.71.29l-1.3 1.29-1.3-1.3c-.19-.19-.45-.3-.71-.3h-7c-.552 0-1 .44-1 1v13c0 .55.44 1 1 1h6.58l1.7 1.7c.19.19.45.29.7.29.25 0 .51-.1.7-.3l1.7-1.71h6.58c.55 0 1-.45 1-1v-13c0-.56-.45-1-1-1l.06.04Zm-11 13H4v-11h5.586l1.41 1.41v10.171l-.3-.3c-.19-.19-.45-.3-.71-.3l.014.02Zm10 0h-6c-.27 0-.52.1-.71.29l-.3.29V7.37l1.41-1.42h5.586v11l.014.02Z" fill="#A3BBCC"/>\n</svg>';
var icnBrain = '<svg width="32" height="32" viewBox="-2 -2 28 28" xmlns="http://www.w3.org/2000/svg">\n  <path fill="#A3BBCC" d="M11 4h2v16h-2z"/>\n  <path fill="#A3BBCC" d="M6 8h12v2H6zM2 14h20v2H2zM6 20h12v2H6z"/>\n  <path d="M12 4a2 2 0 100-4 2 2 0 000 4z" stroke="#A3BBCC" stroke-width="2" fill="none" />\n  <path d="M0,14.75a1.5,1.5 0 1,0 3,0a1.5,1.5 0 1,0 -3,0" stroke="#A3BBCC" stroke-width="2" fill="none" />\n  <path d="M21,14.75a1.5,1.5 0 1,0 3,0a1.5,1.5 0 1,0 -3,0" stroke="#A3BBCC" stroke-width="2" fill="none" />\n  <path d="M5.25 10.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.75 10.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM5.25 22.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.75 22.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" stroke="#A3BBCC" stroke-width="2" fill="none" />\n</svg>\n';
var icnCheck = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <path d="m14 7-6 6-3-3" fill="none" stroke="#A3BBCC" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>\n';
var icnChevronDown = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Expand</title>\n  <path d="m4.6 7 5.2 5L15 7" fill="none" stroke="#A3BBCC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>\n';
var icnChevronLeft = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Back</title>\n  <path d="m12.3 14.7-5-5.2 5-5.2" fill="none" stroke="#A3BBCC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>\n';
var icnChevronRight = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Forward</title>\n  <path d="m7.3 14.7 5-5.2-5-5.2" fill="none" stroke="#A3BBCC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>\n';
var icnChevronUp = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Collapse</title>\n  <path d="M15 12 9.8 7l-5.2 5" fill="none" stroke="#A3BBCC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>\n';
var icnClear = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Clear</title>\n  <circle cx="10" cy="10" r="6.25" fill="none" stroke="#A3BBCC" stroke-width="2" stroke-linecap="round"/>\n  <path d="M12 12 8 8M12 8l-4 4" stroke="#A3BBCC" stroke-width="2" stroke-linecap="round"/>\n</svg>\n';
var icnClipboard = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">\n  <title>Copy to Clipboard</title>\n  <path fill="#A3BBCC" d="M25.313 26.688v-21.375h-2.625v4h-13.375v-4h-2.625v21.375h18.625zM16 2.688c-0.75 0-1.313 0.563-1.313 1.313s0.563 1.313 1.313 1.313 1.313-0.563 1.313-1.313-0.563-1.313-1.313-1.313zM25.313 2.688c1.438 0 2.688 1.188 2.688 2.625v21.375c0 1.438-1.25 2.625-2.688 2.625h-18.625c-1.438 0-2.688-1.188-2.688-2.625v-21.375c0-1.438 1.25-2.625 2.688-2.625h5.563c0.563-1.563 2-2.688 3.75-2.688s3.188 1.125 3.75 2.688h5.563z"></path>\n</svg>\n';
var icnClose = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Close</title>\n  <path d="M16 4 3 17m13 0L3 4" stroke="#A3BBCC" stroke-width="2" stroke-linecap="round"/>\n</svg>\n';
var icnCogwheel = '<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Settings</title>\n  <path d="m18.417 4.27-2.695-2.694c-.404.223-.821.452-1.239.68-.445.243-.883.492-1.32.735-.169.094-.337.027-.398-.155-.27-.903-.545-1.805-.815-2.701-.013-.047-.027-.095-.047-.135h-3.82a239.015 239.015 0 0 0-.774 2.83c-.054.195-.222.269-.398.168-.815-.452-1.63-.903-2.438-1.354-.074-.04-.128-.074-.216.006-.875.863-1.758 1.718-2.64 2.574-.014.013-.02.027-.04.047.275.498.558 1.003.835 1.509.195.357.397.714.592 1.07.095.176.04.317-.148.371-.91.276-1.812.546-2.721.822A.792.792 0 0 0 0 8.09v3.82l1.819.505c.33.094.66.182.99.27.243.067.303.195.182.417-.451.808-.896 1.617-1.347 2.425-.02.04-.04.08-.054.101l2.782 2.782c.202-.114.438-.242.673-.37l1.866-1.038c.203-.114.337-.053.398.169.242.896.492 1.785.74 2.68.014.048.028.095.048.149h3.82l.404-1.34c.155-.506.303-1.011.451-1.516.06-.189.195-.25.37-.148.816.451 1.63.902 2.439 1.354.047.027.101.053.088.006.437-.404.882-.795 1.306-1.212.458-.445.89-.916 1.348-1.368.094-.094.08-.155.027-.256-.452-.808-.903-1.616-1.348-2.425-.1-.175-.027-.343.169-.397.896-.243 1.785-.492 2.68-.741.048-.014.095-.027.149-.047V8.09c-.445-.134-.89-.27-1.34-.404-.506-.155-1.011-.303-1.516-.451a.248.248 0 0 1-.148-.37c.451-.816.902-1.63 1.354-2.44.02-.06.047-.114.067-.154Zm-3.59 5.686c.013 2.64-2.109 4.77-4.777 4.796-2.68.02-4.796-2.081-4.802-4.782a4.78 4.78 0 0 1 4.782-4.803c2.62 0 4.783 2.155 4.796 4.79Z" fill="#A3BBCC"/>\n</svg>\n';
var icnCollapseExpand = '<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16">\n  <title>Go to Beginning</title>\n  <path fill="#A3BBCC" fill-rule="evenodd" d="M0 0h2v16H0V0zm16 7v2H9v3L4 8l5-4v3h7z"/>\n</svg>\n';
var icnContactSupport = '<svg width="24" height="25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 2.17H4c-1.1 0-1.99.9-1.99 2l-.01 18 4-4h14c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2Zm0 14H5.17l-.59.59-.58.58V4.17h16v12Zm-9-4h2v2h-2v-2Zm0-6h2v4h-2v-4Z" fill="#A3BBCC"/></svg>';
var icnConnections = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Connections</title>\n  <path d="M6.74 12.73V6.19H.2v6.54h6.54ZM18.2 9.2h-9v-9h9v8.99ZM14.2 17.39v-5.2H9v5.2h5.2Z" fill="#A3BBCC"/>\n</svg>\n';
var icnCopy = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32">\n  <title>Copy</title>\n  <path fill="#A3BBCC" d="M25.313 28v-18.688h-14.625v18.688h14.625zM25.313 6.688c1.438 0 2.688 1.188 2.688 2.625v18.688c0 1.438-1.25 2.688-2.688 2.688h-14.625c-1.438 0-2.688-1.25-2.688-2.688v-18.688c0-1.438 1.25-2.625 2.688-2.625h14.625zM21.313 1.313v2.688h-16v18.688h-2.625v-18.688c0-1.438 1.188-2.688 2.625-2.688h16z"></path>\n</svg>\n';
var icnDangerCircle = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">\n  <title>Danger</title>\n  <path fill="#A3BBCC" d="M0,8a8,8 0 1,0 16,0a8,8 0 1,0 -16,0" /><path id="preserveColor" d="M9 11v2H7v-2h2zm0-8v6.5H7V3h2z" fill="none"/>\n</svg>\n';
var icnDangerCircleOutline = '<svg width="16" height="16" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Danger</title>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 8a8 8 0 11-16 0 8 8 0 0116 0zm-2 0a6 6 0 11-12 0 6 6 0 0112 0zm-7-3.5A.5.5 0 018 4h1a.5.5 0 01.5.5v4A.5.5 0 019 9H8a.5.5 0 01-.5-.5v-4zM8 10a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1A.5.5 0 009 10H8z" fill="#A3BBCC"/>\n</svg>\n';
var icnDashboard = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21">\n  <title>Dashboard</title>\n  <path fill="#A3BBCC" fill-rule="nonzero" d="M13 10l3-3c.6902336-.73713266 1.4429032-1.26058218 2-1 .2605822.55709682-.2628673 1.30976636-1 2l-3 3c.1531248.4707586.1875961.6844547 0 1 .1875961 1.0625747-.7498292 2-2 2-1.0625747 0-2-.9374253-2-2 0-1.2501708.9374253-2.1875961 2-2 .3155453-.1875961.5292414-.1531248 1 0zm8 10c-.08276.0634515-.7131836.1223062-1 0-.5634515-.58276-.6223062-1.2131836 0-2 1.1963422-1.4063656 2-3.6213758 2-6 0-5.5228475-4.4771525-10-10-10S2 6.4771525 2 12c0 2.3848064.80099865 4.5939865 2 6 .62209487.7857069.56386353 1.4161884 0 2-.28570688.1220949-.91618845.0638635-1 0-2.03512593-2.4863139-3-5.1474677-3-8C0 5.372583 5.372583 0 12 0s12 5.372583 12 12c0 2.8461786-.967377 5.5124254-3 8zM9 16h6c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1H9c-.55228475 0-1-.4477153-1-1s.44771525-1 1-1z"/>\n</svg>\n';
var icnDecrease = '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Decrease</title>\n  <path d="M8.001 13.197 4 2.804h8L8.001 13.197Z" fill="#A3BBCC"/>\n</svg>\n';
var icnDevPortal = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Dev Portal</title>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 2h5.61L18 4.73V15.61L15.27 18H4.39L2 15.27V4.39L4.73 2H10Zm3.56 8a3.56 3.56 0 1 1-7.11 0 3.56 3.56 0 0 1 7.1 0Z" fill="#A3BBCC"/>\n</svg>\n';
var icnDisabled = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Close</title>\n  <path d="m13.5 6.5-7 7M13.5 13.5l-7-7" stroke="#A3BBCC" stroke-width="2" stroke-linecap="round"/>\n</svg>\n';
var icnDocument = '<svg width="32" height="32" viewBox="-5 -4 32 32" xmlns="http://www.w3.org/2000/svg">\n  <title>Document</title>\n  <path d="M2 24h18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2zm0-2V2h18v20H2zm3-7h12v-2H5v2zm0-4h5V9H5v2zm7 0h5V9h-5v2zM5 7h12V5H5v2zm0 12h5v-2H5v2zm7 0h5v-2h-5v2z" fill="#A3BBCC" fill-rule="evenodd"/>\n</svg>\n';
var icnDrag = '<svg viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Drag</title>\n  <path fill="#A3BBCC" d="M5 2h2v2H5zM5 6.5h2v2H5zM5 11h2v2H5zM9 2h2v2H9zM9 6.5h2v2H9zM9 11h2v2H9z"/>\n</svg>\n';
var icnErrorFilled = '<svg width="16" height="16" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Error</title>\n  <circle cx="8" cy="8" r="8" fill="#A3BBCC" />\n  <rect type="secondary" x="10.829" y="3.757" width="2" height="10" rx="1" transform="rotate(45 10.829 3.757)" fill="#fff" />\n  <rect type="secondary" x="12.243" y="10.828" width="2" height="10" rx="1" transform="rotate(135 12.243 10.828)" fill="#fff" />\n</svg>\n';
var icnExpand = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Expand</title>\n  <path d="M12 5h3v3M11.5 8.5 15 5M8 15H5v-3M8.5 11.5 5 15" stroke="#A3BBCC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>\n';
var icnExternalLink = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">\n  <title>External Link</title>\n  <path fill="#A3BBCC" fill-rule="evenodd" d="M8.24308 1.5C7.83269 1.5 7.5 1.16710138 7.5.75c0-.41421356.33823-.75.74308-.75h3.00568C11.6666 0 12 .336341 12 .75123866v3.00567786C12 4.1673102 11.6671 4.5 11.25 4.5c-.41421 0-.75-.3382314-.75-.74308348V2.625L6.53246 6.59254c-.28982.2898217-.76955.2953689-1.06202.0029022l-.06588-.0658844c-.29098-.2909742-.29117-.7679483.0029-1.0620178L9.375 1.5H8.24308zm-6.74753 0C.67089 1.5 0 2.1695784 0 2.99554521v7.50890959C0 11.3291147.66958 12 1.49555 12h7.5089C9.82911 12 10.5 11.3304216 10.5 10.5044548V6.75H9v3.75H1.5V3h3.75V1.5H1.49555z"/>\n</svg>\n';
var icnFeatureRequest = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14">\n  <path fill="#A3BBCC" fill-rule="nonzero" d="M7 11l-3 3v-3H2c-1.1045695 0-2-.895431-2-2V2C0 .895431.8954305 0 2 0h12c1.1045695 0 2 .895431 2 2v7c0 1.104569-.8954305 2-2 2H7zM2 2v7h12V2H2z"/>\n</svg>\n';
var icnFileEmpty = '<svg width="44" height="56" viewBox="0 0 44 56" xmlns="http://www.w3.org/2000/svg">\n  <title>File</title>\n  <path fill="#A3BBCC" fill-rule="evenodd" clip-rule="evenodd" d="M2 0C.895431 0 0 .89543 0 2v52c0 1.1046.895431 2 2 2h40c1.1046 0 2-.8954 2-2V4l-4-4H2zm37 1H1v54h42V5h-4V1z"/>\n</svg>\n';
var icnFileJson = '<svg width="44" height="56" viewBox="0 0 44 56" xmlns="http://www.w3.org/2000/svg">\n  <title>JSON File</title>\n  <path fill="#A3BBCC" fill-rule="evenodd" clip-rule="evenodd" d="M2 0C.895431 0 0 .89543 0 2v52c0 1.1046.895431 2 2 2h40c1.1046 0 2-.8954 2-2V4l-4-4H2zm37 1H1v54h42V5h-4V1z"/>\n  <path fill="#A3BBCC" d="M10.0156 43.3369c0-.2187.0638-.401.1914-.5469.1322-.1458.3282-.2187.5879-.2187.2598 0 .4558.0729.5879.2187.1367.1459.2051.3282.2051.5469 0 .2096-.0684.3851-.2051.5264-.1321.1413-.3281.2119-.5879.2119-.2597 0-.4557-.0706-.5879-.2119-.1276-.1413-.1914-.3168-.1914-.5264zm4.9698-6.7334v8.251c0 1.4219-.6449 2.1328-1.9346 2.1328-.278 0-.5355-.041-.7725-.123v-1.0118c.1459.0365.3373.0547.5742.0547.2826 0 .4968-.0774.6426-.2324.1504-.1504.2256-.4147.2256-.793v-8.2783h1.2647zm-1.3946-1.9619c0-.2005.0615-.3714.1846-.5127.1276-.1458.3122-.2187.5537-.2187.2461 0 .4329.0706.5605.2119.1277.1412.1915.3144.1915.5195 0 .2051-.0638.376-.1915.5127-.1276.1367-.3144.2051-.5605.2051-.2461 0-.4307-.0684-.5537-.2051-.1231-.1367-.1846-.3076-.1846-.5127zm7.7451 7.3965c0-.3418-.1298-.6061-.3896-.793-.2552-.1914-.7041-.3555-1.3467-.4922-.638-.1367-1.1461-.3008-1.5244-.4922-.3737-.1914-.6517-.4192-.834-.6836-.1777-.2643-.2666-.5787-.2666-.9433 0-.6061.2552-1.1188.7656-1.5381.515-.4193 1.1713-.6289 1.9688-.6289.8385 0 1.5176.2165 2.0371.6494.5241.433.7861.9867.7861 1.6611h-1.2715c0-.3463-.1481-.6448-.4443-.8955-.2917-.2506-.6608-.3759-1.1074-.3759-.4603 0-.8203.1002-1.0801.3007-.2598.2006-.3896.4626-.3896.7862 0 .3053.1207.5355.3623.6904.2415.155.6767.3031 1.3056.4443.6335.1413 1.1462.3099 1.5381.5059.3919.196.6813.4329.8682.7109.1914.2735.2871.6084.2871 1.0049 0 .6608-.2643 1.1918-.793 1.5928-.5286.3965-1.2145.5947-2.0576.5947-.5924 0-1.1165-.1048-1.5723-.3144-.4557-.2097-.8134-.5013-1.0732-.875-.2552-.3783-.3828-.7862-.3828-1.2237h1.2646c.0228.4239.1914.7611.5059 1.0118.319.246.7383.3691 1.2578.3691.4785 0 .8613-.0957 1.1484-.2871.2917-.196.4375-.4557.4375-.7793zm2.5772-1.8047c0-.7246.1413-1.3763.4238-1.9551.2871-.5788.6836-1.0254 1.1895-1.3398.5104-.3145 1.0914-.4717 1.7431-.4717 1.0072 0 1.8207.3486 2.4405 1.0459.6243.6973.9365 1.6247.9365 2.7822v.0889c0 .72-.139 1.3672-.417 1.9414-.2734.5697-.6677 1.014-1.1826 1.333-.5104.319-1.0983.4785-1.7637.4785-1.0026 0-1.8161-.3486-2.4404-1.0459-.6198-.6972-.9297-1.6201-.9297-2.7685v-.0889zm1.2715.1504c0 .8203.1891 1.4788.5674 1.9756.3828.4967.8932.7451 1.5312.7451.6426 0 1.153-.2507 1.5313-.752.3782-.5058.5673-1.2122.5673-2.1191 0-.8112-.1936-1.4674-.581-1.9688-.3828-.5058-.8932-.7587-1.5313-.7587-.6243 0-1.1279.2483-1.5107.7451-.3828.4967-.5742 1.2077-.5742 2.1328zm8.2441-3.7803l.041.9297c.5651-.7109 1.3034-1.0664 2.2149-1.0664 1.5631 0 2.3515.8818 2.3652 2.6455V44h-1.2646v-4.8945c-.0046-.5332-.1276-.9274-.3692-1.1826-.237-.2553-.6084-.3829-1.1142-.3829-.4102 0-.7702.1094-1.0801.3282-.3099.2187-.5515.5058-.7246.8613V44h-1.2647v-7.3965h1.1963z" />\n</svg>\n';
var icnFileMd = '<svg width="44" height="56" viewBox="0 0 44 56" xmlns="http://www.w3.org/2000/svg">\n  <title>Markdown File</title>\n  <path fill="#A3BBCC" fill-rule="evenodd" clip-rule="evenodd" d="M2 0C.895431 0 0 .89543 0 2v52c0 1.1046.895431 2 2 2h40c1.1046 0 2-.8954 2-2V4l-4-4H2zm37 1H1v54h42V5h-4V1z" />\n  <path fill="#A3BBCC" d="M16.1133 43.3369c0-.2187.0638-.401.1914-.5469.1321-.1458.3281-.2187.5879-.2187.2597 0 .4557.0729.5879.2187.1367.1459.205.3282.205.5469 0 .2096-.0683.3851-.205.5264-.1322.1413-.3282.2119-.5879.2119-.2598 0-.4558-.0706-.5879-.2119-.1276-.1413-.1914-.3168-.1914-.5264zm4.8535-6.7334l.0342.8203c.5423-.638 1.2737-.957 2.1943-.957 1.0345 0 1.7386.3965 2.1123 1.1894.2461-.3554.5651-.6425.957-.8613.3965-.2187.8637-.3281 1.4014-.3281 1.6224 0 2.4473.859 2.4746 2.5771V44H28.876v-4.8809c0-.5286-.1208-.9228-.3623-1.1826-.2416-.2643-.6472-.3965-1.2168-.3965-.4694 0-.8591.1413-1.169.4239-.3099.278-.4899.6539-.54 1.1279V44h-1.2715v-4.8467c0-1.0755-.5264-1.6133-1.5791-1.6133-.8294 0-1.3968.3532-1.7021 1.0596V44h-1.2647v-7.3965h1.1963zm10.7803 3.6367c0-1.1347.2689-2.0462.8066-2.7343.5378-.6927 1.2419-1.0391 2.1123-1.0391.8659 0 1.5518.2962 2.0576.8887V33.5h1.2647V44h-1.1621l-.0616-.793c-.5058.6198-1.2099.9297-2.1123.9297-.8567 0-1.5563-.3509-2.0986-1.0527-.5377-.7018-.8066-1.6179-.8066-2.7481v-.0957zm1.2646.1436c0 .8385.1732 1.4948.5195 1.9687.3464.474.8249.711 1.4356.711.8021 0 1.3877-.36 1.7568-1.0801v-3.3975c-.3782-.6972-.9593-1.0459-1.7431-1.0459-.6198 0-1.1029.2393-1.4493.7178-.3463.4785-.5195 1.1872-.5195 2.126z" />\n</svg>\n';
var icnFileYaml = '<svg width="44" height="56" viewBox="0 0 44 56" xmlns="http://www.w3.org/2000/svg">\n  <title>YAML File</title>\n  <path fill="#A3BBCC" fill-rule="evenodd" clip-rule="evenodd" d="M2 0C.895431 0 0 .89543 0 2v52c0 1.1046.895431 2 2 2h40c1.1046 0 2-.8954 2-2V4l-4-4H2zm37 1H1v54h42V5h-4V1z" />\n  <path fill="#A3BBCC" d="M6.47461 43.3369c0-.2187.0638-.401.19141-.5469.13216-.1458.32812-.2187.58789-.2187.25976 0 .45573.0729.58789.2187.13672.1459.20508.3282.20508.5469 0 .2096-.06836.3851-.20508.5264-.13216.1413-.32813.2119-.58789.2119-.25977 0-.45573-.0706-.58789-.2119-.12761-.1413-.19141-.3168-.19141-.5264zm6.08399-1.1894l1.7226-5.544h1.3536l-2.9737 8.5381c-.4603 1.2305-1.1917 1.8457-2.1943 1.8457l-.2393-.0205-.47164-.0889v-1.0254l.34184.0274c.4283 0 .761-.0866.998-.2598.2415-.1732.4398-.4899.5947-.9502l.2803-.7519-2.63867-7.3145h1.38087l1.8457 5.544zM21.2266 44c-.073-.1458-.1322-.4056-.1778-.7793-.5879.6107-1.2897.916-2.1054.916-.7292 0-1.3285-.2051-1.7979-.6152-.4648-.4147-.6973-.9388-.6973-1.5723 0-.7702.2917-1.3672.875-1.791.5879-.4284 1.4128-.6426 2.4747-.6426h1.2304v-.581c0-.4421-.1321-.793-.3965-1.0528-.2643-.2643-.6539-.3964-1.1689-.3964-.4512 0-.8294.1139-1.1348.3417-.3053.2279-.458.5036-.458.8272h-1.2715c0-.3691.1299-.7246.3897-1.0664.2643-.3464.6198-.6198 1.0664-.8203.4512-.2005.9456-.3008 1.4834-.3008.8522 0 1.5198.2142 2.0029.6426.4831.4238.7337 1.0094.752 1.7568v3.4043c0 .679.0866 1.2191.2597 1.6201V44h-1.3261zm-2.0987-.9639c.3965 0 .7725-.1025 1.128-.3076.3554-.2051.6129-.4717.7724-.7998v-1.5176h-.9912c-1.5495 0-2.3242.4535-2.3242 1.3604 0 .3965.1322.7064.3965.9297.2643.2233.6038.3349 1.0185.3349zm6.3369-6.4326l.0342.8203c.5423-.638 1.2738-.957 2.1944-.957 1.0345 0 1.7386.3965 2.1123 1.1894.2461-.3554.5651-.6425.957-.8613.3965-.2187.8636-.3281 1.4014-.3281 1.6224 0 2.4472.859 2.4746 2.5771V44H33.374v-4.8809c0-.5286-.1207-.9228-.3623-1.1826-.2415-.2643-.6471-.3965-1.2168-.3965-.4694 0-.859.1413-1.1689.4239-.3099.278-.4899.6539-.5401 1.1279V44h-1.2714v-4.8467c0-1.0755-.5264-1.6133-1.5791-1.6133-.8295 0-1.3969.3532-1.7022 1.0596V44h-1.2646v-7.3965h1.1962zM37.9268 44h-1.2647V33.5h1.2647V44z" />\n</svg>\n';
var icnFilter = '<svg width="14" height="11" viewBox="0 0 14 11" xmlns="http://www.w3.org/2000/svg">\n  <title>Filter</title>\n  <path d="M8 9v2H6V9h2zm2-3v2H4V6h6zm2-3v2H2V3h10zm2-3v2H0V0h14z" fill="#A3BBCC" fill-rule="evenodd"/>\n</svg>\n';
var icnForward = '<svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Forward</title>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5H11V8L16 4L12.629 1.303L11 0V3H0V5Z" fill="#A3BBCC"/>\n</svg>\n';
var icnGateway = '<svg viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Gateway</title>\n  <path d="m13.91 7.84-2.1-1.38c-.16-.1-.36-.01-.36.15v.74H10.1v-1.8C10.1 4.7 9.29 4 8.28 4H5.75c-1 0-1.82.69-1.82 1.55v1.8h-1.7c-.13 0-.23.09-.23.2v.9c0 .11.1.2.23.2h1.73v1.8c0 .85.8 1.55 1.82 1.55H8.3c1 0 1.82-.69 1.82-1.55V8.64h1.34v.74c0 .16.22.25.36.15l2.1-1.39c.1-.07.1-.22 0-.3Zm-4.85 2.6c0 .37-.34.66-.77.66H5.76c-.42 0-.77-.3-.77-.66v-1.8h3.06V7.35H5v-1.8c0-.37.35-.66.77-.66H8.3c.43 0 .77.3.77.66v4.9Z" fill="#A3BBCC"/>\n</svg>\n';
var icnGear = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">\n  <title>Settings</title>\n  <path fill="#A3BBCC" fill-rule="evenodd" d="M11.4765344 3.1092521l1.4732131-1.4732131 1.4142135 1.4142135-1.4732131 1.4732131c.514815.7229326.8733467 1.5648778 1.0262937 2.4765344H16v2h-2.0829584c-.152947.9116566-.5114787 1.7536018-1.0262937 2.4765344l1.4732131 1.4732131-1.4142135 1.4142135-1.4732131-1.4732131c-.7229326.514815-1.5648778.8733467-2.4765344 1.0262937V16H7v-2.0829584c-.9116566-.152947-1.7536018-.5114787-2.4765344-1.0262937L3.0502525 14.363961 1.636039 12.9497475l1.4732131-1.4732131C2.5944371 10.7536018 2.2359054 9.9116566 2.0829584 9H0V7h2.0829584c.152947-.9116566.5114787-1.7536018 1.0262937-2.4765344L1.636039 3.0502525 3.0502525 1.636039l1.4732131 1.4732131C5.2463982 2.5944371 6.0883434 2.2359054 7 2.0829584V0h2v2.0829584c.9116566.152947 1.7536018.5114787 2.4765344 1.0262937zM8 12c2.209139 0 4-1.790861 4-4s-1.790861-4-4-4-4 1.790861-4 4 1.790861 4 4 4z"/>\n</svg>\n';
var icnGearFilled = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">\n  <title>Settings</title>\n  <path d="M8.63962039 0c.2152152 0 .40628463.13771505.47434165.34188612l.63997656 1.91853291c.3708976.11319954.7265407.26136452 1.0630881.4406537l1.8103874-.9038671c.1924944-.09624716.4249801-.05851992.5771602.09366021l.9045599.90455983c.1521801.15218013.1899073.38466585.0936602.57716018l-.904073 1.81000104c.1795192.33691975.3278441.69298066.44112 1.06432821l1.9182725.63912286C15.862285 6.95409498 16 7.14516441 16 7.36037961v1.27924078c0 .2152152-.137715.40628463-.3418861.47434165l-1.918532.63997355c-.1132072.37092351-.2613848.72659041-.4406907 1.06315871l.9039032 1.8103198c.0962471.1924944.0585199.4249801-.0936602.5771602l-.9045599.9045599c-.1521801.1521801-.3846658.1899073-.5771602.0936602l-1.8103171-.9039046c-.3365681.179306-.692235.3274837-1.0631584.4406912l-.63997656 1.9185329C9.04590502 15.862285 8.85483559 16 8.63962039 16H7.36037961c-.2152152 0-.40628463-.137715-.47434165-.3418861L6.2460614 13.739581c-.3708976-.1131996-.72654071-.2613646-1.06308807-.4406537l-1.81038748.9038671c-.19249433.0962471-.42498005.0585199-.57716018-.0936602l-.90455983-.9045599c-.15218013-.1521801-.18990737-.3846658-.09366021-.5771602l.90407299-1.810001c-.17951921-.3369197-.32784407-.6929806-.44112007-1.0643282L.34188612 9.11396204C.13771505 9.04590502 0 8.85483559 0 8.63962039V7.36037961c0-.2152152.13771505-.40628463.34188612-.47434165l1.918532-.63997355c.11320723-.37092352.26138479-.72659044.44069063-1.06315869l-.90390312-1.81031987c-.09624716-.19249433-.05851992-.42498005.09366021-.57716018l.90455983-.90455983c.15218013-.15218013.38466585-.18990737.57716018-.09366021l1.81031714.90390458c.33656815-.17930601.69223497-.32748375 1.06315841-.44069118L6.88603796.34188612C6.95409498.13771505 7.14516441 0 7.36037961 0h1.27924078zM8 6c-1.1045695 0-2 .8954305-2 2s.8954305 2 2 2 2-.8954305 2-2-.8954305-2-2-2z" fill="#A3BBCC" fill-rule="evenodd" />\n</svg>\n';
var icnGrid = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Grid View</title>\n  <path fill="#A3BBCC" d="M4.55 4h4.36v4.36H4.55zM11.09 4h4.36v4.36h-4.36zM4.55 10.54h4.36v4.36H4.55zM11.09 10.54h4.36v4.36h-4.36z"/>\n</svg>\n';
var icnHelp = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Help</title>\n  <path d="M12 2a10.01 10.01 0 0 1 0 20 10 10 0 0 1 0-20Zm-.18 12h.79c.23 0 .35-.1.4-.32.05-.21.1-.42.18-.62.15-.32.43-.5.72-.68 1.18-.74 1.87-1.75 1.7-3.2-.12-.91-.55-1.61-1.32-2.1a4.98 4.98 0 0 0-3.91-.3c-1.07.4-1.72 1.13-1.8 2.31-.01.21.1.37.32.38.52.01 1.04.03 1.57.03.25 0 .42-.14.5-.38.14-.51.51-.72 1.01-.77.57-.04 1.08.3 1.2.8.2.75.03 1.42-.56 1.94-.35.31-.73.58-1.1.87-.49.4-.83.9-.87 1.56-.02.31.1.48.42.48h.75Zm-.02 1.56h-.67c-.3 0-.52.22-.52.53v.8c0 .35.22.57.56.57h1.27c.32 0 .53-.2.55-.53a8.8 8.8 0 0 0 0-.85c-.02-.33-.23-.52-.57-.53h-.62Z" fill="#A3BBCC"/>\n</svg>\n';
var icnImmunity = '<svg width="32" height="32" viewBox="-2 -2 28 28" xmlns="http://www.w3.org/2000/svg">\n  <title>Immunity</title>\n  <path transform="rotate(-45 11.7 12)" d="M7.710000000000001,12a4,12 0 1,0 8,0a4,12 0 1,0 -8,0" stroke="#A3BBCC" stroke-width="2" fill="none"/>\n  <path d="M3 5.3a2 2 0 100-4 2 2 0 000 4z" stroke="#A3BBCC" stroke-width="2" fill="none"/>\n  <path transform="rotate(45 11.7 12)" d="M7.710000000000001,12a4,12 0 1,0 8,0a4,12 0 1,0 -8,0" stroke="#A3BBCC" stroke-width="2" fill="none"/>\n  <path d="M21 5.3a2 2 0 100-4 2 2 0 000 4zM21 22.3a2 2 0 100-4 2 2 0 000 4zM3 22.3a2 2 0 100-4 2 2 0 000 4z" stroke="#A3BBCC" stroke-width="2" fill="none"/>\n</svg>\n';
var icnIncrease = '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Increase</title>\n  <path d="m8 2.804 4 10.393H4L8 2.804Z" fill="#A3BBCC"/>\n</svg>\n';
var icnInfo = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">\n  <title>Information</title>\n  <path fill="#A3BBCC" fill-rule="evenodd" d="M16 8c0-4.418278-3.58172-8-8-8S0 3.581722 0 8s3.58172 8 8 8 8-3.581722 8-8zm-1.5 0c0 3.5898509-2.91015 6.5-6.5 6.5S1.5 11.5898509 1.5 8 4.41015 1.5 8 1.5s6.5 2.9101491 6.5 6.5zM6 12h4v-1H9V7H6v1h1v3H6v1zm1-6.5046844C7 5.7740451 7.21404 6 7.50468 6h.99064C8.77405 6 9 5.785965 9 5.4953156v-.9906312C9 4.2259549 8.78596 4 8.49532 4h-.99064C7.22595 4 7 4.214035 7 4.5046844v.9906312z"/>\n</svg>\n';
var icnKong = '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Kong</title>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="m16.28 36.66 1-1.3h7.45l3.88 4.96-.7 1.68h-9.6l.24-1.68-2.27-3.66Z" fill="#169FCC"/>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="m18.55 19.75 3.6-6.21h4.19L45.1 35.35 43.65 42H35.6l.5-1.87-17.55-20.38Z" fill="#14B59A"/>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="m22.92 12.36 1.72-3.19L29.8 5l8.85 6.94-1.15 1.17 1.54 2.13v2.28l-4.4 3.6-7.4-8.76h-4.32Z" fill="#1BC263"/>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.25 26.23h2.33l6.1-5.1 8.08 9.4-2.28 3.41h-7.46l-5.15 6.55L9.7 42H3v-8.03l6.25-7.74Z" fill="#16BDCC"/>\n</svg>\n';
var icnLock = '<svg width="12" height="16" viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg">\n  <title>Locked</title>\n  <path d="M6 0c2.76142375 0 5 2.23857625 5 5v3h.5c.2761424 0 .5.22385763.5.5v7c0 .2761424-.2238576.5-.5.5H.5c-.27614237 0-.5-.2238576-.5-.5v-7c0-.27614237.22385763-.5.5-.5H1V5c0-2.76142375 2.23857625-5 5-5zm.5 11h-1c-.27614237 0-.5.2238576-.5.5v1c0 .2761424.22385763.5.5.5h1c.27614237 0 .5-.2238576.5-.5v-1c0-.2761424-.22385763-.5-.5-.5zM6 2C4.34314575 2 3 3.34314575 3 5v3h6V5c0-1.65685425-1.34314575-3-3-3z" fill="#A3BBCC" fill-rule="evenodd"/>\n</svg>\n';
var icnList = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>List View</title>\n  <g clip-path="url(#a)" fill="#A3BBCC">\n    <path fill="#A3BBCC" d="M4 10.97V8.72h12v2.25H4ZM4 6.75V4.5h12v2.25H4ZM16 15.2H4v-2.25h12v2.25Z"/>\n  </g>\n  <defs>\n    <clipPath id="a">\n      <path fill="none" transform="translate(4)" d="M0 0h12v18.75H0z"/>\n    </clipPath>\n  </defs>\n</svg>\n';
var icnMore = '<svg viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>More Actions</title>\n  <circle cx="8.25" cy="3.25" r="1.25" fill="#A3BBCC"/>\n  <circle cx="8.25" cy="7.75" r="1.25" fill="#A3BBCC"/>\n  <circle cx="8.25" cy="12.25" r="1.25" fill="#A3BBCC"/>\n</svg>\n';
var icnMoreHorizontal = '<svg viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">\n<title>More</title>\n  <path fill="#A3BBCC" fill-rule="evenodd" clip-rule="evenodd" d="M10.5 7.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM6 7.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm-4.5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />\n</svg>\n';
var icnNoData = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">\n  <title>No Data</title>\n  <path d="M3.1 9.1C2.5 9.1 2 8.6 2 8c0-.6.5-1.1 1.1-1.1h9.7c.7 0 1.2.5 1.2 1.1 0 .6-.5 1.1-1.1 1.1H3.1z" fill="#A3BBCC"/>\n</svg>\n';
var icnNotificationBell = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Notifications</title>\n  <path d="M8.5 19.5a3.8 3.8 0 0 0 3.5 3c1.32 0 3-.97 3.5-3h-7ZM20.42 14.8a.4.4 0 0 0-.11-.26l-1.98-1.97a.5.5 0 0 1-.17-.4v-3.1a5.95 5.95 0 0 0-3.08-5.36c-.3-.18-.63-.31-.95-.46a7.8 7.8 0 0 0-3.96 0l-.2.1c-.93.36-1.73.92-2.4 1.69a5.74 5.74 0 0 0-1.43 3.62c-.03 1.17-.01 2.35-.01 3.52a.5.5 0 0 1-.17.4L4 14.53a.48.48 0 0 0-.13.3V18H20.4l.01-.17c.02-1.01.02-2.02.01-3.03Z" fill="#A3BBCC"/>\n</svg>\n';
var icnNotificationInbox = '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Notifications</title>\n  <circle cx="16" cy="16" r="16" fill="#A3BBCC"/>\n  <path fill="#A3BBCC" d="M8 11h16.37v10.03H8z"/>\n  <path type="secondary" fill="#fff" d="M16.17 21.03h-7.3c-.45 0-.74-.21-.84-.62a.8.8 0 0 1-.03-.23v-6.36c0-.06.03-.15.08-.2l2.52-2.44c.14-.14.3-.18.49-.18h10.18c.21 0 .38.07.54.22l2.46 2.4c.07.06.1.13.1.23v6.3c0 .57-.31.89-.9.89l-7.3-.01Zm-3-7.41v.1a1.98 1.98 0 0 0 1.8 1.96c.79.06 1.6.05 2.4 0 .89-.05 1.57-.7 1.77-1.56.04-.16.05-.33.08-.5h3.49l-.03-.05-1.6-1.56a.34.34 0 0 0-.17-.05h-9.45a.35.35 0 0 0-.2.08l-1.54 1.49a.88.88 0 0 0-.08.1l3.53-.01Z"/>\n</svg>\n';
var icnOrganization = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Organization</title>\n  <path d="M16.2 10.95h-3.38l2.12 1.97v5.11l4.78.02v-4.02l-3.53-3.08ZM4.11 10.1 0 13.2v4.83h13V13.2l-3.86-3.08H4.11ZM6.48 8.22a3.14 3.14 0 1 0 0-6.27 3.14 3.14 0 0 0-3.15 3.13 3.14 3.14 0 0 0 3.15 3.14ZM13.33 9.53a2.85 2.85 0 0 0 2.86-2.85 2.85 2.85 0 0 0-2.86-2.84 2.85 2.85 0 0 0-2.85 2.84 2.85 2.85 0 0 0 2.85 2.85Z" fill="#A3BBCC"/>\n</svg>\n';
var icnPlug = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="none">\n  <path fill="#A3BBCC" d="M8 9.96997c-.39782 0-.77936.15803-1.06066.43933-.2813.2813-.43934.6628-.43934 1.0607 0 .3978.15804.7793.43934 1.0606S7.60218 12.97 8 12.97c.39782 0 .77936-.1581 1.06066-.4394.2813-.2813.43934-.6628.43934-1.0606 0-.3979-.15804-.7794-.43934-1.0607S8.39782 9.96997 8 9.96997Z"/>\n  <path fill="#A3BBCC" d="M14 3.96997h-2V.969971h-2V3.96997H6V.969971H4V3.96997H2c-1.104 0-2 .89-2 2v3C0 13.043 3.06 16.406 7 16.9v3.06h2v-3.07c3.939-.5 7-3.86 7-7.94003v-3c0-1.11-.9-2-2-2v.02Zm0 2v1H2v-1h12ZM8 14.97c-3.31 0-6-2.7-6-6.00003h12C14 12.27 11.308 14.97 8 14.97Z"/>\n</svg>';
var icnPlus = '<svg viewBox="0 0 20 20" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Add</title>\n  <rect x="8.62" y="4" width="2.77" height="12" rx="1" fill="#A3BBCC"/>\n  <rect x="16" y="8.62" width="2.77" height="12" rx="1" transform="rotate(90 16 8.62)" fill="#A3BBCC"/>\n</svg>\n';
var icnOrganizations = '<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Organization</title>\n  <path d="M16.191 10.947H12.82l2.122 1.977v5.11l4.777.018v-4.019l-3.528-3.086ZM4.11 10.107 0 13.194v4.838h12.99v-4.838l-3.848-3.087H4.11ZM6.476 8.216c1.74 0 3.151-1.403 3.151-3.134a3.143 3.143 0 0 0-3.15-3.135 3.143 3.143 0 0 0-3.151 3.135 3.143 3.143 0 0 0 3.15 3.134ZM13.333 9.526a2.85 2.85 0 0 0 2.857-2.842 2.85 2.85 0 0 0-2.857-2.842 2.85 2.85 0 0 0-2.857 2.842 2.85 2.85 0 0 0 2.857 2.842Z" fill="#A3BBCC"/>\n</svg>\n';
var icnPencil = '<svg width="13" height="12" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 12">\n  <title>Edit</title>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.813 2l-2-2-2 2 2 2 2-2zm-9 9l6-6-2-2-6 6-1 3 3-1z" fill="#A3BBCC"/>\n</svg>\n';
var icnPeople = '<svg width="18" height="15" viewBox="0 0 18 15" xmlns="http://www.w3.org/2000/svg">\n  <title>Organization</title>\n  <path d="M12.2017301 6.92326993c.703125 0 1.4690288.10044643 2.2977122.30133928.8286827.20089286 1.5945866.52734408 2.2977116.979353.703125.45200893 1.0546875.96679672 1.0546875 1.54436336v4.99637293h-4.8214286V9.74832557c0-1.10491071-.5273434-2.03403986-1.5820309-2.78738807.1757809-.02511193.426897-.03766757.7533482-.03766757zm-6.40346017 0c.703125 0 1.4690295.10044643 2.29771221.30133928.82868272.20089286 1.58830907.52734408 2.27887846.979353.6905693.45200893 1.0358537.96679672 1.0358537 1.54436336v4.99637293H.14815864V9.74832557c0-.57756664.3515625-1.09235443 1.0546875-1.54436336.703125-.45200892 1.46902886-.77846014 2.29771157-.979353.82868336-.20089285 1.59458722-.30133928 2.29771222-.30133928zm0-1.58203093c-.65290179 0-1.21791279-.23856043-1.69503364-.71568129-.47712022-.47712021-.71568065-1.04213121-.71568065-1.695033 0-.65290178.23856043-1.21791342.71568065-1.69503364C4.58035714.75837086 5.14536814.51981043 5.79826993.51981043c.65290178 0 1.21163528.23856043 1.67619986.71568064.46456457.47712022.6968475 1.04213186.6968475 1.69503364 0 .65290179-.23228293 1.21791279-.6968475 1.695033-.46456458.47712086-1.02329808.71568129-1.67619986.71568129zm6.40346017 0c-.6529018 0-1.2179128-.23856043-1.6950337-.71568129-.4771208-.47712021-.71568061-1.04213121-.71568061-1.695033 0-.65290178.23855981-1.21791342.71568061-1.69503364.4771209-.47712021 1.0421319-.71568064 1.6950337-.71568064s1.2179128.23856043 1.6950336.71568064c.4771202.47712022.7156807 1.04213186.7156807 1.69503364 0 .65290179-.2385605 1.21791279-.7156807 1.695033-.4771208.47712086-1.0421318.71568129-1.6950336.71568129z" fill="#A3BBCC" fill-rule="evenodd" />\n</svg>\n';
var icnPortal = '<svg width="19" height="16" viewBox="0 0 19 16" xmlns="http://www.w3.org/2000/svg">\n  <title>Dev Portal</title>\n  <g transform="translate(.5)" fill-rule="evenodd">\n    <path fill="#A3BBCC" d="M6,8a3,3 0 1,0 6,0a3,3 0 1,0 -6,0" />\n    <path fill="#A3BBCC" d="M11.5 0h2.9545455l1.1818181 1.6v3.2l1.1818182 1.6H18v3.2h-1.1818182l-1.1818182 1.6v3.2L14.4545455 16H11.5v-2.4h2.3636364v-4L15.0454545 8l-1.1818181-1.6v-4H11.5zM6.5 0H3.54545455L2.36363636 1.6v3.2L1.18181818 6.4H0v3.2h1.18181818l1.18181818 1.6v3.2L3.54545455 16H6.5v-2.4H4.13636364v-4L2.95454545 8l1.18181819-1.6v-4H6.5z"/>\n  </g>\n</svg>\n';
var icnProfile = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <title>Profile</title>\n  <path d="M12 0c6.627417 0 12 5.372583 12 12s-5.372583 12-12 12S0 18.627417 0 12 5.372583 0 12 0zm.5 18h-1c-1.89844585 0-3.52231553 1.1756003-4.18333865 2.8385306C8.71442012 21.5798521 10.3081447 22 12 22c1.6918553 0 3.2855799-.4201479 4.6825277-1.1617979l.0613831.1617114C16.1261318 19.2521701 14.4592959 18 12.5 18zM12 2C6.4771525 2 2 6.4771525 2 12c0 3.041301 1.35767114 5.7655009 3.4999962 7.5995824C6.42573925 17.4804809 8.53997721 16 11 16h2c2.4600228 0 4.5742607 1.4804809 5.500341 3.5990697C20.6423289 17.7655009 22 15.041301 22 12c0-5.5228475-4.4771525-10-10-10zm0 2c2.209139 0 4 1.790861 4 4v2c0 2.209139-1.790861 4-4 4s-4-1.790861-4-4V8c0-2.209139 1.790861-4 4-4zm0 2c-1.0543618 0-1.9181651.81587779-1.9945143 1.85073766L10 8v2c0 1.1045695.8954305 2 2 2 1.0543618 0 1.9181651-.8158778 1.9945143-1.8507377L14 10V8c0-1.1045695-.8954305-2-2-2z" fill="#A3BBCC" fill-rule="evenodd"/>\n</svg>\n';
var icnRedo = '<svg width="17" height="14" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 14">\n  <title>Redo</title>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.466 12.06a6.868 6.868 0 112.196-5.676l.85-.85a.847.847 0 011.201-.017c.327.327.315.869-.017 1.2L14.233 9.18c-.342.342-.88.35-1.208.023L10.654 6.83c-.324-.324-.314-.859.028-1.2.34-.34.881-.348 1.2-.029l.847.846a4.938 4.938 0 10-1.63 4.245l1.367 1.367z" fill="#A3BBCC"/>\n</svg>\n';
var icnRuntimes = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Runtimes</title>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1h4.9l1.76 2H6.06L3 5.7v9.2l-2-2.28V3.1L3.38 1H8Z" fill="#A3BBCC"/>\n  <path d="M16.9 5H7.39L5 7.1v9.52L7.1 19h9.52L19 16.9V7.39L16.9 5Z" fill="#A3BBCC"/>\n</svg>\n';
var icnSearch = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Search</title>\n  <path d="M10.88 18.75a7.88 7.88 0 1 0 0-15.75 7.88 7.88 0 0 0 0 15.75ZM16.44 16.44 21 21" fill="none" stroke="#A3BBCC" stroke-width="3"/>\n</svg>\n';
var icnSecurity = '<svg width="32" height="32" viewBox="-6 -4 32 32" xmlns="http://www.w3.org/2000/svg">\n  <title>Security</title>\n  <path d="M10 24C5.39 22.156.994 19.54.147 14h2.02c.643 3.577 3.15 5.847 7.832 7.837 4.576-1.955 7.15-4.307 7.822-7.837h2.026c-.869 5.45-5.3 8.181-9.847 10zM20 8h-2V5.862c-2.704-.373-5.375-1.501-8-3.359-2.625 1.858-5.296 2.986-8 3.36V8H0V4c3.333 0 6.667-1.333 10-4 3.333 2.667 6.667 4 10 4v4zM0 10h20v2H0v-2z" fill="#A3BBCC" fill-rule="nonzero"/>\n</svg>\n';
var icnServiceDocument = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Document</title>\n  <path d="M11.5 0H.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h11a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5zM3.5 4h-3a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5zM11.5 4h-6a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h6a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5zM11.5 8H.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h11a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5z" fill="#A3BBCC"/>\n</svg>\n';
var icnServicehub = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>ServiceHub</title>\n  <path d="M8.85 1v7.35H1.5V3.2L4.01 1h4.84ZM18.35 8.35H11V1h5.15l2.2 2.51v4.84ZM11 17.85V10.5h7.35v5.15l-2.51 2.2H11ZM1.5 10.5h7.35v7.35H3.7l-2.2-2.51V10.5Z" fill="#A3BBCC"/>\n</svg>\n';
var icnServices = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <title>Services</title>\n  <path fill="#A3BBCC" d="M0,8a8,8 0 1,0 16,0a8,8 0 1,0 -16,0" />\n</svg>\n';
var icnSharedConfig = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Shared Config</title>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.27 2 4.8 8h10.4L10 17 4.8 8l-3.54 6.14L3.06 17H17.7l1.34-2.34L11.74 2H8.26Z" fill="#A3BBCC"/>\n</svg>\n';
var icnSpinner = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Loading</title>\n  <g>\n    <path d="M5 10a5 5 0 1 0 5-5" fill="none" stroke="#A3BBCC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n  </g>\n</svg>\n';
var icnStackedCards = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">\n  <path d="M14 5.33333333c1.1045695 0 2 .8954305 2 1.99999997V16H7.33333333c-1.1045695 0-2-.8954305-2-2V5.33333333L12.666 5.333 14 5.33333333zm-3.3333333-2.66666666c.8706388 0 1.6113429.55631633 1.8860317 1.33286835L4 4l-.00046498 8.5526984c-.77655202-.2746888-1.33286835-1.0153929-1.33286835-1.8860317V2.66666667h8.00000003zM8.33333333 0c.87063879 0 1.61134294.55631633 1.88603177 1.33286835l-8.88603177.00046498-.00046498 8.88603177C.55631633 9.9446763 0 9.2039721 0 8.3333333V2C0 .8954305.8954305 0 2 0h6.33333333z" fill="#A3BBCC" fill-rule="evenodd"/>\n</svg>\n';
var icnStateConfigure = '<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">\n  <title>State Configure</title>\n<circle opacity=".5" cx="48" cy="48.294" r="47" stroke="#B6B6BD" stroke-linecap="round" stroke-dasharray="4 4"/><path d="M35.818 52.219a6.756 6.756 0 1 0 6.756 6.756 6.769 6.769 0 0 0-6.756-6.756Zm0 12.268a5.522 5.522 0 1 1 0-11.044 5.522 5.522 0 0 1 0 11.044Z" fill="#169FCC"/><path d="m50.604 55.76-2.792-.464v-.001a13.255 13.255 0 0 0-.92-2.215l1.638-2.306a1.243 1.243 0 0 0-.132-1.617l-2.77-2.762a1.264 1.264 0 0 0-1.618-.142l-2.316 1.65a12.345 12.345 0 0 0-2.206-.91l-.464-2.802a1.264 1.264 0 0 0-1.244-1.012h-3.925a1.264 1.264 0 0 0-1.243 1.012l-.465 2.801c-.763.232-1.502.536-2.205.91l-2.317-1.648a1.265 1.265 0 0 0-1.618.141l-2.771 2.771a1.245 1.245 0 0 0-.131 1.619l1.638 2.306a12.52 12.52 0 0 0-.94 2.204l-2.792.465a1.254 1.254 0 0 0-1.01 1.244v3.925c-.007.601.419 1.12 1.01 1.233l2.791.465c.231.771.54 1.517.921 2.225l-1.638 2.307a1.234 1.234 0 0 0 .131 1.607l2.771 2.781c.433.44 1.12.495 1.619.132l2.295-1.638c.71.38 1.456.692 2.225.93l.465 2.78v.001c.117.593.64 1.019 1.245 1.011h3.924a1.253 1.253 0 0 0 1.243-1.01l.465-2.772a12.65 12.65 0 0 0 2.226-.93l2.336 1.628a1.244 1.244 0 0 0 1.618-.132l2.771-2.78a1.234 1.234 0 0 0 .131-1.608l-1.638-2.307c.382-.708.69-1.454.921-2.225l2.791-.465a1.245 1.245 0 0 0 1.011-1.233v-3.925a1.254 1.254 0 0 0-1.031-1.244Zm-.192 5.169-3.176.536a.609.609 0 0 0-.496.444c-.255.94-.629 1.845-1.113 2.69a.618.618 0 0 0 0 .668l1.871 2.62-2.75 2.78-2.64-1.86a.617.617 0 0 0-.667 0 10.94 10.94 0 0 1-2.66 1.102.637.637 0 0 0-.455.495L37.8 73.57h-3.945l-.525-3.165a.638.638 0 0 0-.455-.496 10.947 10.947 0 0 1-2.66-1.103.635.635 0 0 0-.667.03l-2.64 1.832-2.802-2.772 1.87-2.619a.615.615 0 0 0 0-.667 11.45 11.45 0 0 1-1.101-2.67.609.609 0 0 0-.496-.446l-3.176-.536v-3.954l3.186-.536a.607.607 0 0 0 .486-.445c.254-.93.628-1.825 1.112-2.66a.638.638 0 0 0 0-.667l-1.881-2.64 2.78-2.781 2.63 1.87a.615.615 0 0 0 .668 0c.856-.477 1.77-.84 2.721-1.081a.637.637 0 0 0 .455-.496l.476-3.195H37.8l.526 3.186v-.001a.637.637 0 0 0 .455.496c.926.25 1.816.616 2.65 1.092a.615.615 0 0 0 .667 0l2.63-1.87 2.78 2.78-1.87 2.62a.636.636 0 0 0 0 .667c.485.833.856 1.728 1.102 2.66.068.23.26.402.496.445l3.186.536-.01 3.945Z" fill="#169FCC"/><path d="m56.804 47.092.374-2.195a9.416 9.416 0 0 0 1.71-.707l1.81 1.294c.445.325 1.06.282 1.456-.102l2.255-2.255a1.132 1.132 0 0 0 .121-1.466l-1.284-1.83c.282-.547.518-1.115.708-1.7l2.194-.374c.55-.09.954-.566.951-1.122v-3.197a1.133 1.133 0 0 0-.95-1.112l-2.205-.374a9.88 9.88 0 0 0-.698-1.69l1.295-1.82a1.133 1.133 0 0 0-.122-1.466l-2.255-2.255a1.133 1.133 0 0 0-1.467-.122l-1.82 1.295a10.55 10.55 0 0 0-1.7-.739l-.373-2.204A1.134 1.134 0 0 0 55.68 22h-3.196a1.133 1.133 0 0 0-1.122.95l-.364 2.205c-.584.18-1.15.414-1.69.698l-1.82-1.294a1.134 1.134 0 0 0-1.467.12l-2.255 2.297c-.4.39-.451 1.015-.121 1.466l1.294 1.82v.001a9.945 9.945 0 0 0-.707 1.689l-2.225.374a1.124 1.124 0 0 0-.951 1.112v3.197a1.123 1.123 0 0 0 .95 1.122l2.195.374c.182.586.416 1.155.698 1.7l-1.254 1.81c-.33.45-.278 1.076.121 1.466l2.286 2.276a1.133 1.133 0 0 0 1.466.12l1.81-1.294a9.62 9.62 0 0 0 1.7.709l.364 2.194c.093.548.567.95 1.122.95h3.196a1.142 1.142 0 0 0 1.093-.97Zm-4.227-.294-.456-2.487a.616.616 0 0 0-.455-.496 9.254 9.254 0 0 1-2.144-.89.636.636 0 0 0-.668 0l-2.022 1.477-2.144-2.144 1.466-2.023a.618.618 0 0 0 0-.668 8.997 8.997 0 0 1-.89-2.134.616.616 0 0 0-.495-.455l-2.498-.414v-3.035l2.498-.415v.001a.617.617 0 0 0 .495-.455 8.981 8.981 0 0 1 .89-2.134.619.619 0 0 0 0-.668l-1.476-2.022 2.144-2.144 2.022 1.476c.203.13.465.13.668 0a8.965 8.965 0 0 1 2.134-.88.607.607 0 0 0 .445-.495l.425-2.508h3.034l.415 2.508c.04.24.218.435.455.495a9.106 9.106 0 0 1 2.123.88c.204.13.464.13.668 0l2.023-1.476 2.134 2.144-1.467 2.022a.636.636 0 0 0 0 .668c.391.668.69 1.386.89 2.134.06.237.255.414.495.455l2.499.415v3.034l-2.498.415a.65.65 0 0 0-.496.454 8.922 8.922 0 0 1-.88 2.134.618.618 0 0 0 0 .668l1.466 2.022-2.133 2.144-2.023-1.476a.657.657 0 0 0-.678 0 8.897 8.897 0 0 1-2.144.89.609.609 0 0 0-.445.496l-.415 2.488h-2.962Z" fill="#91E1FC"/><path d="M59.697 35.048a5.614 5.614 0 1 0-5.614 5.612 5.624 5.624 0 0 0 5.614-5.612Zm-5.613 4.378a4.38 4.38 0 1 1 0-8.758 4.38 4.38 0 0 1 0 8.758Z" fill="#91E1FC"/><path d="m73.279 56.71-1.659-.282a9.071 9.071 0 0 0-.506-1.214l1.012-1.376c.299-.407.251-.973-.112-1.325l-1.79-1.79a1.011 1.011 0 0 0-1.325-.101l-1.376 1.011h.001a7.175 7.175 0 0 0-1.214-.505l-.303-1.7a1.011 1.011 0 0 0-1.011-.86h-2.529a1.012 1.012 0 0 0-1.011.86l-.233 1.67c-.42.13-.825.3-1.213.505l-1.376-1.011a1.011 1.011 0 0 0-1.325.11l-1.79 1.78c-.363.353-.41.919-.111 1.326l1.011 1.375a8.992 8.992 0 0 0-.505 1.214l-1.77.314a1.01 1.01 0 0 0-.86 1.01v2.529c-.005.505.36.936.86 1.012l1.658.283c.133.418.302.824.506 1.213l-1.012 1.376c-.299.407-.25.973.112 1.325l1.79 1.79c.352.363.917.41 1.325.11l1.365-1.01c.392.204.802.372 1.224.506l.273 1.658c.076.498.507.865 1.011.86h2.528c.505.005.937-.362 1.012-.86l.344-1.628a7.666 7.666 0 0 0 1.224-.506l1.365 1.012c.407.298.973.25 1.325-.112l1.79-1.79c.363-.352.41-.917.112-1.325l-1.012-1.376c.204-.388.373-.795.506-1.213l1.658-.283a1.01 1.01 0 0 0 .86-1.012v-2.558a1.01 1.01 0 0 0-.83-1.011Zm-.374 3.368-1.871.304a.647.647 0 0 0-.496.455 6.634 6.634 0 0 1-.688 1.658.618.618 0 0 0 0 .668l1.092 1.547-1.537 1.537-1.537-1.103v.001a.615.615 0 0 0-.668 0 6.71 6.71 0 0 1-1.668.688.635.635 0 0 0-.445.495l-.313 1.871h-2.135l-.313-1.87a.635.635 0 0 0-.446-.496 6.685 6.685 0 0 1-1.668-.718.615.615 0 0 0-.667 0l-1.538 1.103-1.537-1.508 1.102-1.547a.636.636 0 0 0 0-.668 6.638 6.638 0 0 1-.688-1.658.636.636 0 0 0-.495-.456l-1.87-.303v-2.174l1.87-.314a.616.616 0 0 0 .495-.455 7.676 7.676 0 0 1 .719-1.639.618.618 0 0 0 0-.667l-1.133-1.567 1.537-1.538 1.547 1.113a.638.638 0 0 0 .668 0 6.838 6.838 0 0 1 1.659-.688.607.607 0 0 0 .445-.495l.313-1.871h2.174l.313 1.87h.001c.037.24.211.434.445.496.58.155 1.139.387 1.659.688a.638.638 0 0 0 .667 0l1.547-1.113 1.538 1.538-1.103 1.547a.619.619 0 0 0 0 .668c.298.521.53 1.078.688 1.658.061.237.255.415.496.455l1.87.314-.03 2.174Z" fill="#169FCC"/><path d="M63.731 54.426a4.57 4.57 0 1 0-.001 9.14 4.57 4.57 0 0 0 .002-9.14Zm0 7.898a3.336 3.336 0 0 1-3.347-3.334 3.336 3.336 0 1 1 6.674.007 3.339 3.339 0 0 1-3.327 3.327Z" fill="#169FCC"/></svg>';
var icnStateGruceo = '<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">\n  <title>State Gruceo</title>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 88c-.276 0-.5-.121-.5-.27v-3.535c0-.149.224-.27.5-.27s.5.121.5.27v3.535c0 .149-.224.27-.5.27Zm0-7.069c-.276 0-.5-.12-.5-.27v-3.534c0-.15.224-.27.5-.27s.5.12.5.27v3.534c0 .15-.224.27-.5.27Zm0-7.068c-.276 0-.5-.121-.5-.27v-3.535c0-.15.224-.27.5-.27s.5.12.5.27v3.534c0 .15-.224.27-.5.27Zm0-7.069c-.276 0-.5-.12-.5-.27v-3.535c0-.149.224-.27.5-.27s.5.121.5.27v3.535c0 .15-.224.27-.5.27Zm0-7.069c-.276 0-.5-.12-.5-.27v-3.534c0-.15.224-.27.5-.27s.5.12.5.27v3.534c0 .15-.224.27-.5.27Zm0-7.068c-.276 0-.5-.121-.5-.27v-3.535c0-.15.224-.27.5-.27s.5.12.5.27v3.535c0 .149-.224.27-.5.27Zm0-7.069c-.276 0-.5-.12-.5-.27v-3.534c0-.15.224-.27.5-.27s.5.12.5.27v3.534c0 .15-.224.27-.5.27Zm0-7.069c-.276 0-.5-.12-.5-.27v-3.534c0-.15.224-.27.5-.27s.5.12.5.27v3.534c0 .15-.224.27-.5.27Zm0-7.068c-.276 0-.5-.121-.5-.27v-3.535c0-.149.224-.27.5-.27s.5.121.5.27v3.535c0 .149-.224.27-.5.27Zm0-7.069c-.276 0-.5-.12-.5-.27v-3.534c0-.15.224-.27.5-.27s.5.12.5.27v3.534c0 .15-.224.27-.5.27Zm0-7.068c-.276 0-.5-.122-.5-.27v-3.535c0-.15.224-.27.5-.27s.5.12.5.27v3.534c0 .15-.224.27-.5.27Zm0-7.07c-.276 0-.5-.12-.5-.27V6.44c0-.149.224-.27.5-.27s.5.121.5.27v3.535c0 .149-.224.27-.5.27ZM81.5 88.83c-.276 0-.5-.121-.5-.27v-3.535c0-.149.224-.27.5-.27s.5.121.5.27v3.535c0 .149-.224.27-.5.27Zm0-7.069c-.276 0-.5-.12-.5-.27v-3.534c0-.15.224-.27.5-.27s.5.12.5.27v3.534c0 .15-.224.27-.5.27Zm0-7.068c-.276 0-.5-.121-.5-.27v-3.535c0-.15.224-.27.5-.27s.5.12.5.27v3.534c0 .15-.224.27-.5.27Zm0-7.069c-.276 0-.5-.12-.5-.27v-3.535c0-.149.224-.27.5-.27s.5.121.5.27v3.535c0 .15-.224.27-.5.27Zm0-7.069c-.276 0-.5-.12-.5-.27v-3.534c0-.15.224-.27.5-.27s.5.12.5.27v3.534c0 .15-.224.27-.5.27Zm0-7.068c-.276 0-.5-.121-.5-.27v-3.535c0-.15.224-.27.5-.27s.5.12.5.27v3.535c0 .149-.224.27-.5.27Zm0-7.069c-.276 0-.5-.12-.5-.27v-3.535c0-.149.224-.27.5-.27s.5.121.5.27v3.535c0 .15-.224.27-.5.27Zm0-7.069c-.276 0-.5-.12-.5-.27v-3.534c0-.15.224-.27.5-.27s.5.12.5.27v3.534c0 .15-.224.27-.5.27Zm0-7.068c-.276 0-.5-.121-.5-.27v-3.535c0-.149.224-.27.5-.27s.5.121.5.27v3.535c0 .149-.224.27-.5.27Zm0-7.069c-.276 0-.5-.12-.5-.27v-3.534c0-.15.224-.27.5-.27s.5.12.5.27v3.534c0 .15-.224.27-.5.27Zm0-7.069c-.276 0-.5-.12-.5-.27V14.34c0-.15.224-.27.5-.27s.5.12.5.27v3.534c0 .15-.224.27-.5.27Zm0-7.068c-.276 0-.5-.121-.5-.27V7.27c0-.149.224-.27.5-.27s.5.121.5.27v3.535c0 .149-.224.27-.5.27Z" fill="#D6D6D6"/><path fill-rule="evenodd" clip-rule="evenodd" d="M91 79.5c0 .276-.127.5-.285.5h-3.721c-.158 0-.285-.224-.285-.5s.127-.5.285-.5h3.721c.158 0 .285.224.285.5Zm-7.444 0c0 .276-.127.5-.284.5H79.55c-.157 0-.284-.224-.284-.5s.127-.5.284-.5h3.722c.157 0 .284.224.284.5Zm-7.443 0c0 .276-.127.5-.285.5h-3.722c-.157 0-.284-.224-.284-.5s.127-.5.284-.5h3.722c.157 0 .285.224.285.5Zm-7.444 0c0 .276-.127.5-.284.5h-3.722c-.157 0-.285-.224-.285-.5s.128-.5.285-.5h3.722c.157 0 .284.224.284.5Zm-7.443 0c0 .276-.128.5-.285.5H57.22c-.157 0-.284-.224-.284-.5s.127-.5.284-.5h3.722c.157 0 .285.224.285.5Zm-7.444 0c0 .276-.127.5-.284.5h-3.722c-.157 0-.285-.224-.285-.5s.128-.5.285-.5h3.722c.157 0 .284.224.284.5Zm-7.443 0c0 .276-.128.5-.285.5h-3.722c-.157 0-.284-.224-.284-.5s.127-.5.284-.5h3.722c.157 0 .285.224.285.5Zm-7.444 0c0 .276-.127.5-.284.5h-3.722c-.157 0-.285-.224-.285-.5s.128-.5.285-.5h3.722c.157 0 .284.224.284.5Zm-7.443 0c0 .276-.128.5-.285.5h-3.722c-.157 0-.284-.224-.284-.5s.127-.5.284-.5h3.722c.157 0 .285.224.285.5Zm-7.444 0c0 .276-.127.5-.284.5h-3.722c-.157 0-.285-.224-.285-.5s.128-.5.285-.5h3.722c.157 0 .284.224.284.5Zm-7.443 0c0 .276-.128.5-.285.5h-3.722c-.157 0-.284-.224-.284-.5s.127-.5.284-.5h3.722c.157 0 .285.224.285.5Zm-7.444 0c0 .276-.127.5-.285.5H5.115c-.158 0-.285-.224-.285-.5s.127-.5.285-.5h3.721c.158 0 .285.224.285.5ZM91 16.5c0 .276-.127.5-.285.5h-3.721c-.158 0-.285-.224-.285-.5s.127-.5.285-.5h3.721c.158 0 .285.224.285.5Zm-7.444 0c0 .276-.127.5-.284.5H79.55c-.157 0-.284-.224-.284-.5s.127-.5.284-.5h3.722c.157 0 .284.224.284.5Zm-7.443 0c0 .276-.127.5-.285.5h-3.722c-.157 0-.284-.224-.284-.5s.127-.5.284-.5h3.722c.157 0 .285.224.285.5Zm-7.444 0c0 .276-.127.5-.284.5h-3.722c-.157 0-.285-.224-.285-.5s.128-.5.285-.5h3.722c.157 0 .284.224.284.5Zm-7.443 0c0 .276-.128.5-.285.5H57.22c-.157 0-.284-.224-.284-.5s.127-.5.284-.5h3.722c.157 0 .285.224.285.5Zm-7.444 0c0 .276-.127.5-.284.5h-3.722c-.157 0-.285-.224-.285-.5s.128-.5.285-.5h3.722c.157 0 .284.224.284.5Zm-7.443 0c0 .276-.128.5-.285.5h-3.722c-.157 0-.284-.224-.284-.5s.127-.5.284-.5h3.722c.157 0 .285.224.285.5Zm-7.444 0c0 .276-.127.5-.284.5h-3.722c-.157 0-.285-.224-.285-.5s.128-.5.285-.5h3.722c.157 0 .284.224.284.5Zm-7.443 0c0 .276-.128.5-.285.5h-3.722c-.157 0-.284-.224-.284-.5s.127-.5.284-.5h3.722c.157 0 .285.224.285.5Zm-7.444 0c0 .276-.127.5-.284.5h-3.722c-.157 0-.285-.224-.285-.5s.128-.5.285-.5h3.722c.157 0 .284.224.284.5Zm-7.443 0c0 .276-.128.5-.285.5h-3.722c-.157 0-.284-.224-.284-.5s.127-.5.284-.5h3.722c.157 0 .285.224.285.5Zm-7.444 0c0 .276-.127.5-.285.5H5.115c-.158 0-.285-.224-.285-.5s.127-.5.285-.5h3.721c.158 0 .285.224.285.5Z" fill="#D6D6D6"/><circle opacity=".5" cx="48" cy="48.294" r="47" stroke="#B6B6BD" stroke-linecap="round" stroke-dasharray="4 4"/><path fill-rule="evenodd" clip-rule="evenodd" d="M45.85 25.621c-.208.167-.457.202-.558.077l-1.728-2.136c-.1-.124-.014-.361.194-.528.207-.167.457-.201.557-.077l1.729 2.136c.1.125.013.361-.194.528Zm-4.108-5.09c-.207.168-.457.202-.557.077l-1.468-1.88c-.101-.124-.014-.36.193-.528.208-.167.457-.201.558-.076l1.468 1.879c.1.125.014.361-.194.528ZM38.099 39.446c-.215.173-.471.212-.571.088l-2.38-2.955c-.1-.124-.008-.366.207-.54.216-.172.471-.212.572-.087l2.38 2.955c.1.124.007.366-.208.54Zm-4.76-5.909c-.214.174-.47.213-.57.088l-2.38-2.954c-.1-.125-.008-.367.207-.54.215-.173.471-.212.572-.088l2.38 2.955c.1.125.007.366-.208.54Zm-4.758-5.908c-.215.173-.471.212-.572.087l-2.38-2.954c-.1-.125-.007-.367.208-.54.215-.173.471-.212.572-.087l2.38 2.954c.1.125.007.366-.208.54Zm-4.76-5.91c-.214.174-.47.213-.57.088l-2.38-2.954c-.1-.125-.008-.366.207-.54.215-.173.471-.212.572-.087l2.38 2.954c.1.125.007.367-.208.54Z" fill="#D6D6D6"/><path d="M34.828 65.591h-.254l-.15.206-8.251 11.307-.001.002-1.736 2.394H14.5V66.291l9.717-13.064h3.723l.143-.13 9.35-8.487L49.82 60.173l-3.342 5.418H34.828Zm4.111 11.578.024-.175-.092-.152-3.625-5.972 1.33-1.776h11.982l6.161 8.089-.89 2.317H38.62l.318-2.33Zm29.13-.253.061-.24-.155-.194-27.877-34.713 5.456-10.051 6.15-.01 29.759 37.046L79.257 79.5H67.424l.646-2.584Zm.82-47.862-.272.294.227.33 2.334 3.395v3.38l-6.4 5.448-11.392-14.054-.15-.185H47.004l2.319-4.438 7.755-6.573 13.238 10.865-1.427 1.538Z" stroke="#169FCC"/></svg>';
var icnStateNoData = '<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">\n  <title>State No Data</title>\n<circle opacity=".5" cx="48" cy="48.294" r="47" stroke="#B6B6BD" stroke-linecap="round" stroke-dasharray="4 4"/><path d="m7 42.5.376-.33a.5.5 0 0 0-.831.123L7 42.5Zm14 16-.376.33a.5.5 0 0 0 .73.024L21 58.5Zm11-11 .362-.345a.5.5 0 0 0-.716-.009L32 47.5Zm10.5 11-.362.345a.5.5 0 0 0 .62.084L42.5 58.5ZM55 51l.224-.447a.5.5 0 0 0-.481.018L55 51Zm9 4.5-.224.447a.5.5 0 0 0 .62-.142L64 55.5Zm10-13 .024-.5a.5.5 0 0 0-.42.195L74 42.5ZM2.872 52.79a.5.5 0 0 0-.91-.414l.91.414Zm-.077-2.247a.5.5 0 0 0 .91.414l-.91-.414Zm1.744-1.42a.5.5 0 0 0-.91-.413l.91.414Zm-.078-2.247a.5.5 0 0 0 .91.414l-.91-.414Zm1.744-1.42a.5.5 0 0 0-.91-.413l.91.414Zm-.077-2.246a.5.5 0 0 0 .91.414l-.91-.414Zm1.196.42a.5.5 0 0 0 .752-.66l-.752.66Zm2.152.94a.5.5 0 0 0-.752.66l.752-.66Zm.648 2.26a.5.5 0 0 0 .752-.66l-.752.66Zm2.152.94a.5.5 0 0 0-.752.66l.752-.66Zm.648 2.26a.5.5 0 0 0 .752-.66l-.752.66Zm2.152.94a.5.5 0 0 0-.752.66l.752-.66Zm.648 2.26a.5.5 0 0 0 .752-.66l-.752.66Zm2.152.94a.5.5 0 0 0-.752.66l.752-.66Zm.648 2.26a.5.5 0 0 0 .752-.66l-.752.66Zm2.152.94a.5.5 0 0 0-.752.66l.752-.66Zm1.365.796a.5.5 0 0 0-.707-.707l.707.707Zm.668-2.082a.5.5 0 0 0 .707.707l-.707-.707Zm2.082-.668a.5.5 0 0 0-.707-.707l.707.707Zm.668-2.082a.5.5 0 0 0 .707.707l-.707-.707Zm2.082-.668a.5.5 0 0 0-.707-.707l.707.707Zm.668-2.082a.5.5 0 0 0 .707.707l-.707-.707Zm2.082-.668a.5.5 0 0 0-.707-.707l.707.707Zm.668-2.082a.5.5 0 0 0 .707.707l-.707-.707Zm1.336.699a.5.5 0 1 0 .723-.69l-.723.69Zm2.035.684a.5.5 0 1 0-.723.69l.723-.69Zm.59 2.066a.5.5 0 1 0 .723-.69l-.723.69Zm2.035.684a.5.5 0 1 0-.723.69l.723-.69Zm.59 2.066a.5.5 0 1 0 .723-.69l-.723.69Zm2.035.684a.5.5 0 1 0-.723.69l.723-.69Zm.59 2.066a.5.5 0 1 0 .723-.69l-.723.69Zm2.035.684a.5.5 0 1 0-.723.69l.723-.69Zm1.334.993a.5.5 0 1 0-.515-.858l.514.858Zm1.047-1.795a.5.5 0 1 0 .515.858l-.514-.858Zm2.078-.08a.5.5 0 1 0-.515-.858l.514.858Zm1.047-1.795a.5.5 0 1 0 .515.858l-.514-.858Zm2.078-.08a.5.5 0 1 0-.515-.858l.514.858Zm1.047-1.795a.5.5 0 1 0 .515.858l-.514-.858Zm2.078-.08a.5.5 0 1 0-.515-.858l.514.858Zm1.047-1.795a.5.5 0 1 0 .515.858l-.514-.858Zm1.565.782a.5.5 0 1 0 .448-.894l-.448.894Zm1.948-.144a.5.5 0 1 0-.448.894l.448-.894Zm1.052 1.644a.5.5 0 1 0 .448-.894l-.448.894Zm1.948-.144a.5.5 0 1 0-.448.894l.448-.894Zm1.052 1.644a.5.5 0 1 0 .448-.894l-.448.894Zm1.948-.144a.5.5 0 1 0-.448.894l.448-.894Zm1.547.314a.5.5 0 0 0-.792-.61l.792.61Zm.458-2.234a.5.5 0 0 0 .792.61l-.792-.61Zm2.042-1.016a.5.5 0 0 0-.792-.61l.792.61Zm.458-2.234a.5.5 0 0 0 .792.61l-.792-.61Zm2.042-1.016a.5.5 0 0 0-.792-.61l.792.61Zm.458-2.234a.5.5 0 0 0 .792.61l-.792-.61Zm2.042-1.016a.5.5 0 0 0-.792-.61l.792.61Zm.458-2.234a.5.5 0 0 0 .792.61l-.792-.61Zm2.022.041a.5.5 0 1 0 .048-.998l-.048.998Zm2.098-.898a.5.5 0 1 0-.048.998l.048-.998Zm2.002 1.098a.5.5 0 1 0 .048-.998l-.048.998Zm2.098-.898a.5.5 0 1 0-.048.998l.048-.998Zm2.002 1.098a.5.5 0 1 0 .048-.998l-.048.998Zm2.098-.898a.5.5 0 1 0-.048.998l.048-.998Zm2.002 1.098a.5.5 0 1 0 .048-.998l-.048.998Zm2.098-.898a.5.5 0 1 0-.048.998l.048-.998Zm2.002 1.098a.5.5 0 1 0 .048-.998l-.048.998Zm2.098-.898a.5.5 0 1 0-.048.998l.048-.998ZM2.455 53.707l.417-.917-.91-.414-.417.917.91.414Zm1.25-2.75.834-1.833-.91-.414-.834 1.833.91.414Zm1.667-3.667.833-1.833-.91-.414-.834 1.833.91.414Zm1.667-3.666.416-.917-.91-.414-.417.917.91.414Zm-.415-.795.7.8.752-.658-.7-.8-.752.658Zm2.1 2.4 1.4 1.6.752-.658-1.4-1.6-.752.658Zm2.8 3.2 1.4 1.6.752-.658-1.4-1.6-.752.658Zm2.8 3.2 1.4 1.6.752-.658-1.4-1.6-.752.658Zm2.8 3.2 1.4 1.6.752-.658-1.4-1.6-.752.658Zm2.8 3.2.7.8.752-.658-.7-.8-.752.658Zm1.43.825.687-.688-.707-.707-.688.687.708.708Zm2.062-2.063 1.375-1.375-.707-.707-1.375 1.375.707.707Zm2.75-2.75 1.375-1.375-.707-.707-1.375 1.375.707.707Zm2.75-2.75 1.375-1.375-.707-.707-1.375 1.375.707.707Zm2.75-2.75.688-.687-.708-.708-.687.688.707.707Zm-.028-.696.657.688.723-.69-.656-.688-.724.69Zm1.97 2.063 1.312 1.375.723-.69-1.313-1.376-.723.69Zm2.624 2.75 1.313 1.375.723-.69-1.313-1.376-.723.69Zm2.625 2.75 1.313 1.375.723-.69-1.313-1.376-.723.69Zm2.625 2.75.656.687.724-.69-.657-.688-.723.69Zm1.275.77.782-.468-.515-.858-.781.47.514.857Zm2.344-1.405 1.563-.938-.515-.858-1.563.938.515.858Zm3.125-1.876 1.563-.937-.515-.858-1.563.938.515.858Zm3.125-1.874 1.563-.938-.515-.858-1.563.938.515.858Zm3.125-1.876.781-.468-.514-.858-.782.469.515.858Zm.3-.45.75.375.448-.894-.75-.375-.448.894Zm2.25 1.125 1.5.75.448-.894-1.5-.75-.448.894Zm3 1.5 1.5.75.448-.894-1.5-.75-.448.894Zm3 1.5.75.375.448-.894-.75-.375-.448.894Zm1.37.233.625-.813-.792-.61-.625.813.792.61Zm1.875-2.438 1.25-1.625-.792-.61-1.25 1.626.792.61Zm2.5-3.25 1.25-1.625-.792-.61-1.25 1.626.792.61Zm2.5-3.25 1.25-1.625-.792-.61-1.25 1.626.792.61Zm2.5-3.25.625-.812-.792-.61-.625.813.792.61Zm.205-.618 1.025.05.048-.998-1.025-.05-.048.998Zm3.075.15 2.05.1.048-.998-2.05-.1-.048.998Zm4.1.2 2.05.1.048-.998-2.05-.1-.048.998Zm4.1.2 2.05.1.048-.998-2.05-.1-.048.998Zm4.1.2 2.05.1.048-.998-2.05-.1-.048.998Zm4.1.2 1.025.05.048-.998-1.025-.05-.048.998Z" fill="#91E1FC"/><path d="m15 37 .42-.272a.5.5 0 0 0-.821-.026L15 37Zm12 18.5-.42.272a.5.5 0 0 0 .693.147L27 55.5Zm20-13 .467-.18a.5.5 0 0 0-.74-.24l.273.42ZM54.5 62l-.467.18a.5.5 0 0 0 .94-.019L54.5 62ZM63 37l.317-.387a.5.5 0 0 0-.79.226L63 37Zm11 9-.317.387a.5.5 0 0 0 .438.098L74 46Zm14-3.5.447-.224a.5.5 0 0 0-.568-.261L88 42.5ZM3.051 53.923a.5.5 0 0 0-.802-.596l.802.596Zm.498-2.346a.5.5 0 0 0 .802.596l-.802-.596Zm2.102-1.154a.5.5 0 0 0-.802-.596l.802.596Zm.498-2.346a.5.5 0 0 0 .802.596l-.802-.596Zm2.102-1.154a.5.5 0 0 0-.802-.596l.802.596Zm.498-2.346a.5.5 0 0 0 .802.596l-.802-.596Zm2.102-1.154a.5.5 0 0 0-.802-.596l.802.596Zm.498-2.346a.5.5 0 0 0 .802.596l-.802-.596Zm2.102-1.154a.5.5 0 0 0-.802-.596l.802.596Zm.498-2.346a.5.5 0 0 0 .802.596l-.802-.596Zm1.132.466a.5.5 0 1 0 .838-.544l-.838.544Zm1.838.997a.5.5 0 1 0-.838.545l.838-.545Zm.162 2.086a.5.5 0 0 0 .838-.544l-.838.544Zm1.838.998a.5.5 0 0 0-.838.544l.838-.544Zm.162 2.086a.5.5 0 1 0 .838-.545l-.838.545Zm1.838.997a.5.5 0 1 0-.838.544l.838-.544Zm.162 2.086a.5.5 0 1 0 .838-.544l-.838.544Zm1.838.997a.5.5 0 1 0-.838.545l.838-.545Zm.162 2.086a.5.5 0 0 0 .838-.544l-.838.544Zm1.838.998a.5.5 0 0 0-.838.544l.838-.544Zm.162 2.086a.5.5 0 1 0 .838-.545l-.838.545Zm1.838.997a.5.5 0 1 0-.838.544l.838-.544Zm1.187.92a.5.5 0 0 0-.545-.838l.545.839Zm1.121-1.921a.5.5 0 0 0 .546.838l-.546-.838Zm2.212-.245a.5.5 0 0 0-.545-.839l.545.839Zm1.122-1.922a.5.5 0 0 0 .545.839l-.545-.839Zm2.212-.245a.5.5 0 0 0-.546-.838l.546.838Zm1.121-1.922a.5.5 0 0 0 .545.839l-.545-.839Zm2.212-.244a.5.5 0 0 0-.545-.839l.545.839Zm1.121-1.922a.5.5 0 0 0 .546.838l-.546-.838Zm2.212-.245a.5.5 0 0 0-.545-.839l.545.839Zm1.122-1.922a.5.5 0 0 0 .545.839l-.545-.839Zm2.212-.245a.5.5 0 0 0-.546-.838l.546.838Zm1.121-1.922a.5.5 0 0 0 .545.839l-.545-.839Zm1.014 1.032a.5.5 0 0 0 .934-.359l-.934.36Zm1.684 1.591a.5.5 0 0 0-.934.36l.934-.36Zm-.184 2.31a.5.5 0 0 0 .934-.36l-.934.36Zm1.684 1.59a.5.5 0 0 0-.934.36l.934-.36Zm-.184 2.31a.5.5 0 0 0 .934-.36l-.934.36Zm1.684 1.59a.5.5 0 0 0-.934.36l.934-.36Zm-.184 2.31a.5.5 0 0 0 .934-.36l-.934.36Zm1.684 1.59a.5.5 0 0 0-.934.36l.934-.36Zm-.184 2.31a.5.5 0 0 0 .934-.36l-.934.36Zm1.684 1.59a.5.5 0 0 0-.934.36l.934-.36Zm.685.423a.5.5 0 0 0-.947-.322l.947.322Zm-.34-2.108a.5.5 0 0 0 .947.322l-.947-.322Zm1.554-1.463a.5.5 0 1 0-.947-.322l.947.322Zm-.34-2.108a.5.5 0 0 0 .947.322l-.946-.322Zm1.554-1.464a.5.5 0 0 0-.946-.322l.947.322Zm-.34-2.107a.5.5 0 1 0 .948.322l-.947-.322Zm1.555-1.464a.5.5 0 0 0-.947-.322l.947.322Zm-.34-2.108a.5.5 0 0 0 .947.322l-.947-.322Zm1.554-1.464a.5.5 0 1 0-.947-.322l.947.322Zm-.34-2.107a.5.5 0 0 0 .947.322l-.947-.322Zm1.554-1.464a.5.5 0 0 0-.946-.322l.946.322Zm-.34-2.108a.5.5 0 1 0 .947.322l-.946-.322Zm1.555-1.463a.5.5 0 0 0-.947-.322l.947.322Zm-.34-2.108a.5.5 0 0 0 .947.322l-.947-.322Zm1.148.218a.5.5 0 0 0 .633-.775l-.633.775Zm2.008.35a.5.5 0 0 0-.633.775l.633-.775Zm.742 1.9a.5.5 0 0 0 .633-.775l-.633.775Zm2.008.35a.5.5 0 0 0-.633.775l.633-.775Zm.742 1.9a.5.5 0 0 0 .633-.775l-.633.775Zm2.008.35a.5.5 0 0 0-.633.775l.633-.775Zm.742 1.9a.5.5 0 0 0 .633-.775l-.633.775Zm2.008.35a.5.5 0 0 0-.633.775l.633-.775Zm1.367 1.216a.5.5 0 0 0-.242-.97l.242.97Zm1.508-1.407a.5.5 0 0 0 .242.97l-.242-.97Zm1.992.532a.5.5 0 0 0-.242-.97l.242.97Zm1.508-1.407a.5.5 0 0 0 .242.97l-.242-.97Zm1.992.532a.5.5 0 0 0-.242-.97l.242.97Zm1.508-1.407a.5.5 0 0 0 .242.97l-.242-.97Zm1.992.532a.5.5 0 0 0-.242-.97l.242.97Zm1.508-1.407a.5.5 0 0 0 .242.97l-.242-.97Zm1.05 1.49a.5.5 0 1 0 .894-.446l-.895.447Zm1.894 1.553a.5.5 0 1 0-.895.447l.895-.447Zm.105 2.447a.5.5 0 0 0 .894-.447l-.894.447Zm1.894 1.552a.5.5 0 0 0-.894.447l.894-.447Zm.105 2.447a.5.5 0 1 0 .895-.447l-.895.447Zm1.895 1.552a.5.5 0 1 0-.895.447l.895-.447ZM2.4 54.798l.65-.875-.802-.596-.65.875.802.596Zm1.95-2.625 1.3-1.75-.802-.596-1.3 1.75.802.596Zm2.6-3.5 1.3-1.75-.802-.596-1.3 1.75.802.596Zm2.6-3.5 1.3-1.75-.802-.596-1.3 1.75.802.596Zm2.6-3.5 1.3-1.75-.802-.596-1.3 1.75.802.596Zm2.6-3.5.65-.875-.802-.596-.65.875.802.596Zm-.17-.9.5.77.838-.544-.5-.771-.838.544Zm1.5 2.312 1 1.541.838-.544-1-1.542-.838.545Zm2 3.083 1 1.542.838-.545-1-1.541-.838.544Zm2 3.083 1 1.542.838-.544-1-1.542-.838.544Zm2 3.084 1 1.541.838-.544-1-1.542-.838.545Zm2 3.083 1 1.542.838-.545-1-1.541-.838.544Zm2 3.083.5.771.838-.544-.5-.77-.838.543Zm1.192.918.833-.541-.545-.839-.834.542.546.838Zm2.5-1.625 1.666-1.083-.545-.839-1.666 1.084.544.838Zm3.333-2.166 1.666-1.084-.544-.838-1.667 1.083.545.839Zm3.333-2.167 1.667-1.083-.545-.839-1.667 1.083.545.839Zm3.334-2.167 1.666-1.083-.545-.839-1.666 1.084.544.838Zm3.333-2.166 1.666-1.084-.544-.838-1.667 1.083.545.839Zm3.333-2.167.834-.542-.546-.838-.833.541.545.839Zm.094-.782.375.975.934-.359-.375-.974-.934.358Zm1.125 2.925.75 1.95.934-.358-.75-1.95-.934.358Zm1.5 3.9.75 1.95.934-.358-.75-1.95-.934.358Zm1.5 3.9.75 1.95.934-.358-.75-1.95-.934.358Zm1.5 3.9.75 1.95.934-.358-.75-1.95-.934.358Zm1.5 3.9.375.975.934-.358-.375-.975-.934.359Zm1.315.957.304-.893-.947-.322-.303.893.946.322Zm.911-2.679.607-1.785-.947-.322-.607 1.785.947.322Zm1.214-3.571.608-1.786-.947-.322-.607 1.786.946.322Zm1.215-3.572.607-1.785-.947-.322-.607 1.786.947.322Zm1.214-3.57.607-1.787-.947-.322-.607 1.786.947.322Zm1.214-3.572.607-1.786-.946-.322-.608 1.786.947.322Zm1.215-3.572.607-1.785-.947-.322-.607 1.785.947.322Zm1.214-3.571.303-.893-.946-.322-.304.893.947.322Zm-.487-.667.688.563.633-.775-.687-.562-.634.774Zm2.063 1.688 1.375 1.124.633-.773L65.38 38.3l-.633.775Zm2.75 2.25 1.375 1.124.633-.773-1.375-1.126-.633.775Zm2.75 2.25 1.375 1.124.633-.773L70.88 42.8l-.633.775Zm2.75 2.25.687.562.634-.774-.688-.563-.633.775Zm1.125.66.875-.219-.242-.97-.875.219.242.97Zm2.625-.656 1.75-.438-.242-.97-1.75.438.242.97Zm3.5-.875 1.75-.438-.242-.97-1.75.438.242.97Zm3.5-.875 1.75-.438-.242-.97-1.75.438.242.97Zm3.5-.875.875-.219-.242-.97-.875.219.242.97Zm.307-.48.065.13.016.032.016.032.032.064.032.064c.01.022.02.041.032.063l.004.008c.015.032-.012-.024.003.008l.008.016.016.031.004.008.004.008v.002l.002.002.002.004v.002l.002.002a.14.14 0 0 0 .002.003l.008.016.001.004a.148.148 0 0 1 .002.004l.004.008.008.016.004.007.002.004.001.002.001.002a.756.756 0 0 1 .008.016l.002.004c0 .002 0 .001.002.003l.002.004v.002l.002.002c.018.037-.011-.021.007.016l.004.008.004.007.016.031.03.062.016.03.015.031.03.062c.01.018 0-.003.008.015l.008.015v.002a.034.034 0 0 0 .003.004v.002c.008.013-.002-.006.005.007v.002l.001.002.001.002.001.002c.01.02-.007-.014.004.007l.015.03.015.03.008.016.007.015.015.03.895-.447-.001-.002-.001-.002-.001-.002v-.002l-.003-.004-.002-.003c-.013-.026.01.018-.003-.008l-.001-.002-.001-.002-.001-.002-.001-.001-.015-.03-.001-.002-.001-.002-.001-.002-.001-.002-.002-.004v-.002c-.001 0-.002 0-.002-.002l-.007-.015-.004-.007-.002-.004-.002-.004-.007-.015-.016-.03a2.87 2.87 0 0 1-.045-.092l-.124-.247-.016-.032-.008-.015-.004-.008-.004-.008-.031-.063-.032-.063-.004-.008-.004-.008-.008-.016-.004-.008-.002-.004-.002-.004-.008-.016-.032-.064c0-.003-.002-.006-.004-.008l-.004-.008-.004-.008-.004-.009-.016-.032-.002-.004V42.4l-.002-.002-.004-.008-.002-.004-.002-.004-.001-.002-.001-.002-.001-.002-.001-.002-.016-.032-.017-.033-.004-.008v-.002l-.002-.002v-.002l-.002-.002-.008-.017-.894.448Zm1.5 3 .008.017.009.017.008.016.008.017.009.017.002.004.002.004.002.004.002.004.017.033.065.132.13.259.008.016.008.016.004.008.004.008.004.008.004.008.008.016.004.008a.05.05 0 0 1 .002.004l.002.004.004.008.004.008.008.016.032.063.007.016.008.016.008.016.008.016.063.125.016.032.004.008a1994416821.019 1994416821.019 0 0 1 .011.023l.016.031.016.031.03.062.008.016.004.008.002.003.002.004.015.031.031.062.002.004.002.004.002.003.002.004.004.008.004.007.015.031.015.03.008.016.004.008.002.004.002.003.015.031.015.03.008.016.007.015c.005.01 0-.003.004.008l.002.003.002.004.008.015.007.016.004.007.004.008.015.03.007.015.008.015.008.015.007.015.03.06.06.121.03.06.03.06.06.119.894-.447-.06-.12-.003-.007a.067.067 0 0 0-.002-.004l-.002-.004-.007-.014a4.156 4.156 0 0 1-.015-.03l-.004-.008-.002-.004-.002-.003c0-.003-.006-.013-.007-.015l-.015-.03a67.306 67.306 0 0 0-.06-.12l-.004-.008-.004-.007-.007-.015-.002-.004a.067.067 0 0 1-.002-.004l-.004-.008-.007-.015-.03-.06-.123-.244c0-.003-.013-.028-.015-.03l-.004-.008-.002-.004-.001-.004-.008-.015-.031-.062-.031-.062-.008-.015-.007-.016-.016-.031-.004-.008-.002-.004-.002-.004-.008-.015-.015-.031-.031-.063c-.004-.008-.06-.117-.063-.126a1.163 1.163 0 0 1-.008-.015l-.004-.008-.002-.004a.05.05 0 0 1-.002-.004l-.008-.016-.002-.004-.002-.004-.004-.008-.016-.032-.004-.008-.004-.008-.002-.004-.002-.003-.004-.008-.004-.008-.002-.004-.002-.004-.008-.016-.016-.032-.008-.016-.004-.008a.075.075 0 0 1-.004-.008l-.008-.016-.008-.016-.13-.26-.003-.008-.002-.004-.002-.004-.005-.008-.004-.008-.008-.017-.008-.016-.016-.033c-.009-.016.003.008-.005-.008a.15.15 0 0 0-.002-.005l-.002-.004-.008-.016a10.195 10.195 0 0 1-.017-.033l-.002-.004-.002-.005-.002-.004a1.284 1.284 0 0 1-.01-.02l-.004-.009c-.016-.032.011.024-.005-.008l-.008-.017-.004-.008a.155.155 0 0 0-.002-.004l-.002-.004-.004-.008-.002-.005-.002-.004-.895.447Zm2 4 .015.03.014.029.015.03.015.03.06.12.12.24.123.244.123.247.062.125.002.004.002.004.004.008.002.003.002.004.002.004.002.004.016.032.015.031.008.016.008.016.016.031.008.016.008.016.008.016.008.016.004.008.004.008.008.016.004.007.004.008c.007.014 0 .003.008.016l.016.032a.795.795 0 0 1 .008.016l.008.016.016.032.064.13.008.016.004.008.004.008.017.032.016.033.016.033.066.131.066.133.895-.447-.067-.133c-.02-.04.012.023-.008-.017l-.008-.016c-.002-.004-.014-.03-.017-.033l-.016-.033-.016-.033-.017-.032-.004-.008-.004-.009-.008-.016-.016-.032a.075.075 0 0 0-.002-.004l-.002-.004a.075.075 0 0 1-.002-.005l-.002-.004-.008-.016-.017-.032a.075.075 0 0 0-.002-.004c0-.002 0-.003-.002-.004l-.004-.008-.004-.008-.002-.004-.002-.005-.008-.016-.008-.016-.004-.008-.002-.004-.002-.004-.008-.016-.002-.004-.002-.004-.004-.008a1.193 1.193 0 0 1-.008-.016l-.016-.032-.032-.064-.032-.063-.016-.032-.015-.032-.008-.015-.002-.004-.002-.004-.004-.008-.004-.008-.002-.004a.05.05 0 0 1-.002-.004l-.008-.016-.004-.008-.004-.007-.008-.016-.007-.016-.002-.004-.002-.004-.002-.003-.002-.004-.063-.125-.004-.008c-.008-.017.005.01-.003-.008a1.125 1.125 0 0 0-.008-.015l-.016-.031-.03-.062-.062-.123-.122-.244-.004-.008-.002-.003a.138.138 0 0 0-.001-.004l-.002-.004a.27.27 0 0 1-.006-.011l-.015-.03-.002-.004-.002-.004-.002-.004-.002-.004c-.017-.033.01.019-.007-.015l-.008-.015-.002-.003a.067.067 0 0 1-.002-.004l-.003-.008-.015-.03-.008-.015-.002-.004-.002-.003-.002-.004-.001-.004-.002-.004-.002-.003-.004-.008-.004-.008-.003-.007-.008-.015a.513.513 0 0 1-.004-.008l-.003-.007-.06-.12-.004-.007-.004-.008-.007-.015-.015-.03c-.015-.029.007.016-.008-.014a.133.133 0 0 1-.003-.008l-.004-.007-.015-.03-.894.447Zm2 3.998.12.243.008.015.008.016.015.03.016.031.015.03.062.125.063.126.064.127.002.004.002.004.004.008.004.008.004.008.008.016.004.008.002.004.002.004.004.008.004.008.004.008c0 .002 0 .003.002.004l.002.005.016.032.008.016.004.008.004.008.008.016.004.008.004.008.033.066.894-.448-.004-.008a.203.203 0 0 1-.004-.008l-.004-.008-.001-.002-.001-.002-.002-.004-.004-.008-.004-.008-.004-.009a.204.204 0 0 0-.004-.008l-.017-.032-.008-.016-.008-.016-.064-.129-.126-.253-.245-.49-.895.447Z" fill="#169FCC"/></svg>';
var icnStateNoSearchResults = '<svg width="95" height="95" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>State No Search Results</title>\n<circle opacity="0.5" cx="48" cy="47.2937" r="47" stroke="#B6B6BD" stroke-width="0.6" stroke-linecap="round" stroke-dasharray="4 4"/>\n<circle cx="46.6978" cy="47.6978" r="22.2842" stroke="#169FCC" stroke-width="1.17285"/>\n<circle cx="46.6978" cy="47.6978" r="17.5928" stroke="#169FCC" stroke-width="1.17285"/>\n<mask id="mask0_536_2029" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="17" y="40" width="47" height="43">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M39.6401 73.6552H31.3959L25.6926 81.2525L24.3896 83H17V73.6784L23.8879 64.6756H26.5015L33.2376 58.7329L42.1787 69.6542L39.6401 73.6552ZM41.057 75.3366H32.4311L31.2679 76.846L33.8951 81.0526L33.6217 83H44.7658L45.5359 81.0526L41.057 75.3366ZM38.6035 50.2249L34.6248 57.3498L54.0366 80.8466L53.4825 83H62.3859L64 75.3571L43.2262 50.2179L38.6035 50.2249ZM52.051 57.8813L56.8659 53.8974V51.3664L55.1914 48.9994L56.4275 47.7044L46.7706 40L41.1392 44.64L39.2411 48.1713H43.9546L52.051 57.8813Z" fill="#B6B6BD"/>\n</mask>\n<g mask="url(#mask0_536_2029)">\n<circle cx="46.6978" cy="47.6978" r="17.0064" fill="#E0E0E0"/>\n</g>\n<path d="M34.3828 47.6978C34.3828 40.8964 39.8964 35.3828 46.6978 35.3828" stroke="#91E1FC" stroke-width="1.17285" stroke-linecap="round"/>\n<path d="M71.9141 61.1857L61.3584 71.7414" stroke="#91E1FC" stroke-width="1.17285"/>\n<path d="M67.4485 56.4942L89.8736 78.9193C92.8508 81.8965 92.8508 86.7235 89.8736 89.7006V89.7006C86.8964 92.6778 82.0694 92.6778 79.0923 89.7006L57.1728 67.7812" stroke="#169FCC" stroke-width="1.17285"/>\n</svg>';
var icnStateUpload = '<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">\n  <title>State Upload</title>\n<circle opacity=".5" cx="48" cy="48.294" r="47" stroke="#B6B6BD" stroke-linecap="round" stroke-dasharray="4 4"/><path d="M26 78h47.938V28.5l-8.97-9.5H26v59Z" stroke="#B6B6BD"/><path d="M64.5 19v10H74" stroke="#B6B6BD"/><path stroke="#169FCC" d="M38 36.5h24M38 45.5h24M38 54.5h24M38 63.5h24"/><circle cx="73.5" cy="79.5" r="15.5" fill="#1155CB" type="secondary" /><mask id="a" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="58" y="64" width="31" height="31"><circle cx="73.5" cy="79.5" r="15.5" fill="#169FCC"/></mask><g mask="url(#a)"><path d="M65 80.088 73.5 71l8.5 9.088h-5V88h-7v-7.912h-5Z" fill="#fff"/></g></svg>';
var icnSupport = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">\n  <title>Support</title>\n  <path fill="#A3BBCC" fill-rule="evenodd" d="M3 12v1c0 .5522847.4477153 1 1 1h4c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1H4c-1.6568542 0-3-1.3431458-3-3v-1c-.5522847 0-1-.4477153-1-1V7c0-.5522847.4477153-1 1-1h.0708889C1.5561185 2.6077059 4.4735281 0 8 0s6.4438815 2.6077059 6.9291111 6H15c.5522847 0 1 .4477153 1 1v4c0 .5522847-.4477153 1-1 1h-2c-.5522847 0-1-.4477153-1-1V7c0-.5188639.3951689-.9454312.9009623-.9951576C12.439565 3.7201899 10.4206685 2 8 2 5.5793315 2 3.560435 3.7201899 3.0990377 6.0048424 3.6048311 6.0545688 4 6.4811361 4 7v4c0 .5522847-.4477153 1-1 1z"/>\n</svg>\n';
var icnTable = '<svg width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">\n  <title>Table</title>\n  <path fill-rule="evenodd" fill="#A3BBCC" clip-rule="evenodd" d="M0 2a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H2a2 2 0 01-2-2V2zm9 10h5v-2H9v2zm-2-2v2H2v-2h5zm2-2h5V6H9v2zM7 6v2H2V6h5zm2-2h5V2H9v2zM7 2v2H2V2h5z"/>\n</svg>\n';
var icnTeam = '<svg viewBox="0 0 30 30" fill="none"\n  xmlns="http://www.w3.org/2000/svg">\n  <title>Team</title>\n  <path d="M0 15C0 6.716 6.716 0 15 0c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15Z" fill="#A3BBCC"/>\n  <path d="M20.463 15.836h-2.975l1.872 1.744v4.508l4.216.017V18.56l-3.113-2.723ZM9.803 15.096l-3.627 2.723v4.27H17.64v-4.27l-3.396-2.723h-4.44ZM11.891 13.426a2.773 2.773 0 0 0 2.78-2.766 2.773 2.773 0 0 0-2.78-2.765 2.773 2.773 0 0 0-2.78 2.765 2.773 2.773 0 0 0 2.78 2.766ZM17.94 14.582a2.514 2.514 0 0 0 2.522-2.508 2.514 2.514 0 0 0-2.521-2.508 2.514 2.514 0 0 0-2.521 2.508 2.514 2.514 0 0 0 2.52 2.508Z" fill="#fff" type="secondary"/>\n</svg>\n';
var icnTeamMember = '<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">\n    <title>Team Member</title>\n    <path d="M0 15C0 6.716 6.716 0 15 0c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15Z" fill="#A3BBCC"/>\n    <path d="M12.613 15 8.5 18.115V23h13v-4.885L17.648 15h-5.035ZM15 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill="#fff" type="secondary"/>\n</svg>\n';
var icnTrash = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Delete</title>\n  <path d="M16.87 4.43h-3.56v-.18A2.26 2.26 0 0 0 11.06 2h-1.8A2.26 2.26 0 0 0 7 4.25v.18H3.44a.44.44 0 0 0-.44.44v.63a.44.44 0 0 0 .44.44h13.43a.44.44 0 0 0 .44-.44v-.63a.44.44 0 0 0-.44-.44Zm-8.51-.18a.91.91 0 0 1 .9-.9h1.8a.91.91 0 0 1 .9.9v.18h-3.6v-.18ZM13.83 15.94h-1.11V7.12h-2v8.82h-1.1V7.12H7.6v8.82H6.49V7.12h-2.2v9.06A1.82 1.82 0 0 0 6.13 18h8.07a1.82 1.82 0 0 0 1.83-1.82V7.12h-2.2v8.82Z" fill="#A3BBCC"/>\n</svg>\n';
var icnVitals = '<svg width="32" height="32" viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg">\n  <title>Vitals</title>\n  <path d="M19.593 5.493l-2.842 2.842A6.002 6.002 0 0 1 13 17.917l-.001 4.034c5.053-.502 9-4.766 9-9.951a9.96 9.96 0 0 0-2.407-6.507zM18.146 4.11A9.95 9.95 0 0 0 13 2.05v4.034c.83.14 1.604.45 2.281.893l2.865-2.865zM2.05 13A10.003 10.003 0 0 0 11 21.95v-4.033A6.005 6.005 0 0 1 6.083 13H2.049zm0-2h4.034A6.005 6.005 0 0 1 11 6.083V2.049A10.003 10.003 0 0 0 2.05 11zM12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" fill="#A3BBCC" fill-rule="evenodd"/>\n</svg>\n';
var icnVitalsChart = '<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <title>Vitals</title>\n  <path fill="#A3BBCC" d="M2.5 8.5h4v9h-4zM8 2.5h4v15H8zM13.5 5.5h4v12h-4z"/>\n</svg>\n';
var icnWarning = '<svg width="48px" height="42px" viewBox="0 0 48 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n  <title>Warning</title>\n  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n    <g id="icn-warning-64x">\n      <path d="M25.129733,2.64556484 C25.0166566,2.45204254 24.8546193,2.29069544 24.6593031,2.17754095 C24.0339615,1.81525556 23.2314423,2.02651215 22.8697255,2.64556484 L2.17517915,38.0628158 C2.06036961,38.2593042 2,38.4821557 2,38.7088951 C2,39.4200371 2.58244376,40 3.30518292,40 L44.6942755,40 C44.9262204,40 45.1538685,39.9388552 45.3538494,39.8229983 C45.9741835,39.4636139 46.1830669,38.6768553 45.8242793,38.0628158 L25.129733,2.64556484 Z M26.8565586,1.63656862 L47.5511049,37.0538196 C48.4690879,38.6248825 47.9342141,40.6394832 46.3564308,41.5535561 C45.8517121,41.8459599 45.2782053,42 44.6942755,42 L3.30518292,42 C1.4797808,42 3.66949018e-16,40.5265221 0,38.7088951 C0,38.1274525 0.154699044,37.5563885 0.448353557,37.0538196 L21.1428999,1.63656862 C22.0608829,0.0655056975 24.0841012,-0.467089888 25.6618845,0.446983085 C26.1568841,0.733756171 26.5685588,1.14367738 26.8565586,1.63656862 Z" id="Triangle" fill="#A3BBCC" fill-rule="nonzero"></path>\n      <path d="M25.129733,2.64556484 C25.0166566,2.45204254 24.8546193,2.29069544 24.6593031,2.17754095 C24.0339615,1.81525556 23.2314423,2.02651215 22.8697255,2.64556484 L2.17517915,38.0628158 C2.06036961,38.2593042 2,38.4821557 2,38.7088951 C2,39.4200371 2.58244376,40 3.30518292,40 L44.6942755,40 C44.9262204,40 45.1538685,39.9388552 45.3538494,39.8229983 C45.9741835,39.4636139 46.1830669,38.6768553 45.8242793,38.0628158 L25.129733,2.64556484 Z" id="Path" fill="#FFFFFF" fill-rule="nonzero" type="secondary"></path>\n      <path d="M23,13 L25,13 C25.5522847,13 26,13.4477153 26,14 C26,16 26,18 26,20 C26,22.6594889 25.7904331,25.0570193 25.3712994,27.192591 C25.2792336,27.6616739 24.8680521,28 24.3900199,28 L23.6099609,27.9999816 C23.1319364,27.9999816 22.7207615,27.6616608 22.6286994,27.1925851 C22.2095665,25.0570148 22,22.6594864 22,20 C22,18 22,16 22,14 C22,13.4477153 22.4477153,13 23,13 Z M24,31 C25.1045695,31 26,31.8954305 26,33 C26,34.1045695 25.1045695,35 24,35 C22.8954305,35 22,34.1045695 22,33 C22,31.8954305 22.8954305,31 24,31 Z" id="!" fill="#A3BBCC"></path>\n    </g>\n  </g>\n</svg>\n';
var icnWorkspaces = '<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16">\n  <title>Workspaces</title>\n  <path fill="#A3BBCC" fill-rule="evenodd" d="M1 0h5c.55228 0 1 .44772 1 1v5c0 .55228-.44772 1-1 1H1c-.55228 0-1-.44772-1-1V1c0-.55228.44772-1 1-1zm1 2v3h3V2H2zM1 9h5c.55228 0 1 .44772 1 1v5c0 .55228-.44772 1-1 1H1c-.55228 0-1-.44772-1-1v-5c0-.55228.44772-1 1-1zm1 2v3h3v-3H2zm8-11h5c.55228 0 1 .44772 1 1v5c0 .55228-.44772 1-1 1h-5c-.55228 0-1-.44772-1-1V1c0-.55228.44772-1 1-1zm1 2v3h3V2h-3zm-1 7h5c.55228 0 1 .44772 1 1v5c0 .55228-.44772 1-1 1h-5c-.55228 0-1-.44772-1-1v-5c0-.55228.44772-1 1-1zm1 2v3h3v-3h-3z"/>\n</svg>\n';
var icnCollapseWorkspaces = '<svg width="32" height="32" viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg">\n  <path d="M2 0h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v6h6V2H2zm0 10h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2zm0 2v6h6v-6H2zM14 0h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v6h6V2h-6zm1 10l5 5-5 5V12z" fill="#A3BBCC" fill-rule="evenodd"/>\n</svg>\n';
var allIcons = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  arrowDown: icnArrowDown,
  arrowLeft: icnArrowLeft,
  arrowRight: icnArrowRight,
  arrowUp: icnArrowDown,
  back: icnBack,
  book: icnBook,
  brain: icnBrain,
  check: icnCheck,
  chevronDown: icnChevronDown,
  chevronLeft: icnChevronLeft,
  chevronRight: icnChevronRight,
  chevronUp: icnChevronUp,
  clear: icnClear,
  clipboard: icnClipboard,
  close: icnClose,
  cogwheel: icnCogwheel,
  collapseExpand: icnCollapseExpand,
  contactSupport: icnContactSupport,
  connections: icnConnections,
  copy: icnCopy,
  dangerCircle: icnDangerCircle,
  dangerCircleOutline: icnDangerCircleOutline,
  dashboard: icnDashboard,
  decrease: icnDecrease,
  devPortal: icnDevPortal,
  disabled: icnDisabled,
  document: icnDocument,
  drag: icnDrag,
  errorFilled: icnErrorFilled,
  expand: icnExpand,
  externalLink: icnExternalLink,
  featureRequest: icnFeatureRequest,
  fileEmpty: icnFileEmpty,
  fileJson: icnFileJson,
  fileMd: icnFileMd,
  fileYaml: icnFileYaml,
  filter: icnFilter,
  forward: icnForward,
  gateway: icnGateway,
  gear: icnGear,
  gearFilled: icnGearFilled,
  grid: icnGrid,
  help: icnHelp,
  immunity: icnImmunity,
  increase: icnIncrease,
  info: icnInfo,
  kong: icnKong,
  lock: icnLock,
  list: icnList,
  more: icnMore,
  moreHorizontal: icnMoreHorizontal,
  noData: icnNoData,
  notificationBell: icnNotificationBell,
  notificationInbox: icnNotificationInbox,
  organization: icnOrganization,
  plug: icnPlug,
  plus: icnPlus,
  organizations: icnOrganizations,
  pencil: icnPencil,
  people: icnPeople,
  portal: icnPortal,
  profile: icnProfile,
  redo: icnRedo,
  runtimes: icnRuntimes,
  search: icnSearch,
  security: icnSecurity,
  serviceDocument: icnServiceDocument,
  serviceHub: icnServicehub,
  services: icnServices,
  sharedConfig: icnSharedConfig,
  spinner: icnSpinner,
  stackedCards: icnStackedCards,
  stateConfigure: icnStateConfigure,
  stateGruceo: icnStateGruceo,
  stateNoData: icnStateNoData,
  stateNoSearchResults: icnStateNoSearchResults,
  stateUpload: icnStateUpload,
  support: icnSupport,
  table: icnTable,
  team: icnTeam,
  teamMember: icnTeamMember,
  trash: icnTrash,
  vitals: icnVitals,
  vitalsChart: icnVitalsChart,
  warning: icnWarning,
  workspaces: icnWorkspaces,
  workspacesCollapsed: icnCollapseWorkspaces
});
var KIcon_vue_vue_type_style_index_0_scoped_true_lang = "";
var KIcon_vue_vue_type_style_index_1_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const icons = allIcons;
const iconNames = Object.keys(icons);
const DEFAULTS$1 = {
  size: "24",
  viewBox: "0 0 24 24"
};
const _sfc_main$N = defineComponent({
  name: "KIcon",
  inheritAttrs: false,
  props: {
    icon: {
      type: String,
      validator: (value) => {
        return iconNames.includes(value);
      },
      required: true
    },
    size: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: null
    },
    secondaryColor: {
      type: String,
      default: null
    },
    viewBox: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    hideTitle: {
      type: Boolean,
      default: false
    },
    testMode: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { attrs, slots }) {
    const svgWrapper = ref();
    const svg = ref();
    const svgWithSlotIsHidden = ref(true);
    const titleText = computed(() => {
      if (props.title) {
        return props.title;
      }
      if (props.testMode) {
        return props.icon;
      }
      const titleElems = svg.value && svg.value.getElementsByTagName("title");
      if (titleElems && titleElems.length) {
        return titleElems[0].innerHTML;
      }
      const icnName = props.icon.split(/(?=[A-Z])/).join(" ");
      return convertToTitleCase(icnName);
    });
    const width = computed(() => svg.value ? svg.value.getAttribute("width") : null);
    const height = computed(() => svg.value ? svg.value.getAttribute("height") : null);
    const setSize = computed(() => svg.value ? props.size || svg.value && svg.value.getAttribute("width") || DEFAULTS$1.size : DEFAULTS$1.size);
    const setViewbox = computed(() => svg.value ? props.viewBox || svg.value && svg.value.getAttribute("viewBox") || DEFAULTS$1.viewBox : DEFAULTS$1.viewBox);
    const convertToTitleCase = (str) => {
      return str.split("-").map((i) => i.charAt(0).toUpperCase() + i.substring(1)).join(" ");
    };
    const addSlotContent = () => {
      var _a, _b, _c, _d;
      const slotContent = (_b = (_a = svgWrapper == null ? void 0 : svgWrapper.value) == null ? void 0 : _a.querySelector(".slot-content")) == null ? void 0 : _b.innerHTML;
      (_d = svgWrapper.value) == null ? void 0 : _d.removeChild((_c = svgWrapper == null ? void 0 : svgWrapper.value) == null ? void 0 : _c.querySelector(".slot-content"));
      svg.value.innerHTML += slotContent;
      svgWithSlotIsHidden.value = false;
    };
    const setSvgTitle = () => {
      let svgTitle = svg.value.querySelector("title");
      if (svgTitle && props.hideTitle) {
        svg.value.removeChild(svgTitle);
      } else if (!props.hideTitle) {
        if (!svgTitle) {
          svgTitle = document.createElement("title");
          const svgTitleText = document.createTextNode(titleText.value);
          svgTitle.appendChild(svgTitleText);
          svg.value.append(svgTitle);
        } else {
          svgTitle.textContent = titleText.value;
        }
      }
    };
    const recursivelyCustomizeIconColors = (el) => {
      if (!el) {
        return;
      }
      const fillValue = el.hasAttribute("fill");
      const strokeValue = el.getAttribute("stroke") && el.getAttribute("stroke") !== "none" ? el.getAttribute("stroke") : null;
      const hasPreservedColor = el.attributes.id && el.attributes.id.value === "preserveColor";
      const isSecondary = el.attributes.type && el.attributes.type.value === "secondary";
      if (!hasPreservedColor && fillValue && isSecondary && props.secondaryColor) {
        el.setAttribute("fill", props.secondaryColor);
      } else if (!hasPreservedColor && !isSecondary && fillValue && !strokeValue && props.color) {
        el.setAttribute("fill", props.color);
      } else if (strokeValue && props.color) {
        el.setAttribute("stroke", props.color);
      }
      for (const child of el.children) {
        recursivelyCustomizeIconColors(child);
      }
    };
    watch(() => [props.icon, props.size, props.color, props.secondaryColor, props.viewBox, props.hideTitle], async () => {
      await nextTick();
      renderIcon();
    });
    const renderIcon = () => {
      svg.value = null;
      svg.value = svgWrapper.value ? svgWrapper.value.querySelector("svg:not(.slot-content)") : null;
      if (svg.value) {
        if (slots.svgElements) {
          addSlotContent();
        }
        for (const [attributeName, attributeValue] of Object.entries(attrs)) {
          if (!["class", "id", "style"].includes(attributeName)) {
            svg.value.setAttribute(attributeName, attributeValue);
          }
        }
        svg.value.setAttribute("role", "img");
        svg.value.setAttribute("width", setSize.value || width.value);
        svg.value.setAttribute("height", setSize.value || height.value);
        svg.value.setAttribute("viewBox", setViewbox.value);
        setSvgTitle();
        recursivelyCustomizeIconColors(svg.value);
      }
    };
    onMounted(async () => {
      await nextTick();
      renderIcon();
    });
    return {
      icons,
      svgWrapper,
      svgWithSlotIsHidden
    };
  }
});
const _hoisted_1$J = ["innerHTML"];
const _hoisted_2$v = { class: "slot-content" };
const _hoisted_3$p = ["innerHTML"];
function _sfc_render$N(_ctx, _cache, $props, $setup, $data, $options) {
  return !_ctx.$slots.svgElements ? (openBlock(), createElementBlock("span", mergeProps({ key: 0 }, _ctx.$attrs, {
    ref: "svgWrapper",
    class: [`kong-icon-${_ctx.icon}`, "kong-icon"],
    innerHTML: _ctx.icons[_ctx.icon]
  }), null, 16, _hoisted_1$J)) : (openBlock(), createElementBlock("span", mergeProps({ key: 1 }, _ctx.$attrs, {
    ref: "svgWrapper",
    class: [`kong-icon-${_ctx.icon}`, "kong-icon"]
  }), [
    (openBlock(), createElementBlock("svg", _hoisted_2$v, [
      renderSlot(_ctx.$slots, "svgElements", {}, void 0, true)
    ])),
    createElementVNode("span", {
      class: normalizeClass({ "svg-with-slot-is-hidden": _ctx.svgWithSlotIsHidden }),
      innerHTML: _ctx.icons[_ctx.icon]
    }, null, 10, _hoisted_3$p)
  ], 16));
}
var KIcon = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$N], ["__scopeId", "data-v-637de6fa"]]);
var KButton_vue_vue_type_style_index_0_scoped_true_lang = "";
var KButton_vue_vue_type_style_index_1_lang = "";
const appearances$2 = {
  primary: "primary",
  secondary: "secondary",
  danger: "danger",
  creation: "creation",
  outline: "outline",
  btnLink: "btn-link"
};
const sizes = {
  small: "small",
  medium: "medium",
  large: "large"
};
const _sfc_main$M = defineComponent({
  name: "KButton",
  components: { KIcon },
  inheritAttrs: false,
  props: {
    appearance: {
      type: String,
      default: "outline",
      validator: (value) => {
        return Object.values(appearances$2).indexOf(value) !== -1;
      }
    },
    size: {
      type: String,
      default: "medium",
      validator: (value) => {
        return Object.values(sizes).indexOf(value) !== -1;
      }
    },
    to: {
      type: [Object, String],
      default: null
    },
    type: {
      type: String,
      default: "button"
    },
    isOpen: {
      type: Boolean,
      default: void 0
    },
    isRounded: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: ""
    }
  },
  setup(props, { attrs, slots }) {
    const caretClasses = computed(() => {
      if (props.isOpen === void 0)
        return null;
      return props.isOpen ? "has-caret is-active" : "has-caret";
    });
    const hasIcon = computed(() => !!slots.icon);
    const hasText = computed(() => !!slots.default);
    const buttonType = computed(() => props.to ? "router-link" : "button");
    const iconColor = computed(() => {
      if (attrs.disabled) {
        return "var(--grey-400)";
      } else if (["primary", "danger", "creation"].includes(props.appearance)) {
        return "white";
      } else if (props.appearance === "secondary") {
        return "var(--KButtonSecondaryColor, var(--blue-600, color(blue-600)))";
      } else if (props.appearance === "outline") {
        return "var(--KButtonOutlineColor, var(--blue-500, color(blue-500)))";
      } else if (props.appearance === "btn-link") {
        return "var(--KButtonBtnLink, var(--blue-500, color(blue-500)))";
      } else if (props.appearance === "btn-link-danger") {
        return "var(--KButtonLinkDanger, var(--red-500, color(red-500)))";
      }
      return "";
    });
    const strippedAttrs = computed(() => {
      if (attrs.disabled !== void 0 && attrs.disabled !== false) {
        return attrs;
      }
      const modifiedAttrs = Object.assign({}, attrs);
      delete modifiedAttrs.disabled;
      return modifiedAttrs;
    });
    return {
      caretClasses,
      hasText,
      hasIcon,
      buttonType,
      iconColor,
      strippedAttrs
    };
  }
});
const _hoisted_1$I = ["type", "href"];
function _sfc_render$M(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KIcon = resolveComponent("KIcon");
  return typeof _ctx.to === "string" ? (openBlock(), createElementBlock("a", mergeProps({
    key: 0,
    type: _ctx.type,
    href: _ctx.to,
    class: [[_ctx.size, { "icon-btn": !_ctx.hasText && _ctx.hasIcon, "rounded": _ctx.isRounded }, _ctx.appearance], "k-button"]
  }, _ctx.strippedAttrs), [
    renderSlot(_ctx.$slots, "icon", {}, () => [
      _ctx.icon ? (openBlock(), createBlock(_component_KIcon, {
        key: 0,
        color: _ctx.iconColor,
        icon: _ctx.icon,
        class: "k-button-icon",
        size: "16"
      }, null, 8, ["color", "icon"])) : createCommentVNode("", true)
    ], true),
    renderSlot(_ctx.$slots, "default", {}, void 0, true),
    _ctx.isOpen !== void 0 ? (openBlock(), createBlock(_component_KIcon, {
      key: 0,
      class: normalizeClass([_ctx.caretClasses]),
      color: _ctx.iconColor,
      "view-box": "2 2 15 15",
      size: "16",
      icon: "chevronDown"
    }, null, 8, ["class", "color"])) : createCommentVNode("", true)
  ], 16, _hoisted_1$I)) : (openBlock(), createBlock(resolveDynamicComponent(_ctx.buttonType), mergeProps({
    key: 1,
    type: _ctx.type,
    to: _ctx.to,
    class: [[_ctx.size, { "icon-btn": !_ctx.hasText && _ctx.hasIcon, "rounded": _ctx.isRounded }, _ctx.appearance, _ctx.caretClasses], "k-button"]
  }, _ctx.strippedAttrs), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "icon", {}, () => [
        _ctx.icon ? (openBlock(), createBlock(_component_KIcon, {
          key: 0,
          color: _ctx.iconColor,
          icon: _ctx.icon,
          class: "k-button-icon",
          size: "16"
        }, null, 8, ["color", "icon"])) : createCommentVNode("", true)
      ], true),
      renderSlot(_ctx.$slots, "default", {}, void 0, true),
      _ctx.isOpen !== void 0 ? (openBlock(), createBlock(_component_KIcon, {
        key: 0,
        class: normalizeClass(["caret", _ctx.caretClasses]),
        color: _ctx.iconColor,
        "view-box": "2 2 15 15",
        size: "16",
        icon: "chevronDown"
      }, null, 8, ["class", "color"])) : createCommentVNode("", true)
    ]),
    _: 3
  }, 16, ["type", "to", "class"]));
}
var KButton = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["render", _sfc_render$M], ["__scopeId", "data-v-29e4de69"]]);
var KAlert_vue_vue_type_style_index_0_scoped_true_lang = "";
var KAlert_vue_vue_type_style_index_1_lang = "";
const appearances$1 = {
  info: "info",
  success: "success",
  danger: "danger",
  warning: "warning"
};
const _sfc_main$L = defineComponent({
  name: "KAlert",
  components: { KIcon, KButton },
  props: {
    alertMessage: {
      type: String,
      default: ""
    },
    isShowing: {
      type: Boolean,
      default: true
    },
    isFixed: {
      type: Boolean,
      default: false
    },
    isBordered: {
      type: Boolean,
      default: false
    },
    hasLeftBorder: {
      type: Boolean,
      default: false
    },
    hasRightBorder: {
      type: Boolean,
      default: false
    },
    hasTopBorder: {
      type: Boolean,
      default: false
    },
    hasBottomBorder: {
      type: Boolean,
      default: false
    },
    isCentered: {
      type: Boolean,
      default: false
    },
    iconSize: {
      type: String,
      default: "32"
    },
    icon: {
      type: String,
      default: ""
    },
    iconColor: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    appearance: {
      type: String,
      default: "info",
      validator: (value) => {
        return Object.values(appearances$1).includes(value);
      }
    },
    size: {
      type: String,
      default: "",
      validator: (value) => {
        return ["", "small", "large"].includes(value);
      }
    },
    dismissType: {
      type: String,
      default: "none",
      validator: (value) => {
        return ["none", "icon", "button"].includes(value);
      }
    },
    type: {
      type: String,
      default: "alert",
      validator: (value) => {
        return ["alert", "banner"].includes(value);
      }
    }
  },
  emits: ["closed", "proceed"],
  setup(props, { slots, emit }) {
    const hasActionButtons = computed(() => !!slots.actionButtons);
    const dismissAlert = () => {
      emit("closed");
    };
    const proceed = () => {
      emit("proceed");
    };
    return {
      hasActionButtons,
      dismissAlert,
      proceed
    };
  }
});
const _hoisted_1$H = {
  key: 0,
  class: "k-alert-title bold-600"
};
const _hoisted_2$u = {
  key: 1,
  class: "k-alert-description-text"
};
const _hoisted_3$o = /* @__PURE__ */ createTextVNode(" Dismiss ");
function _sfc_render$L(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KIcon = resolveComponent("KIcon");
  const _component_KButton = resolveComponent("KButton");
  return _ctx.isShowing ? (openBlock(), createElementBlock("div", {
    key: 0,
    class: normalizeClass([[
      _ctx.appearance,
      _ctx.size,
      _ctx.dismissType,
      { "is-bordered": _ctx.isBordered },
      { "has-left-border": _ctx.hasLeftBorder },
      { "has-right-border": _ctx.hasRightBorder },
      { "has-top-border": _ctx.hasTopBorder },
      { "has-bottom-border": _ctx.hasBottomBorder },
      { "is-centered": _ctx.isCentered },
      { "is-fixed": _ctx.isFixed },
      { "is-banner": _ctx.type === "banner" }
    ], "k-alert"]),
    role: "alert",
    onClick: _cache[1] || (_cache[1] = withModifiers(() => {
    }, ["stop"]))
  }, [
    _ctx.type === "banner" && _ctx.size !== "large" ? (openBlock(), createElementBlock("span", {
      key: 0,
      class: normalizeClass([_ctx.appearance, "k-alert-ellipse"])
    }, null, 2)) : createCommentVNode("", true),
    _ctx.icon || _ctx.$slots.icon ? (openBlock(), createElementBlock("span", {
      key: 1,
      class: normalizeClass([{
        "mr-3": _ctx.type !== "banner",
        "k-alert-icon-container-large": _ctx.size === "large"
      }, "k-alert-icon-container"])
    }, [
      renderSlot(_ctx.$slots, "icon", {}, () => [
        createVNode(_component_KIcon, {
          size: _ctx.iconSize,
          color: _ctx.iconColor,
          icon: _ctx.icon,
          class: "k-alert-icon"
        }, null, 8, ["size", "color", "icon"])
      ], true)
    ], 2)) : createCommentVNode("", true),
    createElementVNode("div", {
      class: normalizeClass([
        "k-alert-msg-text",
        { "has-dismiss-icon": _ctx.dismissType === "icon" },
        { "has-dismiss-button": _ctx.dismissType === "button" }
      ])
    }, [
      _ctx.title || _ctx.$slots.title ? (openBlock(), createElementBlock("div", _hoisted_1$H, [
        renderSlot(_ctx.$slots, "title", {}, () => [
          createTextVNode(toDisplayString(_ctx.title), 1)
        ], true)
      ])) : createCommentVNode("", true),
      createElementVNode("div", {
        class: normalizeClass([{
          "k-alert-text": _ctx.size === "large",
          "k-alert-subtext": _ctx.title || _ctx.$slots.title
        }, "k-alert-msg"])
      }, [
        renderSlot(_ctx.$slots, "alertMessage", {}, () => [
          createTextVNode(toDisplayString(_ctx.alertMessage), 1)
        ], true)
      ], 2),
      _ctx.size === "large" && (_ctx.description || _ctx.$slots.description) ? (openBlock(), createElementBlock("div", _hoisted_2$u, [
        renderSlot(_ctx.$slots, "description", {}, () => [
          createTextVNode(toDisplayString(_ctx.description), 1)
        ], true)
      ])) : createCommentVNode("", true)
    ], 2),
    _ctx.dismissType === "icon" ? (openBlock(), createElementBlock("button", {
      key: 2,
      type: "button",
      "aria-label": "Close",
      class: "close",
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.dismissAlert && _ctx.dismissAlert(...args))
    }, [
      createVNode(_component_KIcon, {
        icon: "close",
        size: "14",
        color: _ctx.appearance,
        class: normalizeClass(_ctx.appearance)
      }, null, 8, ["color", "class"])
    ])) : createCommentVNode("", true),
    _ctx.hasActionButtons || _ctx.dismissType !== "none" ? (openBlock(), createElementBlock("div", {
      key: 3,
      class: normalizeClass([_ctx.appearance, "k-alert-action"])
    }, [
      _ctx.hasActionButtons ? renderSlot(_ctx.$slots, "actionButtons", { key: 0 }, () => [
        createVNode(_component_KButton, {
          size: "small",
          onClick: _ctx.proceed,
          onKeyup: withKeys(_ctx.proceed, ["enter"])
        }, null, 8, ["onClick", "onKeyup"])
      ], true) : createCommentVNode("", true),
      _ctx.dismissType === "button" ? (openBlock(), createBlock(_component_KButton, {
        key: 1,
        size: "small",
        onClick: _ctx.dismissAlert
      }, {
        default: withCtx(() => [
          _hoisted_3$o
        ]),
        _: 1
      }, 8, ["onClick"])) : createCommentVNode("", true)
    ], 2)) : createCommentVNode("", true)
  ], 2)) : createCommentVNode("", true);
}
var KAlert = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["render", _sfc_render$L], ["__scopeId", "data-v-1910ef98"]]);
var KBadge_vue_vue_type_style_index_0_scoped_true_lang = "";
const appearances = {
  default: "default",
  success: "success",
  danger: "danger",
  info: "info",
  warning: "warning",
  custom: "custom"
};
const shapes = {
  rounded: "rounded",
  rectangular: "rectangular"
};
const _sfc_main$K = defineComponent({
  props: {
    appearance: {
      type: String,
      required: false,
      validator: (value) => {
        return Object.keys(__spreadValues({}, appearances)).includes(value);
      },
      default: "default"
    },
    shape: {
      type: String,
      required: false,
      validator: (value) => {
        return Object.keys(__spreadValues({}, shapes)).includes(value);
      },
      default: "rounded"
    },
    color: {
      type: String,
      required: false,
      default: ""
    },
    backgroundColor: {
      type: String,
      required: false,
      default: ""
    }
  }
});
function _sfc_render$K(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([[`k-badge-${_ctx.appearance}`, `k-badge-${_ctx.shape}`], "k-badge truncate"]),
    style: normalizeStyle(_ctx.color && _ctx.backgroundColor && { backgroundColor: _ctx.backgroundColor, color: _ctx.color })
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 6);
}
var KBadge = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["render", _sfc_render$K], ["__scopeId", "data-v-17d30312"]]);
var KBreadcrumbs_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$J = defineComponent({
  name: "KBreadcrumbs",
  components: { KIcon },
  inheritAttrs: false,
  props: {
    items: {
      type: Array,
      default: [],
      required: true,
      validator: (items) => {
        return items && items.length > 0;
      }
    },
    itemMaxWidth: {
      type: String,
      required: false,
      default: "38ch"
    }
  }
});
const _hoisted_1$G = ["title", "href"];
function _sfc_render$J(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KIcon = resolveComponent("KIcon");
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("ul", mergeProps({ class: "k-breadcrumbs" }, _ctx.$attrs), [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (item) => {
      return openBlock(), createElementBlock("li", {
        key: item.key || item.text,
        class: "k-breadcrumbs-item truncate"
      }, [
        typeof item.to === "object" ? (openBlock(), createBlock(_component_router_link, {
          key: 0,
          to: item.to,
          title: item.title,
          class: normalizeClass({ "no-underline": !item.text })
        }, {
          default: withCtx(() => [
            item.icon ? (openBlock(), createBlock(_component_KIcon, {
              key: 0,
              icon: item.icon,
              class: normalizeClass(["k-breadcrumb-icon", { "has-no-text": !item.text }]),
              "hide-title": "",
              size: "20",
              color: "var(--grey-500)"
            }, null, 8, ["icon", "class"])) : createCommentVNode("", true),
            item.text ? (openBlock(), createElementBlock("span", {
              key: 1,
              style: normalizeStyle({ maxWidth: item.maxWidth || _ctx.itemMaxWidth }),
              class: "k-breadcrumb-text truncate"
            }, toDisplayString(item.text), 5)) : createCommentVNode("", true)
          ]),
          _: 2
        }, 1032, ["to", "title", "class"])) : (openBlock(), createElementBlock("a", {
          key: 1,
          title: item.title,
          href: item.to,
          class: normalizeClass({ "no-underline": !item.text }),
          target: "_blank"
        }, [
          item.icon ? (openBlock(), createBlock(_component_KIcon, {
            key: 0,
            icon: item.icon,
            class: normalizeClass(["k-breadcrumb-icon", { "has-no-text": !item.text }]),
            "hide-title": "",
            size: "20",
            color: "var(--grey-500)"
          }, null, 8, ["icon", "class"])) : createCommentVNode("", true),
          item.text ? (openBlock(), createElementBlock("span", {
            key: 1,
            style: normalizeStyle({ maxWidth: item.maxWidth || _ctx.itemMaxWidth }),
            class: "k-breadcrumb-text truncate"
          }, toDisplayString(item.text), 5)) : createCommentVNode("", true)
        ], 10, _hoisted_1$G)),
        createVNode(_component_KIcon, {
          "hide-title": "",
          icon: "chevronRight",
          size: "15",
          color: "var(--grey-500)"
        })
      ]);
    }), 128))
  ], 16);
}
var KBreadcrumbs = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["render", _sfc_render$J], ["__scopeId", "data-v-a87af1c0"]]);
var index$2 = defineComponent({
  name: "Krumbs",
  setup(props, { attrs, slots, emit }) {
    onMounted(() => console.warn("The Kongponents 'Krumbs' component is deprecated and will be removed in a future release.\nUpdate all references of 'Krumbs' to 'KBreadcrumbs'.\nKongponent Docs: https://kongponents.konghq.com/components/breadcrumbs.html"));
    return () => h(KBreadcrumbs, __spreadValues(__spreadValues(__spreadValues({}, props), attrs), emit), slots);
  }
});
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function validate(uuid) {
  return typeof uuid === "string" && REGEX.test(uuid);
}
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).substr(1));
}
function stringify(arr) {
  var offset2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var uuid = (byteToHex[arr[offset2 + 0]] + byteToHex[arr[offset2 + 1]] + byteToHex[arr[offset2 + 2]] + byteToHex[arr[offset2 + 3]] + "-" + byteToHex[arr[offset2 + 4]] + byteToHex[arr[offset2 + 5]] + "-" + byteToHex[arr[offset2 + 6]] + byteToHex[arr[offset2 + 7]] + "-" + byteToHex[arr[offset2 + 8]] + byteToHex[arr[offset2 + 9]] + "-" + byteToHex[arr[offset2 + 10]] + byteToHex[arr[offset2 + 11]] + byteToHex[arr[offset2 + 12]] + byteToHex[arr[offset2 + 13]] + byteToHex[arr[offset2 + 14]] + byteToHex[arr[offset2 + 15]]).toLowerCase();
  if (!validate(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var _nodeId;
var _clockseq;
var _lastMSecs = 0;
var _lastNSecs = 0;
function v1(options, buf, offset2) {
  var i = buf && offset2 || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || rng)();
    if (node == null) {
      node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
    }
  }
  var msecs = options.msecs !== void 0 ? options.msecs : Date.now();
  var nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
  if (dt < 0 && options.clockseq === void 0) {
    clockseq = clockseq + 1 & 16383;
  }
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
    nsecs = 0;
  }
  if (nsecs >= 1e4) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;
  msecs += 122192928e5;
  var tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
  b[i++] = tl >>> 24 & 255;
  b[i++] = tl >>> 16 & 255;
  b[i++] = tl >>> 8 & 255;
  b[i++] = tl & 255;
  var tmh = msecs / 4294967296 * 1e4 & 268435455;
  b[i++] = tmh >>> 8 & 255;
  b[i++] = tmh & 255;
  b[i++] = tmh >>> 24 & 15 | 16;
  b[i++] = tmh >>> 16 & 255;
  b[i++] = clockseq >>> 8 | 128;
  b[i++] = clockseq & 255;
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || stringify(b);
}
var KCard_vue_vue_type_style_index_0_scoped_true_lang = "";
var KCard_vue_vue_type_style_index_1_lang = "";
const _sfc_main$I = defineComponent({
  name: "KCard",
  props: {
    title: {
      type: String,
      default: ""
    },
    body: {
      type: String,
      default: ""
    },
    borderVariant: {
      type: String,
      default: "border"
    },
    hasHover: {
      type: Boolean,
      default: false
    },
    hasShadow: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: ""
    },
    testMode: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const titleId = computed(() => props.testMode ? "test-title-id-1234" : v1());
    const contentId = computed(() => props.testMode ? "test-content-id-1234" : v1());
    const useStatusHatLayout = computed(() => {
      return !!(props.status || !!slots.statusHat);
    });
    return {
      titleId,
      contentId,
      useStatusHatLayout
    };
  }
});
const _hoisted_1$F = ["aria-label", "aria-labelledby", "aria-describedby"];
const _hoisted_2$t = {
  key: 0,
  class: "k-card-status-hat"
};
const _hoisted_3$n = ["id"];
const _hoisted_4$i = { class: "k-card-actions" };
const _hoisted_5$h = ["id"];
const _hoisted_6$b = { class: "k-card-content d-flex" };
const _hoisted_7$7 = ["id"];
const _hoisted_8$5 = {
  key: 0,
  class: "k-card-notifications ml-3"
};
function _sfc_render$I(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", {
    class: normalizeClass([[_ctx.borderVariant, { "hover": _ctx.hasHover, "kcard-shadow": _ctx.hasShadow }], "kong-card"]),
    "aria-label": _ctx.title ? _ctx.title : void 0,
    "aria-labelledby": !_ctx.title && (_ctx.$slots.title || _ctx.$slots.title) ? _ctx.titleId : void 0,
    "aria-describedby": _ctx.contentId
  }, [
    _ctx.$slots.actions || _ctx.useStatusHatLayout || !_ctx.useStatusHatLayout && (_ctx.title || _ctx.$slots.title) ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass([{ "has-status": _ctx.status || _ctx.$slots.statusHat }, "k-card-header d-flex mb-3"])
    }, [
      _ctx.status || _ctx.$slots.statusHat ? (openBlock(), createElementBlock("div", _hoisted_2$t, [
        renderSlot(_ctx.$slots, "statusHat", {}, () => [
          createTextVNode(toDisplayString(_ctx.status), 1)
        ], true)
      ])) : createCommentVNode("", true),
      !_ctx.useStatusHatLayout && (_ctx.title || _ctx.$slots.title) ? (openBlock(), createElementBlock("div", {
        key: 1,
        id: _ctx.title ? void 0 : _ctx.titleId,
        class: "k-card-title mb-3"
      }, [
        createElementVNode("h4", null, [
          renderSlot(_ctx.$slots, "title", {}, () => [
            createTextVNode(toDisplayString(_ctx.title), 1)
          ], true)
        ])
      ], 8, _hoisted_3$n)) : createCommentVNode("", true),
      createElementVNode("div", _hoisted_4$i, [
        renderSlot(_ctx.$slots, "actions", {}, void 0, true)
      ])
    ], 2)) : createCommentVNode("", true),
    _ctx.useStatusHatLayout && (_ctx.title || _ctx.$slots.title) ? (openBlock(), createElementBlock("div", {
      key: 1,
      id: _ctx.title ? void 0 : _ctx.titleId,
      class: "k-card-title mb-3"
    }, [
      createElementVNode("h4", null, [
        renderSlot(_ctx.$slots, "title", {}, () => [
          createTextVNode(toDisplayString(_ctx.title), 1)
        ], true)
      ])
    ], 8, _hoisted_5$h)) : createCommentVNode("", true),
    createElementVNode("div", _hoisted_6$b, [
      createElementVNode("div", {
        id: _ctx.contentId,
        class: "k-card-body"
      }, [
        renderSlot(_ctx.$slots, "body", {}, () => [
          createTextVNode(toDisplayString(_ctx.body), 1)
        ], true)
      ], 8, _hoisted_7$7),
      _ctx.$slots.notifications ? (openBlock(), createElementBlock("div", _hoisted_8$5, [
        renderSlot(_ctx.$slots, "notifications", {}, void 0, true)
      ])) : createCommentVNode("", true)
    ])
  ], 10, _hoisted_1$F);
}
var KCard = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$I], ["__scopeId", "data-v-52c90d54"]]);
var table = /* @__PURE__ */ new WeakMap();
var counter = 0;
function hash(args) {
  if (!args.length)
    return "";
  var key = "arg";
  for (var i = 0; i < args.length; ++i) {
    var _hash = void 0;
    if (args[i] === null || typeof args[i] !== "object" && typeof args[i] !== "function") {
      if (typeof args[i] === "string") {
        _hash = '"' + args[i] + '"';
      } else {
        _hash = String(args[i]);
      }
    } else {
      if (!table.has(args[i])) {
        _hash = counter;
        table.set(args[i], counter++);
      } else {
        _hash = table.get(args[i]);
      }
    }
    key += "@" + _hash;
  }
  return key;
}
function serializeKeyDefault(key) {
  if (typeof key === "function") {
    try {
      key = key();
    } catch (err) {
      key = "";
    }
  }
  if (Array.isArray(key)) {
    key = hash(key);
  } else {
    key = String(key || "");
  }
  return key;
}
var SWRVCache = function() {
  function SWRVCache2(ttl) {
    if (ttl === void 0) {
      ttl = 0;
    }
    this.items = /* @__PURE__ */ new Map();
    this.ttl = ttl;
  }
  SWRVCache2.prototype.serializeKey = function(key) {
    return serializeKeyDefault(key);
  };
  SWRVCache2.prototype.get = function(k) {
    var _key = this.serializeKey(k);
    return this.items.get(_key);
  };
  SWRVCache2.prototype.set = function(k, v, ttl) {
    var _key = this.serializeKey(k);
    var timeToLive = ttl || this.ttl;
    var now = Date.now();
    var item = {
      data: v,
      createdAt: now,
      expiresAt: timeToLive ? now + timeToLive : Infinity
    };
    this.dispatchExpire(timeToLive, item, _key);
    this.items.set(_key, item);
  };
  SWRVCache2.prototype.dispatchExpire = function(ttl, item, serializedKey) {
    var _this = this;
    ttl && setTimeout(function() {
      var current = Date.now();
      var hasExpired = current >= item.expiresAt;
      if (hasExpired)
        _this.delete(serializedKey);
    }, ttl);
  };
  SWRVCache2.prototype.delete = function(serializedKey) {
    this.items.delete(serializedKey);
  };
  return SWRVCache2;
}();
function isOnline() {
  if (typeof navigator.onLine !== "undefined") {
    return navigator.onLine;
  }
  return true;
}
function isDocumentVisible() {
  if (typeof document !== "undefined" && typeof document.visibilityState !== "undefined") {
    return document.visibilityState !== "hidden";
  }
  return true;
}
var fetcher = function(url) {
  return fetch(url).then(function(res) {
    return res.json();
  });
};
var webPreset = {
  isOnline,
  isDocumentVisible,
  fetcher
};
var __assign = globalThis && globalThis.__assign || function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __awaiter = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = globalThis && globalThis.__generator || function(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __read = globalThis && globalThis.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
var __spread = globalThis && globalThis.__spread || function() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
};
var DATA_CACHE = new SWRVCache();
var REF_CACHE = new SWRVCache();
var PROMISES_CACHE = new SWRVCache();
var defaultConfig = {
  cache: DATA_CACHE,
  refreshInterval: 0,
  ttl: 0,
  serverTTL: 1e3,
  dedupingInterval: 2e3,
  revalidateOnFocus: true,
  revalidateDebounce: 0,
  shouldRetryOnError: true,
  errorRetryInterval: 5e3,
  errorRetryCount: 5,
  fetcher: webPreset.fetcher,
  isOnline: webPreset.isOnline,
  isDocumentVisible: webPreset.isDocumentVisible
};
function setRefCache(key, theRef, ttl) {
  var refCacheItem = REF_CACHE.get(key);
  if (refCacheItem) {
    refCacheItem.data.push(theRef);
  } else {
    var gracePeriod = 5e3;
    REF_CACHE.set(key, [theRef], ttl > 0 ? ttl + gracePeriod : ttl);
  }
}
function onErrorRetry(revalidate, errorRetryCount, config) {
  if (!config.isDocumentVisible()) {
    return;
  }
  if (config.errorRetryCount && errorRetryCount > config.errorRetryCount) {
    return;
  }
  var count = Math.min(errorRetryCount || 0, config.errorRetryCount);
  var timeout = count * config.errorRetryInterval;
  setTimeout(function() {
    revalidate(null, { errorRetryCount: count + 1, shouldRetryOnError: true });
  }, timeout);
}
var mutate = function(key, res, cache, ttl) {
  if (cache === void 0) {
    cache = DATA_CACHE;
  }
  if (ttl === void 0) {
    ttl = defaultConfig.ttl;
  }
  return __awaiter(void 0, void 0, void 0, function() {
    var data, error, isValidating, err_1, newData, stateRef, refs_1;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (!isPromise(res))
            return [3, 5];
          _a.label = 1;
        case 1:
          _a.trys.push([1, 3, , 4]);
          return [4, res];
        case 2:
          data = _a.sent();
          return [3, 4];
        case 3:
          err_1 = _a.sent();
          error = err_1;
          return [3, 4];
        case 4:
          return [3, 6];
        case 5:
          data = res;
          _a.label = 6;
        case 6:
          isValidating = false;
          newData = { data, error, isValidating };
          if (typeof data !== "undefined") {
            cache.set(key, newData, ttl);
          }
          stateRef = REF_CACHE.get(key);
          if (stateRef && stateRef.data.length) {
            refs_1 = stateRef.data.filter(function(r) {
              return r.key === key;
            });
            refs_1.forEach(function(r, idx) {
              if (typeof newData.data !== "undefined") {
                r.data = newData.data;
              }
              r.error = newData.error;
              r.isValidating = newData.isValidating;
              var isLast = idx === refs_1.length - 1;
              if (!isLast) {
                delete refs_1[idx];
              }
            });
            refs_1 = refs_1.filter(Boolean);
          }
          return [2, newData];
      }
    });
  });
};
function useSWRV() {
  var _this = this;
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var key;
  var fn;
  var config = __assign({}, defaultConfig);
  var unmounted = false;
  var isHydrated = false;
  var instance = getCurrentInstance();
  var vm = instance.proxy || instance;
  var IS_SERVER = vm.$isServer;
  if (args.length >= 1) {
    key = args[0];
  }
  if (args.length >= 2) {
    fn = args[1];
  }
  if (args.length > 2) {
    config = __assign(__assign({}, config), args[2]);
  }
  var ttl = IS_SERVER ? config.serverTTL : config.ttl;
  var keyRef = typeof key === "function" ? key : ref(key);
  if (typeof fn === "undefined") {
    fn = config.fetcher;
  }
  var stateRef = null;
  if (!stateRef) {
    stateRef = reactive({
      data: void 0,
      error: void 0,
      isValidating: true,
      key: null
    });
  }
  var revalidate = function(data, opts) {
    return __awaiter(_this, void 0, void 0, function() {
      var isFirstFetch, keyVal, cacheItem, newData, fetcher2, shouldRevalidate, trigger;
      var _this2 = this;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            isFirstFetch = stateRef.data === void 0;
            keyVal = keyRef.value;
            if (!keyVal) {
              return [2];
            }
            cacheItem = config.cache.get(keyVal);
            newData = cacheItem && cacheItem.data;
            stateRef.isValidating = true;
            if (newData) {
              stateRef.data = newData.data;
              stateRef.error = newData.error;
            }
            fetcher2 = data || fn;
            if (!fetcher2 || !config.isDocumentVisible() && !isFirstFetch || (opts === null || opts === void 0 ? void 0 : opts.forceRevalidate) !== void 0 && !(opts === null || opts === void 0 ? void 0 : opts.forceRevalidate)) {
              stateRef.isValidating = false;
              return [2];
            }
            if (cacheItem) {
              shouldRevalidate = Boolean(Date.now() - cacheItem.createdAt >= config.dedupingInterval || (opts === null || opts === void 0 ? void 0 : opts.forceRevalidate));
              if (!shouldRevalidate) {
                stateRef.isValidating = false;
                return [2];
              }
            }
            trigger = function() {
              return __awaiter(_this2, void 0, void 0, function() {
                var promiseFromCache, fetcherArgs, newPromise, shouldRetryOnError;
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      promiseFromCache = PROMISES_CACHE.get(keyVal);
                      if (!!promiseFromCache)
                        return [3, 2];
                      fetcherArgs = Array.isArray(keyVal) ? keyVal : [keyVal];
                      newPromise = fetcher2.apply(void 0, __spread(fetcherArgs));
                      PROMISES_CACHE.set(keyVal, newPromise, config.dedupingInterval);
                      return [4, mutate(keyVal, newPromise, config.cache, ttl)];
                    case 1:
                      _a2.sent();
                      return [3, 4];
                    case 2:
                      return [4, mutate(keyVal, promiseFromCache.data, config.cache, ttl)];
                    case 3:
                      _a2.sent();
                      _a2.label = 4;
                    case 4:
                      stateRef.isValidating = false;
                      PROMISES_CACHE.delete(keyVal);
                      if (stateRef.error !== void 0) {
                        shouldRetryOnError = config.shouldRetryOnError && (opts ? opts.shouldRetryOnError : true);
                        if (shouldRetryOnError) {
                          onErrorRetry(revalidate, opts ? opts.errorRetryCount : 1, config);
                        }
                      }
                      return [2];
                  }
                });
              });
            };
            if (!(newData && config.revalidateDebounce))
              return [3, 2];
            return [4, setTimeout(function() {
              return __awaiter(_this2, void 0, void 0, function() {
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      if (!!unmounted)
                        return [3, 2];
                      return [4, trigger()];
                    case 1:
                      _a2.sent();
                      _a2.label = 2;
                    case 2:
                      return [2];
                  }
                });
              });
            }, config.revalidateDebounce)];
          case 1:
            _a.sent();
            return [3, 4];
          case 2:
            return [4, trigger()];
          case 3:
            _a.sent();
            _a.label = 4;
          case 4:
            return [2];
        }
      });
    });
  };
  var revalidateCall = function() {
    return __awaiter(_this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2, revalidate(null, { shouldRetryOnError: false })];
      });
    });
  };
  var timer = null;
  onMounted(function() {
    var tick = function() {
      return __awaiter(_this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (!(!stateRef.error && config.isOnline()))
                return [3, 2];
              return [4, revalidate()];
            case 1:
              _a.sent();
              return [3, 3];
            case 2:
              if (timer) {
                clearTimeout(timer);
              }
              _a.label = 3;
            case 3:
              if (config.refreshInterval && !unmounted) {
                timer = setTimeout(tick, config.refreshInterval);
              }
              return [2];
          }
        });
      });
    };
    if (config.refreshInterval) {
      timer = setTimeout(tick, config.refreshInterval);
    }
    if (config.revalidateOnFocus) {
      document.addEventListener("visibilitychange", revalidateCall, false);
      window.addEventListener("focus", revalidateCall, false);
    }
  });
  onUnmounted(function() {
    unmounted = true;
    if (timer) {
      clearTimeout(timer);
    }
    if (config.revalidateOnFocus) {
      document.removeEventListener("visibilitychange", revalidateCall, false);
      window.removeEventListener("focus", revalidateCall, false);
    }
  });
  try {
    watch(keyRef, function(val) {
      keyRef.value = val;
      stateRef.key = val;
      setRefCache(keyRef.value, stateRef, ttl);
      if (!IS_SERVER && !isHydrated && keyRef.value) {
        revalidate();
      }
      isHydrated = false;
    }, {
      immediate: true
    });
  } catch (_a) {
  }
  var res = __assign(__assign({}, toRefs(stateRef)), { mutate: function(data, opts) {
    return revalidate(data, __assign(__assign({}, opts), { forceRevalidate: true }));
  } });
  return res;
}
function isPromise(p) {
  return p !== null && typeof p === "object" && typeof p.then === "function";
}
const swrvState = {
  VALIDATING: "VALIDATING",
  VALIDATING_HAS_DATA: "VALIDATING_HAS_DATA",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  SUCCESS_HAS_DATA: "SUCCESS_HAS_DATA",
  ERROR: "ERROR",
  STALE_IF_ERROR: "STALE_IF_ERROR"
};
function useUtilities() {
  const useRequest2 = (key, fn, config) => {
    const { data: response, error, isValidating, mutate: revalidate } = useSWRV(key, fn, __spreadValues({ revalidateDebounce: 500, dedupingInterval: 100 }, config));
    const data = computed(() => {
      var _a;
      return (_a = response.value) == null ? void 0 : _a.data;
    });
    return {
      data,
      response,
      error,
      isValidating,
      revalidate
    };
  };
  const useDebounce2 = (initialQuery, delay = 300) => {
    let timeout;
    const query = ref(initialQuery);
    function search(q) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        query.value = q;
      }, delay);
    }
    return {
      query,
      search
    };
  };
  const clientSideSorter2 = (key, previousKey, sortOrder, items) => {
    let comparator = null;
    const numberComparator = (a, b) => {
      if (a && b) {
        return a - b;
      }
      return 0;
    };
    const stringComparator = (a, b) => {
      return a.localeCompare(b);
    };
    if (key !== previousKey) {
      comparator = (a, b) => {
        const transformer = (val) => {
          if (val === void 0 || val === null) {
            return "";
          }
          if (typeof val === "number") {
            return val;
          }
          if (Array.isArray(val) && val.length && typeof val[0] === "number") {
            return val[0];
          }
          return String(val);
        };
        const newValA = transformer(a[key]);
        const newValB = transformer(b[key]);
        switch (typeof newValA) {
          case "number":
            return numberComparator(newValA, newValB);
          default:
            return stringComparator(newValA, newValB);
        }
      };
      items.sort(comparator);
      previousKey = key;
      sortOrder = "ascending";
    } else {
      items.reverse();
      if (sortOrder === "descending" || sortOrder === "desc") {
        sortOrder = "ascending";
      } else {
        sortOrder = "descending";
      }
    }
    return { previousKey, sortOrder };
  };
  const useSwrvStates = (response, error, isValidating) => {
    const state = ref(swrvState.PENDING);
    watchEffect(() => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      const hasData = ((_b = (_a = response.value) == null ? void 0 : _a.data) == null ? void 0 : _b.length) || ((_e = (_d = (_c = response.value) == null ? void 0 : _c.data) == null ? void 0 : _d.data) == null ? void 0 : _e.length) || !((_g = (_f = response.value) == null ? void 0 : _f.data) == null ? void 0 : _g.data) && typeof ((_h = response.value) == null ? void 0 : _h.data) === "object" && Object.keys((_i = response.value) == null ? void 0 : _i.data).length;
      if (response.value && hasData && isValidating.value) {
        state.value = swrvState.VALIDATING_HAS_DATA;
        return;
      }
      if (response.value && isValidating.value) {
        state.value = swrvState.VALIDATING;
        return;
      }
      if (response.value && error.value) {
        state.value = swrvState.STALE_IF_ERROR;
        return;
      }
      if (response.value === void 0 && !error.value) {
        state.value = swrvState.PENDING;
        return;
      }
      if (response.value && !error.value && hasData) {
        state.value = swrvState.SUCCESS_HAS_DATA;
        return;
      }
      if (response.value && !error.value) {
        state.value = swrvState.SUCCESS;
        return;
      }
      if (response.value === void 0 && error) {
        state.value = swrvState.ERROR;
      }
    });
    return {
      state,
      swrvState
    };
  };
  const getSizeFromString2 = (sizeStr) => {
    return sizeStr === "auto" || sizeStr.endsWith("%") || sizeStr.endsWith("vw") || sizeStr.endsWith("vh") || sizeStr.endsWith("px") ? sizeStr : sizeStr + "px";
  };
  return {
    useRequest: useRequest2,
    useDebounce: useDebounce2,
    clientSideSorter: clientSideSorter2,
    useSwrvStates,
    getSizeFromString: getSizeFromString2
  };
}
var KEmptyState_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$H = defineComponent({
  name: "KEmptyState",
  components: { KButton, KIcon },
  props: {
    isError: {
      type: Boolean,
      default: false
    },
    iconSize: {
      type: String,
      default: "50"
    },
    icon: {
      type: String,
      default: ""
    },
    ctaIsHidden: {
      type: Boolean,
      default: false
    },
    ctaText: {
      type: String,
      default: ""
    },
    handleClick: {
      type: Function,
      default: null
    },
    iconColor: {
      type: String,
      default: ""
    }
  }
});
const _hoisted_1$E = { class: "empty-state-title" };
const _hoisted_2$s = { class: "k-empty-state-title-header mt-4 mb-4" };
const _hoisted_3$m = { class: "empty-state-content" };
const _hoisted_4$h = { class: "k-empty-state-message mb-6" };
const _hoisted_5$g = { class: "k-empty-state-cta" };
function _sfc_render$H(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KIcon = resolveComponent("KIcon");
  const _component_KButton = resolveComponent("KButton");
  return openBlock(), createElementBlock("section", {
    class: normalizeClass([{ "is-error": _ctx.isError }, "empty-state-wrapper"])
  }, [
    createElementVNode("div", _hoisted_1$E, [
      _ctx.isError || _ctx.icon ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass([{ "warning-icon": _ctx.isError }, "k-empty-state-icon card-icon mb-3"])
      }, [
        createVNode(_component_KIcon, {
          size: _ctx.iconSize,
          icon: _ctx.icon ? _ctx.icon : "warning",
          color: _ctx.isError ? _ctx.iconColor || "var(--black-70)" : _ctx.iconColor,
          "secondary-color": _ctx.isError ? "var(--yellow-400)" : void 0
        }, null, 8, ["size", "icon", "color", "secondary-color"])
      ], 2)) : createCommentVNode("", true),
      createElementVNode("div", _hoisted_2$s, [
        renderSlot(_ctx.$slots, "title", {}, void 0, true)
      ])
    ]),
    createElementVNode("div", _hoisted_3$m, [
      createElementVNode("div", _hoisted_4$h, [
        renderSlot(_ctx.$slots, "message", {}, void 0, true)
      ]),
      createElementVNode("div", _hoisted_5$g, [
        renderSlot(_ctx.$slots, "cta", {}, () => [
          !_ctx.ctaIsHidden && _ctx.ctaText ? (openBlock(), createBlock(_component_KButton, {
            key: 0,
            appearance: "primary",
            size: "small",
            onClick: _cache[0] || (_cache[0] = withModifiers(() => _ctx.handleClick && _ctx.handleClick(), ["prevent"]))
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.ctaText), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ], true)
      ])
    ])
  ], 2);
}
var KEmptyState = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$H], ["__scopeId", "data-v-5b55eb64"]]);
/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && typeof navigator !== "undefined";
var timeoutDuration = function() {
  var longerTimeoutBrowsers = ["Edge", "Trident", "Firefox"];
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      return 1;
    }
  }
  return 0;
}();
function microtaskDebounce(fn) {
  var called = false;
  return function() {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function() {
      called = false;
      fn();
    });
  };
}
function taskDebounce(fn) {
  var scheduled = false;
  return function() {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function() {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}
var supportsMicroTasks = isBrowser && window.Promise;
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === "[object Function]";
}
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  var window2 = element.ownerDocument.defaultView;
  var css = window2.getComputedStyle(element, null);
  return property ? css[property] : css;
}
function getParentNode(element) {
  if (element.nodeName === "HTML") {
    return element;
  }
  return element.parentNode || element.host;
}
function getScrollParent(element) {
  if (!element) {
    return document.body;
  }
  switch (element.nodeName) {
    case "HTML":
    case "BODY":
      return element.ownerDocument.body;
    case "#document":
      return element.body;
  }
  var _getStyleComputedProp = getStyleComputedProperty(element), overflow = _getStyleComputedProp.overflow, overflowX = _getStyleComputedProp.overflowX, overflowY = _getStyleComputedProp.overflowY;
  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }
  return getScrollParent(getParentNode(element));
}
function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
}
var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }
  var noOffsetParent = isIE(10) ? document.body : null;
  var offsetParent = element.offsetParent || null;
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }
  var nodeName = offsetParent && offsetParent.nodeName;
  if (!nodeName || nodeName === "BODY" || nodeName === "HTML") {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }
  if (["TH", "TD", "TABLE"].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, "position") === "static") {
    return getOffsetParent(offsetParent);
  }
  return offsetParent;
}
function isOffsetContainer(element) {
  var nodeName = element.nodeName;
  if (nodeName === "BODY") {
    return false;
  }
  return nodeName === "HTML" || getOffsetParent(element.firstElementChild) === element;
}
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }
  return node;
}
function findCommonOffsetParent(element1, element2) {
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;
  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }
    return getOffsetParent(commonAncestorContainer);
  }
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "top";
  var upperSide = side === "top" ? "scrollTop" : "scrollLeft";
  var nodeName = element.nodeName;
  if (nodeName === "BODY" || nodeName === "HTML") {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }
  return element[upperSide];
}
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var scrollTop = getScroll(element, "top");
  var scrollLeft = getScroll(element, "left");
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}
function getBordersSize(styles2, axis) {
  var sideA = axis === "x" ? "Left" : "Top";
  var sideB = sideA === "Left" ? "Right" : "Bottom";
  return parseFloat(styles2["border" + sideA + "Width"]) + parseFloat(styles2["border" + sideB + "Width"]);
}
function getSize(axis, body, html, computedStyle) {
  return Math.max(body["offset" + axis], body["scroll" + axis], html["client" + axis], html["offset" + axis], html["scroll" + axis], isIE(10) ? parseInt(html["offset" + axis]) + parseInt(computedStyle["margin" + (axis === "Height" ? "Top" : "Left")]) + parseInt(computedStyle["margin" + (axis === "Height" ? "Bottom" : "Right")]) : 0);
}
function getWindowSizes(document2) {
  var body = document2.body;
  var html = document2.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);
  return {
    height: getSize("Height", body, html, computedStyle),
    width: getSize("Width", body, html, computedStyle)
  };
}
var classCallCheck = function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
var createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
var defineProperty = function(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
};
var _extends = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}
function getBoundingClientRect(element) {
  var rect = {};
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, "top");
      var scrollLeft = getScroll(element, "left");
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {
  }
  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };
  var sizes2 = element.nodeName === "HTML" ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes2.width || element.clientWidth || result.width;
  var height = sizes2.height || element.clientHeight || result.height;
  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;
  if (horizScrollbar || vertScrollbar) {
    var styles2 = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles2, "x");
    vertScrollbar -= getBordersSize(styles2, "y");
    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }
  return getClientRect(result);
}
function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var isIE102 = isIE(10);
  var isHTML = parent.nodeName === "HTML";
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);
  var styles2 = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles2.borderTopWidth);
  var borderLeftWidth = parseFloat(styles2.borderLeftWidth);
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;
  if (!isIE102 && isHTML) {
    var marginTop = parseFloat(styles2.marginTop);
    var marginLeft = parseFloat(styles2.marginLeft);
    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }
  if (isIE102 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== "BODY") {
    offsets = includeScroll(offsets, parent);
  }
  return offsets;
}
function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);
  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, "left") : 0;
  var offset2 = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width,
    height
  };
  return getClientRect(offset2);
}
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === "BODY" || nodeName === "HTML") {
    return false;
  }
  if (getStyleComputedProperty(element, "position") === "fixed") {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}
function getFixedPositionOffsetParent(element) {
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, "transform") === "none") {
    el = el.parentElement;
  }
  return el || document.documentElement;
}
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  if (boundariesElement === "viewport") {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    var boundariesNode = void 0;
    if (boundariesElement === "scrollParent") {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === "BODY") {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === "window") {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }
    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);
    if (boundariesNode.nodeName === "HTML" && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument), height = _getWindowSizes.height, width = _getWindowSizes.width;
      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      boundaries = offsets;
    }
  }
  padding = padding || 0;
  var isPaddingNumber = typeof padding === "number";
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;
  return boundaries;
}
function getArea(_ref) {
  var width = _ref.width, height = _ref.height;
  return width * height;
}
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0;
  if (placement.indexOf("auto") === -1) {
    return placement;
  }
  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };
  var sortedAreas = Object.keys(rects).map(function(key) {
    return _extends({
      key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function(a, b) {
    return b.area - a.area;
  });
  var filteredAreas = sortedAreas.filter(function(_ref2) {
    var width = _ref2.width, height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });
  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
  var variation = placement.split("-")[1];
  return computedPlacement + (variation ? "-" + variation : "");
}
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}
function getOuterSizes(element) {
  var window2 = element.ownerDocument.defaultView;
  var styles2 = window2.getComputedStyle(element);
  var x = parseFloat(styles2.marginTop || 0) + parseFloat(styles2.marginBottom || 0);
  var y = parseFloat(styles2.marginLeft || 0) + parseFloat(styles2.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}
function getOppositePlacement(placement) {
  var hash2 = { left: "right", right: "left", bottom: "top", top: "bottom" };
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash2[matched];
  });
}
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split("-")[0];
  var popperRect = getOuterSizes(popper);
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };
  var isHoriz = ["right", "left"].indexOf(placement) !== -1;
  var mainSide = isHoriz ? "top" : "left";
  var secondarySide = isHoriz ? "left" : "top";
  var measurement = isHoriz ? "height" : "width";
  var secondaryMeasurement = !isHoriz ? "height" : "width";
  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }
  return popperOffsets;
}
function find(arr, check) {
  if (Array.prototype.find) {
    return arr.find(check);
  }
  return arr.filter(check)[0];
}
function findIndex(arr, prop, value) {
  if (Array.prototype.findIndex) {
    return arr.findIndex(function(cur) {
      return cur[prop] === value;
    });
  }
  var match = find(arr, function(obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}
function runModifiers(modifiers2, data, ends) {
  var modifiersToRun = ends === void 0 ? modifiers2 : modifiers2.slice(0, findIndex(modifiers2, "name", ends));
  modifiersToRun.forEach(function(modifier) {
    if (modifier["function"]) {
      console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
    }
    var fn = modifier["function"] || modifier.fn;
    if (modifier.enabled && isFunction(fn)) {
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);
      data = fn(data, modifier);
    }
  });
  return data;
}
function update() {
  if (this.state.isDestroyed) {
    return;
  }
  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);
  data.originalPlacement = data.placement;
  data.positionFixed = this.options.positionFixed;
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute";
  data = runModifiers(this.modifiers, data);
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}
function isModifierEnabled(modifiers2, modifierName) {
  return modifiers2.some(function(_ref) {
    var name = _ref.name, enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}
function getSupportedPropertyName(property) {
  var prefixes = [false, "ms", "Webkit", "Moz", "O"];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? "" + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== "undefined") {
      return toCheck;
    }
  }
  return null;
}
function destroy() {
  this.state.isDestroyed = true;
  if (isModifierEnabled(this.modifiers, "applyStyle")) {
    this.popper.removeAttribute("x-placement");
    this.popper.style.position = "";
    this.popper.style.top = "";
    this.popper.style.left = "";
    this.popper.style.right = "";
    this.popper.style.bottom = "";
    this.popper.style.willChange = "";
    this.popper.style[getSupportedPropertyName("transform")] = "";
  }
  this.disableEventListeners();
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}
function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === "BODY";
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });
  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}
function setupEventListeners(reference, options, state, updateBound) {
  state.updateBound = updateBound;
  getWindow(reference).addEventListener("resize", state.updateBound, { passive: true });
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, "scroll", state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;
  return state;
}
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}
function removeEventListeners(reference, state) {
  getWindow(reference).removeEventListener("resize", state.updateBound);
  state.scrollParents.forEach(function(target) {
    target.removeEventListener("scroll", state.updateBound);
  });
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}
function isNumeric(n) {
  return n !== "" && !isNaN(parseFloat(n)) && isFinite(n);
}
function setStyles(element, styles2) {
  Object.keys(styles2).forEach(function(prop) {
    var unit = "";
    if (["width", "height", "top", "right", "bottom", "left"].indexOf(prop) !== -1 && isNumeric(styles2[prop])) {
      unit = "px";
    }
    element.style[prop] = styles2[prop] + unit;
  });
}
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function(prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}
function applyStyle(data) {
  setStyles(data.instance.popper, data.styles);
  setAttributes(data.instance.popper, data.attributes);
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }
  return data;
}
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
  popper.setAttribute("x-placement", placement);
  setStyles(popper, { position: options.positionFixed ? "fixed" : "absolute" });
  return options;
}
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
  var round = Math.round, floor = Math.floor;
  var noRound = function noRound2(v) {
    return v;
  };
  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);
  var isVertical = ["left", "right"].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf("-") !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;
  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;
  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}
var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);
function computeStyle(data, options) {
  var x = options.x, y = options.y;
  var popper = data.offsets.popper;
  var legacyGpuAccelerationOption = find(data.instance.modifiers, function(modifier) {
    return modifier.name === "applyStyle";
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== void 0) {
    console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== void 0 ? legacyGpuAccelerationOption : options.gpuAcceleration;
  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);
  var styles2 = {
    position: popper.position
  };
  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);
  var sideA = x === "bottom" ? "top" : "bottom";
  var sideB = y === "right" ? "left" : "right";
  var prefixedProperty = getSupportedPropertyName("transform");
  var left = void 0, top = void 0;
  if (sideA === "bottom") {
    if (offsetParent.nodeName === "HTML") {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === "right") {
    if (offsetParent.nodeName === "HTML") {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles2[prefixedProperty] = "translate3d(" + left + "px, " + top + "px, 0)";
    styles2[sideA] = 0;
    styles2[sideB] = 0;
    styles2.willChange = "transform";
  } else {
    var invertTop = sideA === "bottom" ? -1 : 1;
    var invertLeft = sideB === "right" ? -1 : 1;
    styles2[sideA] = top * invertTop;
    styles2[sideB] = left * invertLeft;
    styles2.willChange = sideA + ", " + sideB;
  }
  var attributes = {
    "x-placement": data.placement
  };
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles2, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);
  return data;
}
function isModifierRequired(modifiers2, requestingName, requestedName) {
  var requesting = find(modifiers2, function(_ref) {
    var name = _ref.name;
    return name === requestingName;
  });
  var isRequired = !!requesting && modifiers2.some(function(modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });
  if (!isRequired) {
    var _requesting = "`" + requestingName + "`";
    var requested = "`" + requestedName + "`";
    console.warn(requested + " modifier is required by " + _requesting + " modifier in order to work, be sure to include it before " + _requesting + "!");
  }
  return isRequired;
}
function arrow(data, options) {
  var _data$offsets$arrow;
  if (!isModifierRequired(data.instance.modifiers, "arrow", "keepTogether")) {
    return data;
  }
  var arrowElement = options.element;
  if (typeof arrowElement === "string") {
    arrowElement = data.instance.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return data;
    }
  } else {
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn("WARNING: `arrow.element` must be child of its popper element!");
      return data;
    }
  }
  var placement = data.placement.split("-")[0];
  var _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
  var isVertical = ["left", "right"].indexOf(placement) !== -1;
  var len = isVertical ? "height" : "width";
  var sideCapitalized = isVertical ? "Top" : "Left";
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? "left" : "top";
  var opSide = isVertical ? "bottom" : "right";
  var arrowElementSize = getOuterSizes(arrowElement)[len];
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css["margin" + sideCapitalized]);
  var popperBorderSide = parseFloat(css["border" + sideCapitalized + "Width"]);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ""), _data$offsets$arrow);
  return data;
}
function getOppositeVariation(variation) {
  if (variation === "end") {
    return "start";
  } else if (variation === "start") {
    return "end";
  }
  return variation;
}
var placements$1 = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"];
var validPlacements = placements$1.slice(3);
function clockwise(placement) {
  var counter2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var index2 = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index2 + 1).concat(validPlacements.slice(0, index2));
  return counter2 ? arr.reverse() : arr;
}
var BEHAVIORS = {
  FLIP: "flip",
  CLOCKWISE: "clockwise",
  COUNTERCLOCKWISE: "counterclockwise"
};
function flip(data, options) {
  if (isModifierEnabled(data.instance.modifiers, "inner")) {
    return data;
  }
  if (data.flipped && data.placement === data.originalPlacement) {
    return data;
  }
  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);
  var placement = data.placement.split("-")[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split("-")[1] || "";
  var flipOrder = [];
  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }
  flipOrder.forEach(function(step, index2) {
    if (placement !== step || flipOrder.length === index2 + 1) {
      return data;
    }
    placement = data.placement.split("-")[0];
    placementOpposite = getOppositePlacement(placement);
    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;
    var floor = Math.floor;
    var overlapsRef = placement === "left" && floor(popperOffsets.right) > floor(refOffsets.left) || placement === "right" && floor(popperOffsets.left) < floor(refOffsets.right) || placement === "top" && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === "bottom" && floor(popperOffsets.top) < floor(refOffsets.bottom);
    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
    var overflowsBoundaries = placement === "left" && overflowsLeft || placement === "right" && overflowsRight || placement === "top" && overflowsTop || placement === "bottom" && overflowsBottom;
    var isVertical = ["top", "bottom"].indexOf(placement) !== -1;
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === "start" && overflowsLeft || isVertical && variation === "end" && overflowsRight || !isVertical && variation === "start" && overflowsTop || !isVertical && variation === "end" && overflowsBottom);
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === "start" && overflowsRight || isVertical && variation === "end" && overflowsLeft || !isVertical && variation === "start" && overflowsBottom || !isVertical && variation === "end" && overflowsTop);
    var flippedVariation = flippedVariationByRef || flippedVariationByContent;
    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      data.flipped = true;
      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index2 + 1];
      }
      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }
      data.placement = placement + (variation ? "-" + variation : "");
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
      data = runModifiers(data.instance.modifiers, data, "flip");
    }
  });
  return data;
}
function keepTogether(data) {
  var _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
  var placement = data.placement.split("-")[0];
  var floor = Math.floor;
  var isVertical = ["top", "bottom"].indexOf(placement) !== -1;
  var side = isVertical ? "right" : "bottom";
  var opSide = isVertical ? "left" : "top";
  var measurement = isVertical ? "width" : "height";
  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }
  return data;
}
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];
  if (!value) {
    return str;
  }
  if (unit.indexOf("%") === 0) {
    var element = void 0;
    switch (unit) {
      case "%p":
        element = popperOffsets;
        break;
      case "%":
      case "%r":
      default:
        element = referenceOffsets;
    }
    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === "vh" || unit === "vw") {
    var size = void 0;
    if (unit === "vh") {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    return value;
  }
}
function parseOffset(offset2, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];
  var useHeight = ["right", "left"].indexOf(basePlacement) !== -1;
  var fragments = offset2.split(/(\+|\-)/).map(function(frag) {
    return frag.trim();
  });
  var divider = fragments.indexOf(find(fragments, function(frag) {
    return frag.search(/,|\s/) !== -1;
  }));
  if (fragments[divider] && fragments[divider].indexOf(",") === -1) {
    console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
  }
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];
  ops = ops.map(function(op, index2) {
    var measurement = (index2 === 1 ? !useHeight : useHeight) ? "height" : "width";
    var mergeWithPrevious = false;
    return op.reduce(function(a, b) {
      if (a[a.length - 1] === "" && ["+", "-"].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, []).map(function(str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });
  ops.forEach(function(op, index2) {
    op.forEach(function(frag, index22) {
      if (isNumeric(frag)) {
        offsets[index2] += frag * (op[index22 - 1] === "-" ? -1 : 1);
      }
    });
  });
  return offsets;
}
function offset(data, _ref) {
  var offset2 = _ref.offset;
  var placement = data.placement, _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
  var basePlacement = placement.split("-")[0];
  var offsets = void 0;
  if (isNumeric(+offset2)) {
    offsets = [+offset2, 0];
  } else {
    offsets = parseOffset(offset2, popper, reference, basePlacement);
  }
  if (basePlacement === "left") {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === "right") {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === "top") {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === "bottom") {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }
  data.popper = popper;
  return data;
}
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }
  var transformProp = getSupportedPropertyName("transform");
  var popperStyles = data.instance.popper.style;
  var top = popperStyles.top, left = popperStyles.left, transform = popperStyles[transformProp];
  popperStyles.top = "";
  popperStyles.left = "";
  popperStyles[transformProp] = "";
  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;
  options.boundaries = boundaries;
  var order = options.priority;
  var popper = data.offsets.popper;
  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === "right" ? "left" : "top";
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === "right" ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };
  order.forEach(function(placement) {
    var side = ["left", "top"].indexOf(placement) !== -1 ? "primary" : "secondary";
    popper = _extends({}, popper, check[side](placement));
  });
  data.offsets.popper = popper;
  return data;
}
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split("-")[0];
  var shiftvariation = placement.split("-")[1];
  if (shiftvariation) {
    var _data$offsets = data.offsets, reference = _data$offsets.reference, popper = _data$offsets.popper;
    var isVertical = ["bottom", "top"].indexOf(basePlacement) !== -1;
    var side = isVertical ? "left" : "top";
    var measurement = isVertical ? "width" : "height";
    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };
    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }
  return data;
}
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, "hide", "preventOverflow")) {
    return data;
  }
  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function(modifier) {
    return modifier.name === "preventOverflow";
  }).boundaries;
  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    if (data.hide === true) {
      return data;
    }
    data.hide = true;
    data.attributes["x-out-of-boundaries"] = "";
  } else {
    if (data.hide === false) {
      return data;
    }
    data.hide = false;
    data.attributes["x-out-of-boundaries"] = false;
  }
  return data;
}
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split("-")[0];
  var _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
  var isHoriz = ["left", "right"].indexOf(basePlacement) !== -1;
  var subtractLength = ["top", "left"].indexOf(basePlacement) === -1;
  popper[isHoriz ? "left" : "top"] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? "width" : "height"] : 0);
  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);
  return data;
}
var modifiers = {
  shift: {
    order: 100,
    enabled: true,
    fn: shift
  },
  offset: {
    order: 200,
    enabled: true,
    fn: offset,
    offset: 0
  },
  preventOverflow: {
    order: 300,
    enabled: true,
    fn: preventOverflow,
    priority: ["left", "right", "top", "bottom"],
    padding: 5,
    boundariesElement: "scrollParent"
  },
  keepTogether: {
    order: 400,
    enabled: true,
    fn: keepTogether
  },
  arrow: {
    order: 500,
    enabled: true,
    fn: arrow,
    element: "[x-arrow]"
  },
  flip: {
    order: 600,
    enabled: true,
    fn: flip,
    behavior: "flip",
    padding: 5,
    boundariesElement: "viewport",
    flipVariations: false,
    flipVariationsByContent: false
  },
  inner: {
    order: 700,
    enabled: false,
    fn: inner
  },
  hide: {
    order: 800,
    enabled: true,
    fn: hide
  },
  computeStyle: {
    order: 850,
    enabled: true,
    fn: computeStyle,
    gpuAcceleration: true,
    x: "bottom",
    y: "right"
  },
  applyStyle: {
    order: 900,
    enabled: true,
    fn: applyStyle,
    onLoad: applyStyleOnLoad,
    gpuAcceleration: void 0
  }
};
var Defaults = {
  placement: "bottom",
  positionFixed: false,
  eventsEnabled: true,
  removeOnDestroy: false,
  onCreate: function onCreate() {
  },
  onUpdate: function onUpdate() {
  },
  modifiers
};
var Popper = function() {
  function Popper2(reference, popper) {
    var _this = this;
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    classCallCheck(this, Popper2);
    this.scheduleUpdate = function() {
      return requestAnimationFrame(_this.update);
    };
    this.update = debounce(this.update.bind(this));
    this.options = _extends({}, Popper2.Defaults, options);
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper2.Defaults.modifiers, options.modifiers)).forEach(function(name) {
      _this.options.modifiers[name] = _extends({}, Popper2.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });
    this.modifiers = Object.keys(this.options.modifiers).map(function(name) {
      return _extends({
        name
      }, _this.options.modifiers[name]);
    }).sort(function(a, b) {
      return a.order - b.order;
    });
    this.modifiers.forEach(function(modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });
    this.update();
    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      this.enableEventListeners();
    }
    this.state.eventsEnabled = eventsEnabled;
  }
  createClass(Popper2, [{
    key: "update",
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: "destroy",
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: "enableEventListeners",
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: "disableEventListeners",
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }
  }]);
  return Popper2;
}();
Popper.Utils = (typeof window !== "undefined" ? window : global).PopperUtils;
Popper.placements = placements$1;
Popper.Defaults = Defaults;
var Popper$1 = Popper;
var KPop_vue_vue_type_style_index_0_scoped_true_lang = "";
var KPop_vue_vue_type_style_index_1_lang = "";
const { getSizeFromString: getSizeFromString$3 } = useUtilities();
const placements = {
  auto: "auto",
  top: "top",
  topStart: "top-start",
  topEnd: "top-end",
  left: "left",
  leftStart: "left-start",
  leftEnd: "left-end",
  right: "right",
  rightStart: "right-start",
  rightEnd: "right-end",
  bottom: "bottom",
  bottomStart: "bottom-start",
  bottomEnd: "bottom-end"
};
const _sfc_main$G = defineComponent({
  name: "KPop",
  components: { KButton },
  expose: ["updatePopper"],
  props: {
    target: {
      type: String,
      default: ""
    },
    tag: {
      type: String,
      default: "div"
    },
    buttonText: {
      type: String,
      default: "OK"
    },
    title: {
      type: String,
      default: ""
    },
    placement: {
      type: String,
      validator: (value) => {
        return Object.keys(placements).includes(value);
      },
      default: "auto"
    },
    trigger: {
      type: String,
      default: "click",
      validator: (value) => {
        return ["click", "hover"].includes(value);
      }
    },
    width: {
      type: String,
      default: "200"
    },
    maxWidth: {
      type: String,
      default: "350"
    },
    maxHeight: {
      type: String,
      default: "auto"
    },
    popoverClasses: {
      type: String,
      default: ""
    },
    popoverTransitions: {
      type: String,
      default: "fade"
    },
    popoverTimeout: {
      type: Number,
      default: 300
    },
    hidePopover: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isSvg: {
      type: Boolean,
      default: false
    },
    hideCaret: {
      type: Boolean,
      default: false
    },
    onPopoverClick: {
      type: Function,
      default: null
    },
    positionFixed: {
      type: Boolean,
      default: false
    },
    testMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["opened", "closed"],
  data() {
    return {
      popper: null,
      reference: null,
      isOpen: false,
      popoverId: !this.testMode ? v1() : "test-popover-id-1234",
      targetId: !this.testMode ? v1() : "test-target-id-1234"
    };
  },
  computed: {
    popoverStyle: function() {
      return {
        width: getSizeFromString$3(this.width),
        maxWidth: getSizeFromString$3(this.maxWidth),
        maxHeight: getSizeFromString$3(this.maxHeight)
      };
    },
    popoverClassObj: function() {
      return [this.popoverClasses, { "hide-caret": this.hideCaret }, { "pb-0": this.$slots.actions }];
    }
  },
  watch: {
    hidePopover: function() {
      if (this.isOpen) {
        this.hidePopper();
      }
    }
  },
  mounted() {
    if (this.disabled)
      return;
    if (!this.$el.children) {
      this.reference = this.$el;
    } else {
      this.reference = this.$el.children[0];
    }
    this.bindEvents();
  },
  beforeUnmount() {
    const popper = this.$refs.popper;
    if (popper && this.trigger === "click") {
      this.reference && this.reference.removeEventListener("click", this.handleClick);
      popper.removeEventListener("click", this.showPopper);
      document.documentElement.removeEventListener("click", this.handleClick);
    } else if (this.reference) {
      this.reference.removeEventListener("mouseenter", this.createInstance);
      this.reference.removeEventListener("mouseleave", this.toggle);
      this.reference.removeEventListener("focus", this.createInstance);
      this.reference.removeEventListener("blur", this.toggle);
    }
    this.destroy();
  },
  methods: {
    hidePopper() {
      if (this.trigger !== "hover") {
        this.isOpen = false;
      }
      this.timer = setTimeout(() => {
        this.isOpen = false;
        this.$emit("closed");
        this.destroy();
      }, this.popoverTimeout);
    },
    showPopper() {
      this.isOpen = true;
      if (this.timer)
        clearTimeout(this.timer);
      if (this.popperTimer)
        clearTimeout(this.popperTimer);
      this.$emit("opened");
    },
    updatePopper() {
      if (this.popper && typeof this.popper.update === "function") {
        this.popper.update();
      }
    },
    async createInstance() {
      this.destroy();
      this.showPopper();
      const placement = placements[this.placement] ? placements[this.placement] : "auto";
      const popperEl = this.$refs.popper;
      const theTarget = this.target && !this.isSvg && !!document.querySelector(this.target) ? document.querySelector(this.target) : document.getElementById(this.targetId);
      if (theTarget) {
        theTarget.appendChild(popperEl);
        theTarget.style.overflow = "auto";
      }
      await this.$nextTick();
      this.popper = new Popper$1(this.reference, popperEl, {
        placement,
        positionFixed: this.positionFixed,
        removeOnDestroy: true,
        modifiers: {
          preventOverflow: {
            enabled: true,
            boundariesElement: "viewport"
          }
        }
      });
      await this.$nextTick();
      if (theTarget) {
        theTarget.style.removeProperty("overflow");
      }
      this.updatePopper();
    },
    handleClick(e) {
      e.stopPropagation();
      if (this.reference && this.reference.contains(e.target)) {
        if (this.isOpen) {
          this.hidePopper();
        } else {
          this.createInstance();
        }
      } else if (this.$refs.popper && this.$refs.popper.contains(e.target) && this.onPopoverClick) {
        const isOpen = this.onPopoverClick();
        if (isOpen !== void 0) {
          isOpen ? this.showPopper() : this.hidePopper();
        }
      } else if (this.$refs.popper && this.$refs.popper.contains(e.target)) {
        this.showPopper();
      } else if (this.isOpen) {
        this.hidePopper();
      }
    },
    bindEvents() {
      const popper = this.$refs.popper;
      if (popper) {
        if (this.trigger === "hover") {
          this.reference.addEventListener("mouseenter", this.createInstance);
          this.reference.addEventListener("focus", this.createInstance);
          this.reference.addEventListener("mouseleave", this.hidePopper);
          this.reference.addEventListener("blur", this.hidePopper);
          popper.addEventListener("mouseenter", this.showPopper);
          popper.addEventListener("focus", this.showPopper);
          popper.addEventListener("mouseleave", this.hidePopper);
          popper.addEventListener("blur", this.hidePopper);
        }
        popper.addEventListener("click", this.showPopper);
        document.documentElement.addEventListener("click", this.handleClick);
      }
    },
    destroy() {
      if (this.popper) {
        this.isOpen = false;
        this.popper.destroy();
        this.popper = null;
      }
    }
  }
});
const _hoisted_1$D = { key: 0 };
const _hoisted_2$r = ["id"];
const _hoisted_3$l = {
  key: 0,
  class: "k-popover-header d-flex"
};
const _hoisted_4$g = {
  key: 0,
  class: "k-popover-title"
};
const _hoisted_5$f = {
  key: 1,
  class: "k-popover-actions"
};
const _hoisted_6$a = { class: "k-popover-content" };
const _hoisted_7$6 = {
  key: 1,
  class: "k-popover-footer"
};
const _hoisted_8$4 = ["id"];
const _hoisted_9$3 = {
  key: 0,
  class: "k-popover-header d-flex"
};
const _hoisted_10$3 = {
  key: 0,
  class: "k-popover-title"
};
const _hoisted_11$3 = {
  key: 1,
  class: "k-popover-actions"
};
const _hoisted_12$3 = { class: "k-popover-content" };
const _hoisted_13$1 = {
  key: 1,
  class: "k-popover-footer"
};
function _sfc_render$G(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KButton = resolveComponent("KButton");
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    id: _ctx.$slots.default ? _ctx.targetId : null,
    ref: "root",
    "aria-expanded": _ctx.$slots.default ? _ctx.isOpen : null,
    "aria-controls": _ctx.$slots.default ? _ctx.popoverId : null,
    role: _ctx.$slots.default ? "button" : null,
    onKeydown: [
      _cache[0] || (_cache[0] = withKeys((e) => _ctx.handleClick(e), ["enter"])),
      withKeys(_ctx.hidePopper, ["esc"])
    ]
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createVNode(_component_KButton, {
          id: _ctx.targetId,
          "aria-expanded": _ctx.isOpen,
          "aria-controls": _ctx.popoverId,
          "data-testid": "kpop-button"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.buttonText), 1)
          ]),
          _: 1
        }, 8, ["id", "aria-expanded", "aria-controls"])
      ], true),
      _ctx.isSvg ? (openBlock(), createElementBlock("div", _hoisted_1$D, [
        (openBlock(), createElementBlock("foreignObject", null, [
          withDirectives(createElementVNode("div", {
            id: _ctx.popoverId,
            ref: "popper",
            style: normalizeStyle(_ctx.popoverStyle),
            class: normalizeClass([_ctx.popoverClassObj, "k-popover"]),
            role: "region"
          }, [
            _ctx.$slots.title || _ctx.title || _ctx.$slots.actions ? (openBlock(), createElementBlock("div", _hoisted_3$l, [
              _ctx.$slots.title || _ctx.title ? (openBlock(), createElementBlock("div", _hoisted_4$g, [
                renderSlot(_ctx.$slots, "title", {}, () => [
                  createTextVNode(toDisplayString(_ctx.title), 1)
                ], true)
              ])) : createCommentVNode("", true),
              _ctx.$slots.actions ? (openBlock(), createElementBlock("div", _hoisted_5$f, [
                renderSlot(_ctx.$slots, "actions", {}, void 0, true)
              ])) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            createElementVNode("div", _hoisted_6$a, [
              renderSlot(_ctx.$slots, "content", {}, void 0, true)
            ]),
            _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_7$6, [
              renderSlot(_ctx.$slots, "footer", {}, void 0, true)
            ])) : createCommentVNode("", true)
          ], 14, _hoisted_2$r), [
            [vShow, _ctx.isOpen]
          ])
        ]))
      ])) : (openBlock(), createBlock(Transition, {
        key: 1,
        name: "fade"
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", {
            id: _ctx.popoverId,
            ref: "popper",
            style: normalizeStyle(_ctx.popoverStyle),
            class: normalizeClass([_ctx.popoverClassObj, "k-popover"]),
            role: "region"
          }, [
            _ctx.$slots.title || _ctx.title || _ctx.$slots.actions ? (openBlock(), createElementBlock("div", _hoisted_9$3, [
              _ctx.$slots.title || _ctx.title ? (openBlock(), createElementBlock("div", _hoisted_10$3, [
                renderSlot(_ctx.$slots, "title", {}, () => [
                  createTextVNode(toDisplayString(_ctx.title), 1)
                ], true)
              ])) : createCommentVNode("", true),
              _ctx.$slots.actions ? (openBlock(), createElementBlock("div", _hoisted_11$3, [
                renderSlot(_ctx.$slots, "actions", {}, void 0, true)
              ])) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            createElementVNode("div", _hoisted_12$3, [
              renderSlot(_ctx.$slots, "content", {}, void 0, true)
            ]),
            _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_13$1, [
              renderSlot(_ctx.$slots, "footer", {}, void 0, true)
            ])) : createCommentVNode("", true)
          ], 14, _hoisted_8$4), [
            [vShow, _ctx.isOpen]
          ])
        ]),
        _: 3
      }))
    ]),
    _: 3
  }, 40, ["id", "aria-expanded", "aria-controls", "role", "onKeydown"]);
}
var KPop = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$G], ["__scopeId", "data-v-9bbde9b2"]]);
var KTooltip_vue_vue_type_style_index_0_lang = "";
const _sfc_main$F = defineComponent({
  name: "KTooltip",
  components: { KPop },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: false,
      default: ""
    },
    placement: {
      type: String,
      default: "bottom",
      validator: (value) => {
        return ["top", "bottom", "left", "right"].includes(value);
      }
    },
    positionFixed: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "auto"
    },
    testMode: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const className = ref("");
    const computedClass = computed(() => {
      return {
        top: "mb-2",
        right: "ml-2",
        bottom: "mt-2",
        left: "mr-2"
      }[props.placement];
    });
    return {
      className,
      computedClass
    };
  }
});
const _hoisted_1$C = { role: "tooltip" };
function _sfc_render$F(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KPop = resolveComponent("KPop");
  return openBlock(), createBlock(_component_KPop, mergeProps(_ctx.$attrs, {
    "hide-caret": "",
    trigger: "hover",
    placement: _ctx.placement,
    "popover-classes": `k-tooltip ${_ctx.computedClass} ${_ctx.className}`,
    "position-fixed": _ctx.positionFixed,
    "max-width": _ctx.maxWidth,
    width: "auto",
    "test-mode": _ctx.testMode
  }), {
    content: withCtx(() => [
      createElementVNode("div", _hoisted_1$C, [
        renderSlot(_ctx.$slots, "content", { label: _ctx.label }, () => [
          createTextVNode(toDisplayString(_ctx.label), 1)
        ])
      ])
    ]),
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16, ["placement", "popover-classes", "position-fixed", "max-width", "test-mode"]);
}
var KTooltip = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$F]]);
var KLabel_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$E = defineComponent({
  name: "KLabel",
  components: {
    KIcon,
    KTooltip
  },
  props: {
    help: {
      type: String,
      default: void 0
    },
    info: {
      type: String,
      default: void 0
    },
    tooltipAttributes: {
      type: Object,
      default: () => ({})
    },
    testMode: {
      type: Boolean,
      default: false
    }
  }
});
const _hoisted_1$B = { class: "k-input-label" };
function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KIcon = resolveComponent("KIcon");
  const _component_KTooltip = resolveComponent("KTooltip");
  return openBlock(), createElementBlock("label", _hoisted_1$B, [
    _ctx.help ? (openBlock(), createBlock(_component_KTooltip, mergeProps({ key: 0 }, _ctx.tooltipAttributes, {
      label: _ctx.help,
      "test-mode": _ctx.testMode,
      class: "label-tooltip"
    }), {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default", {}, void 0, true),
        createVNode(_component_KIcon, {
          icon: "help",
          size: "16",
          "hide-title": ""
        })
      ]),
      _: 3
    }, 16, ["label", "test-mode"])) : _ctx.info ? (openBlock(), createBlock(_component_KTooltip, mergeProps({ key: 1 }, _ctx.tooltipAttributes, {
      label: _ctx.info,
      "test-mode": _ctx.testMode,
      class: "label-tooltip"
    }), {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default", {}, void 0, true),
        createVNode(_component_KIcon, {
          icon: "info",
          size: "16",
          "view-box": "0 0 16 16",
          "hide-title": ""
        })
      ]),
      _: 3
    }, 16, ["label", "test-mode"])) : renderSlot(_ctx.$slots, "default", { key: 2 }, void 0, true)
  ]);
}
var KLabel = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$E], ["__scopeId", "data-v-3472eb06"]]);
var KInput_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$D = defineComponent({
  name: "KInput",
  components: { KLabel },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    overlayLabel: {
      type: Boolean,
      default: false
    },
    labelAttributes: {
      type: Object,
      default: () => ({})
    },
    help: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "medium"
    },
    hasError: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ""
    },
    characterLimit: {
      type: Number,
      default: null,
      validator: (limit) => limit > 0
    },
    testMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["input", "update:modelValue", "char-limit-exceeded"],
  setup(props, { attrs, emit }) {
    const currValue = ref("");
    const modelValueChanged = ref(false);
    const isFocused = ref(false);
    const isHovered = ref(false);
    const isDisabled = computed(() => (attrs == null ? void 0 : attrs.disabled) !== void 0 && String(attrs == null ? void 0 : attrs.disabled) !== "false");
    const isReadonly = computed(() => (attrs == null ? void 0 : attrs.readonly) !== void 0 && String(attrs == null ? void 0 : attrs.readonly) !== "false");
    const inputId = computed(() => attrs.id ? String(attrs.id) : props.testMode ? "test-input-id-1234" : v1());
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(newValue) {
        handleInput({ target: { value: newValue } });
      }
    });
    const modifiedAttrs = computed(() => {
      const $attrs = __spreadValues({}, attrs);
      delete $attrs.input;
      delete $attrs.onInput;
      return $attrs;
    });
    const charLimitExceeded = computed(() => !!props.characterLimit && (currValue.value.toString().length || !modelValueChanged.value && props.modelValue.toString().length) > props.characterLimit);
    const charLimitExceededError = computed(() => {
      if (!charLimitExceeded.value) {
        return "";
      }
      return modelValueChanged.value ? `${currValue.value.toString().length} / ${props.characterLimit}` : `${props.modelValue.toString().length} / ${props.characterLimit}`;
    });
    watch(charLimitExceeded, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        emit("char-limit-exceeded", {
          value: currValue.value,
          length: currValue.value.length,
          characterLimit: props.characterLimit,
          limitExceeded: newVal
        });
      }
    });
    watch(value, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        handleInput({ target: { value: newVal } });
      }
    });
    const handleInput = ($event) => {
      var _a;
      const val = JSON.parse(JSON.stringify((_a = $event == null ? void 0 : $event.target) == null ? void 0 : _a.value));
      currValue.value = val;
      modelValueChanged.value = true;
      emit("input", val);
      emit("update:modelValue", val);
    };
    const getValue = () => {
      return currValue.value || modelValueChanged.value ? currValue.value : props.modelValue;
    };
    return {
      currValue,
      modelValueChanged,
      isFocused,
      isHovered,
      isDisabled,
      isReadonly,
      inputId,
      charLimitExceeded,
      charLimitExceededError,
      modifiedAttrs,
      handleInput,
      getValue
    };
  }
});
const _hoisted_1$A = { class: "text-on-input" };
const _hoisted_2$q = ["for"];
const _hoisted_3$k = ["id", "value", "aria-invalid"];
const _hoisted_4$f = ["id", "value", "aria-invalid"];
const _hoisted_5$e = ["value", "aria-invalid"];
const _hoisted_6$9 = {
  key: 4,
  class: "help"
};
function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KLabel = resolveComponent("KLabel");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([{ "input-error": _ctx.charLimitExceeded || _ctx.hasError }, "k-input-wrapper"])
  }, [
    _ctx.label && _ctx.overlayLabel ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass([`k-input-label-wrapper-${_ctx.size}`, "mt-5"])
    }, [
      createElementVNode("div", _hoisted_1$A, [
        createElementVNode("label", mergeProps({ for: _ctx.inputId }, _ctx.labelAttributes, {
          class: { focused: _ctx.isFocused, hovered: _ctx.isHovered, disabled: _ctx.isDisabled, readonly: _ctx.isReadonly }
        }), [
          createElementVNode("span", null, toDisplayString(_ctx.label), 1)
        ], 16, _hoisted_2$q),
        createElementVNode("input", mergeProps(_ctx.modifiedAttrs, {
          id: _ctx.inputId,
          value: _ctx.getValue(),
          class: [`k-input-${_ctx.size}`, "form-control k-input"],
          "aria-invalid": _ctx.hasError || _ctx.charLimitExceeded ? "true" : void 0,
          onInput: _cache[0] || (_cache[0] = (...args) => _ctx.handleInput && _ctx.handleInput(...args)),
          onMouseenter: _cache[1] || (_cache[1] = () => _ctx.isHovered = true),
          onMouseleave: _cache[2] || (_cache[2] = () => _ctx.isHovered = false),
          onFocus: _cache[3] || (_cache[3] = () => _ctx.isFocused = true),
          onBlur: _cache[4] || (_cache[4] = () => _ctx.isFocused = false)
        }), null, 16, _hoisted_3$k)
      ]),
      _ctx.charLimitExceeded || _ctx.hasError ? (openBlock(), createElementBlock("p", {
        key: 0,
        class: normalizeClass([{ "over-char-limit": _ctx.charLimitExceeded }, "has-error"])
      }, toDisplayString(_ctx.charLimitExceededError || _ctx.errorMessage), 3)) : createCommentVNode("", true)
    ], 2)) : _ctx.label ? (openBlock(), createElementBlock("div", {
      key: 1,
      class: normalizeClass(`k-input-label-wrapper-${_ctx.size}`)
    }, [
      createVNode(_component_KLabel, mergeProps({ for: _ctx.inputId }, _ctx.labelAttributes), {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.label), 1)
        ]),
        _: 1
      }, 16, ["for"]),
      createElementVNode("input", mergeProps(_ctx.modifiedAttrs, {
        id: _ctx.inputId,
        value: _ctx.getValue(),
        class: [`k-input-${_ctx.size}`, "form-control k-input"],
        "aria-invalid": _ctx.hasError || _ctx.charLimitExceeded ? "true" : void 0,
        onInput: _cache[5] || (_cache[5] = (...args) => _ctx.handleInput && _ctx.handleInput(...args))
      }), null, 16, _hoisted_4$f),
      _ctx.charLimitExceeded || _ctx.hasError ? (openBlock(), createElementBlock("p", {
        key: 0,
        class: normalizeClass([{ "over-char-limit": _ctx.charLimitExceeded }, "has-error"])
      }, toDisplayString(_ctx.charLimitExceededError || _ctx.errorMessage), 3)) : createCommentVNode("", true)
    ], 2)) : (openBlock(), createElementBlock("input", mergeProps({ key: 2 }, _ctx.modifiedAttrs, {
      value: _ctx.getValue(),
      class: [`k-input-${_ctx.size}`, "form-control k-input"],
      "aria-invalid": _ctx.hasError || _ctx.charLimitExceeded ? "true" : void 0,
      onInput: _cache[6] || (_cache[6] = (...args) => _ctx.handleInput && _ctx.handleInput(...args))
    }), null, 16, _hoisted_5$e)),
    (_ctx.charLimitExceeded || _ctx.hasError) && !_ctx.label ? (openBlock(), createElementBlock("p", {
      key: 3,
      class: normalizeClass(["has-error", { "over-char-limit": _ctx.charLimitExceeded }])
    }, toDisplayString(_ctx.charLimitExceededError || _ctx.errorMessage), 3)) : createCommentVNode("", true),
    _ctx.help ? (openBlock(), createElementBlock("p", _hoisted_6$9, toDisplayString(_ctx.help), 1)) : createCommentVNode("", true)
  ], 2);
}
var KInput = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$D], ["__scopeId", "data-v-3018ca1a"]]);
var KSelectItem_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$C = defineComponent({
  name: "SelectItem",
  components: { KIcon },
  props: {
    item: {
      type: Object,
      default: null,
      validator: (item) => item.label !== void 0 && item.value !== void 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["selected"],
  setup(props, { emit }) {
    const handleClick = () => {
      emit("selected", props.item);
    };
    return {
      handleClick
    };
  }
});
const _hoisted_1$z = ["data-testid"];
const _hoisted_2$p = {
  role: "option",
  class: "d-block"
};
const _hoisted_3$j = ["value"];
const _hoisted_4$e = { class: "k-select-item-label mr-2" };
const _hoisted_5$d = { class: "k-select-selected-icon-container" };
function _sfc_render$C(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KIcon = resolveComponent("KIcon");
  return openBlock(), createElementBlock("li", {
    key: _ctx.item.key,
    "data-testid": `k-select-item-${_ctx.item.value}`,
    class: "k-select-item",
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [
    createElementVNode("div", _hoisted_2$p, [
      createElementVNode("button", {
        class: normalizeClass({ disabled: _ctx.disabled, selected: _ctx.item.selected }),
        value: _ctx.item.value
      }, [
        createElementVNode("span", _hoisted_4$e, [
          renderSlot(_ctx.$slots, "content", {}, () => [
            createTextVNode(toDisplayString(_ctx.item.label), 1)
          ], true)
        ]),
        createElementVNode("span", _hoisted_5$d, [
          _ctx.item.selected ? (openBlock(), createBlock(_component_KIcon, {
            key: 0,
            class: "selected-item-icon",
            icon: "check",
            color: "var(--blue-200)"
          })) : createCommentVNode("", true)
        ])
      ], 10, _hoisted_3$j)
    ])
  ], 8, _hoisted_1$z);
}
var KSelectItem = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$C], ["__scopeId", "data-v-9c350c8e"]]);
var KSelect_vue_vue_type_style_index_0_scoped_true_lang = "";
var KSelect_vue_vue_type_style_index_1_lang = "";
const { getSizeFromString: getSizeFromString$2 } = useUtilities();
const defaultKPopAttributes$1 = {
  popoverClasses: "k-select-popover mt-0",
  popoverTimeout: 0,
  placement: "bottomStart",
  hideCaret: true
};
const _sfc_main$B = defineComponent({
  name: "KSelect",
  components: {
    KButton,
    KIcon,
    KInput,
    KLabel,
    KPop,
    KSelectItem,
    KToggle
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    kpopAttributes: {
      type: Object,
      default: () => ({
        popoverClasses: ""
      })
    },
    dropdownMaxHeight: {
      type: String,
      default: "300"
    },
    label: {
      type: String,
      default: ""
    },
    overlayLabel: {
      type: Boolean,
      default: false
    },
    labelAttributes: {
      type: Object,
      default: () => ({})
    },
    width: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    appearance: {
      type: String,
      default: "dropdown",
      validator: (value) => ["dropdown", "select", "button"].includes(value)
    },
    buttonText: {
      type: String,
      default: ""
    },
    items: {
      type: Array,
      required: false,
      default: () => [],
      validator: (items) => !items.length || items.some((i) => i.label !== void 0 && i.value !== void 0)
    },
    positionFixed: {
      type: Boolean,
      default: true
    },
    filterFunc: {
      type: Function,
      default: (params) => params.items.filter((item) => item.label.toLowerCase().includes(params.query.toLowerCase()))
    },
    enableFiltering: {
      type: Boolean,
      default: null
    },
    autosuggest: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    testMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["selected", "input", "change", "update:modelValue", "query-change"],
  setup(props, { attrs, emit }) {
    const filterStr = ref("");
    const selectedItem = ref(null);
    const selectId = computed(() => props.testMode ? "test-select-id-1234" : v1());
    const selectInputId = computed(() => props.testMode ? "test-select-input-id-1234" : v1());
    const selectTextId = computed(() => props.testMode ? "test-select-text-id-1234" : v1());
    const selectItems = ref([]);
    const initialFocusTriggered = ref(false);
    const popper = ref(null);
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(newValue) {
        const item = selectItems.value.filter((item2) => item2.value === newValue);
        if (item.length) {
          handleItemSelect(item[0]);
        } else if (!newValue) {
          clearSelection();
        }
      }
    });
    const filterIsEnabled = computed(() => {
      if (props.autosuggest) {
        return true;
      }
      if (props.enableFiltering !== null) {
        return props.appearance === "button" ? false : props.enableFiltering;
      }
      if (props.appearance === "dropdown") {
        return true;
      }
      return false;
    });
    const widthValue = computed(() => {
      let w = "";
      if (!props.width) {
        w = "205";
        if (props.appearance === "button") {
          w = "230";
        }
      } else {
        w = props.width;
      }
      return getSizeFromString$2(w);
    });
    const widthStyle = computed(() => {
      return {
        width: widthValue.value
      };
    });
    const createKPopAttributes = computed(() => {
      return __spreadProps(__spreadValues(__spreadValues({}, defaultKPopAttributes$1), props.kpopAttributes), {
        popoverClasses: `${defaultKPopAttributes$1.popoverClasses} ${props.kpopAttributes.popoverClasses} k-select-pop-${props.appearance}`,
        width: String(inputWidth.value),
        maxWidth: String(inputWidth.value),
        maxHeight: String(props.dropdownMaxHeight),
        disabled: attrs.disabled !== void 0 && String(attrs.disabled) !== "false" || attrs.readonly !== void 0 && String(attrs.readonly) !== "false"
      });
    });
    const boundKPopAttributes = computed(() => __spreadValues({}, createKPopAttributes.value));
    const filteredItems = computed(() => {
      return props.autosuggest ? selectItems.value : props.filterFunc({ items: selectItems.value, query: filterStr.value });
    });
    const placeholderText = computed(() => {
      if (props.placeholder) {
        return props.placeholder;
      } else if (attrs.placeholder) {
        return attrs.placeholder;
      }
      if (props.appearance === "button" || !filterIsEnabled.value) {
        return "Select an item";
      }
      return "Filter...";
    });
    const selectButtonText = computed(() => {
      if (props.buttonText && selectedItem.value) {
        return props.buttonText;
      } else if (selectedItem.value) {
        return selectedItem.value.label;
      }
      return placeholderText.value;
    });
    const isClearVisible = computed(() => props.appearance === "select" && props.clearable && !!selectedItem.value);
    const onInputKeypress = (event) => {
      if (!filterIsEnabled.value) {
        event.preventDefault();
        return false;
      }
    };
    const handleItemSelect = (item) => {
      selectItems.value.forEach((anItem) => {
        var _a, _b;
        if (anItem.key === item.key) {
          anItem.selected = true;
          anItem.key = ((_a = anItem == null ? void 0 : anItem.key) == null ? void 0 : _a.includes("-selected")) ? anItem.key : `${anItem.key}-selected`;
          anItem.key += "-selected";
          selectedItem.value = anItem;
        } else if (anItem.selected) {
          anItem.selected = false;
          anItem.key = (_b = anItem == null ? void 0 : anItem.key) == null ? void 0 : _b.replace(/-selected/gi, "");
        } else {
          anItem.selected = false;
        }
      });
      filterStr.value = props.appearance === "dropdown" ? "" : item.label;
      emit("selected", item);
      emit("input", item.value);
      emit("change", item);
      emit("update:modelValue", item.value);
    };
    const clearSelection = () => {
      selectItems.value.forEach((anItem) => {
        var _a;
        anItem.selected = false;
        anItem.key = (_a = anItem == null ? void 0 : anItem.key) == null ? void 0 : _a.replace(/-selected/gi, "");
      });
      selectedItem.value = null;
      if (props.appearance === "select") {
        filterStr.value = "";
      }
      emit("input", null);
      emit("change", null);
      emit("update:modelValue", null);
    };
    const triggerFocus = (evt, isToggled) => {
      if (evt.keyCode === 27) {
        isToggled.value = false;
        return;
      }
      const inputElem = document.getElementById(selectTextId.value);
      if (!isToggled.value && inputElem) {
        inputElem.click();
      }
    };
    const onQueryChange = (query) => {
      filterStr.value = query;
      emit("query-change", query);
    };
    const onInputFocus = () => {
      if (!initialFocusTriggered.value) {
        initialFocusTriggered.value = true;
        emit("query-change", "");
      }
    };
    watch(value, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        const item = selectItems.value.filter((item2) => item2.value === newVal);
        if (item.length) {
          handleItemSelect(item[0]);
        } else if (!newVal) {
          clearSelection();
        }
      }
    });
    watch(() => props.items, (newValue, oldValue) => {
      var _a;
      if (JSON.stringify(newValue) === JSON.stringify(oldValue)) {
        return;
      }
      selectItems.value = JSON.parse(JSON.stringify(props.items));
      for (let i = 0; i < selectItems.value.length; i++) {
        if (selectItems.value[i].selected === void 0) {
          selectItems.value[i].selected = false;
        }
        selectItems.value[i].key = `${selectItems.value[i].label.replace(" ", "-").replace(/[^a-z0-9-_]/gi, "")}-${i}`;
        if (selectItems.value[i].value === props.modelValue || selectItems.value[i].selected) {
          selectItems.value[i].selected = true;
          selectedItem.value = selectItems.value[i];
          selectItems.value[i].key += "-selected";
          if (props.appearance === "select") {
            filterStr.value = selectedItem.value.label;
          }
        }
        if (((_a = selectedItem.value) == null ? void 0 : _a.value) === selectItems.value[i].value) {
          selectItems.value[i].selected = true;
        }
      }
      if (popper.value && typeof popper.value.updatePopper === "function") {
        nextTick(() => {
          popper.value.updatePopper();
        });
      }
    }, { immediate: true });
    const inputWidth = ref(0);
    const onPopoverOpen = () => {
      const inputElem = document.getElementById(selectInputId.value);
      if (inputElem) {
        inputWidth.value = inputElem.offsetWidth;
      }
    };
    return {
      filterStr,
      selectedItem,
      selectId,
      selectInputId,
      selectTextId,
      selectItems,
      popper,
      boundKPopAttributes,
      widthValue,
      widthStyle,
      filteredItems,
      placeholderText,
      selectButtonText,
      isClearVisible,
      handleItemSelect,
      clearSelection,
      triggerFocus,
      inputWidth,
      filterIsEnabled,
      onInputKeypress,
      onQueryChange,
      onInputFocus,
      onPopoverOpen
    };
  }
});
const _hoisted_1$y = ["id"];
const _hoisted_2$o = { class: "selected-item-label" };
const _hoisted_3$i = ["id"];
const _hoisted_4$d = ["id"];
const _hoisted_5$c = {
  key: 1,
  class: "k-select-list ma-0 pa-0"
};
function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KLabel = resolveComponent("KLabel");
  const _component_KIcon = resolveComponent("KIcon");
  const _component_KButton = resolveComponent("KButton");
  const _component_KInput = resolveComponent("KInput");
  const _component_KSelectItem = resolveComponent("KSelectItem");
  const _component_KPop = resolveComponent("KPop");
  const _component_KToggle = resolveComponent("KToggle");
  return openBlock(), createElementBlock("div", {
    style: normalizeStyle(_ctx.widthStyle),
    class: "k-select"
  }, [
    _ctx.label && !_ctx.overlayLabel ? (openBlock(), createBlock(_component_KLabel, mergeProps({
      key: 0,
      for: _ctx.selectId
    }, _ctx.labelAttributes, { "data-testid": "k-select-label" }), {
      default: withCtx(() => [
        createTextVNode(toDisplayString(_ctx.label), 1)
      ]),
      _: 1
    }, 16, ["for"])) : createCommentVNode("", true),
    createElementVNode("div", {
      id: _ctx.selectId,
      "data-testid": "k-select-selected-item"
    }, [
      _ctx.selectedItem && _ctx.appearance === "dropdown" ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["k-select-item-selection px-3 py-1", { "overlay-label-item-selection": _ctx.overlayLabel }])
      }, [
        createElementVNode("div", _hoisted_2$o, toDisplayString(_ctx.selectedItem.label), 1),
        createElementVNode("button", {
          class: "clear-selection-icon cursor-pointer non-visual-button",
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.clearSelection && _ctx.clearSelection(...args)),
          onKeyup: _cache[1] || (_cache[1] = withKeys((...args) => _ctx.clearSelection && _ctx.clearSelection(...args), ["enter"]))
        }, [
          createVNode(_component_KIcon, {
            color: "var(--blue-200)",
            icon: "clear"
          })
        ], 32)
      ], 2)) : createCommentVNode("", true),
      createVNode(_component_KToggle, null, {
        default: withCtx(({ toggle, isToggled }) => [
          createVNode(_component_KPop, mergeProps({ ref: "popper" }, _ctx.boundKPopAttributes, {
            "on-popover-click": () => {
              toggle();
              return isToggled.value;
            },
            "position-fixed": _ctx.positionFixed,
            "test-mode": _ctx.testMode,
            target: `[id='${_ctx.selectInputId}']`,
            onOpened: () => {
              _ctx.filterStr = "";
              toggle();
              _ctx.onPopoverOpen();
            },
            onClosed: () => {
              if (_ctx.selectedItem && _ctx.appearance === "select") {
                _ctx.filterStr = _ctx.selectedItem.label;
              }
              if (isToggled.value) {
                toggle();
              }
            }
          }), {
            content: withCtx(() => [
              _ctx.autosuggest && _ctx.loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }, () => [
                createVNode(_component_KIcon, {
                  class: "k-select-loading",
                  "data-testid": "k-select-loading",
                  icon: "spinner"
                })
              ], true) : (openBlock(), createElementBlock("ul", _hoisted_5$c, [
                renderSlot(_ctx.$slots, "items", {
                  items: _ctx.selectItems,
                  isOpen: isToggled.value
                }, () => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.filteredItems, (item) => {
                    return openBlock(), createBlock(_component_KSelectItem, {
                      key: item.key,
                      item,
                      onSelected: _ctx.handleItemSelect
                    }, {
                      content: withCtx(() => [
                        renderSlot(_ctx.$slots, "item-template", {
                          item,
                          class: "select-item-label select-item-desc"
                        }, void 0, true)
                      ]),
                      _: 2
                    }, 1032, ["item", "onSelected"]);
                  }), 128)),
                  !_ctx.filteredItems.length && !_ctx.$slots.empty ? (openBlock(), createBlock(_component_KSelectItem, {
                    key: "k-select-empty-state",
                    item: { label: "No results", value: "no_results" },
                    class: "k-select-empty-item"
                  })) : createCommentVNode("", true)
                ], true)
              ])),
              !_ctx.loading && !_ctx.filteredItems.length ? renderSlot(_ctx.$slots, "empty", { key: 2 }, void 0, true) : createCommentVNode("", true)
            ]),
            default: withCtx(() => [
              _ctx.appearance === "button" ? (openBlock(), createElementBlock("div", {
                key: 0,
                id: _ctx.selectInputId,
                class: "k-select-button",
                "data-testid": "k-select-input",
                style: { "position": "relative" },
                role: "listbox"
              }, [
                createVNode(_component_KButton, mergeProps({
                  id: _ctx.selectTextId,
                  style: _ctx.widthStyle,
                  "is-open": isToggled.value,
                  "is-rounded": false
                }, _ctx.$attrs, {
                  appearance: "btn-link",
                  onKeyup: (evt) => _ctx.triggerFocus(evt, isToggled)
                }), {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.selectButtonText), 1)
                  ]),
                  _: 2
                }, 1040, ["id", "style", "is-open", "onKeyup"])
              ], 8, _hoisted_3$i)) : (openBlock(), createElementBlock("div", {
                key: 1,
                id: _ctx.selectInputId,
                class: normalizeClass({ "k-select-input": _ctx.appearance === "select", "no-filter": !_ctx.filterIsEnabled }),
                "data-testid": "k-select-input",
                style: { "position": "relative" },
                role: "listbox",
                onClick: _cache[2] || (_cache[2] = (evt) => {
                  if (_ctx.$attrs.disabled !== void 0 && String(_ctx.$attrs.disabled) !== "false") {
                    evt.stopPropagation();
                  }
                })
              }, [
                _ctx.isClearVisible ? (openBlock(), createBlock(_component_KButton, {
                  key: 0,
                  class: normalizeClass([{ "overlay-label-clear": _ctx.overlayLabel }, "clear-selection-icon cursor-pointer non-visual-button"]),
                  onClick: _ctx.clearSelection,
                  onKeyup: withKeys(_ctx.clearSelection, ["enter"])
                }, {
                  default: withCtx(() => [
                    createVNode(_component_KIcon, {
                      icon: "clear",
                      color: "var(--grey-500)",
                      size: "18"
                    })
                  ]),
                  _: 1
                }, 8, ["class", "onClick", "onKeyup"])) : createCommentVNode("", true),
                _ctx.appearance === "select" ? (openBlock(), createBlock(_component_KIcon, {
                  key: 1,
                  icon: isToggled.value ? "chevronUp" : "chevronDown",
                  color: "var(--grey-500)",
                  size: "18",
                  class: normalizeClass({ "overlay-label-chevron": _ctx.overlayLabel })
                }, null, 8, ["icon", "class"])) : createCommentVNode("", true),
                createVNode(_component_KInput, mergeProps({ id: _ctx.selectTextId }, _ctx.$attrs, {
                  "model-value": _ctx.filterStr,
                  label: _ctx.label && _ctx.overlayLabel ? _ctx.label : void 0,
                  "overlay-label": _ctx.overlayLabel,
                  placeholder: _ctx.selectedItem && _ctx.appearance === "select" && !_ctx.filterIsEnabled ? _ctx.selectedItem.label : _ctx.placeholderText,
                  autocomplete: "off",
                  autocapitalize: "off",
                  class: [{
                    "cursor-default prevent-pointer-events": !_ctx.filterIsEnabled,
                    "input-placeholder-dark has-chevron": _ctx.appearance === "select",
                    "has-clear": _ctx.isClearVisible
                  }, "k-select-input"],
                  onKeypress: _ctx.onInputKeypress,
                  onKeyup: (evt) => _ctx.triggerFocus(evt, isToggled),
                  "onUpdate:modelValue": _ctx.onQueryChange,
                  onFocus: _ctx.onInputFocus
                }), null, 16, ["id", "model-value", "label", "overlay-label", "placeholder", "class", "onKeypress", "onKeyup", "onUpdate:modelValue", "onFocus"])
              ], 10, _hoisted_4$d))
            ]),
            _: 2
          }, 1040, ["on-popover-click", "position-fixed", "test-mode", "target", "onOpened", "onClosed"])
        ]),
        _: 3
      })
    ], 8, _hoisted_1$y)
  ], 4);
}
var KSelect = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$B], ["__scopeId", "data-v-76da7cfd"]]);
var PaginationOffset_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$A = defineComponent({
  name: "PaginationOffset",
  components: {
    KIcon
  },
  props: {
    prevButtonDisabled: {
      type: Boolean,
      default: false
    },
    nextButtonDisabled: {
      type: Boolean,
      default: false
    },
    testMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["getPrevOffset", "getNextOffset"],
  setup(props, { emit }) {
    const getNextOffset = () => {
      if (props.nextButtonDisabled) {
        return;
      }
      emit("getNextOffset");
    };
    const getPrevOffset = () => {
      if (props.prevButtonDisabled) {
        return;
      }
      emit("getPrevOffset");
    };
    return {
      getPrevOffset,
      getNextOffset
    };
  }
});
const _hoisted_1$x = { class: "pagination-offset-button-container mb-0 pa-0" };
function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KIcon = resolveComponent("KIcon");
  const _component_KButton = resolveComponent("KButton");
  return openBlock(), createElementBlock("div", _hoisted_1$x, [
    createVNode(_component_KButton, {
      class: normalizeClass([{ disabled: _ctx.prevButtonDisabled }, "pagination-button"]),
      "data-testid": "prev-btn",
      "aria-label": "Go to the previous page",
      onClick: withModifiers(_ctx.getPrevOffset, ["prevent"])
    }, {
      icon: withCtx(() => [
        createVNode(_component_KIcon, {
          color: _ctx.prevButtonDisabled ? "var(--grey-500)" : "var(--blue-400)",
          icon: "arrowLeft",
          size: "16",
          "view-box": "0 0 16 16"
        }, null, 8, ["color"])
      ]),
      _: 1
    }, 8, ["class", "onClick"]),
    createVNode(_component_KButton, {
      class: normalizeClass([{ disabled: _ctx.nextButtonDisabled }, "pagination-button"]),
      "data-testid": "next-btn",
      "aria-label": "Go to the next page",
      onClick: withModifiers(_ctx.getNextOffset, ["prevent"])
    }, {
      icon: withCtx(() => [
        createVNode(_component_KIcon, {
          color: _ctx.nextButtonDisabled ? "var(--grey-500)" : "var(--blue-400)",
          icon: "arrowRight",
          size: "16",
          "view-box": "0 0 16 16"
        }, null, 8, ["color"])
      ]),
      _: 1
    }, 8, ["class", "onClick"])
  ]);
}
var PaginationOffset = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$A], ["__scopeId", "data-v-16e16c5e"]]);
var KPagination_vue_vue_type_style_index_0_scoped_true_lang = "";
var KPagination_vue_vue_type_style_index_1_lang = "";
const _sfc_main$z = defineComponent({
  name: "KPagination",
  components: {
    KIcon,
    KSelect,
    PaginationOffset
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    totalCount: {
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array,
      default: () => [15, 30, 50, 75, 100],
      validator: (pageSizes) => !!pageSizes.length && pageSizes.every((i) => typeof i === "number")
    },
    initialPageSize: {
      type: Number,
      default: null
    },
    neighbors: {
      type: Number,
      default: 1
    },
    searchTriggered: {
      type: Boolean,
      default: false
    },
    currentPage: {
      type: Number,
      default: null
    },
    disablePageJump: {
      type: Boolean,
      default: false
    },
    paginationType: {
      type: String,
      default: "default",
      validator: (value) => ["default", "offset"].includes(value)
    },
    offsetPrevButtonDisabled: {
      type: Boolean,
      default: false
    },
    offsetNextButtonDisabled: {
      type: Boolean,
      default: false
    },
    testMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["pageChanged", "pageSizeChanged", "getNextOffset", "getPrevOffset"],
  setup(props, { emit }) {
    const currPage = ref(props.currentPage ? props.currentPage : 1);
    const currentPageSize = ref(props.initialPageSize ? props.initialPageSize : props.pageSizes[0]);
    const pageCount = ref(Math.ceil(props.totalCount / currentPageSize.value));
    const pageSizeOptions = props.pageSizes.map((size, i) => ({
      label: `${size}`,
      key: `size-${i}`,
      value: size
    }));
    const pageSizeText = ref("");
    const getVisiblePages = (currPage2, pageCount2, firstDetached2, lastDetached2) => {
      if (props.disablePageJump) {
        return 0;
      }
      let pages = [...Array(pageCount2).keys()].map((n) => n + 1);
      const visiblePages = 5 + 2 * props.neighbors;
      if (pages.length <= visiblePages) {
        return pages;
      }
      if (!firstDetached2) {
        pages = pages.filter((n) => n <= props.neighbors * 2 + 3);
      } else if (firstDetached2 && lastDetached2) {
        pages = pages.filter((n) => n > currPage2 - props.neighbors - 1 && n < currPage2 + props.neighbors + 1);
      } else if (firstDetached2 && !lastDetached2) {
        pages = pages.filter((n) => n > pageCount2 - props.neighbors * 2 - 3);
      }
      return pages;
    };
    const backDisabled = ref(currPage.value === 1);
    const forwardDisabled = ref(currPage.value === pageCount.value);
    const startCount = computed(() => (currPage.value - 1) * currentPageSize.value + 1);
    const endCount = computed(() => {
      const calculatedEndCount = startCount.value - 1 + currentPageSize.value;
      return calculatedEndCount > props.totalCount ? props.totalCount : calculatedEndCount;
    });
    const pagesString = computed(() => `${startCount.value} to ${endCount.value}`);
    const pageCountString = computed(() => ` of ${props.totalCount}`);
    const currentlySelectedPage = computed(() => props.currentPage ? props.currentPage : currPage.value);
    const firstDetached = ref(false);
    const lastDetached = ref(pageCount.value > 5 + 2 * props.neighbors);
    const pagesVisible = ref(getVisiblePages(currentlySelectedPage.value, pageCount.value, false, pageCount.value > 5 + 2 * props.neighbors));
    const pageForward = () => {
      if (forwardDisabled.value)
        return;
      currPage.value++;
      updatePage();
    };
    const pageBack = () => {
      if (backDisabled.value)
        return;
      currPage.value--;
      updatePage();
    };
    const changePage = (page) => {
      currPage.value = page;
      updatePage();
    };
    const updatePage = () => {
      const lastEntry = (currPage.value - 1) * currentPageSize.value + currentPageSize.value;
      forwardDisabled.value = lastEntry >= props.totalCount;
      backDisabled.value = currPage.value === 1;
      const visiblePages = 5 + 2 * props.neighbors;
      if (pageCount.value <= visiblePages) {
        firstDetached.value = false;
        lastDetached.value = false;
      } else {
        firstDetached.value = currPage.value >= props.neighbors + 4;
        lastDetached.value = currPage.value <= pageCount.value - props.neighbors - 3;
      }
      pagesVisible.value = getVisiblePages(currPage.value, pageCount.value, firstDetached.value, lastDetached.value);
      emit("pageChanged", {
        page: currPage.value,
        pageCount: pageCount.value,
        firstItem: startCount.value,
        lastItem: endCount.value,
        visibleItems: props.items.slice(startCount.value - 1, endCount.value)
      });
    };
    const updatePageSize = (event) => {
      currentPageSize.value = event.value;
      pageSizeText.value = currentPageSize.value + " items per page";
      pageCount.value = Math.ceil(props.totalCount / currentPageSize.value);
      emit("pageSizeChanged", {
        pageSize: currentPageSize.value,
        pageCount: pageCount.value
      });
      if (props.currentPage !== 1) {
        changePage(1);
      }
    };
    const getNextOffset = () => {
      emit("getNextOffset");
    };
    const getPrevOffset = () => {
      emit("getPrevOffset");
    };
    watch(() => props.currentPage, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        changePage(newVal);
      }
    });
    return {
      kpopAttrs: {
        placement: "top"
      },
      currentPageSize,
      pageCount,
      pageSizeOptions,
      backDisabled,
      forwardDisabled,
      pageSizeText,
      pagesVisible,
      firstDetached,
      lastDetached,
      startCount,
      endCount,
      pagesString,
      pageCountString,
      currentlySelectedPage,
      pageForward,
      pageBack,
      changePage,
      updatePage,
      updatePageSize,
      getNextOffset,
      getPrevOffset
    };
  }
});
const _hoisted_1$w = {
  "aria-label": "Pagination Navigation",
  "data-testid": "k-pagination-container"
};
const _hoisted_2$n = { class: "card-pagination-bar" };
const _hoisted_3$h = {
  class: "pagination-text",
  "data-testid": "visible-items"
};
const _hoisted_4$c = { class: "pagination-text-pages" };
const _hoisted_5$b = { class: "pagination-button-container" };
const _hoisted_6$8 = {
  key: 0,
  class: "pagination-button",
  "data-testid": "page-1-btn"
};
const _hoisted_7$5 = {
  key: 1,
  class: "pagination-button placeholder"
};
const _hoisted_8$3 = ["data-testid"];
const _hoisted_9$2 = ["aria-label", "aria-current", "onClick"];
const _hoisted_10$2 = {
  key: 2,
  class: "pagination-button placeholder"
};
const _hoisted_11$2 = {
  key: 3,
  class: "pagination-button"
};
const _hoisted_12$2 = {
  class: "page-size-select",
  "data-testid": "page-size-dropdown"
};
function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KIcon = resolveComponent("KIcon");
  const _component_PaginationOffset = resolveComponent("PaginationOffset");
  const _component_KSelect = resolveComponent("KSelect");
  return openBlock(), createElementBlock("nav", _hoisted_1$w, [
    createElementVNode("div", _hoisted_2$n, [
      _ctx.paginationType === "default" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        createElementVNode("span", _hoisted_3$h, [
          createElementVNode("span", _hoisted_4$c, toDisplayString(_ctx.pagesString), 1),
          createTextVNode(" " + toDisplayString(_ctx.pageCountString), 1)
        ]),
        createElementVNode("ul", _hoisted_5$b, [
          createElementVNode("li", {
            class: normalizeClass([{ disabled: _ctx.backDisabled }, "pagination-button square"]),
            "data-testid": "prev-btn"
          }, [
            createElementVNode("a", {
              href: "#",
              "aria-label": "Go to the previous page",
              onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.pageBack && _ctx.pageBack(...args), ["prevent"]))
            }, [
              createVNode(_component_KIcon, {
                color: _ctx.backDisabled ? "var(--KPaginationDisabledColor, var(--grey-500))" : "var(--KPaginationColor, var(--blue-400))",
                icon: "arrowLeft",
                size: "16",
                "view-box": "0 0 16 14"
              }, null, 8, ["color"])
            ])
          ], 2),
          !_ctx.disablePageJump && _ctx.firstDetached ? (openBlock(), createElementBlock("li", _hoisted_6$8, [
            createElementVNode("a", {
              href: "#",
              "aria-label": "Go to the first page",
              onClick: _cache[1] || (_cache[1] = withModifiers(($event) => _ctx.changePage(1), ["prevent"]))
            }, "1")
          ])) : createCommentVNode("", true),
          !_ctx.disablePageJump && _ctx.firstDetached ? (openBlock(), createElementBlock("li", _hoisted_7$5, " ... ")) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.pagesVisible, (page) => {
            return openBlock(), createElementBlock("li", {
              key: page,
              class: normalizeClass([{ active: page == _ctx.currentlySelectedPage }, "pagination-button"]),
              "data-testid": `page-${page}-btn`
            }, [
              createElementVNode("a", {
                "aria-label": `Go to page ${page}`,
                "aria-current": page == _ctx.currentlySelectedPage && "page",
                href: "#",
                onClick: withModifiers(($event) => _ctx.changePage(page), ["prevent"])
              }, toDisplayString(page), 9, _hoisted_9$2)
            ], 10, _hoisted_8$3);
          }), 128)),
          !_ctx.disablePageJump && _ctx.lastDetached ? (openBlock(), createElementBlock("li", _hoisted_10$2, " ... ")) : createCommentVNode("", true),
          !_ctx.disablePageJump && _ctx.lastDetached ? (openBlock(), createElementBlock("li", _hoisted_11$2, [
            createElementVNode("a", {
              href: "#",
              "aria-label": "Go to the last page",
              "data-testid": "last-btn",
              onClick: _cache[2] || (_cache[2] = withModifiers(($event) => _ctx.changePage(_ctx.pageCount), ["prevent"]))
            }, toDisplayString(_ctx.pageCount), 1)
          ])) : createCommentVNode("", true),
          createElementVNode("li", {
            class: normalizeClass([{ disabled: _ctx.forwardDisabled }, "pagination-button square"]),
            "data-testid": "next-btn"
          }, [
            createElementVNode("a", {
              href: "#",
              "aria-label": "Go to the next page",
              onClick: _cache[3] || (_cache[3] = withModifiers((...args) => _ctx.pageForward && _ctx.pageForward(...args), ["prevent"]))
            }, [
              createVNode(_component_KIcon, {
                color: _ctx.forwardDisabled ? "var(--KPaginationDisabledColor, var(--grey-500))" : "var(--KPaginationColor, var(--blue-400))",
                icon: "arrowRight",
                size: "16",
                "view-box": "0 0 16 14"
              }, null, 8, ["color"])
            ])
          ], 2)
        ])
      ], 64)) : (openBlock(), createBlock(_component_PaginationOffset, {
        key: 1,
        "prev-button-disabled": _ctx.offsetPrevButtonDisabled,
        "next-button-disabled": _ctx.offsetNextButtonDisabled,
        onGetPrevOffset: _ctx.getPrevOffset,
        onGetNextOffset: _ctx.getNextOffset
      }, null, 8, ["prev-button-disabled", "next-button-disabled", "onGetPrevOffset", "onGetNextOffset"])),
      createElementVNode("span", _hoisted_12$2, [
        createVNode(_component_KSelect, {
          placeholder: `${_ctx.currentPageSize} items per page`,
          items: _ctx.pageSizeOptions,
          "test-mode": _ctx.testMode,
          "button-text": _ctx.pageSizeText,
          "kpop-attributes": _ctx.kpopAttrs,
          "position-fixed": "",
          width: "205",
          appearance: "button",
          onSelected: _ctx.updatePageSize
        }, null, 8, ["placeholder", "items", "test-mode", "button-text", "kpop-attributes", "onSelected"])
      ])
    ])
  ]);
}
var KPagination = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$z], ["__scopeId", "data-v-da64cff0"]]);
var KSkeletonBox_vue_vue_type_style_index_0_scoped_true_lang = "";
var KSkeletonBox_vue_vue_type_style_index_1_lang = "";
const _sfc_main$y = defineComponent({
  name: "KSkeletonBox",
  props: {
    width: {
      type: String,
      default: "1",
      validator: function(val) {
        return ["1", "2", "5", "6", "10", "25", "50", "75", "100"].includes(val);
      }
    },
    height: {
      type: String,
      default: "1",
      validator: (val) => ["1", "2"].includes(val)
    }
  }
});
function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([{ [`width-${_ctx.width}`]: true, [`height-${_ctx.height}`]: true }, "box mr-1"])
  }, null, 2);
}
var KSkeletonBox = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$y], ["__scopeId", "data-v-2ffc7dea"]]);
var SkeletonBase_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$x = defineComponent({
  name: "SkeletonBase",
  components: { KSkeletonBox }
});
const _hoisted_1$v = { class: "skeleton-loader" };
function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KSkeletonBox = resolveComponent("KSkeletonBox");
  return openBlock(), createElementBlock("div", _hoisted_1$v, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      createVNode(_component_KSkeletonBox, {
        width: "100",
        height: "1"
      }),
      createVNode(_component_KSkeletonBox, {
        width: "100",
        height: "1"
      }),
      createVNode(_component_KSkeletonBox, {
        width: "75",
        height: "1"
      })
    ], true)
  ]);
}
var Skeleton = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$x], ["__scopeId", "data-v-2f46a0c1"]]);
var CardSkeleton_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$w = defineComponent({
  name: "CardSkeleton",
  components: { KSkeletonBox },
  props: {
    cardCount: {
      type: Number,
      default: 1
    }
  }
});
const _withScopeId$6 = (n) => (pushScopeId("data-v-d7916644"), n = n(), popScopeId(), n);
const _hoisted_1$u = { class: "skeleton-card-wrapper" };
const _hoisted_2$m = { class: "skeleton-card" };
const _hoisted_3$g = { class: "skeleton-card-header" };
const _hoisted_4$b = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("hr", { class: "mb-0" }, null, -1));
const _hoisted_5$a = { class: "skeleton-card-content" };
const _hoisted_6$7 = { class: "skeleton-card-footer" };
function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KSkeletonBox = resolveComponent("KSkeletonBox");
  return openBlock(), createElementBlock("div", _hoisted_1$u, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.cardCount, (c) => {
      return openBlock(), createElementBlock("div", {
        key: c,
        class: "skeleton-card-column"
      }, [
        createElementVNode("div", _hoisted_2$m, [
          createElementVNode("div", _hoisted_3$g, [
            renderSlot(_ctx.$slots, "card-header", {}, () => [
              createVNode(_component_KSkeletonBox, {
                height: "2",
                width: "25"
              }),
              createVNode(_component_KSkeletonBox, {
                class: "ml-2",
                width: "75",
                height: "2"
              }),
              _hoisted_4$b
            ], true)
          ]),
          createElementVNode("div", _hoisted_5$a, [
            renderSlot(_ctx.$slots, "card-content", {}, () => [
              createVNode(_component_KSkeletonBox, { width: "10" })
            ], true)
          ]),
          createElementVNode("div", _hoisted_6$7, [
            renderSlot(_ctx.$slots, "card-footer", {}, () => [
              createVNode(_component_KSkeletonBox, { width: "5" }),
              createVNode(_component_KSkeletonBox, { width: "5" })
            ], true)
          ])
        ])
      ]);
    }), 128))
  ]);
}
var CardSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$w], ["__scopeId", "data-v-d7916644"]]);
var TableSkeleton_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$v = defineComponent({
  name: "TableSkeleton",
  components: {
    KSkeletonBox
  },
  props: {
    rows: {
      type: Number,
      default: 6
    },
    columns: {
      type: Number,
      default: 6
    }
  },
  setup() {
    const calcWidth = (cell, columns) => {
      if ([3, 4].indexOf(cell) === -1 && cell !== columns)
        return "10";
      if ([3, 4].indexOf(cell) > -1 || cell === columns)
        return "6";
      return "";
    };
    return {
      calcWidth
    };
  }
});
const _hoisted_1$t = { class: "skeleton-table-wrapper" };
function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KSkeletonBox = resolveComponent("KSkeletonBox");
  return openBlock(), createElementBlock("div", _hoisted_1$t, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.rows, (row) => {
      return openBlock(), createElementBlock("div", {
        key: row,
        class: "skeleton-table-row"
      }, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.columns, (cell) => {
            return openBlock(), createBlock(_component_KSkeletonBox, {
              key: cell,
              width: _ctx.calcWidth(cell, _ctx.columns),
              class: normalizeClass({
                "mr-6": cell !== _ctx.columns,
                "w-100": cell === _ctx.columns,
                "skeleton-cell": true
              })
            }, null, 8, ["width", "class"]);
          }), 128))
        ], true)
      ]);
    }), 128))
  ]);
}
var TableSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$v], ["__scopeId", "data-v-84f8bae6"]]);
var FormSkeleton_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$u = defineComponent({
  name: "FormSkeleton",
  components: { KSkeletonBox }
});
const _hoisted_1$s = { class: "skeleton-form-wrapper" };
const _hoisted_2$l = { class: "skeleton-form-row" };
const _hoisted_3$f = { class: "skeleton-form-row" };
const _hoisted_4$a = { class: "skeleton-form-row" };
const _hoisted_5$9 = { class: "skeleton-form-row" };
function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KSkeletonBox = resolveComponent("KSkeletonBox");
  return openBlock(), createElementBlock("div", _hoisted_1$s, [
    createElementVNode("div", _hoisted_2$l, [
      createVNode(_component_KSkeletonBox, {
        width: "10",
        height: "1"
      }),
      createVNode(_component_KSkeletonBox, {
        width: "100",
        height: "2"
      })
    ]),
    createElementVNode("div", _hoisted_3$f, [
      createVNode(_component_KSkeletonBox, {
        width: "10",
        height: "1"
      }),
      createVNode(_component_KSkeletonBox, {
        width: "100",
        height: "2"
      })
    ]),
    createElementVNode("div", _hoisted_4$a, [
      createVNode(_component_KSkeletonBox, {
        width: "10",
        height: "1"
      }),
      createVNode(_component_KSkeletonBox, {
        width: "100",
        height: "2"
      })
    ]),
    createElementVNode("div", _hoisted_5$9, [
      createVNode(_component_KSkeletonBox, {
        width: "10",
        height: "1"
      }),
      createVNode(_component_KSkeletonBox, {
        width: "100",
        height: "2"
      })
    ])
  ]);
}
var FormSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$u], ["__scopeId", "data-v-11e4f5bf"]]);
var loaderImage = "data:image/gif;base64,R0lGODlhtwC3APf+AB9Uef7+/k94lQVAafn6+/z9/QM+aAI+Z9/n7Pv8/fX3+fb4+gtEbQQ/aF+Fn/L19whCa/f5+v39/uzw9A5HbgE9ZwdBahtRdhdOdOnu8jVlhkBtjHWVrLbH0y9ggluCnd3l6x5TeAxFbRBIcPP2+HuasDBhgxNLcSVYfOrv8vH098PR2+ft8ejt8RFJcEVxj2OIoeXr76G3x4aitlqBnNni6A9Hb+bs8G+Rqe/z9drj6YKftO3x9NHc4xhOdPj6+9Xf5sXT3Km9y6u/zRlPdWGGoDFhg0hzkfr7/AZBamuOpoWitlmAmyZZfbvL1jloiCFVeglDa9jh6KK4x9Ld5L/O2b3N18/a4nmZr0NvjlR8mBZNcyJWeiNXexxRd6/Cz8jV3p61xbXG0zdmh6W6yaS5yIejt8zY4ERwj2aKo0dykWiMpMfU3SdafShbfj5ri87a4gpEbODn7Jmxwn+dsg1GbuLp7kFujY6puxRLchJKcdPd5ZOsvsbT3fD09ipcf42ou+Tq74Ces2eLpJGrvaO5yOPq7m2Pp9vj6XGSqlN7mMrW3ylbf1Z+mrrK1qi8y1B5ltTe5cDP2RVMc97m65evwa3AzjtpiSxegLPF0YOgtXiYrlJ7l520xM3Z4YumuZ+2xX2csbHD0Fh/mzhniMnW3013lDJihLzM12mMpdfg567BzrLE0R1Sdz9sjOvw8+Ho7TZlhi5fgiBUeY+pvEx2lKe8yrDD0Kq+zEt1k4mluEJujjpoiVd/mpWuvytdgKC2xpqywl2DnlF6l3qZr6zAzVyCnT1ri26QqMvX4PT3+IqmuZavwKa7yjxqitzk6tbg5neXrSRYfJiwwbnJ1TRkhTNjhWqNpnKTqrfI1JKsvnaWrZStv2WJo7TG0oGfs8LQ2lV9mYShtS1egb7N2Juzw3SVrLjJ1NDb44ikuGSIomyPp3OUq0p1kkl0kkZykMHQ2nybsH6cspyzxO7y9WCFoBpQdpCqvIynusTS3HCSqWKHoQA8Zv///////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3ZjIxZWJkYy04MzJhLTQwZjEtYWZlMy1lMjZhNzM4ZGY5YTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjNGMkExNzA5QzQ2MTFFOThCRTFFOEI2M0M2NTQ0NUIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjNGMkExNkY5QzQ2MTFFOThCRTFFOEI2M0M2NTQ0NUIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyN2YyODg3Yi1jY2Y3LTQxODItYjE3YS0xMTY4NjU4MjI5ZDgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N2YyMWViZGMtODMyYS00MGYxLWFmZTMtZTI2YTczOGRmOWEzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQoA/gAsAAAAALcAtwAACP8A+wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoU6pcybKly5cwY8qcSbOmzZs4c+rcybOnz59AgwodSrSo0aNIkypdyrSp06dQo0qdSrWq1atYs2rdyrWr169gw4odS7as0zB/zDpNxI+f2qZt3fbjUOBtUVUC4+bNMsGu0A428rYVDMAv0E8H5Ortt9hwz8WQB/fDkcDxzRuCFUuG/KaFZZrJ7GUezXgzPy+fZZKBoLk16capXUZ2XZr2GgKxU6p4bZo2ZFKYc5d8xoi3796CfQgnicrF8efGl480gLx2dOvYi0SQ7nH2de/Y+VX/s8OdI/jz1SNPKr8RPfTw1dljdP89vWQaCuRXpA//PWQPCOg3EX8E2ueCgBIV6J99cgWA4EILRlifXIqQ8GBCEvY34Wu/6HDhQRkqWJ8zHxpUWD8ApChQiieKqGF4XaRQYoIMbogdF4bMKFFiIdbYDyI6SqSNjy4GOdEaPb63nZEQJZCFjfwhUyILDjggUJVW9oOlQN3kUBA9UBLZwYdFEJlFZQa5eJ4PMj5YAZH8rHFQA3AuWMuFRRJUSZ02IpgnQTgkeZ18P4QpVyQFFXCEoYOytwyjKGZQkB+QgsdeBhRUykuhafL5IntpCFraBwcN4Kml3PWQWKWSFRTGqfFx/4cGrLQZxIGosEmnZnXJJHrni/yVtyttPuRIkIXA+igsra8ZoQyIzErXV7I9QnKQBbBiwd01rL5XUBmeQkAGd5EY0G2jBGGR4SLlHYGrj/AUFAAnfXLXQbT8nfBMQfklS4N8buBLpBtedkrbAWboN2yYLxwURXWsCLgwtaQV9EisCgucoUGCaLYBnhrbOCZBAYyS1xpIXGjquxlSAERBCwjETInAhEwxY7O0yaRA0bAc5iVBriCvtTdPnKuAdfVzAiX8nlt0qwgqIEBef1BqsNP8FSPgDadotqhBD/t8cxRn6BcCxgINYTOBRAQiH6oELSF2gUZwF8x1TshrDNae5v8WwDbvjSBFQZwa3XdsWhCJAg/Qzu2jDLEVeMdBdazt4wBCG4bX03IV1MGqnFe6tF/kjACpQYQ4vqAbdgFjKqTeGCRn6LQfPdbEdexREJqGbzwWbrVvBoCkVwefITdiTUCi8YLxcpAelr93wDlg6YCC6gdJ8jrzRVMAzVcnRI9QJ9gnO0tVVaQvUPpV8E3bKra6X29UvdsYhScFSSD/zVPVX/QFMWjc/sCTMKdQYYBwssZBfCA+YMGPKTnoAgJ9N5BSPGyCr7nfUgJQi/L9aSAXwyB8RKOUHTTQReMqyA5ECDej8IiFPrIAG+QFQ9o46Cj+M9oW5CBA7vFHW0SJmQ//LSeLgwDghOmZAlGylEObFYQKIvBgejAnlD3V8HQF8cYBrliaPAQFDNtrotjmYRA8cNF2OrkAEsU2AEkgRIzXSRpP4DhExehhX8Wj42LW4RM9Wo51BmnCGl/jC53g4oxOJIgOnHNGA1ADJ0AQASLf9QuEkGMAiAyMTR7QBil68AClSMjd6jg/mQxjkKRkDDsa4kfaAE8mrdyfNPoFIVQuJkuwtKXNyOEQWehSMQV0CXlSGUuIwAIDnnxNBR7Ikh9oYJJOgwgbIIDIOLhEHckkJtQe0gxosoR82Wziv/bzS4HQ8iTYCufa8qCzAZWzH1q44UmKmcNuWmQM7+QHMVJC/0/JsGhFKkJRQP8p0BON0yIsOBsiC4GSfnZOJuiQpDaPk4SG6lKBNYnYRNE1Enq6gGk4cahAdkMSesYuJyLtxxHkGJJi7lMnG8jnIUqKSpb2wxtT64cAdiqQnebUpz3lqU6FmhEeXO+MdaBpNguiAxuIrZ0VkYLpNhoeNCgVgQ04yC9stgE0XcQKZ3ypSPxoxjziCwfmsaVGx3pCRciTIE1Uokbo6ZmONhAFD3ij5aipkXag8kR2Ld8B9Vq+jDwAE9nsRUnoqBA6etUictiCCMsa2P0pxBgNRGtG+iDCICzWctVgSArCN0C5zrWBQqysD10QIIbIwIMQKNtpC/vZudOJ4SHvQGAINtKIBprEf/GACEgZixEFaIC2V+WeTR1CXIzcoBWWrW003Vk+014EDtFN7q6yWhHqlC+2aRXbbwVGC4sAzoMhgKpF/DdeXGnhIgrgghQ/phFkile6tGtCXi+CWQR6cbbT1a6nBnuRWEiRA+0RmATnGS2NjECKQAJw8JhgUVFlZAIn3EV4WaWNCofJAxthwwmHsOHggcHD3cNjRqbQQAykLMG4SgKndkbjGtv4xjjOsY53zOMe+/jHQA6ykIdM5CIb+chITrKSl8xkqgQEACH5BAUKAP4ALA4AHACTAIYAAAj/APsJHEiwoMGDCBMqXMiwocOHECNKnEix4sIXPCxq3Mixo8VXAvlB6eGxpMmTHa8ACMkvDsqXMGMmFBKHH0ub/QrI3MmzJL+fNwXuStGzqNGHKoL2+4mTX4gzR6NKJVijjVKmLCFM3WpUjI2mQJeGxdoPCdezMA+MXQsW55sWaONyVHCV7dULYOTqnSjHSN22dZPsHexQ0iTAYhGTJUuAsOODA+wm/quU1I3HmClP3rx4rI8+mQcP0dxZ8doBofWqIEJacmmlP1KfVWK6dmucGuzInrqogm3Orl1vkbQ7qpHgv18Db1D8qPLnyDUvaM4TevLom0/JoS7T+u3vS0+g/+J+0hJ478BNHyBfUsWF89jRk1XGfiObXPCv6xe4o75HMkpokN+Am+nk30mfhPNeegQqd+BOHDgTRYPBvfBgUXQxqOFzFkxwYUUOABJERPLFx08qH1JE1iFkgMBQiful+FBjGi6BygMHwQiejAwVoEVr6xkkjIkxBsCjQofE6AhBMTAQI3rcHInQEkQKhEkCBInzJHYQACGlQTouxQxBC6y0YZVLeUDjlw3mkQNBj1BoGgJslkIhDgQZeeaWdEqpQx4UMgcmmtD1ySMLUGyJWEFhFiqlCYRKVpAIkc4pZaOSYTnQDJXWZeiFemKKGB8ERTCLop7KqI+cSrmQ0UC4oP8K3KcHfiLrc4cU5AqrSy2h54NldLqhAdAQdAWvq8gY2a3BHZGjsDyKuiNBmAp4pLR7PvvkKNNdKyx6BXGBJh2/Rvstdh4O9AWabPbjG7O/XVPQHdex1m4/MJz7mwGRENRDkM8ZYci9/dzgJK/PWUhQGpopkiHBO8DbmigEZaBZuTx2MOZACiyILXQoaMuSBQSLcMKbA8mAMHaMjoUBGwT/xA5BEqz8W8s4tQFLu0mJhdqgEmtYEBphIdJuICYohbPNSpE0EBUG4NTuFV4sStCyTG92R0FrSM0mpYiVi4y+pH1B0ASaxCwZGQTxMELQz3WxZrsSmKMZAN0KhAfcwS3/Q7ACnCQ3A0EEdJF1Z3UQHEt8dVg8UDGHS8pmiYOInO3lZElpBXwGWP6x5DKC8nOYS2OOpnkpxgMtQRCQrSEUEaSIrYECleD6c4MfmC62cxD0AAZ8KyYCC/7pELLpiGGA40BzBF9XEfWtcALcJRBUACaRg1VBfUncDoFuA1GTvdK7JUBJ5B94fntYmKnCyj0CSdOA85uV/jlieQ92/7QD7a+hOI/xH7gIUof1IYYBMdhLzZDHq7lxin6LccBeKMbACpIFD2QCAATHUgE7yeUS49PQCF4lEDJsECxPkEsQTkgaZOQpFiHM3FmGwcINDaAGBFlBDNnHFSn4ZoemgYT6/+h3lm4YkED2O2I/BrYVCyiRdNR6YlhowBUBrm4gepBiU2A2FSvK6mH90IYWQzIGjBXFiwTqz0AS0IQa/qQMR9EUGivIgMsMRBRu5MeCigJHCz4RBgXZABCP4oFBYq4CThMIHAzZE2rkcUtZGGLWekI0Q0Kxf2Psx4hkAodMYiuJ9NOAGU3CBE9eUSBE8CQoZBK1RyKRIGHwJBFIEJM5+q8gEvBAHolRS1NuiQEIsUIetQITW56LFgmpBSNL0i1j3ooUCzyIFJbpkd75sYZJKNaLMhlNjhxvjgAIp0DCaSZyjlOc/TBnP3ThEGcKpBM+CaFR3NkP5XmkhkZJlBs3cf9PeRYlVm60wPk4gs+iBIAXeeRERzYYpKOAIY/AJGjk3EAQkPRDABgVCEYFoNGMXtSjG3XIKHZ4jIVGjgkEWdI1HdInY9pNoisFjt8G8glePcSYcYKpFVUqkPTF9KZSdJFO12dRK/EKLg2xJaBMGtPFeIEgP+hcTMPgkD880VlMFaApCOKJoAmxIWJ4Yij62dSxjHUgseQVA2LXkBdA0BtkFWCyBjI2hInBIVQA2O2QOlS4feoNcEORQ9SRtVbEs6w4GUFBvoKwpzqEeIgVyI/i6rqtDQQB6zsWRPyXjsP6LxEEucX6BEEi122OskGbAkEEsb5qlDZoy8uq6/ZAEBp0EtEh1nCdSeinKYGI67YNgYduPTtcTAK3IZAI2m4nGcXjMmRINiWucpvL3IYEAHjRRW12/dmQTk5Xu37kgiR/6hAzFFe2t7KAJwiSjMjtIiIbOG9fGzQNmsEwsmIRQkSwRl7whskYBekABCcxt6SeSwQbCQgAIfkEBQoA/gAsFQAdAHkAhQAACP8A+wkcSLCgwYMIEypcyPDgA4EJGkqcSLGixYsEY5gQuCEDxo8gQ4okGKkVP4H8vCwaybKly4MU+J3sJ9PCy5s4Q8qcuVMggZxAgyLUhFJm0ZmkAgldCjQBDJ5GaUblh2EF06su1UzdCrUB1q8ie0qFSlbgArBoJUY6ynZs21MI0spFaIVCW7F4p+pxMrevwCkDyrodnPeA3755BSduS+Iw2sWEubb9VcMxU4+RFUsmbIOVZaEf7m6GDPkzTieaU4sWnMO0ywVdVGde3VbaHtcssYzeLRsvAyG4RTbgTXu28eAfSRM3DnkC8ovKey8XG+LMc4ksikfXPhoCqOsMHXD/l06+LfiEP/u1izm+PfOo5xkWuCJw0vT7suNTVBXM/fbIa+j3kRyFpOHfdDQUIGBBKWRXER/4FYdBegsO5AE/XQhUWUOGRMjcEhUShNcWigikIEJIeEhaAyuFaBwDL+yA0BblvYdChd+4N8YzBI1T43/6AfNjJgRpdWB+51kRmH/TEFTEj8sZcl5MPwpC0CZQyrbLef/hNQhBEB6p3XMPvaeYKQQNkeWYwSWghpg0aUBQEGsyh9xTcPJzAUEg1ElacJqoOFUDAQwUgZ+jBdflbi0QNEKeieK2qGY9EOQGpIqZBgSmRWVDUBacEvbZDSGEKlMnBNFgalRzWEaCEYhC/zUDQRysOtNnRwiqmRIEAbKqLK5Nyl2JA9li6jCNmSbse08QVEWooRQarK6iQUGQFKEit6xyNg2U7Lb8lPocuEgOtC0vjY5L7XEielgEhdquW1q7NcZHbnEFLfqofveya+50bWyInLQCMSDvZvku94Qf4G06UBMHC5awbLeB5whBx0RsHr34PjeFQIUQ1IjGg03cMW4B0DGTLgThQLJYJvvr2gdRYUOQGS/Dx3FkG6k70ygEyZDzrTvnZRVuG4q1AUHnDH0QaUwEB44ebbVBEBVOGwRZHEq5VsiSg9k1UAZZxyxWI4qOdtZAw9n69GZ/mJYeaSAQdEGsG/8rWAVlHv/GwxvaBUGQBniXXPRUqDiGCMTaDUFQLYXDfDhPsx52wnS+EJRG5DrrfZcAjnWJBUHycD7TDwQZMJoPcwUgo5kowUBQJaYLFNdAROxmR1oECPPjEQTdUns/fQy+Gy5pbaCiEQSBMbwlBOWyW62Pqcj6QLAMn/lAm2sGOFMFfIFGngec2A8Bw48+kMqaxXGVSYg6KNAJbvcj+0C0l/tSPqrC/h4cBGFE/YA3EFEsBycX4lwHCPKC+nmAIKU44E36lZd5ECQ0/vsPBggSCAm+hIJbAdFAtlG/CkREICnSX0tACJVr9Kp+/IgBQWh0MpewsChaIEgzYNgigchChSy5oVT/mjWQZ2VwOkQaiJFkJpITClEmXCCIKmDYpIE8qYYi8QQM+QEBgqgAhlYaiG6K07WRVGKLRPPcERXzpYGEyTjFaEkR0Pi2yKFpIGoqTjRaErc1usds8pLTQPogm6WN5AEVoKPWXrangfSpOCIwH0jIMTzJqZGChDJUbyoWknRUsnNbTJdAXKCdcoyEE59M4xYrNZBLMacbI7mbIgGJKE8NBFTMAVZIYpA1S24RVQPBIGkMoIyQfKGXoPTjeyonEOopBxwh0U0q67gqXg3EV+9ZRkiygExVKlM5xBKIsd6TQ5BQaZaTgxQRBSIJ7nhBJ92k5je3Yq2BYMt/yYnnIjnX/y2BfMuDFnkiwtI5T28CCSNCBIBCBaJQAMhTiLTMW0BJNhGBGhSgFYGoRCz60IFCh6IbLRtBfZlRkDaEo/vEIkU02hAbiPSSHp1o4dYmECUIAHT9qNtA2vDSPyKUZIggiCuicg6CKG94ETXcRwt3NIEwISoyIMgoeorPnxbuEbSKihkIgo2cGaCjErNqqGhBEFpEBQcE0UXOTkEQSvh0qaEi4UCEEBW0DaQMOUuFDt8q01BhUCCEnMkxCOKInAGjZXwtaeEaOBAERKUJBAFCzu4pkDEkliKBKZwAB4K+mTCAIBN42QgIRoAkXHYilyAZKWfIEwUQJAmRe9NAnMedr/+CpAQviwBBTMATHRAkBJGjA0EIIZ2efQQ1kdOpQNzBk6b2YwyRW+BAnsqdNn5EAWCjoOC4xxPgDEQAkXPOQLggnTCIJLWm8q5ABMETQhBkDYW70UBScB+H3TZy7h1IMHiyCYJ8o3DGIEgmpkMBCYgENabq70A6wJN6EGQOheMGQXDbm/GJBLumEs9A0MET2QpkwKFKBkHQMB1isOQSpnoHQeiLEg0LhMGhQgJBzskcz4ykBKa6gxd58rGB4DZbI50KZg4cKgasZSCJ4IkMBwJdIMNUMLNoiWsLKpAyEGQPqhNIHwXihwMULqli6cUE11WQoc7kEAQ55peDPBM8jLkcTjG7BUHWYVL3FO+DglptzBg2EEbU2X+6pUhAAAAh+QQFCgD+ACwYABwAeQCGAAAI/wD7CRxIsKDBgwgTKlzIcKCvcQ0jSpxIsaJFg9348bvIsaPHjwg1buwXTwLIkyhTFlwkUGRLd/RUypxpUYaFlhpxdqHJs2dCHDn7uRQa1KdRn0OTBuVQ4KjTkz1wjlQ6NcuEp1gvDokjtSvRqfwAZB0rsURQql6Hkl2bEO3XtEFxJGBLVwpcsHjTvmlBl2wmG3cDvyXqpW9WQgfyDnbr1rBTA2cjK2YcdA0Bx0glC6Y8ldQNzDw5b9ZM1AdolZ8XkxateuTpk+FGT15NukiE1x3FzN4tO201O7gtKgDAu3Vv1VuCV+RAuzjrxsojQnbe/PjQDwqiM3xe3bh3fh4QaP9XCGMS9fPW+Zkar7BAlfTov8fyw74hm2g7v3dnjelqfYqY7CegYin8Z5EOZsB3nIEInRGRNm8coKB3SDBoED8hYBNRBgINMKBgm1gokBheDeJEhQut8qF3B0hiYScGwOWCQLchRMiKjHmRg4HfdMdAL7YclAiOtPViIHcj6UCQAEQWp112+ilWCkEeNClYdBPwMuErBNVhpXfKyeFGfGoRhOSCwRHxZUFnRqldm2UOBGd3rz0yYZx30gkaHmSSxuaX0Dk2ZJ+K/UnolZjNWaiZgPrZF31uRmponovSBQqlXk0aKWMG8IEZHZgOpqmiArmACmgOhIrnpt0hctoxqhb/xeihop7WSqyuzZqnObghISGrTuoKrEBJyBAcCLQGGiobyjmRrKNzDVtrcOU8C9YFBIGQZyPjmRXrJQRZcecOAYz3gbU4CUNQOROuUt8T6BIVCkElTPifmrFeOhAT6Q1g4A+NgvXeQE+kV4iBNQSMkxwEmbbpvAZmo7BQDTRFY3x6WPxfJRPzwwVBQJCZzXjBEBRNx1kQpJt1Aoxn7ECNdKwOQXyQaQBwuNEiEDwEadDxEgSx0yeopxVwzUg4C2RevPyQQRAnfRLxWi5BmSRnx8wOZAStoK1K6mJ8DTQC131dkamwX0dBUA5r0tWBCGdfHe8fBMHR9lrMJBY3rgLl/0KQJV/+wJay0rqlBEGAfHlwVlAS/vVQgBCkxJfOZMVCNYjKHaolBFGdLBVPAUFc5nz3Y/ZAjAB6uFMU6Kl54UHtOFAUgNahjFOsjXp3rHP4xKWkaO8OO1hG+JQGmq9/rTvZMnlSAfKlL2+vTAGQEp/00mLf5kwyrKi998Ezn5IPAjJAEA/Rhz9huSpx9wtBDg6/t/yDDZwSd7UQNET6yX/JbfsCOgRBPsG/0g2AQyC5RXoiN5DVPU5W/UsW0D4SgVmkh3MDaUcB6ZeUWVitIzvoExwIwogNPhAsJOoILGiXHtkJRG0chGDpNLKejoQDR4AZSAaYJsMYguVXHIGTB/8IAgYexuhCHevhROAECYLYgodiQSIPc2UROCWCIGbg4R0OcsL5NQSBcCIEQQbBwyIcxARJpKJEYHAnURDkBTzUxEEekUaBKGkiKLgT6AaCAh4uriASaMIUBaKhiVTiTiQYSACSwMMgICQMg+yHHmoUkctI6wQEiUESY4AQAtzKhy15GUXaZA2CrKBjFmDfQcQISqEUrCJt0gJBCtGxNihkATPkBzpguSIOEEQTHXNHQ7pIlFRUJA8r8gVBYNAxY24niXCjSBbjk0KB3KFjBHxmJCdCghPEBxoEgULH9scQ2m1zIiE8DiX70YCOxW8hQDmnRHKQw9ypr3DoYwgsPLT/wYYQzZ4RnBAFJLKPSOZTIv4BaOmGGBEdPK+VeLiIQlvZRIkYqZVNUOUSXVe6K0rkdMTkh7h4GayASgsXVeyYLBuiUQhwtJUqSCnTGsAChcS0H18gyDpeSkyJJlGOCeFXP0ygyn2WtJ8RCSmGEkKNqeR0IGQkXSsvYo06HqQA45gKUQeCgCM6bmIXAZw8B1ItsDxVIKkC0z23ZxEJpK6fGIiMCQjiKrWalK01GatUv/qsGQ3kdhRJQBSJaUmTYu971KEBQVzUD40yhBmlE8Jhg3dEgQguhkEaiC4EIlmJ4LKVGxBI/NyiUaWMgSA1UFUDXNgPTgjEDdHaaLxy6Aqp/8YhMvggyMseV1uC2KMl+pJtqIx0i6OqRlsDqeHjcjsQQ0wlBIVN6sTKgARB7vUspyAICSCgqtQOZAhg8dREGDAxemiDp2eZoECeGKo8EoQ5OHGYRAYVKkmidyqqIMgNQ+VLgqDRiwlJBlgnOhRMEGQB5A0VAgVSxEoxZAYDvq9AICaQYoCVIA5wVEN+EeHZ+EuKAtmjQBbQg2IIxBnInN5ALBAZIEo3XvrprR0BXBBIyYMG2QVe/94xyg7DRRwE4QaNGQKOMERDIC4Fi2JBTBRg9PhZkxgIAKYskClHccrv7IczrYySAMjhVP3IxThSUxAu9wMA0njAk/NUj4EEBAAh+QQFCgD+ACwYABwAeQCGAAAI/wD7CRxIsKDBgwgTKlzIsKHDhxAjSpzY8IHABBQzatzI0WAMEwI3ZOhIsqRJhJFa8RPIz8uikzBjbqTAb2W/mhZk6tzpsKZNnwIJ8Bw6VBPLmkdtkgpEtOnJBDB+Ir05lR+GFU6zclRTtavUBlrDUgRKVapZgQvEqlUYKanbsm9PIVhLl6AVCm/J6q2qx0ldulMGnIVLeO+Bv2v3Dlb8lgRirYwLe337q8bjoSMlL55c2Aaryzs/5OUcOTJomE42qx49OMfpkgu6rNbM+q20Pa87YiHNe7ZeBkJyb2zQuzbt48LHFj9emvOE5BKb+15ONsQZ6A1ZGJe+nTQEUNgXOv/oPr382/AIhfZrR5O8e+ZT0S8scEXgJOr4Z8t/qCrYe+6SrbEfRXIUksZ/1NFQwIAEpaBdRHzkZxwG6jEokAf8dCGQZQ0ZIiFzS1g4kF5bKCLQgggh8WFpDbwkYmQMvLADQluYBx8KDH7z3hjPEDSOjQDKBwyQmRDEFYL6hWeFYP9NQ1ARQC5nSHg0ASkIQZtEOdsu4QGo1yAERYjkdslZBN9iphA0hJZk5paAGmPepAFBQbDJnHBRxcnPBQSBYGdpuWmyYlUNBDBQBH+SlpuXvLVA0Ah6Kvoao5v1QJAbkS4GGhCZHpUNQVl0WthlN4Qgak2dEETDqVPN8RgJRiT/KtUMBHHAqk2XHTHoZkoQBAirspxGaXcmDmTLqcM4Btqw8D1BUBWihmKosLuOBgVBUogqHLPN5TSQstzyY2py4SY54oq8OEputcgRxGwRFW7LrmnufoheucYVxCik8uHb7rm+tcGhcNMKxMC8nOm73BN+YMfpQE0gPJjCs+GGnSMEHSPxefWam9sUAhVCUCMbE0ZxvrkFQIdNuhCEQ8lknfzvaR9MhQ1BZsAcX8ejgbSuTaMQJIPOuPIsGVavcUjWBgSdQ/RBpTGRGzh6vNUGQVQ8bVBkcTB1WiFMEobXQBloLTNZjSxKWloDEXcr1Jz9AZp6pYFA0AWycgzwWxWY//kXD29sFwRBGuRtstF6oYIYIhFvNwRBtRgeM+JV0frXCdT5QlAaku+8d2ECIOYlFgTJ07lNPxBkAGk+rBXAjGeyBANBlZwu0FwDEcGbHWIRIAyQRxB0i+399EE4b7iItcGKRhAEBvGWEJQLb7aGxW3rA8FCvOYDcb5Z4EQV8AUaeh6AYj8EEE/6QCtvFkdTKiX6oEAnvN3P7APV7rFJ+awaO3xwIAgj7Be8gYhiOTHBUOc6QJAX2M8DBCkFAmHir73MgyCi+R+AMECQQEzwJBXsSogGsg37VQAjAlHR/kgSQqlcw1f240cMCFIjlIFQZ1ogSDNi6CKByGKFHWnhUf+cNRBoaZA6RRrIkWbGERQKkSpcIIgqYuikgUDJhh3xRAz5AQGCqCCGVxrIbozjtY5UYotF+1wFwTQQMR2nGCUpAhrhJrk0DWRNxolGSeR2RBudbV5zGkgfZsO0jjygAnPcGsz4NBA/GUcE59MIOYg3OTXOq1CH8o3FNpIOSnpui+oSiAu2U46OcMKTadyipQaCKeZ0oyN4S+QfE/WpgYSKOcHaSAy0VsktpmogGSyNAZSxkS/w8pN97I7lBFK95oBjI7tBJR1Z1auB/Ao+y9hIFo6ZymTCp1gCORZ8cqiRKsmScokiokAk0R0vbOSJ9LJkoq41kGz9LyPwTBg6I+X/LYGA64PR4eY0vRnP9+CzZABIqEASCoCBPnGWeguo4R6Sz24GSTkT7YnZ9nm4iTxUo8SDaEclqi2Q2k+kvYzIRxtig43KM6IqLRnbBKIEAYSuH3YbSBtcalCMigoRBHHFVM5BkOWFlKMphcgTkSYQJkxFBgQZBU/v6VOCTuURtZqKGQiCDZ0ZwKH69GjJaEEQWkwFBwTRhc5OQRBK9FSshivhQIQwlbQNpAw6S4UO30pSq9okgwIZpE2OQRBH6AwYLuNrTA3nwIEgYCpNIAgQdGZPgYxBsRARjOEGOJD02YQBBJkAzEZQMAIkAbMPuUTJRknDnyiAIEmQHJwG8rzu/3xVIyWAWQQIYoKf6IAgIZAcHQhCiOn4LCOpkVxOBeKOnzC1H2OQHAMH4tTusDEjCghbBQfXvZ8EZyACkNxzBsKF6YSBI6o91XcFIoifEIIgazAcjgaSAvw8DLeSe+9AgvGTTRDkG4YzBkEyQR0KSIAjqTmVfwfSgZ/UgyBzMBw3CJJb35CPI9k91XgGgo6fzFYgBBZVMgiCBuoQgySXONU7GvSTDQukwaJCAkHMyZzPdKQEp7qDF38CsoHktqQvLUxmECwqBrRlIIn4yQwHEl0gv2cWJXmtXwVSBoLsYXUC4aNA/HCAjAaZLL2gILsKIlSbHIIgxvTye/AgZjvJ7BwWBFlHyVA6FePdMEqslVnDBsKIOSN1KrudSEAAACH5BAUKAP4ALBUAHQB5AIUAAAj/APsJHEiwoMGDCBMqXMhQ4QseDSNKnEixokWCrwTyg9LjosePIEMSvAJAI784IlOqXHlQSBx+JmH2K8Cyps2L/HLGFLgrxc2fQA+q2Nkvp0x+Ic4EXfqzRhuiRk1CYEp1pRgbR3UW1Rq1H5KqYD0e4Eo2q8w3LcKqbagAalmoF8CsnXtQjhG3Zt0moctXoKRJebcG7tqVQN+1A94KxkuU1I3DYQkrljzYRx/IS4cwXsyZsskBmIGqILLZc2fFP0LXVDJ4suvAGuyoVrmoQuvbpblukTRbpJHXuXFvbdA7pOnjwE/LXFAcZ3LkwruektO8IvTg2IueQFW9oaXs15W7/z3QfaGKC+Cfq5eprPxBNrnSR18vcId7hWSUaJDPnzPN+w19Eg564hUYXlcAWsSBM1H0h9wLCX7UloH0FWXBBBES5AAgQVB0oHqpZDhQV4eQAQJDH84nU4KGFbgEKg8clGJ2ABagRW7kGSRMheEFcN8hKgrkCEExMBAkhTJx494SFWKSAEHiHBkeBECUN2NRzBC0QElIgudBi81dyU8eORD0iIOuIVBcKWjiQJCPXcaZk5qz6ZAHmsQZJGaas7EAhZSKFbRna3SGZgKPgRIkAqKEzjYoUU8ONAOjbhXaF5yPcsYHQRHMAmijkOmDZmAuQDQQLp9WCtknqRp4SEGujP+q0RJw8lUGpQYaAM1IsvazCmaJtYrcETLiGlqm4QmK6H6qIZucslKOwlyzuCZLEBcV0lHrsdUmh+FAX1TYnG3CJndNQXfMR1p1MHQrnAGRENRDjscZYUh3NxjZ63EQEpTGZopM2N0O5c4nCkEZbLZtaB1kOZACBDrbGgrFZmVBdyKcUOZAMuz7LEGEYcBGdzmxQ5AEHgsHrUBtwNLcUFuBpqe7mxWEhlaINBeICUStLGeFHQ1EhQErFneFF4EVFGzKRN1R0BpF97ZoYNsiQ7OBXxA0gSYkK0YGQTyMUHBpXYDZnATmbAbAtALhMTaFy3SnACfRzUAQAV0wfVod3cX/8lwdCQ9UjN6mhaneIBUTrtVsVqRnQOI/H6kaKDJf6bPERH0HWTzGEgTB1aZBEQFkmf4nUAmgT2Y3Xd9mOgdBD2Dw9nEisDCXDhRHThQGMQ40x+yuFbHWCifMXgJBBWCieFYVrJUE6BDINhA1y/e8VAKUKP4B5JhzZpMqrNwjkDQNAJ80yKkHxrZK3Vs7YvpEiVNT+x8PVAf8nDEQQ0oo6+5/YQSZlPmg4oCUHOx/uMKDlgAwwM5UgE0huUT1CjQCUwmEDA2UzBNCEoQMPgcZb4rFBBHkkWF4MDoDqAFBVjDCxV1ECrZpYWsgwT38eaQb+LMc+k4okHtZxAI5FNcO/ydIA+fwME4F0UMQjzIy6ywxOwLrhzaeWJQxLKwh9GuVfQaSgCYcMSdlkEikstgfBjxmIKL4Ij8I1JAwIjCDMCjIBmQoEQ/QUU4VCJpA4HBHhlBDjYDKQg0byJCb3VGH7ztihxICBypm6nL408AVB8IER3ZuIERwJCgSQjRA9qcgYXAkEUiAEDK+0XoDkYAH1EiMUloSUAxAiBXUOJVBHtI1tEhILfookGmZElmk6N9BpMDLfrzulMg0TRJ2hSIq9i93pgSANAUiTS5Vk5rT7Mc1+6GLiPxSK53QyATB8k2Z8K4o46zKn764CXQmM1FUQdUXLUCJI4IlALxQI90Ul/+jsIBBjfp6Z1bcgBGBCOCgBkVoPw4qgIQ2dKEKZcgoWngMDzKBIENCJkPo9E1zeDBuA/lEryTyzUd4MKMC2Z5GvRlEEHgwIwNRHjLTgsUc3imDXiDIDx6HzDBE5A85JFYGTUEQT7yNhg0RQw5D4c72MXUgoewVA0bXkBdk0BtNBd2vBmK1fYkhIlSgF+jSkkFLvWF2IYqIOvTWCnEKVCAjKAhW9pXTiNjurf24UVbf5rSBICB1V/DQ1dLh1u4lgiC3SJ0gBPu2xu21V1MgiCBSVw3G9qp3DdwDQUxIyIhY42oj0lukBIKtzjYEHqAtbGoTqbeJQOJtocUrJGErkR1MjVS1tGWtbCMSANnd9rEr1W33JNLI3AKPC7YMLkPMsNrZWcATBEmG4nZBkQ00d1/TOJkI8ZoTIVBkacF9mzEK0oEMTsJsNS2XCAoSEAA7";
var FullScreenKongSkeleton_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$t = defineComponent({
  name: "FullScreenKongSkeleton",
  props: {
    progress: {
      type: Number,
      default: null
    }
  },
  setup(props) {
    const timer = ref(0);
    const progressInternal = ref(0);
    const progression = computed(() => props.progress !== null ? props.progress : progressInternal.value);
    onMounted(() => {
      if (props.progress) {
        return;
      }
      timer.value = setInterval(() => {
        if (progressInternal.value >= 100) {
          clearInterval(timer.value);
          progressInternal.value = 100;
        }
        progressInternal.value = Math.min(progressInternal.value + Math.ceil(Math.random() * 10 * 30), 100);
      }, 200);
    });
    onUnmounted(() => {
      clearInterval(timer.value);
    });
    return {
      timer,
      progressInternal,
      progression,
      loaderImage
    };
  }
});
const _hoisted_1$r = {
  class: "fullscreen-loading-container",
  "data-testid": "full-screen-loader"
};
const _hoisted_2$k = ["src"];
const _hoisted_3$e = { class: "progress" };
function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$r, [
    createElementVNode("div", null, [
      createElementVNode("img", {
        src: _ctx.loaderImage,
        alt: "Loading"
      }, null, 8, _hoisted_2$k),
      createElementVNode("div", _hoisted_3$e, [
        createElementVNode("div", {
          style: normalizeStyle({ width: `${_ctx.progression}%` }),
          class: "progress-bar",
          role: "progressbar"
        }, null, 4)
      ])
    ])
  ]);
}
var FullScreenKongSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$t], ["__scopeId", "data-v-4f1a85a8"]]);
var KSkeleton_vue_vue_type_style_index_0_lang = "";
const _sfc_main$s = defineComponent({
  name: "KSkeleton",
  components: {
    Skeleton,
    CardSkeleton,
    TableSkeleton,
    FormSkeleton,
    FullScreenKongSkeleton,
    KIcon
  },
  props: {
    delayMilliseconds: {
      type: Number,
      required: false,
      default: 0
    },
    type: {
      type: String,
      default: "",
      validator: (val) => [
        "table",
        "card",
        "form",
        "spinner",
        "fullscreen-kong",
        ""
      ].includes(val)
    },
    progress: {
      type: Number,
      required: false,
      default: null
    },
    cardCount: {
      type: Number,
      default: 1
    },
    tableColumns: {
      type: Number,
      required: false,
      default: 6
    },
    tableRows: {
      type: Number,
      required: false,
      default: 6
    }
  },
  setup(props) {
    const isVisible = ref(false);
    onMounted(() => {
      setTimeout(() => {
        isVisible.value = true;
      }, props.delayMilliseconds);
    });
    return {
      isVisible
    };
  }
});
function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CardSkeleton = resolveComponent("CardSkeleton");
  const _component_TableSkeleton = resolveComponent("TableSkeleton");
  const _component_FormSkeleton = resolveComponent("FormSkeleton");
  const _component_FullScreenKongSkeleton = resolveComponent("FullScreenKongSkeleton");
  const _component_KIcon = resolveComponent("KIcon");
  const _component_Skeleton = resolveComponent("Skeleton");
  return _ctx.isVisible ? (openBlock(), createElementBlock("div", {
    key: 0,
    class: normalizeClass([{ "w-100": _ctx.type !== "spinner", "opacity-0": !_ctx.isVisible }, "d-flex flex-wrap k-skeleton-container"])
  }, [
    _ctx.type === "card" ? (openBlock(), createBlock(_component_CardSkeleton, {
      key: 0,
      "card-count": _ctx.cardCount
    }, {
      "card-header": withCtx(() => [
        renderSlot(_ctx.$slots, "card-header")
      ]),
      "card-content": withCtx(() => [
        renderSlot(_ctx.$slots, "card-content")
      ]),
      "card-footer": withCtx(() => [
        renderSlot(_ctx.$slots, "card-footer")
      ]),
      _: 3
    }, 8, ["card-count"])) : _ctx.type === "table" ? (openBlock(), createBlock(_component_TableSkeleton, {
      key: 1,
      columns: _ctx.tableColumns,
      rows: _ctx.tableRows
    }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
    }, 8, ["columns", "rows"])) : _ctx.type === "form" ? (openBlock(), createBlock(_component_FormSkeleton, { key: 2 })) : _ctx.type === "fullscreen-kong" ? (openBlock(), createBlock(_component_FullScreenKongSkeleton, {
      key: 3,
      progress: _ctx.progress
    }, null, 8, ["progress"])) : _ctx.type === "spinner" ? (openBlock(), createBlock(_component_KIcon, {
      key: 4,
      icon: "spinner",
      size: "18",
      color: "#000"
    })) : (openBlock(), createBlock(_component_Skeleton, { key: 5 }))
  ], 2)) : createCommentVNode("", true);
}
var KSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$s]]);
var KCatalogItem_vue_vue_type_style_index_0_scoped_true_lang = "";
var KCatalogItem_vue_vue_type_style_index_1_lang = "";
const _sfc_main$r = defineComponent({
  name: "KCatalogItem",
  components: {
    KCard
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    truncate: {
      type: Boolean,
      default: true
    },
    testMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["clicked"],
  setup(props, { emit }) {
    const handleCardClick = (evt, item) => {
      emit("clicked", {
        evt,
        item
      });
    };
    return {
      handleCardClick
    };
  }
});
function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KCard = resolveComponent("KCard");
  return openBlock(), createBlock(_component_KCard, {
    "has-hover": "",
    role: "button",
    tabindex: "0",
    class: "grid-item d-flex flex-column overflow-hidden k-card-catalog-item",
    "data-testid": _ctx.item && _ctx.item.title ? `${_ctx.item.title.replace(/[^0-9a-z]/gi, "-")}-catalog-item` : "catalog-item",
    "test-mode": _ctx.testMode,
    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.handleCardClick($event, _ctx.item))
  }, {
    title: withCtx(() => [
      renderSlot(_ctx.$slots, "cardTitle", {}, () => [
        createTextVNode(toDisplayString(_ctx.item ? _ctx.item.title : ""), 1)
      ], true)
    ]),
    body: withCtx(() => [
      createElementVNode("div", {
        class: normalizeClass({ "multi-line-truncate": _ctx.truncate })
      }, [
        renderSlot(_ctx.$slots, "cardBody", {}, () => [
          createTextVNode(toDisplayString(_ctx.item ? _ctx.item.description : ""), 1)
        ], true)
      ], 2)
    ]),
    _: 3
  }, 8, ["data-testid", "test-mode"]);
}
var KCatalogItem = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$r], ["__scopeId", "data-v-2af2210c"]]);
var KCatalog_vue_vue_type_style_index_0_scoped_true_lang = "";
var KCatalog_vue_vue_type_style_index_1_lang = "";
const { useRequest: useRequest$1, useDebounce: useDebounce$1 } = useUtilities();
const _sfc_main$q = defineComponent({
  name: "KCatalog",
  components: {
    KButton,
    KCatalogItem,
    KEmptyState,
    KPagination,
    KSkeleton,
    KSkeletonBox
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    cardSize: {
      type: String,
      default: "medium",
      validator: (value) => {
        return ["small", "medium", "large"].includes(value);
      }
    },
    title: {
      type: String,
      default: ""
    },
    noTruncation: {
      type: Boolean,
      default: false
    },
    emptyStateTitle: {
      type: String,
      default: "No Data"
    },
    emptyStateMessage: {
      type: String,
      default: "There is no data to display."
    },
    emptyStateActionRoute: {
      type: [Object, String],
      default: ""
    },
    emptyStateActionMessage: {
      type: String,
      default: ""
    },
    emptyStateActionButtonIcon: {
      type: String,
      default: ""
    },
    emptyStateIcon: {
      type: String,
      default: ""
    },
    emptyStateIconColor: {
      type: String,
      default: ""
    },
    emptyStateIconSize: {
      type: String,
      default: "50"
    },
    hasError: {
      type: Boolean,
      default: false
    },
    errorStateTitle: {
      type: String,
      default: "An error occurred"
    },
    errorStateMessage: {
      type: String,
      default: "Data cannot be displayed due to an error."
    },
    errorStateActionRoute: {
      type: [Object, String],
      default: ""
    },
    errorStateActionMessage: {
      type: String,
      default: ""
    },
    errorStateIcon: {
      type: String,
      default: ""
    },
    errorStateIconColor: {
      type: String,
      default: ""
    },
    errorStateIconSize: {
      type: String,
      default: "50"
    },
    fetcher: {
      type: Function,
      required: true
    },
    initialFetcherParams: {
      type: Object,
      default: null
    },
    fetcherCacheKey: {
      type: String,
      default: ""
    },
    searchInput: {
      type: String,
      default: ""
    },
    paginationNeighbors: {
      type: Number,
      default: 1
    },
    paginationPageSizes: {
      type: Array,
      default: () => [15, 30, 50, 75, 100],
      validator: (pageSizes) => !!pageSizes.length && pageSizes.every((i) => typeof i === "number")
    },
    paginationTotalItems: {
      type: Number,
      default: null
    },
    disablePaginationPageJump: {
      type: Boolean,
      default: false
    },
    disablePagination: {
      type: Boolean,
      default: false
    },
    hidePaginationWhenOptional: {
      type: Boolean,
      default: false
    },
    testMode: {
      type: [String, Boolean],
      default: false
    }
  },
  emits: ["kcatalog-error-cta-clicked", "kcatalog-empty-state-cta-clicked"],
  setup(props) {
    const defaultFetcherProps = {
      page: 1,
      pageSize: 15,
      query: ""
    };
    const data = ref([]);
    const total = ref(0);
    const filterQuery = ref("");
    const page = ref(1);
    const pageSize = ref(15);
    const isCardLoading = ref(true);
    const hasInitialized = ref(false);
    const fetchData = async () => {
      isCardLoading.value = true;
      const searchInput = props.searchInput;
      const res = await props.fetcher({
        query: searchInput || filterQuery.value,
        pageSize: pageSize.value,
        page: page.value
      });
      data.value = res.data;
      total.value = props.paginationTotalItems || res.total || res.data.length;
      isCardLoading.value = false;
      return res;
    };
    const initData = async () => {
      const fetcherParams = __spreadValues(__spreadValues({}, defaultFetcherProps), props.initialFetcherParams);
      page.value = fetcherParams.page;
      pageSize.value = fetcherParams.pageSize;
      filterQuery.value = fetcherParams.query;
      hasInitialized.value = true;
    };
    const catalogFetcherCacheKey = computed(() => {
      if (!props.fetcher || !hasInitialized.value) {
        return "";
      }
      return `catalog-item_${Math.floor(Math.random() * 1e3)}_${props.fetcherCacheKey}`;
    });
    const { query, search } = useDebounce$1("", 350);
    const { revalidate } = useRequest$1(() => catalogFetcherCacheKey.value, () => fetchData(), { revalidateOnFocus: false });
    const pageChangeHandler = ({ page: newPage }) => {
      page.value = newPage;
    };
    const pageSizeChangeHandler = ({ pageSize: newPageSize }) => {
      pageSize.value = newPageSize;
    };
    const getTestIdString = (message) => {
      return message.toLowerCase().replace(/[^[a-z0-9]/gi, "-");
    };
    watch(() => props.searchInput, (newValue) => {
      search(newValue);
    }, { immediate: true });
    watch(() => [query.value, page.value, pageSize.value], () => {
      revalidate();
    }, { immediate: true });
    onMounted(() => {
      initData();
    });
    return {
      data,
      isCardLoading,
      page,
      pageChangeHandler,
      pageSize,
      pageSizeChangeHandler,
      total,
      getTestIdString
    };
  }
});
const _hoisted_1$q = { class: "k-card-catalog" };
const _hoisted_2$j = {
  key: 0,
  class: "k-card-catalog-title",
  "data-testid": "k-catalog-title"
};
const _hoisted_3$d = { class: "d-flex justify-content-start" };
const _hoisted_4$9 = {
  key: 2,
  class: "k-catalog-error-state",
  "data-testid": "k-card-catalog-error-state"
};
const _hoisted_5$8 = {
  key: 3,
  class: "k-catalog-empty-state",
  "data-testid": "k-card-catalog-empty-state"
};
const _hoisted_6$6 = {
  key: 0,
  class: "card-pagination",
  "data-testid": "k-catalog-pagination"
};
function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KSkeletonBox = resolveComponent("KSkeletonBox");
  const _component_KSkeleton = resolveComponent("KSkeleton");
  const _component_KButton = resolveComponent("KButton");
  const _component_KEmptyState = resolveComponent("KEmptyState");
  const _component_KCatalogItem = resolveComponent("KCatalogItem");
  const _component_KPagination = resolveComponent("KPagination");
  return openBlock(), createElementBlock("div", _hoisted_1$q, [
    _ctx.title ? (openBlock(), createElementBlock("div", _hoisted_2$j, [
      createElementVNode("h3", null, toDisplayString(_ctx.title), 1)
    ])) : createCommentVNode("", true),
    (_ctx.testMode === false || _ctx.testMode === "loading") && (_ctx.isCardLoading || _ctx.isLoading) && !_ctx.hasError ? (openBlock(), createBlock(_component_KSkeleton, {
      key: 1,
      "card-count": 4,
      type: "card",
      class: "k-skeleton-grid",
      "data-testid": "k-catalog-skeleton"
    }, {
      "card-header": withCtx(() => [
        createVNode(_component_KSkeletonBox, {
          width: "6",
          class: "w-100 justify-content-center mb-3"
        })
      ]),
      "card-content": withCtx(() => [
        createVNode(_component_KSkeletonBox, { width: "75" })
      ]),
      "card-footer": withCtx(() => [
        createElementVNode("div", _hoisted_3$d, [
          createVNode(_component_KSkeletonBox, {
            width: "2",
            class: "mr-2"
          }),
          createVNode(_component_KSkeletonBox, { width: "5" })
        ])
      ]),
      _: 1
    })) : _ctx.hasError ? (openBlock(), createElementBlock("div", _hoisted_4$9, [
      renderSlot(_ctx.$slots, "error-state", {}, () => [
        createVNode(_component_KEmptyState, {
          "is-error": "",
          "cta-is-hidden": !_ctx.errorStateActionMessage || !_ctx.errorStateActionRoute,
          icon: _ctx.errorStateIcon || "",
          "icon-color": _ctx.errorStateIconColor,
          "icon-size": _ctx.errorStateIconSize
        }, {
          title: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.errorStateTitle), 1)
          ]),
          message: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.errorStateMessage), 1)
          ]),
          cta: withCtx(() => [
            _ctx.errorStateActionMessage ? (openBlock(), createBlock(_component_KButton, {
              key: 0,
              to: _ctx.errorStateActionRoute ? _ctx.errorStateActionRoute : void 0,
              appearance: "primary",
              "data-testid": _ctx.getTestIdString(_ctx.errorStateActionMessage),
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("kcatalog-error-cta-clicked"))
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.errorStateActionMessage), 1)
              ]),
              _: 1
            }, 8, ["to", "data-testid"])) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["cta-is-hidden", "icon", "icon-color", "icon-size"])
      ], true)
    ])) : !_ctx.hasError && (!_ctx.isCardLoading && !_ctx.isLoading) && (_ctx.data && !_ctx.data.length) ? (openBlock(), createElementBlock("div", _hoisted_5$8, [
      renderSlot(_ctx.$slots, "empty-state", {}, () => [
        createVNode(_component_KEmptyState, {
          "cta-is-hidden": !_ctx.emptyStateActionMessage || !_ctx.emptyStateActionRoute,
          icon: _ctx.emptyStateIcon || "",
          "icon-color": _ctx.emptyStateIconColor,
          "icon-size": _ctx.emptyStateIconSize
        }, {
          title: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.emptyStateTitle), 1)
          ]),
          message: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.emptyStateMessage), 1)
          ]),
          cta: withCtx(() => [
            _ctx.emptyStateActionMessage ? (openBlock(), createBlock(_component_KButton, {
              key: 0,
              to: _ctx.emptyStateActionRoute ? _ctx.emptyStateActionRoute : void 0,
              icon: _ctx.emptyStateActionButtonIcon,
              appearance: _ctx.searchInput ? "btn-link" : "primary",
              "data-testid": _ctx.getTestIdString(_ctx.errorStateActionMessage),
              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("kcatalog-empty-state-cta-clicked"))
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.emptyStateActionMessage), 1)
              ]),
              _: 1
            }, 8, ["to", "icon", "appearance", "data-testid"])) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["cta-is-hidden", "icon", "icon-color", "icon-size"])
      ], true)
    ])) : (openBlock(), createElementBlock("div", {
      key: 4,
      class: normalizeClass([`k-card-${_ctx.cardSize}`, "k-catalog-page"])
    }, [
      renderSlot(_ctx.$slots, "body", { data: _ctx.data }, () => [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.data, (item, idx) => {
          return openBlock(), createBlock(_component_KCatalogItem, {
            key: item.key ? item.key : `k-catalog-item-${idx}`,
            item,
            truncate: !_ctx.noTruncation,
            "test-mode": !!_ctx.testMode,
            class: "catalog-item",
            "data-testid": item.id ? item.id : `k-catalog-item-${idx}`
          }, {
            cardTitle: withCtx(() => [
              renderSlot(_ctx.$slots, "cardTitle", { item }, () => [
                createTextVNode(toDisplayString(item.title), 1)
              ], true)
            ]),
            cardBody: withCtx(() => [
              renderSlot(_ctx.$slots, "cardBody", { item }, () => [
                createTextVNode(toDisplayString(item.description), 1)
              ], true)
            ]),
            _: 2
          }, 1032, ["item", "truncate", "test-mode", "data-testid"]);
        }), 128))
      ], true),
      !_ctx.disablePagination && _ctx.fetcher && !(_ctx.hidePaginationWhenOptional && _ctx.total <= _ctx.paginationPageSizes[0]) ? (openBlock(), createElementBlock("div", _hoisted_6$6, [
        createVNode(_component_KPagination, {
          "initial-page-size": _ctx.pageSize,
          "current-page": _ctx.page,
          "page-sizes": _ctx.paginationPageSizes,
          neighbors: _ctx.paginationNeighbors,
          "total-count": _ctx.total,
          "disable-page-jump": _ctx.disablePaginationPageJump,
          "test-mode": !!_ctx.testMode,
          class: "pa-1",
          onPageChanged: _ctx.pageChangeHandler,
          onPageSizeChanged: _ctx.pageSizeChangeHandler
        }, null, 8, ["initial-page-size", "current-page", "page-sizes", "neighbors", "total-count", "disable-page-jump", "test-mode", "onPageChanged", "onPageSizeChanged"])
      ])) : createCommentVNode("", true)
    ], 2))
  ]);
}
var KCatalog = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$q], ["__scopeId", "data-v-9e4b89f6"]]);
var KCheckbox_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$p = defineComponent({
  name: "KCheckbox",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  emits: ["input", "change", "update:modelValue"],
  setup(props, { emit }) {
    const handleChange = (e) => {
      emit("change", e.target.checked);
      emit("input", e.target.checked);
      emit("update:modelValue", e.target.checked);
    };
    return {
      handleChange
    };
  }
});
const _hoisted_1$p = { class: "k-checkbox" };
const _hoisted_2$i = ["checked"];
function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("label", _hoisted_1$p, [
    createElementVNode("input", mergeProps({ checked: _ctx.modelValue }, _ctx.$attrs, {
      type: "checkbox",
      class: "k-input",
      onChange: _cache[0] || (_cache[0] = (...args) => _ctx.handleChange && _ctx.handleChange(...args))
    }), null, 16, _hoisted_2$i),
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ]);
}
var KCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$p], ["__scopeId", "data-v-8f1b0918"]]);
var KDropdownItem_vue_vue_type_style_index_0_scoped_true_lang = "";
var KDropdownItem_vue_vue_type_style_index_1_lang = "";
const _sfc_main$o = defineComponent({
  name: "KDropdownItem",
  components: { KButton },
  props: {
    item: {
      type: Object,
      default: null,
      validator: (item) => item.label !== void 0
    },
    hasDivider: {
      type: Boolean,
      default: false
    },
    isDangerous: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    selectionMenuChild: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function,
      default: void 0
    }
  },
  emits: ["click", "change"],
  setup(props, { emit }) {
    const type = computed(() => {
      var _a;
      if ((_a = props.item) == null ? void 0 : _a.to) {
        return "link";
      } else if (typeof props.onClick !== "undefined" || props.selectionMenuChild) {
        return "button";
      }
      return "default";
    });
    const label = computed(() => {
      var _a;
      return ((_a = props.item) == null ? void 0 : _a.label) || "";
    });
    const to = computed(() => {
      var _a;
      return ((_a = props.item) == null ? void 0 : _a.to) || void 0;
    });
    const handleClick = (evt) => {
      emit("click", evt);
      if (props.selectionMenuChild) {
        emit("change", props.item);
      }
    };
    return {
      type,
      label,
      to,
      handleClick
    };
  }
});
const _hoisted_1$o = ["data-testid"];
const _hoisted_2$h = {
  key: 2,
  class: "k-dropdown-item-trigger",
  "data-testid": "k-dropdown-item-trigger"
};
function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_KButton = resolveComponent("KButton");
  return openBlock(), createElementBlock("li", {
    class: normalizeClass([{
      "has-divider": _ctx.type !== "link" && _ctx.hasDivider,
      "disabled": _ctx.type === "default" && _ctx.disabled,
      "danger": _ctx.isDangerous,
      "k-dropdown-selected-option": _ctx.selected
    }, "k-dropdown-item w-100"]),
    "data-testid": `k-dropdown-item-${_ctx.label.replace(" ", "-")}`
  }, [
    _ctx.type === "link" && _ctx.to ? (openBlock(), createBlock(_component_router_link, {
      key: 0,
      to: !_ctx.disabled ? _ctx.to : _ctx.$route.path,
      class: normalizeClass([{ "disabled": _ctx.disabled, "has-divider": _ctx.hasDivider }, "k-dropdown-item-trigger"]),
      "data-testid": "k-dropdown-item-trigger"
    }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(_ctx.label), 1)
        ], true)
      ]),
      _: 3
    }, 8, ["to", "class"])) : _ctx.type === "button" ? (openBlock(), createBlock(_component_KButton, {
      key: 1,
      disabled: _ctx.disabled,
      "is-rounded": false,
      class: "k-dropdown-item-trigger btn-link k-button non-visual-button",
      "data-testid": "k-dropdown-item-trigger",
      onClick: _ctx.handleClick
    }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(_ctx.label), 1)
        ], true)
      ]),
      _: 3
    }, 8, ["disabled", "onClick"])) : (openBlock(), createElementBlock("div", _hoisted_2$h, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.label), 1)
      ], true)
    ]))
  ], 10, _hoisted_1$o);
}
var KDropdownItem = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$o], ["__scopeId", "data-v-a6cf2da8"]]);
var KDropdownMenu_vue_vue_type_style_index_0_scoped_true_lang = "";
var KDropdownMenu_vue_vue_type_style_index_1_lang = "";
const defaultKPopAttributes = {
  hideCaret: true,
  popoverClasses: "k-dropdown-popover mt-1",
  popoverTimeout: 0,
  positionFixed: true,
  placement: "bottomStart"
};
const _sfc_main$n = defineComponent({
  name: "KDropdownMenu",
  components: {
    KButton,
    KDropdownItem,
    Kooltip: KTooltip,
    KPop,
    KToggle
  },
  props: {
    appearance: {
      type: String,
      default: "menu",
      validator: (value) => ["menu", "selectionMenu"].includes(value)
    },
    label: {
      type: String,
      default: ""
    },
    showCaret: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ""
    },
    kpopAttributes: {
      type: Object,
      default: () => ({})
    },
    items: {
      type: Array,
      default: () => [],
      validator: (items) => !items.length || items.some((i) => i.label !== void 0)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledTooltip: {
      type: String,
      default: ""
    },
    testMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["toggleDropdown", "change"],
  setup(props, { emit }) {
    const boundKPopAttributes = __spreadProps(__spreadValues(__spreadValues({}, defaultKPopAttributes), props.kpopAttributes), {
      width: props.width ? props.width : void 0,
      popoverClasses: `${defaultKPopAttributes.popoverClasses} ${props.kpopAttributes.popoverClasses}`
    });
    const selectedItem = ref({});
    const handleSelection = (item) => {
      if (props.appearance !== "selectionMenu") {
        return;
      }
      selectedItem.value = item;
    };
    const handleTriggerToggle = (isToggled, toggle, isOpen) => {
      if (isToggled.value !== isOpen) {
        toggle();
        emit("toggleDropdown", isToggled.value);
      }
      return isToggled.value;
    };
    watch(selectedItem, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        emit("change", newVal);
      }
    });
    onMounted(() => {
      if (props.items) {
        const selectionArr = props.items.filter((item) => item.selected);
        if (selectionArr.length) {
          selectedItem.value = selectionArr[0];
        }
      }
    });
    return {
      boundKPopAttributes,
      selectedItem,
      handleSelection,
      handleTriggerToggle
    };
  }
});
const _hoisted_1$n = {
  class: "k-dropdown-list dropdown-list",
  "data-testid": "k-dropdown-list"
};
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KButton = resolveComponent("KButton");
  const _component_KDropdownItem = resolveComponent("KDropdownItem");
  const _component_KPop = resolveComponent("KPop");
  const _component_KToggle = resolveComponent("KToggle");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([{ "selection-dropdown-menu": _ctx.appearance === "selectionMenu" }, "k-dropdown k-dropdown-menu"])
  }, [
    createVNode(_component_KToggle, null, {
      default: withCtx(({ toggle, isToggled }) => [
        createVNode(_component_KPop, mergeProps(_ctx.boundKPopAttributes, {
          "on-popover-click": () => _ctx.handleTriggerToggle(isToggled, toggle, false),
          "test-mode": _ctx.testMode,
          "data-testid": "k-dropdown-menu-popover",
          onOpened: () => _ctx.handleTriggerToggle(isToggled, toggle, true),
          onClosed: () => _ctx.handleTriggerToggle(isToggled, toggle, false)
        }), {
          content: withCtx(() => [
            createElementVNode("ul", _hoisted_1$n, [
              renderSlot(_ctx.$slots, "items", {
                items: _ctx.items,
                handleSelection: _ctx.handleSelection
              }, () => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (item, idx) => {
                  return openBlock(), createBlock(_component_KDropdownItem, mergeProps(item, {
                    key: `${item.label}-${idx}`,
                    item,
                    "selection-menu-child": _ctx.appearance === "selectionMenu",
                    onChange: _ctx.handleSelection
                  }), null, 16, ["item", "selection-menu-child", "onChange"]);
                }), 128))
              ], true)
            ])
          ]),
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(!!_ctx.disabledTooltip ? "Kooltip" : "div"), {
              label: _ctx.disabledTooltip,
              position: !!_ctx.disabledTooltip ? "bottom" : void 0,
              "position-fixed": !!_ctx.disabledTooltip ? true : void 0,
              "max-width": !!_ctx.disabledTooltip ? "240" : void 0,
              "test-mode": _ctx.testMode,
              class: "k-dropdown-trigger dropdown-trigger",
              "data-testid": "k-dropdown-trigger"
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "default", {
                  isOpen: isToggled.value
                }, () => [
                  createElementVNode("div", null, [
                    _ctx.label ? (openBlock(), createBlock(_component_KButton, {
                      key: 0,
                      disabled: _ctx.disabled,
                      "is-open": _ctx.showCaret || _ctx.appearance === "selectionMenu" ? isToggled.value : void 0,
                      appearance: _ctx.appearance === "selectionMenu" ? "outline" : "primary",
                      class: normalizeClass([{ "is-active": _ctx.showCaret ? isToggled.value : void 0 }, "k-dropdown-btn"]),
                      "data-testid": "k-dropdown-btn"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["disabled", "is-open", "appearance", "class"])) : createCommentVNode("", true)
                  ])
                ], true)
              ]),
              _: 2
            }, 1032, ["label", "position", "position-fixed", "max-width", "test-mode"]))
          ]),
          _: 2
        }, 1040, ["on-popover-click", "test-mode", "onOpened", "onClosed"])
      ]),
      _: 3
    })
  ], 2);
}
var KDropdownMenu = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$n], ["__scopeId", "data-v-f8b70172"]]);
var KInlineEdit_vue_vue_type_style_index_0_scoped_true_lang = "";
const STYLES = {
  fontSize: "font-size",
  fontWeight: "font-weight",
  fontFamily: "font-family",
  color: "color",
  margin: "margin",
  padding: "padding"
};
const _sfc_main$m = defineComponent({
  name: "KInlineEdit",
  props: {
    ignoreValue: {
      type: Boolean,
      default: false
    },
    styleOverrides: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["changed"],
  setup(props, { emit, slots }) {
    const input = ref(null);
    const inputUuid = computed(() => "editable-wrapper-" + v1());
    const isEditing = ref(false);
    const inputText = ref("");
    const styles2 = ref({});
    const handleClick = async (e) => {
      if (e.target.id === "element-content-wrapper")
        return;
      styles2.value = __spreadValues(__spreadValues({}, getStyles(e.target)), props.styleOverrides);
      inputText.value = props.ignoreValue ? "" : e.target.textContent;
      isEditing.value = true;
      await nextTick();
      if (input.value) {
        input.value.focus();
      }
    };
    const handleSave = () => {
      isEditing.value = false;
      emit("changed", inputText.value);
    };
    const getStyles = (element) => {
      const elementStyles = getComputedStyle(element);
      return Object.keys(STYLES).reduce((acc, cur) => {
        acc[cur] = elementStyles.getPropertyValue(STYLES[cur]);
        return acc;
      }, {});
    };
    const onEnter = (e) => {
      var _a;
      (_a = e == null ? void 0 : e.target) == null ? void 0 : _a.blur();
    };
    onMounted(() => {
      try {
        if (!slots.default) {
          throw new Error("KInlineEdit expects a slotted HTML tag.");
        }
      } catch (_) {
        console.error(`KInlineEdit expects a slotted HTML tag.

    Example usage:

      <KInlineEdit>
        <p>Some text</p>
        ^^------add slotted tag
      </KInlineEdit>
    `);
      }
    });
    return {
      input,
      inputUuid,
      isEditing,
      inputText,
      styles: styles2,
      handleClick,
      handleSave,
      onEnter
    };
  }
});
const _hoisted_1$m = ["id"];
const _hoisted_2$g = ["id"];
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    id: `editable-wrapper-${_ctx.inputUuid}`,
    class: "k-inline-edit"
  }, [
    _ctx.isEditing ? withDirectives((openBlock(), createElementBlock("input", {
      key: 0,
      ref: "input",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.inputText = $event),
      style: normalizeStyle(_ctx.styles),
      class: "k-input",
      onBlur: _cache[1] || (_cache[1] = (...args) => _ctx.handleSave && _ctx.handleSave(...args)),
      onKeyup: _cache[2] || (_cache[2] = withKeys((...args) => _ctx.onEnter && _ctx.onEnter(...args), ["enter"]))
    }, null, 36)), [
      [
        vModelText,
        _ctx.inputText,
        void 0,
        { trim: true }
      ]
    ]) : createCommentVNode("", true),
    !_ctx.isEditing ? (openBlock(), createElementBlock("div", {
      key: 1,
      id: `element-content-wrapper-${_ctx.inputUuid}`,
      onClick: _cache[3] || (_cache[3] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
    }, [
      !_ctx.isEditing ? renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : createCommentVNode("", true)
    ], 8, _hoisted_2$g)) : createCommentVNode("", true)
  ], 8, _hoisted_1$m);
}
var KInlineEdit = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$m], ["__scopeId", "data-v-9b9c33b8"]]);
var KInputSwitch_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$l = defineComponent({
  name: "KInputSwitch",
  components: { KTooltip, KIcon },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      default: false,
      required: true
    },
    label: {
      type: String,
      default: ""
    },
    labelPosition: {
      type: String,
      default: "right",
      validator: (position) => ["left", "right"].includes(position)
    },
    disabledTooltipText: {
      type: String,
      default: ""
    },
    enabledIcon: {
      type: Boolean,
      default: false
    }
  },
  emits: ["change", "input", "update:modelValue"],
  setup(props, { emit }) {
    const toggleText = computed(() => {
      return props.modelValue ? "on" : "off";
    });
    const handleChange = (e) => {
      if (props.modelValue !== e.target.checked) {
        emit("change", e.target.checked);
        emit("input", e.target.checked);
        emit("update:modelValue", e.target.checked);
      }
    };
    return {
      toggleText,
      handleChange
    };
  }
});
const _hoisted_1$l = ["for", "disabled"];
const _hoisted_2$f = { key: 0 };
const _hoisted_3$c = ["checked"];
const _hoisted_4$8 = { key: 1 };
const _hoisted_5$7 = ["for", "disabled"];
const _hoisted_6$5 = { key: 0 };
const _hoisted_7$4 = ["checked"];
const _hoisted_8$2 = { key: 2 };
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KTooltip = resolveComponent("KTooltip");
  const _component_KIcon = resolveComponent("KIcon");
  return (_ctx.$attrs.disabled === true || _ctx.$attrs.disabled === "") && _ctx.disabledTooltipText ? (openBlock(), createBlock(_component_KTooltip, {
    key: 0,
    label: _ctx.disabledTooltipText
  }, {
    default: withCtx(() => [
      createElementVNode("label", {
        for: _ctx.$attrs.id ? String(_ctx.$attrs.id) : void 0,
        disabled: _ctx.$attrs.disabled,
        class: "k-switch k-input-switch"
      }, [
        (_ctx.label || _ctx.$slots.label) && _ctx.labelPosition === "left" ? (openBlock(), createElementBlock("span", _hoisted_2$f, [
          renderSlot(_ctx.$slots, "label", {}, () => [
            createTextVNode(toDisplayString(_ctx.label), 1)
          ], true)
        ])) : createCommentVNode("", true),
        createElementVNode("input", mergeProps({ checked: _ctx.modelValue }, _ctx.$attrs, {
          type: "checkbox",
          onChange: _cache[0] || (_cache[0] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
          onInput: _cache[1] || (_cache[1] = (...args) => _ctx.handleChange && _ctx.handleChange(...args))
        }), null, 16, _hoisted_3$c),
        createElementVNode("div", {
          class: normalizeClass(["switch-control", _ctx.labelPosition === "right" ? "has-label-right" : "has-label-left"])
        }, null, 2),
        (_ctx.label || _ctx.$slots.label) && _ctx.labelPosition === "right" ? (openBlock(), createElementBlock("span", _hoisted_4$8, [
          renderSlot(_ctx.$slots, "label", {}, () => [
            createTextVNode(toDisplayString(_ctx.label), 1)
          ], true)
        ])) : createCommentVNode("", true)
      ], 8, _hoisted_1$l)
    ]),
    _: 3
  }, 8, ["label"])) : (openBlock(), createElementBlock("label", {
    key: 1,
    for: _ctx.$attrs.id ? String(_ctx.$attrs.id) : void 0,
    disabled: _ctx.$attrs.disabled,
    class: normalizeClass([{ "switch-with-icon": _ctx.enabledIcon }, "k-switch k-input-switch"])
  }, [
    (_ctx.label || _ctx.$slots.label) && _ctx.labelPosition === "left" ? (openBlock(), createElementBlock("span", _hoisted_6$5, [
      renderSlot(_ctx.$slots, "label", {}, () => [
        createTextVNode(toDisplayString(_ctx.label), 1)
      ], true)
    ])) : createCommentVNode("", true),
    createElementVNode("input", mergeProps({ checked: _ctx.modelValue }, _ctx.$attrs, {
      type: "checkbox",
      onChange: _cache[2] || (_cache[2] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
      onInput: _cache[3] || (_cache[3] = (...args) => _ctx.handleChange && _ctx.handleChange(...args))
    }), null, 16, _hoisted_7$4),
    createElementVNode("div", {
      class: normalizeClass(["switch-control", _ctx.labelPosition === "right" ? "has-label-right" : "has-label-left"])
    }, null, 2),
    _ctx.enabledIcon && _ctx.modelValue === true ? (openBlock(), createBlock(_component_KIcon, {
      key: 1,
      color: "var(--white)",
      icon: "check"
    })) : createCommentVNode("", true),
    (_ctx.label || _ctx.$slots.label) && _ctx.labelPosition === "right" ? (openBlock(), createElementBlock("span", _hoisted_8$2, [
      renderSlot(_ctx.$slots, "label", {}, () => [
        createTextVNode(toDisplayString(_ctx.label), 1)
      ], true)
    ])) : createCommentVNode("", true)
  ], 10, _hoisted_5$7));
}
var KInputSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$l], ["__scopeId", "data-v-62dba245"]]);
var KMenuDivider_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$k = defineComponent({
  name: "KMenuDivider"
});
const _withScopeId$5 = (n) => (pushScopeId("data-v-461355e1"), n = n(), popScopeId(), n);
const _hoisted_1$k = { class: "k-menu-item-divider" };
const _hoisted_2$e = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createElementVNode("hr", null, null, -1));
const _hoisted_3$b = [
  _hoisted_2$e
];
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$k, _hoisted_3$b);
}
var KMenuDivider = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k], ["__scopeId", "data-v-461355e1"]]);
var KMenuItem_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$j = defineComponent({
  name: "KMenuItem",
  components: { KButton, KIcon, KMenuDivider },
  props: {
    item: {
      type: Object,
      default: null
    },
    expandable: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "string",
      validator: (val) => ["string", "number", "divider"].includes(val)
    },
    lastMenuItem: {
      type: Boolean,
      default: false
    },
    testMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["clicked"],
  setup(props, { emit, slots }) {
    const isOpen = ref(false);
    const menuItemId = computed(() => props.testMode ? "test-menuitem-id-1234" : v1());
    const toggleMenuItem = () => {
      if (props.expandable) {
        isOpen.value = !isOpen.value;
      } else {
        emit("clicked", slots.itemTitle || props.item);
      }
    };
    return {
      isOpen,
      menuItemId,
      toggleMenuItem
    };
  }
});
const _hoisted_1$j = ["id", "data-testid", "test-mode"];
const _hoisted_2$d = {
  key: 0,
  class: "span-icon-container"
};
const _hoisted_3$a = { key: 0 };
const _hoisted_4$7 = { key: 1 };
const _hoisted_5$6 = { key: 2 };
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KIcon = resolveComponent("KIcon");
  const _component_KButton = resolveComponent("KButton");
  const _component_KMenuDivider = resolveComponent("KMenuDivider");
  return openBlock(), createElementBlock("div", {
    id: _ctx.menuItemId,
    "data-testid": _ctx.item ? `${_ctx.item.title.replace(" ", "-")}-menu-item` : "menu-item",
    "test-mode": _ctx.testMode,
    class: normalizeClass([[_ctx.isOpen ? "title-dark" : "", { "expando-item": _ctx.expandable }], "k-menu-item"])
  }, [
    _ctx.type !== "divider" ? (openBlock(), createBlock(_component_KButton, {
      key: 0,
      "aria-expanded": _ctx.isOpen && _ctx.expandable,
      "aria-labelledby": _ctx.menuItemId,
      "is-rounded": false,
      type: "button",
      class: "menu-button non-visual-button",
      onClick: _ctx.toggleMenuItem
    }, {
      default: withCtx(() => [
        createElementVNode("span", {
          class: normalizeClass([_ctx.isOpen && _ctx.expandable ? "title-dark" : "", "span-menu-title"])
        }, [
          renderSlot(_ctx.$slots, "itemTitle", {}, () => [
            createTextVNode(toDisplayString(_ctx.item ? _ctx.item.title : ""), 1)
          ], true)
        ], 2),
        _ctx.expandable ? (openBlock(), createElementBlock("span", _hoisted_2$d, [
          createVNode(_component_KIcon, {
            icon: _ctx.isOpen ? "chevronUp" : "chevronDown",
            color: "var(--grey-400)",
            size: "16"
          }, null, 8, ["icon"])
        ])) : createCommentVNode("", true)
      ]),
      _: 3
    }, 8, ["aria-expanded", "aria-labelledby", "onClick"])) : createCommentVNode("", true),
    _ctx.expandable ? (openBlock(), createElementBlock("div", {
      key: 1,
      class: normalizeClass([_ctx.isOpen ? "d-flex" : "d-none", "menu-content"])
    }, [
      renderSlot(_ctx.$slots, "itemBody", {}, () => [
        (_ctx.type === "string" || _ctx.type === "divider") && _ctx.expandable ? (openBlock(), createElementBlock("div", _hoisted_3$a, toDisplayString(_ctx.item ? _ctx.item.description : ""), 1)) : (_ctx.type === "number" || _ctx.type === "divider") && _ctx.expandable ? (openBlock(), createElementBlock("div", _hoisted_4$7, toDisplayString(_ctx.item ? _ctx.item.description : ""), 1)) : createCommentVNode("", true)
      ], true)
    ], 2)) : createCommentVNode("", true),
    !_ctx.lastMenuItem && (_ctx.type === "divider" || _ctx.expandable) ? (openBlock(), createElementBlock("div", _hoisted_5$6, [
      createVNode(_component_KMenuDivider)
    ])) : createCommentVNode("", true)
  ], 10, _hoisted_1$j);
}
var KMenuItem = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j], ["__scopeId", "data-v-52de1da2"]]);
var KMenu_vue_vue_type_style_index_0_scoped_true_lang = "";
const { getSizeFromString: getSizeFromString$1 } = useUtilities();
const _sfc_main$i = defineComponent({
  name: "KMenu",
  components: { KMenuItem, KMenuDivider },
  props: {
    items: {
      type: Array,
      required: false,
      default: () => []
    },
    actionButton: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "284"
    },
    testMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["proceed"],
  setup(props, { emit, slots }) {
    const widthStyle = computed(() => {
      return {
        width: getSizeFromString$1(props.width)
      };
    });
    const hasActionButton = computed(() => !!slots.actionButton);
    const proceed = () => {
      emit("proceed");
    };
    return {
      widthStyle,
      hasActionButton,
      proceed
    };
  }
});
const _hoisted_1$i = {
  key: 0,
  class: "clear-cta-button"
};
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KMenuItem = resolveComponent("KMenuItem");
  const _component_KMenuDivider = resolveComponent("KMenuDivider");
  const _component_KButton = resolveComponent("KButton");
  return openBlock(), createElementBlock("div", {
    style: normalizeStyle(_ctx.widthStyle),
    class: "k-menu"
  }, [
    renderSlot(_ctx.$slots, "body", {}, () => [
      createElementVNode("div", null, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (item, index2) => {
          return openBlock(), createBlock(_component_KMenuItem, {
            key: item.title + index2,
            item,
            expandable: item.expandable,
            type: item.type,
            "last-menu-item": index2 === _ctx.items.length - 1,
            "test-mode": _ctx.testMode,
            class: normalizeClass({ "last-menu-item": index2 === _ctx.items.length - 1 })
          }, null, 8, ["item", "expandable", "type", "last-menu-item", "test-mode", "class"]);
        }), 128))
      ])
    ], true),
    _ctx.hasActionButton ? (openBlock(), createElementBlock("div", _hoisted_1$i, [
      createVNode(_component_KMenuDivider),
      renderSlot(_ctx.$slots, "actionButton", {}, () => [
        createVNode(_component_KButton, {
          onClick: _ctx.proceed,
          onKeyup: withKeys(_ctx.proceed, ["enter"])
        }, null, 8, ["onClick", "onKeyup"])
      ], true)
    ])) : createCommentVNode("", true)
  ], 4);
}
var KMenu = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i], ["__scopeId", "data-v-f5821d9c"]]);
var KModal_vue_vue_type_style_index_0_scoped_true_lang = "";
var KModal_vue_vue_type_style_index_1_lang = "";
const _sfc_main$h = defineComponent({
  name: "KModal",
  components: { KButton },
  props: {
    title: {
      type: String,
      required: true
    },
    hideTitle: {
      type: Boolean,
      default: false
    },
    hideDismissIcon: {
      type: Boolean,
      default: false
    },
    dismissButtonTheme: {
      type: String,
      default: "dark",
      validator: (val) => ["light", "dark"].includes(val)
    },
    content: {
      type: String,
      default: ""
    },
    textAlign: {
      type: String,
      default: "center",
      validator: (val) => ["left", "center", "right"].includes(val)
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    actionButtonText: {
      type: String,
      default: "Submit"
    },
    actionButtonAppearance: {
      type: String,
      default: "primary"
    },
    cancelButtonText: {
      type: String,
      default: "Cancel"
    },
    cancelButtonAppearance: {
      type: String,
      default: "outline"
    },
    hideCancelButton: {
      type: Boolean,
      default: false
    },
    testMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["canceled", "proceed"],
  setup(props, { emit, slots }) {
    const hasHeaderImage = computed(() => {
      return !!slots["header-image"];
    });
    const dismissButtonColor = computed(() => {
      if (props.dismissButtonTheme === "light") {
        return "var(--grey-400)";
      }
      return "var(--grey-600)";
    });
    const handleKeydown = (e) => {
      if (props.isVisible && e.keyCode === 27) {
        close(true);
      }
    };
    const close = (force = false, event) => {
      var _a, _b;
      if (force || ((_b = (_a = event == null ? void 0 : event.target) == null ? void 0 : _a.classList) == null ? void 0 : _b.contains("k-modal-backdrop"))) {
        emit("canceled");
      }
    };
    const proceed = () => {
      emit("proceed");
    };
    watchEffect(() => {
      var _a, _b;
      if (typeof document !== "undefined") {
        if (props.isVisible) {
          (_a = document == null ? void 0 : document.body) == null ? void 0 : _a.classList.add("k-modal-overflow-hidden");
        } else {
          (_b = document == null ? void 0 : document.body) == null ? void 0 : _b.classList.remove("k-modal-overflow-hidden");
        }
      }
    });
    onMounted(() => {
      var _a;
      document.addEventListener("keydown", handleKeydown);
      if (props.isVisible) {
        (_a = document == null ? void 0 : document.body) == null ? void 0 : _a.classList.add("k-modal-overflow-hidden");
      }
    });
    onUnmounted(() => {
      var _a;
      document.removeEventListener("keydown", handleKeydown);
      (_a = document == null ? void 0 : document.body) == null ? void 0 : _a.classList.remove("k-modal-overflow-hidden");
    });
    return {
      hasHeaderImage,
      dismissButtonColor,
      close,
      proceed
    };
  }
});
const _hoisted_1$h = ["aria-label"];
const _hoisted_2$c = { class: "k-modal-dialog modal-dialog" };
const _hoisted_3$9 = {
  key: 0,
  class: "close-button"
};
const _hoisted_4$6 = { class: "k-modal-content modal-content" };
const _hoisted_5$5 = {
  key: 0,
  class: "k-modal-header-image d-flex"
};
const _hoisted_6$4 = { class: "k-modal-footer modal-footer d-flex" };
const _hoisted_7$3 = { class: "k-modal-action-buttons" };
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KIcon = resolveComponent("KIcon");
  const _component_KButton = resolveComponent("KButton");
  return _ctx.isVisible ? (openBlock(), createElementBlock("div", {
    key: 0,
    "aria-label": _ctx.title,
    class: "k-modal",
    role: "dialog",
    "aria-modal": "true"
  }, [
    createElementVNode("div", {
      class: "k-modal-backdrop modal-backdrop",
      onClick: _cache[3] || (_cache[3] = (evt) => _ctx.close(false, evt))
    }, [
      createElementVNode("div", _hoisted_2$c, [
        _ctx.hasHeaderImage && !_ctx.hideDismissIcon ? (openBlock(), createElementBlock("div", _hoisted_3$9, [
          createVNode(_component_KButton, {
            class: "non-visual-button",
            "aria-label": "Close",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.close(true))
          }, {
            default: withCtx(() => [
              createVNode(_component_KIcon, {
                icon: "close",
                color: _ctx.dismissButtonColor,
                size: "15"
              }, null, 8, ["color"])
            ]),
            _: 1
          })
        ])) : createCommentVNode("", true),
        createElementVNode("div", _hoisted_4$6, [
          _ctx.hasHeaderImage ? (openBlock(), createElementBlock("div", _hoisted_5$5, [
            renderSlot(_ctx.$slots, "header-image", {}, void 0, true)
          ])) : createCommentVNode("", true),
          _ctx.$slots["header-content"] || !_ctx.hideTitle ? (openBlock(), createElementBlock("div", {
            key: 1,
            role: "heading",
            "aria-level": "2",
            class: normalizeClass([{
              "header-left": _ctx.textAlign === "left",
              "header-centered": _ctx.textAlign === "center",
              "header-right": _ctx.textAlign === "right",
              "mb-5": !_ctx.hasHeaderImage,
              "mb-4": _ctx.hasHeaderImage
            }, "k-modal-header modal-header"])
          }, [
            renderSlot(_ctx.$slots, "header-content", {}, () => [
              createTextVNode(toDisplayString(_ctx.title), 1)
            ], true)
          ], 2)) : createCommentVNode("", true),
          createElementVNode("div", {
            class: normalizeClass([{
              "content-left": _ctx.textAlign === "left",
              "content-centered": _ctx.textAlign === "center",
              "content-right": _ctx.textAlign === "right"
            }, "k-modal-body modal-body"])
          }, [
            renderSlot(_ctx.$slots, "body-content", {}, () => [
              createTextVNode(toDisplayString(_ctx.content), 1)
            ], true)
          ], 2),
          createElementVNode("div", _hoisted_6$4, [
            renderSlot(_ctx.$slots, "footer-content", {}, () => [
              !_ctx.hideCancelButton ? (openBlock(), createBlock(_component_KButton, {
                key: 0,
                appearance: _ctx.cancelButtonAppearance,
                onClick: _cache[1] || (_cache[1] = ($event) => _ctx.close(true)),
                onKeyup: _cache[2] || (_cache[2] = withKeys(($event) => _ctx.close(true), ["esc"]))
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.cancelButtonText), 1)
                ]),
                _: 1
              }, 8, ["appearance"])) : createCommentVNode("", true),
              createElementVNode("div", _hoisted_7$3, [
                renderSlot(_ctx.$slots, "action-buttons", {}, () => [
                  createVNode(_component_KButton, {
                    appearance: _ctx.actionButtonAppearance,
                    onClick: _ctx.proceed,
                    onKeyup: withKeys(_ctx.proceed, ["enter"])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.actionButtonText), 1)
                    ]),
                    _: 1
                  }, 8, ["appearance", "onClick", "onKeyup"])
                ], true)
              ])
            ], true)
          ])
        ])
      ])
    ])
  ], 8, _hoisted_1$h)) : createCommentVNode("", true);
}
var KModal = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h], ["__scopeId", "data-v-67a512cb"]]);
var KModalFullscreen_vue_vue_type_style_index_0_scoped_true_lang = "";
var KModalFullscreen_vue_vue_type_style_index_1_lang = "";
const _sfc_main$g = defineComponent({
  name: "KModalFullscreen",
  components: { KButton, KIcon },
  props: {
    title: {
      type: String,
      required: true
    },
    bodyHeader: {
      type: String,
      default: ""
    },
    bodyHeaderDescription: {
      type: String,
      default: ""
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    cancelButtonText: {
      type: String,
      default: "Cancel"
    },
    actionButtonText: {
      type: String,
      default: "Save"
    },
    actionButtonAppearance: {
      type: String,
      default: "primary"
    },
    cancelButtonAppearance: {
      type: String,
      default: "outline"
    },
    iconString: {
      type: String,
      default: "kong"
    }
  },
  emits: ["canceled", "proceed"],
  setup(props, { emit }) {
    const modalBodyContent = ref(null);
    const isOpen = computed(() => {
      return !!props.isVisible;
    });
    watch(() => props.isVisible, async () => {
      if (isOpen.value) {
        document.body.style.overflow = "hidden";
        await nextTick();
        if (modalBodyContent.value) {
          modalBodyContent.value.focus();
        }
      } else {
        document.body.style.overflow = "";
      }
    });
    const handleKeydown = (e) => {
      if (props.isVisible) {
        if (e.keyCode === 27) {
          close();
        } else if (e.keyCode === 13) {
          proceed();
        }
      }
    };
    const close = () => {
      emit("canceled");
    };
    const proceed = () => {
      emit("proceed");
    };
    onMounted(() => {
      document.addEventListener("keydown", handleKeydown);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("keydown", handleKeydown);
    });
    onUnmounted(() => {
      document.body.style.overflow = "";
    });
    return {
      isOpen,
      modalBodyContent,
      handleKeydown,
      close,
      proceed
    };
  }
});
const _hoisted_1$g = ["aria-label"];
const _hoisted_2$b = {
  ref: "modalBodyContent",
  class: "k-modal-fullscreen-dialog",
  tabindex: "0"
};
const _hoisted_3$8 = { class: "k-modal-fullscreen-body-header" };
const _hoisted_4$5 = {
  key: 0,
  class: "body-header"
};
const _hoisted_5$4 = {
  key: 1,
  class: "body-header-description"
};
const _hoisted_6$3 = { class: "k-modal-fullscreen-body" };
const _hoisted_7$2 = { class: "k-modal-fullscreen-header" };
const _hoisted_8$1 = {
  class: "k-modal-fullscreen-header-description",
  role: "heading",
  "aria-level": "2"
};
const _hoisted_9$1 = { class: "k-modal-fullscreen-title" };
const _hoisted_10$1 = { class: "header-icon pr-2 my-auto" };
const _hoisted_11$1 = { class: "header-content my-auto" };
const _hoisted_12$1 = { class: "k-modal-fullscreen-action ml-3" };
const _hoisted_13 = { class: "k-modal-fullscreen-action-buttons" };
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KIcon = resolveComponent("KIcon");
  const _component_KButton = resolveComponent("KButton");
  return _ctx.isVisible ? (openBlock(), createElementBlock("div", {
    key: 0,
    "aria-label": _ctx.title,
    class: "k-modal-fullscreen isOpen",
    role: "dialog",
    "aria-modal": "true",
    onKeyup: [
      _cache[0] || (_cache[0] = withKeys((...args) => _ctx.close && _ctx.close(...args), ["esc"])),
      _cache[1] || (_cache[1] = withKeys((...args) => _ctx.proceed && _ctx.proceed(...args), ["enter"]))
    ]
  }, [
    createElementVNode("div", _hoisted_2$b, [
      createElementVNode("div", _hoisted_3$8, [
        _ctx.$slots["body-header"] || _ctx.bodyHeader ? (openBlock(), createElementBlock("div", _hoisted_4$5, [
          renderSlot(_ctx.$slots, "body-header", {}, () => [
            createTextVNode(toDisplayString(_ctx.bodyHeader), 1)
          ], true)
        ])) : createCommentVNode("", true),
        _ctx.$slots["body-header-description"] || _ctx.bodyHeaderDescription ? (openBlock(), createElementBlock("div", _hoisted_5$4, [
          renderSlot(_ctx.$slots, "body-header-description", {}, () => [
            createTextVNode(toDisplayString(_ctx.bodyHeaderDescription), 1)
          ], true)
        ])) : createCommentVNode("", true)
      ]),
      createElementVNode("div", _hoisted_6$3, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]),
      createElementVNode("div", _hoisted_7$2, [
        createElementVNode("div", _hoisted_8$1, [
          createElementVNode("div", _hoisted_9$1, [
            createElementVNode("span", _hoisted_10$1, [
              renderSlot(_ctx.$slots, "header-icon", {}, () => [
                createVNode(_component_KIcon, { icon: _ctx.iconString }, null, 8, ["icon"])
              ], true)
            ]),
            createElementVNode("span", _hoisted_11$1, [
              renderSlot(_ctx.$slots, "header-content", {}, () => [
                createTextVNode(toDisplayString(_ctx.title), 1)
              ], true)
            ])
          ]),
          createElementVNode("div", _hoisted_12$1, [
            createElementVNode("div", _hoisted_13, [
              renderSlot(_ctx.$slots, "action-buttons", {}, () => [
                createVNode(_component_KButton, {
                  appearance: _ctx.cancelButtonAppearance,
                  class: "cancel-button",
                  onClick: _ctx.close
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.cancelButtonText), 1)
                  ]),
                  _: 1
                }, 8, ["appearance", "onClick"]),
                createVNode(_component_KButton, {
                  appearance: _ctx.actionButtonAppearance,
                  class: "proceed-button",
                  onClick: _ctx.proceed
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.actionButtonText), 1)
                  ]),
                  _: 1
                }, 8, ["appearance", "onClick"])
              ], true)
            ])
          ])
        ])
      ])
    ], 512)
  ], 40, _hoisted_1$g)) : createCommentVNode("", true);
}
var KModalFullscreen = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g], ["__scopeId", "data-v-24fffb08"]]);
var KPrompt_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$f = defineComponent({
  name: "KPrompt",
  components: { KButton, KIcon, KInput, KModal },
  props: {
    title: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "info",
      validator: (val) => ["info", "warning", "danger"].includes(val)
    },
    message: {
      type: String,
      default: ""
    },
    actionButtonText: {
      type: String,
      default: "OK"
    },
    cancelButtonText: {
      type: String,
      default: "Cancel"
    },
    actionPending: {
      type: Boolean,
      default: false
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    confirmationText: {
      type: String,
      default: ""
    },
    preventProceedOnEnter: {
      type: Boolean,
      default: false
    }
  },
  emits: ["canceled", "proceed"],
  setup(props, { emit }) {
    const confirmationInput = ref("");
    const close = () => {
      confirmationInput.value = "";
      emit("canceled");
    };
    const proceed = (evt) => {
      if (disableProceedButton.value)
        return;
      confirmationInput.value = "";
      emit("proceed", evt);
    };
    const handleKeydown = (e) => {
      if (props.isVisible) {
        if (e.keyCode === 27) {
          close();
        } else if (e.keyCode === 13) {
          if (!props.preventProceedOnEnter) {
            proceed(e);
          }
        }
      }
    };
    const capitalize = (str = "") => {
      const capitalizeRegEx = /(?:^|[\s-:'"])\w/g;
      return str.replace(capitalizeRegEx, (a) => a.toUpperCase());
    };
    const displayTitle = computed(() => {
      if (props.title) {
        if (props.type === "warning") {
          return "Warning: " + props.title;
        }
        return props.title;
      } else if (props.type === "info") {
        return "Information";
      }
      return capitalize(props.type);
    });
    const disableProceedButton = computed(() => {
      if (props.actionPending) {
        return true;
      }
      if (!props.confirmationText.length) {
        return false;
      }
      return props.confirmationText !== confirmationInput.value;
    });
    onMounted(() => {
      document.addEventListener("keydown", handleKeydown);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("keydown", handleKeydown);
    });
    return {
      confirmationInput,
      displayTitle,
      disableProceedButton,
      handleKeydown,
      close,
      proceed
    };
  }
});
const _withScopeId$4 = (n) => (pushScopeId("data-v-043fdb40"), n = n(), popScopeId(), n);
const _hoisted_1$f = { class: "k-prompt-header w-100" };
const _hoisted_2$a = { class: "k-prompt-header-content d-flex align-items-center w-100" };
const _hoisted_3$7 = { class: "close-button" };
const _hoisted_4$4 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("hr", { class: "divider" }, null, -1));
const _hoisted_5$3 = { class: "k-prompt-body w-100" };
const _hoisted_6$2 = { class: "k-prompt-body-content w-100" };
const _hoisted_7$1 = {
  key: 0,
  class: "k-prompt-confirm-text w-100"
};
const _hoisted_8 = /* @__PURE__ */ createTextVNode(' Type "');
const _hoisted_9 = { class: "bold-600" };
const _hoisted_10 = /* @__PURE__ */ createTextVNode('" to confirm your action. ');
const _hoisted_11 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("hr", { class: "divider" }, null, -1));
const _hoisted_12 = { class: "k-prompt-action-buttons" };
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KIcon = resolveComponent("KIcon");
  const _component_KButton = resolveComponent("KButton");
  const _component_KInput = resolveComponent("KInput");
  const _component_KModal = resolveComponent("KModal");
  return openBlock(), createBlock(_component_KModal, {
    "is-visible": _ctx.isVisible,
    title: _ctx.displayTitle,
    "text-align": "left",
    class: "k-prompt",
    onKeyup: [
      withKeys(_ctx.close, ["esc"]),
      withKeys(_ctx.proceed, ["enter"])
    ]
  }, {
    "header-content": withCtx(() => [
      createElementVNode("div", _hoisted_1$f, [
        createElementVNode("div", _hoisted_2$a, [
          renderSlot(_ctx.$slots, "header-content", {}, () => [
            _ctx.type === "warning" ? (openBlock(), createBlock(_component_KIcon, {
              key: 0,
              icon: "warning",
              color: "var(--white)",
              "secondary-color": "var(--yellow-400)",
              size: "20",
              class: "mr-2"
            })) : createCommentVNode("", true),
            createTextVNode(" " + toDisplayString(_ctx.displayTitle), 1)
          ], true),
          createElementVNode("div", _hoisted_3$7, [
            createVNode(_component_KButton, {
              class: "non-visual-button",
              "aria-label": "Close",
              onClick: _ctx.close
            }, {
              default: withCtx(() => [
                createVNode(_component_KIcon, {
                  icon: "close",
                  color: "var(--grey-600)",
                  size: "15"
                })
              ]),
              _: 1
            }, 8, ["onClick"])
          ])
        ]),
        _hoisted_4$4
      ])
    ]),
    "body-content": withCtx(() => [
      createElementVNode("div", _hoisted_5$3, [
        createElementVNode("div", _hoisted_6$2, [
          renderSlot(_ctx.$slots, "body-content", {}, () => [
            createTextVNode(toDisplayString(_ctx.message), 1)
          ], true),
          _ctx.confirmationText ? (openBlock(), createElementBlock("div", _hoisted_7$1, [
            _hoisted_8,
            createElementVNode("span", _hoisted_9, toDisplayString(_ctx.confirmationText), 1),
            _hoisted_10,
            createVNode(_component_KInput, {
              modelValue: _ctx.confirmationInput,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.confirmationInput = $event),
              autocomplete: "off",
              autocapitalize: "off",
              "data-testid": "confirmation-input",
              class: "mt-2"
            }, null, 8, ["modelValue"])
          ])) : createCommentVNode("", true)
        ]),
        _hoisted_11
      ])
    ]),
    "footer-content": withCtx(() => [
      createElementVNode("div", _hoisted_12, [
        renderSlot(_ctx.$slots, "action-buttons", {}, () => [
          createVNode(_component_KButton, {
            appearance: "outline",
            class: "k-prompt-cancel mr-2",
            onClick: _ctx.close
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.cancelButtonText), 1)
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_KButton, {
            appearance: _ctx.type === "danger" ? "danger" : "primary",
            disabled: _ctx.disableProceedButton,
            class: "k-prompt-proceed",
            onClick: _ctx.proceed
          }, {
            icon: withCtx(() => [
              _ctx.actionPending ? (openBlock(), createBlock(_component_KIcon, {
                key: 0,
                icon: "spinner",
                size: "16",
                color: "var(--grey-400)"
              })) : createCommentVNode("", true)
            ]),
            default: withCtx(() => [
              createTextVNode(" " + toDisplayString(_ctx.actionButtonText), 1)
            ]),
            _: 1
          }, 8, ["appearance", "disabled", "onClick"])
        ], true)
      ])
    ]),
    _: 3
  }, 8, ["is-visible", "title", "onKeyup"]);
}
var KPrompt = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__scopeId", "data-v-043fdb40"]]);
var KRadio_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$e = defineComponent({
  name: "KRadio",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Boolean, Object],
      default: "on",
      required: true
    },
    selectedValue: {
      type: [String, Number, Boolean, Object],
      required: true
    }
  },
  emits: ["change", "update:modelValue"],
  setup(props, { emit }) {
    const isSelected = computed(() => props.selectedValue === props.modelValue);
    const handleClick = () => {
      emit("change", props.selectedValue);
      emit("update:modelValue", props.selectedValue);
    };
    return {
      isSelected,
      handleClick
    };
  }
});
const _hoisted_1$e = { class: "k-radio" };
const _hoisted_2$9 = ["checked"];
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("label", _hoisted_1$e, [
    createElementVNode("input", mergeProps({ checked: _ctx.isSelected }, _ctx.$attrs, {
      type: "radio",
      class: "k-input",
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
    }), null, 16, _hoisted_2$9),
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ]);
}
var KRadio = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__scopeId", "data-v-5a01184a"]]);
var KSegmentedControl_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$d = defineComponent({
  name: "KSegmentedControl",
  components: { KButton },
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["click"],
  setup(props, { emit }) {
    const selectedValue = ref(props.modelValue);
    const label = (option) => {
      return typeof option === "string" ? option : option.label || option.value || option;
    };
    const value = (option) => {
      return typeof option === "string" ? option : option.value || option.label || option;
    };
    const appearance = (option) => {
      return props.modelValue === value(option) ? "primary" : "outline";
    };
    const disabled = (option) => {
      if (typeof option === "object") {
        return !!option.disabled;
      }
      return props.isDisabled;
    };
    const handleClick = (evt) => {
      var _a;
      emit("click", (_a = evt.target) == null ? void 0 : _a.name);
    };
    return {
      selectedValue,
      label,
      value,
      appearance,
      disabled,
      handleClick
    };
  }
});
const _hoisted_1$d = { class: "segmented-control d-flex" };
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KButton = resolveComponent("KButton");
  return openBlock(), createElementBlock("div", _hoisted_1$d, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, (option) => {
      return openBlock(), createBlock(_component_KButton, {
        key: String(_ctx.label(option)),
        name: _ctx.value(option),
        disabled: _ctx.disabled(option),
        appearance: _ctx.appearance(option),
        size: "small",
        class: "justify-content-center",
        onClick: _ctx.handleClick
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.label(option)), 1)
        ]),
        _: 2
      }, 1032, ["name", "disabled", "appearance", "onClick"]);
    }), 128))
  ]);
}
var KSegmentedControl = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__scopeId", "data-v-2cfdf8ba"]]);
var KSlideout_vue_vue_type_style_index_0_scoped_true_lang = "";
var KSlideout_vue_vue_type_style_index_1_lang = "";
const _sfc_main$c = defineComponent({
  name: "KSlideout",
  components: { KCard, KIcon },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close"],
  setup(props, { emit }) {
    const handleClose = (e, forceClose = false) => {
      if (props.isVisible && e.keyCode === 27 || forceClose) {
        emit("close");
      }
    };
    onMounted(() => {
      document.addEventListener("keydown", handleClose);
    });
    onUnmounted(() => {
      document.removeEventListener("keydown", handleClose);
    });
    return {
      handleClose
    };
  }
});
const _hoisted_1$c = { class: "k-slideout" };
const _hoisted_2$8 = { class: "content" };
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KIcon = resolveComponent("KIcon");
  const _component_KCard = resolveComponent("KCard");
  return openBlock(), createElementBlock("div", _hoisted_1$c, [
    createVNode(Transition, { name: "fade" }, {
      default: withCtx(() => [
        _ctx.isVisible ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "panel-background",
          onClick: _cache[0] || (_cache[0] = (event) => _ctx.handleClose(event, true))
        })) : createCommentVNode("", true)
      ]),
      _: 1
    }),
    createVNode(Transition, {
      tag: "div",
      name: "slide"
    }, {
      default: withCtx(() => [
        _ctx.isVisible ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass([{ isVisible: "is-visible" }, "panel"])
        }, [
          createElementVNode("button", {
            class: "close-btn",
            onClick: _cache[1] || (_cache[1] = (event) => _ctx.handleClose(event, true))
          }, [
            createVNode(_component_KIcon, {
              icon: "close",
              size: "24",
              "view-box": "0 0 24 24"
            })
          ]),
          createElementVNode("div", _hoisted_2$8, [
            createVNode(_component_KCard, { "border-variant": "noBorder" }, {
              body: withCtx(() => [
                renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ]),
              _: 3
            })
          ])
        ])) : createCommentVNode("", true)
      ]),
      _: 3
    })
  ]);
}
var KSlideout = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__scopeId", "data-v-19db8b36"]]);
var KCompletedState_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$b = defineComponent({
  name: "KCompletedState",
  props: {
    title: {
      type: String,
      default: "Completed"
    }
  }
});
const _withScopeId$3 = (n) => (pushScopeId("data-v-713fc4ad"), n = n(), popScopeId(), n);
const _hoisted_1$b = {
  viewBox: "0 0 24 24",
  fill: "none",
  class: "k-step-state-icon",
  "data-testid": "k-step-completed"
};
const _hoisted_2$7 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("circle", {
  cx: "12",
  cy: "12",
  r: "12",
  class: "k-step-icon-primary"
}, null, -1));
const _hoisted_3$6 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("path", {
  d: "M16 9L10 15L7 12.0001",
  class: "k-step-icon-primary"
}, null, -1));
const _hoisted_4$3 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("path", {
  d: "M16 9L10 15L7 12.0001",
  "stroke-width": "2.25",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "k-step-icon-secondary"
}, null, -1));
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1$b, [
    createElementVNode("title", null, toDisplayString(_ctx.title), 1),
    _hoisted_2$7,
    _hoisted_3$6,
    _hoisted_4$3
  ]);
}
var KCompletedState = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__scopeId", "data-v-713fc4ad"]]);
var KDefaultState_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$a = defineComponent({
  name: "KDefaultState",
  props: {
    title: {
      type: String,
      default: "Default"
    }
  }
});
const _withScopeId$2 = (n) => (pushScopeId("data-v-137c7f30"), n = n(), popScopeId(), n);
const _hoisted_1$a = {
  viewBox: "0 0 24 24",
  fill: "none",
  class: "k-step-state-icon",
  "data-testid": "k-step-default"
};
const _hoisted_2$6 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("circle", {
  cx: "12",
  cy: "12",
  r: "12"
}, null, -1));
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1$a, [
    createElementVNode("title", null, toDisplayString(_ctx.title), 1),
    _hoisted_2$6
  ]);
}
var KDefaultState = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__scopeId", "data-v-137c7f30"]]);
var KErrorState_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$9 = defineComponent({
  name: "KErrorState",
  props: {
    title: {
      type: String,
      default: "Error"
    }
  }
});
const _withScopeId$1 = (n) => (pushScopeId("data-v-560b36c7"), n = n(), popScopeId(), n);
const _hoisted_1$9 = {
  class: "k-step-state-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  "data-testid": "k-step-error"
};
const _hoisted_2$5 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("circle", {
  cx: "12",
  cy: "12",
  r: "12",
  class: "k-step-icon-primary"
}, null, -1));
const _hoisted_3$5 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M15.7397 9.51743C16.0868 9.1703 16.0868 8.60748 15.7397 8.26035C15.3925 7.91322 14.8297 7.91322 14.4826 8.26035L12 10.7429L9.51746 8.26035C9.17033 7.91322 8.60751 7.91322 8.26038 8.26035C7.91325 8.60748 7.91325 9.1703 8.26038 9.51743L10.7429 12L8.26035 14.4826C7.91322 14.8297 7.91322 15.3925 8.26035 15.7397C8.60748 16.0868 9.1703 16.0868 9.51743 15.7397L12 13.2571L14.4826 15.7397C14.8297 16.0868 15.3925 16.0868 15.7397 15.7397C16.0868 15.3925 16.0868 14.8297 15.7397 14.4826L13.2571 12L15.7397 9.51743Z",
  class: "k-step-icon-secondary"
}, null, -1));
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1$9, [
    createElementVNode("title", null, toDisplayString(_ctx.title), 1),
    _hoisted_2$5,
    _hoisted_3$5
  ]);
}
var KErrorState = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__scopeId", "data-v-560b36c7"]]);
var KPendingState_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$8 = defineComponent({
  name: "KPendingState",
  props: {
    title: {
      type: String,
      default: "Pending"
    }
  }
});
const _withScopeId = (n) => (pushScopeId("data-v-0acc505c"), n = n(), popScopeId(), n);
const _hoisted_1$8 = { class: "k-step-spinner" };
const _hoisted_2$4 = {
  class: "k-step-state-icon",
  viewBox: "0 0 50 50",
  "data-testid": "k-step-pending"
};
const _hoisted_3$4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("circle", {
  cx: "25",
  cy: "25",
  r: "20",
  fill: "none",
  "stroke-width": "5"
}, null, -1));
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$8, [
    (openBlock(), createElementBlock("svg", _hoisted_2$4, [
      createTextVNode(toDisplayString(_ctx.title) + " ", 1),
      _hoisted_3$4
    ]))
  ]);
}
var KPendingState = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-0acc505c"]]);
var KStepState_vue_vue_type_style_index_0_scoped_true_lang = "";
var KStepState_vue_vue_type_style_index_1_lang = "";
const _sfc_main$7 = defineComponent({
  name: "KStepState",
  components: { KCompletedState, KDefaultState, KErrorState, KPendingState },
  props: {
    state: {
      type: String,
      default: "default",
      validator: (value) => ["default", "pending", "completed", "error"].includes(value)
    }
  }
});
const _hoisted_1$7 = { class: "k-step-state px-3" };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KCompletedState = resolveComponent("KCompletedState");
  const _component_KErrorState = resolveComponent("KErrorState");
  const _component_KPendingState = resolveComponent("KPendingState");
  const _component_KDefaultState = resolveComponent("KDefaultState");
  return openBlock(), createElementBlock("div", _hoisted_1$7, [
    _ctx.state === "completed" ? (openBlock(), createBlock(_component_KCompletedState, { key: 0 })) : _ctx.state === "error" ? (openBlock(), createBlock(_component_KErrorState, { key: 1 })) : _ctx.state === "pending" ? (openBlock(), createBlock(_component_KPendingState, { key: 2 })) : (openBlock(), createBlock(_component_KDefaultState, { key: 3 }))
  ]);
}
var KStepState = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__scopeId", "data-v-2a109227"]]);
var KStep_vue_vue_type_style_index_0_scoped_true_lang = "";
var KStep_vue_vue_type_style_index_1_lang = "";
const { getSizeFromString } = useUtilities();
const _sfc_main$6 = defineComponent({
  name: "KStep",
  components: { KLabel, KStepState },
  props: {
    label: {
      type: String,
      required: true
    },
    state: {
      type: String,
      default: "default",
      validator: (value) => ["default", "pending", "completed", "error"].includes(value)
    },
    maxLabelWidth: {
      type: String,
      default: "170"
    }
  },
  setup(props) {
    const labelStyle = computed(() => {
      return {
        maxWidth: getSizeFromString(props.maxLabelWidth)
      };
    });
    return {
      labelStyle
    };
  }
});
const _hoisted_1$6 = { class: "k-step" };
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KStepState = resolveComponent("KStepState");
  const _component_KLabel = resolveComponent("KLabel");
  return openBlock(), createElementBlock("li", _hoisted_1$6, [
    createElementVNode("div", {
      class: normalizeClass([{ "completed": _ctx.state === "completed" }, "k-step-container"])
    }, [
      createVNode(_component_KStepState, { state: _ctx.state }, null, 8, ["state"]),
      createElementVNode("div", {
        class: normalizeClass([{
          "bolder": _ctx.state === "pending" || _ctx.state === "error",
          "error": _ctx.state === "error"
        }, "k-step-label px-3"]),
        style: normalizeStyle(_ctx.labelStyle)
      }, [
        createVNode(_component_KLabel, null, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.label), 1)
          ]),
          _: 1
        })
      ], 6)
    ], 2)
  ]);
}
var KStep = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__scopeId", "data-v-46edcb94"]]);
var KStepper_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$5 = defineComponent({
  name: "KStepper",
  components: { KStep },
  props: {
    steps: {
      type: Array,
      required: true,
      validator: (items) => !items.length || items.every((i) => i.label !== void 0)
    },
    maxLabelWidth: {
      type: String,
      default: ""
    }
  }
});
const _hoisted_1$5 = {
  key: 0,
  class: "k-stepper"
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KStep = resolveComponent("KStep");
  return _ctx.steps && _ctx.steps.length ? (openBlock(), createElementBlock("ol", _hoisted_1$5, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.steps, (step) => {
      return openBlock(), createBlock(_component_KStep, {
        key: `k-step-${step.label.replace(" ", "-")}`,
        label: step.label,
        state: step.state,
        "max-label-width": _ctx.maxLabelWidth
      }, null, 8, ["label", "state", "max-label-width"]);
    }), 128))
  ])) : createCommentVNode("", true);
}
var KStepper = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-e66270f8"]]);
var KTable_vue_vue_type_style_index_0_scoped_true_lang = "";
var KTable_vue_vue_type_style_index_1_lang = "";
const defaultSorter = (key, previousKey, sortOrder, items) => {
  return clientSideSorter(key, previousKey, sortOrder, items);
};
const { clientSideSorter, useDebounce, useRequest } = useUtilities();
const _sfc_main$4 = defineComponent({
  name: "KTable",
  components: {
    KButton,
    KEmptyState,
    KIcon,
    KPagination,
    KSkeleton
  },
  props: {
    options: {
      type: Object,
      default: () => null,
      required: false
    },
    enableClientSort: {
      type: Boolean,
      default: false
    },
    hasHover: {
      type: Boolean,
      default: true
    },
    sortOrder: {
      type: String,
      default: "",
      validator: (value) => ["ascending", "descending", ""].includes(value)
    },
    sortKey: {
      type: String,
      default: ""
    },
    sortHandlerFn: {
      type: Function,
      default: () => ({})
    },
    rowAttrs: {
      type: Function,
      default: () => ({})
    },
    hasSideBorder: {
      type: Boolean,
      default: false
    },
    cellAttrs: {
      type: Function,
      default: () => ({})
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    emptyStateTitle: {
      type: String,
      default: "No Data"
    },
    emptyStateMessage: {
      type: String,
      default: "There is no data to display."
    },
    emptyStateActionRoute: {
      type: [Object, String],
      default: ""
    },
    emptyStateActionMessage: {
      type: String,
      default: ""
    },
    emptyStateActionButtonIcon: {
      type: String,
      default: ""
    },
    emptyStateIcon: {
      type: String,
      default: ""
    },
    emptyStateIconColor: {
      type: String,
      default: ""
    },
    emptyStateIconSize: {
      type: String,
      default: "50"
    },
    hasError: {
      type: Boolean,
      default: false
    },
    errorStateTitle: {
      type: String,
      default: "An error occurred"
    },
    errorStateMessage: {
      type: String,
      default: "Data cannot be displayed due to an error."
    },
    errorStateActionRoute: {
      type: [Object, String],
      default: ""
    },
    errorStateActionMessage: {
      type: String,
      default: ""
    },
    errorStateIcon: {
      type: String,
      default: ""
    },
    errorStateIconColor: {
      type: String,
      default: ""
    },
    errorStateIconSize: {
      type: String,
      default: "50"
    },
    fetcher: {
      type: Function,
      default: void 0,
      required: true
    },
    fetcherCacheKey: {
      type: String,
      default: ""
    },
    searchInput: {
      type: String,
      default: ""
    },
    headers: {
      type: Array,
      default: () => []
    },
    initialFetcherParams: {
      type: Object,
      default: null
    },
    paginationNeighbors: {
      type: Number,
      default: 1
    },
    paginationPageSizes: {
      type: Array,
      default: () => [15, 30, 50, 75, 100],
      validator: (pageSizes) => !!pageSizes.length && pageSizes.every((i) => typeof i === "number")
    },
    paginationTotalItems: {
      type: Number,
      default: null
    },
    disablePaginationPageJump: {
      type: Boolean,
      default: false
    },
    disableSorting: {
      type: Boolean,
      default: false
    },
    disablePagination: {
      type: Boolean,
      default: false
    },
    paginationType: {
      type: String,
      default: "default",
      validator: (value) => ["default", "offset"].includes(value)
    },
    hidePaginationWhenOptional: {
      type: Boolean,
      default: false
    },
    testMode: {
      type: String,
      default: "",
      validator: (val) => ["true", "loading", ""].includes(val)
    }
  },
  emits: ["sort", "ktable-error-cta-clicked", "ktable-empty-state-cta-clicked", "row-click", "cell-click"],
  setup(props, { attrs, emit }) {
    const tableId = computed(() => props.testMode ? "test-table-id-1234" : v1());
    const defaultFetcherProps = {
      pageSize: 15,
      page: 1,
      query: "",
      sortColumnKey: "",
      sortColumnOrder: "desc",
      offset: null
    };
    const data = ref([]);
    const tableHeaders = ref([]);
    const total = ref(0);
    const isScrolled = ref(false);
    const isTableLoading = ref(true);
    const page = ref(1);
    const pageSize = ref(15);
    const filterQuery = ref("");
    const sortColumnKey = ref("");
    const sortColumnOrder = ref("desc");
    const offset2 = ref(null);
    const offsets = ref([]);
    const isClickable = ref(false);
    const hasInitialized = ref(false);
    const nextPageClicked = ref(false);
    const pluckListeners = (prefix, attrs2) => {
      return (entity, type) => {
        const onRE = /^on[^a-z]/;
        const listeners = {};
        for (const property in attrs2) {
          if (onRE.test(property) && !!attrs2[property]) {
            listeners[property] = attrs2[property];
          }
        }
        return Object.keys(listeners).reduce((acc, curr) => {
          if (curr.indexOf(prefix) === 0) {
            const parts = curr.split(prefix);
            acc[parts[1]] = (e) => listeners[curr](e, entity, type);
          }
          return acc;
        }, {});
      };
    };
    const tdlisteners = computed(() => {
      return (entity, rowData) => {
        const rowListeners = pluckListeners("onRow:", attrs)(rowData, "row");
        const cellListeners = pluckListeners("onCell:", attrs)(entity, "cell");
        const ignoredElements = ["a", "button", "input", "select"];
        if (rowListeners.click) {
          isClickable.value = true;
        }
        return __spreadProps(__spreadValues(__spreadValues({}, rowListeners), cellListeners), {
          click(e) {
            const targetClasses = e.target.className;
            let isIgnored = ignoredElements.includes(e.target.tagName.toLowerCase());
            let isPopoverContent = false;
            if (typeof targetClasses === "string" || Array.isArray(targetClasses)) {
              isPopoverContent = targetClasses.includes("k-popover");
            } else if (typeof targetClasses === "object") {
              isPopoverContent = Object.keys(targetClasses).includes("k-popover");
            }
            if (e.target.closest(".k-popover-content") !== null) {
              isPopoverContent = true;
            }
            for (let i = 0; i < ignoredElements.length; i++) {
              if (e.target.closest(ignoredElements[i]) !== null) {
                isIgnored = true;
                break;
              }
            }
            if ((!isIgnored || e.target.hasAttribute("disabled")) && !isPopoverContent && (rowListeners.click || cellListeners.click)) {
              if (cellListeners.click) {
                emit("cell-click", { data: entity });
                const result = cellListeners.click(e, entity, "cell");
                if (typeof result === "function") {
                  result(e, entity);
                }
              } else {
                emit("row-click", { data: rowData });
                const result = rowListeners.click(e, rowData, "row");
                if (typeof result === "function") {
                  result(e, rowData);
                }
              }
            }
          }
        });
      };
    });
    const fetchData = async () => {
      var _a, _b;
      const searchInput = props.searchInput;
      isTableLoading.value = true;
      const res = await props.fetcher({
        pageSize: pageSize.value,
        page: page.value,
        query: searchInput || filterQuery.value,
        sortColumnKey: sortColumnKey.value,
        sortColumnOrder: sortColumnOrder.value,
        offset: offset2.value
      });
      data.value = res.data;
      total.value = props.paginationTotalItems || res.total || ((_a = res.data) == null ? void 0 : _a.length);
      if (props.paginationType === "offset") {
        if (!((_b = res.pagination) == null ? void 0 : _b.offset)) {
          offset2.value = null;
          if (!nextPageClicked.value) {
            page.value = 1;
          }
        } else {
          offset2.value = res.pagination.offset;
          if (!offsets.value[page.value]) {
            offsets.value.push(res.pagination.offset);
          }
        }
      }
      if (props.fetcher) {
        if (props.enableClientSort && sortColumnKey.value && sortColumnOrder.value) {
          defaultSorter(sortColumnKey.value, "", sortColumnOrder.value, data.value);
        }
      } else if (props.options && props.options.data && props.options.data.length) {
        data.value = props.options.data;
        total.value = props.options.data.length;
      }
      isTableLoading.value = false;
      nextPageClicked.value = false;
      return res;
    };
    const initData = async () => {
      const fetcherParams = __spreadValues(__spreadValues({}, defaultFetcherProps), props.initialFetcherParams);
      page.value = fetcherParams.page;
      pageSize.value = fetcherParams.pageSize;
      filterQuery.value = fetcherParams.query;
      sortColumnKey.value = fetcherParams.sortColumnKey;
      sortColumnOrder.value = fetcherParams.sortColumnOrder;
      if (props.paginationType === "offset") {
        offset2.value = fetcherParams.offset;
        offsets.value.push(fetcherParams.offset);
      }
      if (props.headers && props.headers.length) {
        tableHeaders.value = props.headers;
      } else if (props.options && props.options.headers && props.options.headers.length) {
        tableHeaders.value = props.options.headers;
      }
      hasInitialized.value = true;
    };
    const previousOffset = computed(() => offsets.value[page.value - 1]);
    const tableFetcherCacheKey = computed(() => {
      if (!props.fetcher || !hasInitialized.value) {
        return "";
      }
      return `k-table_${Math.floor(Math.random() * 1e3)}_${props.fetcherCacheKey}`;
    });
    const { query, search } = useDebounce("", 350);
    const { revalidate } = useRequest(() => tableFetcherCacheKey.value, () => fetchData(), { revalidateOnFocus: false });
    const sortClickHandler = (header) => {
      const { key, useSortHandlerFn } = header;
      const prevKey = sortColumnKey.value + "";
      page.value = 1;
      if (sortColumnKey.value) {
        if (key === sortColumnKey.value) {
          if (sortColumnOrder.value === "asc") {
            sortColumnOrder.value = "desc";
          } else {
            sortColumnOrder.value = "asc";
          }
        } else {
          sortColumnKey.value = key;
          sortColumnOrder.value = "asc";
        }
      } else {
        sortColumnKey.value = key;
        sortColumnOrder.value = "asc";
      }
      if (props.options && props.options.data || props.enableClientSort) {
        if (useSortHandlerFn && props.sortHandlerFn) {
          props.sortHandlerFn({
            key,
            prevKey,
            sortColumnOrder: sortColumnOrder.value,
            data: data.value
          });
        } else {
          defaultSorter(key, prevKey, sortColumnOrder.value, data.value);
        }
      } else if (props.paginationType !== "offset") {
        revalidate();
      }
    };
    const pageChangeHandler = ({ page: newPage }) => {
      page.value = newPage;
    };
    const pageSizeChangeHandler = ({ pageSize: newPageSize }) => {
      offsets.value = [null];
      offset2.value = null;
      pageSize.value = newPageSize;
      page.value = 1;
    };
    const scrollHandler = (event) => {
      if (event && event.target && event.target.scrollTop) {
        if (event.target.scrollTop > 1) {
          isScrolled.value = true;
        } else if (event.target.scrollTop) {
          isScrolled.value = !isScrolled.value;
        }
      }
    };
    const getNextOffsetHandler = () => {
      page.value++;
      nextPageClicked.value = true;
    };
    const getPrevOffsetHandler = () => {
      page.value--;
      offset2.value = previousOffset.value;
    };
    const shouldShowPagination = computed(() => {
      return props.fetcher && !props.disablePagination && !(props.paginationType !== "offset" && props.hidePaginationWhenOptional && total.value <= props.paginationPageSizes[0]) && !(props.paginationType === "offset" && props.hidePaginationWhenOptional && !previousOffset.value && !offset2.value && data.value.length <= props.paginationPageSizes[0]);
    });
    const getTestIdString = (message) => {
      return message.toLowerCase().replace(/[^[a-z0-9]/gi, "-");
    };
    watch(() => props.searchInput, (newValue) => {
      search(newValue);
    }, { immediate: true });
    watch(() => [query.value, page.value, pageSize.value], () => {
      revalidate();
    }, { immediate: true });
    onMounted(() => {
      initData();
    });
    return {
      data,
      isScrolled,
      isTableLoading,
      page,
      pageChangeHandler,
      pageSizeChangeHandler,
      pageSize,
      scrollHandler,
      sortClickHandler,
      sortColumnKey,
      sortColumnOrder,
      isClickable,
      tableHeaders,
      tdlisteners,
      total,
      tableId,
      getTestIdString,
      getNextOffsetHandler,
      getPrevOffsetHandler,
      previousOffset,
      offset: offset2,
      shouldShowPagination
    };
  }
});
const _hoisted_1$4 = {
  key: 1,
  class: "k-table-error-state",
  "data-testid": "k-table-error-state"
};
const _hoisted_2$3 = {
  key: 2,
  class: "k-table-empty-state",
  "data-testid": "k-table-empty-state"
};
const _hoisted_3$3 = ["data-tableid"];
const _hoisted_4$2 = ["onClick"];
const _hoisted_5$2 = { class: "d-flex align-items-center" };
const _hoisted_6$1 = ["tabindex", "role"];
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KSkeleton = resolveComponent("KSkeleton");
  const _component_KButton = resolveComponent("KButton");
  const _component_KEmptyState = resolveComponent("KEmptyState");
  const _component_KIcon = resolveComponent("KIcon");
  const _component_KPagination = resolveComponent("KPagination");
  return openBlock(), createElementBlock("div", null, [
    (!_ctx.testMode || _ctx.testMode === "loading") && (_ctx.isTableLoading || _ctx.isLoading) && !_ctx.hasError ? (openBlock(), createBlock(_component_KSkeleton, {
      key: 0,
      type: "table",
      "data-testid": "k-table-skeleton"
    })) : _ctx.hasError ? (openBlock(), createElementBlock("div", _hoisted_1$4, [
      renderSlot(_ctx.$slots, "error-state", {}, () => [
        createVNode(_component_KEmptyState, {
          "is-error": "",
          "cta-is-hidden": !_ctx.errorStateActionMessage || !_ctx.errorStateActionRoute,
          icon: _ctx.errorStateIcon || "",
          "icon-color": _ctx.errorStateIconColor,
          "icon-size": _ctx.errorStateIconSize
        }, {
          title: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.errorStateTitle), 1)
          ]),
          message: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.errorStateMessage), 1)
          ]),
          cta: withCtx(() => [
            _ctx.errorStateActionMessage ? (openBlock(), createBlock(_component_KButton, {
              key: 0,
              to: _ctx.errorStateActionRoute ? _ctx.errorStateActionRoute : void 0,
              appearance: "primary",
              "data-testid": _ctx.getTestIdString(_ctx.errorStateActionMessage),
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("ktable-error-cta-clicked"))
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.errorStateActionMessage), 1)
              ]),
              _: 1
            }, 8, ["to", "data-testid"])) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["cta-is-hidden", "icon", "icon-color", "icon-size"])
      ], true)
    ])) : !_ctx.hasError && (!_ctx.isTableLoading && !_ctx.isLoading) && (_ctx.data && !_ctx.data.length) ? (openBlock(), createElementBlock("div", _hoisted_2$3, [
      renderSlot(_ctx.$slots, "empty-state", {}, () => [
        createVNode(_component_KEmptyState, {
          "cta-is-hidden": !_ctx.emptyStateActionMessage || !_ctx.emptyStateActionRoute,
          icon: _ctx.emptyStateIcon || "",
          "icon-color": _ctx.emptyStateIconColor,
          "icon-size": _ctx.emptyStateIconSize
        }, {
          title: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.emptyStateTitle), 1)
          ]),
          message: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.emptyStateMessage), 1)
          ]),
          cta: withCtx(() => [
            _ctx.emptyStateActionMessage ? (openBlock(), createBlock(_component_KButton, {
              key: 0,
              to: _ctx.emptyStateActionRoute ? _ctx.emptyStateActionRoute : void 0,
              icon: _ctx.emptyStateActionButtonIcon,
              appearance: _ctx.searchInput ? "btn-link" : "primary",
              "data-testid": _ctx.getTestIdString(_ctx.errorStateActionMessage),
              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("ktable-empty-state-cta-clicked"))
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.emptyStateActionMessage), 1)
              ]),
              _: 1
            }, 8, ["to", "icon", "appearance", "data-testid"])) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["cta-is-hidden", "icon", "icon-color", "icon-size"])
      ], true)
    ])) : (openBlock(), createElementBlock("section", {
      key: 3,
      class: "k-table-wrapper",
      onScrollPassive: _cache[2] || (_cache[2] = (...args) => _ctx.scrollHandler && _ctx.scrollHandler(...args))
    }, [
      createElementVNode("table", {
        class: normalizeClass([{ "has-hover": _ctx.hasHover, "is-clickable": _ctx.isClickable, "side-border": _ctx.hasSideBorder }, "k-table"]),
        "data-tableid": _ctx.tableId
      }, [
        createElementVNode("thead", {
          class: normalizeClass({ "is-scrolled": _ctx.isScrolled })
        }, [
          createElementVNode("tr", {
            class: normalizeClass({ "is-scrolled": _ctx.isScrolled })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tableHeaders, (column, index2) => {
              return openBlock(), createElementBlock("th", {
                key: `k-table-${_ctx.tableId}-headers-${index2}`,
                class: normalizeClass({
                  "sortable": !_ctx.disableSorting && !column.hideLabel && column.sortable,
                  "active-sort": !_ctx.disableSorting && !column.hideLabel && column.sortable && column.key === _ctx.sortColumnKey,
                  [_ctx.sortColumnOrder]: !_ctx.disableSorting && column.key === _ctx.sortColumnKey && !column.hideLabel,
                  "is-scrolled": _ctx.isScrolled
                }),
                onClick: () => {
                  if (!_ctx.disableSorting && column.sortable) {
                    _ctx.$emit("sort", {
                      prevKey: _ctx.sortColumnKey,
                      sortColumnKey: column.key,
                      sortColumnOrder: _ctx.sortColumnOrder === "asc" ? "desc" : "asc"
                    });
                    _ctx.sortClickHandler(column);
                  }
                }
              }, [
                createElementVNode("span", _hoisted_5$2, [
                  renderSlot(_ctx.$slots, `column-${column.key}`, { column }, () => [
                    createElementVNode("span", {
                      class: normalizeClass({ "sr-only": column.hideLabel })
                    }, toDisplayString(column.label ? column.label : column.key), 3)
                  ], true),
                  !_ctx.disableSorting && !column.hideLabel && column.sortable ? (openBlock(), createBlock(_component_KIcon, {
                    key: 0,
                    icon: "chevronDown",
                    color: "var(--KTableColor, var(--black-70, color(black-70)))",
                    size: "12",
                    class: "caret ml-2"
                  })) : createCommentVNode("", true)
                ])
              ], 10, _hoisted_4$2);
            }), 128))
          ], 2)
        ], 2),
        createElementVNode("tbody", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.data, (row, rowIndex) => {
            return openBlock(), createElementBlock("tr", mergeProps(_ctx.rowAttrs(row), {
              key: `k-table-${_ctx.tableId}-row-${rowIndex}`,
              tabindex: _ctx.isClickable ? 0 : null,
              role: _ctx.isClickable ? "link" : null
            }, toHandlers(_ctx.hasSideBorder ? _ctx.tdlisteners(row, row) : {})), [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tableHeaders, (value, index2) => {
                return openBlock(), createElementBlock("td", mergeProps(_ctx.cellAttrs({ headerKey: value.key, row, rowIndex, colIndex: index2 }), {
                  key: `k-table-${_ctx.tableId}-cell-${index2}`
                }, toHandlers(_ctx.tdlisteners(row[value.key], row))), [
                  renderSlot(_ctx.$slots, value.key, {
                    row,
                    rowKey: rowIndex,
                    rowValue: row[value.key]
                  }, () => [
                    createTextVNode(toDisplayString(row[value.key]), 1)
                  ], true)
                ], 16);
              }), 128))
            ], 16, _hoisted_6$1);
          }), 128))
        ])
      ], 10, _hoisted_3$3),
      _ctx.shouldShowPagination ? (openBlock(), createBlock(_component_KPagination, {
        key: 0,
        "total-count": _ctx.total,
        "current-page": _ctx.page,
        neighbors: _ctx.paginationNeighbors,
        "page-sizes": _ctx.paginationPageSizes,
        "initial-page-size": _ctx.pageSize,
        "disable-page-jump": _ctx.disablePaginationPageJump,
        "test-mode": _ctx.testMode ? true : false,
        "pagination-type": _ctx.paginationType,
        "offset-prev-button-disabled": !_ctx.previousOffset,
        "offset-next-button-disabled": !_ctx.offset,
        class: "pa-1",
        "data-testid": "k-table-pagination",
        onPageChanged: _ctx.pageChangeHandler,
        onPageSizeChanged: _ctx.pageSizeChangeHandler,
        onGetNextOffset: _ctx.getNextOffsetHandler,
        onGetPrevOffset: _ctx.getPrevOffsetHandler
      }, null, 8, ["total-count", "current-page", "neighbors", "page-sizes", "initial-page-size", "disable-page-jump", "test-mode", "pagination-type", "offset-prev-button-disabled", "offset-next-button-disabled", "onPageChanged", "onPageSizeChanged", "onGetNextOffset", "onGetPrevOffset"])) : createCommentVNode("", true)
    ], 32))
  ]);
}
var KTable = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-54b66ee0"]]);
var KTabs_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$3 = defineComponent({
  name: "KTabs",
  props: {
    tabs: {
      type: Array,
      required: true
    },
    modelValue: {
      type: String,
      default: "",
      validator: (val) => val === "" || val.includes("#") && !val.includes(" ")
    }
  },
  emits: ["changed"],
  setup(props, { emit }) {
    const activeTab = ref(props.modelValue ? props.modelValue : props.tabs[0].hash);
    const handleTabChange = (tab) => {
      activeTab.value = tab;
      emit("changed", tab);
    };
    watch(() => props.modelValue, (newTabHash) => {
      activeTab.value = newTabHash;
      emit("changed", newTabHash);
    });
    return {
      activeTab,
      handleTabChange
    };
  }
});
const _hoisted_1$3 = { class: "k-tabs" };
const _hoisted_2$2 = {
  role: "tablist",
  "aria-label": "ktabs"
};
const _hoisted_3$2 = ["id", "aria-selected", "aria-controls", "onKeydown", "onClick"];
const _hoisted_4$1 = { class: "tab-link" };
const _hoisted_5$1 = ["id", "aria-labelledby"];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    createElementVNode("ul", _hoisted_2$2, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tabs, (tab, i) => {
        return openBlock(), createElementBlock("li", {
          id: `${tab.hash.replace("#", "")}-tab`,
          key: tab.hash,
          "aria-selected": _ctx.activeTab === tab.hash ? "true" : "false",
          "aria-controls": `panel-${i}`,
          class: normalizeClass([{ active: _ctx.activeTab === tab.hash }, "tab-item"]),
          tabindex: "0",
          role: "tab",
          onKeydown: [
            withKeys(withModifiers(($event) => _ctx.handleTabChange(tab.hash), ["prevent"]), ["enter"]),
            withKeys(withModifiers(($event) => _ctx.handleTabChange(tab.hash), ["prevent"]), ["space"])
          ],
          onClick: ($event) => _ctx.handleTabChange(tab.hash)
        }, [
          createElementVNode("a", _hoisted_4$1, [
            renderSlot(_ctx.$slots, `${tab.hash.replace("#", "")}-anchor`, {}, () => [
              createTextVNode(toDisplayString(tab.title), 1)
            ], true)
          ])
        ], 42, _hoisted_3$2);
      }), 128))
    ]),
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tabs, (tab, i) => {
      return openBlock(), createElementBlock("div", {
        id: `panel-${i}`,
        key: tab.hash,
        "aria-labelledby": `${tab.hash.replace("#", "")}-tab`,
        role: "tabpanel",
        tabindex: "0",
        class: "tab-container"
      }, [
        _ctx.activeTab === tab.hash ? renderSlot(_ctx.$slots, tab.hash.replace("#", ""), { key: 0 }, void 0, true) : createCommentVNode("", true)
      ], 8, _hoisted_5$1);
    }), 128))
  ]);
}
var KTabs = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-6bcd6661"]]);
var KTextArea_vue_vue_type_style_index_0_scoped_true_lang = "";
const CHARACTER_LIMIT = 2048;
const _sfc_main$2 = defineComponent({
  name: "KTextArea",
  components: { KLabel },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    overlayLabel: {
      type: Boolean,
      default: false
    },
    labelAttributes: {
      type: Object,
      default: () => ({})
    },
    characterLimit: {
      type: Number,
      default: CHARACTER_LIMIT,
      validator: (limit) => limit > 0
    },
    disableCharacterLimit: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 5
    },
    cols: {
      type: Number,
      default: 52
    },
    hasError: {
      type: Boolean,
      default: false
    },
    testMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["input", "update:modelValue", "char-limit-exceeded"],
  setup(props, { attrs, emit }) {
    const currValue = ref("");
    const isFocused = ref(false);
    const isHovered = ref(false);
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(newValue) {
        inputHandler({ target: { value: newValue } });
      }
    });
    const textAreaId = computed(() => attrs.id ? String(attrs.id) : props.testMode ? "test-textArea-id-1234" : v1());
    const charLimitExceeded = computed(() => !props.disableCharacterLimit && currValue.value.length > props.characterLimit);
    const inputHandler = (e) => {
      var _a;
      const val = JSON.parse(JSON.stringify((_a = e == null ? void 0 : e.target) == null ? void 0 : _a.value));
      emit("input", val);
      emit("update:modelValue", val);
      currValue.value = val;
    };
    watch(charLimitExceeded, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        emit("char-limit-exceeded", {
          value: currValue.value,
          length: currValue.value.length,
          characterLimit: props.characterLimit,
          limitExceeded: newVal
        });
      }
    });
    watch(value, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        inputHandler({ target: { value: newVal } });
      }
    });
    const getValue = () => {
      return currValue.value ? currValue.value : props.modelValue;
    };
    return {
      currValue,
      isFocused,
      isHovered,
      textAreaId,
      charLimitExceeded,
      inputHandler,
      getValue
    };
  }
});
const _hoisted_1$2 = ["value", "rows", "cols"];
const _hoisted_2$1 = {
  key: 1,
  class: "mt-5"
};
const _hoisted_3$1 = { class: "text-on-input" };
const _hoisted_4 = ["for"];
const _hoisted_5 = ["id", "value", "rows", "cols", "aria-invalid"];
const _hoisted_6 = {
  key: 2,
  class: "mt-5"
};
const _hoisted_7 = ["id", "value", "rows", "cols", "aria-invalid"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KLabel = resolveComponent("KLabel");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([{ "input-error": _ctx.hasError || _ctx.charLimitExceeded }, "k-input-wrapper mb-2"])
  }, [
    !_ctx.label ? (openBlock(), createElementBlock("textarea", mergeProps({ key: 0 }, _ctx.$attrs, {
      value: _ctx.getValue(),
      rows: _ctx.rows,
      cols: _ctx.cols,
      class: "form-control k-input style-body-lg",
      onInput: _cache[0] || (_cache[0] = (...args) => _ctx.inputHandler && _ctx.inputHandler(...args))
    }), null, 16, _hoisted_1$2)) : _ctx.label && _ctx.overlayLabel ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
      createElementVNode("div", _hoisted_3$1, [
        createElementVNode("label", mergeProps({ for: _ctx.textAreaId }, _ctx.labelAttributes, {
          class: { focused: _ctx.isFocused, hovered: _ctx.isHovered }
        }), [
          createElementVNode("span", null, toDisplayString(_ctx.label), 1)
        ], 16, _hoisted_4),
        createElementVNode("textarea", mergeProps(_ctx.$attrs, {
          id: _ctx.textAreaId,
          value: _ctx.getValue(),
          rows: _ctx.rows,
          cols: _ctx.cols,
          "aria-invalid": _ctx.hasError || _ctx.charLimitExceeded ? "true" : void 0,
          class: "form-control k-input style-body-lg",
          onInput: _cache[1] || (_cache[1] = (...args) => _ctx.inputHandler && _ctx.inputHandler(...args)),
          onMouseenter: _cache[2] || (_cache[2] = () => _ctx.isHovered = true),
          onMouseleave: _cache[3] || (_cache[3] = () => _ctx.isHovered = false),
          onFocus: _cache[4] || (_cache[4] = () => _ctx.isFocused = true),
          onBlur: _cache[5] || (_cache[5] = () => _ctx.isFocused = false)
        }), null, 16, _hoisted_5)
      ])
    ])) : (openBlock(), createElementBlock("div", _hoisted_6, [
      createVNode(_component_KLabel, mergeProps({ for: _ctx.textAreaId }, _ctx.labelAttributes), {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.label), 1)
        ]),
        _: 1
      }, 16, ["for"]),
      createElementVNode("textarea", mergeProps(_ctx.$attrs, {
        id: _ctx.textAreaId,
        value: _ctx.getValue(),
        rows: _ctx.rows,
        cols: _ctx.cols,
        "aria-invalid": _ctx.hasError || _ctx.charLimitExceeded ? "true" : void 0,
        class: "form-control k-input style-body-lg",
        onInput: _cache[6] || (_cache[6] = (...args) => _ctx.inputHandler && _ctx.inputHandler(...args)),
        onMouseenter: _cache[7] || (_cache[7] = () => _ctx.isHovered = true),
        onMouseleave: _cache[8] || (_cache[8] = () => _ctx.isHovered = false),
        onFocus: _cache[9] || (_cache[9] = () => _ctx.isFocused = true),
        onBlur: _cache[10] || (_cache[10] = () => _ctx.isFocused = false)
      }), null, 16, _hoisted_7)
    ])),
    !_ctx.disableCharacterLimit ? (openBlock(), createElementBlock("div", {
      key: 3,
      class: normalizeClass([{ "over-char-limit": _ctx.charLimitExceeded }, "char-limit type-sm color-black-45 mt-2"])
    }, toDisplayString(_ctx.currValue.length || _ctx.modelValue.length) + " / " + toDisplayString(_ctx.characterLimit), 3)) : createCommentVNode("", true)
  ], 2);
}
var KTextArea = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-7c1e995e"]]);
var KToaster_vue_vue_type_style_index_0_lang = "";
var KToaster_vue_vue_type_style_index_1_scoped_true_lang = "";
const toasterAppearances = appearances$1;
const _sfc_main$1 = defineComponent({
  name: "KToaster",
  components: { KAlert },
  props: {
    toasterState: {
      type: Array,
      default: [],
      required: true
    }
  },
  emits: ["close"]
});
const _hoisted_1$1 = { class: "message" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KAlert = resolveComponent("KAlert");
  return openBlock(), createBlock(TransitionGroup, {
    name: "toaster",
    tag: "div",
    class: "toaster-container-outer"
  }, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.toasterState, (toaster) => {
        return openBlock(), createElementBlock("div", {
          key: toaster.key,
          class: "toaster-item"
        }, [
          createVNode(_component_KAlert, {
            appearance: toaster.appearance,
            "dismiss-type": "icon",
            "has-left-border": "",
            onClosed: ($event) => _ctx.$emit("close", toaster.key)
          }, {
            alertMessage: withCtx(() => [
              createElementVNode("div", _hoisted_1$1, toDisplayString(toaster.message), 1)
            ]),
            _: 2
          }, 1032, ["appearance", "onClosed"])
        ]);
      }), 128))
    ]),
    _: 1
  });
}
var KToaster = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-3b9fbf0b"]]);
const APPEARANCES = Object.keys(toasterAppearances);
const DEFAULTS = {
  id: "toaster-container",
  timeout: 5e3,
  appearance: toasterAppearances.info
};
class ToastManager {
  constructor(id = DEFAULTS.id, timeout = DEFAULTS.timeout, appearance = DEFAULTS.appearance) {
    __publicField(this, "toasters");
    __publicField(this, "timeout");
    __publicField(this, "appearance");
    __publicField(this, "id");
    this.toasters = ref([]);
    this.timeout = timeout;
    this.appearance = appearance;
    this.id = id;
    this.mount();
  }
  mount() {
    const notificationContainer = document.createElement("div");
    notificationContainer.id = this.id;
    document.body.appendChild(notificationContainer);
    const Toast2 = h(KToaster, {
      toasterState: this.toasters.value,
      onClose: (key) => this.close(key)
    });
    createApp(Toast2).mount(`#${this.id}`);
  }
  setTimer(key, timeout) {
    return setTimeout(() => this.close(key), timeout);
  }
  open(args) {
    const { key, timeoutMilliseconds, appearance, message } = args;
    const _key = key || this.toasters.value.length + new Date().getTime();
    const _appearance = appearance && APPEARANCES.indexOf(appearance) !== -1 ? appearance : this.appearance;
    const timer = this.setTimer(_key, timeoutMilliseconds || this.timeout);
    this.toasters.value.push({
      key: _key,
      appearance: _appearance,
      message: message || args,
      timer,
      timeoutMilliseconds: timeoutMilliseconds || this.timeout
    });
  }
  close(key) {
    var _a, _b;
    const i = (_a = this.toasters.value) == null ? void 0 : _a.findIndex((n) => key === n.key);
    clearTimeout((_b = this.toasters.value[i]) == null ? void 0 : _b.timer);
    this.toasters.value.splice(i, 1);
  }
  closeAll() {
    this.toasters.value.forEach((toast) => clearTimeout(toast == null ? void 0 : toast.timer));
    this.toasters.value.length = 0;
  }
}
var index$1 = defineComponent({
  name: "Kooltip",
  setup(props, { attrs, slots, emit }) {
    onMounted(() => console.warn("The Kongponents 'Kooltip' component is deprecated and will be removed in a future release.\nUpdate all references of 'Kooltip' to 'KTooltip'.\nKongponent Docs: https://kongponents.konghq.com/components/tooltip.html"));
    return () => h(KTooltip, __spreadValues(__spreadValues(__spreadValues({}, props), attrs), emit), slots);
  }
});
var KViewSwitcher_vue_vue_type_style_index_0_scoped_true_lang = "";
var KViewSwitcher_vue_vue_type_style_index_1_lang = "";
const _sfc_main = defineComponent({
  name: "KViewSwitcher",
  components: { KButton },
  props: {
    view: {
      type: String,
      default: "table",
      required: true,
      validator: (val) => ["table", "grid"].includes(val)
    }
  },
  emits: ["view-changed"],
  setup(props, { emit }) {
    const isPaused = ref(true);
    const toggleView = () => {
      isPaused.value = false;
      emit("view-changed", props.view === "table" ? "grid" : "table");
    };
    return {
      isPaused,
      toggleView
    };
  }
});
const _hoisted_1 = { class: "icon" };
const _hoisted_2 = { class: "dots" };
const _hoisted_3 = { class: "lines" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KButton = resolveComponent("KButton");
  return openBlock(), createBlock(_component_KButton, {
    "is-rounded": false,
    class: normalizeClass([[_ctx.view, { paused: _ctx.isPaused }], "k-view-switcher view-switch-button non-visual-button"]),
    title: `Toggle to ${_ctx.view === "table" ? "grid" : "table"} view`,
    size: "small",
    appearance: "outline",
    onClick: _ctx.toggleView
  }, {
    default: withCtx(() => [
      createElementVNode("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
          (openBlock(), createElementBlock(Fragment, null, renderList(4, (i) => {
            return createElementVNode("i", { key: i });
          }), 64))
        ]),
        createElementVNode("div", _hoisted_3, [
          (openBlock(), createElementBlock(Fragment, null, renderList(4, (i) => {
            return createElementVNode("i", { key: i });
          }), 64))
        ])
      ])
    ]),
    _: 1
  }, 8, ["class", "title", "onClick"]);
}
var KViewSwitcher = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d5e8360c"]]);
var components = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  KClipboardProvider: index$4,
  KComponent: index$3,
  Komponent: index$3,
  KToggle,
  KAlert,
  KBadge,
  KBreadcrumbs,
  Krumbs: index$2,
  KButton,
  KCard,
  KCatalog,
  KCatalogItem,
  KCheckbox,
  KDropdownMenu,
  KDropdownItem,
  KEmptyState,
  KIcon,
  KInlineEdit,
  KInput,
  KInputSwitch,
  KLabel,
  KMenu,
  KMenuItem,
  KModal,
  KModalFullscreen,
  KPagination,
  KPop,
  KPrompt,
  KRadio,
  KSegmentedControl,
  KSelect,
  KSkeleton,
  KSkeletonBox,
  KSlideout,
  KStepper,
  KTable,
  KTabs,
  KTextArea,
  KToaster,
  ToastManager,
  KTooltip,
  Kooltip: index$1,
  KViewSwitcher
});
var styles = "";
var index = {
  install: (app) => {
    for (const key in components) {
      app.component(key, components[key]);
    }
  }
};
export { KAlert, KBadge, KBreadcrumbs, KButton, KCard, KCatalog, KCatalogItem, KCheckbox, index$4 as KClipboardProvider, index$3 as KComponent, KDropdownItem, KDropdownMenu, KEmptyState, KIcon, KInlineEdit, KInput, KInputSwitch, KLabel, KMenu, KMenuItem, KModal, KModalFullscreen, KPagination, KPop, KPrompt, KRadio, KSegmentedControl, KSelect, KSkeleton, KSkeletonBox, KSlideout, KStepper, KTable, KTabs, KTextArea, KToaster, KToggle, KTooltip, KViewSwitcher, index$3 as Komponent, index$1 as Kooltip, index$2 as Krumbs, ToastManager, index as default };
