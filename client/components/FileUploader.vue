<template lang="html">
  <div class="dropbox">
    <draggable v-model="files" class="img-container" :options="{animation: 250}">
      <!-- <transition-group name="flip-list" class="flex-box"> -->
        <div class="img-content" v-for="(file, index) in files" :key="file.url">
          <img :src="file.url" :class="file.state" draggable="false">
          <button class="remove" @click.prevent="removeFile(index)"><fa-icon name="times-circle"></fa-icon></button>
        </div>
      <!-- </transition-group> -->
    </draggable>
    <input
      ref="pictureInput"
      type="file"
      multiple
      accept="image/*"
      name="picture"
      id="picture"
      placeholder="Photos"
      @change="imageListChange">
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import "vue-awesome/icons/times-circle";

export default {
  components: { draggable },
  props: {
    initialFiles: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      files: [],
      uploadingCount: 0
    };
  },
  mounted() {
    this.files = this.initialFiles.map(f => { return { name: f, state: 'onServer', url: `/api/uploader/thumb/100/${f}` }; });
  },
  computed: {
    pendingFiles() {
      return this.files.filter(f => f.state === 'pending' || f.state === 'uploading');
    },
    uploadedFiles() {
      return this.files.filter(f => f.state === 'onServer');
    }
  },
  watch: {
    async pendingFiles() {
      console.log('pending files changes');
      let fileToUpload = this.files.find(f => f.state === 'pending');
      if(!fileToUpload || this.uploadingCount > 5) return;
          this.uploadFile(fileToUpload);
    },
    uploadedFiles() {
      this.$emit('uploaded-files', this.uploadedFiles);
    }
  },
  methods: {
    imageListChange(e) {
      let files = this.$refs.pictureInput.files;
      for(let file of files) {
        this.files.push({ file, state: "pending", url: window.URL.createObjectURL(file) });
      }
      this.$refs.pictureInput.value = "";
    },
    removeFile(index) {
      this.files.splice(index, 1);
    },
    async uploadFile(file) {
      console.log('uploading file');
      this.uploadingCount++;
      file.state = 'uploading';
      let formData = new FormData();
      formData.append('file', file.file);
      let data = await this.$axios.$post('/api/uploader/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('file uploaded');
      this.uploadingCount--;
      file.url = `/api/uploader/get/${data[0].fd}`;
      file.state = 'onServer';
      file.name = data[0].fd;
      delete file.file;
    },
    dragover(e) {
      console.log('dragover', e);
    },
    dragenter(e) {
      console.log('dragenter', e);
    },
    dragstart(e) {
      console.log('dragstart', e);

    }
  }
};
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 1s;
}
.dropbox {
  width: 100%;
  margin: 0 0 1.5rem;
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  font-size: 1.5em;
  background-color: rgba(255, 255, 255, 0.75);
  transition: border-color 0.2s, background-color 0.2s;
  resize: vertical;
  min-height: 3em;
  position: relative;
  overflow: hidden;

  input[type=file] {
    opacity: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: block;
    cursor: pointer;
  }

  .img-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0.5rem;

    .img-content {
      position: relative;
      z-index: 20;
      margin: 0.5rem;

      img {
        display: block;
        height: 100px;
        width: auto;

        &.pending {
          opacity: 0.5;
        }
      }

      .remove {
        display: block;
        position: absolute;
        top: -5px;
        right: -5px;
        background: rgba(0,0,0,0.2);
        border: none; // 1px solid red;
        border-radius: 100%;
        margin: 0;
        padding: 0;
        cursor: pointer;
        color: white;
        box-shadow: 1px 2px 5px rgba(0,0,0,0.5);

        .fa-icon {
          display: block;
        }
      }
    }
  }
}
</style>
