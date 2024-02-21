function trimData(Data) {
  const { id, title, body, priority } = Data;
  let Uid = Number(id.toString().trim());
  let Utitle = title.trim();
  let Ubody = body.trim();
  let Upriority = Number(priority.toString().trim());
  return { Uid, Utitle, Ubody, Upriority };
}

module.exports = trimData;
