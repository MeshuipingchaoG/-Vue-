<template>
    <div class="app-container">
        <h3 style="text-align: center">发布新课程</h3>
        <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px">
            <el-step title="填写课程基本信息"></el-step>
            <el-step title="创建课程大纲"></el-step>
            <el-step title="发布"></el-step>
        </el-steps>
        <el-form label-width="120px">

        <div class="info">
            <!-- 最终表单 -->
            <h3>课程名称：{{publishInfo.title}}</h3>
            <h3>讲师：{{publishInfo.teacherName}}</h3>
            <h3>课程类型：{{publishInfo.oneSubject}}-----{{publishInfo.twoSubject}}</h3>
            <h3 style="color:red">课程价格：￥{{publishInfo.price}}元</h3>
            <h3>课程简介：{{publishInfo.description}}</h3>
            <h3>课程封面：<img :src="publishInfo.cover" width="350px"></h3>
        </div>
            <el-form-item>
                <el-button style="margin-top: 12px;"
                :disabled="saveBtnDisabled" 
                type="primary" 
                @click="previous">上一步</el-button>
                <el-button style="margin-top: 12px;"
                :disabled="saveBtnDisabled" 
                type="primary" 
                @click="next">发布</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
import course from '@/api/course'
    export default {
        data() {
            return {
                publishInfo: {},
                courseId: '',
                saveBtnDisabled: false
            }
        },
        created() {
            // 获取路由中的id
            if (this.$route.params && this.$route.params.id) {
                this.courseId = this.$route.params.id
            }

            // 执行getPublishInfo()
            this.getPublishInfo()
        },
        methods: {
            previous() {
                this.$router.push({path:'/course/chapter/this.courseId'})
            },
            next() {
                course.updatePublishStatus(this.courseId).then(response => {
                    // 提示发布成功信息
                    this.$message({
                        type: 'success',
                        message: '发布课程成功！'
                    })

                    // 跳转到课程列表
                    this.$router.push({path: '/course/list'})
                })
            },

            getPublishInfo() {
                course.getCoursePublishInfo(this.courseId).then(response => {
                    
                    this.publishInfo = response.data.publish
                    
                })
            }
           
        },

    }
</script>

<style>
.info {
    align-content: center;
    margin-left: 380px;
    
}
</style>