<template lang="html">
<div>
  <div class="card-page">
    <base-card
        v-for="bike in bikes"
        :key="bike.id"
        :image="bike.pictures[0]"
        @click.native="editBike(bike)"
        @edit-card="editBike(bike)">
      <h3 class="brand">{{ brandsById[bike.brand].name }}</h3>
      <h2>{{ bike.name }}</h2>
    </base-card>
    <base-card @click.native="newBike">
      <template slot="image">
        <div class="card-img add-image">
          <fa-icon name="plus" scale="5"></fa-icon>
        </div>
      </template>
      <div class="center">
        <button class="btn">Ajouter un vélo</button>
      </div>
    </base-card>
  </div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import BaseCard from '@/components/BaseCard';

export default {
  components: { BaseCard },
  data() {
    return {
      addIcon: require('vue-awesome/icons/plus')
    };
  },
  computed: {
    ...mapState(['bikes']),
    ...mapGetters(['brandsById'])
  },
  methods: {
    details(bike) {
      this.$router.push(`/bike/view/${bike.id}`);
    },
    editBike(bike) {
      this.$store.commit('EDIT_BIKE', bike);
      this.$router.push('/bike/edit');
    },
    newBike() {
      this.$store.commit('EDIT_BIKE');
      this.$router.push('/bike/edit');
    },
    async deleteBike(bike) {
      this.$store.dispatch('deleteBike', bike);
    }
  }
};
</script>

<style lang="scss">
.card {
  .card-img.add-image {
    background: #f6f6f1;
    border-radius: 100%;
    width: 100px;
    height: 100px;
    padding: 1em;
    color: gray;
    margin: 51.5px 84px;
    box-shadow: 0 3px 20px rgba(0,0,0,0.3);
    opacity: 0.7;

    .fa-icon {
      width: 100%;
      height: 100%;
    }
  }
  .card-info {
    .brand {
      font-weight: lighter;
      color: gray;
      margin: 0;
      transition: color 0.2s ease-out;
    }

    .center {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      flex-grow: 1;
      position: relative;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      .btn {
        width: auto;
        background: none;
        color: #4C4D38;
        border-color: #4C4D38;
        opacity: 0.5;
        transition: opacity 0.2s;
        margin-bottom: 0;

        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
.card:hover {
  .card-img.add-image {
    height: 200px;
    width: 200px;
    margin: 34px 34px;
  }
  .card-info {
    .brand {
      color: #444;
    }
  }
}
</style>
