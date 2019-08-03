

export function mapModel() {
  let map;
  if(Array.isArray(models)) {
    map = models.reduce((acc, model) => {
      acc[model] = `model_${model}`;
      return acc;
    }, {});
  }
  else {
    map = Object.keys(models).reduce((acc, model) => {
      acc[model] = `model_${models[model]}`;
      return acc;
    }, {});
  }
  return mapState(map);
}
