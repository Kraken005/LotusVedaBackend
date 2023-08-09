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

module.exports = {
    getAllState,
    createNewState
}