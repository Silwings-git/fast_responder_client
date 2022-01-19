<template>
  <div>
    <el-row>
      <el-col :span="11">
        <div v-if="control.showDetail & (id > 0)">
          <h1>{{ responderInfoDetail.name }}</h1>
          <div class="infoContent">
            <h2>基本信息</h2>
            <hr />
            <el-row :gutter="20">
              <el-col :span="10"
                ><div class="grid-content bg-purple">
                  <span>分类名称: {{ responderInfoDetail.categoryName }}</span>
                </div></el-col
              >
              <el-col :span="10"
                ><div class="grid-content bg-purple">
                  <span>应答地址: {{ responderInfoDetail.keyUrl }}</span>
                </div></el-col
              >
            </el-row>
            <br />
            <el-row :gutter="20">
              <el-col :span="10"
                ><div class="grid-content bg-purple">
                  <span>请求方式: {{ responderInfoDetail.httpMethod }}</span>
                </div></el-col
              >
              <el-col :span="10"
                ><div class="grid-content bg-purple">
                  <span>响应延迟时间: {{ responderInfoDetail.delayTime }} ms</span>
                </div></el-col
              >
            </el-row>
            <br />
          </div>
          <div class="infoContent">
            <h2>HTTP 任务</h2>
            <hr />
            <div v-for="(task, i) in responderInfoDetail.tasks" :key="i">
              <h3>任务 {{ i + 1 }}</h3>
              <div>
                <el-row :gutter="20">
                  <el-col :span="10"
                    ><div class="grid-content bg-purple">
                      <span>任务名称: {{ task.name }}</span>
                    </div></el-col
                  >
                  <el-col :span="10"
                    ><div class="grid-content bg-purple">
                      <span>延迟时间: {{ task.delayTime }} ms</span>
                    </div></el-col
                  >
                </el-row>
              </div>
              <div>
                <h4>执行条件</h4>
                <div v-for="(condition, index) in task.conditions" :key="index">
                  <el-row :gutter="20">
                    <el-col :span="20"
                      ><div class="grid-content bg-purple">
                        <span>条件{{ index + 1 }} : {{ condition }}</span>
                      </div></el-col
                    >
                  </el-row>
                </div>
              </div>
              <div>
                <h4>任务内容</h4>
                <div>
                  <el-row :gutter="20">
                    <el-col :span="10"
                      ><div class="grid-content bg-purple">
                        <span>请求方式: {{ task.content.httpMethod }}</span>
                      </div></el-col
                    >
                    <el-col :span="10"
                      ><div class="grid-content bg-purple">
                        <span>请求地址: {{ task.content.requestUrl }}</span>
                      </div></el-col
                    >
                  </el-row>
                </div>
                <div>
                  <h5>请求头</h5>
                  <el-row :gutter="20">
                    <el-col :span="6"
                      ><div class="grid-content bg-purple">序号</div></el-col
                    >
                    <el-col :span="7"
                      ><div class="grid-content bg-purple">
                        <span>请求头Key</span>
                      </div></el-col
                    >
                    <el-col :span="7"
                      ><div class="grid-content bg-purple">
                        <span>请求头Value</span>
                      </div></el-col
                    >
                  </el-row>
                  <br />
                  <div
                    v-for="(value, key, index) in task.content.headers"
                    :key="index"
                  >
                    <el-row :gutter="20">
                      <el-col :span="6"
                        ><div class="grid-content bg-purple">
                          <span>{{ index + 1 }}</span>
                        </div></el-col
                      >
                      <el-col :span="7"
                        ><div class="grid-content bg-purple">
                          <span>{{ key }}</span>
                        </div></el-col
                      >
                      <el-col :span="7"
                        ><div class="grid-content bg-purple">
                          <span>{{ value }}</span>
                        </div></el-col
                      >
                    </el-row>
                  </div>
                </div>
                <div>
                  <h5>请求参数</h5>
                  <el-row :gutter="20">
                    <el-col :span="6"
                      ><div class="grid-content bg-purple">序号</div></el-col
                    >
                    <el-col :span="7"
                      ><div class="grid-content bg-purple">
                        <span>请求参数Key</span>
                      </div></el-col
                    >
                    <el-col :span="7"
                      ><div class="grid-content bg-purple">
                        <span>请求参数Value</span>
                      </div></el-col
                    >
                  </el-row>
                  <br />
                  <div
                    v-for="(value, key, index) in task.content.params"
                    :key="index"
                  >
                    <div v-for="(item, itemIndex) in value" :key="itemIndex">
                      <el-row :gutter="20">
                        <el-col :span="6"
                          ><div class="grid-content bg-purple">
                            {{ index + 1 }}.{{ itemIndex + 1 }}
                          </div></el-col
                        >
                        <el-col :span="7"
                          ><div class="grid-content bg-purple">
                            <span>{{ key }}</span>
                          </div></el-col
                        >
                        <el-col :span="7"
                          ><div class="grid-content bg-purple">
                            <span>{{ item }}</span>
                          </div></el-col
                        >
                      </el-row>
                    </div>
                  </div>
                </div>
                <div>
                  <h5>请求体</h5>
                  <pre>{{ task.content.body | jsonFormat }}</pre>
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div class="infoContent">
            <h2>响应信息</h2>
            <hr />
            <div
              v-for="(result, index) in responderInfoDetail.results"
              :key="index"
            >
              <h3>响应信息 {{ index + 1 }} : {{ result.resultName }}</h3>
              <div>
                <h4>执行条件</h4>
                <div
                  v-for="(condition, index) in result.conditions"
                  :key="index"
                >
                  <el-row :gutter="20">
                    <el-col :span="20"
                      ><div class="grid-content bg-purple">
                        <span>条件{{ index + 1 }} : {{ condition }}</span>
                      </div></el-col
                    >
                  </el-row>
                </div>
              </div>
              <br />
              <div>
                <el-row :gutter="20">
                  <el-col :span="10"
                    ><div class="grid-content bg-purple">
                      <span>字符串返回信息 : {{ result.msg }}</span>
                    </div></el-col
                  >
                </el-row>
              </div>
              <br />
              <div>
                <div>
                  <h5>响应体</h5>
                  <pre>{{ result.body | jsonFormat }}</pre>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!control.showDetail | (id <= 0)">
          <iframe
            src="./ResponderDoc.html"
            style="width: 100%; height: calc(100vh - 61px); border: 0"
          ></iframe>
        </div>
      </el-col>
      <el-col :span="13">
        <el-row :gutter="20">
          <el-col :span="10"
            ><div class="grid-content bg-purple">
              <h1>JSON信息</h1>
            </div></el-col
          >
          <el-col :span="10"
            ><div class="grid-content bg-purple">
              <el-button
                type="primary"
                icon="el-icon-document"
                circle
                @click="control.showDetail = !control.showDetail"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-s-unfold"
                circle
                @click="formatResponderJson()"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="() => (control.prohibitEdit = !control.prohibitEdit)"
              ></el-button>
              <el-button
                type="success"
                icon="el-icon-check"
                circle
                v-if="!control.prohibitEdit"
                @click="update()"
              ></el-button></div
          ></el-col>
        </el-row>
        <el-input
          type="textarea"
          autosize
          rows="26"
          resize="vertical"
          placeholder="输入内容"
          v-model="responderInfoDetail.formatDetailJson"
          :disabled="control.prohibitEdit"
        >
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script src="//cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.min.js"></script>
<script>
import axios from "axios";
import { host } from "@/request/config";

