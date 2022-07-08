import request from '@/utils/request'

export default {
    // 添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: `/eduservice/course/addCourseInfo`,
            method: 'post',
            data: courseInfo
        })
    },

    // 通过id查询课程信息
    getCourseInfoById(courseId) {
        return request({
            url: `/eduservice/course/getAllCourseInfoById/${courseId}`,
            method: 'get'
        })
    },

    // 修改课程信息
    updateCourseInfo(courseInfo) {
        return request({
            url: `/eduservice/course/updateCourseInfo`,
            method: 'post',
            data: courseInfo
        })
    },

    // 课程发布最终信息
    getCoursePublishInfo(id) {
        return request({
            url: `/eduservice/course/getCoursePublishInfo/${id}`,
            method: 'get'
        })
    },

    // 最终发布，修改状态
    updatePublishStatus(id) {
        return request({
            url: `/eduservice/course/publishCourse/${id}`,
            method: 'post',
        })
    },

    // 获得课程列表(条件查询)
    getAllList(current, limit, courseQry) {
        return request({
            url: `/eduservice/course/pageCourseCondition/${current}/${limit}`,
            method: 'post',
            data: courseQry
        })
    },

    // 逻辑删除
    deleteCourse(id) {
        return request({
            url: `/eduservice/course/${id}`,
            method: 'delete'
        })
    },

    // 通过id查询课程列表
    getListById(id) {
        return request({
            url: `/eduservice/course/getListById/${id}`,
            method: 'get'
        })
    },

    // 修改课程列表的信息
    updateList(data) {
        return request({
            url: `/eduservice/course/updateList`,
            method: 'post',
            data: data
        })
    }
}