<template>
  <div class="advert-list">
    <el-card>
      <div slot="header">
        <el-button
          @click="$router.push({
            name: 'advert-create'
          })"
        >添加广告</el-button>
      </div>
      <el-table
        :data="advertList"
        v-loading="loading"
        style="width: 100%; margin-bottom: 20px"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="广告名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="spaceId"
          label="广告位置">
        </el-table-column>
        <el-table-column
          prop="img"
          label="广告图片">
          <template slot-scope="scope">
            <img :src="scope.row.img" style="width: 100px;"/>
          </template>
        </el-table-column>
        <el-table-column
          label="时间">
          <template slot-scope="scope">
            <div>开始时间 {{scope.row.startTime}}</div>
            <div>到期时间 {{scope.row.endTime}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="上线/下线">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :disabled="scope.row.isStatusLoading"
              @change="onStateChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="操作"
          width="180"
          align="center"
        >
           <template slot-scope="scope">
            <el-button
              @click="$router.push({
                name: 'course-edit',
                params: {
                  courseId: scope.row.id
                }
              })"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :disabled="loading"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getQueryAdvert, changeAdvertStatus } from '@/services/advert'

export default Vue.extend({
  name: 'AdverteList',
  data () {
    return {
      filterParams: {
        pageNum: 1,
        pageSize: 10,
        status: ''
      },
      courses: [],
      advertList: [],
      totalCount: 0,
      loading: true
    }
  },

  created () {
    this.loadAdvert()
  },

  methods: {
    async loadAdvert () {
      this.loading = true
      const { data } = await getQueryAdvert(this.filterParams)
      console.log(data)
      this.advertList = data.content
      this.totalCount = data.content.length
      this.loading = false
    },

    handleCurrentChange (page: number) {
      this.filterParams.pageNum = page
      this.loadAdvert()
    },

    async onStateChange (advert: any) {
      advert.isStatusLoading = true
      await changeAdvertStatus({
        id: advert.id,
        status: advert.status
      })
      this.$message.success(`${advert.status === 0 ? '下架' : '上架'}成功`)
      advert.isStatusLoading = false
      this.loadAdvert()
    }
  }
})
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}
</style>
