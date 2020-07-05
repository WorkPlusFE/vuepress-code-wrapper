<script>
import Vue from 'vue';
import { CodeWrapper } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    CodeWrapper,
  },
  data() {
    return {
      code: 
`// normal
w6s.notification.alert({
  message: '这是一条警告信息',
  title: '提示', //非必须
  buttonName: '收到',
  success : function() {},
  fail : function(err) {},
}); `,
    };
  },
  methods: {
    handleCopySuccess() {
      console.log(1);
    },
    handleCopyFail() {
      console.log(0);
    },
  },
});
</script>

<template>
  <div id="app">
    <CodeWrapper 
      fn="notification.alert"
    >
      {{code}}
    </CodeWrapper>
  </div>
</template>
