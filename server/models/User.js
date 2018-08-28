// Note! //this file is only optional when you want to create any data from constructor
var mongoose = require("mongoose");
var crypto = require("crypto");
var uniqueValidator = require("mongoose-unique-validator");
var jwt = require("jsonwebtoken");
const keys = require("../config/keys");

var UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      //match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true
    },
    bio: String,
    birthDate: String,
    city: String,
    status: String,
    occupation: String,
    origin: String,
    image: {
      type: String,
      default:
        "https://flipagram.com/assets/resources/img/fg-avatar-anonymous-user-retina.png?size=160"
    },
    gender: {
      type: String,
      default: "N/A"
    },
    hash: String,
    salt: String,
    interests: [
      {
        label: {
          type: String
        },
        value: {
          type: String
        }
      }
    ],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
    attending: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

//Create a method for setting User passwords
UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

//Create a method to validate passwords
UserSchema.methods.validPassword = function(password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

// Create a method on the user model to generate a JWT
UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60 / (24 * 60)); ///  set expiration after one hour i.e 1/24 day

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000) //// it's in total seconds since 1970 (not in miliseconds)
    },
    keys.secret
  );
};

// Create a method to get the JSON representation of a user for authentication.
UserSchema.methods.toAuthJSON = function() {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio || "",
    _id: this._id,
    gender: this.gender,
    birthDate: this.birthDate,
    city: this.city,
    status: this.status,
    occupation: this.occupation,
    origin: this.origin,
    interests: this.interests || [],
    image:
      this.image ||
      "https://flipagram.com/assets/resources/img/fg-avatar-anonymous-user-retina.png?size=160"
  };
};

// Create a method to get the JSON representation of a user's profile for public display
UserSchema.methods.toProfileJSONFor = function(user) {
  return {
    username: this.username,
    bio: this.bio,
    gender: this.gender,
    birthDate: this.birthDate,
    city: this.city,
    status: this.status,
    occupation: this.occupation,
    origin: this.origin,
    interests: this.interests || [],
    image:
      this.image ||
      "https://flipagram.com/assets/resources/img/fg-avatar-anonymous-user-retina.png?size=160",
    following: user ? user.isFollowing(this._id) : false,
    followingList: this.following,
    followedBy: this.followedBy,
    followedByCount: this.followedBy.length,
    followingCount: this.following.length,
    _id: this._id
  };
};

// Create method for user to favorite/unfavorite article
UserSchema.methods.favorite = function(id) {
  if (this.favorites.indexOf(id) === -1) {
    this.favorites.push(id);
  }

  return this.save();
};

UserSchema.methods.unfavorite = function(id) {
  this.favorites.remove(id);
  return this.save();
};

// Create a method for user to check if they've favorited an article or not
UserSchema.methods.isFavorite = function(id) {
  return this.favorites.some(function(favoriteId) {
    return favoriteId.toString() === id.toString();
  });
};

// Create method for user to attend/unattend event
UserSchema.methods.attend = function(id) {
  if (this.attending.indexOf(id) === -1) {
    this.attending.push(id);
  }

  return this.save();
};

UserSchema.methods.unattend = function(id) {
  this.attending.remove(id);
  return this.save();
};

// Create a method for user to check if they've registered an event or not
UserSchema.methods.isAttending = function(id) {
  return this.attending.some(function(favoriteId) {
    return favoriteId.toString() === id.toString();
  });
};

// Create method for user to follow/unfollow another User
UserSchema.methods.follow = function(id) {
  if (this.following.indexOf(id) === -1) {
    this.following.push(id);
  }

  return this.save();
};

UserSchema.methods.unfollow = function(id) {
  this.following.remove(id);
  return this.save();
};

// Create a method for user to check if they've followed an user or not
UserSchema.methods.isFollowing = function(id) {
  return this.following.some(function(followId) {
    return followId.toString() === id.toString();
  });
};
module.exports = User = mongoose.model("User", UserSchema);
