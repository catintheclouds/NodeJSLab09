const express = require("express");
const app = express();

require("dotenv").config();
require("./models/db");

const userRouter = require("./routers/user.router");
app.use(userRouter);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("Hello JWT");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
}); 
