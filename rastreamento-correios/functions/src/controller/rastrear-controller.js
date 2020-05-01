const { rastro } = require('rastrojs');

exports.search = async (req, res, next) => {
   res.status(200).send(await rastro.track(req.params.code)); 
}