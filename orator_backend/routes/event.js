const express = require("express");
const router = express.Router();
const { Event } = require("../models/event");
const { adminEvent } = require("../models/admin_event");
const { User } = require("../models/user");

const { middlewareLogin } = require("../middleware/middlewareLogin");

router.post("/referevent", middlewareLogin, function (req, res) {
  const { name, organisation, date, description, photo } = req.body;
  
  if (!name || !organisation || !date || !description || !photo) {
    return res.json({ error: "please provide all details" })
  }



  User.find({ _id: req.user._id }).then((data) => {
    
    if (data[0].user_type=="admin") {
      const event = new adminEvent({
        name,
        organisation,
        date,
        createdate: date,
        description,
        photo,
      });

      event
        .save()
        .then((savedEvent) => {
          if (savedEvent) {
            res.json({ message: "event posted successfully." });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const event = new Event({
        name,
        organisation,
        date,
        description,
        photo,
        postedBy: req.user

      })

      event.save().then(savedEvent => {
        if (savedEvent) {
          res.json({ message: "event refered successfully." });
        }
      }).catch(err => {
        console.log(err);
      })

    }
  });


});


var startDate = new Date();
router.get("/showevent", function (req, res) {
  adminEvent.find({ createdate: { $gte: new Date(startDate) } }).then((result) => {
    if (!result) {
      return res.json({ error: "no events found" });
    }
    //console.log(typeof(result))

    res.json(result);
  });
});

router.post("/bydate", function (req, res) {
  const { dateResult, organisation } = req.body;
  adminEvent.find({ createdate: dateResult }).then((result) => {
    if (!result) {
      console.log("No data")
      return res.json({ error: "no events found" });
    }


    res.json(result);
  });


})




module.exports = router;
