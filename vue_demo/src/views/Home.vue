<template>
  <div class="home">
    <Nav v-if="navOpen" :NavactiveIndex="activeIndex" @fromNavval="fromNavval"></Nav>
    <div v-else>
      <el-button @click="unfoldNav" size="mini" type="primary" icon="el-icon-arrow-down"></el-button>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Nav from './Nav.vue'

export default {
  name: 'Home',
  components: {
    Nav
  },
  data () {
    return {
      activeIndex: 'ccc',
      activeIndex2: '1',
      navOpen: true
    }
  },
  methods: {
    fromNavval (val) {
      this.activeIndex2 = val
      this.navOpen = false
    },
    unfoldNav () {
      this.navOpen = true
    }
  }
}
</script>
