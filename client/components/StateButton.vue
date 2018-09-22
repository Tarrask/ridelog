<template lang="html">
  <button
    type="submit"
    class="btn btn-status"
    :class="{
      'btn-pending': debouncedPending,
      'btn-success': success,
      'btn-error': error
    }"
    :disabled="!ready"
    v-on="$listeners">
    <fa-icon v-if="iconName" :name="iconName" :spin="iconName === 'spinner'"></fa-icon> {{ currentLabel }}
  </button>
</template>

<script>

import 'vue-awesome/icons/spinner';
import 'vue-awesome/icons/check';
import 'vue-awesome/icons/times';

// Should certainly use Symbol for that, but browser support is not OK (IE11)
const READY = 'READY';
const PENDING = 'PENDING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

export { READY, PENDING, SUCCESS, ERROR };

export default {
  props: {
    state: {
      type: String,
      default: PENDING
    },
    label: {
      type: String,
      required: true
    },
    pendingLabel: String,
    successLabel: String,
    errorLabel: String
  },
  data() {
    return {
      debouncedPending: false
    };
  },
  computed: {
    iconName() {
      switch (this.state) {
        case READY: return null;
        case PENDING: return 'spinner';
        case SUCCESS: return 'check';
        case ERROR: return 'times';
        default: return null;
      }
    },
    currentLabel() {
      switch (this.state) {
        case SUCCESS: return this.successLabel || this.label;
        case ERROR: return this.errorLabel || this.label;
        default:
          if(this.debouncedPending) {
            return this.pendingLabel || this.label;
          }
          else {
            return this.label;
          }
      }
    },
    ready() { return this.state === READY; },
    pending() { return this.state === PENDING; },
    success() { return this.state === SUCCESS; },
    error() { return this.state === ERROR; }
  },
  watch: {
    status(val) {
      if(val === PENDING) {
        this.pendingTimeout = setTimeout(() => { this.debouncedPending = true; }, 200);
      }
      else {
        if(this.pendingTimeout) {
          clearTimeout(this.pendingTimeout);
          delete this.pendingTimeout;
        }
        this.debouncedPending = false;
      }
    }
  }
};
</script>

<style lang="css">
</style>
