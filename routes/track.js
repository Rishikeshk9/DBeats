const router = require("express").Router();
let Track = require("../models/tracks.model");

router.route("/").get((req, res) => {
  Track.find()
    .then((tracks) => res.json(tracks))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").get((req, res) => {
  const user_id = req.query.id;
  const name = req.query.name;
  const title = req.query.title;
  console.log(req);
  const newUser = new Track({ id: String(user_id), title: String(name) });

  newUser
    .save()
    .then(() => res.json("Track added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});



module.exports = router;
