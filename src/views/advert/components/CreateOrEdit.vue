<template>
  <div class="advert-create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? '编辑广告' : '添加广告' }}</span>
      </div>
      <el-form ref="adForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="广告名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="广告位置" prop="spaceId">
          <el-select v-model="form.spaceId" placeholder="请选择">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in spaceList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="date"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="到期时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="date"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="上线/下线" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="0">下线</el-radio>
            <el-radio :label="1">上线</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="广告图片" prop="img">
          <course-image
            :limit="0.15"
            v-model="form.img"
          />
          <p class="tip">建议尺寸：230*300px，JPG、PNG格式，图片小于150k</p>
        </el-form-item>
        <el-form-item label="广告链接" prop="link">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item label="广告备注" prop="text">
          <el-input
            type="textarea"
            :rows="6"
            v-model="form.text"
            placeholder="选择输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button
            v-if="!isEdit"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllSpaces, saveOrUpdateAd } from '@/services/advert'
import CourseImage from '@/views/course/components/CourseImage.vue'

export default Vue.extend({
  name: 'AdvertCreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CourseImage
  },
  data () {
    return {
      form: {
        endTime: '',
        img: null,
        link: '',
        name: '',
        sort: 0,
        spaceId: '',
        startTime: '',
        status: 0,
        text: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入广告名称', trigger: 'blur' }
        ],
        startTime: [
          { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        endTime: [
          { type: 'date', required: true, message: '请选择到期时间', trigger: 'change' }
        ],
        link: [
          { required: true, message: '请输入广告链接', trigger: 'change' }
        ]
      },
      spaceList: []
    }
  },

  created () {
    this.loadSpaces()
  },

  methods: {
    async loadSpaces () {
      const { data } = await getAllSpaces()
      if (data.content) {
        this.spaceList = data.content
      }
    },

    async onSubmit () {
      (this.$refs.adForm as any).validate(async (valid: boolean) => {
        if (valid) {
          const { data } = await saveOrUpdateAd(this.form)
          if (data.success) {
            this.$message.success('提交成功')
            this.$router.back()
          }
        } else {
          return false
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.advert-create {
  .tip {
    line-height: 20px;
    padding: 0;
    margin: 0;
  }
}
</style>
