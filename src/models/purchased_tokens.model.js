const mongoose = require('mongoose')
const Joi = require('joi')

const purchasedTokensSchema = mongoose.Schema({
    meter_number: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'meters'
    },
    token: {
        type: Number,
        unique: true,
        length: 8
    },
    token_status: {
        type: String,
        enum: ["USED","NEW", "EXPIRED"],
        default: "NEW",
        
    },
    token_value_days: {
        type: Number,
    },
    amount: {
        type: Number
    },
    purchased_date: {
        type: Date,
        default: Date.now
    }
})

const PurchasedTokens = mongoose.model("purchased_tokens", purchasedTokensSchema);

const validPurchasedTokens = Joi.object({
    meter_number: Joi.string().required(),
    token: Joi.string().required(),
    token_value_days: Joi.number().required(),
    amount: Joi.number().required(),
})

module.exports = {PurchasedTokens, validPurchasedTokens};