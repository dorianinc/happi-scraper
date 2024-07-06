const { Match, Product } = require("../db/models/index.js");

// Delete an Image from a Spot
exports.getProductMatches = async (req, res) => {

  const products = await Product.findAll({
    ...pagination,
    raw: true,
  });

  for (const product of products) {
    const matches = await Match.findAll({
      where: {
        productId: product.id,
      },
      raw: true,
    });

    if (matches.length) product.imgSrc = matches[0].imgSrc;
    else product.imgSrc = null;
    product.matches = matches;
  }

  res.status(200).json(products);
};

