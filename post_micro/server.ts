import express from 'express';
import "dotenv/config";
import cors from 'cors';
import Routes from "./routes/index"

const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.get("/",(req, res) =>{
    return res.json({message: "It's working Post Micro ........."});
});

// Routes
app.use(Routes);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));