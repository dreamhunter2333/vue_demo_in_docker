<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      active-text-color="#545c64"
      router
    >
      <el-menu-item index="/home/buycar">
        <el-badge :value="VuexBuycarCount" class="item">
            购物车 {{ buycarConut }}
        </el-badge>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="/home/about">About</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4">
        <a href="https://www.ele.me" target="_blank">订单管理</a>
      </el-menu-item>
      <el-menu-item index="4">
        <el-button @click="foldNav" size="mini" icon="el-icon-arrow-up">{{ userName }}</el-button>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import bus from '../assets/bus.js'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Nav',
  props: {
    NavactiveIndex: String
  },
  data () {
    return {
      activeIndex: '/home/buycar',
      activeIndex2: '123',
      buycarConut: 0
    }
  },
  created () {
    bus.$on('buycarConutCHange', (num) => {
      this.buycarConut = num
    })
  },
  computed: {
    ...mapState(['VuexBuycarCount']),
    ...mapGetters(['userName'])
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    foldNav () {
      this.$emit('fromNavval', this.activeIndex2)
    }
  }
}
</script>
