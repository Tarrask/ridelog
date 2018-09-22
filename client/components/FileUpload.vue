<template>
  <div>
    <input type="file" :value="value" @change="$emit('input', value)" :name="name">
      {{ value }}
  </div>
</template>

<script>
export default {
  props: ['value', 'name']
};
</script>
