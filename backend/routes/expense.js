const router = require("express").Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

// ADD
router.post("/expense", auth, async(req,res)=>{
  const exp = new Expense({
    userId:req.user.id,
    ...req.body
  });

  await exp.save();
  res.json("Added");
});

// GET (user specific)
router.get("/expenses", auth, async(req,res)=>{
  const data = await Expense.find({userId:req.user.id});
  res.json(data);
});

module.exports = router;