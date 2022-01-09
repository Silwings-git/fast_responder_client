<template>
  <div>
    <h1>编解码工具</h1>
    <div>
      <span>输入区域:</span>
      <el-input
        type="text"
        placeholder="请输入需要MD5加密的文本内容"
        v-model="md5Str"
      >
      </el-input>
      <div style="margin: 1px 0"></div>
      <el-input type="text" placeholder="请输入盐(选填)" v-model="slat">
      </el-input>
      <div style="margin: 10px 0"></div>
      <span>输出区域:</span>
      <el-input
        readonly="readonly"
        type="text"
        placeholder="电気の指先が急増するのは、人生の永远の信念です。唯一の超电磁铳です"
        v-model="md5Res"
      >
      </el-input>
      <div style="margin: 10px 0"></div>
      <el-row>
        <el-button type="primary" @click="md5Encrypt()">MD5 加密</el-button>
      </el-row>
    </div>
    <div style="margin: 30px 0"></div>

    <div>
      <span>输入区域:</span>
      <el-input
        type="text"
        placeholder="请输入需要编解码的文本内容"
        v-model="buStr"
      >
      </el-input>
      <div style="margin: 10px 0"></div>
      <span>输出区域:</span>
      <el-input
        readonly="readonly"
        type="text"
        placeholder="电気の指先が急増するのは、人生の永远の信念です。唯一の超电磁铳です"
        v-model="buRes"
      >
      </el-input>
      <div style="margin: 10px 0"></div>
      <el-row>
        <el-button type="primary" @click="codec('1')">Base64 编码</el-button>
        <el-button type="primary" @click="codec('2')">Base64 解码</el-button>
        <el-button type="primary" @click="codec('3')">URL 编码</el-button>
        <el-button type="primary" @click="codec('4')">URL 解码</el-button>
      </el-row>
    </div>
    <div style="margin: 70px 0"></div>

    <div class="box">
      <span
        >电気の指先が急増するのは、人生の永远の信念です。唯一の超电磁铳です!</span
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { host } from "@/request/config";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      md5Str: "",
      slat: "",
      md5Res: "",
      buStr: "",
      buRes: "",
    };
  },
  methods: {
    md5Encrypt() {
      var that = this;
      let params = {
        str: this.md5Str,
        slat: this.slat,
      };
      axios.post(host() + "/crypto/md5Encrypt", params).then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data.code == 500 || res.data.code == 400) {
          alert(res.data.msg);
        }
        if (res.data.code == 200) {
          that.md5Res = res.data.data;
        }
      });
    },
    codec(operationType) {
      var that = this;
      let params = {
        param: this.buStr,
        operationType: operationType,
      };
      axios.post(host() + "/crypto/codec", params).then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data.code == 500 || res.data.code == 400) {
          alert(res.data.msg);
        }
        if (res.data.code == 200) {
          that.buRes = res.data.data;
        }
      });
    },
  },
};
</script>

<style>
.box {
  font-size: 45px;
  color: blue;
}
</style>
