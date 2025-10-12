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



const port=process.env.PORT||4000;
const app=express()

app.use(express.json())
app.use(cors());
app.use(bodyParser.json());
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
app.use(middleware.handle(i18next));
app.use("/api", soilRoutes);
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