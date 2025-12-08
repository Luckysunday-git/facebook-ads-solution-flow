// // paystack.js
// // Bank-transfer-only Paystack integration. Uses window.getSelectedPaymentInfo()

// (function () {
//   const PAYSTACK_KEY = "pk_live_f1cd72816e1e7939f2026803b200eb1f6ac00c1b"; // replace if needed
//   const whatsappPhone = "2348118254967"; // used only if you want to redirect to whatsapp (not used here)

//   function parseAmountFromButtonText(text) {
//     if (!text) return 0;
//     const match = text.match(/\d{1,3}(?:,\d{3})*(?:\.\d+)?/);
//     if (!match) return 0;
//     return parseInt(match[0].replace(/,/g, ""), 10); // returns Naira integer
//   }

//   function openBankTransfer(amountNaira, topic) {
//     if (!window.PaystackPop) {
//       alert(
//         "Payment page not loaded. Please refresh or check your internet connection."
//       );
//       return;
//     }
//     if (!amountNaira || amountNaira <= 0) {
//       alert("Invalid amount. Please select a topic.");
//       return;
//     }

//     const handler = PaystackPop.setup({
//       key: PAYSTACK_KEY,
//       email: "customer@example.com", // optional: replace with collected user email
//       amount: amountNaira * 100, // kobo
//       currency: "NGN",
//       channels: ["bank_transfer"], // transfer only
//       ref: "FBADS-" + Math.floor(Math.random() * 1000000000 + 1),
//       metadata: {
//         custom_fields: [
//           { display_name: "Topic", variable_name: "topic", value: topic || "" },
//         ],
//       },
//       callback: function (response) {
//         alert(`Payment successful! Reference: ${response.reference}`);
//         // Optionally: you could redirect user to a "Thanks" page, or open WhatsApp here.

//         const message = `Hello Coach Lucky,\n\n
//         I just made a payment of *₦${amountNaira.toLocaleString()}* for the topic:*${topic}*.\n\n

//         My transaction reference is: *${response.reference}*;\n\n

//         Kindly confirm for me to start the training.`;
//         const encoded = encodeURIComponent(message);

//         window.location.href = `https://wa.me/2348118254967?text=${encoded}`;
//       },
//       onClose: function () {
//         alert("Payment window closed.");
//       },
//     });

//     handler.openIframe();
//   }

//   document.addEventListener("DOMContentLoaded", () => {
//     const payBtn = document.getElementById("payBtn");
//     if (!payBtn) return;

//     payBtn.addEventListener("click", () => {
//       // Use helper to get the canonical selected amount, but also parse button text as fallback
//       const info = window.getSelectedPaymentInfo
//         ? window.getSelectedPaymentInfo()
//         : null;
//       let amountNaira = info && info.amountNaira ? info.amountNaira : 0;
//       let topic = info && info.topic ? info.topic : "";

//       // Fallback: parse amount from button text if not set
//       if (!amountNaira) {
//         amountNaira = parseAmountFromButtonText(payBtn.innerText);
//       }

//       if (!amountNaira) {
//         alert("Please select a topic first.");
//         return;
//       }

//       openBankTransfer(amountNaira, topic);
//     });
//   });
// })();

// paystack.js
(function () {
  const PAYSTACK_KEY = "pk_live_f1cd72816e1e7939f2026803b200eb1f6ac00c1b";
  const whatsappPhone = "2348118254967";

  function parseAmountFromButtonText(text) {
    if (!text) return 0;
    const match = text.match(/\d{1,3}(?:,\d{3})*(?:\.\d+)?/);
    if (!match) return 0;
    return parseInt(match[0].replace(/,/g, ""), 10);
  }

  function openBankTransfer(amountNaira, topic) {
    if (!window.PaystackPop) {
      alert("Payment page not loaded. Please refresh.");
      return;
    }
    if (!amountNaira || amountNaira <= 0) {
      alert("Invalid amount. Please select a topic.");
      return;
    }

    const handler = PaystackPop.setup({
      key: PAYSTACK_KEY,
      email: "customer@facebook.com",
      amount: amountNaira * 100,
      currency: "NGN",
      channels: ["bank_transfer"],
      ref: "FBADS-" + Math.floor(Math.random() * 1000000000 + 1),

      metadata: {
        custom_fields: [
          {
            display_name: "Topic",
            variable_name: "topic",
            value: topic || "",
          },
        ],
      },

      callback: function (response) {
        alert(`Payment successful! Reference: ${response.reference}`);

        const message = `*Hello Coach Lucky,*\n\nI just made a payment of *₦${amountNaira.toLocaleString()}* for the topic: *${topic}*.\n\nMy transaction reference number is:\n\n *${
          response.reference
        }*.\n\nKindly confirm so I can start the training.`;

        const encoded = encodeURIComponent(message);

        window.location.href = `https://wa.me/${whatsappPhone}?text=${encoded}`;
      },

      onClose: function () {
        alert("Payment window closed.");
      },
    });

    handler.openIframe();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const payBtn = document.getElementById("payBtn");
    if (!payBtn) return;

    payBtn.addEventListener("click", () => {
      const info = window.getSelectedPaymentInfo
        ? window.getSelectedPaymentInfo()
        : null;

      let amountNaira = info && info.amountNaira ? info.amountNaira : 0;
      let topic = info && info.topic ? info.topic : "";

      if (!amountNaira) {
        amountNaira = parseAmountFromButtonText(payBtn.innerText);
      }

      if (!amountNaira) {
        alert("Please select a topic first.");
        return;
      }

      openBankTransfer(amountNaira, topic);
    });
  });
})();
