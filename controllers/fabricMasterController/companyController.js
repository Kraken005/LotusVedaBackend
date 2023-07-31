//const { id } = require('date-fns/locale');
const Company = require('../../models/fabricMaster/addCompany');

const getAllCompany = async (req, res) => {
    try {
        const companies = await Company.find();
        if (companies.length === 0) {
            res.status(204).json({ "message": "No companies found" });
        } else {
            res.json(companies);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Error finding companies" });
    }
}


const createNewCompany = async (req, res) => {
    const {companyName, address, gstin, phoneNo, tin, state, city} = req.body;
    if(!companyName || !phoneNo || !tin || !state || !city){
        res.status(400).json({"message": "Enter minimum data"});
    }

    try {
        const result = await Company.create({
            companyName, address, gstin, phoneNo, tin, state, city
        });
        res.status(201).json(result);   
    } catch (error) {
        console.error(error);
    }
}

const updateCompany = async (req, res) => {
    const {id, companyName, address, gstin, phoneNo, tin, state, city} = req.body;
    if(!id){
        res.status(400).json({"message": "ID parameter required"});
    }

    const company = await Company.findOne({_id: id}).exec();
    if(!company) res.status(204).json({"message": `No company matches ID ${id}`});
    if(companyName) company.companyName = companyName;
    if(address) company.address = address
    if(gstin) company.gstin = gstin
    if(phoneNo) company.phoneNo = phoneNo
    if(tin) company.tin = tin
    if(state) company.state = state
    if(city) company.city = city

    const result = await company.save();
    res.json(result);
}

const deleteCompany = async (req, res) => {
    const { id} = req.body;
    if(!id) return res.status(400).json({"message": "Company ID is required. None found"});

    const company = await Company.findOne({_id: id}).exec();
    if(!company){
        res.status(204).json({"message": `No company matches ID ${id}`});
    }
    const result = await company.deleteOne({_id: id});
    res.json(result);
}

const getCompany = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({"message": "Company ID is required"});

    const company = await Company.findOne({_id: req.params.id}).exec();
    if(!company) return res.status(204).json({"message": `No company matches ID ${req.params.id}`});

    res.json(company);
}

module.exports = {
    getAllCompany,
    createNewCompany,
    updateCompany,
    deleteCompany,
    getCompany
}