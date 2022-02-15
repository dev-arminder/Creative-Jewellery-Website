require("dotenv").config();
// Backend File for Express
const express = require("express");
const errorHandler = require("errorhandler");

const Prismic = require("@prismicio/client");
const PrismicDOM = require("prismic-dom");
const bodyParser = require("body-parser");
const logger = require("morgan");
const methodOverride = require("method-override");

const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;
// Setting Up Template Engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Logging HTTP req res to console
app.use(logger("dev"));

app.use(methodOverride());

app.use(express.static(path.join(__dirname, "public")));

// For Parsing Incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
  // console.log(doc);
  if (doc.type === "product") {
    return `/detail/${doc.slug}`;
  }

  if (doc.type === "about") {
    return "/about";
  }

  if (doc.type === "collections") {
    return "/collections";
  }
  // Default to homepage
  return "/";
};
app.use(errorHandler());
// Middleware to inject prismic context
app.use(function(req, res, next) {
  res.locals.ctx = {
    endpoint: process.env.PRISMIC_ENDPOINT,
    linkResolver: handleLinkResolver
  };
  res.locals.Link = handleLinkResolver;
  // add PrismicDOM in locals to access them in templates.
  res.locals.PrismicDOM = PrismicDOM;
  res.locals.Numbers = index =>
    index == 0
      ? "One"
      : index == 1
      ? "Two"
      : index == 2
      ? "Three"
      : index === 3
      ? "Four"
      : "";
  next();
});

const handleRequestDefault = async api => {
  const meta = await api.getSingle("meta");
  const preloader = await api.getSingle("preloader");
  const navigation = await api.getSingle("navigation");
  return {
    meta,
    navigation,
    preloader
  };
};

// Routes
app.get("/", async (req, res) => {
  // intial Prismic request
  const api = await initApi(req);
  // API call for respective pages and data
  const home = await api.getSingle("home");
  const defaults = await handleRequestDefault(api);
  const { results: collections } = await api.query(
    Prismic.Predicates.at("document.type", "collection"),
    {
      fetchLinks: "product.image"
    }
  );
  // console.log(home)

  res.render("pages/home", {
    ...defaults,
    home,
    collections
  });
});

app.get("/about", async (req, res) => {
  const api = await initApi(req);
  const about = await api.getSingle("about");
  const defaults = await handleRequestDefault(api);
  // console.log(about.data.body);
  res.render("pages/about", {
    ...defaults,
    about
  });
});

app.get("/detail/:uid", async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequestDefault(api);
  const product = await api.getByUID("product", req.params.uid, {
    fetchLinks: "collection.title"
  });

  res.render("pages/detail", {
    ...defaults,
    product
  });
});

app.get("/collections", async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequestDefault(api);
  const home = await api.getSingle("home");
  const { results: collections } = await api.query(
    Prismic.Predicates.at("document.type", "collection"),
    {
      fetchLinks: "product.image"
    }
  );

  res.render("pages/collections", {
    ...defaults,
    collections,
    home
  });
});

app.listen(PORT, () => {
  console.log(`APP is Running on PORT - ${PORT}`);
});
