<template>
  <el-container>
    <el-header style="height: 15vh">
      <el-form
        id="from"
        :inline="true"
        class="demo-form-inline"
        style="width: 98vw"
      >
        <el-form-item label="应答器名称">
          <el-input
            v-model="search.name"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="应答器地址">
          <el-input
            v-model="search.keyUrl"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="应答器分类">
          <el-input
            v-model="search.categoryName"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          请求方式
          <el-select v-model="search.httpMethod" placeholder="请选择" clearable>
            <el-option
              v-for="method in httpMethodList"
              :key="method.value"
              :label="method.label"
              :value="method.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          启用状态
          <el-select
            v-model="search.enableStatus"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="enableStatus in enableStatusList"
              :key="enableStatus.value"
              :label="enableStatus.label"
              :value="enableStatus.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main float="left">
      <el-table
        :data="responderInfoList"
        stripe
        style="width: 100%"
        height="80vh"
      >
        <el-table-column fixed prop="name" label="应答器名称" width="150">
        </el-table-column>
        <el-table-column prop="keyUrl" label="应答器地址" width="300">
        </el-table-column>
        <el-table-column prop="categoryName" label="应答器分类" width="150">
        </el-table-column>
        <el-table-column prop="httpMethod" label="请求方式" width="150">
        </el-table-column>
        <el-table-column prop="enableStatusDesc" label="启用状态">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text"
              >查看</el-button
            >
            <el-button type="text">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
import { host } from "@/request/config";

export default {
  name: "RequestConfigInfo",
  data() {
    return {
      search: {
        name: "",
        keyUrl: "",
        categoryName: "",
        httpMethod: "",
        enableStatus: "",
      },
      httpMethodList: [
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
      enableStatusList: [
        {
          value: 1,
          label: "启用",
        },
        {
          value: 0,
          label: "禁用",
        },
      ],
      responderInfoList: [
        {
          id: "1",
          name: "A",
          keyUrl: "http://localhost:8080/silwings",
          categoryName: "模拟数据",
          httpMethod: "GET",
          enableStatus: "1",
          enableStatusDesc: "启用",
        },
        {
          id: "2",
          name: "B",
          keyUrl: "http://localhost:8080/silwings",
          categoryName: "模拟数据",
          httpMethod: "GET",
          enableStatus: "1",
          enableStatusDesc: "启用",
        },
        {
          id: "3",
          name: "C",
          keyUrl: "http://localhost:8080/silwings",
          categoryName: "模拟数据",
          httpMethod: "GET",
          enableStatus: "1",
          enableStatusDesc: "启用",
        },
        {
          id: "4",
          name: "D",
          keyUrl: "http://localhost:8080/silwings",
          categoryName: "模拟数据",
          httpMethod: "GET",
          enableStatus: "1",
          enableStatusDesc: "启用",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      var that = this;
      axios
        .post(host() + "/responder/request/crud/query", that.search)
        .then((res) => {
          if (res.status != 200 || res.data.code != 200200) {
            alert(res.data.msg);
          }
          if (res.data.code == 200200) {
            that.responderInfoList = res.data.data.list;
          }
        });
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-header {
  /* background-color: #B3C0D1; */
  background-color: #e9eef3;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

#from {
  padding: 15px 0px;
}
</style>