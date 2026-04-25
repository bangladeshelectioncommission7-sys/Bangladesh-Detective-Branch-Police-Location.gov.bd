export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { mobile, otp } = req.body;

    const apiKey = process.env.SMS_API_KEY;

    const url = `https://sms.one9.one/sms/api?action=send-sms&api_key=${apiKey}&to=${mobile}&from=SMS&sms=মোবাইল ডাটাবেইজ পোর্টাল (BTRC সেবা): আপনার OTP কোড: ${otp}, অনুগ্রহ করে OTP কারো সাথে শেয়ার করবেন না।`;

    try {
        const response = await fetch(url);
        const data = await response.text();

        return res.status(200).json({ success: true, data });

    } catch (error) {
        return res.status(500).json({ message: "SMS send failed" });
    }
}
