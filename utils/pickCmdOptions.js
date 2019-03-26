function pickCmdOptions(cmdArgs) {
  const res = {};
  const cmd = Array.isArray(cmdArgs)
    ? cmdArgs.pop()
    : cmdArgs;

  cmd.options.forEach((option) => {
    const key = option.long.slice(2);

    res[key] = cmd[key];
  });

  return res;
}

module.exports = pickCmdOptions;