export default {
  name: "ResponderDetail",
  data() {
    return {
      control: {
        prohibitEdit: true,
        showDetail: true
      },
      id: 0,
      responderInfoDetail: {
        name: "",
        keyUrl: "",
        httpMethod: "",
        categoryName: "",
        tasks: [
          {
            name: "",
            delayTime: 0,
            conditions: [],
            content: {
              httpMethod: "",
              requestUrl: "",
              headers: {},
              params: {
                "": [],
              },
              body: {},
            },
          },
        ],
        results: [
          {
            resultName: "",
            body: {},
            msg: "",
            conditions: [],
          },
        ],
        formatDetailJson:
          '{"categoryName":null,"httpMethod":null,"keyUrl":null,"name":"","results":[],"tasks":[]}',
      },
    };
  },
  methods: {
    findResponderInfoDetail() {
      var that = this;
      that.id = that.$route.params.id;
      if (that.id <= 0) {
        return;
      }
      axios
        .get(host() + "/responder/request/crud/find/" + that.$route.params.id)
        .then((res) => {
          if (res.status != 200 || res.data.code != 200200) {
            alert(res.data.msg);
          }
          if (res.data.code == 200200) {
            console.log(res.data.data.responderInfoDetail);
            that.responderInfoDetail = res.data.data;
          }
        });
    },
    update() {
      var that = this
      var param;
      try{
        param= JSON.parse(that.responderInfoDetail.formatDetailJson)
      }catch(e){
        alert("JSON格式错误");
        return
      }
       
      if (that.id > 0) {
        // 更新
        axios
          .put(
            host() + "/responder/request/crud/update/" + that.$route.params.id,
            param
          )
          .then((res) => {
            if (res.status != 200 || res.data.code != 200200) {
              alert(res.data.msg);
            }
            if (res.data.code == 200200) {
               that.control.prohibitEdit = !that.control.prohibitEdit;
              that.findResponderInfoDetail();
            }
          });
      } else {
        // 新增
        axios
          .post(
            host() + "/responder/request/crud/insert",
            param
          )
          .then((res) => {
            if (res.status != 200 || res.data.code != 200200) {
              alert(res.data.msg);
            }
            if (res.data.code == 200200) {
              that.$router.replace(`/responder/detail/${res.data.data}`);
               that.control.prohibitEdit = !that.control.prohibitEdit;
              that.findResponderInfoDetail();
            }
          });
      }
    },
    formatResponderJson() {
      var that = this;
      let params = {
        jsonStr: that.responderInfoDetail.formatDetailJson,
      };
      axios
        .post(host() + "/responder/request/crud/formatJson", params)
        .then((res) => {
          if (res.status != 200 || res.data.code != 200200) {
            alert(res.data.msg);
          }
          if (res.data.code == 200200) {
            that.responderInfoDetail.formatDetailJson = res.data.data;
          }
        });
    },
  },
  filters: {
    jsonFormat(jsonStr) {
      return JSON.stringify(jsonStr, null, "\t");
    },
  },
  mounted() {
    this.findResponderInfoDetail();
    if(this.id <= 0){
      // 后端格式化json
      this.formatResponderJson()
    }
  },
};
</script>

<style scoped>
.input {
  padding: 0px 10px 20px 10px;
}

.infoContent {
  background: rgba(255, 255, 255);
}

hr {
  background-color: rgb(242, 243, 245);
  height: 1px;
  border: none;
}
</style>