var express = require("express");
const bloodSchema = require("../models/bloodSchema");
var bloodRoutes = express.Router();

bloodRoutes.post("/saveblood", async (req, res) => {
  const list = {
    name: req.body.name,
    bloodgroup: req.body.bloodgroup,
    place: req.body.place,
    contact: req.body.contact,
  };
  const groups = await bloodSchema(list).save();
  if (groups) {
    // res.send('saved to db')
    res.status(201).json({
      success: true,
      error: false,
      message: "Data added successfully",
    });
  } else {
    // res.send('not save to db')
    res.status(400).json({
      success: false,
      error: true,
      message: "Data adding failed",
    });
  }
});

bloodRoutes.get("/viewblood", async (req, res) => {
  const viewlist = await bloodSchema.find();
  if (viewlist) {
    // res.send(viewlist)
    res.status(200).json({
      success: true,
      error: false,
      data: viewlist,
      message: "success to view",
    });
  } else {
    // res.send('not view')
    res.status(400).json({
      success: false,
      error: true,
      message: "data view error",
    });
  }
});

bloodRoutes.get("/viewblood/op", async (req, res) => {
  const opBloodGroup = await bloodSchema.find({ bloodgroup: "O+" });
  if (opBloodGroup) {
    // res.send(same)
    res.status(200).json({
      success: true,
      error: false,
      data: opBloodGroup,
      message: "O+ data view succcessfully",
    });
  } else {
    // res.send('not find')
    res.status(400).json({
      success: false,
      error: true,
      message: "O+ data not found",
    });
  }
});

bloodRoutes.get("/viewblood/:id", async (req, res) => {
  const selectId = await bloodSchema.findOne({ _id: req.params.id });
  if (selectId) {
    // res.send(oneid)
    res.status(200).json({
      success: true,
      error: false,
      data: selectId,
      message: "selected Id view successfully",
    });
  } else {
    // res.send('id not found')
    res.status(400).json({
      success: false,
      error: true,
      message: "Id not found",
    });
  }
});

bloodRoutes.get("/updateblood/:id", async (req, res) => {
  const olddata = await bloodSchema.findOne({ _id: req.params.id });
  const update = {
    name: req.body.name ? req.body.name : olddata.name,
    bloodgroup: req.body.bloodgroup ? req.body.bloodgroup : olddata.bloodgroup,
    place: req.body.place ? req.body.place : olddata.place,
    contact: req.body.contact ? req.body.contact : olddata.contact,
  };
  const updatedata = await bloodSchema.updateOne(
    { _id: req.params.id },
    { $set: update }
  );
  const data = await bloodSchema.findOne({ _id: req.params.id });

  if (updatedata) {
    // res.send(updatedata)
    res.status(200).json({
      success: true,
      error: false,
      updateStatus: updatedata,
      data: data,
      message: "data update successfully"

    });
  } 
  else {
    // res.send('not updated')
    res.status(400).json({
      success: true,
      error: false,
      message: "data not updated",
    });
  }
});

bloodRoutes.get("/deleteblood/:id", async (req, res) => {
  const Delete = await bloodSchema.deleteOne({ _id: req.params.id });

  const Datas= await bloodSchema.find()

  if (Delete) {
    // res.send('data deleted')
    res.status(200).json({
      success: true,
      error: false,
      data:Datas,
      message: "data deleted successfully",
    });

  } 
  else {
    // res.send('not deleted')
    res.status(400).json({
      success: false,
      error: true,
      message: "data not deleted",
    });
  }

});

module.exports = bloodRoutes;
