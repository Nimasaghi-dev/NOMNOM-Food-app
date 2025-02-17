import { logError } from "../util/logging.js";
export const login = async (req, res) => {
  try {
    return res.status(200).send("auth logic successful!");
  } catch (error) {
    logError(error);
    return res.status(500).send("please fill the blanks all!");
  }
};
