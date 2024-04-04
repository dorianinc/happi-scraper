const { Product, Match } = require("../db/models/index.js");
const { doesNotExist } = require("../utils/helpers.js");

// Get all products
exports.getAllProducts = async (req, res) => {
  //  start of querying settings //
  ////////// start of page and size logic /////////////
  let { page, size } = req.query;

  // set defaults for page and sizes
  if (!page) page = 1;
  if (!size) size = 20;

  // convert page and size into numbers
  page = parseInt(page);
  size = parseInt(size);

  // declare limits for page and size
  if (page > 10) page = 10;
  if (size > 20) size = 20;

  let pagination = {};
  pagination.limit = size;
  pagination.offset = size * (page - 1);
  ////////// end of page and size logic /////////////
  // end of querying settings //

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

// Get product count
exports.getProductCount = async (_req, res) => {
  const productCount = await Product.count({});
  res.status(200).json(productCount);
};

// Get single product Details
exports.getProductById = async (req, res) => {
  console.log("getting single product");
  const productId = req.params.id;
  const product = await Product.findByPk(productId, { raw: true });

  if (!product) res.status(404).json(doesNotExist("Product"));
  else {
    const matches = await Match.findAll({
      where: {
        productId: productId,
      },
    });
    product.matches = matches;

    if (matches.length) product.imgSrc = matches[0].imgSrc;
    else product.imgSrc = null;

    res.status(200).json(product);
  }
};

// Delete a Product
exports.deleteProductById = async (req, res) => {
  const product = await Product.findByPk(req.params.productId);
  if (!product) res.status(404).json(doesNotExist("Product"));
  else {
    await product.destroy();
    res.status(200).json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
};

// // Create a new Product
// router.post("/", [restoreUser, requireAuth, validateProduct], async (req, res) => {
//   const { user } = req;
//   const data = { ownerId: user.id };

//   for (property in req.body) {
//     let value = req.body[property];
//     if (property === "state") {
//       data[property] = getName(value, false);
//     } else if (property === "country") {
//       data[property] = getName(value, true);
//     } else {
//       data[property] = value;
//     }
//   }

//   const newProduct = await Product.create({ ...reqData });
//   res.status(201).json(newProduct);
// });

// // Add Image to a Product
// router.post(
//   "/:productId/images",
//   [singleMulterUpload("image"), restoreUser, requireAuth],
//   async (req, res) => {
//     const { user } = req;
//     const { preview } = req.body;
//     const imageUrl = await singlePublicFileUpload(req.file);
//     const product = await Product.findByPk(req.params.productId, { raw: true });
//     if (!product) res.status(404).json(doesNotExist("Product"));
//     else {
//       if (isAuthorized(user.id, product.ownerId, res)) {
//         const newImage = await ProductImage.create({
//           url: imageUrl,
//           preview: true,
//           productId: product.id,
//         });
//         res.status(200).json(newImage);
//       } else {
//         res.status(403).json({
//           message: "Forbidden",
//           statusCode: 403,
//         });
//       }
//     }
//   }
// );

// // Update a Product
// router.put("/:productId", [restoreUser, requireAuth, validateProduct], async (req, res) => {
//   const { user } = req;

//   const product = await Product.findByPk(req.params.productId);
//   if (!product) res.status(404).json(doesNotExist("Product"));
//   else {
//     if (isAuthorized(user.id, product.ownerId, res)) {
//       for (property in req.body) {
//         let value = req.body[property];
//         if (property === "state") {
//           product[property] = getName(value, false);
//         } else if (property === "country") {
//           product[property] = getName(value, true);
//         } else {
//           product[property] = value;
//         }
//       }
//       await product.save();
//       res.status(200).json(product);
//     }
//   }
// });

// Create Review for Product
// router.post("/:productId/reviews", [restoreUser, requireAuth, validateReview], async (req, res) => {
//   const { review, stars } = req.body;
//   const { user } = req;

//   const product = await Product.findByPk(req.params.productId, { raw: true });
//   if (!product) res.status(404).json(doesNotExist("Product"));
//   else {
//     if (await Review.findOne({ where: { userId: user.id, productId: product.id } })) {
//       return res.status(500).json({
//         errors: { review: "User already has a review for this product" },
//         statusCode: 500,
//       });
//     } else {
//       const newReview = await Review.create({
//         userId: user.id,
//         productId: product.id,
//         review,
//         stars,
//       });
//       const reviewJSON = newReview.toJSON();
//       reviewJSON.User = user;
//       res.status(200).json(reviewJSON);
//     }
//   }
// });

// // Get all Reviews of Specific Product
// router.get("/:productId/reviews", async (req, res) => {
//   const reviews = await Review.findAll({
//     where: {
//       productId: req.params.productId,
//     },
//     include: [
//       { model: User, attributes: ["id", "firstName", "lastName"] },
//       { model: ReviewImage, attributes: ["id", "url"] },
//     ],
//     order: [["createdAt", "DESC"]],
//   });

//   if (!reviews.length) res.status(404).json(doesNotExist("Product"));
//   else res.status(200).json(reviews);
// });

// // Create New Booking for Specific Product
// router.post("/:productId/bookings", [restoreUser, requireAuth, validateBooking], async (req, res) => {
//   const { user } = req;

//   const product = await Product.findByPk(req.params.productId, { raw: true });
//   if (!product) res.status(404).json(doesNotExist("Product"));
//   else {
//     const { startDate, endDate, numNights, numAdults, numChildren, numInfants } = req.body;
//     const bookedDates = await Booking.findAll({
//       where: { productId: product.id },
//       attributes: ["id", "startDate", "endDate"],
//       raw: true,
//     });
//     if (user.id !== product.ownerId) {
//       const bookingRequest = { startDate, endDate };
//       if (isAvailable(bookingRequest, bookedDates, res)) {
//         const newBooking = await Booking.create({
//           productId: product.id,
//           userId: user.id,
//           startDate,
//           endDate,
//           numNights,
//           numAdults,
//           numChildren,
//           numInfants,
//         });
//         res.status(200).json(newBooking);
//       }
//     } else {
//       res.status(403).json("Owers Cannot Book Their Own Products");
//     }
//   }
// });
