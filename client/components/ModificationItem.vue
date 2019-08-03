<template lang="html">
  <div class="input-group">
    <select v-model="selectedType">
      <optgroup v-for="group in sortedGroups" :label="group" :key="group">
        <option v-for="type in typesByGroup[group]" :key="type.id" :value="type.id">{{ type.name }}</option>
      </optgroup>
    </select>
    <select v-model="modification.id">
      <option v-for="article in articlesByType[selectedType]" :key="article.id" :value="article.id">{{ article.name }}</option>
    </select>
    <input type="number" placeholder="price" v-model="modification.price">
    <button class="btn" @click.prevent="$emit('delete-item')">X</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {},
  props: {
    modification: Object,
    default: {}
  },
  data() {
    return {
      selectedType: null
    };
  },
  computed: {
    ...mapGetters([
      'sortedGroups', 'typesByGroup', 'articlesByType'
    ])
  },
  watch: {
    selectedType(newVal) {

    }
  }
};
</script>

<style lang="scss">
</style>
