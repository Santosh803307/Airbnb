const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,

    image: {
        url: String,
        filename: String,
        // filename: {
        //     type: String,
        //     default: "listingimage",
        // },
        // url: {
        //     type: String,
        //     default:
        //         "https://images.unsplash.com/photo-1494526585095-c41746248156",
        //     set: (v) =>
        //         v === ""
        //             ? "https://images.unsplash.com/photo-1494526585095-c41746248156"
        //             : v,
        // },
    },

    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ], 
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;