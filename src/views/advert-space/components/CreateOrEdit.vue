<template>
  <div class="advert-create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? '编辑广告位' : '添加广告位' }}</span>
      </div>
      <el-form ref="spaceForm" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="广告位名称" prop="name">
          <el-input v-model="form.name"></el-input>
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
import { saveOrUpdateAdSpace, getSpaceInfo } from '@/services/advert'

export default Vue.extend({
  name: 'AdvertCreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    spaceId: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      form: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入广告位名称', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    if (this.isEdit) {
      this.loadSpaceInfo()
    }
  },

  methods: {
    async loadSpaceInfo () {
      const { data } = await getSpaceInfo({ id: this.spaceId })
      if (data.content) {
        this.form = data.content
      }
    },

    async onSubmit () {
      (this.$refs.spaceForm as any).validate(async (valid: boolean) => {
        if (valid) {
          const { data } = await saveOrUpdateAdSpace(this.form)
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
