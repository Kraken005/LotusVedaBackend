const Technique = require('../../../models/constants/technique');

const getAllTechnique = async (req, res) => {
    try {
        const techniques = await Technique.find();
        if (!techniques) {
          return res.status(204).json({ message: 'No Technique found' });
        }
        res.json(techniques);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching Techniques' });
      }
}

const createNewTechnique = async ( req, res) => {
    const {techniqueName} = req.body;
    if(!techniqueName){
        res.status(400).json({"message": "Enter minimum data"});
    }

    try {
        const result = await Technique.create({
            techniqueName
        });
        res.status(201).json(result);   
    } catch (error) {
        console.error(error);
    }
}

const updateTechnique = async (req, res) => {
    const {id, techniqueName} = req.body;
    if(!id){
        res.status(400).json({"message": "ID parameter required"});
    }

    const technique = await Technique.findOne({_id: id}).exec();
    if(!technique) res.status(204).json({"message": `No Technique matches ID ${id}`});
    
    if(techniqueName) technique.techniqueName = techniqueName
    

    const result = await technique.save();
    res.json(result);
}

const deleteTechnique = async (req, res) => {
    const {id} = req.body;
    if(!id) return res.status(400).json({"message": "Technique ID is required. None found"});

    const technique = await Technique.findOne({_id: id}).exec();
    if(!technique){
        res.status(204).json({"message": `No Technique matches ID ${id}`});
    }
    const result = await technique.deleteOne({_id: id});
    res.json(result);
}

const getTechnique = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({"message": "Technique ID is required"});

    const technique = await Technique.findOne({_id: req.params.id}).exec();
    if(!technique) return res.status(204).json({"message": `No Technique matches ID ${req.params.id}`});

    res.json(technique);
}
module.exports = {
    getAllTechnique,
    createNewTechnique,
    updateTechnique,
    deleteTechnique,
    getTechnique
}