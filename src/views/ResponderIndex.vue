<template>
  <el-container>
    <el-header style="height: 20%">
      <div id="inputdiv">
        应答器名称<el-input
          placeholder="请输入"
          class="input"
          v-model="search.name"
          resize="none"
          style="width: 185px"
          clearable
        >
        </el-input>

        应答器地址<el-input
          placeholder="请输入"
          class="input"
          v-model="search.keyUrl"
          clearable
          resize="none"
          style="width: 185px"
        >
        </el-input>
        应答器分类<el-input
          placeholder="请输入"
          class="input"
          v-model="search.categoryName"
          clearable
          resize="none"
          style="width: 185px"
        >
        </el-input>
        请求方式
        <el-select
          v-model="search.httpMethod"
          class="input"
          clearable
          placeholder="请选择"
          style="width: 185px"
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
          v-model="search.enableStatus"
          class="input"
          clearable
          placeholder="请选择"
          style="width: 185px"
        >
          <el-option
            v-for="item in optionalEnableStatuss"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button type="primary" @click="query()">搜索</el-button>
        <el-button
          type="primary"
          @click="() => this.$router.push(`/responder/detail/-1`)"
          >新增</el-button
        >
      </div>
      <div>
        <el-button type="primary" plain @click="projectLogs()"
          >项目实时日志</el-button
        >
        <el-button type="primary" plain @click="taskLogs()"
          >任务实时日志</el-button
        >
      </div>
      <br />
    </el-header>
    <div class="tableDiv">
      <div>
        <el-table
          :data="search.responderInfoList"
          stripe
          style="width: 100%"
          height="740px"
        >
          <el-table-column fixed prop="name" label="应答器名称" min-width="150">
          </el-table-column>
          <el-table-column prop="keyUrl" label="应答器地址" min-width="150">
          </el-table-column>
          <el-table-column
            prop="categoryName"
            label="应答器分类"
            min-width="150"
          >
          </el-table-column>
          <el-table-column prop="httpMethod" label="请求方式" min-width="150">
          </el-table-column>
          <el-table-column
            prop="enableStatusDesc"
            label="启用状态"
            min-width="150"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.enableStatus"
                @change="enableResponderStatus(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="最后更新时间"
            :formatter="
              ({ updateTime }) => `${formatDate(new Date(updateTime))}`
            "
            min-width="150"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                class="optButton"
                @click="viewDetails(scope.row)"
                type="text"
                >查看</el-button
              >
              <el-popconfirm
                confirm-button-text="好的"
                cancel-button-text="不用了"
                icon="el-icon-info"
                icon-color="red"
                title="确定要删除当前应答器吗？"
                @confirm="deleteResponder(scope.row)"
              >
                <el-button type="text" slot="reference" class="optButton"
                  >删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          layout="total,prev, pager, next"
          background
          :total="search.total"
          :current-page="search.pageNum"
          :page-size="search.pageSize"
          @current-change="handleCurrentChange"
          style="text-align: right"
        >
        </el-pagination>
      </div>
      <router-view></router-view>
    </div>
  </el-container>
</template>

<script>
import axios from "axios";
import { host } from "@/request/config";
import { formatDate } from "@/js/date.js";

export default {
  name: "ResponderInfo",
  data() {
    return {
      search: {
        name: "",
        keyUrl: "",
        categoryName: "",
        httpMethod: "",
        enableStatus: "",
        pageNum: 1,
        pageSize: 10,
        total: 0,
        responderInfoList: [],
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
    query() {
      var that = this;
      axios
        .post(host() + "/responder/request/crud/query", that.search)
        .then((res) => {
          if (res.status != 200 || res.data.code != 200200) {
            alert(res.data.msg);
          }
          if (res.data.code == 200200) {
            that.search.responderInfoList = res.data.data.list;
            that.search.total = res.data.data.total;
          }
        });
    },
    handleCurrentChange(pageNum) {
      this.search.pageNum = pageNum;
      this.query();
    },
    formatDate(date) {
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    viewDetails(row) {
      this.$router.push(`/responder/detail/${row.id}`);
    },
    deleteResponder(row) {
      var that = this;
      axios
        .delete(
          host() + "/responder/request/crud/delete/" + row.id,
          that.search
        )
        .then((res) => {
          if (res.status != 200 || res.data.code != 200200) {
            alert(res.data.msg);
          }
          if (res.data.code == 200200) {
            that.query();
          }
        });
    },
    enableResponderStatus(row) {
      var that = this;
      let param = {
        id: row.id,
        enableStatus: row.enableStatus,
      };
      axios
        .put(host() + "/responder/request/crud/enableConfig", param)
        .then((res) => {
          if (res.status != 200 || res.data.code != 200200) {
            alert(res.data.msg);
            row.enableStatus = !row.enableStatus;
            return;
          }
          that.query();
        });
    },
    projectLogs() {
      window.open(host() + "/responder/logs/all");
    },
    taskLogs() {
      window.open(host() + "/responder/logs/httpTask");
    },
  },
  mounted: function () {
    this.query();
  },
};
</script>

<style scoped>
#inputdiv {
  padding: 10px 0px;
  width: 1600px;
}

.tableDiv {
  padding: 0px 20px;
}

.input {
  padding: 10px 20px 10px 5px;
}

.optButton {
  padding: 12px 5px;
}
</style>
<style>
.el-input__suffix {
  position: absolute;
  width: 12px;
  height: 12px;
  right: 33px;
  top: 50%;
  margin-top: -4px;
}
</style>
