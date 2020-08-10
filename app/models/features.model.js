module.exports = mongoose => {
  const Features = mongoose.model(
    "features",
    mongoose.Schema(
      {
        title: String,
        description: String,
        published: Boolean
      },
      { timestamps: true }
    )
  );

  return Features;
};