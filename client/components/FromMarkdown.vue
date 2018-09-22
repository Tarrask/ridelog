<template>
<section v-html="toHtml" class="markdown">
</section>
</template>

<script>
import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt({
  html: true,
  typographer: true
});
markdown.use(require('markdown-it-deflist'));
markdown.use(require('markdown-it-checkbox'));

export default {
  props: {
    'text': { type: String, required: true }
  },
  computed: {
    toHtml() {
      return this.text ? markdown.render(this.text) : '';
    }
  }
};
</script>
