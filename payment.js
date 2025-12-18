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

      "I want to learn how to run TikTok ads for my business": [
        "How to create and set up your TikTok Ads Manager.",
        "How to install TikTok Pixel on your website or landing page.",
        "How to pick the correct campaign objective.",
        "How to create TikTok-style short videos with native pacing.",
        "How to use hooks, trending formats, and text overlays.",
        "How to test multiple creatives at once (3–5 videos).",
        "How to identify strong CTR, CPC, and view duration.",
        "How to target interest + behavior audiences effectively.",
        "How to use automated creative optimization (ACO).",
        "How to scale winning TikTok ads profitably.",
      ],

      "I want to learn how to run YouTube Ads professionally": [
        "How to create a Google Ads account.",
        "How to link your YouTube channel to Google Ads.",
        "How to choose the right YouTube ad objective (sales, leads, traffic, awareness).",
        "How to select the best YouTube ad format (skippable, non-skippable, in-feed, Shorts, bumper).",
        "How to define your target audience (location, age, interests, keywords, placements).",
        "How to set daily budgets and bidding strategies correctly.",
        "How to upload and optimize your video ad for conversions.",
        "How to write compelling ad headlines and descriptions.",
        "How to add call-to-action buttons and links.",
        "How to set up conversion tracking for YouTube Ads.",
        "How to monitor performance metrics (views, CPV, CTR, conversions).",
        "How to optimize ads to reduce cost and increase results.",
        "How to scale winning YouTube ad campaigns safely.",
        "How to avoid ad disapprovals and account suspensions.",
        "How to manage YouTube Ads professionally as your business grows.",
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

      "I want to learn how to run Google Ads for my business": [
        "How to create and set up your Google Ads account correctly.",
        "How to choose the right campaign type (Search, Display, YouTube, Shopping, Performance Max).",
        "How to do proper keyword research using Google Keyword Planner.",
        "How to select high-intent keywords that bring ready-to-buy customers.",
        "How to structure campaigns and ad groups for better Quality Score.",
        "How to write high-converting ad copy that matches search intent.",
        "How to set up conversion tracking with Google Tag or Google Analytics.",
        "How to use smart bidding strategies (Maximize Conversions, Target CPA, ROAS).",
        "How to optimize ads using CTR, CPC, Quality Score, and conversion data.",
        "How to scale profitable Google Ads campaigns without wasting budget.",
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

      "I want to learn how to create compelling ad videos & designs": [
        "How to understand basic design principles (contrast, spacing, colors, alignment).",
        "How to pick the right tools like Canva, CapCut, Adobe Express, or Premiere Rush.",
        "How to study winning ads to know what works in your niche.",
        "How to write a simple script or storyboard before designing.",
        "How to create strong hooks within the first 3 seconds.",
        "How to edit videos with captions, transitions, effects, and movement.",
        "How to add engaging elements like emojis, stickers, and sound effects.",
        "How to design clear, bold, high-quality thumbnails and images.",
        "How to export videos in correct formats for Facebook, IG, and TikTok.",
        "How to create multiple variations of designs/videos for testing.",
      ],

      "I want to learn how to target the right audience for my business": [
        "How to define your ideal customer avatar.",
        "How to use Meta Audience Insights for research.",
        "How to choose the best interests relevant to your niche.",
        "How to group interests properly into ad sets.",
        "How to create custom audiences (visitors, engagers, leads).",
        "How to create lookalike audiences based on your best data.",
        "How to test multiple audiences at once.",
        "How to identify which audiences perform best.",
        "How to block bad audiences using exclusions.",
        "How to scale using the winning audience groups.",
      ],

      "I want to learn how to write powerful ad copies that convert": [
        "How to research audience pain points, fears, desires, and goals.",
        "How to use copywriting formulas like AIDA, PAS, FAB, and Before–After–Bridge.",
        "How to write strong hooks that stop the scroll.",
        "How to focus on benefits instead of features.",
        "How to inject emotions, storytelling, or social proof.",
        "How to use simple persuasive language that is easy to read.",
        "How to structure copy for WhatsApp conversion or landing pages.",
        "How to add scarcity, urgency, bonuses, or guarantees.",
        "How to format your copy with spacing for readability.",
        "How to write strong call-to-actions that drive clicks.",
      ],

      "I want to learn how to run Instagram ads specifically": [
        "How to switch your account to a Professional/Business account.",
        "How to connect your Instagram page to your Facebook Business Manager.",
        "How to choose Instagram-focused campaign objectives.",
        "How to select only Instagram placements (Reels, Feed, Stories, Explore).",
        "How to design Instagram-formatted creatives (1:1, 4:5, 9:16).",
        "How to write captions that fit Instagram culture.",
        "How to test multiple creatives for Reels and Feed separately.",
        "How to analyze Instagram ad metrics like saves, shares, profile visits.",
        "How to use deep-interest targeting for IG audiences.",
        "How to scale the best performing Instagram ads.",
      ],

      "I want a complete Facebook ads mentorship program": [
        "How to join a full step-by-step mentorship roadmap.",
        "How to follow structured learning modules weekly.",
        "How to complete guided practical assignments.",
        "How to get mentor feedback on your campaigns.",
        "How to set up real ad campaigns for practice.",
        "How to fix errors and troubleshoot issues with support.",
        "How to apply advanced targeting, creative, and copywriting skills.",
        "How to join live sessions, Q&A, or community discussions.",
        "How to monitor your progress with weekly tasks.",
        "How to graduate with confidence to run ads profitably.",
      ],

      "I want to learn how to create sales funnels for my ads": [
        "How to understand funnel stages (TOF, MOF, BOF).",
        "How to create a landing page or WhatsApp funnel.",
        "How to craft an irresistible offer to attract quality leads.",
        "How to connect traffic ads to your funnel page.",
        "How to install tracking tools like Pixel or CAPI.",
        "How to write funnel copy that increases conversions.",
        "How to create email/WhatsApp automation for follow-up.",
        "How to retarget people who didn’t take action.",
        "How to measure funnel performance using analytics.",
        "How to optimize your funnel for higher conversion rates.",
      ],

      "I want access to your full Ads Mastery Course": [
        "How to enroll in the full Ads Mastery program (see details below).",
        "How to access step-by-step lessons on ads setup.",
        "How to study targeting, creatives, copywriting, and scaling modules.",
        "How to download templates (scripts, copies, designs).",
        "How to complete quizzes and practice exercises.",
        "How to join support groups or mentorship calls.",
        "How to run practical campaigns alongside lessons.",
        "How to fix common ad errors using provided guides.",
        "How to track your learning progress.",
        "How to apply everything to real paid advertising.",
      ],

      "I want to learn how to generate quality leads for my business": [
        "How to define the exact type of leads you want.",
        "How to create valuable lead magnets (PDFs, videos, discounts).",
        "How to run Lead Form ads or Landing Page lead ads.",
        "How to set up conversion tracking for your leads.",
        "How to target people most likely to sign up.",
        "How to design high-converting creatives for lead gen.",
        "How to qualify leads automatically (questions, filters).",
        "How to automate WhatsApp or email follow-ups.",
        "How to measure lead quality vs cost.",
        "How to optimize for cheaper & higher-quality leads.",
      ],

      "I want to learn how to create and manage a Business Manager properly": [
        "How to create a Meta Business Manager account.",
        "How to add your Facebook Page, Instagram account, and Ad Account.",
        "How to assign roles and permissions safely.",
        "How to set up business verification.",
        "How to organize assets into folders and projects.",
        "How to set up Meta Pixel properly.",
        "How to set up Conversion API (CAPI) for better tracking.",
        "How to connect payment methods securely.",
        "How to maintain account health and avoid restrictions.",
        "How to manage everything professionally as your business grows.",
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
            window.selectedAmount = 7500;
            break;
          case "I want to learn how to set up ads that send people to WhatsApp DM, join groups, view status etc.":
            window.selectedAmount = 7500;
            break;
          case "I want to learn how to fix my current ads":
            window.selectedAmount = 15000;
            break;
          case "I want to learn how to use Facebook ad to sell my physical products like shoes, clothes, hairs, bags etc.":
            window.selectedAmount = 10000;
            break;
          case "I want to learn how to spend ₦5000 on ads and make at least ₦50,000":
            window.selectedAmount = 9500;
            break;
          case "I want to learn how to improve and scale my ads results":
            window.selectedAmount = 25000;
            break;
          case "I want to learn how to set up ads that send people to my WhatsApp DM, join my groups, view my status etc.":
            window.selectedAmount = 7500;
            break;
          case "I need an expert to run my ads for me":
            window.selectedAmount = 30500;
            break;
          case "I want to learn how to create compelling ad videos & designs":
            window.selectedAmount = 7500;
            break;

          case "I want to learn how to target the right audience for my business":
            window.selectedAmount = 8000;
            break;

          case "I want to learn how to write powerful ad copies that convert":
            window.selectedAmount = 7500;
            break;

          case "I want to learn how to run Instagram ads specifically":
            window.selectedAmount = 7500;
            break;

          case "I want to learn how to run TikTok ads for my business":
            window.selectedAmount = 7500;
            break;

          case "I want to learn how to run Google Ads for my business":
            window.selectedAmount = 25000;
            break;

          case "I want a complete Facebook ads mentorship program":
            window.selectedAmount = 15000;
            break;

          case "I want to learn how to create sales funnels for my ads":
            window.selectedAmount = 12500;
            break;

          case "I want access to your full Ads Mastery Course":
            window.selectedAmount = 75000;
            break;

          case "I want to learn how to generate quality leads for my business":
            window.selectedAmount = 10200;
            break;

          case "I want to learn how to create and manage a Business Manager properly":
            window.selectedAmount = 15000;
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
      const number = "2348130853304";
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
