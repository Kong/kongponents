'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const appearances = {
  info: 'info',
  success: 'success',
  danger: 'danger',
  warning: 'warning'
};

var script = {
  name: 'KAlert',
  props: {
    /**
    * Message to show in toaster
    */
    alertMessage: {
      type: String,
      default: ''
    },
    /**
     * Set if close button is visible
     */
    isDismissible: {
      type: Boolean,
      default: false
    },
    /**
     * Set whether or not the alert box is shown.
     */
    isShowing: {
      type: Boolean,
      default: false
    },
    /**
     * Set whether or not left border is visible
     */
    hasBorder: {
      type: Boolean,
      default: false
    },
    /**
      * Base styling of the button<br>
      * One of ['primary, danger, warning, success ]
      */
    appearance: {
      type: String,
      default: 'info',
      validator: function (value) {
        return Object.values(appearances).indexOf(value) !== -1
      }
    },
    /**
     * Set whether alert box is the default size or small for context (under form fields, etc),
     */
    size: {
      type: String,
      default: ''
    },
    /**
      * Add custom attributes or definitions
      */
    alertAttributes: {
      type: Object,
      default: function () {
        return {
          class: ''
        }
      }
    }
  },
  methods: {
    dismissAlert () {
      this.isShowing = false;
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

function createInjectorSSR(context) {
  if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
    context = __VUE_SSR_CONTEXT__;
  }

  if (!context) return function () {};

  if (!('styles' in context)) {
    context._styles = context._styles || {};
    Object.defineProperty(context, 'styles', {
      enumerable: true,
      get: function get() {
        return context._renderStyles(context._styles);
      }
    });
    context._renderStyles = context._renderStyles || renderStyles;
  }

  return function (id, style) {
    return addStyle(id, style, context);
  };
}

function addStyle(id, css, context) {
  var group = process.env.NODE_ENV === 'production' ? css.media || 'default' : id;
  var style = context._styles[group] || (context._styles[group] = {
    ids: [],
    css: ''
  });

  if (!style.ids.includes(id)) {
    style.media = css.media;
    style.ids.push(id);
    var code = css.source;

    if (process.env.NODE_ENV !== 'production' && css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    style.css += code + '\n';
  }
}

function renderStyles(styles) {
  var css = '';

  for (var key in styles) {
    var style = styles[key];
    css += '<style data-vue-ssr-id="' + Array.from(style.ids).join(' ') + '"' + (style.media ? ' media="' + style.media + '"' : '') + '>' + style.css + '</style>';
  }

  return css;
}

var server = createInjectorSSR;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.isShowing
    ? _c(
        "div",
        _vm._b(
          {
            staticClass: "k-alert",
            class: [
              _vm.appearance,
              _vm.size,
              { border: _vm.hasBorder },
              _vm.alertAttributes["class"]
            ],
            attrs: { role: "alert" }
          },
          "div",
          _vm.alertAttributes,
          false
        ),
        [
          _vm._ssrNode(
            (_vm.isDismissible
              ? '<button type="button" aria-label="Close" class="close">×</button>'
              : "<!---->") + " "
          ),
          _vm._ssrNode(
            '<span class="alert-icon">',
            "</span>",
            [_vm._t("alertIcon")],
            2
          ),
          _vm._ssrNode(" "),
          _vm._t("alertMessage", [_vm._v(_vm._s(_vm.alertMessage))])
        ],
        2
      )
    : _vm._e()
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-2e74a1bc_0", { source: "\n.k-alert[data-v-2e74a1bc] {\n  font-family: inherit;\n  position: relative;\n  display: flex;\n  align-items: center;\n  padding: 1rem;\n  font-size: 1rem;\n  border-radius: .1875rem;\n}\n.k-alert .alert-icon[data-v-2e74a1bc] {\n  margin-right: .5rem;\n  max-height: 1rem;\n}\n.k-alert .alert-icon svg[data-v-2e74a1bc],\n.k-alert .alert-icon img[data-v-2e74a1bc] {\n  max-height: 1rem;\n}\n.k-alert.small[data-v-2e74a1bc] {\n  font-size: .875rem;\n  padding: .5rem;\n}\n.k-alert.border[data-v-2e74a1bc] {\n  border-left: 3px solid;\n  border-radius: 0 .1875rem .1875rem 0;\n}\n.k-alert.info[data-v-2e74a1bc] {\n  color: #0E4C7C;\n  border-color: #80CAFF;\n  background-color: #E6F5FF;\n}\n.k-alert.success[data-v-2e74a1bc] {\n  color: #0F5A30;\n  border-color: #8CD9AC;\n  background-color: #E1F5EB;\n}\n.k-alert.danger[data-v-2e74a1bc] {\n  color: #D90000;\n  border-color: #FF8280;\n  background-color: #FEE6E6;\n}\n.k-alert.warning[data-v-2e74a1bc] {\n  color: #403624;\n  border-color: #FFDF80;\n  background-color: #FFF7E8;\n}\n.k-alert .alert-link[data-v-2e74a1bc] {\n  font-weight: 700;\n}\n.k-alert .close[data-v-2e74a1bc] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 8px 15px;\n  font-size: 1.5rem;\n  font-weight: 700;\n  line-height: 1;\n  opacity: .5;\n  color: inherit;\n  cursor: pointer;\n  border: 0;\n  background-color: transparent;\n  text-shadow: 0 1px 0 #fff;\n  -webkit-appearance: none;\n}\n.k-alert.small .close[data-v-2e74a1bc] {\n  padding: 4px 7.5px;\n}\n.k-alert .close[data-v-2e74a1bc]:hover,\n.k-alert .close[data-v-2e74a1bc]:active {\n  text-decoration: none;\n  opacity: .75;\n}\n", map: {"version":3,"sources":["/Users/tong/Documents/repos/kongponents/packages/KAlert/KAlert.vue"],"names":[],"mappings":";AAmGA;EACA,oBAAA;EACA,kBAAA;EACA,aAAA;EACA,mBAAA;EACA,aAAA;EACA,eAAA;EACA,uBAAA;AACA;AACA;EACA,mBAAA;EACA,gBAAA;AACA;AACA;;EAEA,gBAAA;AACA;AACA;EACA,kBAAA;EACA,cAAA;AACA;AACA;EACA,sBAAA;EACA,oCAAA;AACA;AACA;EACA,cAAA;EACA,qBAAA;EACA,yBAAA;AACA;AACA;EACA,cAAA;EACA,qBAAA;EACA,yBAAA;AACA;AACA;EACA,cAAA;EACA,qBAAA;EACA,yBAAA;AACA;AACA;EACA,cAAA;EACA,qBAAA;EACA,yBAAA;AACA;AACA;EACA,gBAAA;AACA;AACA;EACA,kBAAA;EACA,MAAA;EACA,QAAA;EACA,iBAAA;EACA,iBAAA;EACA,gBAAA;EACA,cAAA;EACA,WAAA;EACA,cAAA;EACA,eAAA;EACA,SAAA;EACA,6BAAA;EACA,yBAAA;EACA,wBAAA;AACA;AACA;EACA,kBAAA;AACA;AACA;;EAEA,qBAAA;EACA,YAAA;AACA","file":"KAlert.vue","sourcesContent":["<template>\n  <div\n    v-if=\"isShowing\"\n    v-bind=\"alertAttributes\"\n    :class=\"[appearance, size, {'border':hasBorder}, alertAttributes['class']]\"\n    class=\"k-alert\"\n    role=\"alert\">\n    <button\n      v-if=\"isDismissible\"\n      type=\"button\"\n      aria-label=\"Close\"\n      class=\"close\"\n      @click=\"dismissAlert()\">×</button>\n    <!-- @slot Use this slot when passing in an icon -->\n    <span class=\"alert-icon\">\n      <slot name=\"alertIcon\" />\n    </span>\n    <slot name=\"alertMessage\">{{ alertMessage }}</slot>\n  </div>\n</template>\n\n<script>\nexport const appearances = {\n  info: 'info',\n  success: 'success',\n  danger: 'danger',\n  warning: 'warning'\n}\n\nexport default {\n  name: 'KAlert',\n  props: {\n    /**\n    * Message to show in toaster\n    */\n    alertMessage: {\n      type: String,\n      default: ''\n    },\n    /**\n     * Set if close button is visible\n     */\n    isDismissible: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * Set whether or not the alert box is shown.\n     */\n    isShowing: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * Set whether or not left border is visible\n     */\n    hasBorder: {\n      type: Boolean,\n      default: false\n    },\n    /**\n      * Base styling of the button<br>\n      * One of ['primary, danger, warning, success ]\n      */\n    appearance: {\n      type: String,\n      default: 'info',\n      validator: function (value) {\n        return Object.values(appearances).indexOf(value) !== -1\n      }\n    },\n    /**\n     * Set whether alert box is the default size or small for context (under form fields, etc),\n     */\n    size: {\n      type: String,\n      default: ''\n    },\n    /**\n      * Add custom attributes or definitions\n      */\n    alertAttributes: {\n      type: Object,\n      default: function () {\n        return {\n          class: ''\n        }\n      }\n    }\n  },\n  methods: {\n    dismissAlert () {\n      this.isShowing = false\n    }\n  }\n}\n</script>\n\n<style scoped>\n  .k-alert {\n    font-family: inherit;\n    position: relative;\n    display: flex;\n    align-items: center;\n    padding: 1rem;\n    font-size: 1rem;\n    border-radius: .1875rem;\n  }\n  .k-alert .alert-icon {\n    margin-right: .5rem;\n    max-height: 1rem;\n  }\n  .k-alert .alert-icon svg,\n  .k-alert .alert-icon img {\n    max-height: 1rem;\n  }\n  .k-alert.small {\n    font-size: .875rem;\n    padding: .5rem;\n  }\n  .k-alert.border {\n    border-left: 3px solid;\n    border-radius: 0 .1875rem .1875rem 0;\n  }\n  .k-alert.info {\n    color: #0E4C7C;\n    border-color: #80CAFF;\n    background-color: #E6F5FF;\n  }\n  .k-alert.success {\n    color: #0F5A30;\n    border-color: #8CD9AC;\n    background-color: #E1F5EB;\n  }\n  .k-alert.danger {\n    color: #D90000;\n    border-color: #FF8280;\n    background-color: #FEE6E6;\n  }\n  .k-alert.warning {\n    color: #403624;\n    border-color: #FFDF80;\n    background-color: #FFF7E8;\n  }\n  .k-alert .alert-link {\n    font-weight: 700;\n  }\n  .k-alert .close {\n    position: absolute;\n    top: 0;\n    right: 0;\n    padding: 8px 15px;\n    font-size: 1.5rem;\n    font-weight: 700;\n    line-height: 1;\n    opacity: .5;\n    color: inherit;\n    cursor: pointer;\n    border: 0;\n    background-color: transparent;\n    text-shadow: 0 1px 0 #fff;\n    -webkit-appearance: none;\n  }\n  .k-alert.small .close {\n    padding: 4px 7.5px;\n  }\n  .k-alert .close:hover,\n  .k-alert .close:active {\n    text-decoration: none;\n    opacity: .75;\n  }\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-2e74a1bc";
  /* module identifier */
  const __vue_module_identifier__ = "data-v-2e74a1bc";
  /* functional template */
  const __vue_is_functional_template__ = false;

  
  normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    server
  );

//
//
//
//
//
//
//
//
//
//

var script$1 = {
  name: 'KButton',
  props: {
    /**
     * Adds border radius
     */
    isRounded: {
      type: Boolean,
      default: true
    },
    /**
      * Base styling of the button<br>
      * One of ['primary, outline-primary, secondary, outline-secondary, danger', 'outline-danger, btn-link', btn-link-danger ]
      */
    appearance: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return [
          'primary',
          'danger',
          'secondary',
          'outline-primary',
          'outline-danger',
          'btn-link',
          'btn-link-danger',
          ''
        ].indexOf(value) !== -1
      }
    },
    /**
      * Add custom attributes or definitions
      */
    buttonAttributes: {
      type: Object,
      default: function () {
        return {
          class: ''
        }
      }
    }
  },

  computed: {
    listeners () {
      return {
        ...this.$listeners
      }
    },

    buttonBindings () {
      return {
        ...this.buttonAttributes
      }
    }
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "button",
    _vm._g(
      _vm._b(
        {
          staticClass: "button",
          class: [
            { rounded: _vm.isRounded },
            _vm.appearance,
            _vm.buttonAttributes["class"]
          ]
        },
        "button",
        _vm.buttonBindings,
        false
      ),
      _vm.listeners
    ),
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-c5b1e26c_0", { source: "\n.button[data-v-c5b1e26c] {\n  font-family: 'Roboto', sans-serif;\n  font-size: 1rem;\n  line-height: 1.25;\n  border-radius: 3px;\n  border: 1px solid transparent;\n  padding: .5rem .75rem;\n  transition: all .2s ease-in-out;\n  cursor: pointer;\n}\n.button.primary[data-v-c5b1e26c] {\n  font-weight: 500;\n  color: white;\n  background-color: #0095ff;\n  border-color: transparent !important;\n}\n.button.primary[data-v-c5b1e26c]:hover {\n  background-color: #4db5ff;\n}\n.button.danger[data-v-c5b1e26c] {\n  font-weight: 500;\n  background-color: #f2110d;\n  color: white;\n  border-color: transparent !important;\n}\n.button.danger[data-v-c5b1e26c]:hover {\n  background-color: #f65855;\n}\n.button.danger[data-v-c5b1e26c]:active {\n  background-color: #aa0c09;\n}\n.button.secondary[data-v-c5b1e26c] {\n  background-color: #f5f5f5;\n  color: rgba(0, 0, 0, 0.7);\n  border-color: rgba(0, 0, 0, 0.12);\n}\n.button.secondary[data-v-c5b1e26c]:hover {\n  color: rgba(0, 0, 0, 0.85);\n  border-color: rgba(0, 0, 0, 0.25);\n}\n.button.secondary[data-v-c5b1e26c]:active {\n  color: rgba(0, 0, 0, 0.7);\n  background-color: gainsboro;\n}\n.button.outline-primary[data-v-c5b1e26c] {\n  background-color: rgba(255,255,255,.5);\n  color: #0077cc;\n  border-color: #80caff;\n}\n.button.outline-primary[data-v-c5b1e26c]:hover {\n  font-weight: 500;\n  background-color: #4db5ff;\n  color: #ffffff;\n  border-color: transparent;\n}\n.button.outline-primary[data-v-c5b1e26c]:active {\n  background-color: #0068b3;\n}\n.button.outline-primary[data-v-c5b1e26c]:active {\n  background-color: #0068b3;\n  color: #ffffff;\n  border-color: transparent;\n}\n.button.outline-danger[data-v-c5b1e26c] {\n  font-weight: 500;\n  background-color: transparent;\n  color: #f2110d;\n  border-color: #ff8280;\n}\n.button.outline-danger[data-v-c5b1e26c]:hover {\n  background-color: #f65855;\n  color: #ffffff;\n  border-color: transparent;\n}\n.button.outline-danger[data-v-c5b1e26c]:active {\n  background-color: #aa0c09;\n  color: #ffffff;\n  border-color: transparent;\n}\n.button.btn-link[data-v-c5b1e26c] {\n  background-color: transparent;\n  color: #0077cc;\n}\n.button.btn-link[data-v-c5b1e26c]:hover {\n  color: #0077cc;\n}\n.button.btn-link[data-v-c5b1e26c]:active {\n  color: #003c66;\n}\n.button.btn-link-danger[data-v-c5b1e26c] {\n  background-color: transparent;\n  color: #f2110d;\n}\n.button.btn-link-danger[data-v-c5b1e26c]:hover {\n  color: #f2110d;\n  text-decoration: underline;\n}\n.button.btn-link-danger[data-v-c5b1e26c]:active {\n  color: #910a08;\n}\n.rounded[data-v-c5b1e26c] {\n  border-radius: 3px;\n}\n.button[data-v-c5b1e26c]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n", map: {"version":3,"sources":["/Users/tong/Documents/repos/kongponents/packages/KButton/KButton.vue"],"names":[],"mappings":";AAuEA;EACA,iCAAA;EACA,eAAA;EACA,iBAAA;EACA,kBAAA;EACA,6BAAA;EACA,qBAAA;EACA,+BAAA;EACA,eAAA;AACA;AAEA;EACA,gBAAA;EACA,YAAA;EACA,yBAAA;EACA,oCAAA;AACA;AAEA;EACA,yBAAA;AACA;AAEA;EACA,gBAAA;EACA,yBAAA;EACA,YAAA;EACA,oCAAA;AACA;AAEA;EACA,yBAAA;AACA;AAEA;EACA,yBAAA;AACA;AAEA;EACA,yBAAA;EACA,yBAAA;EACA,iCAAA;AACA;AAEA;EACA,0BAAA;EACA,iCAAA;AACA;AAEA;EACA,yBAAA;EACA,2BAAA;AACA;AAEA;EACA,sCAAA;EACA,cAAA;EACA,qBAAA;AACA;AAEA;EACA,gBAAA;EACA,yBAAA;EACA,cAAA;EACA,yBAAA;AACA;AAEA;EACA,yBAAA;AACA;AAEA;EACA,yBAAA;EACA,cAAA;EACA,yBAAA;AACA;AAEA;EACA,gBAAA;EACA,6BAAA;EACA,cAAA;EACA,qBAAA;AACA;AAEA;EACA,yBAAA;EACA,cAAA;EACA,yBAAA;AACA;AAEA;EACA,yBAAA;EACA,cAAA;EACA,yBAAA;AACA;AAEA;EACA,6BAAA;EACA,cAAA;AACA;AAEA;EACA,cAAA;AACA;AAEA;EACA,cAAA;AACA;AAEA;EACA,6BAAA;EACA,cAAA;AACA;AAEA;EACA,cAAA;EACA,0BAAA;AACA;AAEA;EACA,cAAA;AACA;AACA;EACA,kBAAA;AACA;AAEA;EACA,YAAA;EACA,mBAAA;AACA","file":"KButton.vue","sourcesContent":["<template>\n  <button\n    v-bind=\"buttonBindings\"\n    :class=\"[{rounded: isRounded}, appearance, buttonAttributes['class']]\"\n    class=\"button\"\n    v-on=\"listeners\">\n    <slot/>\n  </button>\n</template>\n\n<script>\nexport default {\n  name: 'KButton',\n  props: {\n    /**\n     * Adds border radius\n     */\n    isRounded: {\n      type: Boolean,\n      default: true\n    },\n    /**\n      * Base styling of the button<br>\n      * One of ['primary, outline-primary, secondary, outline-secondary, danger', 'outline-danger, btn-link', btn-link-danger ]\n      */\n    appearance: {\n      type: String,\n      default: 'primary',\n      validator: function (value) {\n        return [\n          'primary',\n          'danger',\n          'secondary',\n          'outline-primary',\n          'outline-danger',\n          'btn-link',\n          'btn-link-danger',\n          ''\n        ].indexOf(value) !== -1\n      }\n    },\n    /**\n      * Add custom attributes or definitions\n      */\n    buttonAttributes: {\n      type: Object,\n      default: function () {\n        return {\n          class: ''\n        }\n      }\n    }\n  },\n\n  computed: {\n    listeners () {\n      return {\n        ...this.$listeners\n      }\n    },\n\n    buttonBindings () {\n      return {\n        ...this.buttonAttributes\n      }\n    }\n  }\n}\n</script>\n\n<style scoped>\n  .button {\n    font-family: 'Roboto', sans-serif;\n    font-size: 1rem;\n    line-height: 1.25;\n    border-radius: 3px;\n    border: 1px solid transparent;\n    padding: .5rem .75rem;\n    transition: all .2s ease-in-out;\n    cursor: pointer;\n  }\n\n  .button.primary {\n    font-weight: 500;\n    color: white;\n    background-color: #0095ff;\n    border-color: transparent !important;\n  }\n\n  .button.primary:hover {\n    background-color: #4db5ff;\n  }\n\n  .button.danger {\n    font-weight: 500;\n    background-color: #f2110d;\n    color: white;\n    border-color: transparent !important;\n  }\n\n  .button.danger:hover {\n    background-color: #f65855;\n  }\n\n  .button.danger:active {\n    background-color: #aa0c09;\n  }\n\n  .button.secondary {\n    background-color: #f5f5f5;\n    color: rgba(0, 0, 0, 0.7);\n    border-color: rgba(0, 0, 0, 0.12);\n  }\n\n  .button.secondary:hover {\n    color: rgba(0, 0, 0, 0.85);\n    border-color: rgba(0, 0, 0, 0.25);\n  }\n\n  .button.secondary:active {\n    color: rgba(0, 0, 0, 0.7);\n    background-color: gainsboro;\n  }\n\n  .button.outline-primary {\n    background-color: rgba(255,255,255,.5);\n    color: #0077cc;\n    border-color: #80caff;\n  }\n\n  .button.outline-primary:hover {\n    font-weight: 500;\n    background-color: #4db5ff;\n    color: #ffffff;\n    border-color: transparent;\n  }\n\n  .button.outline-primary:active {\n    background-color: #0068b3;\n  }\n\n  .button.outline-primary:active {\n    background-color: #0068b3;\n    color: #ffffff;\n    border-color: transparent;\n  }\n\n  .button.outline-danger {\n    font-weight: 500;\n    background-color: transparent;\n    color: #f2110d;\n    border-color: #ff8280;\n  }\n\n  .button.outline-danger:hover {\n    background-color: #f65855;\n    color: #ffffff;\n    border-color: transparent;\n  }\n\n  .button.outline-danger:active {\n    background-color: #aa0c09;\n    color: #ffffff;\n    border-color: transparent;\n  }\n\n  .button.btn-link {\n    background-color: transparent;\n    color: #0077cc;\n  }\n\n  .button.btn-link:hover {\n    color: #0077cc;\n  }\n\n  .button.btn-link:active {\n    color: #003c66;\n  }\n\n  .button.btn-link-danger {\n    background-color: transparent;\n    color: #f2110d;\n  }\n\n  .button.btn-link-danger:hover {\n    color: #f2110d;\n    text-decoration: underline;\n  }\n\n  .button.btn-link-danger:active {\n    color: #910a08;\n  }\n  .rounded {\n    border-radius: 3px;\n  }\n\n  .button:disabled {\n    opacity: 0.4;\n    cursor: not-allowed;\n  }\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-c5b1e26c";
  /* module identifier */
  const __vue_module_identifier__$1 = "data-v-c5b1e26c";
  /* functional template */
  const __vue_is_functional_template__$1 = false;

  
  var KButton = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    server
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$2 = {
  name: 'KCard',

  props: {
    /**
     * Pass title sting in if slot not used
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * Pass body sting in if slot not used
     */
    body: {
      type: String,
      default: ''
    },
    /**
      * Set top border or no border. If neither set defaut will have border<br>
      * Options: [borderTop, noBorder]
      */
    borderVariant: {
      type: String,
      default: 'border'
    },
    /**
      * Sets if card has hover state<br>
      */
    hasHover: {
      type: Boolean,
      default: false
    }
  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "kong-card",
      class: [_vm.borderVariant, { hover: _vm.hasHover }]
    },
    [
      _vm._ssrNode(
        '<div class="k-card-header">',
        "</div>",
        [
          _vm._ssrNode('<div class="k-card-title">', "</div>", [
            _vm._ssrNode(
              "<h4>",
              "</h4>",
              [_vm._t("title", [_vm._v(_vm._s(_vm.title))])],
              2
            )
          ]),
          _vm._ssrNode(" "),
          _vm._ssrNode(
            '<div class="k-card-actions">',
            "</div>",
            [_vm._t("actions")],
            2
          )
        ],
        2
      ),
      _vm._ssrNode(" "),
      _vm._ssrNode(
        '<div class="k-card-body">',
        "</div>",
        [_vm._t("body", [_vm._v(_vm._s(_vm.body))])],
        2
      )
    ],
    2
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-65cf3482_0", { source: "\n.kong-card[data-v-65cf3482] {\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n.kong-card.noBoard[data-v-65cf3482] {\n  border: none;\n}\n.kong-card.border[data-v-65cf3482] {\n  border-radius: 3px;\n  border: 1px solid rgba(0,0,0,.12);\n  box-shadow: none;\n}\n.kong-card.borderTop[data-v-65cf3482] {\n  border-top: 1px solid rgba(0, 0, 0, 0.08);\n}\n.kong-card.hover[data-v-65cf3482]:hover {\n  box-shadow: 0 4px 8px rgba(0,0,0,.12);\n}\n.kong-card .k-card-header[data-v-65cf3482] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 1rem;\n}\n.kong-card .k-card-title h4[data-v-65cf3482] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 500;\n  color: rgba(0,0,0,.85);\n}\n.kong-card .k-card-actions[data-v-65cf3482]  {\n  margin-left: auto;\n}\n", map: {"version":3,"sources":["/Users/tong/Documents/repos/kongponents/packages/KCard/KCard.vue"],"names":[],"mappings":";AA8DA;EACA,aAAA;EACA,mBAAA;AACA;AAEA;EACA,YAAA;AACA;AAEA;EACA,kBAAA;EACA,iCAAA;EACA,gBAAA;AACA;AAEA;EACA,yCAAA;AACA;AAEA;EACA,qCAAA;AACA;AAEA;EACA,aAAA;EACA,mBAAA;EACA,mBAAA;AACA;AAEA;EACA,SAAA;EACA,eAAA;EACA,gBAAA;EACA,sBAAA;AACA;AAEA;EACA,iBAAA;AACA","file":"KCard.vue","sourcesContent":["<template>\n  <div\n    :class=\"[borderVariant, {'hover': hasHover }]\"\n    class=\"kong-card\">\n    <div class=\"k-card-header\">\n      <div class=\"k-card-title\">\n        <h4>\n          <!-- @slot Use this slot to pass title content -->\n          <slot name=\"title\">{{ title }}</slot>\n        </h4>\n      </div>\n      <div class=\"k-card-actions\">\n        <!-- @slot Use this slot to pass actions to right side of header -->\n        <slot name=\"actions\"/>\n      </div>\n    </div>\n    <div class=\"k-card-body\">\n      <!-- @slot Use this slot to pass in body content -->\n      <slot name=\"body\">{{ body }}</slot>\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'KCard',\n\n  props: {\n    /**\n     * Pass title sting in if slot not used\n     */\n    title: {\n      type: String,\n      default: ''\n    },\n    /**\n     * Pass body sting in if slot not used\n     */\n    body: {\n      type: String,\n      default: ''\n    },\n    /**\n      * Set top border or no border. If neither set defaut will have border<br>\n      * Options: [borderTop, noBorder]\n      */\n    borderVariant: {\n      type: String,\n      default: 'border'\n    },\n    /**\n      * Sets if card has hover state<br>\n      */\n    hasHover: {\n      type: Boolean,\n      default: false\n    }\n  }\n}\n</script>\n\n<style scoped>\n.kong-card {\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n\n.kong-card.noBoard {\n  border: none;\n}\n\n.kong-card.border {\n  border-radius: 3px;\n  border: 1px solid rgba(0,0,0,.12);\n  box-shadow: none;\n}\n\n.kong-card.borderTop {\n  border-top: 1px solid rgba(0, 0, 0, 0.08);\n}\n\n.kong-card.hover:hover {\n  box-shadow: 0 4px 8px rgba(0,0,0,.12);\n}\n\n.kong-card .k-card-header {\n  display: flex;\n  align-items: center;\n  margin-bottom: 1rem;\n}\n\n.kong-card .k-card-title h4 {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 500;\n  color: rgba(0,0,0,.85);\n}\n\n.kong-card .k-card-actions  {\n  margin-left: auto;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = "data-v-65cf3482";
  /* module identifier */
  const __vue_module_identifier__$2 = "data-v-65cf3482";
  /* functional template */
  const __vue_is_functional_template__$2 = false;

  
  normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    server
  );

//
var script$3 = {
  name: 'KEmptyState',
  components: { KButton },
  props: {
    ctaIsHidden: {
      type: Boolean,
      default: false
    },
    ctaText: {
      type: String,
      default: ''
    },
    handleClick: {
      type: Function,
      default: () => () => null
    }
  }
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "empty-state-wrapper" },
    [
      _vm._ssrNode('<div class="empty-state-title">', "</div>", [
        _vm._ssrNode("<h5>", "</h5>", [_vm._t("title")], 2)
      ]),
      _vm._ssrNode(" "),
      _vm._ssrNode(
        '<div class="empty-state-content">',
        "</div>",
        [
          _vm._ssrNode("<p>", "</p>", [_vm._t("message")], 2),
          _vm._ssrNode(" "),
          _vm._ssrNode(
            "<p>",
            "</p>",
            [
              _vm._t("cta", [
                !_vm.ctaIsHidden
                  ? _c(
                      "KButton",
                      {
                        attrs: {
                          "is-rounded": true,
                          appearance: "outline-primary"
                        },
                        nativeOn: {
                          click: function($event) {
                            return _vm.handleClick($event)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n          " + _vm._s(_vm.ctaText) + "\n        "
                        )
                      ]
                    )
                  : _vm._e()
              ])
            ],
            2
          )
        ],
        2
      )
    ],
    2
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-c7fb3f40_0", { source: "\n.empty-state-wrapper[data-v-c7fb3f40] {\n  padding: 4rem 0;\n  text-align: center;\n  color: rgba(0,0,0,.70);\n  border: 1px solid rgba(151,151,151,.1);\n  border-radius: 3px;\n  background-color: rgba(0,0,0,.03);\n}\n.empty-state-wrapper h5[data-v-c7fb3f40] {\n  margin: 0 0 .75rem;\n  font-size: 18px;\n  font-weight: 500;\n  line-height: 21px;\n}\n.empty-state-wrapper p[data-v-c7fb3f40] {\n  margin: 0 auto 1.5rem;\n  font-size: 1rem;\n  line-height: 1.375rem;\n  font-weight: 400;\n  max-width: 50%;\n}\n.empty-state-wrapper p[data-v-c7fb3f40]:last-child {\n  margin: 0;\n  margin-left: auto;\n  margin-right: auto;\n}\n", map: {"version":3,"sources":["/Users/tong/Documents/repos/kongponents/packages/KEmptyState/KEmptyState.vue"],"names":[],"mappings":";AA6CA;EACA,eAAA;EACA,kBAAA;EACA,sBAAA;EACA,sCAAA;EACA,kBAAA;EACA,iCAAA;AACA;AACA;EACA,kBAAA;EACA,eAAA;EACA,gBAAA;EACA,iBAAA;AACA;AACA;EACA,qBAAA;EACA,eAAA;EACA,qBAAA;EACA,gBAAA;EACA,cAAA;AACA;AACA;EACA,SAAA;EACA,iBAAA;EACA,kBAAA;AACA","file":"KEmptyState.vue","sourcesContent":["<template>\n  <div class=\"empty-state-wrapper\">\n    <div class=\"empty-state-title\">\n      <h5><slot name=\"title\"/></h5>\n    </div>\n    <div class=\"empty-state-content\">\n      <p><slot name=\"message\"/></p>\n      <p>\n        <slot name=\"cta\">\n          <KButton\n            v-if=\"!ctaIsHidden\"\n            :is-rounded=\"true\"\n            appearance=\"outline-primary\"\n            @click.native=\"handleClick\">\n            {{ ctaText }}\n          </KButton>\n        </slot>\n      </p>\n    </div>\n  </div>\n</template>\n\n<script>\nimport KButton from '@kongponents/kbutton'\nexport default {\n  name: 'KEmptyState',\n  components: { KButton },\n  props: {\n    ctaIsHidden: {\n      type: Boolean,\n      default: false\n    },\n    ctaText: {\n      type: String,\n      default: ''\n    },\n    handleClick: {\n      type: Function,\n      default: () => () => null\n    }\n  }\n}\n</script>\n\n<style scoped>\n  .empty-state-wrapper {\n  padding: 4rem 0;\n  text-align: center;\n  color: rgba(0,0,0,.70);\n  border: 1px solid rgba(151,151,151,.1);\n  border-radius: 3px;\n  background-color: rgba(0,0,0,.03);\n}\n.empty-state-wrapper h5 {\n  margin: 0 0 .75rem;\n  font-size: 18px;\n  font-weight: 500;\n  line-height: 21px;\n}\n.empty-state-wrapper p {\n  margin: 0 auto 1.5rem;\n  font-size: 1rem;\n  line-height: 1.375rem;\n  font-weight: 400;\n  max-width: 50%;\n}\n.empty-state-wrapper p:last-child {\n  margin: 0;\n  margin-left: auto;\n  margin-right: auto;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = "data-v-c7fb3f40";
  /* module identifier */
  const __vue_module_identifier__$3 = "data-v-c7fb3f40";
  /* functional template */
  const __vue_is_functional_template__$3 = false;

  
  normalizeComponent_1(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    undefined,
    server
  );

var collapseExpand = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiI+CiAgPHBhdGggZmlsbD0iI0EzQkJDQyIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMCAwaDJ2MTZIMFYwem0xNiA3djJIOXYzTDQgOGw1LTR2M2g3eiIvPgo8L3N2Zz4=';

var gateway = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9Ii00IC00IDMyIDMyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Ik0xNCAwaC00YTIgMiAwIDAgMC0yIDJ2MjBhMiAyIDAgMCAwIDIgMmg0YTIgMiAwIDAgMCAyLTJWMmEyIDIgMCAwIDAtMi0yem0wIDJ2MjBoLTRWMmg0em02IDB2MmgtM3YyaDN2Mmw0LTMtNC0zem0wIDE0djJoLTN2MmgzdjJsNC0zLTQtM3pNNyAxMUg0VjlsLTQgMyA0IDN2LTJoM3YtMnptMC03SDN2Mmg0VjR6bTAgMTRIM3YyaDR2LTJ6bS01IDBIMHYyaDJ2LTJ6bTE5LTdoLTR2Mmg0di0yem0zIDBoLTJ2Mmgydi0yek0yIDRIMHYyaDJWNHoiIGZpbGw9IiNBM0JCQ0MiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4=';

var gear = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+CiAgPHBhdGggZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuNTUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTExLjQ3NjUzNDQgMy4xMDkyNTIxbDEuNDczMjEzMS0xLjQ3MzIxMzEgMS40MTQyMTM1IDEuNDE0MjEzNS0xLjQ3MzIxMzEgMS40NzMyMTMxYy41MTQ4MTUuNzIyOTMyNi44NzMzNDY3IDEuNTY0ODc3OCAxLjAyNjI5MzcgMi40NzY1MzQ0SDE2djJoLTIuMDgyOTU4NGMtLjE1Mjk0Ny45MTE2NTY2LS41MTE0Nzg3IDEuNzUzNjAxOC0xLjAyNjI5MzcgMi40NzY1MzQ0bDEuNDczMjEzMSAxLjQ3MzIxMzEtMS40MTQyMTM1IDEuNDE0MjEzNS0xLjQ3MzIxMzEtMS40NzMyMTMxYy0uNzIyOTMyNi41MTQ4MTUtMS41NjQ4Nzc4Ljg3MzM0NjctMi40NzY1MzQ0IDEuMDI2MjkzN1YxNkg3di0yLjA4Mjk1ODRjLS45MTE2NTY2LS4xNTI5NDctMS43NTM2MDE4LS41MTE0Nzg3LTIuNDc2NTM0NC0xLjAyNjI5MzdMMy4wNTAyNTI1IDE0LjM2Mzk2MSAxLjYzNjAzOSAxMi45NDk3NDc1bDEuNDczMjEzMS0xLjQ3MzIxMzFDMi41OTQ0MzcxIDEwLjc1MzYwMTggMi4yMzU5MDU0IDkuOTExNjU2NiAyLjA4Mjk1ODQgOUgwVjdoMi4wODI5NTg0Yy4xNTI5NDctLjkxMTY1NjYuNTExNDc4Ny0xLjc1MzYwMTggMS4wMjYyOTM3LTIuNDc2NTM0NEwxLjYzNjAzOSAzLjA1MDI1MjUgMy4wNTAyNTI1IDEuNjM2MDM5bDEuNDczMjEzMSAxLjQ3MzIxMzFDNS4yNDYzOTgyIDIuNTk0NDM3MSA2LjA4ODM0MzQgMi4yMzU5MDU0IDcgMi4wODI5NTg0VjBoMnYyLjA4Mjk1ODRjLjkxMTY1NjYuMTUyOTQ3IDEuNzUzNjAxOC41MTE0Nzg3IDIuNDc2NTM0NCAxLjAyNjI5Mzd6TTggMTJjMi4yMDkxMzkgMCA0LTEuNzkwODYxIDQtNHMtMS43OTA4NjEtNC00LTQtNCAxLjc5MDg2MS00IDQgMS43OTA4NjEgNCA0IDR6IiBvcGFjaXR5PSIuNSIvPgo8L3N2Zz4=';

var info = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+CiAgPHBhdGggZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTYgOGMwLTQuNDE4Mjc4LTMuNTgxNzItOC04LThTMCAzLjU4MTcyMiAwIDhzMy41ODE3MiA4IDggOCA4LTMuNTgxNzIyIDgtOHptLTEuNSAwYzAgMy41ODk4NTA5LTIuOTEwMTUgNi41LTYuNSA2LjVTMS41IDExLjU4OTg1MDkgMS41IDggNC40MTAxNSAxLjUgOCAxLjVzNi41IDIuOTEwMTQ5MSA2LjUgNi41ek02IDEyaDR2LTFIOVY3SDZ2MWgxdjNINnYxem0xLTYuNTA0Njg0NEM3IDUuNzc0MDQ1MSA3LjIxNDA0IDYgNy41MDQ2OCA2aC45OTA2NEM4Ljc3NDA1IDYgOSA1Ljc4NTk2NSA5IDUuNDk1MzE1NnYtLjk5MDYzMTJDOSA0LjIyNTk1NDkgOC43ODU5NiA0IDguNDk1MzIgNGgtLjk5MDY0QzcuMjI1OTUgNCA3IDQuMjE0MDM1IDcgNC41MDQ2ODQ0di45OTA2MzEyeiIgb3BhY2l0eT0iLjYwMDAwMDAyIi8+Cjwvc3ZnPg==';

var portal = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9Ii01IC00IDMyIDMyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Ik0yIDI0aDE4YTIgMiAwIDAgMCAyLTJWMmEyIDIgMCAwIDAtMi0ySDJhMiAyIDAgMCAwLTIgMnYyMGEyIDIgMCAwIDAgMiAyem0wLTJWMmgxOHYyMEgyem0zLTdoMTJ2LTJINXYyem0wLTRoNVY5SDV2MnptNyAwaDVWOWgtNXYyek01IDdoMTJWNUg1djJ6bTAgMTJoNXYtMkg1djJ6bTcgMGg1di0yaC01djJ6IiBmaWxsPSIjQTNCQkNDIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+';

var security = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9Ii02IC00IDMyIDMyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Ik0xMCAyNEM1LjM5IDIyLjE1Ni45OTQgMTkuNTQuMTQ3IDE0aDIuMDJjLjY0MyAzLjU3NyAzLjE1IDUuODQ3IDcuODMyIDcuODM3IDQuNTc2LTEuOTU1IDcuMTUtNC4zMDcgNy44MjItNy44MzdoMi4wMjZjLS44NjkgNS40NS01LjMgOC4xODEtOS44NDcgMTB6TTIwIDhoLTJWNS44NjJjLTIuNzA0LS4zNzMtNS4zNzUtMS41MDEtOC0zLjM1OS0yLjYyNSAxLjg1OC01LjI5NiAyLjk4Ni04IDMuMzZWOEgwVjRjMy4zMzMgMCA2LjY2Ny0xLjMzMyAxMC00IDMuMzMzIDIuNjY3IDYuNjY3IDQgMTAgNHY0ek0wIDEwaDIwdjJIMHYtMnoiIGZpbGw9IiNBM0JCQ0MiIGZpbGwtcnVsZT0ibm9uemVybyIvPgo8L3N2Zz4=';

var workspaces = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiI+CiAgPHBhdGggZmlsbD0iI0EzQkJDQyIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMSAwaDVjLjU1MjI4IDAgMSAuNDQ3NzIgMSAxdjVjMCAuNTUyMjgtLjQ0NzcyIDEtMSAxSDFjLS41NTIyOCAwLTEtLjQ0NzcyLTEtMVYxYzAtLjU1MjI4LjQ0NzcyLTEgMS0xem0xIDJ2M2gzVjJIMnpNMSA5aDVjLjU1MjI4IDAgMSAuNDQ3NzIgMSAxdjVjMCAuNTUyMjgtLjQ0NzcyIDEtMSAxSDFjLS41NTIyOCAwLTEtLjQ0NzcyLTEtMXYtNWMwLS41NTIyOC40NDc3Mi0xIDEtMXptMSAydjNoM3YtM0gyem04LTExaDVjLjU1MjI4IDAgMSAuNDQ3NzIgMSAxdjVjMCAuNTUyMjgtLjQ0NzcyIDEtMSAxaC01Yy0uNTUyMjggMC0xLS40NDc3Mi0xLTFWMWMwLS41NTIyOC40NDc3Mi0xIDEtMXptMSAydjNoM1YyaC0zem0tMSA3aDVjLjU1MjI4IDAgMSAuNDQ3NzIgMSAxdjVjMCAuNTUyMjgtLjQ0NzcyIDEtMSAxaC01Yy0uNTUyMjggMC0xLS40NDc3Mi0xLTF2LTVjMC0uNTUyMjguNDQ3NzItMSAxLTF6bTEgMnYzaDN2LTNoLTN6Ii8+Cjwvc3ZnPg==';

var workspacesCollapsed = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9Ii00IC00IDMyIDMyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Ik0yIDBoNmEyIDIgMCAwIDEgMiAydjZhMiAyIDAgMCAxLTIgMkgyYTIgMiAwIDAgMS0yLTJWMmEyIDIgMCAwIDEgMi0yem0wIDJ2Nmg2VjJIMnptMCAxMGg2YTIgMiAwIDAgMSAyIDJ2NmEyIDIgMCAwIDEtMiAySDJhMiAyIDAgMCAxLTItMnYtNmEyIDIgMCAwIDEgMi0yem0wIDJ2Nmg2di02SDJ6TTE0IDBoNmEyIDIgMCAwIDEgMiAydjZhMiAyIDAgMCAxLTIgMmgtNmEyIDIgMCAwIDEtMi0yVjJhMiAyIDAgMCAxIDItMnptMCAydjZoNlYyaC02em0xIDEwbDUgNS01IDVWMTJ6IiBmaWxsPSIjQTNCQkNDIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+';

var vitals = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9Ii00IC00IDMyIDMyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Ik0xOS41OTMgNS40OTNsLTIuODQyIDIuODQyQTYuMDAyIDYuMDAyIDAgMCAxIDEzIDE3LjkxN2wtLjAwMSA0LjAzNGM1LjA1My0uNTAyIDktNC43NjYgOS05Ljk1MWE5Ljk2IDkuOTYgMCAwIDAtMi40MDctNi41MDd6TTE4LjE0NiA0LjExQTkuOTUgOS45NSAwIDAgMCAxMyAyLjA1djQuMDM0Yy44My4xNCAxLjYwNC40NSAyLjI4MS44OTNsMi44NjUtMi44NjV6TTIuMDUgMTNBMTAuMDAzIDEwLjAwMyAwIDAgMCAxMSAyMS45NXYtNC4wMzNBNi4wMDUgNi4wMDUgMCAwIDEgNi4wODMgMTNIMi4wNDl6bTAtMmg0LjAzNEE2LjAwNSA2LjAwNSAwIDAgMSAxMSA2LjA4M1YyLjA0OUExMC4wMDMgMTAuMDAzIDAgMCAwIDIuMDUgMTF6TTEyIDI0QzUuMzczIDI0IDAgMTguNjI3IDAgMTJTNS4zNzMgMCAxMiAwczEyIDUuMzczIDEyIDEyLTUuMzczIDEyLTEyIDEyem0wLThhNCA0IDAgMSAwIDAtOCA0IDQgMCAwIDAgMCA4eiIgZmlsbD0iI0EzQkJDQyIgZmlsbC1ydWxlPSJldmVub2RkIi8+Cjwvc3ZnPg==';

var back = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSI4Ij4KICA8cGF0aCBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4yNSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTYgNUg1djNMMCA0bDMuMzcxLTIuNjk3TDUgMHYzaDExeiIvPgo8L3N2Zz4=';

var search = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCI+CiAgPHBhdGggZmlsbD0iI0I5QkFCQiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNOS4xMjM3MzQxIDExLjEyMzczNDFDOC4yMTM4Mzc3IDExLjY3OTY0ODMgNy4xNDQzMjk5IDEyIDYgMTJjLTMuMzEzNzA4NSAwLTYtMi42ODYyOTE1LTYtNnMyLjY4NjI5MTUtNiA2LTYgNiAyLjY4NjI5MTUgNiA2YzAgMS4xNDQzMjk5LS4zMjAzNTE3IDIuMjEzODM3Ny0uODc2MjY1OSAzLjEyMzczNDFMMTMuNSAxMS41Yy41NzcyMDQuNTc3MjA0LjU4Mjk5MjYgMS40MTcwMDc0IDAgMi0uNTc4MTY0Ny41NzgxNjQ3LTEuNDI1Njg5Ny41NzQzMTAzLTIgMGwtMi4zNzYyNjU5LTIuMzc2MjY1OXpNNiAxMGMyLjIwOTEzOSAwIDQtMS43OTA4NjEgNC00UzguMjA5MTM5IDIgNiAyIDIgMy43OTA4NjEgMiA2czEuNzkwODYxIDQgNCA0eiIvPgo8L3N2Zz4=';

var trash = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNCAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMyAzVjJjMC0xLjEwNDU2OTUuODk1NDMwNS0yIDItMmg0YzEuMTA0NTY5NSAwIDIgLjg5NTQzMDUgMiAydjFoMmMuNTUyMjg0NyAwIDEgLjQ0NzcxNTMgMSAxdjFIMFY0YzAtLjU1MjI4NDcuNDQ3NzE1Mi0xIDEtMWgyem0yIDBWMmg0djFINXpNMSA2aDJ2OGg4VjZoMnY4YzAgMS4xMDQ1Njk1LS44OTU0MzA1IDItMiAySDNjLTEuMTA0NTY5NSAwLTItLjg5NTQzMDUtMi0yVjZ6bTUgMHY3Yy0uNTUyMjg0NyAwLTEtLjQ0NzcxNTMtMS0xVjdjMC0uNTUyMjg0Ny40NDc3MTUzLTEgMS0xem0yIDBjLjU1MjI4NDcgMCAxIC40NDc3MTUzIDEgMXY1YzAgLjU1MjI4NDctLjQ0NzcxNTMgMS0xIDFWNnoiIGZpbGw9IiNCRkJGQkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4=';

var dashboard = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyMSI+CiAgPHBhdGggZmlsbD0iI0E0QkJDQiIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTMgMTBsMy0zYy42OTAyMzM2LS43MzcxMzI2NiAxLjQ0MjkwMzItMS4yNjA1ODIxOCAyLTEgLjI2MDU4MjIuNTU3MDk2ODItLjI2Mjg2NzMgMS4zMDk3NjYzNi0xIDJsLTMgM2MuMTUzMTI0OC40NzA3NTg2LjE4NzU5NjEuNjg0NDU0NyAwIDEgLjE4NzU5NjEgMS4wNjI1NzQ3LS43NDk4MjkyIDItMiAyLTEuMDYyNTc0NyAwLTItLjkzNzQyNTMtMi0yIDAtMS4yNTAxNzA4LjkzNzQyNTMtMi4xODc1OTYxIDItMiAuMzE1NTQ1My0uMTg3NTk2MS41MjkyNDE0LS4xNTMxMjQ4IDEgMHptOCAxMGMtLjA4Mjc2LjA2MzQ1MTUtLjcxMzE4MzYuMTIyMzA2Mi0xIDAtLjU2MzQ1MTUtLjU4Mjc2LS42MjIzMDYyLTEuMjEzMTgzNiAwLTIgMS4xOTYzNDIyLTEuNDA2MzY1NiAyLTMuNjIxMzc1OCAyLTYgMC01LjUyMjg0NzUtNC40NzcxNTI1LTEwLTEwLTEwUzIgNi40NzcxNTI1IDIgMTJjMCAyLjM4NDgwNjQuODAwOTk4NjUgNC41OTM5ODY1IDIgNiAuNjIyMDk0ODcuNzg1NzA2OS41NjM4NjM1MyAxLjQxNjE4ODQgMCAyLS4yODU3MDY4OC4xMjIwOTQ5LS45MTYxODg0NS4wNjM4NjM1LTEgMC0yLjAzNTEyNTkzLTIuNDg2MzEzOS0zLTUuMTQ3NDY3Ny0zLThDMCA1LjM3MjU4MyA1LjM3MjU4MyAwIDEyIDBzMTIgNS4zNzI1ODMgMTIgMTJjMCAyLjg0NjE3ODYtLjk2NzM3NyA1LjUxMjQyNTQtMyA4ek05IDE2aDZjLjU1MjI4NDcgMCAxIC40NDc3MTUzIDEgMXMtLjQ0NzcxNTMgMS0xIDFIOWMtLjU1MjI4NDc1IDAtMS0uNDQ3NzE1My0xLTFzLjQ0NzcxNTI1LTEgMS0xeiIvPgo8L3N2Zz4=';

var icons = {
  back,
  collapseExpand,
  dashboard,
  gateway,
  gear,
  info,
  portal,
  search,
  security,
  trash,
  workspaces,
  workspacesCollapsed,
  vitals
};

//
const iconNames = Object.keys(icons);

var script$4 = {
  name: 'KIcon',
  props: {
    /**
     * Checks for valid icon name<br>
     * 'back' | 'collapseExpand' | 'gateway' | 'gear' | 'info' | 'portal' | 'search' | 'security' | 'workspaces' | 'workspacesCollapsed' | 'vitals'
     */
    icon: {
      type: String,
      default: '',
      validator: function (value) {
        return iconNames.indexOf(value) !== -1
      },
      required: true
    },
    /**
     * Optional - Overrides default height and width with equal value
     */
    size: {
      type: String,
      default: '24'
    },
    /**
     * Optional - Sets Fill color
     */
    color: {
      type: String,
      default: null
    },
    /**
     * Optional - Defines viewbox dimensions
     */
    viewBox: {
      type: String,
      default: '0 0 24 24'
    }
  },

  computed: {
    iconSVG () {
      return icons[this.icon]
    },
    doc () {
      return new DOMParser().parseFromString(this.iconSVG, 'image/svg+xml')
    },
    svg () {
      return this.doc.getElementsByTagName('svg')[0]
    },
    path () {
      return this.doc.getElementsByTagName('path')[0] || console.warn('(KIcon) Warning: SVG Path not found')
    },
    attributes () {
      if (this.path) {
        let attrs = Array.prototype.slice.call(this.path.attributes);
        let attributes = {};

        attrs.forEach((attr) => {
          const { value, name } = attr;

          attributes[name] = value;
        });

        return attributes
      }
    },
    width () {
      return this.svg.getAttribute('width')
    },
    height () {
      return this.svg.getAttribute('height')
    },
    setSize () {
      return this.size || this.svg.getAttribute('width')
    },
    fill () {
      return this.color || this.path.getAttribute('fill')
    },
    viewbox () {
      return this.viewBox || this.svg.getAttribute('viewBox')
    }
  }
};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "svg",
    {
      staticClass: "kong-icon",
      attrs: {
        height: _vm.setSize || _vm.height,
        width: _vm.setSize || _vm.width,
        viewBox: _vm.viewbox,
        role: "img"
      }
    },
    [
      _vm._ssrNode(
        "<title>" +
          _vm._ssrEscape(_vm._s(_vm.icon)) +
          "</title> <path" +
          _vm._ssrAttr("fill", _vm.fill) +
          _vm._ssrAttrs(_vm.attributes) +
          "></path>"
      )
    ]
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = "data-v-4518e97f";
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  normalizeComponent_1(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//

var script$5 = {
  name: 'KInput',
  props: {
    /**
     * Pass whether or not the input should be disabled
     */
    inputAttributes: {
      type: Object,
      default: function () {
        return {
          class: ''
        }
      }
    }
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners
      }
    }
  }
};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "input",
    _vm._g(
      _vm._b(
        {
          class: [_vm.inputAttributes["class"]],
          domProps: { value: _vm.value }
        },
        "input",
        _vm.inputAttributes,
        false
      ),
      _vm.listeners
    ),
    []
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = function (inject) {
    if (!inject) return
    inject("data-v-623a9da1_0", { source: "\ninput[data-v-623a9da1] {\n  display: block;\n  width: 100%;\n  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */\n  -moz-box-sizing: border-box; /* Firefox, other Gecko */\n  box-sizing: border-box; /* Opera/IE 8+ */\n  padding: 8px 12px;\n  font-size: 15px;\n  color: hsla(0, 0%, 0%, 0.7);\n  border-color: hsla(0, 0%, 0%, 0.12);\n  background-color: #ffffff;\n  border-radius: 3px;\n  border-width: 1px;\n}\ninput[data-v-623a9da1]:focus {\n  outline: none !important;\n  border: 1px solid hsla(205, 100%, 75%, 1);\n}\ninput[data-v-623a9da1]:disabled {\n  cursor: not-allowed;\n  background-color: #f7f7f7;\n  opacity: 0.75;\n}\ninput.input-error[data-v-623a9da1] {\n  outline: none !important;\n  border: 1px solid hsla(1, 100%, 75%, 1);\n}\n", map: {"version":3,"sources":["/Users/tong/Documents/repos/kongponents/packages/KInput/KInput.vue"],"names":[],"mappings":";AAmCA;EACA,cAAA;EACA,WAAA;EACA,8BAAA,EAAA,gCAAA;EACA,2BAAA,EAAA,yBAAA;EACA,sBAAA,EAAA,gBAAA;EACA,iBAAA;EACA,eAAA;EACA,2BAAA;EACA,mCAAA;EACA,yBAAA;EACA,kBAAA;EACA,iBAAA;AACA;AAEA;EACA,wBAAA;EACA,yCAAA;AACA;AAEA;EACA,mBAAA;EACA,yBAAA;EACA,aAAA;AACA;AAEA;EACA,wBAAA;EACA,uCAAA;AACA","file":"KInput.vue","sourcesContent":["<template>\n  <input\n    v-bind=\"inputAttributes\"\n    :value=\"value\"\n    :class=\"[inputAttributes['class']]\"\n    v-on=\"listeners\">\n</template>\n\n<script>\nexport default {\n  name: 'KInput',\n  props: {\n    /**\n     * Pass whether or not the input should be disabled\n     */\n    inputAttributes: {\n      type: Object,\n      default: function () {\n        return {\n          class: ''\n        }\n      }\n    }\n  },\n  computed: {\n    listeners () {\n      return {\n        ...this.$listeners\n      }\n    }\n  }\n}\n</script>\n\n<style scoped>\ninput {\n  display: block;\n  width: 100%;\n  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */\n  -moz-box-sizing: border-box; /* Firefox, other Gecko */\n  box-sizing: border-box; /* Opera/IE 8+ */\n  padding: 8px 12px;\n  font-size: 15px;\n  color: hsla(0, 0%, 0%, 0.7);\n  border-color: hsla(0, 0%, 0%, 0.12);\n  background-color: #ffffff;\n  border-radius: 3px;\n  border-width: 1px;\n}\n\ninput:focus {\n  outline: none !important;\n  border: 1px solid hsla(205, 100%, 75%, 1);\n}\n\ninput:disabled {\n  cursor: not-allowed;\n  background-color: #f7f7f7;\n  opacity: 0.75;\n}\n\ninput.input-error {\n  outline: none !important;\n  border: 1px solid hsla(1, 100%, 75%, 1);\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$5 = "data-v-623a9da1";
  /* module identifier */
  const __vue_module_identifier__$5 = "data-v-623a9da1";
  /* functional template */
  const __vue_is_functional_template__$5 = false;

  
  normalizeComponent_1(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    undefined,
    server
  );

//
//
//
//
//
//
//
//
//
//

var script$6 = {
  name: 'KButton',
  props: {
    /**
     * Adds border radius
     */
    isRounded: {
      type: Boolean,
      default: true
    },
    /**
      * Base styling of the button<br>
      * One of ['primary, outline-primary, secondary, outline-secondary, danger', 'outline-danger, btn-link', btn-link-danger ]
      */
    appearance: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return [
          'primary',
          'danger',
          'secondary',
          'outline-primary',
          'outline-danger',
          'btn-link',
          'btn-link-danger'
        ].indexOf(value) !== -1
      }
    },
    /**
      * Add custom attributes or definitions
      */
    buttonAttributes: {
      type: Object,
      default: function () {
        return {
          class: ''
        }
      }
    },
    /**
      * Click handler
      */
    handleClick: {
      type: Function,
      default: () => () => null
    }
  }
};

/* script */
const __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "button",
    _vm._b(
      {
        staticClass: "button",
        class: [
          { rounded: _vm.isRounded },
          _vm.appearance,
          _vm.buttonAttributes["class"]
        ],
        on: { click: _vm.handleClick }
      },
      "button",
      _vm.buttonAttributes,
      false
    ),
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = function (inject) {
    if (!inject) return
    inject("data-v-8c04eb5c_0", { source: "\n.button[data-v-8c04eb5c] {\n  font-family: 'Roboto', sans-serif;\n  font-size: 1rem;\n  line-height: 1.25;\n  border-radius: 3px;\n  border: 1px solid transparent;\n  padding: .5rem .75rem;\n  transition: all .2s ease-in-out;\n  cursor: pointer;\n}\n.button.primary[data-v-8c04eb5c] {\n  font-weight: 500;\n  color: white;\n  background-color: #0095ff;\n  border-color: transparent !important;\n}\n.button.primary[data-v-8c04eb5c]:hover {\n  background-color: #4db5ff;\n}\n.button.danger[data-v-8c04eb5c] {\n  font-weight: 500;\n  background-color: #f2110d;\n  color: white;\n  border-color: transparent !important;\n}\n.button.danger[data-v-8c04eb5c]:hover {\n  background-color: #f65855;\n}\n.button.danger[data-v-8c04eb5c]:active {\n  background-color: #aa0c09;\n}\n.button.secondary[data-v-8c04eb5c] {\n  background-color: #f5f5f5;\n  color: rgba(0, 0, 0, 0.7);\n  border-color: rgba(0, 0, 0, 0.12);\n}\n.button.secondary[data-v-8c04eb5c]:hover {\n  color: rgba(0, 0, 0, 0.85);\n  border-color: rgba(0, 0, 0, 0.25);\n}\n.button.secondary[data-v-8c04eb5c]:active {\n  color: rgba(0, 0, 0, 0.7);\n  background-color: gainsboro;\n}\n.button.outline-primary[data-v-8c04eb5c] {\n  background-color: rgba(255,255,255,.5);\n  color: #0077cc;\n  border-color: #80caff;\n}\n.button.outline-primary[data-v-8c04eb5c]:hover {\n  font-weight: 500;\n  background-color: #4db5ff;\n  color: #ffffff;\n  border-color: transparent;\n}\n.button.outline-primary[data-v-8c04eb5c]:active {\n  background-color: #0068b3;\n}\n.button.outline-primary[data-v-8c04eb5c]:active {\n  background-color: #0068b3;\n  color: #ffffff;\n  border-color: transparent;\n}\n.button.outline-danger[data-v-8c04eb5c] {\n  font-weight: 500;\n  background-color: transparent;\n  color: #f2110d;\n  border-color: #ff8280;\n}\n.button.outline-danger[data-v-8c04eb5c]:hover {\n  background-color: #f65855;\n  color: #ffffff;\n  border-color: transparent;\n}\n.button.outline-danger[data-v-8c04eb5c]:active {\n  background-color: #aa0c09;\n  color: #ffffff;\n  border-color: transparent;\n}\n.button.btn-link[data-v-8c04eb5c] {\n  background-color: transparent;\n  color: #0077cc;\n}\n.button.btn-link[data-v-8c04eb5c]:hover {\n  color: #0077cc;\n}\n.button.btn-link[data-v-8c04eb5c]:active {\n  color: #003c66;\n}\n.button.btn-link-danger[data-v-8c04eb5c] {\n  background-color: transparent;\n  color: #f2110d;\n}\n.button.btn-link-danger[data-v-8c04eb5c]:hover {\n  color: #f2110d;\n  text-decoration: underline;\n}\n.button.btn-link-danger[data-v-8c04eb5c]:active {\n  color: #910a08;\n}\n.rounded[data-v-8c04eb5c] {\n  border-radius: 3px;\n}\n", map: {"version":3,"sources":["/Users/tong/Documents/repos/kongponents/packages/KModal/node_modules/@kongponents/kbutton/KButton.vue"],"names":[],"mappings":";AA+DA;EACA,iCAAA;EACA,eAAA;EACA,iBAAA;EACA,kBAAA;EACA,6BAAA;EACA,qBAAA;EACA,+BAAA;EACA,eAAA;AACA;AAEA;EACA,gBAAA;EACA,YAAA;EACA,yBAAA;EACA,oCAAA;AACA;AAEA;EACA,yBAAA;AACA;AAEA;EACA,gBAAA;EACA,yBAAA;EACA,YAAA;EACA,oCAAA;AACA;AAEA;EACA,yBAAA;AACA;AAEA;EACA,yBAAA;AACA;AAEA;EACA,yBAAA;EACA,yBAAA;EACA,iCAAA;AACA;AAEA;EACA,0BAAA;EACA,iCAAA;AACA;AAEA;EACA,yBAAA;EACA,2BAAA;AACA;AAEA;EACA,sCAAA;EACA,cAAA;EACA,qBAAA;AACA;AAEA;EACA,gBAAA;EACA,yBAAA;EACA,cAAA;EACA,yBAAA;AACA;AAEA;EACA,yBAAA;AACA;AAEA;EACA,yBAAA;EACA,cAAA;EACA,yBAAA;AACA;AAEA;EACA,gBAAA;EACA,6BAAA;EACA,cAAA;EACA,qBAAA;AACA;AAEA;EACA,yBAAA;EACA,cAAA;EACA,yBAAA;AACA;AAEA;EACA,yBAAA;EACA,cAAA;EACA,yBAAA;AACA;AAEA;EACA,6BAAA;EACA,cAAA;AACA;AAEA;EACA,cAAA;AACA;AAEA;EACA,cAAA;AACA;AAEA;EACA,6BAAA;EACA,cAAA;AACA;AAEA;EACA,cAAA;EACA,0BAAA;AACA;AAEA;EACA,cAAA;AACA;AACA;EACA,kBAAA;AACA","file":"KButton.vue","sourcesContent":["<template>\n  <button\n    v-bind=\"buttonAttributes\"\n    :class=\"[{rounded: isRounded}, appearance, buttonAttributes['class']]\"\n    class=\"button\"\n    @click=\"handleClick\">\n    <slot/>\n  </button>\n</template>\n\n<script>\nexport default {\n  name: 'KButton',\n  props: {\n    /**\n     * Adds border radius\n     */\n    isRounded: {\n      type: Boolean,\n      default: true\n    },\n    /**\n      * Base styling of the button<br>\n      * One of ['primary, outline-primary, secondary, outline-secondary, danger', 'outline-danger, btn-link', btn-link-danger ]\n      */\n    appearance: {\n      type: String,\n      default: 'primary',\n      validator: function (value) {\n        return [\n          'primary',\n          'danger',\n          'secondary',\n          'outline-primary',\n          'outline-danger',\n          'btn-link',\n          'btn-link-danger'\n        ].indexOf(value) !== -1\n      }\n    },\n    /**\n      * Add custom attributes or definitions\n      */\n    buttonAttributes: {\n      type: Object,\n      default: function () {\n        return {\n          class: ''\n        }\n      }\n    },\n    /**\n      * Click handler\n      */\n    handleClick: {\n      type: Function,\n      default: () => () => null\n    }\n  }\n}\n</script>\n\n<style scoped>\n  .button {\n    font-family: 'Roboto', sans-serif;\n    font-size: 1rem;\n    line-height: 1.25;\n    border-radius: 3px;\n    border: 1px solid transparent;\n    padding: .5rem .75rem;\n    transition: all .2s ease-in-out;\n    cursor: pointer;\n  }\n\n  .button.primary {\n    font-weight: 500;\n    color: white;\n    background-color: #0095ff;\n    border-color: transparent !important;\n  }\n\n  .button.primary:hover {\n    background-color: #4db5ff;\n  }\n\n  .button.danger {\n    font-weight: 500;\n    background-color: #f2110d;\n    color: white;\n    border-color: transparent !important;\n  }\n\n  .button.danger:hover {\n    background-color: #f65855;\n  }\n\n  .button.danger:active {\n    background-color: #aa0c09;\n  }\n\n  .button.secondary {\n    background-color: #f5f5f5;\n    color: rgba(0, 0, 0, 0.7);\n    border-color: rgba(0, 0, 0, 0.12);\n  }\n\n  .button.secondary:hover {\n    color: rgba(0, 0, 0, 0.85);\n    border-color: rgba(0, 0, 0, 0.25);\n  }\n\n  .button.secondary:active {\n    color: rgba(0, 0, 0, 0.7);\n    background-color: gainsboro;\n  }\n\n  .button.outline-primary {\n    background-color: rgba(255,255,255,.5);\n    color: #0077cc;\n    border-color: #80caff;\n  }\n\n  .button.outline-primary:hover {\n    font-weight: 500;\n    background-color: #4db5ff;\n    color: #ffffff;\n    border-color: transparent;\n  }\n\n  .button.outline-primary:active {\n    background-color: #0068b3;\n  }\n\n  .button.outline-primary:active {\n    background-color: #0068b3;\n    color: #ffffff;\n    border-color: transparent;\n  }\n\n  .button.outline-danger {\n    font-weight: 500;\n    background-color: transparent;\n    color: #f2110d;\n    border-color: #ff8280;\n  }\n\n  .button.outline-danger:hover {\n    background-color: #f65855;\n    color: #ffffff;\n    border-color: transparent;\n  }\n\n  .button.outline-danger:active {\n    background-color: #aa0c09;\n    color: #ffffff;\n    border-color: transparent;\n  }\n\n  .button.btn-link {\n    background-color: transparent;\n    color: #0077cc;\n  }\n\n  .button.btn-link:hover {\n    color: #0077cc;\n  }\n\n  .button.btn-link:active {\n    color: #003c66;\n  }\n\n  .button.btn-link-danger {\n    background-color: transparent;\n    color: #f2110d;\n  }\n\n  .button.btn-link-danger:hover {\n    color: #f2110d;\n    text-decoration: underline;\n  }\n\n  .button.btn-link-danger:active {\n    color: #910a08;\n  }\n  .rounded {\n    border-radius: 3px;\n  }\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$6 = "data-v-8c04eb5c";
  /* module identifier */
  const __vue_module_identifier__$6 = "data-v-8c04eb5c";
  /* functional template */
  const __vue_is_functional_template__$6 = false;

  
  var KButton$1 = normalizeComponent_1(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    undefined,
    server
  );

//

var script$7 = {
  name: 'KModal',
  components: { KButton: KButton$1 },

  props: {
    /**
      *  Pass whether or not the modal should be visible
      */
    isVisible: {
      type: Boolean,
      default: false
    }
  },

  mounted: function () {
    const that = this;

    document.addEventListener('keydown', function (e) {
      if (that.isVisible && e.keyCode === 27) {
        that.close();
      }
    });
  },

  methods: {
    close () {
      this.$emit('close');
    },
    proceed () {
      this.$emit('proceed');
    }
  }
};

/* script */
const __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.isVisible
    ? _c(
        "div",
        {
          staticClass: "k-modal",
          attrs: {
            "aria-hidden": !_vm.isVisible ? "true" : "false",
            role: "dialog"
          }
        },
        [
          _vm._ssrNode('<div class="modal-backdrop">', "</div>", [
            _vm._ssrNode('<div class="modal-dialog">', "</div>", [
              _vm._ssrNode(
                '<div class="modal-content">',
                "</div>",
                [
                  _vm._ssrNode(
                    '<div class="modal-header">',
                    "</div>",
                    [_vm._t("header-content", [_vm._v("Modal Title")])],
                    2
                  ),
                  _vm._ssrNode(" "),
                  _vm._ssrNode(
                    '<div class="modal-body">',
                    "</div>",
                    [_vm._t("body-content", [_vm._v("Modal Body")])],
                    2
                  ),
                  _vm._ssrNode(" "),
                  _vm._ssrNode(
                    '<div class="modal-footer">',
                    "</div>",
                    [
                      _vm._t("footer-content"),
                      _vm._ssrNode(" "),
                      _vm._t("footer-actions", [
                        _c(
                          "KButton",
                          {
                            attrs: { appearance: "primary" },
                            on: { click: _vm.proceed }
                          },
                          [_vm._v("Proceed")]
                        )
                      ]),
                      _vm._ssrNode(" "),
                      _vm._t("footer-dismiss", [
                        _c(
                          "KButton",
                          {
                            attrs: { appearance: "secondary" },
                            on: { click: _vm.close }
                          },
                          [_vm._v("Cancel")]
                        )
                      ])
                    ],
                    2
                  )
                ],
                2
              )
            ])
          ])
        ]
      )
    : _vm._e()
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  const __vue_inject_styles__$7 = function (inject) {
    if (!inject) return
    inject("data-v-5eddeb0b_0", { source: "\n.modal-backdrop[data-v-5eddeb0b] {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 1100;\n}\n.modal-dialog[data-v-5eddeb0b] {\n  position: relative;\n  width: auto;\n  max-width: 500px;\n  margin: 50px auto;\n  padding: 1rem;\n  border-radius: 3px;\n  background: #fff;\n  z-index: 9999;\n}\n.modal-content[data-v-5eddeb0b] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  background-color: #fff;\n  border: 0;\n  border-radius: .3rem;\n  outline: 0;\n}\n.modal-header[data-v-5eddeb0b] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 15px 0;\n  font-size: 18px;\n  font-weight: 500;\n  margin: 0;\n  border-bottom: 1px solid #eceeef;\n}\n.modal-body[data-v-5eddeb0b] {\n  position: relative;\n  flex: 1 1 auto;\n  padding: 15px 0;\n}\n.modal-footer[data-v-5eddeb0b] {\n  display: flex;\n  align-items: center;\n  padding: 15px 0;\n  border-top: 1px solid #eceeef;\n}\n.modal-footer .button[data-v-5eddeb0b]:last-child {\n  margin-left: 13px;\n}\n", map: {"version":3,"sources":["/Users/tong/Documents/repos/kongponents/packages/KModal/KModal.vue"],"names":[],"mappings":";AAkFA;EACA,eAAA;EACA,MAAA;EACA,SAAA;EACA,OAAA;EACA,QAAA;EACA,oCAAA;EACA,aAAA;AACA;AAEA;EACA,kBAAA;EACA,WAAA;EACA,gBAAA;EACA,iBAAA;EACA,aAAA;EACA,kBAAA;EACA,gBAAA;EACA,aAAA;AACA;AAEA;EACA,kBAAA;EACA,aAAA;EACA,sBAAA;EACA,sBAAA;EACA,SAAA;EACA,oBAAA;EACA,UAAA;AACA;AAEA;EACA,aAAA;EACA,mBAAA;EACA,8BAAA;EACA,eAAA;EACA,eAAA;EACA,gBAAA;EACA,SAAA;EACA,gCAAA;AACA;AAEA;EACA,kBAAA;EACA,cAAA;EACA,eAAA;AACA;AAEA;EACA,aAAA;EACA,mBAAA;EACA,eAAA;EACA,6BAAA;AACA;AAEA;EACA,iBAAA;AACA","file":"KModal.vue","sourcesContent":["<template>\n  <div\n    v-if=\"isVisible\"\n    :aria-hidden=\"!isVisible ? 'true' : 'false'\"\n    class=\"k-modal\"\n    role=\"dialog\">\n    <div\n      class=\"modal-backdrop\"\n      @click=\"close\">\n      <div\n        class=\"modal-dialog\"\n        @click.stop>\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <!-- @slot Use this slot to add a Modal Header/Title -->\n            <slot name=\"header-content\">Modal Title</slot>\n          </div>\n          <div class=\"modal-body\">\n            <!-- @slot Use this slot to fill the body of the Modal -->\n            <slot name=\"body-content\">Modal Body</slot>\n          </div>\n          <div class=\"modal-footer\">\n            <!-- @slot Use this slot to place items in the footer -->\n            <slot name=\"footer-content\"/>\n            <!-- @slot Use this slot to place action/proceed button -->\n            <slot name=\"footer-actions\">\n              <KButton\n                appearance=\"primary\"\n                @click=\"proceed\">Proceed</KButton>\n            </slot>\n            <!-- @slot Use this slot to override cancel/close button -->\n            <slot name=\"footer-dismiss\">\n              <KButton\n                appearance=\"secondary\"\n                @click=\"close\">Cancel</KButton>\n            </slot>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nimport KButton from '@kongponents/kbutton'\n\nexport default {\n  name: 'KModal',\n  components: { KButton },\n\n  props: {\n    /**\n      *  Pass whether or not the modal should be visible\n      */\n    isVisible: {\n      type: Boolean,\n      default: false\n    }\n  },\n\n  mounted: function () {\n    const that = this\n\n    document.addEventListener('keydown', function (e) {\n      if (that.isVisible && e.keyCode === 27) {\n        that.close()\n      }\n    })\n  },\n\n  methods: {\n    close () {\n      this.$emit('close')\n    },\n    proceed () {\n      this.$emit('proceed')\n    }\n  }\n}\n</script>\n\n<style scoped>\n  .modal-backdrop {\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background-color: rgba(0, 0, 0, 0.5);\n    z-index: 1100;\n  }\n\n  .modal-dialog {\n    position: relative;\n    width: auto;\n    max-width: 500px;\n    margin: 50px auto;\n    padding: 1rem;\n    border-radius: 3px;\n    background: #fff;\n    z-index: 9999;\n  }\n\n  .modal-content {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    background-color: #fff;\n    border: 0;\n    border-radius: .3rem;\n    outline: 0;\n  }\n\n  .modal-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 15px 0;\n    font-size: 18px;\n    font-weight: 500;\n    margin: 0;\n    border-bottom: 1px solid #eceeef;\n  }\n\n  .modal-body {\n    position: relative;\n    flex: 1 1 auto;\n    padding: 15px 0;\n  }\n\n  .modal-footer {\n    display: flex;\n    align-items: center;\n    padding: 15px 0;\n    border-top: 1px solid #eceeef;\n  }\n\n  .modal-footer .button:last-child {\n    margin-left: 13px;\n  }\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$7 = "data-v-5eddeb0b";
  /* module identifier */
  const __vue_module_identifier__$7 = "data-v-5eddeb0b";
  /* functional template */
  const __vue_is_functional_template__$7 = false;

  
  normalizeComponent_1(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    undefined,
    server
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$8 = {
  name: 'KPop',
  props: {
    /**
     * Message to show in popover
     */
    message: {
      type: String,
      required: true
    },
    /**
     * Define which side the popover displays<br>
     * 'top' | 'bottom' | 'left' | 'right'
     */
    position: {
      type: String,
      default: 'top',
      validator: function (value) {
        return [
          'top',
          'bottom',
          'left',
          'right'
        ].indexOf(value) !== -1
      }
    },
    /**
     * Sets the text alignment of the popover<br>
     * 'left' | 'center' | 'right'
     */
    alignment: {
      type: String,
      default: 'left',
      validator: function (value) {
        return [
          'left',
          'right',
          'center'
        ].indexOf(value) !== -1
      }
    }
  },

  data () {
    return {
      hovering: false
    }
  },

  computed: {
    positionClass () {
      return `k-popover-${this.position}`
    }
  },

  methods: {
    isHovering (isHovering) {
      this.hovering = isHovering;
    }
  }
};

/* script */
const __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "k-popover",
      class: _vm.positionClass,
      style: { "text-align": _vm.alignment },
      attrs: {
        "aria-hidden": _vm.isHovering ? "true" : "false",
        "data-message": _vm.message,
        role: "tooltip"
      },
      on: {
        mouseout: function($event) {
          _vm.isHovering(false);
        },
        mouseover: function($event) {
          _vm.isHovering(true);
        }
      }
    },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  const __vue_inject_styles__$8 = function (inject) {
    if (!inject) return
    inject("data-v-0bd74304_0", { source: "\n.k-popover {\n  display: inline-block;\n  position: relative;\n  cursor: pointer;\n}\n.k-popover:before,\n.k-popover:after {\n  position: absolute;\n  visibility: hidden;\n  opacity: 0;\n  pointer-events: none;\n  z-index: 1090;\n  transition: all 0.15s cubic-bezier(0.5, 1, 0.25, 1);\n}\n.k-popover:before {\n  min-width: 275px;\n  padding: .5rem .75rem;\n  font-size: .875rem;\n  font-weight: normal;\n  border-radius: 3px;\n  background: #fff;\n  box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.15);\n  content: attr(data-message);\n}\n.k-popover:after {\n  width: 0;\n  border: 8px solid transparent;\n  content: \"\";\n}\n.k-popover:hover:before,\n.k-popover:hover:after {\n  visibility: visible;\n  opacity: 1;\n}\n\n  /* position styling */\n.k-popover.k-popover-top:before,\n.k-popover.k-popover-top:after {\n  bottom: 100%;\n  transform: translateX(-50%);\n}\n.k-popover.k-popover-top:before {\n  left: 100%;\n  margin-bottom: 5px;\n}\n.k-popover.k-popover-top:after {\n  left: 50%;\n  border-top: 8px solid #fff;\n  border-bottom: none;\n  margin-bottom: -3px;\n}\n.k-popover.k-popover-top:hover:before,\n.k-popover.k-popover-top:hover:after {\n  transform: translateX(-50%) translateY(-5px);\n}\n.k-popover.k-popover-right:before,\n.k-popover.k-popover-right:after {\n  top: 50%;\n  left: 100%;\n  transform: translateY(-50%)\n}\n.k-popover.k-popover-right:before {\n  margin-left: 5px;\n}\n.k-popover.k-popover-right:after {\n  border-right: 8px solid #fff;\n  border-left: none;\n  margin-left: -3px;\n}\n.k-popover.k-popover-right:hover:before,\n.k-popover.k-popover-right:hover:after {\n  transform: translateX(5px) translateY(-50%);\n}\n.k-popover.k-popover-bottom:before,\n.k-popover.k-popover-bottom:after {\n  top: 100%;\n  transform: translateX(-50%);\n}\n.k-popover.k-popover-bottom:before {\n  left: 100%;\n  margin-top: 5px;\n}\n.k-popover.k-popover-bottom:after {\n  left: 50%;\n  border-bottom: 8px solid #fff;\n  border-top: none;\n  margin-top: -3px;\n}\n.k-popover.k-popover-bottom:hover:before,\n.k-popover.k-popover-bottom:hover:after {\n  transform: translateX(-50%) translateY(5px);\n}\n.k-popover.k-popover-left:before,\n.k-popover.k-popover-left:after {\n  top: 50%;\n  right: 100%;\n  transform: translateY(-50%);\n}\n.k-popover.k-popover-left:before {\n  margin-right: 5px;\n}\n.k-popover.k-popover-left:after {\n  border-left: 8px solid #fff;\n  border-right: none;\n  margin-right: -3px;\n}\n.k-popover.k-popover-left:hover:before,\n.k-popover.k-popover-left:hover:after {\n  transform: translateX(-5px) translateY(-50%);\n}\n", map: {"version":3,"sources":["/Users/tong/Documents/repos/kongponents/packages/KPop/KPop.vue"],"names":[],"mappings":";AA+EA;EACA,qBAAA;EACA,kBAAA;EACA,eAAA;AACA;AACA;;EAEA,kBAAA;EACA,kBAAA;EACA,UAAA;EACA,oBAAA;EACA,aAAA;EACA,mDAAA;AACA;AACA;EACA,gBAAA;EACA,qBAAA;EACA,kBAAA;EACA,mBAAA;EACA,kBAAA;EACA,gBAAA;EACA,4CAAA;EACA,2BAAA;AACA;AACA;EACA,QAAA;EACA,6BAAA;EACA,WAAA;AACA;AACA;;EAEA,mBAAA;EACA,UAAA;AACA;;EAEA,qBAAA;AACA;;EAEA,YAAA;EACA,2BAAA;AACA;AACA;EACA,UAAA;EACA,kBAAA;AACA;AACA;EACA,SAAA;EACA,0BAAA;EACA,mBAAA;EACA,mBAAA;AACA;AACA;;EAEA,4CAAA;AACA;AAEA;;EAEA,QAAA;EACA,UAAA;EACA;AACA;AACA;EACA,gBAAA;AACA;AACA;EACA,4BAAA;EACA,iBAAA;EACA,iBAAA;AACA;AACA;;EAEA,2CAAA;AACA;AAEA;;EAEA,SAAA;EACA,2BAAA;AACA;AACA;EACA,UAAA;EACA,eAAA;AACA;AACA;EACA,SAAA;EACA,6BAAA;EACA,gBAAA;EACA,gBAAA;AACA;AACA;;EAEA,2CAAA;AACA;AAEA;;EAEA,QAAA;EACA,WAAA;EACA,2BAAA;AACA;AACA;EACA,iBAAA;AACA;AACA;EACA,2BAAA;EACA,kBAAA;EACA,kBAAA;AACA;AACA;;EAEA,4CAAA;AACA","file":"KPop.vue","sourcesContent":["<template>\n  <div\n    :aria-hidden=\"isHovering ? 'true' : 'false'\"\n    :data-message=\"message\"\n    :class=\"positionClass\"\n    :style=\"{'text-align': alignment}\"\n    class=\"k-popover\"\n    role=\"tooltip\"\n    @mouseout=\"isHovering(false)\"\n    @mouseover=\"isHovering(true)\">\n    <slot/>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'KPop',\n  props: {\n    /**\n     * Message to show in popover\n     */\n    message: {\n      type: String,\n      required: true\n    },\n    /**\n     * Define which side the popover displays<br>\n     * 'top' | 'bottom' | 'left' | 'right'\n     */\n    position: {\n      type: String,\n      default: 'top',\n      validator: function (value) {\n        return [\n          'top',\n          'bottom',\n          'left',\n          'right'\n        ].indexOf(value) !== -1\n      }\n    },\n    /**\n     * Sets the text alignment of the popover<br>\n     * 'left' | 'center' | 'right'\n     */\n    alignment: {\n      type: String,\n      default: 'left',\n      validator: function (value) {\n        return [\n          'left',\n          'right',\n          'center'\n        ].indexOf(value) !== -1\n      }\n    }\n  },\n\n  data () {\n    return {\n      hovering: false\n    }\n  },\n\n  computed: {\n    positionClass () {\n      return `k-popover-${this.position}`\n    }\n  },\n\n  methods: {\n    isHovering (isHovering) {\n      this.hovering = isHovering\n    }\n  }\n}\n</script>\n\n<style>\n.k-popover {\n  display: inline-block;\n  position: relative;\n  cursor: pointer;\n}\n.k-popover:before,\n.k-popover:after {\n  position: absolute;\n  visibility: hidden;\n  opacity: 0;\n  pointer-events: none;\n  z-index: 1090;\n  transition: all 0.15s cubic-bezier(0.5, 1, 0.25, 1);\n}\n.k-popover:before {\n  min-width: 275px;\n  padding: .5rem .75rem;\n  font-size: .875rem;\n  font-weight: normal;\n  border-radius: 3px;\n  background: #fff;\n  box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.15);\n  content: attr(data-message);\n}\n.k-popover:after {\n  width: 0;\n  border: 8px solid transparent;\n  content: \"\";\n}\n.k-popover:hover:before,\n.k-popover:hover:after {\n  visibility: visible;\n  opacity: 1;\n}\n\n  /* position styling */\n.k-popover.k-popover-top:before,\n.k-popover.k-popover-top:after {\n  bottom: 100%;\n  transform: translateX(-50%);\n}\n.k-popover.k-popover-top:before {\n  left: 100%;\n  margin-bottom: 5px;\n}\n.k-popover.k-popover-top:after {\n  left: 50%;\n  border-top: 8px solid #fff;\n  border-bottom: none;\n  margin-bottom: -3px;\n}\n.k-popover.k-popover-top:hover:before,\n.k-popover.k-popover-top:hover:after {\n  transform: translateX(-50%) translateY(-5px);\n}\n\n.k-popover.k-popover-right:before,\n.k-popover.k-popover-right:after {\n  top: 50%;\n  left: 100%;\n  transform: translateY(-50%)\n}\n.k-popover.k-popover-right:before {\n  margin-left: 5px;\n}\n.k-popover.k-popover-right:after {\n  border-right: 8px solid #fff;\n  border-left: none;\n  margin-left: -3px;\n}\n.k-popover.k-popover-right:hover:before,\n.k-popover.k-popover-right:hover:after {\n  transform: translateX(5px) translateY(-50%);\n}\n\n.k-popover.k-popover-bottom:before,\n.k-popover.k-popover-bottom:after {\n  top: 100%;\n  transform: translateX(-50%);\n}\n.k-popover.k-popover-bottom:before {\n  left: 100%;\n  margin-top: 5px;\n}\n.k-popover.k-popover-bottom:after {\n  left: 50%;\n  border-bottom: 8px solid #fff;\n  border-top: none;\n  margin-top: -3px;\n}\n.k-popover.k-popover-bottom:hover:before,\n.k-popover.k-popover-bottom:hover:after {\n  transform: translateX(-50%) translateY(5px);\n}\n\n.k-popover.k-popover-left:before,\n.k-popover.k-popover-left:after {\n  top: 50%;\n  right: 100%;\n  transform: translateY(-50%);\n}\n.k-popover.k-popover-left:before {\n  margin-right: 5px;\n}\n.k-popover.k-popover-left:after {\n  border-left: 8px solid #fff;\n  border-right: none;\n  margin-right: -3px;\n}\n.k-popover.k-popover-left:hover:before,\n.k-popover.k-popover-left:hover:after {\n  transform: translateX(-5px) translateY(-50%);\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$8 = undefined;
  /* module identifier */
  const __vue_module_identifier__$8 = "data-v-0bd74304";
  /* functional template */
  const __vue_is_functional_template__$8 = false;

  
  normalizeComponent_1(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    undefined,
    server
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * @typedef {Object} Item - breacrumb item holding router-link properties
 * @property {Object|String} to - router-link "to" object or href string
 * @property {string} key - list item key
 * @property {string} text - anchor text
 * @property {string} title - anchor title
 */

var script$9 = {
  props: {
    /**
     * @type {{ new(): Item[]}}
     */
    items: {
      type: Array,
      required: true
    }
  }
};

/* script */
const __vue_script__$9 = script$9;

/* template */
var __vue_render__$9 = function(_h, _vm) {
  var _c = _vm._c;
  return _c(
    "ul",
    { staticClass: "krumbs" },
    _vm._l(_vm.props.items, function(item) {
      return _vm._ssrNode(
        '<li class="krumb-item">',
        "</li>",
        [
          typeof item.to === "object"
            ? _c("router-link", { attrs: { to: item.to, title: item.title } }, [
                _vm._v(_vm._s(item.text))
              ])
            : _c(
                "a",
                {
                  attrs: { title: item.title, href: item.to, target: "_blank" }
                },
                [_vm._v(_vm._s(item.text))]
              )
        ],
        1
      )
    }),
    0
  )
};
var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;

  /* style */
  const __vue_inject_styles__$9 = function (inject) {
    if (!inject) return
    inject("data-v-1582fb46_0", { source: "\n.krumbs[data-v-1582fb46] {\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  padding: 0;\n  margin-bottom: 1rem;\n  list-style: none;\n  border-radius: 0.25rem;\n}\n.krumbs .krumb-item + .krumb-item[data-v-1582fb46]::before {\n  display: inline-block;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  color: #636c72;\n  content: \"\\203A\";\n}\n.krumbs .krumb-item[data-v-1582fb46]:last-of-type:after,\n.krumbs .krumb span[data-v-1582fb46]:after {\n  display: inline-block;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  color: #636c72;\n  content: \"\\203A\";\n}\n", map: {"version":3,"sources":["/Users/tong/Documents/repos/kongponents/packages/Krumbs/Krumbs.vue"],"names":[],"mappings":";AA4CA;EACA,aAAA;EACA,mBAAA;EACA,eAAA;EACA,UAAA;EACA,mBAAA;EACA,gBAAA;EACA,sBAAA;AACA;AAEA;EACA,qBAAA;EACA,qBAAA;EACA,oBAAA;EACA,cAAA;EACA,gBAAA;AACA;AAEA;;EAEA,qBAAA;EACA,qBAAA;EACA,oBAAA;EACA,cAAA;EACA,gBAAA;AACA","file":"Krumbs.vue","sourcesContent":["<template functional>\n  <ul class=\"krumbs\">\n    <li\n      v-for=\"item in props.items\"\n      :key=\"item.key\"\n      class=\"krumb-item\"\n    >\n      <router-link\n        v-if=\"typeof item.to === 'object'\"\n        :to=\"item.to\"\n        :title=\"item.title\"\n      >{{ item.text }}</router-link>\n      <a\n        v-else\n        :title=\"item.title\"\n        :href=\"item.to\"\n        target=\"_blank\">{{ item.text }}</a>\n    </li>\n  </ul>\n</template>\n\n<script>\n/**\n * @typedef {Object} Item - breacrumb item holding router-link properties\n * @property {Object|String} to - router-link \"to\" object or href string\n * @property {string} key - list item key\n * @property {string} text - anchor text\n * @property {string} title - anchor title\n */\n\nexport default {\n  props: {\n    /**\n     * @type {{ new(): Item[]}}\n     */\n    items: {\n      type: Array,\n      required: true\n    }\n  }\n}\n</script>\n\n<style scoped>\n.krumbs {\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  padding: 0;\n  margin-bottom: 1rem;\n  list-style: none;\n  border-radius: 0.25rem;\n}\n\n.krumbs .krumb-item + .krumb-item::before {\n  display: inline-block;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  color: #636c72;\n  content: \"\\203A\";\n}\n\n.krumbs .krumb-item:last-of-type:after,\n.krumbs .krumb span:after {\n  display: inline-block;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  color: #636c72;\n  content: \"\\203A\";\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$9 = "data-v-1582fb46";
  /* module identifier */
  const __vue_module_identifier__$9 = "data-v-1582fb46";
  /* functional template */
  const __vue_is_functional_template__$9 = true;

  
  normalizeComponent_1(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    undefined,
    server
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$a = {
  name: 'KTable',
  props: {
    /**
     * Object containing data which creates rows and columns.
     * @param {Object} options - Options to initialize the component with
     * @param {Array} options.headers - Array of Objects defining Table Headers
     * @param {Array} options.data - Array of Objects defining column data
     */
    options: {
      type: Object,
      required: true
    },
    /**
     * Adds zebra striping to the table rows
     */
    isStriped: {
      type: Boolean,
      default: false
    },
    /**
     * Enables hover highlighting to table rows
     */
    hasHover: {
      type: Boolean,
      default: false
    }
  }
};

/* script */
const __vue_script__$a = script$a;

/* template */
var __vue_render__$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "table",
    {
      staticClass: "table",
      class: { hover: _vm.hasHover, striped: _vm.isStriped }
    },
    [
      _vm._ssrNode("<thead>", "</thead>", [
        _vm._ssrNode(
          "<tr>",
          "</tr>",
          [
            _vm._l(_vm.options.headers, function(column, headerIndex) {
              return _vm._ssrNode(
                "<th>",
                "</th>",
                [
                  !column.hideLabel
                    ? _vm._t(
                        "column-" + column.key,
                        [
                          _vm._v(
                            "\n            " +
                              _vm._s(column.label ? column.label : column.key) +
                              "\n          "
                          )
                        ],
                        { column: column }
                      )
                    : _vm._e()
                ],
                2
              )
            })
          ],
          2
        )
      ]),
      _vm._ssrNode(" "),
      _vm._ssrNode(
        "<tbody>",
        "</tbody>",
        _vm._l(_vm.options.data, function(row, rowIndex) {
          return _vm._ssrNode(
            "<tr>",
            "</tr>",
            [
              _vm._l(_vm.options.headers, function(value, headerIndex) {
                return _vm._ssrNode(
                  "<td>",
                  "</td>",
                  [
                    _vm._t(
                      value.key,
                      [
                        _vm._v(
                          "\n            " +
                            _vm._s(row[value.key]) +
                            "\n          "
                        )
                      ],
                      { row: row, rowKey: rowIndex, rowValue: row[value.key] }
                    )
                  ],
                  2
                )
              })
            ],
            2
          )
        }),
        0
      )
    ],
    2
  )
};
var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;

  /* style */
  const __vue_inject_styles__$a = function (inject) {
    if (!inject) return
    inject("data-v-60b71721_0", { source: "\ntable[data-v-60b71721] {\n  border-collapse: collapse;\n}\n.table[data-v-60b71721] {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 1rem;\n  background-color: transparent;\n}\n.table th[data-v-60b71721],\n.table td[data-v-60b71721] {\n  padding: 0.75rem;\n  vertical-align: top;\n  border-top: 1px solid #dee2e6;\n}\n.table thead th[data-v-60b71721] {\n  vertical-align: bottom;\n  border-bottom: 1px solid #dee2e6;\n  text-align: left;\n}\n.table tbody + tbody[data-v-60b71721] {\n  border-top: 1px solid #dee2e6;\n}\n.table .table[data-v-60b71721] {\n  background-color: #fff;\n}\n.table-sm th[data-v-60b71721],\n.table-sm td[data-v-60b71721] {\n  padding: 0.3rem;\n}\n.table-bordered[data-v-60b71721] {\n  border: 1px solid #dee2e6;\n}\n.table-bordered th[data-v-60b71721],\n.table-bordered td[data-v-60b71721] {\n  border: 1px solid #dee2e6;\n}\n.table-bordered thead th[data-v-60b71721],\n.table-bordered thead td[data-v-60b71721] {\n  border-bottom-width: 2px;\n}\n.table-borderless th[data-v-60b71721],\n.table-borderless td[data-v-60b71721],\n.table-borderless thead th[data-v-60b71721],\n.table-borderless tbody + tbody[data-v-60b71721] {\n  border: 0;\n}\n.table.striped tbody tr[data-v-60b71721]:nth-of-type(odd) {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n.table.hover tbody tr[data-v-60b71721]:hover {\n  background-color: #F5FBFF;\n}\n", map: {"version":3,"sources":["/Users/tong/Documents/repos/kongponents/packages/KTable/KTable.vue"],"names":[],"mappings":";AA2EA;EACA,yBAAA;AACA;AAEA;EACA,WAAA;EACA,eAAA;EACA,mBAAA;EACA,6BAAA;AACA;AAEA;;EAEA,gBAAA;EACA,mBAAA;EACA,6BAAA;AACA;AAEA;EACA,sBAAA;EACA,gCAAA;EACA,gBAAA;AACA;AAEA;EACA,6BAAA;AACA;AAEA;EACA,sBAAA;AACA;AAEA;;EAEA,eAAA;AACA;AAEA;EACA,yBAAA;AACA;AAEA;;EAEA,yBAAA;AACA;AAEA;;EAEA,wBAAA;AACA;AAEA;;;;EAIA,SAAA;AACA;AAEA;EACA,qCAAA;AACA;AAEA;EACA,yBAAA;AACA","file":"KTable.vue","sourcesContent":["<template>\n  <table\n    :class=\"{hover: hasHover, striped: isStriped}\"\n    class=\"table\">\n    <thead>\n      <tr>\n        <template>\n          <th\n            v-for=\"(column, headerIndex) in options.headers\"\n            :key=\"headerIndex\">\n            <slot\n              v-if=\"!column.hideLabel\"\n              :name=\"`column-${column.key}`\"\n              :column=\"column\">\n              {{ column.label ? column.label : column.key }}\n            </slot>\n          </th>\n        </template>\n      </tr>\n    </thead>\n    <tbody>\n      <tr\n        v-for=\"(row, rowIndex) in options.data\"\n        :key=\"rowIndex\">\n        <template>\n          <td\n            v-for=\"(value, headerIndex) in options.headers\"\n            :key=\"headerIndex\">\n            <slot\n              :name=\"value.key\"\n              :row=\"row\"\n              :rowKey=\"rowIndex\"\n              :rowValue=\"row[value.key]\">\n              {{ row[value.key] }}\n            </slot>\n          </td>\n        </template>\n      </tr>\n    </tbody>\n  </table>\n</template>\n\n<script>\nexport default {\n  name: 'KTable',\n  props: {\n    /**\n     * Object containing data which creates rows and columns.\n     * @param {Object} options - Options to initialize the component with\n     * @param {Array} options.headers - Array of Objects defining Table Headers\n     * @param {Array} options.data - Array of Objects defining column data\n     */\n    options: {\n      type: Object,\n      required: true\n    },\n    /**\n     * Adds zebra striping to the table rows\n     */\n    isStriped: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * Enables hover highlighting to table rows\n     */\n    hasHover: {\n      type: Boolean,\n      default: false\n    }\n  }\n}\n</script>\n\n<style scoped>\ntable {\n  border-collapse: collapse;\n}\n\n.table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 1rem;\n  background-color: transparent;\n}\n\n.table th,\n.table td {\n  padding: 0.75rem;\n  vertical-align: top;\n  border-top: 1px solid #dee2e6;\n}\n\n.table thead th {\n  vertical-align: bottom;\n  border-bottom: 1px solid #dee2e6;\n  text-align: left;\n}\n\n.table tbody + tbody {\n  border-top: 1px solid #dee2e6;\n}\n\n.table .table {\n  background-color: #fff;\n}\n\n.table-sm th,\n.table-sm td {\n  padding: 0.3rem;\n}\n\n.table-bordered {\n  border: 1px solid #dee2e6;\n}\n\n.table-bordered th,\n.table-bordered td {\n  border: 1px solid #dee2e6;\n}\n\n.table-bordered thead th,\n.table-bordered thead td {\n  border-bottom-width: 2px;\n}\n\n.table-borderless th,\n.table-borderless td,\n.table-borderless thead th,\n.table-borderless tbody + tbody {\n  border: 0;\n}\n\n.table.striped tbody tr:nth-of-type(odd) {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n\n.table.hover tbody tr:hover {\n  background-color: #F5FBFF;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$a = "data-v-60b71721";
  /* module identifier */
  const __vue_module_identifier__$a = "data-v-60b71721";
  /* functional template */
  const __vue_is_functional_template__$a = false;

  
  normalizeComponent_1(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    undefined,
    server
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$b = {
  name: 'KToaster',
  props: {
    /**
      *  Pass whether or not the modal should be visible
      */
    isVisible: {
      type: Boolean,
      required: true
    },
    /**
      * Message to show in toaster
      */
    message: {
      type: String,
      required: true
    },
    /**
      * Amount of time in milliseconds before toaster hides
      */
    timeoutMilliseconds: {
      type: Number,
      default: 10000
    },
    /**
      * Color variantion of Toaster.<br>
      * Options: success, danger, info or warning
      */
    appearance: {
      type: String,
      default: 'info',
      validator: function (value) {
        return [
          'danger',
          'success',
          'info',
          'warning'
        ].indexOf(value) !== -1
      },
      required: false
    }
  },

  data () {
    return {
      toasterTimeout: null
    }
  },

  watch: {
    isVisible (newValue, oldValue) {
      if (newValue === true && newValue !== oldValue) {
        this.toasterTimeout = setTimeout(() => this.close(), this.timeoutMilliseconds);
      }
    }
  },

  methods: {
    close () {
      clearTimeout(this.toasterTimeout);
      this.$emit('close');
    }
  }
};

/* script */
const __vue_script__$b = script$b;

/* template */
var __vue_render__$b = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("transition", { attrs: { name: "slide" } }, [
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.isVisible,
            expression: "isVisible"
          }
        ],
        staticClass: "k-toaster",
        class: { visible: _vm.isVisible }
      },
      [
        _c(
          "div",
          { staticClass: "k-toast", class: _vm.appearance },
          [
            _c("a", {
              staticClass: "k-toast-btn-clear",
              on: {
                click: function($event) {
                  _vm.close();
                }
              }
            }),
            _vm._v(" "),
            _vm._t(_vm.message, [_vm._v(_vm._s(_vm.message))])
          ],
          2
        )
      ]
    )
  ])
};
var __vue_staticRenderFns__$b = [];
__vue_render__$b._withStripped = true;

  /* style */
  const __vue_inject_styles__$b = function (inject) {
    if (!inject) return
    inject("data-v-097efd56_0", { source: "\n.k-toaster[data-v-097efd56] {\n  position: fixed;\n  top: 50px;\n  right: 0;\n  z-index: 10000;\n  width: 300px;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.k-toaster .k-toast[data-v-097efd56] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 10px;\n  padding: 1rem;\n  border: 1px solid;\n  border-radius: 8px;\n  color: #383d41;\n  background-color: #e2e3e5;\n  border-color: #d6d8db;\n  transition: all 0.3s ease;\n}\n.k-toaster .k-toast .k-toast-btn-clear[data-v-097efd56] {\n  order: 1;\n  margin-left: auto;\n  border: 0;\n  color: inherit;\n  opacity: 0.45;\n  text-decoration: none;\n  cursor: pointer;\n  background: transparent;\n}\n.k-toaster .k-toast .k-toast-btn-clear[data-v-097efd56]:hover {\n  opacity: 0.85;\n}\n.k-toaster .k-toast .k-toast-btn-clear[data-v-097efd56]::before {\n  content: \"\\2715\";\n}\n\n/* Toaster Variants */\n.k-toaster .k-toast.success[data-v-097efd56] {\n  color: #008038;\n  border-color: #8cd9ac;\n  background: #ecf9f2;\n}\n.k-toaster .k-toast.info[data-v-097efd56] {\n  color: #004a80;\n  border-color: #7cc9ff;\n  background: #ebf7ff;\n}\n.k-toaster .k-toast.warning[data-v-097efd56] {\n  color: #403624;\n  border-color: #FFDF80;\n  background-color: #FFF7E8;\n}\n.k-toaster .k-toast.danger[data-v-097efd56] {\n  color: #c20d0a;\n  border-color: #ff8080;\n  background: #fff0f0;\n}\n\n/* Toaster Slide Animation */\n.slide-enter-active[data-v-097efd56],\n.slide-leave-active[data-v-097efd56] {\n  transition: all .4s ease;\n}\n.slide-enter[data-v-097efd56],\n.slide-leave-to[data-v-097efd56] {\n  transform: translate(100%);\n}\n@media (max-width: 300px) {\n.k-toaster[data-v-097efd56] {\n    width: 100%;\n}\n}\n", map: {"version":3,"sources":["/Users/tong/Documents/repos/kongponents/packages/KToaster/KToaster.vue"],"names":[],"mappings":";AAuFA;EACA,eAAA;EACA,SAAA;EACA,QAAA;EACA,cAAA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;AACA;AACA;EACA,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,aAAA;EACA,iBAAA;EACA,kBAAA;EACA,cAAA;EACA,yBAAA;EACA,qBAAA;EACA,yBAAA;AACA;AACA;EACA,QAAA;EACA,iBAAA;EACA,SAAA;EACA,cAAA;EACA,aAAA;EACA,qBAAA;EACA,eAAA;EACA,uBAAA;AACA;AACA;EACA,aAAA;AACA;AACA;EACA,gBAAA;AACA;;AAEA,qBAAA;AACA;EACA,cAAA;EACA,qBAAA;EACA,mBAAA;AACA;AACA;EACA,cAAA;EACA,qBAAA;EACA,mBAAA;AACA;AACA;EACA,cAAA;EACA,qBAAA;EACA,yBAAA;AACA;AACA;EACA,cAAA;EACA,qBAAA;EACA,mBAAA;AACA;;AAEA,4BAAA;AACA;;EAEA,wBAAA;AACA;AACA;;EAEA,0BAAA;AACA;AAEA;AACA;IACA,WAAA;AACA;AACA","file":"KToaster.vue","sourcesContent":["<template>\n  <transition name=\"slide\">\n    <div\n      v-show=\"isVisible\"\n      :class=\"{visible: isVisible}\"\n      class=\"k-toaster\">\n      <div\n        :class=\"appearance\"\n        class=\"k-toast\">\n        <a\n          class=\"k-toast-btn-clear\"\n          @click=\"close()\"/>\n        <!-- @slot to add custom message if not passing :message prop -->\n        <slot :name=\"message\">{{ message }}</slot>\n      </div>\n    </div>\n  </transition>\n</template>\n\n<script>\nexport default {\n  name: 'KToaster',\n  props: {\n    /**\n      *  Pass whether or not the modal should be visible\n      */\n    isVisible: {\n      type: Boolean,\n      required: true\n    },\n    /**\n      * Message to show in toaster\n      */\n    message: {\n      type: String,\n      required: true\n    },\n    /**\n      * Amount of time in milliseconds before toaster hides\n      */\n    timeoutMilliseconds: {\n      type: Number,\n      default: 10000\n    },\n    /**\n      * Color variantion of Toaster.<br>\n      * Options: success, danger, info or warning\n      */\n    appearance: {\n      type: String,\n      default: 'info',\n      validator: function (value) {\n        return [\n          'danger',\n          'success',\n          'info',\n          'warning'\n        ].indexOf(value) !== -1\n      },\n      required: false\n    }\n  },\n\n  data () {\n    return {\n      toasterTimeout: null\n    }\n  },\n\n  watch: {\n    isVisible (newValue, oldValue) {\n      if (newValue === true && newValue !== oldValue) {\n        this.toasterTimeout = setTimeout(() => this.close(), this.timeoutMilliseconds)\n      }\n    }\n  },\n\n  methods: {\n    close () {\n      clearTimeout(this.toasterTimeout)\n      this.$emit('close')\n    }\n  }\n}\n</script>\n\n<style scoped>\n.k-toaster {\n  position: fixed;\n  top: 50px;\n  right: 0;\n  z-index: 10000;\n  width: 300px;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.k-toaster .k-toast {\n  display: flex;\n  align-items: center;\n  margin-bottom: 10px;\n  padding: 1rem;\n  border: 1px solid;\n  border-radius: 8px;\n  color: #383d41;\n  background-color: #e2e3e5;\n  border-color: #d6d8db;\n  transition: all 0.3s ease;\n}\n.k-toaster .k-toast .k-toast-btn-clear {\n  order: 1;\n  margin-left: auto;\n  border: 0;\n  color: inherit;\n  opacity: 0.45;\n  text-decoration: none;\n  cursor: pointer;\n  background: transparent;\n}\n.k-toaster .k-toast .k-toast-btn-clear:hover {\n  opacity: 0.85;\n}\n.k-toaster .k-toast .k-toast-btn-clear::before {\n  content: \"\\2715\";\n}\n\n/* Toaster Variants */\n.k-toaster .k-toast.success {\n  color: #008038;\n  border-color: #8cd9ac;\n  background: #ecf9f2;\n}\n.k-toaster .k-toast.info {\n  color: #004a80;\n  border-color: #7cc9ff;\n  background: #ebf7ff;\n}\n.k-toaster .k-toast.warning {\n  color: #403624;\n  border-color: #FFDF80;\n  background-color: #FFF7E8;\n}\n.k-toaster .k-toast.danger {\n  color: #c20d0a;\n  border-color: #ff8080;\n  background: #fff0f0;\n}\n\n/* Toaster Slide Animation */\n.slide-enter-active,\n.slide-leave-active {\n  transition: all .4s ease;\n}\n.slide-enter,\n.slide-leave-to {\n  transform: translate(100%);\n}\n\n@media (max-width: 300px) {\n  .k-toaster {\n    width: 100%;\n  }\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$b = "data-v-097efd56";
  /* module identifier */
  const __vue_module_identifier__$b = "data-v-097efd56";
  /* functional template */
  const __vue_is_functional_template__$b = false;

  
  normalizeComponent_1(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    undefined,
    server
  );

exports.appearances = appearances;
