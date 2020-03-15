<template>
  <div>
    <div v-if="list.length">
      <div>
        <el-row>
          <el-col :span="6">商品信息</el-col>
          <el-col :span="3">尺码/颜色</el-col>
          <el-col :span="3">吊牌价</el-col>
          <el-col :span="3">数量</el-col>
          <el-col :span="3">折扣</el-col>
          <el-col :span="3">总金额</el-col>
          <el-col :span="3">操作</el-col>
        </el-row>
      </div>
      <div v-for="item in list" v-bind:key="item.id">
        <el-row>
          <el-col :span="6">
            <el-checkbox v-model="selectCloth" :label="item.id" @change="item.checked = !item.checked">
              {{ item.name }}
            </el-checkbox>
          </el-col>
          <el-col :span="3">{{ item.size }}/{{ item.color }}</el-col>
          <el-col :span="3">{{ item.price }}</el-col>
          <el-col :span="3" class="ocloth-count">
            <span @click="cutCount(item)">-</span>
            {{ item.count }}
            <span @click="addCount(item)">+</span>
          </el-col>
          <el-col :span="3">{{ item.active }}</el-col>
          <el-col :span="3">{{ item.price * item.count }}</el-col>
          <el-button :span="3" @click="delCloth(item)" size="mini" type="danger" icon="el-icon-delete"></el-button>
        </el-row>
      </div>
    </div>
    <div v-else>
      <el-row>
        <el-col :span="24">购物车中没有商品</el-col>
      </el-row>
    </div>
    <div class="foot-bar">
      <el-row>
        <el-col :span="3">
          <el-checkbox v-model="allChecked" @change="setallCheck">全选</el-checkbox>
        </el-col>
        <el-col :span="3" :offset="9">合计 {{ totalPrice }}</el-col>
        <el-col :span="6">已选商品 {{ totalCount }} 件</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import bus from '../assets/bus.js'
import { mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      allChecked: false,
      selectCloth: [],
      totalCount: 0,
      totalPrice: 0,
      list: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    ...mapMutations(['changeVuexBuycarCount']),
    ...mapActions(['asyncchangeVuexBuycarCount']),
    cutCount (item) {
      if (item.count === 0) {
        return
      }
      item.count--
      this.gettotalCount()
    },
    addCount (item) {
      item.count++
      this.gettotalCount()
    },
    delCloth (item) {
      const index = this.list.findIndex(cloth => {
        return cloth.id === item.id
      })
      this.list.splice(index, 1)
      this.gettotalCount()
    },
    getList () {
      const arr = [
        {
          name: '款式1',
          count: '2',
          size: 'S',
          color: '红色',
          price: '100',
          active: '0.5',
          id: '0'
        },
        {
          name: '款式2',
          count: '2',
          size: 'S',
          color: '红色',
          price: '200',
          active: '0.5',
          id: '1'
        },
        {
          name: '款式3',
          count: '2',
          size: 'S',
          color: '红色',
          price: '300',
          active: '0.5',
          id: '2'
        },
        {
          name: '款式4',
          count: '2',
          size: 'S',
          color: '红色',
          price: '400',
          active: '0.5',
          id: '3'
        }
      ]
      arr.forEach(item => {
        item.checked = false
      })
      this.list = arr
    },
    gettotalCount () {
      let totalCount = 0
      let totalPrice = 0
      this.list.forEach(item => {
        if (item.checked) {
          totalPrice = totalPrice + (parseFloat(item.price).toFixed(2) * parseFloat(item.active) * item.count)
          totalCount = totalCount + parseInt(item.count)
        }
      })
      this.totalCount = totalCount
      this.totalPrice = totalPrice
    },
    setallCheck (val) {
      let selectCloth = []
      if (val) {
        this.list.forEach(item => {
          item.checked = true
          selectCloth.push(item.id)
        })
      } else {
        this.list.forEach(item => {
          item.checked = false
        })
        selectCloth = []
      }
      this.selectCloth = selectCloth
    }
  },
  watch: {
    selectCloth () {
      this.gettotalCount()
      if (this.selectCloth.length === this.list.length) {
        this.allChecked = true
      } else {
        this.allChecked = false
      }
    },
    list: {
      handler: function () {
        let count = 0
        this.list.forEach(item => {
          count += parseInt(item.count)
        })
        bus.$emit('buycarConutCHange', count)
        // this.$store.commit('changeVuexBuycarCount', count)
        // this.changeVuexBuycarCount(count)
        // this.$store.dispatch('asyncchangeVuexBuycarCount', count)
        this.asyncchangeVuexBuycarCount(count)
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="less">
.foot-bar {
    position: fixed;
    margin: auto;
    bottom: 20px;
    width: 100%;
}
.el-row {
  margin-top: 20px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.el-button {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
