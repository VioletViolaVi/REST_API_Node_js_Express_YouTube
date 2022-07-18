const Joi = require("joi"); // a class is returned from this module
// console.log(Joi);
const express = require("express");
const app = express();

app.use(express.json());

const coursesArr = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello World from the other side");
});

app.get("/api/courses", (req, res) => {
  res.send(coursesArr);
});

app.post("/api/courses", (req, res) => {
  // if invalid, return 400 - bad request
  const { error } = validateCourse(req.body); // object destructuring
  
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const courseToAdd = {
    id: coursesArr.length + 1,
    name: req.body.name,
  };

  coursesArr.push(courseToAdd);
  res.send(courseToAdd);
});

app.put("/api/courses/:id", (req, res) => {
  // look up course with schema id
  const courseToFind = coursesArr.find((singleCourseObj) => {
    return singleCourseObj.id === parseInt(req.params.id);
  });

  // if not present return 404
  if (!courseToFind) {
    res.status(404).send("The course with the given ID was not found");
    return;
  }

  // if invalid, return 400 - bad request
  const { error } = validateCourse(req.body); // object destructuring
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // update course
  courseToFind.name = req.body.name;

  // return updated course
  res.send(courseToFind);
});

app.delete("/api/courses/:id", (req, res) => {
  // look up course
  const courseToFind = coursesArr.find((singleCourseObj) => {
    return singleCourseObj.id === parseInt(req.params.id);
  });

  // if not present return 404
  if (!courseToFind) {
    res.status(404).send("The course with the given ID was not found");
    return;
  }

  // delete
  const indexOfCourse = coursesArr.indexOf(courseToFind);
  coursesArr.splice(indexOfCourse, 1);

  // console.log("courseToFind: ", courseToFind);
  // console.log("indexOfCourse: ", indexOfCourse);
  // console.log("coursesArr: ", coursesArr);

  // return same course
  res.send(courseToFind);
});

function validateCourse(courseObj) {
  // console.log("req: ", req);
  // console.log("req.body: ", req.body);
  // console.log("req.body.name: ", req.body.name);

  // validate
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(courseObj, schema);
}

app.get("/api/courses/:id", (req, res) => {
  // console.log("req: ", req);
  // console.log("req.params: ", req.params);
  // console.log("req.params.id: ", req.params.id);
  const courseToFind = coursesArr.find((singleCourseObj) => {
    return singleCourseObj.id === parseInt(req.params.id);
  });

  if (!courseToFind) {
    //404
    res.status(404).send("The course with the given ID was not found");
    return;
  }
  res.send(courseToFind);
});

// PORT
const port = process.env.PORT || 3000; // used in part to assign a port to node applications... that combined with "export PORT=5000" in git bash

app.listen(port, () => {
  console.log(`Listening again on port ${port}....`);
});
