module.exports = mongoose => {
  const Features = mongoose.model(
    "features",
    mongoose.Schema(
      {
        title: String,
        description: String,
        votes: [ String ],
        comments: [{ body: String, date: Date, ipaddress: String }],
        published: Boolean
      },
      { timestamps: true }
    )
  );

  return Features;
};