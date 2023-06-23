const { generateToken } = require('../helpers/token.helper');
const { Meter, validMeter } = require('../models/meter.model');
const { PurchasedTokens } = require('../models/purchased_tokens.model');
require('dotenv').config()

const recordPurchase = async (req, res) => {
    console.log("Reached")
    try {
        const purchaseData = req.body;
        console.log(purchaseData)
        const meterData = {
            meter_number: purchaseData.meter_number
        }
        const { error } = validMeter.validate(meterData)
        if (error) {
            console.log(error)
            return res.status(400).json({ error: error.details[0].message })
        }
        else {
            const meterExist = await Meter.findOne({ meter_number: purchaseData.meter_number })
             let id ='';
            if (!meterExist) {
                console.log("New meter")
                const newMeter = new Meter(meterData);
                const meter = await newMeter.save();
                id = meter._id
                console.log(id)
            }
            console.log("After new meter")
            let meterNbr
            if(!meterExist){
                meterNbr = id
            }else {
                meterNbr = meterExist._id
            }
            if(purchaseData.amount %100!=0 || purchaseData.amount>=1825000){
                return res.send("Invalid amount, You can consider using a value greater than 100rwf, that is also a multiple of 100rwf, but not greater than 1 825 000rwf")
            }
            const tokenInfo = generateToken(purchaseData.meter_number, purchaseData.amount);
            const purchaseTransactionInformation =  new PurchasedTokens({
                meter_number: meterNbr,
                token: tokenInfo.token,
                token_value_days: tokenInfo.token_value_days,
                amount: purchaseData.amount
            })
            const purchase = await purchaseTransactionInformation.save();
            
            return res.send(purchase);

        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ error: "Failed to save Purchase", err })
    }
}

const listPurchaseHistory = async (req, res) => {
    try {
        const meter = req.body.meter_number;
        const registeredMeter = await Meter.findOne({meter_number: meter})
        if(meter.length != 6){
            return res.status(400).send("Meter Number should be 6-digit long")
        }
        if(!registeredMeter){
            
            return res.status(400).send({result: null})
        }

        console.log(registeredMeter._id)

        const result = await PurchasedTokens.find({meter_number:registeredMeter._id });
        if(result) {
            return res.status(200).json({
              result
            })
        }
        res.status(400).json({error: "unable to fetch data "})
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ error: "Purchases not found" })
    }
}

const validateToken = async(req, res) => {
    const token =Number.parseInt(req.body.token);
    console.log(token)
    const tokenRegistered = await PurchasedTokens.findOne({token:token});
    // if(!tokenRegistered){
    //     return res.status(400).send("Invalid token");
    // }
    if(!tokenRegistered){
        return res.status(200).json({days: null});
    }
    const days = tokenRegistered.token_value_days

    return res.status(200).json({days: days});
}

module.exports = { recordPurchase, listPurchaseHistory, validateToken }