import express from "express";
import { ethers } from "ethers";

const app = express();
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  ABI,
  provider
);

app.get("/canSend/:id", async (req, res) => {

  const id = "0x" + req.params.id;

  const identity = await contract.getIdentity(id);

  res.json({
    allowed: identity.canSend
  });
});

app.listen(3000);
