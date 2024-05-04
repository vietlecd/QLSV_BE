function adminRequired(req, res, next) {
    if (!req.session.isAdmin) {
        return res.status(401).send("Admin login required");
    }
    next();
}
