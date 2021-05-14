const unirest = require("unirest");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Data = require("../schema/Data");

const dbRoute =
  "mongodb+srv://dbUser:dbUserpassword@cluster0.bnlyp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(dbRoute, { useUnifiedTopology: true }); //*
let db = mongoose.connection; //*

router.get("/search/:keywords", function (req, res, next) {
  const { keywords } = req.params;
  var req = unirest("GET", "https://amazon-price1.p.rapidapi.com/search");

  req.query({
    marketplace: "US",
    keywords: keywords,
  });

  req.headers({
    "x-rapidapi-key": "7e0c855134msh0eb98318fd81c54p1e3e3ejsndb2817f4c70d",
    "x-rapidapi-host": "amazon-price1.p.rapidapi.com",
    useQueryString: true,
  });

  req.end(function (response) {
    if (response.error) throw new Error(response.error);
    res.json(response.body);
  });
});

router.post("/signup", function (req, res, next) {
  const { email, password } = req.body;
  Data.findOne({ email: email }, function (err, data) {
    if (err) {
      return res.json({ success: false });
    }
    if (data) return res.json({ success: false });
    let newUser = new Data();
    newUser.email = email;
    newUser.password = password;
    newUser.favorite = [];

    newUser.save((err) => {
      if (err) {
        return res.json({ success: false });
      } else {
        return res.json({ success: true });
      }
    });
  });
});

router.post("/login", function (req, res, next) {
  const { email, password } = req.body;
  Data.findOne({ email: email, password: password }, function (err, data) {
    if (err) {
      return res.json({ success: false });
    }
    if (data) return res.json({ success: true });
    return res.json({ success: false });
  });
});

router.post("/changepwd", function (req, res, next) {
  const { email, password } = req.body;

  Data.findOneAndUpdate(
    { email: email },
    { password: password },
    function (err, data) {
      if (err) {
        return res.json({ success: false });
      }
      if (data) return res.json({ success: true });
      return res.json({ success: false });
    }
  );
});

router.put("/addfavorite", function (req, res, next) {
  const { email, img, product, price, url } = req.body;
  const item = { img: img, product: product, price: price, url: url };

  Data.findOneAndUpdate(
    { email: email },
    { $addToSet: { favorite: JSON.stringify(item) } },
    function (err, data) {
      if (err) {
        return res.json({ success: false });
      }
      if (data) return res.json({ success: true });
      return res.json({ success: false });
    }
  );
});

router.get("/favorites/:email", function (req, res, next) {
  const { email } = req.params;

  Data.findOne({ email: email }, function (err, data) {
    if (err) {
      return res.json({ success: false });
    }
    if (data) {
      let ret = [];
      for (i of data.favorite) {
        ret.push(JSON.parse(i));
      }
      return res.json({ success: true, favorite: ret });
    }
    return res.json({ success: false });
  });
});

router.delete("/remove", function (req, res, next) {
  const { email, img, product, price, url } = req.body;
  const item = { img: img, product: product, price: price, url: url };

  Data.findOneAndUpdate(
    { email: email },
    { $pull: { favorite: JSON.stringify(item) } },
    function (err, data) {
      if (err) {
        return res.json({ success: false });
      }
      if (data) return res.json({ success: true });
      return res.json({ success: false });
    }
  );
});

module.exports = router;
