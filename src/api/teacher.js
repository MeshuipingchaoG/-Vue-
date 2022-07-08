import request from '@/utils/request'


export default {

    // 1 讲师列表 (条件查询分页)
    getTeacherListPage(current, limit, teacherQry) {
        return request({
            url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            //teacherQry条件对象，后端使用RequestBody获取数据
            // data表示把对象转换json进行传递到接口里面
            data: teacherQry
          })
    },

    // 2 删除教师
    deleteTeacher(id) {
        return request({
            url: `/eduservice/teacher/${id}`,
            method: 'delete',
        })
    },

    // 3 添加教师
    addTeacher(teacher){
        return request({
            url: `/eduservice/teacher/addTeacher`,
            method: 'post',
            data: teacher
        })
    },

    // 4 通过ID获取教师信息
    getTeacherInfo(id){
        return request({
            url: `/eduservice/teacher/getTeacher/${id}`,
            method: 'get'
        })
    },

    // 5 修改教师信息
    updateTeacher(teacher){
        return request({
            url: `/eduservice/teacher/updateTeacher`,
            method: 'post',
            data: teacher
        })
    },

    // 6 查询所有教师列表
    getAllTeacher() {
        return request({
            url: `/eduservice/teacher/findAll`,
            method: 'get',
        })
    }

}
