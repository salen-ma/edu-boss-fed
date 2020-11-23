<template>
  <div class="advert-list">
    <el-card>
      <div slot="header">
        <el-button
          @click="$router.push({
            name: 'advert-space-create'
          })"
        >添加广告位</el-button>
      </div>
      <el-table
        :data="spaceList"
        v-loading="loading"
        style="width: 100%; margin-bottom: 20px"
      >
        <el-table-column
          prop="spaceKey"
          label="spaceKey">
        </el-table-column>
        <el-table-column
          prop="name"
          label="广告位名称">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
          align="center"
        >
           <template slot-scope="scope">
            <el-button
              @click="$router.push({
                name: 'advert-space-edit',
                params: {
                  spaceId: scope.row.id
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
import { getAllSpaces } from '@/services/advert'

export default Vue.extend({
  name: 'AdverteList',
  data () {
    return {
      filterParams: {
        pageNum: 1,
        pageSize: 10,
        status: ''
      },
      spaceList: [],
      totalCount: 0,
      loading: true
    }
  },

  created () {
    this.loadSpace()
  },

  methods: {
    async loadSpace () {
      this.loading = true
      const { data } = await getAllSpaces()
      if (data.content.length) {
        this.spaceList = data.content
        this.totalCount = data.content.length
      }
      this.loading = false
    },

    handleCurrentChange (page: number) {
      this.filterParams.pageNum = page
      this.loadSpace()
    }
  }
})
</script>
