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
  // if (doc.type === 'page') {
  //   return '/page/' + doc.uid;
  // } else if (doc.type === 'blog_post') {
  //   return '/blog/' + doc.uid;
  // }
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
  // const meta = await api.getSingle("meta");
  // const preloader = await api.getSingle("preloader");
  const home = await api.getSingle("home");
  // const navigation = await api.getSingle("navigation");
  const defaults = await handleRequestDefault(api);
  const { results: collections } = await api.query(
    Prismic.Predicates.at("document.type", "collection"),
    {
      fetchLinks: "product.image"
    }
  );
  // console.log(home.data.gallery);
  // console.log(navigation.data);
  console.log(defaults);
  res.render("pages/home", {
    // meta,
    // preloader,
    ...defaults,
    home,
    collections
    // navigation
  });
});

app.get("/about", async (req, res) => {
  const api = await initApi(req);
  // const meta = await api.getSingle("meta");
  const about = await api.getSingle("about");
  // const preloader = await api.getSingle("preloader");
  // const navigation = await api.getSingle("navigation");
  const defaults = await handleRequestDefault(api);
  // console.log(preloader);
  res.render("pages/about", {
    // meta,
    ...defaults,
    about
    // preloader,
    // navigation
  });
});

app.get("/detail/:uid", async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequestDefault(api);
  // const meta = await api.getSingle("meta");
  // const preloader = await api.getSingle("preloader");
  // const navigation = await api.getSingle("navigation");
  const product = await api.getByUID("product", req.params.uid, {
    fetchLinks: "collection.title"
  });

  // const product = await api.getByUID("product", req.params.uid);
  // console.log(product);
  res.render("pages/detail", {
    // meta,
    ...defaults,
    product
    // preloader,
    // navigation
  });
});

app.get("/collections", async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequestDefault(api);
  // const meta = await api.getSingle("meta");
  const home = await api.getSingle("home");
  // const preloader = await api.getSingle("preloader");
  // const navigation = await api.getSingle("navigation");
  const { results: collections } = await api.query(
    Prismic.Predicates.at("document.type", "collection"),
    {
      fetchLinks: "product.image"
    }
  );

  // console.log(collections[0].data.products[0].products_product.data);
  // console.log(home);
  res.render("pages/collections", {
    // meta,
    ...defaults,
    collections,
    home
    // preloader,
    // navigation
  });
});

app.listen(PORT, () => {
  console.log(`APP is Running on PORT - ${PORT}`);
});
