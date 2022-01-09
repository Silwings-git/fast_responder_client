<template>
    <!--在此处添加渲染的内容-->
    <div>
        <el-upload
                class="upload-demo"
                ref="upload"
                drag
                :before-upload="beforeUpload"
                :on-success="handleSuccess"
                :http-request="handleHttpRequest"
                :headers="uploadHeaders"
                :limit="files"
                :disabled="disabled"
                multiple
                action
                :file-list="fileList"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
            </div>
            <div slot="tip" class="el-upload__tip">上传文件大小不能超过 1G</div>
        </el-upload>
    </div>
</template>

<script type="text/ecmascript-6">
    import Client from "@/utils/client";
    import { getuploadtoken } from "@/api/upload";
    //将渲染的内容导出
    export default {
        props: {},
        data() {
            return {
                region: "oss-cn-beijing",
                bucket: "", //这里选择OSS容器
                dataObj: {},
                fileList: [],
                files: 10,
                uploadHeaders: {
                    authorization: "*"
                },
                disabled: false,
                fileName: ""
            };
        },
        methods: {
            getAliToken() {
                return new Promise((resolve, reject) => {
                    //请求后台接口返回授权数据
                    getuploadtoken({ ext: "jpg" })
                        .then(response => {
                            console.log(response);
                            this.dataObj = {
                                region: "oss-cn-beijing",
                                bucket: response.data.bucket,
                                accessKeyId: response.data.accessKeyId,
                                accessKeySecret: response.data.accessKeySecret,
                                security: response.data.security
                            };
                            // 后台返回的文件上传路径（如果没有要求即可填随机命名，一般都是后台规定好的）
                            this.fileName = response.data.fileName;
                            resolve(true);
                        })
                        .catch(err => {
                            reject(false);
                        });
                });
            },
            beforeUpload(file) {
                return new Promise((resolve, reject) => {
                    this.getAliToken()
                        .then(response => {
                            if (response) {
                                resolve(response);
                            } else {
                                reject(response);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            reject(err);
                        });
                });
            },
            async handleHttpRequest(option) {
                console.log(option);
                //上传OSS
                try {
                    let vm = this;
                    vm.disabled = true;

                    const client = Client(this.dataObj),
                        file = option.file;
                    await client
                        .multipartUpload(this.fileName, file, {
                            progress: async function(p) {
                                let e = {};
                                e.percent = p * 100;
                                option.onProgress(e);
                            }
                        })
                        .then(({ res }) => {
                            console.log(res);
                            if (res.statusCode === 200) {
                                // option.onSuccess(ret)
                                console.log(res.requestUrls);
                                return res.requestUrls;
                            } else {
                                vm.disabled = false;
                                option.onError("上传失败");
                            }
                        })
                        .catch(error => {
                            vm.disabled = false;
                            option.onError("上传失败");
                        });
                } catch (error) {
                    console.error(error);
                    this.disabled = false;
                    option.onError("上传失败");
                }
            },
            handleSuccess(response, file, fileList) {
                console.log(response);
                console.log(file);
                console.log(fileList);
            }
        },
        watch: {
            url(val) {
                if (val) {
                    this.urls.push(val);
                }
            }
        },
    };
</script>
