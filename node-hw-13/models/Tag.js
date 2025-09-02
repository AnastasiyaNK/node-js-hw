import mongoose from "mongoose";
const Schema = mongoose.Schema;


const tagSchema = new Schema({
  name: String,
  articles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
});
const Tag = mongoose.model("Tag", tagSchema)
export default Tag;
