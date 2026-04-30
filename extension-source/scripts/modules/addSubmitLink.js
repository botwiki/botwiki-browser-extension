export default (botInfo) => {
  const accountRoles = document.querySelectorAll(".account-role");
  const isAutomated = Array.from(accountRoles).some((el) =>
    el.textContent.toLowerCase().includes("autom"),
  );

  if (!isAutomated || !botInfo.parentElement) return;

  try {
    document.querySelectorAll(".botwiki-submit-btn").forEach((e) => e.remove());
  } catch (error) {
    /* noop */
  }

  const name = document.title.split(" (@")[0];
  const url = botInfo.botUrl;

  let descriptionText = "";
  const descriptionEl = document.querySelector(
    botInfo.network === "twitter"
      ? '[data-testid="UserDescription"]'
      : ".account__header__content",
  );
  if (descriptionEl?.innerText) {
    descriptionText = descriptionEl.innerText.replace(/(\r\n|\n|\r)/gm, "");
  }

  const submitUrl = `https://botwiki.org/submit-your-bot/?bot-name=${encodeURIComponent(name)}&bot-urls[]=${encodeURIComponent(url)}&bot-description=${encodeURIComponent(descriptionText)}&bot-tagline=${encodeURIComponent(descriptionText)}`;

  const submitLink = document.createElement("a");
  submitLink.setAttribute("href", submitUrl);
  submitLink.setAttribute("target", "_blank");
  submitLink.innerHTML = "Submit to Botwiki";

  if (botInfo.linkClasses) {
    botInfo.linkClasses.forEach((className) =>
      submitLink.classList.add(className),
    );
  }
  submitLink.classList.add("botwiki-submit-btn");

  switch (botInfo.network) {
    case "twitter":
      submitLink.style = [
        `color: ${document.querySelector('meta[name="theme-color"]').content === "#000000" ? "#fff" : "#000"};`,
        "height: 2.4rem;",
        "width: 8rem;",
      ].join("");
      botInfo.parentElement.parentElement.prepend(submitLink);
      break;
    case "mastodon":
      submitLink.style = "vertical-align:top;";
      botInfo.parentElement.prepend(submitLink);
      break;
  }
};
