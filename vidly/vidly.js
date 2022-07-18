const express = require("express");
const app = express();
const Joi = require("joi");
const movieArr = [
  { id: 1, name: "Lost sea" },
  { id: 2, name: "Happiness" },
  { id: 3, name: "When tomorrow awakens" },
];

app.use(express.json());

// validation
function validateMovie(moveObj) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(moveObj, schema);
}

app.get("/vidly.com", (req, res) => {
  res.send("Movie Home Page!");
});

app.get("/vidly.com/api/genres", (req, res) => {
  res.send(movieArr);
});

// create new movie obj
app.post("/vidly.com/api/genres", (req, res) => {
  // if invalid
  const { error } = validateMovie(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const addMovie = {
    id: movieArr.length + 1,
    name: req.body.name,
  };

  movieArr.push(addMovie);
  res.send(addMovie);

  // console.log("movieArr: ", movieArr);
});

app.put("/vidly.com/api/genres/:id", (req, res) => {
  // find move to update using schema id
  const movieToUpdate = movieArr.find((singleMovieObj) => {
    return singleMovieObj.id === parseInt(req.params.id);
  });

  // if movie not present
  if (!movieToUpdate) {
    return res.status(404).send("The movie with given ID  was not found");
  }

  // if invalid
  const { error } = validateMovie(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // update movie
  movieToUpdate.name = req.body.name;

  // return updated movie
  res.send(movieToUpdate);
});

const port = 5000 || process.env.PORT;

app.listen(port, () => {
  console.log(`Listening again on port ${port}....`);
});
