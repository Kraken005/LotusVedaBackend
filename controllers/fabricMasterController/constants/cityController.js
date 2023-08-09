const City = require('../../../models/constants/city');

const getAllCity = async (req, res) => {
    try {
        const cities = await City.find();
        if (!cities) {
          return res.status(204).json({ message: 'No cities found' });
        }
        res.json(cities);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching cities' });
      }
}

const createNewCity = async ( req, res) => {
    const {stateName, cityCode, cityName} = req.body;
    if(!stateName || !cityCode || !cityName){
        res.status(400).json({"message": "Enter minimum data"});
    }

    try {
        const result = await City.create({
            stateName, cityCode, cityName
        });
        res.status(201).json(result);   
    } catch (error) {
        console.error(error);
    }
}

const updateCity = async (req, res) => {
    const {id, stateName, cityCode, cityName} = req.body;
    if(!id){
        res.status(400).json({"message": "ID parameter required"});
    }

    const city = await Company.findOne({_id: id}).exec();
    if(!city) res.status(204).json({"message": `No company matches ID ${id}`});
    if(stateName) city.stateName = stateName
    if(cityCode) city.cityCode = cityCode
    if(cityName) city.cityName = cityName

    const result = await city.save();
    res.json(result);
}

const deleteCity = async (req, res) => {
    const {id} = req.body;
    if(!id) return res.status(400).json({"message": "City ID is required. None found"});

    const city = await City.findOne({_id: id}).exec();
    if(!city){
        res.status(204).json({"message": `No city matches ID ${id}`});
    }
    const result = await city.deleteOne({_id: id});
    res.json(result);
}

const getCity = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({"message": "City ID is required"});

    const city = await City.findOne({_id: req.params.id}).exec();
    if(!city) return res.status(204).json({"message": `No city matches ID ${req.params.id}`});

    res.json(city);
}
module.exports = {
    getAllCity,
    createNewCity,
    updateCity,
    deleteCity,
    getCity
}