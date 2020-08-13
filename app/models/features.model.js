module.exports = mongoose => {
  const Features = mongoose.model(
    "features",
    mongoose.Schema(
      {
        title: String,
        description: String,
        votes: [ String ],
        comments: [{ id: String, body: String, date: Date, ipaddress: String, votes: [String]}],
        published: Boolean
      },
      { timestamps: true }
    )
  );

  return Features;
};