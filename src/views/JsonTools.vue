<template>
    <div>
        <el-row >
            <el-col :span="11">
                <el-input
                                type="textarea"
                                rows="28"
                                resize="vertical"
                                placeholder="输入内容"
                                v-model="originalStr"
                        >
                        </el-input>
            </el-col>
            <el-col :span="13">
                <el-button type="primary" @click="parseJson('1')">展开JSON</el-button>
                <el-button type="primary" @click="parseJson('2')">压缩JSON</el-button>
                <el-input
                        type="textarea"
                        rows="26"
                        resize="vertical"
                        placeholder="输入内容"
                        v-model="formatStr"
                >
                </el-input>
            </el-col>
        </el-row>
        <div class="box">
            <span>电気の指先が急増するのは、人生の永远の信念です。唯一の超电磁铳です!</span>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    import {host} from "@/request/config";

    export default {
        data() {
            return {
                originalStr: "",
                formatStr: ""
            };
        },
        methods: {
            parseJson(operationType) {
                var that = this;
                let params = {
                    param: this.originalStr,
                    operationType: operationType
                };
                axios.post(host() + "/json/parse", params).then(res => {
                    console.log(res);
                    console.log(res.data);
                    if (res.data.code == 500 || res.data.code == 400) {
                        alert(res.data.msg);
                    }
                    if (res.data.code == 200) {
                        that.formatStr = res.data.data;
                    }
                });
            }
        }
    };
</script>
<style>
    .box {
        font-size: 45px;
        color: blue;
    }
    input,
    textarea {
        background: rgba(255, 255, 255, 0.8) !important;
    }
</style>