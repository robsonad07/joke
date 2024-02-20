import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL =  "https://v2.jokeapi.dev/";
let joke;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    joke: joke,
  });
});

app.post("/joke", async (req, res) => {
  try {
    const word = req.body.name;
    const response = await axios.get(API_URL + "joke/Any?type=single&contains=" + word);
    if(response.data.error){
      joke = response.data.message;
    } else {
      joke = response.data.joke;
    }
    res.redirect("/");
  } catch (error) {
    res.status(404);
  }
  
})/


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});