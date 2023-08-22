const ExchangeRate = require('../../../models/constants/exchangeRate');

const getAllExchangeRate = async (req, res) => {
    try {
        const exchangeRate = await ExchangeRate.find();
        if (!exchangeRate) {
          return res.status(204).json({ message: 'No exchangeRate found' });
        }
        res.json(exchangeRate);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching exchangeRate' });
      }
}

const createNewExchangeRate = async ( req, res) => {
    const {currencyName, currencySymbol, currencyValue} = req.body;
    if(!currencyName || !currencySymbol || !currencyValue){
        res.status(400).json({"message": "Enter minimum data"});
    }

    try {
        const result = await ExchangeRate.create({
            currencyName, currencySymbol, currencyValue
        });
        res.status(201).json(result);   
    }catch (error) {
        console.error(error);
    }
}

const updateExchangeRate = async (req, res) => {
    const {id, currencyName, currencySymbol, currencyValue} = req.body;
    if(!id){
        res.status(400).json({"message": "ID parameter required"});
    }

    const exchangeRate = await ExchangeRate.findOne({_id: id}).exec();
    if(!exchangeRate) res.status(204).json({"message": `No exchangeRate matches ID ${id}`});
    
    if(currencyName) exchangeRate.currencyName = currencyName
    if(currencySymbol) exchangeRate.currencySymbol = currencySymbol
    if(currencyValue) exchangeRate.currencyValue = currencyValue

    const result = await exchangeRate.save();
    res.json(result);
}

const deleteExchangeRate = async (req, res) => {
    const {id} = req.body;
    if(!id) return res.status(400).json({"message": "ExchangeRate ID is required. None found"});

    const exchangeRate = await ExchangeRate.findOne({_id: id}).exec();
    if(!exchangeRate){
        res.status(204).json({"message": `No ExchangeRate matches ID ${id}`});
    }
    const result = await exchangeRate.deleteOne({_id: id});
    res.json(result);
}

const getExchangeRate = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({"message": "ExchangeRate ID is required"});

    const exchangeRate = await ExchangeRate.findOne({_id: req.params.id}).exec();
    if(!exchangeRate) return res.status(204).json({"message": `No ExchangeRate matches ID ${req.params.id}`});

    res.json(exchangeRate);
}
module.exports = {
    getAllExchangeRate,
    createNewExchangeRate,
    updateExchangeRate,
    deleteExchangeRate,
    getExchangeRate
}