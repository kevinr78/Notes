function trimData(data) {
  let title = data.title.trim();
  let content = data.content.trim();
  let priority = data.priority.toString().trim();
  return { title, content, priority };
}

module.exports = trimData;
