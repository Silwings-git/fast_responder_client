<template>
  <el-menu
    id="rootMenu"
    default-active="4"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item index="1" :route="{ name: 'JsonTools' }"
      >JSON工具</el-menu-item
    >
    <el-menu-item index="2" :route="{ name: 'Crypto' }"
      >编解码工具</el-menu-item
    >
    <el-menu-item index="3" :route="{ name: 'Annotation' }"
      >实体类转换</el-menu-item
    >
    <el-menu-item index="4" :route="{ name: 'ResponderIndex' }"
      >应答器</el-menu-item
    >
  </el-menu>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
