import express from 'express';
import i18next from "i18next";
import cors from 'cors'
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import path from "path";
import connectToDatabase from './config/mongodb.js';
import 'dotenv/config'
import bodyParser from "body-parser";
import userrouter from './routes/userroute.js';
import multer from "multer";
import soilRoutes from './routes/soilRoute.js';
import marketRoutes from "./routes/marketRoute.js";
import questionroutes from "./routes/questionroutes.js"
import translationRoutes from "./routes/translationroutes.js";
import userAuth from './middleware/auth.js';
import { fileURLToPath } from "url";
import {
  createFeedback, getAllFeedbacks, updateFeedback, deleteFeedback
} from "./controller/feedbackController.js";
import Feedback from './routes/feedbackRoute.js';
import croproute from "./routes/croproute.js"
import adminRoutes from "./routes/adminRoutes.js";
import notificationroute from "./routes/notificationroutes.js";
import notificationallroute from './routes/notificationall.js';

import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const port=process.env.PORT||4000;
const app=express()

app.use(express.json())

// ---- CORS SETUP ----
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
].filter(Boolean); // undefined/empty values hata dega

// Local development origins (production mein skip)
allowedOrigins.push(
  "http://localhost:9002",
  "http://localhost:3000",
  "http://localhost:5173"
);
app.use(cors({
  origin: function (origin, callback) {
    // Allow karo agar:
    // 1. Same origin request (Postman/server-to-server, origin undefined hota hai)
    // 2. Allowed list mein origin ho (FRONTEND_URL, ADMIN_URL, localhost)
    // 3. Koi bhi kisaan-portal*.vercel.app URL
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      /^https:\/\/kisaan-portal.*\.vercel\.app$/.test(origin)
    ) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
// ---- CORS SETUP END ----

app.use(bodyParser.json());
app.use(middleware.handle(i18next));
// i18next initialization
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    preload: ["en", "hi"], // supported languages
    ns: ["dashboard"],      // namespaces
    defaultNS: "dashboard",
    backend: {
      loadPath: path.join(__dirname, "/locates/{{lng}}/{{ns}}.json")
    }
  });

connectToDatabase();
const storage = multer.memoryStorage();
const upload = multer({ storage });


app.use('/api/user',userrouter);
app.use("/api/soil", soilRoutes);
app.use("/api/marketprices", marketRoutes);
app.use("/api", questionroutes);


app.use("/api", translationRoutes);     
app.use("/api",Feedback);
app.use('/api/crops',croproute);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationroute);
app.use("/api/notificationsall",  notificationallroute);
//feedback

app.get("/",(req,res)=>{
    res.send("working")
});

app.listen(port,()=>{
    console.log("server is running on port ",port)
});