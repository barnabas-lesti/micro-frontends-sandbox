const { exec } = require('child_process');

const { CONFIG_FILE_PATH, DEFAULT_GRAPH_NAME, GRAPH_NAME, GRAPHS_FOLDER } = require('./graph.const');

function runGraph() {
  const args = process.argv.slice(2).map((argument) => argument.trim());

  const graphNameArgIndex = args.indexOf(GRAPH_NAME);
  const graphName = graphNameArgIndex !== -1 ? args[graphNameArgIndex + 1] : DEFAULT_GRAPH_NAME;
  const graphPath = `${GRAPHS_FOLDER}/${graphName}.svg`;

  const fallthroughArgs =
    graphName !== DEFAULT_GRAPH_NAME
      ? args.filter((value, index) => index !== graphNameArgIndex && index !== graphNameArgIndex + 1)
      : args;

  exec(
    [
      'dependency-cruise',
      ...fallthroughArgs,
      `--config "${CONFIG_FILE_PATH}" --output-type archi | dot -T svg > "${graphPath}"`,
    ].join(' '),
    (error, stdOut, stdError) => {
      if (stdError || error) {
        throw new Error(stdError || error?.message);
      }

      console.log(stdOut);
      console.log(`Graph "${graphPath}" successfully generated.`);
    },
  );
}

module.exports = {
  runGraph,
};
