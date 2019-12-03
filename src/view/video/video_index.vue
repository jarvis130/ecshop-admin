<template>
  <div>
    <!--list-->
    <Card shadow v-if="tabIndex == 0">
      <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          视频列表
      </p>
      <a href="#" slot="extra" @click.prevent="editHandle()">
          <Icon type="md-add" />
          添加视频
      </a>
      <i-table border :content="self" :loading="loading" :data="tableData" :columns="columns">
        <slot name="footer" slot="footer">
          <Page :total="40" size="small" show-elevator show-sizer></Page>
        </slot>
      </i-table>
    </Card>
    <!--list-->
    <!--form-->
    <Card shadow v-if="tabIndex == 1">
      <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          {{title}}
      </p>
      <a href="#" slot="extra" @click.prevent="toListHandle()">
          <Icon type="md-list" />
          视频列表
      </a>
      <Form :model="formItem" :label-width="100">
        <FormItem label="视频标题">
            <Input v-model="formItem.title" placeholder=""></Input>
        </FormItem>
        <FormItem label="视频简介">
            <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
        </FormItem>
        <FormItem label="视频分类">
            <Cascader :data="classifyList" v-model="formItem.classifyId"></Cascader>
        </FormItem>
        <FormItem label="视频系列">
          <i-select v-model="formItem.seriesId" multiple>
              <i-option v-for="(item, index) in seriesList" :key="index" :value="item.value">{{ item.label }}</i-option>
          </i-select>
        </FormItem>
        <FormItem label="图片">
            <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
                <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                </template>
                <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
            </div>
            <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
            </Upload>
            <Modal title="View Image" v-model="visible">
                <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
            </Modal>
        </FormItem>
        <FormItem label="视频上传形式">
            <RadioGroup v-model="formItem.video_upload_type">
                <Radio label="0">视频链接</Radio>
                <Radio label="1">视频文件</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="视频链接" v-if="formItem.video_upload_type == '0'">
            <Input v-model="formItem.href" placeholder=""></Input>
        </FormItem>
        <FormItem label="上传视频" v-if="formItem.video_upload_type == '1'">
            <Upload action="//jsonplaceholder.typicode.com/posts/">
                <i-button type="primary" icon="ios-cloud-upload-outline">选择视频文件</i-button>
            </Upload>
        </FormItem>
        <FormItem label="所有者">
            <RadioGroup v-model="formItem.owner">
                <Radio label="0">管理员</Radio>
                <Radio label="1">用户</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="用户" v-if="formItem.owner != '0'">
            <Input v-model="formItem.pubId" placeholder=""></Input>
        </FormItem>
        <FormItem label="审核状态">
            <RadioGroup v-model="formItem.status">
                <Radio label="1">通过</Radio>
                <Radio label="2">不通过</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="上下架状态">
            <RadioGroup v-model="formItem.isdel">
                <Radio label="0">上架</Radio>
                <Radio label="1">下架</Radio>
            </RadioGroup>
        </FormItem>
        <Form-item>
            <i-button type="primary" @click="handleSubmit('formValidate')">提交</i-button>
            <i-button type="default" @click="handleReset('formValidate')" style="margin-left: 8px">重置</i-button>
        </Form-item>
      </Form>
    </Card>
    <!--form-->
  </div>
</template>

