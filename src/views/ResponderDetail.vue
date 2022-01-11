<template>
  <div>
    <div>
      <h1>基础信息</h1>
      应答器名<el-input
        v-model="responderInfo.name"
        placeholder="请输入"
        style="width: 200px"
        class="input"
        :disabled="canEdit"
      ></el-input>
      分类名称<el-input
        v-model="responderInfo.categoryName"
        placeholder="请输入"
        style="width: 200px"
        class="input"
        :disabled="canEdit"
      ></el-input>
      应答地址<el-input
        v-model="responderInfo.keyUrl"
        placeholder="请输入"
        style="width: 200px"
        class="input"
        :disabled="canEdit"
      ></el-input>
    </div>
    <div>
      请求方式
      <el-select
        v-model="responderInfo.httpMethod"
        class="input"
        clearable
        placeholder="请选择"
        style="width: 200px"
        :disabled="canEdit"
      >
        <el-option
          v-for="item in optionalHttpMethods"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      启用状态
      <el-select
        v-model="enableStatus"
        class="input"
        clearable
        placeholder="请选择"
        style="width: 200px"
        :disabled="canEdit"
        ><el-option
          v-for="item in optionalEnableStatuss"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div>
      <div>
        <h1>HTTP 任务信息</h1>
        <div v-for="(task, i) in responderInfo.tasks" :key="task.name">
          <h2>任务{{ i + 1 }}</h2>
          <div>
            <div>
              任务名称<el-input
                v-model="task.name"
                placeholder="请输入"
                style="width: 400px"
                class="input"
                :disabled="canEdit"
              ></el-input>
              延迟时间(ms)<el-input
                v-model="task.delayTime"
                placeholder="请输入"
                style="width: 370px"
                class="input"
                :disabled="canEdit"
              ></el-input>
            </div>
          </div>
          <div>
            任务条件
            <div v-for="(conditionItem, i) in task.conditions" :key="i">
              <div>
                <el-input
                  v-model="task.conditions[i]"
                  placeholder="请输入"
                  style="width: 965px"
                  :disabled="canEdit"
                ></el-input>
              </div>
            </div>
          </div>
          <div>
            <br />
            任务内容
            <div>
              请求方式
              <el-select
                v-model="task.content.httpMethod"
                class="input"
                clearable
                placeholder="请选择"
                style="width: 400px"
                :disabled="canEdit"
              >
                <el-option
                  v-for="opt in optionalHttpMethods"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value"
                >
                </el-option>
              </el-select>
              请求地址<el-input
                v-model="task.content.requestUrl"
                placeholder="请输入"
                style="width: 400px"
                class="input"
                :disabled="canEdit"
              ></el-input>
              <div>
                请求头
                <el-input
                  type="textarea"
                  style="width: 400px"
                  placeholder="请输入内容"
                  v-model="task.content.headers"
                >
                </el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { host } from "@/request/config";

export default {
  name: "ResponderDetail",
  data() {
    return {
      canEdit: true,
      id: 0,
      enableStatus: 0,
      responderInfo: {
        name: "",
        categoryName: "",
        keyUrl: "",
        httpMethod: "",
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
      },
      optionalHttpMethods: [
        {
          value: "GET",
          label: "GET",
        },
        {
          value: "POST",
          label: "POST",
        },
        {
          value: "PUT",
          label: "PUT",
        },
        {
          value: "DELETE",
          label: "DELETE",
        },
      ],
      optionalEnableStatuss: [
        {
          value: 1,
          label: "启用",
        },
        {
          value: 0,
          label: "禁用",
        },
      ],
    };
  },
  methods: {
    findResponderInfoDetail() {
      var that = this;
      axios
        .get(host() + "/responder/request/crud/find/" + that.$route.params.id)
        .then((res) => {
          if (res.status != 200 || res.data.code != 200200) {
            alert(res.data.msg);
          }
          if (res.data.code == 200200) {
            console.log(res.data.data.responderInfoDetail);
            that.responderInfo = res.data.data.responderInfoDetail;
            that.id = res.data.data.id;
            that.enableStatus = res.data.data.enableStatus;
          }
        });
    },
  },
  mounted() {
    this.findResponderInfoDetail();
  },
};
</script>

<style scoped>
.input {
  padding: 0px 10px 20px 10px;
}
</style>