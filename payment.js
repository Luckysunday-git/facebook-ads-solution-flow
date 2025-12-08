(function () {
  // globals used by paystack.js
  window.selectedQ1 = "";
  window.selectedQ2 = ""; // the selected goal (Q2) or advanced topic name
  window.selectedAmount = 0; // in Naira (integer)

  document.addEventListener("DOMContentLoaded", () => {
    const question1 = document.getElementById("question1");
    const question2 = document.getElementById("question2");
    const advancedContainer = document.getElementById(
      "advancedTopicsContainer"
    );
    const advancedList = document.getElementById("advancedTopics");
    const topicsDiv = document.getElementById("topics");
    const topicsListEl = document.getElementById("topicsList");
    const qSelectedEl = document.querySelector(".qSelected");
    const payBtn = document.getElementById("payBtn");
    const expertBtn = document.getElementById("expert");
    const backToQ2 = document.getElementById("backToQ2");

    // Track previous screen for Topics back navigation
    let previousScreen = "question2"; // default

    // topicsMap
    window.topicsMap = {
      "I want to learn how to run profitable Facebook ads from scratch": [
        "What Facebook Ads is & how it works.",
        "The right way to set up Facebook Business Manager before running ads.",
        "How to create your first ad account.",
        "Understanding campaign objectives.",
        "The best ad campaign objective in 2025.",
        "Getting to know the best payment method to fund your ad account with to avoid restrictions.",
        "How to create landing pages / websites for your online or offline products in minutes using AI.",
        "Beauty Spa Website, how to launch Your Business Online in Minutes!",
        "Pixel setup and basics to track visitors.",
        "Audience target setup for beginners.",
        "How to setup custom Audience using AI.",
        "Step-by-step ad creation.",
        "Budgeting and bidding basics.",
        "Reading simple analytics.",
        "How to successfully publish your first ad to make more sales.",
      ],
      "I want to learn how to spend ₦5000 on ads and make at least ₦50,000": [
        "How to define your revenue goal (₦50,000) and set ROI target (10x).",
        "How to select a high-demand, high-profit product or service suitable for aggressive ROI.",
        "How to properly research your ideal audience: interests, demographics, buyer behavior.",
        "Creating custom audiences from past buyers or leads if available.",
        "How to use lookalike audiences for maximum conversion efficiency.",
        "Setting up conversion-focused campaigns using Facebook Ads Manager.",
        "Use high-converting creatives: strong hooks, clear benefits, short video or clean images.",
        "How to build a mobile-first, fast-loading landing page / website with simple checkout using AI.",
        "How to install Facebook Pixel and configure conversion tracking.",
        "Testing 2–3 creatives to identify the winning ad.",
        "How to monitor performance metrics: CPC, CTR, ROAS and pause weak ads.",
        "How to optimize audience, placement or creatives based on real-time results.",
        "Using retargeting ads for people who visited but didn’t buy.",
        "Applying urgency or bonuses to drive retargeting conversions.",
        "How to scale gradually after finding a profitable ad set.",
        "Documenting every test: audience, creatives, results, improvements.",
        "Repeating the process to consistently hit or exceed 10x ROI.",
      ],

      "I want to learn how to set up ads that send people to my WhatsApp DM, join my groups, view my status etc.":
        [
          "Understanding the difference between Click-to-WhatsApp and WhatsApp Conversion Ads.",
          "How to connect your WhatsApp Business number to Facebook Business Manager.",
          "How to verify your WhatsApp Business account and assign it to your ad account.",
          "How to create a WhatsApp message template for automated conversations.",
          "How to integrate bot to your whatsapp to chat with your customers or audience",
          "Choosing the right campaign objective: Messages, sales or Conversions.",
          "How to select WhatsApp as the messaging platform in the ad setup.",
          "Set up your target audience based on interest, behavior, or lookalikes.",
          "Crafting a compelling ad copy with a strong reason to chat or join.",
          "About using clean, attention-grabbing creatives (images/videos).",
          "How to create a pre-filled WhatsApp message that users will send automatically.",
          "How to optimize for messaging conversions using Meta API.",
          "Setting up retargeting for people who clicked your ad but didn’t message.",
          "Tracking performance using click-to-chat metrics in Ads Manager.",
          "How to create automated WhatsApp responses to handle leads instantly.",
          "Automatic redirecting users from WhatsApp to groups, funnels, status views, or broadcasts.",
          "Testing multiple messaging angles to increase WhatsApp open rate.",
          "Analysing CPC, CPM, and reply rate to improve results.",
        ],

      "I want to learn how to fix my current ads": [
        "How to audit current ad campaigns.",
        "Major mistakes that mess up many great ad campaigns.",
        "The best payment method for funding of ad account to avoid restrictions.",
        "How to identify why ads aren't converting.",
        "The best ad campaign objective in 2025.",
        "Optimizing audience targeting.",
        "How to setup custom Audience using AI.",
        "How to improving ad creatives the right way.",
        "Fixing campaign objectives.",
        "Analyzing ad frequency and relevance.",
        "How to know when to pause a particular ad campaign.",
        "When and how to adjust ad budget for better results.",
        "How to use low budget to miximize profit.",
        "How to use retargeting strategies the right way.",
        "Troubleshooting ad delivery issues.",
        "Scaling campaigns effectively.",
      ],
      "I want to learn how to use Facebook ad to sell my physical products like shoes, clothes, hairs, bags etc.":
        [
          "How to set up product catalog setup for Facebook Ads",
          "How to create landing pages/ websites for your online or offline products/stores in minutes using AI.",
          "Beauty Spa Websites, how to launch Your Business Online!",
          "Best way to run ads that lead visitors to your landing pages, online stores or websites",
          "The best ad campaign objective in 2025",
          "Audience research for your product niche",
          "How to setup custom Audience using AI",
          "Creating high-converting ad creatives",
          "Setting up sales-focused campaign objectives",
          "Optimizing product listings for ads",
          "Pixel & conversion tracking for purchases",
          "How to retarget past website visitors & cart abandoners",
          "Scaling ads while maximizing ROI",
          "Running limited-time offer & promotional campaigns",
          "Monthly performance reporting & optimization tips",
        ],

      "I want to learn how to start a profitable online business": [
        "How to pick a business model (digital products, affiliate marketing, freelancing, e-commerce, coaching, etc.)",
        "How to choose a clear niche for your business (fitness, fashion, tech, skincare, digital marketing, etc.)",
        "How to validate the niche by checking demand using Google Trends, TikTok search, YouTube search, Amazon, etc.",
        "How to build your online presence (website, landing page, portfolio, or social media business pages) using AI.",
        "How to create your main offer — what exactly people will buy from you.",
        "How to set up online payment methods (Paystack, Flutterwave, Monnify, etc.)",
        "How to create a traffic system to attract customers (TikTok, Instagram Reels, YouTube, Facebook ads, etc.)",
        "How to launch your business — post content, share your offer, promote it daily.",
        "How to optimize and scale once you make your first sales (improve offers, run ads, build email list).",
        "The needs to add more products/services and reinvesting in marketing.",
      ],

      "I want to learn how to improve and scale my results": [
        "How to do advanced targeting & lookalike audiences.",
        "The best campaign objective in 2025.",
        "How to write ad copies that easily convert.",
        "Creative testing & optimization process.",
        "How to scale winning campaigns.",
        "How to setup custom Audience using AI.",
        "How to do custom audience segmentation.",
        "Advanced conversion tracking.",
        "Dynamic ads & product catalogs.",
        "Retargeting funnels.",
        "Ad automation techniques.",
        "Performance analytics for scale.",
        "Budget management for high ROI.",
      ],
      "I need an expert to run my ads for me": [
        // "How to safely complete ad account setup.",
        // "Campaign creation & management.",
        // "The best campaign objective in 2025.",
        // "Right procss of Audience research & targeting.",
        // "Ad creative design formula that bring more sales.",
        // "How to create your landing page or website using AI.",
        // "How to install facebook pixel & conversion tracking for purchases on your website / landing page.",
        // "Creative testing & optimization.",
        // "Retargeting & funnel strategy.",
        // "Ad optimization & scaling.",
        // "Beauty Spa Website, how to launch Your Business Online!",
        // "How to setup custom Audience using AI.",
        // "Monthly performance reporting.",
        // "Ongoing campaign troubleshooting.",
        // "Dedicated expert support.",
        "Please I need an expert to run ads for me.",
      ],
    };

    // Render advanced topics as clickable buttons
    function renderAdvancedTopics() {
      advancedList.innerHTML = "";
      Object.keys(window.advancedTopicsDetails).forEach((topic) => {
        const div = document.createElement("div");
        div.className = "option-btn adv-item";
        div.innerText = topic;
        advancedList.appendChild(div);
      });
    }
    renderAdvancedTopics();

    // Q1 selection -> show Q2
    document.querySelectorAll(".q1").forEach((btn) => {
      btn.addEventListener("click", () => {
        window.selectedQ1 = btn.innerText.trim();
        question1.classList.add("hidden");
        question2.classList.remove("hidden");
      });
    });

    // 'Others' button opens advanced topics
    document.getElementById("others").addEventListener("click", () => {
      question1.classList.add("hidden");
      advancedContainer.classList.remove("hidden");
    });

    // Back from advanced -> Q1
    document
      .getElementById("backFromAdvanced")
      .addEventListener("click", () => {
        advancedContainer.classList.add("hidden");
        question1.classList.remove("hidden");
      });

    // Q2 selection -> show topics list
    document.querySelectorAll(".q2").forEach((btn) => {
      btn.addEventListener("click", () => {
        window.selectedQ2 = btn.innerText.trim();
        previousScreen = "question2"; // track previous
        qSelectedEl.innerHTML = `( ${window.selectedQ2} )`;
        const topics = window.topicsMap[window.selectedQ2];
        topicsListEl.innerHTML = "";
        topics.forEach((t, i) => {
          const li = document.createElement("li");
          li.textContent = `${i + 1}. ${t}`;
          topicsListEl.appendChild(li);
        });

        // Set amounts
        switch (window.selectedQ2) {
          case "I want to learn how to run profitable Facebook ads from scratch":
            window.selectedAmount = 20500;
            break;
          case "I want to learn how to set up ads that send people to WhatsApp DM, join groups, view status etc.":
            window.selectedAmount = 20000;
            break;
          case "I want to learn how to fix my current ads":
            window.selectedAmount = 15000;
            break;
          case "I want to learn how to use Facebook ad to sell my physical products like shoes, clothes, hairs, bags etc.":
            window.selectedAmount = 20000;
            break;
          case "I want to learn how to spend ₦5000 on ads and make at least ₦50,000":
            window.selectedAmount = 20000;
            break;
          case "I want to learn how to improve and scale my results":
            window.selectedAmount = 25000;
            break;
          case "I want to learn how to set up ads that send people to my WhatsApp DM, join my groups, view my status etc.":
            window.selectedAmount = 15500;
            break;
          case "I need an expert to run my ads for me":
            window.selectedAmount = 42500;
            break;
          default:
            window.selectedAmount = 10000;
        }

        payBtn.innerText = `Pay ₦${window.selectedAmount.toLocaleString()} to Start`;
        question2.classList.add("hidden");
        topicsDiv.classList.remove("hidden");
      });
    });

    // Advanced topic clicked -> show topics list
    advancedList.addEventListener("click", (e) => {
      const item = e.target.closest(".adv-item");
      if (!item) return;
      window.selectedQ2 = item.innerText.trim();
      previousScreen = "advanced"; // track previous screen
      window.selectedAmount =
        window.advancedTopicsPayment[window.selectedQ2] || 10000;

      qSelectedEl.innerHTML = `( ${window.selectedQ2} )`;
      topicsListEl.innerHTML = "";
      const details = window.advancedTopicsDetails[window.selectedQ2] || [];
      details.forEach((d, i) => {
        const li = document.createElement("li");
        li.textContent = `${i + 1}. ${d}`;
        topicsListEl.appendChild(li);
      });

      payBtn.innerText = `Pay ₦${window.selectedAmount.toLocaleString()} to Start`;
      advancedContainer.classList.add("hidden");
      topicsDiv.classList.remove("hidden");
    });

    // Back button from Topics list
    backToQ2.addEventListener("click", () => {
      topicsDiv.classList.add("hidden");
      if (previousScreen === "advanced") {
        advancedContainer.classList.remove("hidden");
      } else {
        question2.classList.remove("hidden");
      }
    });

    // Join WhatsApp group
    // document.getElementById("joinGroupBtn").addEventListener("click", () => {
    //   window.open("https://chat.whatsapp.com/JsMM1KoIbU2Lk47fYxbcE1", "_blank");
    // });

    // document.getElementById("joinGroupBtn2").addEventListener("click", () => {
    //   window.open("https://chat.whatsapp.com/JsMM1KoIbU2Lk47fYxbcE1", "_blank");
    // });

    // document.getElementById("joinGroupBtn3").addEventListener("click", () => {
    //   window.open("https://chat.whatsapp.com/JsMM1KoIbU2Lk47fYxbcE1", "_blank");
    // });

    // document.getElementById("joinGroupBtn4").addEventListener("click", () => {
    //   window.open("https://chat.whatsapp.com/JsMM1KoIbU2Lk47fYxbcE1", "_blank");
    // });

    // document.getElementById("joinGroupBtn5").addEventListener("click", () => {
    //   window.open("https://chat.whatsapp.com/JsMM1KoIbU2Lk47fYxbcE1", "_blank");
    // });
    // document.getElementById("joinGroupBtn6").addEventListener("click", () => {
    //   window.open("https://chat.whatsapp.com/JsMM1KoIbU2Lk47fYxbcE1", "_blank");
    // });

    // Back navigation
    document.getElementById("backToQ1").addEventListener("click", () => {
      question2.classList.add("hidden");
      question1.classList.remove("hidden");
    });

    // Expert chat
    expertBtn.addEventListener("click", () => {
      let message = `Hi, *Coach Lucky,*\n\n*I want to start the training.*\n\n`;
      if (window.selectedQ1)
        message += `My current situation: *${window.selectedQ1}*\n\n`;
      if (window.selectedQ2)
        message += `My main goal: *${window.selectedQ2}*\n\n`;
      const details =
        window.topicsMap[window.selectedQ2] ||
        window.advancedTopicsDetails[window.selectedQ2] ||
        [];
      if (details.length) {
        message += "*Topics I want to learn:*\n";
        details.forEach((t, i) => (message += `${i + 1}. ${t}\n`));
      }
      const encoded = encodeURIComponent(message);
      const number = "2348118254967";
      window.open(`https://wa.me/${number}?text=${encoded}`, "_blank");
    });

    // Expose helper for Paystack
    window.getSelectedPaymentInfo = function () {
      return {
        topic: window.selectedQ2 || "",
        amountNaira: window.selectedAmount || 0,
        currentSituation: window.selectedQ1 || "",
      };
    };

    // Initial button text
    window.selectedAmount = 10000;
    payBtn.innerText = `Pay ₦${window.selectedAmount.toLocaleString()} to Start`;
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const copyBtn = document.getElementById("copyNumberBtn");

  const expertNumber = document.getElementById("expertNumber");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(expertNumber.textContent.trim());

      copyBtn.textContent = "Copied!";
      copyBtn.style.background = "#16a34a";

      setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.style.background = "#3b82f6";
      }, 1500);
    });
  }
});
