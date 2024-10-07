const mongoose = require("mongoose");
const { Schema } = mongoose;

const incidentSchema = new Schema({
  nameUser: {
    type: String,
    required: [true, "nameUser of user is required"],
    trim: true,
  },
  departement: {
    type: String,
    required: [true, "departement of user is required"],
    trim: true,
  },
  userContact: {
    type: String,
    required: [true, "userContact of user is required"],
    trim: true,
  },
  incidentCategory: {
    type: String,
    required: [true, "incidentCategory of user is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "description of user is required"],
    trim: true,
  },
  incidentsPic: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

incidentSchema.statics.createFromRequestBody = function (body) {
  const allowedFields = [
    "nameUser",
    "departement",
    "userContact",
    "incidentCategory",
    "description",
    "incidentsPic",
  ];
  const incidentData = allowedFields.reduce((obj, field) => {
    if (body[field] !== undefined) {
      obj[field] = body[field];
    }
    return obj;
  }, {});
  return new this(incidentData);
};

const Incidenst = mongoose.model("incidents", incidentSchema);
module.exports = Incidenst;
