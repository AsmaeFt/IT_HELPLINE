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
  incidentStatus: {
    type: String,
    trim: true,
    enum: ["not checked yet", "on processing", "done"],
    default: "not checked yet",
  },
  dangerLevel: {
    type: String,
    enum: ["low", "medium", "high"],
    required: [true, "dangerLevel is required"],
    default: "low",
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
