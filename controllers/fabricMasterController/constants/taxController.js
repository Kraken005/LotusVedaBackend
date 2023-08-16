const Tax = require("../../../models/constants/tax");

const getAllTax = async (req, res) => {
    try {
        const taxes = await Tax.find();
        if (!taxes) {
          return res.status(204).json({ message: 'No taxes found' });
        }
        res.json(taxes);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching taxes' });
      }
}

const createNewTax = async ( req, res) => {
    const {taxName, percent} = req.body;
    if(!taxName || !percent){
        res.status(400).json({"message": "Enter minimum data"});
    }

    try {
        const result = await Tax.create({
            taxName, percent
        });
        res.status(201).json(result);   
    } catch (error) {
        console.error(error);
    }
}

const updateTax = async (req, res) => {
    const {id, taxName, percent} = req.body;
    if(!id){
        res.status(400).json({"message": "ID parameter required"});
    }

    const tax = await Tax.findOne({_id: id}).exec();
    if(!tax) res.status(204).json({"message": `No tax matches ID ${id}`});
    
    if(taxName) tax.taxName = taxName
    if(percent) tax.percent = percent

    const result = await tax.save();
    res.json(result);
}

const deleteTax = async (req, res) => {
    const {id} = req.body;
    if(!id) return res.status(400).json({"message": "Tax ID is required. None found"});

    const tax = await Tax.findOne({_id: id}).exec();
    if(!tax){
        res.status(204).json({"message": `No tax matches ID ${id}`});
    }
    const result = await tax.deleteOne({_id: id});
    res.json(result);
}

const getTax = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({"message": "Tax ID is required"});

    const tax = await Tax.findOne({_id: req.params.id}).exec();
    if(!tax) return res.status(204).json({"message": `No tax matches ID ${req.params.id}`});

    res.json(tax);
}
module.exports = {
    getAllTax,
    createNewTax,
    updateTax,
    deleteTax,
    getTax
}