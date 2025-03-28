require("dotenv").config();
const { selectFile, createFile, updateFile } = require("./model");

const selectFileCont = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await selectFile(id);
    return res.status(200).json(result[0]);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from selectFileCont", error: e.message });
  }
};

const createFileCont = async (req, res) => {
  const { offer_id } = req.params;
  if (!req.file)
    return res.status(400).json({ message: "you have to upload 1 file" });

  try {
    const filePath = `${process.env.BACKEND_URL}/${req.file.filename}`;

    const result = await createFile(offer_id, filePath);
    return res.status(201).json(result[0]);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from createFileCont", error: e.message });
  }
};

const updateFileCont = async (req, res) => {
  const { id } = req.params;
  if (!req.file)
    return res.status(400).json({ message: "you have to upload 1 file" });
  try {
    const filePath = `${process.env.BACKEND_URL}/${req.file.filename}`;
    const result = await updateFile(id, filePath);
    return res.status(200).json(result[0]);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from updateFileCont", error: e.message });
  }
};

module.exports = {
  createFileCont,
  selectFileCont,
  updateFileCont,
};
