require("dotenv").config();
// Backend File for Express
const express = require("express");
const Prismic = require("@prismicio/client");
const PrismicDOM = require("prismic-dom");

const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;
// Setting Up Template Engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Initialize the prismic.io api
function initApi(req) {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req: req
  });
}

// PRISMIC Link Resolver
const handleLinkResolver = doc => {
  // Define the url depending on the document type
  // if (doc.type === 'page') {
  //   return '/page/' + doc.uid;
  // } else if (doc.type === 'blog_post') {
  //   return '/blog/' + doc.uid;
  // }
  // Default to homepage
  return "/";
};

// Middleware to inject prismic context
app.use(function(req, res, next) {
  res.locals.ctx = {
    endpoint: process.env.PRISMIC_ENDPOINT,
    linkResolver: handleLinkResolver
  };
  // add PrismicDOM in locals to access them in templates.
  res.locals.PrismicDOM = PrismicDOM;
  next();
});

// Routes

app.get("/", (req, res) => {
  res.render("pages/home");
});

app.get("/about", async (req, res) => {
  const api = await initApi(req);
  api
    .query(Prismic.Predicates.any("document.type", ["meta", "about"]))
    .then(response => {
      // response is the response object. Render your views here.
      const { results } = response;
      const [meta, about] = results;
      // about.data.body.forEach(media => console.log(media));
      res.render("pages/about", {
        meta,
        about
      });
    });
});

app.get("/detail/:uid", async (req, res) => {
  const api = await initApi(req);
  const meta = await api.getSingle("meta");
  const product = await api.getByUID("product", req.params.uid, {
    fetchLinks: "collection.title"
  });
  console.log(product.data.informations);
  res.render("pages/detail", {
    meta,
    product
  });
});

app.get("/collections", (req, res) => {
  res.render("pages/collection");
});

app.listen(PORT, () => {
  console.log(`APP is Running on PORT - ${PORT}`);
});
