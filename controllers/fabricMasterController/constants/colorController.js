const Color = require("../../../models/constants/color");

const getAllColor = async (req, res) => {
    try {
        const colors = await Color.find();
        if (!colors) {
          return res.status(204).json({ message: 'No colors found' });
        }
        res.json(colors);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching colors' });
      }
}

const createNewColor = async ( req, res) => {
    const {colorName, remarks} = req.body;
    if(!colorName){
        res.status(400).json({"message": "Enter minimum data"});
    }

    try {
        const result = await Color.create({
            colorName, remarks
        });
        res.status(201).json(result);   
    } catch (error) {
        console.error(error);
    }
}

const updateColor = async (req, res) => {
    const {id, colorName, remarks} = req.body;
    if(!id){
        res.status(400).json({"message": "ID parameter required"});
    }

    const color = await Color.findOne({_id: id}).exec();
    if(!color) res.status(204).json({"message": `No color matches ID ${id}`});
    
    if(colorName) color.colorName = colorName
    if(remarks) color.remarks = remarks

    const result = await color.save();
    res.json(result);
}

const deleteColor = async (req, res) => {
    const {id} = req.body;
    if(!id) return res.status(400).json({"message": "Color ID is required. None found"});

    const color = await Color.findOne({_id: id}).exec();
    if(!color){
        res.status(204).json({"message": `No color matches ID ${id}`});
    }
    const result = await color.deleteOne({_id: id});
    res.json(result);
}

const getColor = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({"message": "Color ID is required"});

    const color = await Color.findOne({_id: req.params.id}).exec();
    if(!color) return res.status(204).json({"message": `No color matches ID ${req.params.id}`});

    res.json(color);
}
module.exports = {
   getAllColor,
   createNewColor,
   updateColor,
   deleteColor,
   getColor
}