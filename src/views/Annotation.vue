<template>
    <div>
        <h1>给实体类添加Mybatis注解</h1>
        <span>输入区域:</span>
        <el-input
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 100 }"
                placeholder="请输入标准换行的Java类文本内容"
                v-model="textarea1"
        >
        </el-input>
        <div style="margin: 20px 0"></div>
        <el-row>
            <el-button type="primary" @click="submit()">生成</el-button>
        </el-row>
        <br/>
        <span>输出区域:</span>
        <el-input
                readonly="readonly"
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 100 }"
                placeholder="电気の指先が急増するのは、人生の永远の信念です。唯一の超电磁铳です"
                v-model="textarea2"
        >
        </el-input>
    </div>
</template>
<script>
    import axios from "axios";
    import {host} from "@/request/config";

    export default {
        data() {
            return {
                textarea1: "",
                textarea2: ""
            };
        },
        methods: {
            submit() {
                var that = this;
                let params = {
                    entityStr: this.textarea1
                };
                axios.post(host() + "/entity/addMyBatisAnnotation", params).then(res => {
                    console.log(res);
                    console.log(res.data);
                    if (res.data.code == 500 || res.data.code == 400) {
                        alert(res.data.msg);
                    }
                    if (res.data.code == 200) {
                        that.textarea2 = res.data.data;
                    }
                });
            }
        }
    };
</script>
