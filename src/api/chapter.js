import request from '@/utils/request'

export default {
    // 显示章节
    getAllChapterVideo(courseId) {
        return request({
            url: `/eduservice/chapter/getChapterVideo/${courseId}`,
            method: 'get',
        })
    },

    // 添加章节
    addChapter(chapter){
        return request({
            url: `/eduservice/chapter/addChapter`,
            method: 'post',
            data: chapter
        })
    },

    // 通过章节id查询信息，用来回显
    getInfoById(chapterId){
        return request({
            url: `/eduservice/chapter/getChapterById/${chapterId}`,
            method: 'get'
        })

    },

    // 修改章节
    updateChapterInfo(chapter){
        return request({
            url: `/eduservice/chapter/updateChapter`,
            method: 'post',
            data: chapter
        })
    },

    // 删除章节
    deleteChapter(chapterId){
        return request({
            url: `/eduservice/chapter/${chapterId}`,
            method: 'delete'
        })
    }
}