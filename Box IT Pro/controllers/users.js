const User = require("../models/users");

exports.postAddUser = (req, res, next) => {
  const {
    name,
    email,
    title,
    department,
    office,
    computer,
    phone,
    deskphone,
    cellphone,
    date,
  } = req.body;

  User.create({
    name: name,
    email: email,
    title: title,
    department: department,
    office: office,
    computer: computer,
    phone: phone,
    deskphone: deskphone,
    cellphone: cellphone,
    date: date,
  })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "User created successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to create user" });
    });
};

exports.postDeleteUser = (req, res, next) => {
  const userId = req.query.userId;

  if (Array.isArray(userId)) {
    User.destroy({
      where: {
        id: userId,
      },
    })
      .then((result) => {
        if (result === 0) {
          return res.status(404).send("No users found");
        }
        console.log("DESTROYED USERS");
        res.status(200).send("Users destroyed");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Server error");
      });
  } else {
    User.findByPk(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send("User not found");
        }
        return user.destroy();
      })
      .then((result) => {
        console.log("DESTROYED USER");
        res.status(200).send("User destroyed");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Server error");
      });
  }
};

exports.getUsersByData = (req, res, next) => {
  const { title, department, office } = req.query;

  const filteringData = {};

  if (title) {
    filteringData.title = title;
  }

  if (department) {
    filteringData.department = department;
  }

  if (office) {
    filteringData.office = office;
  }

  // Query the User model to find all users that match the criteria
  User.findAll({ where: filteringData })
    .then((users) => {
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
      console.log(users);
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch users" });
    });
};
