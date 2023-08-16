const Dealer = require('../../../models/constants/dealer');

const getAllDealer = async (req, res) => {
    try {
        const dealers = await Dealer.find();
        if (!dealers) {
          return res.status(204).json({ message: 'No dealers found' });
        }
        res.json(dealers);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching dealers' });
      }
}

const createNewDealer = async ( req, res) => {
    const {dealerName} = req.body;
    if(!dealerName){
        res.status(400).json({"message": "Enter minimum data"});
    }

    try {
        const result = await Dealer.create({
            dealerName
        });
        res.status(201).json(result);   
    } catch (error) {
        console.error(error);
    }
}

const updateDealer = async (req, res) => {
    const {id, dealerName} = req.body;
    if(!id){
        res.status(400).json({"message": "ID parameter required"});
    }

    const dealer = await Dealer.findOne({_id: id}).exec();
    if(!dealer) res.status(204).json({"message": `No dealer matches ID ${id}`});
    
    if(dealerName) dealer.dealerName = dealerName

    const result = await dealer.save();
    res.json(result);
}

const deleteDealer = async (req, res) => {
    const {id} = req.body;
    if(!id) return res.status(400).json({"message": "Dealer ID is required. None found"});

    const dealer = await Dealer.findOne({_id: id}).exec();
    if(!dealer){
        res.status(204).json({"message": `No dealer matches ID ${id}`});
    }
    const result = await dealer.deleteOne({_id: id});
    res.json(result);
}

const getDealer = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({"message": "Dealer ID is required"});

    const dealer = await Dealer.findOne({_id: req.params.id}).exec();
    if(!dealer) return res.status(204).json({"message": `No dealer matches ID ${req.params.id}`});

    res.json(dealer);
}
module.exports = {
    getAllDealer,
    createNewDealer,
    updateDealer,
    deleteDealer,
    getDealer
}