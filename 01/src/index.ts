import express, { Request, Response } from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
const getBody = bodyParser.json();
const port = 5010;
app.use(cors());
app.use(express.json());
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
  res.status(200).json({ success: true, data: videos });
});
app.post("/videos", (req: Request, res: Response) => {
  if (req.body.title) {
    const newVideo = {
      id: +new Date(),
      title: req.body.title,
      author: "it-incubator.eu",
    };
    videos.push(newVideo);
    res.status(201).json(newVideo);
  } else {
    res.status(400).json({ success: false, msg: "please provide value" });
  }
});
app.get("/videos/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    return res.send(videos.filter((v) => v.id === +id));
  } else {
    return res.status(404).json({ success: false, msg: "please provide id" });
  }
});
app.delete("/videos/:id", (req: Request, res: Response) => {
  // put your code here
  const { id } = req.params;
  // console.log(id);

  if (id) {
    videos = videos.filter((v) => v.id !== +id);
    return res.send(videos).status(200);
  } else {
    return res
      .status(400)
      .json({ success: false, msg: `no items with id ${req.params.id}` });
  }
});
app.put("/videos/:id", (req: Request, res: Response) => {
  // put your code here
  const title = req.body.title;
  const { id } = req.params;
  if (videos.find((v) => v.id === +id) && title) {
    videos = videos.map((v) => (v.id === +id ? { ...v, title } : v));
    return res.send(videos).status(201);
  } else {
    return res.status(404).json({
      success: false,
      msg: (!title && "no title") || (!id && "no id"),
    });
  }
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
