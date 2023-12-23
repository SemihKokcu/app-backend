const mongoose = require('../middleware/MongoMiddlware');


const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  twoFactor: {
    type: Boolean,
    default: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  phoneVerified: {
    type: Boolean,
    default: false,
  },
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required:false,
  }],
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: false,
  },
  profileImage: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
