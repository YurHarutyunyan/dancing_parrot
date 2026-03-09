import express from "express"
import fs from "node:fs";

let app = express();
let frames = [];
fs.readdirSync("./frames").map((filename) => {
    const data = fs.readFileSync(`./frames/${filename}`, "utf8");
    frames.push(data);
})
const CLEAR = "\x1B[2J\x1B[H";

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/plain");

    let i = 0;
    const interval = setInterval(() => {
        res.write(CLEAR + frames[i]);
        i = (i + 1) % frames.length;
    }, 50);

    req.on("close", () => clearInterval(interval));
});
app.listen(4040,()=>{console.log("listening")})
