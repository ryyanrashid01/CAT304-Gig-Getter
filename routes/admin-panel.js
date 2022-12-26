const admin_panel_get = (req, res) => {
  res.render("admin-panel", { session: req.session });
};

module.exports = { admin_panel_get };
