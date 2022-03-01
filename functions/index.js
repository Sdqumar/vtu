const functions = require("firebase-functions");
const puppeteer = require("puppeteer");

exports.vehicleCheck = functions
  .runWith({ memory: "1GB" })
  .https.onRequest(async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    const { number } = request.query;
    const browser = await puppeteer.launch();
    const url =
      "https://my.service.nsw.gov.au/MyServiceNSW/index#/rms/freeRegoCheck/details";
    let finalResult = "";
    try {
      const page = await browser.newPage();

      await page.goto(url);
      await page.waitForSelector("#formly_2_input_plateNumber_0");
      await page.type("#formly_2_input_plateNumber_0", number);
      await page.click(
        "#formly_2_checkbox-label-with-action_termsAndConditions_1"
      );
      page.on("response", async (response) => {
        response.text().then(function (textBody) {
          if (textBody.startsWith("[")) {
            const json = JSON.parse(textBody);
            const body = json[0];
            if (body.method == "postVehicleListForFreeRegoCheck") {
              finalResult = body.result;
            }
          }
        });
      });
      await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
      ]);

      if (finalResult) {
        response.status(200).json({
          data: finalResult,
        });
        browser.close();
      }
    } catch (error) {
      response.status(400).json(error);
    }
  });
