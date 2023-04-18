module.exports = mongoose => {
  var schema = mongoose.Schema(

    {
      name: String,
      number: String,
      company: String,
      phone: Number,
      purchased: Boolean,
    },
    { timestamps: true }
  );
  
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  
  const Supplier = mongoose.model("supplier", schema);
  return Supplier;
};