<script>
import Tables from '_c/tables'
// import UploadPic from '../../components/upload-pic/upload-pic'
import { getTableData } from '@/api/data'
export default {
  name: 'video_list',
  components: {
    Tables
  },
  data () {
    return {
      self: this,
      loading: true,
      tabIndex: 0,
      title: '新建视频',
      defaultList: [
        {
          'name': 'a42bdcc1178e62b4694c830f028db5c0',
          'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
        },
        {
          'name': 'bc7521e033abdd1e92222d733590f104',
          'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
        }
      ],
      imgName: '',
      visible: false,
      uploadList: [],
      formItem: {
        title: '',
        description: '',
        classifyId: '',
        seriesId: '',
        thumb: '',
        status: '1',
        isdel: '0',
        owner: '0',
        video_upload_type: '0',
        pubId: 0
      },
      classifyList: [{
        value: 'beijing',
        label: '北京',
        children: [
          {
            value: 'gugong',
            label: '故宫'
          },
          {
            value: 'tiantan',
            label: '天坛'
          },
          {
            value: 'wangfujing',
            label: '王府井'
          }
        ]
      }, {
        value: 'jiangsu',
        label: '江苏',
        children: [
          {
            value: 'nanjing',
            label: '南京',
            children: [
              {
                value: 'fuzimiao',
                label: '夫子庙'
              }
            ]
          },
          {
            value: 'suzhou',
            label: '苏州',
            children: [
              {
                value: 'zhuozhengyuan',
                label: '拙政园'
              },
              {
                value: 'shizilin',
                label: '狮子林'
              }
            ]
          }
        ]
      }],
      seriesList: [],
      series: [],
      columns: [
        { title: '序号', type: 'index', align: 'center', width: 60 },
        { title: '发布者', key: 'username' },
        { title: '标题', key: 'title', sortable: true },
        { title: '图片', key: 'thumb' },
        { title: '点赞数', key: 'likes', align: 'center', width: 80 },
        { title: '评论数', key: 'comments', align: 'center', width: 80 },
        { title: '分享数', key: 'shares', align: 'center', width: 80 },
        { title: '审核状态',
          key: 'status',
          align: 'center',
          render: (h, params) => {
            let color = 'success'
            let statusName = '通过'
            if (params.status === 2) {
              color = 'danger'
              statusName = '不通过'
            }
            return h('div', [
              h('Tag', {
                props: {
                  color: color
                }
              }, statusName)
            ])
          }
        },
        { title: '上下架状态',
          key: 'isdel',
          align: 'center',
          render: (h, params) => {
            let color = 'success'
            let statusName = '上架'
            if (params.isdel === 1) {
              color = 'danger'
              statusName = '下架'
            }
            return h('div', [
              h('Tag', {
                props: {
                  color: color
                }
              }, statusName)
            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.onEdit(params.index)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
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
      this.tabIndex = 1
    },
    toListHandle () {
      this.tabIndex = 0
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('提交成功!')
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    onEdit (index) {
      // this.$Modal.info({
      //   title: '用户信息',
      //   content: `姓名：${this.tableData[index].name}<br>年龄：${this.tableData[index].age}<br>地址：${this.tableData[index].address}`
      // })
      this.formItem.title = this.tableData[index].title
      this.formItem.description = this.tableData[index].description
      this.formItem.owner = this.tableData[index].owner + ''
      this.formItem.status = this.tableData[index].status + ''
      this.formItem.isdel = this.tableData[index].isdel + ''
      this.formItem.href = this.tableData[index].href
      this.formItem.classifyId = this.tableData[index].classifyId + ''
      this.formItem.seriesId = this.tableData[index].seriesId + ''
      this.tabIndex = 1
    },
    remove (index) {
      this.data6.splice(index, 1)
    },
    getSeriesData () {
      let seriesList = [
        {
          value: '1',
          label: '系列1'
        },
        {
          value: '2',
          label: '系列2'
        },
        {
          value: '3',
          label: '系列3'
        },
        {
          value: '4',
          label: '系列4'
        },
        {
          value: '5',
          label: '系列5'
        },
        {
          value: '6',
          label: '系列6'
        }
      ]
      this.seriesList = seriesList
    },
    getClassifyData () {
      let list = [
        {
          value: '1',
          label: '系列1'
        },
        {
          value: '2',
          label: '系列2'
        },
        {
          value: '3',
          label: '系列3'
        },
        {
          value: '4',
          label: '系列4'
        },
        {
          value: '5',
          label: '系列5'
        },
        {
          value: '6',
          label: '系列6'
        }
      ]
      this.classifyList = list
    },
    handleView (name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess (res, file) {
      file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar'
      file.name = '7eb99afb9d5f317c912f08b5212fd69a'
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        })
      }
      return check
    }
  },
  mounted () {
    getTableData().then(res => {
      this.tableData = res.data
      this.loading = false
    })
    this.uploadList = this.$refs.upload.fileList
    this.getSeriesData()
    this.getClassifyData()
  }
}
</script>

<style lang="less">
  Form{
    width: 50%;
  }
</style>
