const Page = require("../models/Page");

exports.newPage = (req, res) => {
  res.render("pages/new");
};

exports.createPage = async (req, res) => {
  try {
    const page = new Page(req.body);
    await page.save();
    res.redirect(`/pages/${page.slug}`);
  } catch (err) {
    res.render("pages/new", { error: err });
  }
};

exports.showPage = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (!page) {
      return res.status(404).send("Page not found");
    }
    res.render("pages/show", { page });
  } catch (err) {
    res.status(500).send("An error occurred");
  }
};

exports.editPage = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (!page) {
      return res.status(404).send("Page not found");
    }
    res.render("pages/edit", { page });
  } catch (err) {
    res.status(500).send("An error occurred");
  }
};

exports.updatePage = async (req, res) => {
  try {
    const page = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    if (!page) {
      return res.status(404).send("Page not found");
    }
    res.redirect(`/pages/${page.slug}`);
  } catch (err) {
    res.render("pages/edit", { error: err });
  }
};

exports.deletePage = async (req, res) => {
  try {
    const page = await Page.findOneAndDelete({ slug: req.params.slug });
    if (!page) {
      return res.status(404).send("Page not found");
    }
    res.redirect("/pages");
  } catch (err) {
    res.status(500).send("An error occurred");
  }
};
