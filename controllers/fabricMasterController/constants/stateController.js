const State = require('../../../models/constants/state');

const getAllState = async (req, res) => {
    try {
        const states = await State.find();
        if (!states) {
          return res.status(204).json({ message: 'No states found' });
        }
        res.json(states);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching states' });
      }
}

const createNewState = async ( req, res) => {
    const {stateName, stateCode, shortName, stateType} = req.body;
    if(!stateName || !stateCode || !shortName || !stateType){
        res.status(400).json({"message": "Enter minimum data"});
    }

    try {
        const result = await State.create({
            stateName, stateCode, shortName, stateType
        });
        res.status(201).json(result);   
    } catch (error) {
        console.error(error);
    }
}

const updateState = async (req, res) => {
    const {id, stateName, stateCode, shortName, stateType} = req.body;
    if(!id){
        res.status(400).json({"message": "ID parameter required"});
    }

    const state = await State.findOne({_id: id}).exec();
    if(!state) res.status(204).json({"message": `No state matches ID ${id}`});
    if(stateName) state.stateName = stateName
    if(stateCode) state.stateCode = stateCode
    if(shortName) state.shortName = shortName
    if(stateType) state.stateType = stateType

    const result = await state.save();
    res.json(result);
}

const deleteState = async (req, res) => {
    const {id} = req.body;
    if(!id) return res.status(400).json({"message": "State ID is required. None found"});

    const state = await State.findOne({_id: id}).exec();
    if(!state){
        res.status(204).json({"message": `No state matches ID ${id}`});
    }
    const result = await state.deleteOne({_id: id});
    res.json(result);
}

const getState = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({"message": "State ID is required"});

    const state = await State.findOne({_id: req.params.id}).exec();
    if(!state) return res.status(204).json({"message": `No state matches ID ${req.params.id}`});

    res.json(state);
}
module.exports = {
    getAllState,
    createNewState,
    updateState,
    deleteState,
    getState
}