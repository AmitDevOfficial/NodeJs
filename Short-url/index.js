const express = require("express");
const { connectMongoDB } = require("./connect")
const urlRoute = require("./routes/url");
const URL = require("./models/url")

const app = express();
const port = 8000;

connectMongoDB("mongodb://127.0.0.1:27017/customer-url")
    .then(() => console.log("MonogDB Connected"));
    // .catch(error => console.log("MongoDB Not Connected", error));

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
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