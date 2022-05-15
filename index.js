import express from "express";

const app = express();
const PORT_NUMBER = 8800;

app.listen(PORT_NUMBER, () => {
    console.log("Connected to backend");
});
