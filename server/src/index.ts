import express from "express";
import { PrismaClient } from "@prisma/client";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.get("/", async (req, res) => {
  const windows = await prisma.windows.findMany({ include: { console: true } });
  res.json(windows);
});

app.post("/windows", async (req, res) => {
  const { windowName } = req.body;
  const window = await prisma.windows.create({
    data: {
      name: windowName,
      console: { create: { gpio: 1, name: "Console Number 1" } },
    },
  });
  res.json(window);
});

app.post("/console", async (req, res) => {
  const { name, gpio } = req.body;
  try {
    const console = await prisma.console.create({
      data: { gpio, name, windowsId: 1 },
    });
    res.json(console);
  } catch (error) {
    res.json(error);
  } finally {
    await prisma.$disconnect();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
