<template>
    <div class="app-container">
        <h3 style="text-align: center">发布新课程</h3>
        <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px">
            <el-step title="填写课程基本信息"></el-step>
            <el-step title="创建课程大纲"></el-step>
            <el-step title="发布"></el-step>
        </el-steps>

        <el-form label-width="120px">
            <el-input v-model="filterText" placeholder="请输入关键字" style="margin-bottom:30px;" />

            <el-button type="text" @click="openChapterDialog()">添加章节</el-button>

            <el-tree
                ref="tree2"  
                :data="data2"
                :props="defaultProps"
                :filter-node-method="filterNode"
                class="filter-tree"
                default-expand-all
                >
                
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                        <span>
                            <el-button
                                type="primary"
                                size="mini"
                                round
                                @click="() => openEditDialog(data)">
                                编辑
                            </el-button>
                            <el-button
                                type="danger "
                                size="mini"
                                round
                                @click="() => deleteChapter(data)">
                                删除
                            </el-button>
                            <el-button
                                type="success"
                                size="mini"
                                plain
                                round
                                @click="() => openVideoDialog(data)">
                                添加小节
                            </el-button>
                        </span>
                </span>
            </el-tree>
            

            

            <el-form-item>
                <el-button style="margin-top: 12px;"
                :disabled="saveBtnDisabled" 
                type="primary" 
                @click="previous">上一步</el-button>
                <el-button style="margin-top: 12px;"
                :disabled="saveBtnDisabled" 
                type="primary" 
                @click="next">下一步</el-button>
            </el-form-item>
        </el-form>
    
        <!-- 添加和修改章节的表单 -->
        <el-dialog title="添加章节" :visible.sync="dialogFormVisible">
            <el-form :model="chapter" label-width="120px">
                <el-form-item label="章节标题">
                    <el-input v-model="chapter.title"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number :min="0" v-model="chapter.sort" controls-position="right"></el-input-number>
                </el-form-item>
            </el-form>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
            </div>
            </el-dialog>

        <!-- 添加和修改小节的表单 -->
       <!--  <el-dialog title="添加小节" :visible.sync="dialogFormVisible">
            <el-form :model="video" label-width="120px">
                <el-form-item label="小节标题">
                    <el-input v-model="video.title"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number :min="0" v-model="video.sort" controls-position="right"></el-input-number>
                </el-form-item>
            </el-form>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addVideo">确 定</el-button>
            </div>
            </el-dialog> -->
    </div>
</template>

<script>
    import video from '@/api/video'
    import chapter from '@/api/chapter'
    export default {
        data() {
            return {
                filterText: '',
                data2: [],
                courseId: '',
                defaultProps:{
                    children: 'children',
                    label: 'title'
                },
                chapter: {

                },
                video: {

                },
                saveBtnDisabled: false,
                dialogFormVisible: false   //弹框的值
            }
        },
        created() {
            // 获取路由里的id值
            if(this.$route.params && this.$route.params.id){
                this.courseId = this.$route.params.id
                
                // 根据课程id获取章节
                this.getChapterVideo()
                
            }
            
           
        },
        watch: {
            filterText(val) {
            this.$refs.tree2.filter(val)
            }
        },
        methods: {
            // ======================操作小节==============================================
            // 弹框
           /*  openVideoDialog(data) {
                this.dialogFormVisible = true
                this.chapter = {}
                console.log('data是什么',data)
                // 设置章节id
                this.video.chapterId = data.id
            },

            // 添加小节
            addVideo() {
                // 设置课程id
                this.video.courseId = this.courseId
                video.addVideo(this.video).then(response => {
                    console.log('ddddd', response)
                    // 提示添加成功
                    this.$message({
                        type: 'success',
                        message: '添加小节成功！'
                    })
                    // 关闭弹窗
                    this.dialogFormVisible = false
                    // 刷新页面
                    this.getChapterVideo()
                    // 清空弹窗
                    this.video = {}
                })

            }, */




            // ======================操作章节==============================================
            previous() {
                this.$router.push({path:'/course/info/' + this.courseId})
            },
            next() {
                // 调到第二步
                this.$router.push({path:'/course/publish/' + this.courseId})
            },

            // 根据课程id获取章节
            getChapterVideo() {
                chapter.getAllChapterVideo(this.courseId).then(response => {
                    //console.log('***', response)
                    this.data2 = response.data.chapterVideoList
                })
            },

            // 弹框
            openChapterDialog() {
                this.dialogFormVisible = true
                this.chapter = {}
            },

            saveOrUpdate() {
                // 添加章节
                if(this.chapter.id) {
                    this.updateChapter()
                } else {
                    this.saveChapter()
                }
                
            },
            // 添加章节
            saveChapter() {
                // 设置课程id到chapter对象中
                this.chapter.courseId = this.courseId

                chapter.addChapter(this.chapter).then(response => {
                    //console.log('添加章节', response)

                    // 1 点击确定，关闭弹框
                    this.dialogFormVisible = false   //弹框的值
                    // 2 提示添加成功
                    this.$message({
                        type: 'success',
                        message: '添加章节成功！'
                    })
                    // 3 刷新页面
                    this.getChapterVideo()
                })
            },
            // 修改前的预备操作，弹框回显
            openEditDialog(data) {
                console.log('打印data',data)
                // 1 查询所选id对应的信息
                chapter.getInfoById(data.id).then(response => {
                    //console.log('打印r', response)
                    this.chapter = response.data.chapter
                })
                // 弹框回显数据
                this.openChapterDialog()
                // 2 进行修改  
            },
            updateChapter() {
                chapter.updateChapterInfo(this.chapter).then(response => {
                   // console.log('打印dddd', response)
                    // 提示修改成功
                    this.$message({
                        type: 'success',
                        message: '修改章节信息成功！'
                    })
                    // 关闭弹框
                    this.dialogFormVisible = false
                    // 刷新页面
                    this.getChapterVideo()
                })
            },
            
            // 删除章节
            deleteChapter(data) {
                console.log('打印data',data)
                chapter.deleteChapter(data.id).then(response => {
                    // 提示删除成功
                    this.$message({
                        type: 'success',
                        message: '删除章节成功！'
                    })

                    // 关闭弹窗
                    this.dialogFormVisible = false
                    // 刷新页面
                    this.getChapterVideo()
                })
            },

            filterNode(value, data) {
                if (!value) return true
                return data.title.toLowerCase().indexOf(value) !== -1
            }
        },

    }
</script>

<style>

</style>