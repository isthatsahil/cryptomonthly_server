exports.saveFileToDB = (req, res) => {
  if (!req.file) {
    //If the file is not uploaded, then throw custom error with message: FILE_MISSING
    throw Error("FILE_MISSING");
  } else {
    //If the file is uploaded, then send a success response.
    res.send({ status: "success" });
  }
};
