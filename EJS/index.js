const express = require("express");
const { connectMongoDB } = require("./connect")
const URL = require("./models/url")

const path = require("path")


const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")

const app = express();
const port = 8000;

connectMongoDB("mongodb://127.0.0.1:27017/customer-url")
    .then(() => console.log("MonogDB Connected"));
// .catch(error => console.log("MongoDB Not Connected", error));

app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entery = await URL.findOneAndUpdate(
        {
            shortId
        }, {
        $push: {
            visitHistory: {
                timestamps: Date.now(),
            }
        }
    }
    )
    res.redirect(entery.redirectURL)
});

app.listen(port, () => console.log(`Server Started at Port...${port}`));