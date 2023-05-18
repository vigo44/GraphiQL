const DEF_EDITOR_VALUES = {
  QUERY: `query($name: String) {
  characters(page: 2, filter: { name: $name }) {
    info {
        count
    }
    results {
        name
    }
  }
}`,
  VARIABLES: `{
  "name": "rick",
  "page": 2
}`,
  QUERY_PLACEHOLDER: `
----------------------

{
  character(id: "1") {
    name
  }
}`,
  VARIABLES_PLACEHOLDER: `
{
  "name": "rick",
  "page": 2
}`,
};

export { DEF_EDITOR_VALUES };
