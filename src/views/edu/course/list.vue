<template>
    <div class="app-container">
        <!-- 表单 -->
        <el-form :inline="true" :model="courseQry" class="demo-form-inline">
            <el-form-item label="课程名称">
                <el-input v-model="courseQry.title" placeholder="请输入课程名称"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="courseQry.status" placeholder="请选择">
                <el-option label="发布" value="Normal"></el-option>
                <el-option label="未发布" value="Draft"></el-option>
                </el-select>
            </el-form-item>
        
            <el-form-item>
                <el-button type="primary" @click="getList()">查询</el-button>
                <el-button type="success" @click="clean()">清空</el-button>
            </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                label="序号"
                align="center"
                width="70">
                <template slot-scope="scope">
                    {{(page - 1) * limit + scope.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column
            prop="title"
            label="课程名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="lessonNum"
            label="课时数"
            width="180">
            </el-table-column>
            <el-table-column
            prop="price"
            label="价格"
            width="180">
            </el-table-column>
            <el-table-column
            label="状态"
            width="180">
            <template slot-scope="scope">
                        {{scope.row.status==='Draft'?'未发布':'发布'}}

                </template>
            </el-table-column>
            <el-table-column
            prop="gmtCreate"
            label="添加时间"
            width="180">
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="openDialog(scope.row.id)">修改</el-button>
                <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="page"
            :page-size="limit"
            :total="total"
            @current-change="getList">
        </el-pagination>

        <!-- ========================================弹框================================ -->
        <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
            <el-form :model="data" label-width="120px">
                <el-form-item label="课程名称">
                    <el-input v-model="data.title"></el-input>
                </el-form-item>
                <el-form-item label="课时数">
                    <el-input-number :min="0" v-model="data.lessonNum" controls-position="right"></el-input-number>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="data.price"></el-input>
                </el-form-item>

                <!-- 发布状态 -->

            </el-form>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateInfo">确 定</el-button>
            </div>
            </el-dialog>
    </div>
</template>

<script>
    import course from '@/api/course'
    export default {
        data() {
            return {
                page: 1,
                limit: 10,
                courseQry: {},
                tableData: [],
                data:{},
                dialogFormVisible: false
            }
        },

        created() {
            this.getList()
        },

        methods: {
            getList(page = 1){
                this.page = page
                course.getAllList(this.page, this.limit, this.courseQry).then(response => {
                    console.log('课程列表', response)
                    this.tableData = response.data.list
                    this.total = response.data.total   
                })
            },

            // 删除
            handleDelete(id) {
                this.$confirm('将要删除课程信息，是否继续？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    course.deleteCourse(id).then(response => {
                    this.$message({
                        type: 'success',
                        message: '删除成功！'
                    })
                    this.getList()
                })
                })
            },

            // 点击确定弹出框
            openDialog(id) {
                console.log(id)
                this.dialogFormVisible = true

                // 回显信息
                course.getListById(id).then(response => {
                    console.log('ccccc', response)
                    this.data = response.data.list
                })
            },

            updateInfo() {
                course.updateList(this.data).then(response => {
                    console.log('更新列表成功', response)
                    this.dialogFormVisible = false
                    this.$message({
                        type: 'success',
                        message: '修改课程信息成功！！！'
                    })
                    this.getList()
                })
            }
        },
    }
</script>

<style>

</style>