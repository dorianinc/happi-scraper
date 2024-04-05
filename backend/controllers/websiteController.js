const { Website } = require("../db/models/index.js");

// Get all websites
exports.getWebsites = async (req, res) => {
  const websites = await Website.findAll({ raw: true });
  res.status(200).json(websites);
};

// Update Website
exports.updateWebsite = async (req, res) => {
  const website = await Website.findByPk(req.params.id, { raw: true });
  if (!website) res.status(404).json(doesNotExist("Website"));
  console.log("🖥️  req.body: ", req.body);
  for (property in req.body) {
    let value = req.body[property];
    website[property] = value;
  }
  await website.save();
  res.status(200).json(website);
};

// // Update a Booking
// router.put(
//   "/:bookingId",
//   [restoreUser, requireAuth, validateBooking],
//   async (req, res) => {
//     const { user } = req;

//     const booking = await Booking.findByPk(bookingId, {
//       where: {
//         id: bookingId,
//       },
//     });
//     if (!booking) res.status(404).json(doesNotExist("Booking"));
//     else {
//       if (!hasPassed(null, booking.endDate, res)) {
//         const bookedDates = await Booking.findAll({
//           where: {
//             spotId: spotId,
//           },
//           attributes: ["id", "startDate", "endDate"],
//           raw: true,
//         });
//         const bookingEdits = { startDate, endDate, bookingId };
//         if (isAuthorized(user.id, booking.userId, res)) {
//           if (isAvailable(bookingEdits, bookedDates, res)) {
//             for (property in req.body) {
//               let value = req.body[property];
//               booking[property] = value;
//             }
//             await booking.save();
//             res.status(200).json(booking);
//           }
//         }
//       }
//     }
//   }
// );
