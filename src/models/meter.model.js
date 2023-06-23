const mongoose = require('mongoose')
const Joi = require('joi')

const meterSchema = mongoose.Schema({
    meter_number: { type: String, required: true, unique: true, length: 6 },
    added_at: { type: Date, default: Date.now },
})

const Meter = mongoose.model("meters", meterSchema);

const validMeter = Joi.object({
    meter_number: Joi.string().required()
})

module.exports = {Meter, validMeter};