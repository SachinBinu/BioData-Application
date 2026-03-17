
import Biodata from "../models/Biodata.js";

export const createBiodata = async(req,res)=>{
  const data = await Biodata.create({
    userId:req.user.id,
    ...req.body,
    image:req.file?.filename
  });
  res.json(data);
};

export const getMyBiodata = async(req,res)=>{
  const data = await Biodata.find({userId:req.user.id});
  res.json(data);
};

export const getAllBiodata = async(req,res)=>{
  const data = await Biodata.find().populate("userId","name email");
  res.json(data);
};
