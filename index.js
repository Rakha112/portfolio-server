import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.post("/send", (req, res) => {
  const email = req.body.email;
  const nama = req.body.nama;
  const date = Date.now();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: "./views",
      defaultLayout: false,
    },
    viewPath: "./views",
    extName: ".handlebars",
  };
  transporter.use("compile", hbs(handlebarOptions));

  const mailOptions = {
    from: "rakhawibowo1998@gmail.com",
    to: email,
    subject: "Pesan Telah Terkirim",
    template: "pengirim",
    context: {
      pengirim: nama,
      date: date,
    },
    attachments: [
      {
        filename: "instagram.png",
        path: "./assets/instagram.png",
        cid: "instagram",
      },
      {
        filename: "github.png",
        path: "./assets/github.png",
        cid: "github",
      },
      {
        filename: "linkedin.png",
        path: "./assets/linkedin.png",
        cid: "linkedin",
      },
      {
        filename: "whatsapp.png",
        path: "./assets/whatsapp.png",
        cid: "whatsapp",
      },
    ],
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
      res.send("error" + JSON.stringify(err));
    } else {
      console.log("mail send");
      res.send("success ke pengirim");
    }
  });
});
app.post("/send/penerima", (req, res) => {
  const nama = req.body.nama;
  const pesan = req.body.pesan;
  const date = Date.now();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: "./views",
      defaultLayout: false,
    },
    viewPath: "./views",
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  const mailOptionsPenerima = {
    from: "rakhawibowo1998@gmail.com",
    to: "rakhawibowo1998@gmail.com",
    subject: "Ada Pesan Baru",
    template: "penerima",
    context: {
      pengirim: nama,
      pesan: pesan,
      date: date,
    },
    attachments: [
      {
        filename: "instagram.png",
        path: "./assets/instagram.png",
        cid: "instagram",
      },
      {
        filename: "github.png",
        path: "./assets/github.png",
        cid: "github",
      },
      {
        filename: "linkedin.png",
        path: "./assets/linkedin.png",
        cid: "linkedin",
      },
      {
        filename: "whatsapp.png",
        path: "./assets/whatsapp.png",
        cid: "whatsapp",
      },
    ],
  };
  transporter.sendMail(mailOptionsPenerima, (err, data) => {
    if (err) {
      console.log(err);
      res.send("error" + JSON.stringify(err));
    } else {
      console.log("mail send");
      res.send("success ke penerima");
    }
  });
});

app.get("/", (req, res) => {
  res.status(201).send("INI SERVER PORTFOLIO");
});

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), function () {
  console.log("App running on port", app.get("port"));
});
