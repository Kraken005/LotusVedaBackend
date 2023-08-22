const Unit = require('../../../models/constants/unit');

const getAllUnit = async (req, res) => {
    try {
        const units = await Unit.find();
        if (!units) {
          return res.status(204).json({ message: 'No Unit found' });
        }
        res.json(units);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching Unit' });
      }
}

const createNewUnit = async ( req, res) => {
    const {unitName, unitDescription, remarks} = req.body;
    if(!unitName || !unitDescription){
        res.status(400).json({"message": "Enter minimum data"});
    }

    try {
        const result = await Unit.create({
            unitName, unitDescription, remarks
        });
        res.status(201).json(result);   
    } catch (error) {
        console.error(error);
    }
}

const updateUnit = async (req, res) => {
    const {id, unitName, unitDescription, remarks} = req.body;
    if(!id){
        res.status(400).json({"message": "ID parameter required"});
    }

    const unit = await Unit.findOne({_id: id}).exec();
    if(!unit) res.status(204).json({"message": `No Unit matches ID ${id}`});
    
    if(unitName) unit.unitName = unitName
    if(unitDescription) unit.unitDescription = unitDescription
    if(remarks) unit.remarks = remarks

    const result = await unit.save();
    res.json(result);
}

const deleteUnit = async (req, res) => {
    const {id} = req.body;
    if(!id) return res.status(400).json({"message": "Unit ID is required. None found"});

    const unit = await Unit.findOne({_id: id}).exec();
    if(!unit){
        res.status(204).json({"message": `No Unit matches ID ${id}`});
    }
    const result = await unit.deleteOne({_id: id});
    res.json(result);
}

const getUnit = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({"message": "Unit ID is required"});

    const unit = await Unit.findOne({_id: req.params.id}).exec();
    if(!unit) return res.status(204).json({"message": `No Unit matches ID ${req.params.id}`});

    res.json(unit);
}
module.exports = {
   getAllUnit,
   createNewUnit,
   updateUnit,
   deleteUnit,
   getUnit
}