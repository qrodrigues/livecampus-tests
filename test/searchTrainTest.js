const puppeteer = require("puppeteer");
const { strict: assert } = require("assert");

describe("SNCF Connect Recherche train", function () {
  this.timeout(30000);

  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  after(async () => {
    await browser.close();
  });

  it("Ouverture de la page d'accueil", async () => {
    await page.goto("https://www.sncf-connect.com/");
    const title = await page.title();
    assert.strictEqual(title.includes("SNCF Connect"), true);
  });

  it("Doit chercher un train entre Orléans et La Rochelle", async () => {
    await page.goto("https://www.sncf-connect.com/");

    // Accepter les cookies si nécessaire
    const acceptCookiesButton = await page.$(
      'button[data-testid="cookie-consent-button"]'
    );
    if (acceptCookiesButton) {
      await acceptCookiesButton.click();
    }

    // Remplir le champ de départ
    await page.type("#depart-input", "Orléans"); // depart-input = ID (Fake id)

    // Remplir le champ d'arrivée
    await page.type("#arrivee-input", "La Rochelle"); // arrivee-input = ID (Fake id)

    // Cliquer sur le bouton de recherche
    await Promise.all([page.click("#search-button"), page.waitForNavigation()]); // search-button = ID (Fake id)

    // Vérifier que les résultats de la recherche sont affichés
    const resultsText = await page.$eval(
      ".search-results",
      (el) => el.innerText
    );
    assert.strictEqual(resultsText.includes("Orléans"), true); // Champ de départ
    assert.strictEqual(resultsText.includes("La Rochelle"), true); // Champ d'arrivée
  });

  it("Changement de la langue du site", async () => {
    await page.goto("https://www.sncf-connect.com/");

    await page.select("select#select-langage", "fr-BE"); // Select avec l'ID select-langage - Sélection de la langue fr-BE (Belgique) (Fake id)

    await page.waitForNavigation();

    const url = page.url();
    assert.strictEqual(url, "https://www.sncf-connect.com/fr-be/");
  });
});

describe("Informations légales", function () {
  this.timeout(30000);

  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  after(async () => {
    await browser.close();
  });

  it("Accès a la page informations légales", async () => {
    await page.goto("https://www.sncf-connect.com/informations-legales");
    const title = await page.title();
    assert.strictEqual(
      title.includes("Informations légales - SNCF Connect"),
      true
    );
  });

  it("Vérification Informations", async () => {
    await page.goto("https://www.sncf-connect.com/informations-legales");
    const content = await page.content();
    assert.strictEqual(
      content.includes(
        "SNCF Connect & Tech Services, Société par actions simplifiée au capital de 4.661.000 euros,",
        true
      )
    );
  });
});

describe("FAQ", function () {
  this.timeout(30000);

  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  after(async () => {
    await browser.close();
  });

  it("Accès a la page FAQ", async () => {
    await page.goto("https://www.sncf-connect.com/aide/aide-en-ligne");
    const title = await page.title();
    assert.strictEqual(
      title.includes("SNCF Connect : L'aide en ligne - Aide et Informations"),
      true
    );
  });

  it("Recherche 'Train complet'", async () => {});

  it("Vérification informations", async () => {
    await page.goto("https://www.sncf-connect.com/aide/alerte-train-complet");
    const content = await page.content();
    assert.strictEqual(
      content.includes(
        "Train complet ? On vous prévient dès qu'un billet est disponible !",
        true
      )
    );
  });
});

describe("Charte de confidentialités", function () {
  this.timeout(30000);

  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  after(async () => {
    await browser.close();
  });

  it("Accès a la page Charte de confidentialités ", async () => {
    await page.goto(
      "https://www.sncf-connect.com/informations-legales/confidentialite"
    );
    const title = await page.title();
    assert.strictEqual(
      title.includes("Charte de confidentialité - SNCF Connect"),
      true
    );
  });
  it("Vérification informations", async () => {
    await page.goto(
      "https://www.sncf-connect.com/informations-legales/confidentialite"
    );
    const content = await page.content();
    assert.strictEqual(
      content.includes("La présente charte de confidentialité", true)
    );
  });
});

describe("Gestion des cookies", function () {
  this.timeout(30000);

  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  after(async () => {
    await browser.close();
  });
  it("Accès a la page gestion des cookies", async () => {
    await page.goto(
      "https://www.sncf-connect.com/app/account/consentManagement"
    );
    const title = await page.title();
    assert.strictEqual(
      title.includes("SNCF Connect - Gestion des consentements"),
      true
    );
  });
});

describe("Contact", function () {
  this.timeout(30000);

  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  after(async () => {
    await browser.close();
  });
  it("Accès a la page contact", async () => {
    await page.goto("https://www.sncf-connect.com/aide/contact");
    const title = await page.title();
    assert.strictEqual(title.includes("Contact | FAQ sncf-connect.com"), true);
  });
});

describe("Offres", function () {
  this.timeout(30000);

  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  after(async () => {
    await browser.close();
  });
  it("Accès a la page offres", async () => {
    await page.goto("https://www.sncf-connect.com/app/catalogue");
    const title = await page.title();
    assert.strictEqual(
      title.includes(
        "Achat cartes de réductions & abonnements SNCF, billets TER, tickets métro & bus - SNCF Connect"
      ),
      true
    );
  });
  it("Accès à l'offre 'MAX JEUNE'", async () => {});
  it("Vérification informations", async () => {
    await page.goto(
      "https://www.sncf-connect.com/app/catalogue/description/max-jeune"
    );
    const content = await page.content();
    assert.strictEqual(
      content.includes(
        "Vous êtes flexible et n’avez pas besoin d’anticiper vos voyages ? L’abonnement MAX"
      ),
      true
    );
  });
});
