<template>
    <div class="app-container">
        <h3 style="text-align: center">发布新课程</h3>
        <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px">
            <el-step title="填写课程基本信息"></el-step>
            <el-step title="创建课程大纲"></el-step>
            <el-step title="发布"></el-step>
        </el-steps>
        <el-form label-width="120px">

            <el-form-item label="课程名称">
                <el-input v-model="courseInfo.title" placeholder="请输入课程名称"></el-input>
            </el-form-item>

            <!-- 所属分类 TODO -->
            <!--  一级分类 -->
            <el-form-item label="课程分类">
                <el-select v-model="courseInfo.subjectParentId" placeholder="一级分类" @change="subjectLeveOneChanged">
                    <el-option v-for="subject in subjectList"
                                :key="subject.id" 
                                :value="subject.id"
                                :label="subject.title"></el-option>
                </el-select>

                <!-- 二级分类 -->
                <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
                    <el-option v-for="subjectChildren in subjectChildrenList"
                                :key="subjectChildren.id" 
                                :value="subjectChildren.id"
                                :label="subjectChildren.title"></el-option>
                </el-select>
            </el-form-item>

            <!-- 课程讲师 TODO -->
            <el-form-item label="课程讲师">
                <el-select v-model="courseInfo.teacherId" placeholder="请选择讲师">
                    <el-option v-for="teacher in teacherList"
                                :key="teacher.id" 
                                :value="teacher.id"
                                :label="teacher.name"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="总课时">
                <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right"></el-input-number>
            </el-form-item>

            <el-form-item label="课程简介">
                <el-input type="textarea" v-model="courseInfo.description"></el-input>
            </el-form-item>

            <!--  课程封面 -->
            <el-form-item label="课程封面">
                <el-upload :show-file-list="false" 
                            :on-success="handleAvatarSuccess" 
                            :before-upload="beforeAvatarUpload"
                            :action="BASE_API + '/eduoss/fileoss/upload'"
                            class="avatar-uploader">
                        <img :src="courseInfo.cover" width="200px">
                </el-upload>
            </el-form-item>

            <el-form-item label="价格">
                <el-input-number :min="0" v-model="courseInfo.price" controls-position="right"></el-input-number>
            </el-form-item>

            <el-form-item>
                <el-button style="margin-top: 12px;"
                :disabled="saveBtnDisabled" 
                type="primary" 
                @click="saveOrUpdate">下一步</el-button>

            </el-form-item>
        </el-form>
    
    </div>
</template>

<script>
    import course from '@/api/course'
    import teacher from '@/api/teacher'
    import subject from '@/api/subject'
    export default {
        data() {
            return {
                courseInfo: {
                    cover: '/static/默认封面.jpeg'
                },
                courseId: '',
                teacherList: [],
                subjectList: [],
                subjectChildrenList: [],
                saveBtnDisabled: false,
                BASE_API: process.env.BASE_API,
            }
        },
        created() {
            
            this.init()
        },
        watch: {
            $route(to, from) {
                this.init()
            }
        },

        methods: {

            init() {
                // 获取路由的id值
                if(this.$route.params && this.$route.params.id){
                this.courseId = this.$route.params.id
                
                // 通过id查询课程信息
                this.getCourseInfoById()

            }else {
                this.getAllTeacher()
                this.getAllSubject()
                this.courseInfo = {
                    cover: '/static/默认封面.jpeg'
                }
            }

            },
            // 点击某个一级分类，触发change，显示对应的二级分类
            subjectLeveOneChanged(value) {
                // value 是一级分类的id
                //console.log('@@@', value)
                // 遍历所有的分类，包含一级和二级
                for (let i = 0; i <this.subjectList.length; i++) {
                    const oneSubject = this.subjectList[i];
                    if (oneSubject.id === value) {
                        this.subjectChildrenList = oneSubject.children
                        
                    }
                    
                }

            },
            addCourse() {
                course.addCourseInfo(this.courseInfo).then(response => {
                    //console.log('###', response)
                    // 得到课程id
                    const id = response.data.courseId
                    console.log(id)
                    // 提示成功
                    this.$message({
                        type: 'success',
                        message: '添加课程信息成功'
                    })
                     // 调到第二步
                    this.$router.push({path:'/course/chapter/' + id})
                })
            },
            updateCourse() {
                course.updateCourseInfo(this.courseInfo).then(response => {
                    this.$message({
                        type: 'success',
                        message: '修改课程信息成功！'
                    })
                    // 返回到添加大纲列表
                    this.$router.push({path: '/course/chapter/' + this.courseId})
                })
            },
            saveOrUpdate() {
                // 通过是否有id值来判断是添加还是修改操作， 没有id值是添加操作
                if (this.courseInfo.id) {
                    this.updateCourse()
                } else {
                    this.addCourse()
                }
               
            },
            
            // 查询所有教师
            getAllTeacher() {
                teacher.getAllTeacher().then(response => {
                    //console.log('所有老师信息', response)
                    this.teacherList = response.data.items
                })
            },

            // 查询所有一级二级分类
            getAllSubject() {
                subject.getAllSubjectList().then(response => {
                    //console.log('所有课程分类', response)
                    this.subjectList = response.data.list
                })
            },

            // 根据id查询课程信息
            getCourseInfoById() {
                course.getCourseInfoById(this.courseId).then(response => {
                    console.log('通过id查课程', response)
                    this.courseInfo = response.data.courseInfoVo

                    // 查询所有分类，包含一级二级
                    subject.getAllSubjectList().then(response => {
                    //console.log('所有课程分类', response)
                        this.subjectList = response.data.list
                        for (let i = 0; i < this.subjectList.length; i++) {
                            const subjectList = this.subjectList[i];

                            if (this.courseInfo.subjectParentId == subjectList.id) {
                                this.subjectChildrenList = subjectList.children
                            }
                            
                        }
                    })
                    // 初始化讲师
                    this.getAllTeacher()
                })
            },

            // 上传成功方法
            handleAvatarSuccess(res, file) {
                this.courseInfo.cover =res.data.url
            },

            // 上传之前的方法
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg'
                const isLt2M = file.size / 1024 / 1024 < 2

                if(!isJPG) {
                    this.$message.error('上传图片只能是JPG格式！');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过2M')
                }
                return isJPG && isLt2M
            }
        },

    }
</script>

<style>

</style>