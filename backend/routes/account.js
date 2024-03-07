import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { Account } from "../model/account.model.js";
import mongoose from "mongoose";
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  //fetch the accounts within the transaction
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.aboutTransaction();
    return res.status(400).json({
      message: "Insufficient Balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid Account",
    });
  }

  //Perform the transfer
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  //commit the transaction
  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
});

export default router;
