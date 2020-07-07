import 'element-ui/lib/theme-chalk/tooltip.css';
import 'element-ui/lib/theme-chalk/base.css';
import _tooltip from 'element-ui/lib/tooltip';
import 'element-ui/lib/theme-chalk/popover.css';
import _popover from 'element-ui/lib/popover';
import 'element-ui/lib/theme-chalk/message.css';
import _Message from 'element-ui/lib/message';
import Vue from 'vue';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import VueClipboard from 'vue-clipboard2';
import VueQrcode from '@chenfengyuan/vue-qrcode';

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
      validator: function (value) {
        return value.split('.').length === 2;
      }
    },
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

  data() {
    return {
      host: this.$QRCODE_HOST || '',
      code: ''
    };
  },

  computed: {
    qrcodeLink() {
      if (this.qrcode && this.fn) {
        const [hook, action] = this.fn.split('.');
        return `${this.host}/#/api/${hook}/${action}`;
      }

      return '页面不存在-404！';
    },

    codeClassName() {
      return `language-${this.language}`;
    }

  },

  mounted() {
    const $code = this.$refs.code;
    const $original = this.$refs.original;
    let code = $original.innerText;
    code = code.replace(/^\n+|\n+$/g, '');
    const prismLanguage = Prism.languages[this.language];

    this.code = code;
    $code.innerHTML = Prism.highlight(code, prismLanguage);
  },

  methods: {
    onCopy() {
      if (this.copySuccess) {
        this.copySuccess();
        return;
      }

      _Message({
        message: '复制成功！',
        type: 'success'
      });
    },

    onError() {
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
  components: {
    [_popover.name]: _popover,
    [_tooltip.name]: _tooltip,
    [VueQrcode.name]: VueQrcode
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "w6s-code-wrapper"
  }, [_c('div', {
    staticClass: "btns"
  }, [_vm.qrcode ? _c('div', {
    staticClass: "btn__qrcode"
  }, [_c('el-popover', {
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
  })])])], 1)], 1) : _vm._e(), _vm._v(" "), _vm.copy ? _c('div', {
    staticClass: "btn__copy"
  }, [_c('el-tooltip', {
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
  })])])])], 1) : _vm._e()]), _vm._v(" "), _c('pre', {
    class: _vm.codeClassName
  }, [_c('p', {
    ref: "original",
    staticClass: "w6s-code-wrapper__original-code"
  }, [_vm._t("default")], 2), _c('code', {
    ref: "code",
    class: _vm.codeClassName
  })])]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-64e73c18_0", {
    source: ".w6s-code-wrapper{position:relative}.w6s-code-wrapper__original-code{display:none}.w6s-code-wrapper .btns{position:absolute;right:10px;top:10px;display:flex}.w6s-code-wrapper .btns>div{width:30px;height:30px;background:#fff;margin-left:10px;font-size:10px;display:flex;justify-content:center;align-items:center;border-radius:4px;cursor:pointer;box-shadow:0 3px 10px 0 rgba(20,31,51,.08);border:1px solid #ededf0}.w6s-code-wrapper .btns>div svg{width:20px;height:20px}.w6s-code-wrapper .btns .btn__copy span,.w6s-code-wrapper .btns .btn__qrcode span{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.w6s-popover{padding:18px 5px 0 5px}.w6s-popover .el-popover__title{text-align:center;margin-bottom:0;font-size:15px}.el-message{min-width:100px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  CodeWrapper: __vue_component__
});

// Import vue components

const install = function installVueCodeComponent(Vue, options) {
  if (install.installed) return;
  install.installed = true;

  if (options.host) {
    Vue.prototype.$QRCODE_HOST = options.host;
  }

  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install on non-es builds, when vue is found

export default plugin;
export { __vue_component__ as CodeWrapper };
