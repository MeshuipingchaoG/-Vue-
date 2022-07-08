<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="请输入关键字" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"  
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import subject from '@/api/subject'
export default {

    data() {
        return {
        filterText: '',
        data2: [],
        defaultProps: {
            children: 'children',
            label: 'title'
        }
        }
    },
    created() {
        this.getSubjectList()
    },
    watch: {
        filterText(val) {
        this.$refs.tree2.filter(val)
        }
    },

    methods: {
        //获得所有分类列表
        getSubjectList() {
            subject.getAllSubjectList().then(response =>{
                console.log('@@@@', response)
                this.data2 = response.data.list
            })
        },
        
        filterNode(value, data) {
        if (!value) return true
        return data.title.toLowerCase().indexOf(value) !== -1
        }
    }
}
</script>