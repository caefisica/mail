import type { NextApiRequest, NextApiResponse } from "next"
import HelloEmail from "../../emails/HelloEmail"
import { render } from "@react-email/render"
import { handleEmailFire } from "../../lib/email-helper"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { recipient } = req.body;

  await handleEmailFire({
    recipient,
    subject: "Hello",
    html: render(HelloEmail()),
  })

  return res.status(200).json({ message: "Success" })
}
