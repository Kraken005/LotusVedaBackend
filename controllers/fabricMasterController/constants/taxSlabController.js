const TaxSlab = require('../../../models/constants/taxSlab');

const getAllTaxSlab = async (req, res) => {
    try {
        const taxSlabs = await TaxSlab.find();
        if (!taxSlabs) {
          return res.status(204).json({ message: 'No taxSlabs found' });
        }
        res.json(taxSlabs);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching taxSlabs' });
      }
}

const createNewTaxSlab = async ( req, res) => {
    const {slabCode, taxName, toAmount, fromAmount} = req.body;
    if(!slabCode || !taxName || !toAmount || !fromAmount){
        res.status(400).json({"message": "Enter minimum data"});
    }

    try {
        const result = await TaxSlab.create({
            slabCode, taxName, toAmount, fromAmount
        });
        res.status(201).json(result);   
    } catch (error) {
        console.error(error);
    }
}

const updateTaxSlab = async (req, res) => {
    const {id, slabCode, taxName, toAmount, fromAmount} = req.body;
    if(!id){
        res.status(400).json({"message": "ID parameter required"});
    }

    const taxSlab = await TaxSlab.findOne({_id: id}).exec();
    if(!taxSlab) res.status(204).json({"message": `No taxSlab matches ID ${id}`});
    
    if(slabCode) taxSlab.slabCode = slabCode
    if(taxName) taxSlab.taxName = taxName
    if(toAmount) taxSlab.toAmount = toAmount
    if(fromAmount) taxSlab.fromAmount = fromAmount

    const result = await taxSlab.save();
    res.json(result);
}

const deleteTaxSlab = async (req, res) => {
    const {id} = req.body;
    if(!id) return res.status(400).json({"message": "TaxSlab ID is required. None found"});

    const taxSlab = await TaxSlab.findOne({_id: id}).exec();
    if(!taxSlab){
        res.status(204).json({"message": `No TaxSlab matches ID ${id}`});
    }
    const result = await taxSlab.deleteOne({_id: id});
    res.json(result);
}

const getTaxSlab = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({"message": "TaxSlab ID is required"});

    const taxSlab = await TaxSlab.findOne({_id: req.params.id}).exec();
    if(!taxSlab) return res.status(204).json({"message": `No TaxSlab matches ID ${req.params.id}`});

    res.json(taxSlab);
}
module.exports = {
    getAllTaxSlab,
    createNewTaxSlab,
    updateTaxSlab,
    deleteTaxSlab,
    getTaxSlab
}