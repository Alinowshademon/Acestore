// netlify/functions/create-order.js
const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  try {
    const body = JSON.parse(event.body);
    const { orderDetails, total } = body;

    const response = await fetch("https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/issues", {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `token ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: `New Order - ৳${total}`,
        body: `Order Details:\n${orderDetails}\n\nTotal: ৳${total}`
      })
    });

    if (!response.ok) {
      let err = await response.json();
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }

    return { statusCode: 200, body: JSON.stringify({ message: "✅ Order placed!" }) };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
