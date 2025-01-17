const shortid = require("shortid");
const URL = require("../models/url");

async function handelGenerateNewUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "URL is Required" });
    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    })
    // return res.json({ id: shortID })
    return res.render("home",{
        id: shortID,
    })
}

module.exports = {
    handelGenerateNewUrl
}



