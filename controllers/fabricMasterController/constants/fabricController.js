const Fabric = require("../../../models/constants/fabric");

const getAllFabric = async (req, res) => {
    try {
        const fabrics = await Fabric.find();
        if (!fabrics) {
          return res.status(204).json({ message: 'No fabrics found' });
        }
        res.json(fabrics);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching fabrics' });
      }
}

const createNewFabric = async ( req, res) => {
    const {fabricQuality, remarks} = req.body;
    if(!fabricQuality){
        res.status(400).json({"message": "Enter minimum data"});
    }

    try {
        const result = await Fabric.create({
            fabricQuality, remarks
        });
        res.status(201).json(result);   
    } catch (error) {
        console.error(error);
    }
}

const updateFabric = async (req, res) => {
    const {id, fabricQuality, remarks} = req.body;
    if(!id){
        res.status(400).json({"message": "ID parameter required"});
    }

    const fabric = await Fabric.findOne({_id: id}).exec();
    if(!fabric) res.status(204).json({"message": `No fabric matches ID ${id}`});
    
    if(fabricQuality) fabric.fabricQuality = fabricQuality
    if(remarks) fabric.remarks = remarks

    const result = await fabric.save();
    res.json(result);
}

const deleteFabric = async (req, res) => {
    const {id} = req.body;
    if(!id) return res.status(400).json({"message": "Fabric ID is required. None found"});

    const fabric = await Fabric.findOne({_id: id}).exec();
    if(!fabric){
        res.status(204).json({"message": `No fabric matches ID ${id}`});
    }
    const result = await fabric.deleteOne({_id: id});
    res.json(result);
}

const getFabric = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({"message": "Fabric ID is required"});

    const fabric = await Fabric.findOne({_id: req.params.id}).exec();
    if(!fabric) return res.status(204).json({"message": `No fabric matches ID ${req.params.id}`});

    res.json(fabric);
}
module.exports = {
    getAllFabric,
    createNewFabric,
    updateFabric,
    deleteFabric,
    getFabric
}