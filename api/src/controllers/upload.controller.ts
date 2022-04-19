const upload = require("../middlewares/upload.middleware");
// const dbConfig = require("../con fig/db");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
// const url = dbConfig.url;

const baseUrl = "http://localhost:8000/files/";
const mongoClient = new MongoClient(
  "mongodb+srv://admin-yun:Test123@cluster0.xlhny.mongodb.net/recipeDB"
);

const uploadFiles = async (req: any, res: any) => {
  try {
    await upload(req, res);
    console.log(req.file);
    if (req.file == undefined) {
      return res.send({
        message: "You must select a file.",
      });
    }
    return res.send({
      message: "File has been uploaded.",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: "Error when trying upload image: ${error}",
    });
  }
};
const getListFiles = async (req: any, res: any) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db("recipeDB");
    const images = database.collection("photos" + ".files");
    const cursor = images.find({});
    if ((await cursor.count()) === 0) {
      return res.status(500).send({
        message: "No files found!",
      });
    }
    let fileInfos: any[] = [];
    await cursor.forEach((doc: any) => {
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });
    return res.status(200).send(fileInfos);
  } catch (error: any) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
const download = async (req: any, res: any) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db("recipeDB");
    const bucket = new GridFSBucket(database, {
      bucketName: "photos",
    });
    let downloadStream = bucket.openDownloadStreamByName(req.params.name);
    downloadStream.on("data", function (data: any) {
      return res.status(200).write(data);
    });
    downloadStream.on("error", function (err: any) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });
    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
module.exports = {
  uploadFiles,
  getListFiles,
  download,
};
