
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const magazineSchema = new Schema({
  title: { type: String, required: true },
  issueNumber: Number,
  publisher: { type: Schema.Types.ObjectId, ref: "Publisher" },
});

const Magazine = mongoose.model("Magazine", magazineSchema);
export default Magazine;
