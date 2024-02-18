var express = require("express");
var router = express.Router();
var Contact = require("../models/contact");

router.get("/" , async (req , res ,next)=>{
    const contacts = await Contact.find();
    res.json(contacts);
});
router.post("/add" , async (req , res, next)=>{
    const contact = new Contact({
        FullName: req.body.contactName,
        Phone: req.body.contactNumber,
    });
    await contact.save();
    res.json({ message : "Contact added" });
});
router.delete("/delete/:id" , async(req , res , next)=>{
    await Contact.findByIdAndDelete(req.params.id);
    res.json({message : "Contact est supprimé "})
});
router.put("/update/:id" , async(req , res , next)=>{
    //await Contact.findByIdAndUpdate(req.params.id);
    const cont = await Contact.findById(req.params.id);
    cont.FullName = req.body.contactName;
    cont.Phone = req.body.contactNumber;
    await cont.save();
    res.json({message: "contact updated"});
})
module.exports = router;