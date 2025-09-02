import mongoose from "mongoose";
const Schema = mongoose.Schema;


const articleSchema = new Schema({
  title: { type: String, required: true },
  content: String,
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
});

const Article = mongoose.model("Article", articleSchema);
export default Article;

//Many-to-Many