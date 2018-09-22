<script>
export default {
  asyncData({ error, req, redirect }) {
    if(req && req.error) {
      return error({ message: req.error.message, statusCode: req.error.statusCode });
    }
    return error({ message: 'Unexpected client error' });
  },
  meta: {
    public: true
  }
};
</script>
