import Schema from "validate";

const schema = new Schema({
  title: {
    type: String,
    required: true,
    length: { min: 3, max: 32 },
    message: "3-12位，必填项",
  },
});
export default (obj) => schema.validate(obj);
