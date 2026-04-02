import cron from "node-cron";
import sql from "../config/db.js";

const startOtpCleanup = () => {
  cron.schedule("*/1 * * * *", async () => {
    try {
      const result =
        await sql`DELETE FROM otp_verification WHERE expires_at < NOW();`;

      if (result.count > 0) {
        `Deleted ${result.count} expired OTP(s)`;
      }
    } catch (err) {
      ("Cron Error:", err);
    }
  });
};

export default startOtpCleanup;
