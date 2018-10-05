<template lang="html">
  <article class="card" >
    <slot name="image">
      <div class="card-img" :style="{ 'background-image': `url(/api/uploader/thumb/300/${image})` }"></div>
    </slot>
    <div class="card-info">
      <slot>
        <h2>{{ title }}</h2>
        <button @click="$emit('edit-card')">Edit</button>
      </slot>
    </div>
  </article>
</template>

<script>
export default {
  components: {},
  props: {
    'image': {
      type: String
    },
    'title': {
      type: String
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
</style>
