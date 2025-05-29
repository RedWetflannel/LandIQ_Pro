
async function runAI() {
  const zip = document.getElementById("zip").value;
  const price = parseFloat(document.getElementById("price").value);
  const address = document.getElementById("address").value;

  const prompt = `You are LandIQ Co-Pilot — the most powerful and fun-to-use land flipping AI in the world.

Your job is to act like a high-energy, strategic land sales closer with deep builder intelligence.

Given this input:
- Address: ${address}
- ZIP: ${zip}
- Land Price: $${price}

Provide a bold, easy-to-read breakdown using fun emojis, sales lingo, and punchy formatting.

Output Format:

🔥 LandIQ Deal Breakdown — [ADDRESS]

📍 First Pitch Offer: $XX,XXX — your smart anchor price

💬 Negotiation Wiggle Room: 70–85% of value ($XX,XXX – $XX,XXX)

🚫 Final Cap Offer: $XX,XXX — NEVER go above this (land is priced at $${price})

💸 Assignment Fee Potential: 10–15% of builder’s net = (show range)

🧮 Builder Margin: XX% – XX% — builders will love/hate this

⚠️ Risk Snapshot:
- Market Demand: ✅ or ⚠️
- Build Cost: ✅ or ⚠️
- Zoning/Access: 🔍 Flag if issues
- Any red flags? Quick bullet

🏆 LandIQ Deal Score:
🎯 Score: XX / 100
📊 Grade: A+ / B / C
📈 Short summary line: (e.g., “This is a high-margin deal with light risk. Go for it.”)

Always simulate like you're the sharpest land rep in the country with access to comps, builder behavior, and pricing psychology.

Keep tone fun, human, and confident.`;

  document.getElementById("output").innerHTML = "Thinking...";

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "mistral",
      prompt: prompt,
      stream: false
    })
  });

  const data = await response.json();
  document.getElementById("output").innerHTML = data.response;
  document.getElementById("copyBtn").disabled = false;
  document.getElementById("exportBtn").disabled = false;
}

function copyToClipboard() {
  const text = document.getElementById("output").innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  });
}

function exportToCSV() {
  const text = document.getElementById("output").innerText;
  const blob = new Blob([text], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "landiq_deal.csv";
  a.click();
  URL.revokeObjectURL(url);
}
