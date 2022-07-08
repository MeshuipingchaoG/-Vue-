<template>
    <div class="app-container">
        <!-- 表单 -->
        <el-form :inline="true" :model="teacherQry" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="teacherQry.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="级别">
                <el-select v-model="teacherQry.level" placeholder="请选择级别">
                <el-option label="高级讲师" value="1"></el-option>
                <el-option label="首席讲师" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="添加时间">
                <el-date-picker 
                    v-model="teacherQry.begin"
                    type="datetime"
                    placeholder="请选择开始时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    default-time="00:00:00"
                ></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-date-picker 
                    v-model="teacherQry.end"
                    type="datetime"
                    placeholder="请选择结束时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    default-time="00:00:00"
                ></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getList()">查询</el-button>
                <el-button type="success" @click="clean()">清空</el-button>
            </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table
            :data="list"
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
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                label="级别"
                width="200">
                <template slot-scope="scope">
                        {{scope.row.level===1?'高级讲师':'首席讲师'}}

                </template>
            </el-table-column>
            <el-table-column
                prop="career"
                label="职位"
                width="180">
            </el-table-column>
            <el-table-column
                prop="gmtCreate"
                label="添加时间"
                width="180">
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <router-link :to="'/teacher/edit/' + scope.row.id">
                    <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                </router-link>
                
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
    </div>
</template>

<script>
import teacher from '@/api/teacher'

    export default {
        data() {
            // 定义变量和初始值
            return {
                list: null,  //查询之后接口返回集合
                page: 1, //当前页
                limit: 10, //每页记录数
                teacherQry:{}
                
            }
        },
        created() {
            // 页面渲染之前执行，一般调用methods定义的方法
            this.getList()

        },
        methods: {
            // 创建具体的方法，调用teacher.js定义的方法
            getList(page = 1){
                this.page = page
                teacher.getTeacherListPage(this.page, this.limit, this.teacherQry)
                .then(response =>{
                    console.log('请求成功',response)
                    this.list = response.data.records
                    this.total = response.data.total
                    console.log(this.list)
                    console.log(this.total)
                })
                .catch(error =>{
                    //请求失败
                    console.log('请求失败',error)
                })
            },
            clean(){
                // 先清空条件框里的数据
                this.teacherQry = {}
                // 在查询所有
                this.getList()
            },
            handleDelete(id){
                //alert(id)
               this.$confirm('此操作将永久删除该教师信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        // 调用删除方法
                        teacher.deleteTeacher(id).then(response =>{
                            // 1 提示信息
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });

                            // 2 回到列表页面
                            this.getList()
                        })
                })
                
            }
            
            
        },
    }
</script>

<style>

</style>