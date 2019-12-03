<template>
  <div>
    <Card>
      <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          视频列表
      </p>
      <a href="#" slot="extra" @click.prevent="editHandle()">
          <Icon type="ios-add-circle-outline" />
          添加视频
      </a>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
    <!--modal-->
    <Modal
      :title=title
      v-model="modalForm"
      :mask-closable="false"
      width="650"
      :closable="false">
      
    </Modal>
    <!--modal-->
  </div>
</template>

<script>
import Tables from '_c/tables'
import UploadPic from '../../components/upload-pic/upload-pic'
import { getTableData } from '@/api/data'
export default {
  name: 'video_list',
  components: {
    Tables, UploadPic
  },
  data () {
    return {
      modalForm: false,
      title: '新建视频',
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        textarea: '',
        orderSort: 0
      },
      columns: [
        { title: 'Name', key: 'name', sortable: true },
        { title: 'Email', key: 'email', editable: true },
        { title: 'Create-Time', key: 'createTime' },
        {
          title: 'Handle',
          key: 'handle',
          options: ['delete'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }, [
                h('Button', '自定义删除')
              ])
            }
          ]
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    editHandle () {
      // this.modalForm = true
      this.$router.push({path:'/video/video_list/video_form'})
    }
  },
  mounted () {
    getTableData().then(res => {
      this.tableData = res.data
    })
  }
}
</script>

<style lang="less">
    .ivu-modal{
        top: 10px;
    }
</style>
