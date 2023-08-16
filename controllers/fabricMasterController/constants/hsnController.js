const Hsn = require("../../../models/constants/hsn");

const getAllHsn = async (req, res) => {
    try {
        const hsns = await Hsn.find();
        if (!hsns) {
          return res.status(204).json({ message: 'No hsn found' });
        }
        res.json(hsns);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching hsn' });
      }
}

const createNewHsn = async ( req, res) => {
    const {hsnCode, taxSlab} = req.body;
    if(!hsnCode || !taxSlab){
        res.status(400).json({"message": "Enter minimum data"});
    }

    try {
        const result = await Hsn.create({
            hsnCode, taxSlab
        });
        res.status(201).json(result);   
    } catch (error) {
        console.error(error);
    }
}

const updateHsn = async (req, res) => {
    const {id, hsnCode, taxSlab} = req.body;
    if(!id){
        res.status(400).json({"message": "ID parameter required"});
    }

    const hsn = await Hsn.findOne({_id: id}).exec();
    if(!hsn) res.status(204).json({"message": `No hsn matches ID ${id}`});
    
    if(hsnCode) hsn.hsnCode = hsnCode
    if(taxSlab) hsn.taxSlab = taxSlab

    const result = await hsn.save();
    res.json(result);
}

const deleteHsn = async (req, res) => {
    const {id} = req.body;
    if(!id) return res.status(400).json({"message": "Hsn ID is required. None found"});

    const hsn = await Hsn.findOne({_id: id}).exec();
    if(!hsn){
        res.status(204).json({"message": `No hsn matches ID ${id}`});
    }
    const result = await hsn.deleteOne({_id: id});
    res.json(result);
}

const getHsn = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({"message": "Hsn ID is required"});

    const hsn = await Hsn.findOne({_id: req.params.id}).exec();
    if(!hsn) return res.status(204).json({"message": `No hsn matches ID ${req.params.id}`});

    res.json(hsn);
}
module.exports = {
   getAllHsn,
   createNewHsn,
   updateHsn,
   deleteHsn,
   getHsn
}