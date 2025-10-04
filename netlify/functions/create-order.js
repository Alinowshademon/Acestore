import fetch from "node-fetch";

export async function handler(event) {
  try {
    const body = JSON.parse(event.body || "{}");

    const GITHUB_TOKEN = process.env.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;
    const REPO = "alinowshad/acestore"; // example: alinowshad/acestore-orders

    const title = `🛍️ New Order - ${body.customerName || "Guest"} (${body.total}৳)`;
    const message = `
**Order Details:**  
${body.orderDetails}

**Total:** ৳${body.total}
**Customer:** ${body.customerName}
**Contact:** ${body.customerContact}
**Form:** [Google Form Link](${body.prefillFormUrl})
**Time:** ${body.timestamp}
`;

    const response = await fetch(`https://api.github.com/repos/${acestore}/issues`, {
      method: "POST",
      headers: {
        "Authorization": `token ${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}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body: message }),
    });

    if (!response.ok) {
      const error = await response.text();
      return { statusCode: response.status, body: error };
    }

    return { statusCode: 200, body: JSON.stringify({ message: "GitHub issue created!" }) };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
}
