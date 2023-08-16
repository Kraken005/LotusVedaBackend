const Size = require("../../../models/constants/size");

const getAllSize = async (req, res) => {
    try {
        const sizes = await Size.find();
        if (!sizes) {
          return res.status(204).json({ message: 'No sizes found' });
        }
        res.json(sizes);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching sizes' });
      }
}

const createNewSize = async ( req, res) => {
    const {sizeName, remarks} = req.body;
    if(!sizeName){
        res.status(400).json({"message": "Enter minimum data"});
    }

    try {
        const result = await Size.create({
            sizeName, remarks
        });
        res.status(201).json(result);   
    } catch (error) {
        console.error(error);
    }
}

const updateSize = async (req, res) => {
    const {id, sizeName, remarks} = req.body;
    if(!id){
        res.status(400).json({"message": "ID parameter required"});
    }

    const size = await Size.findOne({_id: id}).exec();
    if(!size) res.status(204).json({"message": `No size matches ID ${id}`});
    
    if(sizeName) size.sizeName = sizeName
    if(remarks) size.remarks = remarks

    const result = await size.save();
    res.json(result);
}

const deleteSize = async (req, res) => {
    const {id} = req.body;
    if(!id) return res.status(400).json({"message": "Size ID is required. None found"});

    const size = await Size.findOne({_id: id}).exec();
    if(!size){
        res.status(204).json({"message": `No size matches ID ${id}`});
    }
    const result = await size.deleteOne({_id: id});
    res.json(result);
}

const getSize = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({"message": "Size ID is required"});

    const size = await Size.findOne({_id: req.params.id}).exec();
    if(!size) return res.status(204).json({"message": `No size matches ID ${req.params.id}`});

    res.json(size);
}
module.exports = {
    getAllSize,
    createNewSize,
    updateSize,
    deleteSize,
    getSize
}