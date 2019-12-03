<template>
  <div>
    <Card shadow>
      <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          视频分类
      </p>
      <!-- <a href="#" slot="extra" @click.prevent="changeLimit">
          <Icon type="ios-add-circle-outline" />
          添加分类
      </a> -->
      <Form :model="formItem" :label-width="100">
        <FormItem label="视频标题">
            <Input v-model="formItem.input" placeholder=""></Input>
        </FormItem>
        <FormItem label="视频简介">
            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
        </FormItem>
        <FormItem label="视频分类">
            <RadioGroup v-model="formItem.radio">
                <Radio label="male">显示</Radio>
                <Radio label="female">不显示</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="所属系列">
            <RadioGroup v-model="formItem.radio">
                <Radio label="male">显示</Radio>
                <Radio label="female">不显示</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="审核状态">
            <RadioGroup v-model="formItem.radio">
                <Radio label="male">显示</Radio>
                <Radio label="female">不显示</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="上下架状态">
            <RadioGroup v-model="formItem.radio">
                <Radio label="male">显示</Radio>
                <Radio label="female">不显示</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="所有者">
            <RadioGroup v-model="formItem.radio">
                <Radio label="male">显示</Radio>
                <Radio label="female">不显示</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="图片">
            <uploadPic></uploadPic>
        </FormItem>
        <FormItem label="视频上传形式">
            <RadioGroup v-model="formItem.radio">
                <Radio label="male">视频链接</Radio>
                <Radio label="female">视频文件</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="视频链接">
            <Input v-model="formItem.input" placeholder=""></Input>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'video_form',
  data () {
    return {
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      }
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style>

</style>
