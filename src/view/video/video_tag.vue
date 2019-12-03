<template>
  <div>
    <Card shadow>
      <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          视频标签
      </p>
      <a href="#" slot="extra" @click.prevent="addHandle()">
          <Icon type="ios-add-circle-outline" />
          添加标签
      </a>
      <tree-table :expand-type="false" :selectable="false" :columns="columns" :data="data" >
        <template slot="operate" slot-scope="scope">
          <a href="#" @click="handle(scope)">转移</a>
          |
          <a href="#" @click="editHandle(scope)">编辑</a>
          |
          <a href="#" @click="delHandle(scope)">移除</a>
        </template>
      </tree-table>
    </Card>
    <!--modal-->
    <Modal
      :title=title
      v-model="modalForm"
      :closable="false">
      <Form :model="formItem" :label-width="80">
        <FormItem label="标签名称">
            <Input v-model="formItem.title" placeholder=""></Input>
        </FormItem>
        <!-- <FormItem label="是否显示">
            <RadioGroup v-model="formItem.radio">
                <Radio label="male">显示</Radio>
                <Radio label="female">不显示</Radio>
            </RadioGroup>
        </FormItem> -->
        <FormItem label="视频数量">
            <Input v-model="formItem.videos" placeholder=""></Input>
        </FormItem>
        <FormItem label="排序">
            <Input v-model="formItem.order_sort" placeholder=""></Input>
        </FormItem>
        <FormItem label="简述">
            <Input v-model="formItem.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
        </FormItem>
      </Form>
    </Modal>
    <!--modal-->
  </div>
</template>

<script>
import { getVideoTagData, deleteTag } from '../../api/video_tag'
export default {
  components: {
    getVideoTagData,
    deleteTag
  },
  data () {
    return {
      modalForm: false,
      title: '新建系列',
      formItem: {
        title: '',
        // radio: 'male',
        videos: 0,
        desc: '',
        order_sort: 0
      },
      columns: [
        {
          title: '标签名称',
          key: 'title',
          width: '300px'
        },
        {
          title: '视频数量',
          key: 'videos',
          width: '150px'
        },
        {
          title: '排序',
          key: 'order_sort',
          minWidth: '150px'
        },
        {
          title: '操作',
          key: 'operate',
          minWidth: '',
          type: 'template',
          template: 'operate'
        }
      ],
      data: [
        {
          title: '家用电器',
          num: '10',
          isdisplay: '显示',
          operate: ['football', 'basketball']
        },
        {
          title: '数码时尚',
          num: '10',
          isdisplay: '显示',
          operate: ['football', 'basketball']
        }
      ]
    }
  },
  mounted () {
    this.getVideoCategoryList()
  },
  methods: {
    handle (scope) {
      console.log(scope)
    },
    getVideoCategoryList () {
      getVideoTagData().then(res => {
        this.data = res.data.data
      })
    },
    addHandle (scope) {
      this.modalForm = true
    },
    editHandle (scope) {
      this.formItem.title = scope.row.title
      this.formItem.videos = scope.row.videos
      this.formItem.desc = scope.row.desc
      this.formItem.order_sort = scope.row.order_sort
      this.modalForm = true
    },
    delHandle (scope) {
      deleteTag(id, is_delete).then(res => {
      })
    }
  }
}
</script>

<style>

</style>
