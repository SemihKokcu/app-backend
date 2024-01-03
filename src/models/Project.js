const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectStatusEnum = ['Devam Ediyor', 'Tamamlandı'];

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    descp: {
      type: String,
    },
    imageUrls: {
      type: [String],
    },
    create_date: {
      type: Date,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    author: {
      type: String,
    },
    primaryImgUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: projectStatusEnum,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
