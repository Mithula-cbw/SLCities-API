const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    city_name: { type: String, required: true },
    district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
    coordinates: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true } // [longitude, latitude]
    }
});

// Create 2dsphere index for geospatial queries
citySchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('City', citySchema);
