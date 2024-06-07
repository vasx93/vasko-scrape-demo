import { ScrapingBeeClient } from "scrapingbee";
import { load } from "cheerio";
import { validateURL } from "../validation/validate.js";
import { sendPromptToChatGPT } from "../chatgpt/prompt.js";

const scrape = async (url: string) => {
  validateURL(url);

  console.log(`Scraping URL: ${url}`);

  // scrape
  const htmlText = await fetchHTML(url);
  console.log("html size", htmlText.length);

  // load into cheerio
  const $ = load(htmlText);

  // extract body
  const body = $("body").html();
  console.log("body size", body?.length);

  if (!body) throw new Error("no html body");

  // extract images
  const images = extractImageUrls(body);

  // extract body text
  const text = extractText(body);
  console.log("text l", text.length);

  // send to gpt for analysis
  const chatgptResponse = await sendPromptToChatGPT(text);

  if (!chatgptResponse) throw new Error("no chatgpt data");

  const parsed = JSON.parse(chatgptResponse);

  return { ...parsed, images };
};

const fetchHTML = async (url: string) => {
  const key = process.env.SCRAPING_BEE_KEY;
  if (!key) throw new Error("Missing scraping bee key");

  const client = new ScrapingBeeClient(key);

  const response = await client.get({
    url,
    params: {
      block_ads: true,
    },
  });

  if (!response?.data) throw new Error("No data");

  const decoder = new TextDecoder();
  const text = decoder.decode(response.data);

  return text;
};

const extractImageUrls = (body: string) => {
  const $ = load(body);

  const imageURLS: string[] = [];

  $("img").each((_index, element) => {
    const img = $(element).attr("src");

    const validPrefix = ["http", "https"];
    if (img) {
      const protocol = img?.split("://")[0];

      if (validPrefix.includes(protocol)) imageURLS.push(img);
    }
  });

  return imageURLS;
};

const extractText = (body: string) => {
  const $ = load(body);

  let data = "";

  $("p, h1, h2, h3, h4, h5, h6").each((_index, element) => {
    const text = $(element).text().trim();
    if (text) {
      data += text;
    }
  });

  return data;
};

export default scrape;
