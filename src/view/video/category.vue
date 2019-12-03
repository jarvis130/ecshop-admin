<template>
  <div>
    <Card shadow>
      <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          分类管理
      </p>
      <a href="#" slot="extra" @click.prevent="editHandle()">
          <Icon type="ios-add-circle-outline" />
          添加分类
      </a>
      <tree-table expand-key="title" :expand-type="false" :selectable="false" :columns="columns" :data="data" >
        <template slot="operate" slot-scope="scope">
          <a href="#" @click="handle(scope)">转移</a>
          |
          <a href="#" @click="handle(scope)">编辑</a>
          |
          <a href="#" @click="handle(scope)">移除</a>
        </template>
      </tree-table>
    </Card>
    <!--modal-->
    <Modal
      :title=title
      v-model="modalForm"
      :closable="false">
      <Form :model="formItem" :label-width="80">
        <FormItem label="分类名称">
            <Input v-model="formItem.input" placeholder=""></Input>
        </FormItem>
        <FormItem label="上级分类">
            <Select v-model="formItem.select">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="是否显示">
            <RadioGroup v-model="formItem.radio">
                <Radio label="male">显示</Radio>
                <Radio label="female">不显示</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="排序">
            <Input v-model="formItem.orderSort" placeholder=""></Input>
        </FormItem>
        <FormItem label="简述">
            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
        </FormItem>
      </Form>
    </Modal>
    <!--modal-->
  </div>
</template>

<script>
import { getVideoCategoryData } from '../../api/video_category'
export default {
  name: 'video_category',
  data () {
    return {
      modalForm: false,
      title: '新建分类',
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        textarea: '',
        orderSort: 0
      },
      columns: [
        {
          title: '分类名称',
          key: 'title',
          width: '400px'
        },
        {
          title: '视频数量',
          key: 'num',
          width: '100px'
        },
        {
          title: '是否显示',
          key: 'isdisplay',
          minWidth: '100px'
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
          operate: ['football', 'basketball'],
          children: [
            {
              title: '大家电',
              num: '2',
              isdisplay: '显示',
              operate: ['football', 'basketball'],
              children: [
                {
                  title: '洗衣机',
                  num: '3',
                  isdisplay: '显示',
                  operate: ['football', 'basketball']
                },
                {
                  title: '电视机',
                  num: '2',
                  isdisplay: '显示',
                  operate: ['football', 'basketball']
                }
              ]
            }
          ]
        },
        {
          title: '数码时尚',
          num: '10',
          isdisplay: '显示',
          operate: ['football', 'basketball'],
          children: [
            {
              title: '耳机',
              num: '10',
              isdisplay: '显示',
              operate: ['football', 'basketball'],
              children: [
                {
                  title: '苹果',
                  num: '10',
                  isdisplay: '显示',
                  operate: ['football', 'basketball']
                },
                {
                  title: '三星',
                  num: '10',
                  isdisplay: '显示',
                  operate: ['football', 'basketball']
                }
              ]
            }
          ]
        }
      ]
    }
  },
  created () {
    this.getVideoCategoryList()
  },
  methods: {
    handle (scope) {
      console.log(scope)
    },
    getVideoCategoryList () {
      getVideoCategoryData().then(res => {
        debugger
        this.data = res.data.data
      }).catch(err => {
        reject(err)
      })
    },
    editHandle () {
      this.modalForm = true
    }
  }
}
</script>

<style>

</style>
