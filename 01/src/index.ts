import express, { Request, Response } from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
const getBody = bodyParser.json();
const port = 5010;
app.use(cors());
app.use(bodyParser.json());
let videos = [
  { id: 1, title: "About JS - 01", author: "it-incubator.eu" },
  { id: 2, title: "About JS - 02", author: "it-incubator.eu" },
  { id: 3, title: "About JS - 03", author: "it-incubator.eu" },
  { id: 4, title: "About JS - 04", author: "it-incubator.eu" },
  { id: 5, title: "About JS - 05", author: "it-incubator.eu" },
];
app.get("/", (req: Request, res: Response) => {
  res.send("Hello: World!!!");
});
app.get("/videos", (req, res) => {
  res.send(videos);
});
app.post("/videos", (req: Request, res: Response) => {
  const newVideo = {
    id: +new Date(),
    title: req.body.title,
    author: "it-incubator.eu",
  };
  videos.push(newVideo);
  res.status(201).send(newVideo);
});
app.get("/videos/:id", (req, res) => {
  // res.send(videos);
  const { id } = req.params;
  // console.log(id);

  res.send(videos.filter((v) => v.id === +id));
});
app.delete("/videos/:id", (req: Request, res: Response) => {
  // put your code here
  const { id } = req.params;
  // console.log(id);
  videos = videos.filter((v) => v.id !== +id);
  res.send(videos).status(204);
});
app.put("/videos/:id", (req: Request, res: Response) => {
  // put your code here
  const title = req.body.title;
  const { id } = req.params;
  if (videos.find((v) => v.id === +id)) {
    videos = videos.map((v) => (v.id === +id ? { ...v, title } : v));
    res.send(videos).status(201);
  } else {
    res.send(404);
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
