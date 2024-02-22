import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, //if you want to enable searching(in DB) for any field then make index true, without this also we can seacrh but this make more optimised.
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudnary url
      required: true,
    },
    coverImage: {
      type: String, // cloudnary url
    },
    watchHistory: [
      // watch history is dependent Video schema
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true, //generate createdAt, updatedAt for us
  }
);

//make sure to use normal function syntax of js instead of arrow fn because of scope of this is different in arrow fn ..... it may or will create some issue so better function syntax here
//pre hook will have access to all the fields of userSchema thorugh this keyword
userSchema.pre("save", async function (next) {
  //pre middleware function will be called everytime before saving any data
  if (!this.isModified("password")) return next(); //isModified is mongoose inbuilt fn to check wether field is modified or not

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//how to check user pwd ? from user will get pwd in alph numeric but in db we have stored it in encrypted way.
//bcrypt aslo provide feature of compare() which takes data to be comapred and encrypted data.
// compare() will return boolean value and as this method do lot of computation power before providing boolean response i.e we need to put aync await.
//mongoose provide a feature of creating a custom method as well and this custom will also have access to all the fields of user scheam thr this keyword.
//so we have created a custome method isPasswordCorrect and inside it we are asking bcrypt to do comparsion between the pwd coming from user & encrypted pwd stored in db
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);

//User we have created using mongoose which means it can connect to db directly and do some operation fo us if required
//you can check one of usage in user controller where we are checking if user exit in db 
