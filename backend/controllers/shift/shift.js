const { createShift, updateShift } = require("./model");

const createShiftCont = async (req, res) => {
  const { shift_number, start_time, end_time, description } = req.body;
  try {
    const result = await createShift(
      shift_number,
      start_time,
      end_time,
      description
    );
    if (result.length == 0)
      return res.status(404).json({ message: "not saved" });

    return res.status(201).json(result[0]);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from createShiftCont", error: e.message });
  }
};

const updateShiftCont = async (req, res) => {
  const { id } = req.params;
  const { shift_number, start_time, end_time, description } = req.body;

  try {
    const result = updateShift(
      id,
      shift_number,
      start_time,
      end_time,
      description
    );
    if (result.length == 0)
      return res.status(404).json({ message: "not updated" });

    return res.status(201).json(result[0]);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from updateShiftCont", error: e.message });
  }
};

module.exports = { createShiftCont, updateShiftCont };
