<template>
    <div class="app-container">
        <el-form ref="form" :model="teacher" label-width="120px">
            <el-form-item label="姓名">
                <el-input v-model="teacher.name"></el-input>
            </el-form-item>
            <el-form-item label="级别">
                <el-select v-model="teacher.level" placeholder="请选择教师级别">
                <el-option label="高级讲师" :value="1"></el-option>
                <el-option label="首席讲师" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职位">
                <el-input v-model="teacher.career"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input type="textarea" v-model="teacher.intro"></el-input>
            </el-form-item>

            <!-- 讲师头像 -->
            <el-form-item label="讲师头像">
                <!-- 头衔缩略图 -->
                <pan-thumb :image="teacher.avatar"/>
                <!-- 文件上传按钮 -->
                <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
                </el-button>
                <!--v-show：是否显示上传组件
                :key：类似于id，如果一个页面多个图片上传控件，可以做区分
                :url：后台上传的url地址
                @close：关闭上传组件
                @crop-upload-success：上传成功后的回调 -->
                <image-cropper
                            v-show="imagecropperShow"
                            :width="300"
                            :height="300"
                            :key="imagecropperKey"
                            :url="BASE_API+'/eduoss/fileoss/upload'"
                            field="file"
                            @close="close"
                            @crop-upload-success="cropSuccess"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :disabled="saveBtnDisabled" @click="onSubmit">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import teacher from '@/api/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
    export default {
        data() {
            return {
                teacher:{
                    
                },
                // 保存按钮是否禁用
                saveBtnDisabled:false,
                // 上传弹框是否显示
                imagecropperShow:false,
                // 上传组件的key值
                imagecropperKey:0,
                BASE_API:process.env.BASE_API,
            }
        },
        components : {ImageCropper,PanThumb},
        created(){
            console.log('created')
            this.init()
        },

        watch: {
            $route(to, from) {
                this.init()
            }
        },

        methods:{
            
            init() {
                if (this.$route.params && this.$route.params.id) {
                    const id = this.$route.params.id
                    this.getInfo(id)
                }else {
                    this.teacher = {}
                }
            },

            onSubmit() {
                // 判断是更新操作还是添加操作
                // 调用添加教师方法
                if (this.teacher.id) {
                    this.updateTeacher()
                }else{
                    this.addTeacher()
                }  
            },

            // 添加教师
            addTeacher(){
                teacher.addTeacher(this.teacher).then(response =>{
                    //console.log(response)
                    // 提示信息
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                    // 回到列表
                    this.$router.push({path: '/teacher/table'})
                })
            },

            getInfo(id) {
                teacher.getTeacherInfo(id).then(response =>{
                    this.teacher = response.data.teacher
                })
            },

            // 修改教师信息
            updateTeacher() {
                teacher.updateTeacher(this.teacher).then(response => {
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    // 回到列表
                    this.$router.push({path: '/teacher/table'})
                })
            },
            close(){
                // 关闭弹窗
                this.imagecropperShow = false
                // 上传组件初始化
                this.imagecropperKey = this.imagecropperKey + 1
            },
            cropSuccess(data){
                // 上传成功
                this.teacher.avatar= data.url
                this.imagecropperShow = false
                this.imagecropperKey = this.imagecropperKey + 1

            }

        }
    }
</script>

<style>

</style>