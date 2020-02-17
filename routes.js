const router = require("express").Router();
const Controller = require("./controller");

router.post("/send-email", async function(req, res, next) {
    Controller.sendEmail(req.body)
      .then(data => res.json(data))
      .catch(e => next(e));
  } else {
    res.status(500);
  }
});
module.exports = router;
