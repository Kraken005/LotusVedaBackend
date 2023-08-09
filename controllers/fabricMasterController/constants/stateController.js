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

    const state = await Company.findOne({_id: id}).exec();
    if(!state) res.status(204).json({"message": `No company matches ID ${id}`});
    if(companyName) state.companyName = companyName;
    if(address) state.address = address
    if(gstin) state.gstin = gstin
    if(phoneNo) state.phoneNo = phoneNo
    if(tin) state.tin = tin
    if(state) state.state = state
    if(city) state.city = city

    const result = await state.save();
    res.json(result);
}
module.exports = {
    getAllState,
    createNewState,
    updateState
}