function trimData(data) {
  let id = Number(data.id.toString().trim());
  let title = data.title.trim();
  let content = data.content.trim();
  let priority = Number(data.priority.toString().trim());
  return { id, title, content, priority };
}

module.exports = trimData;
