const express = require("express");
const router = express.Router();
const { Volunteer } = require("../models/volunteer");
const { Event } = require("../models/event");
const { middlewareLogin } = require("../middleware/middlewareLogin");
const { transporter } = require("../routes/mailer");


let eventInfo = {};
let eventId;
router.post("/eventInfo", function (req, res) {
  //console.log(req.body);
  const { data } = req.body;
  //console.log(data)
  const { _id, organisation, name } = data;
  eventInfo = {
    _id,
    name,
    organisation,
  };
  //console.log((eventInfo));
});

router.post("/volunteer", middlewareLogin, async (req, res) =>{
  //console.log(req.user);
  //console.log("||||||||||||||||||||" +JSON.stringify(eventInfo));


  try {
    const volunteeredEvnet = await Volunteer.findOne({ volunteeredTo: eventInfo._id, volunteeredBy:req.user._id})
    if (volunteeredEvnet) return res.status(409).json({
      message: "Event already volunteered",
    });

    const event = new Volunteer({
      volunteeredBy: req.user,
      volunteeredTo: eventInfo,
    });

    await event.save();

    const mailOptions = {
      from: 'workera@gmail.com',//replace with your email
      to: req.user.email,//replace with your email
      subject: 'volunteered.',
      html: "Hi," + req.user.name + "<br> you have successfully volunteered to  " + eventInfo.name + " from " + eventInfo.organisation + " . <br> Thankyou."
    }
    try {
      await transporter.sendMail(mailOptions)
      console.log("Email sent Successfully!")
    } catch (err) {
      console.log("error occured while sending email!", err)
    }

    return res.status(200).json({
      message: "event  successfully volunteered."
    });
  } catch (error) {
    console.log("Error Occured!", error);
    res.status(500).json({
      message: "Something went wrong!"
    })
  }

});

router.get("/showprofile", middlewareLogin, function (req, res) {
  

  Volunteer.find({ volunteeredBy: req.user._id })
    .populate("volunteeredTo", "_id name")
    .then((posts) => {


      res.json(posts)
    }
    )
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
