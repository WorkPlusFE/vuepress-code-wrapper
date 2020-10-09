'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}require('element-ui/lib/theme-chalk/tooltip.css'),require('element-ui/lib/theme-chalk/base.css');var _tooltip=_interopDefault(require('element-ui/lib/tooltip'));require('element-ui/lib/theme-chalk/popover.css');var _popover=_interopDefault(require('element-ui/lib/popover'));require('element-ui/lib/theme-chalk/message.css');var _Message=_interopDefault(require('element-ui/lib/message')),Vue=_interopDefault(require('vue')),Prism=_interopDefault(require('prismjs'));require('prismjs/themes/prism.css');var VueClipboard=_interopDefault(require('vue-clipboard2')),VueQrcode=_interopDefault(require('@chenfengyuan/vue-qrcode'));function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var _components;
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
var script = {
  name: 'CodeWrapper',
  props: {
    qrcode: {
      type: Boolean,
      default: true
    },
    fn: {
      type: String,
      validator: function validator(value) {
        return value.split('.').length === 2;
      }
    },
    customLink: String,
    qrcodeTitle: {
      type: String,
      default: '使用 WorkPlus 扫一扫'
    },
    language: {
      type: String,
      default: 'javascript'
    },
    copy: {
      type: Boolean,
      default: true
    },
    copySuccess: {
      type: Function
    },
    copyError: {
      type: Function
    },
    copyTooltip: {
      type: String,
      default: '复制代码'
    },
    iconColor: {
      type: String,
      default: '#2c3e50'
    }
  },
  data: function data() {
    return {
      host: this.$QRCODE_HOST || '',
      code: ''
    };
  },
  computed: {
    qrcodeLink: function qrcodeLink() {
      if (this.qrcode) {
        if (this.customLink) {
          return "".concat(this.host, "/#/").concat(this.customLink);
        }

        if (this.fn) {
          var _this$fn$split = this.fn.split('.'),
              _this$fn$split2 = _slicedToArray(_this$fn$split, 2),
              hook = _this$fn$split2[0],
              action = _this$fn$split2[1];

          return "".concat(this.host, "/#/api/").concat(hook, "/").concat(action);
        }
      }

      return '页面不存在-404！';
    },
    codeClassName: function codeClassName() {
      return "language-".concat(this.language);
    }
  },
  mounted: function mounted() {
    var $code = this.$refs.code;
    var $original = this.$refs.original;
    var code = $original.innerText;
    code = code.replace(/^\n+|\n+$/g, '');
    var prismLanguage = Prism.languages[this.language];

    this.code = code;
    $code.innerHTML = Prism.highlight(code, prismLanguage);
  },
  methods: {
    onCopy: function onCopy() {
      if (this.copySuccess) {
        this.copySuccess();
        return;
      }

      _Message({
        message: '复制成功！',
        type: 'success'
      });
    },
    onError: function onError() {
      if (this.copyError) {
        this.copyError();
        return;
      }

      _Message({
        message: '失败了，也许是浏览器不支持，请手动复制！',
        type: 'error'
      });
    }
  },
  components: (_components = {}, _defineProperty(_components, _popover.name, _popover), _defineProperty(_components, _tooltip.name, _tooltip), _defineProperty(_components, VueQrcode.name, VueQrcode), _components)
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "w6s-code-wrapper"
  }, [_vm._ssrNode("<div class=\"btns\">", "</div>", [_vm.qrcode ? _vm._ssrNode("<div class=\"btn__qrcode\">", "</div>", [_c('el-popover', {
    attrs: {
      "placement": "top-start",
      "title": _vm.qrcodeTitle,
      "width": "200",
      "visible-arrow": true,
      "popper-class": "w6s-popover",
      "trigger": "hover"
    }
  }, [_c('qrcode', {
    attrs: {
      "value": _vm.qrcodeLink,
      "options": {
        width: 200
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "btn-qrcode",
    attrs: {
      "slot": "reference"
    },
    slot: "reference"
  }, [_c('svg', {
    staticClass: "icon",
    attrs: {
      "t": "1593853153078",
      "viewBox": "0 0 1024 1024",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "p-id": "2071",
      "width": "48",
      "height": "48"
    }
  }, [_c('path', {
    attrs: {
      "d": "M384 928H192c-52.928 0-96-43.072-96-96v-192c0-52.928 43.072-96 96-96h192c52.928 0 96 43.072 96 96v192c0 52.928-43.072 96-96 96zM192 608c-17.632 0-32 14.336-32 32v192c0 17.664 14.368 32 32 32h192c17.632 0 32-14.336 32-32v-192c0-17.664-14.368-32-32-32H192z m544 288a32 32 0 0 1-32-32v-64a32 32 0 1 1 64 0v64a32 32 0 0 1-32 32z m128 0a32 32 0 0 1-32-32v-96a32 32 0 1 1 64 0v96a32 32 0 0 1-32 32z m0-224a32 32 0 0 1-32-32v-64a32 32 0 1 1 64 0v64a32 32 0 0 1-32 32z m-128 64a32 32 0 0 1-32-32v-128a32 32 0 1 1 64 0v128a32 32 0 0 1-32 32z m-128 160a32 32 0 0 1-32-32v-128a32 32 0 1 1 64 0v128a32 32 0 0 1-32 32z m0-256a32 32 0 0 1-32-32v-32a32 32 0 1 1 64 0v32a32 32 0 0 1-32 32z m-288 160H256a32 32 0 0 1-32-32v-64a32 32 0 0 1 32-32h64a32 32 0 0 1 32 32v64a32 32 0 0 1-32 32z m64-320H192c-52.928 0-96-43.072-96-96V192c0-52.928 43.072-96 96-96h192c52.928 0 96 43.072 96 96v192c0 52.928-43.072 96-96 96zM192 160c-17.632 0-32 14.368-32 32v192c0 17.632 14.368 32 32 32h192c17.632 0 32-14.368 32-32V192c0-17.632-14.368-32-32-32H192z m128 192H256a32 32 0 0 1-32-32V256a32 32 0 0 1 32-32h64a32 32 0 0 1 32 32v64a32 32 0 0 1-32 32z m512 128h-192c-52.928 0-96-43.072-96-96V192c0-52.928 43.072-96 96-96h192c52.928 0 96 43.072 96 96v192c0 52.928-43.072 96-96 96zM640 160c-17.664 0-32 14.368-32 32v192c0 17.632 14.336 32 32 32h192c17.664 0 32-14.368 32-32V192c0-17.632-14.336-32-32-32h-192z m128 192h-64a32 32 0 0 1-32-32V256a32 32 0 0 1 32-32h64a32 32 0 0 1 32 32v64a32 32 0 0 1-32 32z",
      "p-id": "2072",
      "fill": _vm.iconColor
    }
  })])])], 1)], 1) : _vm._e(), _vm._ssrNode(" "), _vm.copy ? _vm._ssrNode("<div class=\"btn__copy\">", "</div>", [_c('el-tooltip', {
    staticClass: "item",
    attrs: {
      "effect": "dark",
      "content": _vm.copyTooltip,
      "placement": "top-end"
    }
  }, [_c('span', {
    directives: [{
      name: "clipboard",
      rawName: "v-clipboard:copy",
      value: _vm.code,
      expression: "code",
      arg: "copy"
    }, {
      name: "clipboard",
      rawName: "v-clipboard:success",
      value: _vm.onCopy,
      expression: "onCopy",
      arg: "success"
    }, {
      name: "clipboard",
      rawName: "v-clipboard:error",
      value: _vm.onError,
      expression: "onError",
      arg: "error"
    }],
    staticClass: "btn-copy"
  }, [_c('svg', {
    staticClass: "icon",
    attrs: {
      "t": "1593872186506",
      "viewBox": "0 0 1024 1024",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "p-id": "7587",
      "width": "48",
      "height": "48"
    }
  }, [_c('path', {
    attrs: {
      "d": "M832 704H384c-35.2 0-64-28.8-64-64V192c0-35.2 28.8-64 64-64h448c35.2 0 64 28.8 64 64v448c0 35.2-28.8 64-64 64zM384 192v448h448V192H384z",
      "p-id": "7588",
      "fill": _vm.iconColor
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M611.2 896H188.8c-32 0-60.8-28.8-60.8-60.8V412.8c0-32 28.8-60.8 60.8-60.8H256c19.2 0 32 12.8 32 32s-12.8 32-32 32H188.8L192 835.2l419.2-3.2-3.2-64c0-19.2 12.8-32 32-32s32 12.8 32 32v67.2c0 32-28.8 60.8-60.8 60.8zM736 320h-256c-19.2 0-32-12.8-32-32s12.8-32 32-32h256c19.2 0 32 12.8 32 32s-12.8 32-32 32zM736 448h-256c-19.2 0-32-12.8-32-32s12.8-32 32-32h256c19.2 0 32 12.8 32 32s-12.8 32-32 32z",
      "p-id": "7589",
      "fill": _vm.iconColor
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M736 576h-256c-19.2 0-32-12.8-32-32s12.8-32 32-32h256c19.2 0 32 12.8 32 32s-12.8 32-32 32z",
      "p-id": "7590",
      "fill": _vm.iconColor
    }
  })])])])], 1) : _vm._e()], 2), _vm._ssrNode(" "), _vm._ssrNode("<pre" + _vm._ssrClass(null, _vm.codeClassName) + ">", "</pre>", [_vm._ssrNode("<p class=\"w6s-code-wrapper__original-code\">", "</p>", [_vm._t("default")], 2), _vm._ssrNode("<code" + _vm._ssrClass(null, _vm.codeClassName) + "></code>")], 2)], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-70f5b6f6_0", {
    source: ".w6s-code-wrapper{position:relative}.w6s-code-wrapper__original-code{display:none}.w6s-code-wrapper .btns{position:absolute;right:10px;top:10px;display:flex}.w6s-code-wrapper .btns>div{width:30px;height:30px;background:#fff;margin-left:10px;font-size:10px;display:flex;justify-content:center;align-items:center;border-radius:4px;cursor:pointer;box-shadow:0 3px 10px 0 rgba(20,31,51,.08);border:1px solid #ededf0}.w6s-code-wrapper .btns>div svg{width:20px;height:20px}.w6s-code-wrapper .btns .btn__copy span,.w6s-code-wrapper .btns .btn__qrcode span{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.w6s-popover{padding:18px 5px 0 5px}.w6s-popover .el-popover__title{text-align:center;margin-bottom:0;font-size:15px}.el-message{min-width:100px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-70f5b6f6";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);/* eslint-disable import/prefer-default-export */var components=/*#__PURE__*/Object.freeze({__proto__:null,CodeWrapper: __vue_component__});var install = function installVueCodeComponent(Vue, options) {
  if (install.installed) return;
  install.installed = true;

  if (options.host) {
    Vue.prototype.$QRCODE_HOST = options.host;
  }

  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Default export is library as a whole, registered via Vue.use()
exports.CodeWrapper=__vue_component__;exports.default=plugin;