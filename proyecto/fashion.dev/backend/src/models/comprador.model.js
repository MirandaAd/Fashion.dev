import mongoose from "mongoose";

const compradorSchema = new mongoose.Schema({

firstName:{
    type: String,
    required: true,
    trim: true
  },

  username:{
    type: String,
    required: true,
    trim: true
  },

 email:{
    type: String,
    required: true,
    trim: true,
    unique: true
  },

 password:{
    type: String,
    required: true,
  }
});

const Comprador = mongoose.model('Comprador', compradorSchema);
export default Comprador;