// paystack.js
// (function () {
//   const PAYSTACK_KEY = "pk_live_f1cd72816e1e7939f2026803b200eb1f6ac00c1b";
//   const whatsappPhone = "2348118254967";

//   function parseAmountFromButtonText(text) {
//     if (!text) return 0;
//     const match = text.match(/\d{1,3}(?:,\d{3})*(?:\.\d+)?/);
//     if (!match) return 0;
//     return parseInt(match[0].replace(/,/g, ""), 10);
//   }

//   function openBankTransfer(amountNaira, topic) {
//     if (!window.PaystackPop) {
//       alert("Payment page not loaded. Please refresh.");
//       return;
//     }
//     if (!amountNaira || amountNaira <= 0) {
//       alert("Invalid amount. Please select a topic.");
//       return;
//     }

//     const handler = PaystackPop.setup({
//       key: PAYSTACK_KEY,
//       email: "customer@facebook.com",
//       amount: amountNaira * 100,
//       currency: "NGN",
//       channels: ["bank_transfer"],
//       ref: "FBADS-" + Math.floor(Math.random() * 1000000000 + 1),

//       metadata: {
//         custom_fields: [
//           {
//             display_name: "Topic",
//             variable_name: "topic",
//             value: topic || "",
//           },
//         ],
//       },

//       callback: function (response) {
//         alert(`Payment successful! Reference: ${response.reference}`);

//         const message = `*Hello Coach Lucky,*\n\nI just made a payment of *₦${amountNaira.toLocaleString()}* for the topic: *${topic}*.\n\nMy transaction reference number is:\n\n *${
//           response.reference
//         }*.\n\nKindly confirm so I can start the training.`;

//         const encoded = encodeURIComponent(message);

//         window.location.href = `https://wa.me/${whatsappPhone}?text=${encoded}`;
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
//       const info = window.getSelectedPaymentInfo
//         ? window.getSelectedPaymentInfo()
//         : null;

//       let amountNaira = info && info.amountNaira ? info.amountNaira : 0;
//       let topic = info && info.topic ? info.topic : "";

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

(function () {
  const PAYSTACK_KEY = "pk_live_f1cd72816e1e7939f2026803b200eb1f6ac00c1b"; // your public key
  const whatsappPhone = "2348118254967";

  function parseAmountFromButtonText(text) {
    if (!text) return 0;
    const match = text.match(/\d{1,3}(?:,\d{3})*(?:\.\d+)?/);
    if (!match) return 0;
    return parseInt(match[0].replace(/,/g, ""), 10);
  }

  function openBankTransfer(amountNaira, topic, userName, userEmail) {
    if (!window.PaystackPop) {
      alert("Payment page not loaded. Please refresh.");
      return;
    }
    if (!amountNaira || amountNaira <= 0) {
      alert("Invalid amount. Please select a topic.");
      return;
    }
    if (!userName || !userEmail) {
      alert("Please enter your name and email before proceeding.");
      return;
    }

    const handler = PaystackPop.setup({
      key: PAYSTACK_KEY,
      email: userEmail, // dynamically set user email
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
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: userName,
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

      // Get user inputs
      const userName = document.getElementById("name")?.value.trim();
      const userEmail = document.getElementById("email")?.value.trim();

      openBankTransfer(amountNaira, topic, userName, userEmail);
    });
  });
})();
