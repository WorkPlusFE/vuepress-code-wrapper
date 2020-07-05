<template>
  <div class="w6s-api-code">
    <div class="btns">
      <div class="btn__qrcode">
        <el-popover
          placement="top-start"
          :title="qrcodeTitle"
          width="200"
          :visible-arrow="true"
          popper-class="w6s-popover"
          trigger="hover">
          <qrcode :value="qrcodeLink" :options="{ width: 200 }" />
          <span class="btn-qrcode" slot="reference">
            <svg t="1593853153078" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2071" width="48" height="48"><path d="M384 928H192c-52.928 0-96-43.072-96-96v-192c0-52.928 43.072-96 96-96h192c52.928 0 96 43.072 96 96v192c0 52.928-43.072 96-96 96zM192 608c-17.632 0-32 14.336-32 32v192c0 17.664 14.368 32 32 32h192c17.632 0 32-14.336 32-32v-192c0-17.664-14.368-32-32-32H192z m544 288a32 32 0 0 1-32-32v-64a32 32 0 1 1 64 0v64a32 32 0 0 1-32 32z m128 0a32 32 0 0 1-32-32v-96a32 32 0 1 1 64 0v96a32 32 0 0 1-32 32z m0-224a32 32 0 0 1-32-32v-64a32 32 0 1 1 64 0v64a32 32 0 0 1-32 32z m-128 64a32 32 0 0 1-32-32v-128a32 32 0 1 1 64 0v128a32 32 0 0 1-32 32z m-128 160a32 32 0 0 1-32-32v-128a32 32 0 1 1 64 0v128a32 32 0 0 1-32 32z m0-256a32 32 0 0 1-32-32v-32a32 32 0 1 1 64 0v32a32 32 0 0 1-32 32z m-288 160H256a32 32 0 0 1-32-32v-64a32 32 0 0 1 32-32h64a32 32 0 0 1 32 32v64a32 32 0 0 1-32 32z m64-320H192c-52.928 0-96-43.072-96-96V192c0-52.928 43.072-96 96-96h192c52.928 0 96 43.072 96 96v192c0 52.928-43.072 96-96 96zM192 160c-17.632 0-32 14.368-32 32v192c0 17.632 14.368 32 32 32h192c17.632 0 32-14.368 32-32V192c0-17.632-14.368-32-32-32H192z m128 192H256a32 32 0 0 1-32-32V256a32 32 0 0 1 32-32h64a32 32 0 0 1 32 32v64a32 32 0 0 1-32 32z m512 128h-192c-52.928 0-96-43.072-96-96V192c0-52.928 43.072-96 96-96h192c52.928 0 96 43.072 96 96v192c0 52.928-43.072 96-96 96zM640 160c-17.664 0-32 14.368-32 32v192c0 17.632 14.336 32 32 32h192c17.664 0 32-14.368 32-32V192c0-17.632-14.336-32-32-32h-192z m128 192h-64a32 32 0 0 1-32-32V256a32 32 0 0 1 32-32h64a32 32 0 0 1 32 32v64a32 32 0 0 1-32 32z" p-id="2072" fill="#1A98FF"></path></svg>
          </span>
        </el-popover>
      </div>
      <div class="btn__copy">
        <el-tooltip class="item" effect="dark" content="点击复制代码" placement="top-end">
          <span
            class="btn-copy"
            v-clipboard:copy="code"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">
            <svg t="1593872186506" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7587" width="48" height="48">
              <path d="M832 704H384c-35.2 0-64-28.8-64-64V192c0-35.2 28.8-64 64-64h448c35.2 0 64 28.8 64 64v448c0 35.2-28.8 64-64 64zM384 192v448h448V192H384z" p-id="7588" fill="#1A98FF"></path>
              <path d="M611.2 896H188.8c-32 0-60.8-28.8-60.8-60.8V412.8c0-32 28.8-60.8 60.8-60.8H256c19.2 0 32 12.8 32 32s-12.8 32-32 32H188.8L192 835.2l419.2-3.2-3.2-64c0-19.2 12.8-32 32-32s32 12.8 32 32v67.2c0 32-28.8 60.8-60.8 60.8zM736 320h-256c-19.2 0-32-12.8-32-32s12.8-32 32-32h256c19.2 0 32 12.8 32 32s-12.8 32-32 32zM736 448h-256c-19.2 0-32-12.8-32-32s12.8-32 32-32h256c19.2 0 32 12.8 32 32s-12.8 32-32 32z" p-id="7589" fill="#1A98FF"></path>
              <path d="M736 576h-256c-19.2 0-32-12.8-32-32s12.8-32 32-32h256c19.2 0 32 12.8 32 32s-12.8 32-32 32z" p-id="7590" fill="#1A98FF"></path>
            </svg>
          </span>
        </el-tooltip>
      </div>
    </div>
    <pre :class="codeClassName"><p class="w6s-api-code__original-code" ref="original"><slot></slot></p><code :class="codeClassName" ref="code"></code></pre>
  </div>
</template>

<script>
import Vue from 'vue';
import { popover, tooltip, Message } from 'element-ui';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import VueClipboard from 'vue-clipboard2';
import VueQrcode from '@chenfengyuan/vue-qrcode';

VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

export default {
  name: 'ApiCode',
  props: {
    qrcode: {
      type: [String, Boolean],
      default: false
    },
    qrcodeTitle: {
      type: String,
      default: '使用 WorkPlus 扫一扫',
    },
    language: {
      type: String,
      default: 'javascript',
    },
  },
  data() {
    return {
      host: 'http://js-sdk.workplus.io/demo',
      code: '',
    };
  },
  computed: {
    qrcodeLink() {
      if (this.qrcode) {
        return `${this.host}?fn=${this.qrcode}`;
      }
      return '页面不存在-404！';
    },
    codeClassName() {
      return `language-${this.language}`;
    },
  },
  mounted() {
    const $code = this.$refs.code;
    const $original = this.$refs.original;

    let code = $original.innerText;
    code = code.replace(/^\n+|\n+$/g, '');

    const prismLanguage = Prism.languages['javascript'];
    if (process.env.NODE_ENV === 'development' && !prismLanguage) {
      throw new Error("Prism component for language \"".concat(this.language, "\" was not found, did you forget to register it? See all available ones: https://cdn.jsdelivr.net/npm/prismjs/components/"));
    }

    this.code = code;
    $code.innerHTML = Prism.highlight(code, prismLanguage);
  },
  methods: {
    onCopy() {
      Message({
        message: '复制成功！',
        type: 'success',
      });
    },
    onError() {
      Message({
        message: '失败了，也许是浏览器不支持，请手动复制！',
        type: 'error',
      });
    },
  },
  components: {
    [popover.name]: popover,
    [tooltip.name]: tooltip,
    [VueQrcode.name]: VueQrcode,
  }
}
</script>

<style lang="less">
.w6s-api-code {
  position: relative;
  &__original-code {
    display: none;
  }
  > pre {
  }
  .btns {
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    > div {
      width: 36px;
      height: 36px;
      background: #ffffff;
      margin-left: 10px;
      font-size: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      }
      svg {
        width: 26px;
        height: 26px;
      }
    }
    .btn__qrcode, .btn__copy {
      span {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

.w6s-popover {
  padding: 18px 5px 0 5px;
}

.w6s-popover .el-popover__title {
  text-align: center;
  margin-bottom: 0;
  font-size: 15px;
}

.el-message {
  min-width: 100px;
}
</style>
