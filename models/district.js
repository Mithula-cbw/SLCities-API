const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
    district_name: { type: String, required: true },
    maincity: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: false }  // References the 'City' model
});

// Export the District model
module.exports = mongoose.model('District', districtSchema);
