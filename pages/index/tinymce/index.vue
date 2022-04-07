<template>
  <div class="components-container">
    <tinymce v-model="content" id="tinymce" :height="300" />
    <div class="editor-content" v-html="content" />
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
export default {
  name: "TinymceDemo",
  components: { Tinymce },
  data() {
    return {
      content: ``,
    };
  },
};
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>
