const Supplier = require('../../models/fabricMaster/addSupplier');

const getAllSupplier = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        if (suppliers.length === 0) {
            return res.status(204).json({ "message": "No suppliers found" });
        } else {
            res.json(suppliers);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Error finding suppliers" });
    }
}


const createNewSupplier = async (req, res) => {
    const {prefix, localType, name, contactPerson, address1, address2, state, city, pincode, phoneNo, email, gstNo, panNo, remarks} = req.body;
    if(!prefix || !name || !localType || !address1 || !state || !city || !pincode || !phoneNo){
        res.status(400).json({"message": "Enter minimum data"});
    }

    try {
        const result = await Supplier.create({
            prefix, localType, name, contactPerson, address1, address2, state, city, pincode, phoneNo, email, gstNo, panNo, remarks
        });
        res.status(201).json(result);   
    } catch (error) {
        console.error(error);
    }
}

const updateSupplier = async (req, res) => {
    const {id, prefix, localType, name, contactPerson, address1, address2, state, city, pincode, phoneNo, email, gstNo, panNo, remarks} = req.body;
    if(!id){
        res.status(400).json({"message": "ID parameter required"});
    }

    const supplier = await Supplier.findOne({_id: id}).exec();
    if(!supplier) res.status(204).json({"message": `No supplier matches ID ${id}`});
    
    if(prefix) supplier.prefix = prefix
    if(localType) supplier.localType = localType
    if(name) supplier.name = name
    if(contactPerson) supplier.contactPerson = contactPerson
    if(address1) supplier.address1 = address1
    if(address2) supplier.address2 = address2
    if(state) supplier.state = state
    if(city) supplier.city = city
    if(pincode) supplier.pincode = pincode
    if(phoneNo) supplier.phoneNo = phoneNo
    if(email) supplier.email = email
    if(gstNo) supplier.gstNo = gstNo
    if(panNo) supplier.panNo = panNo
    if(remarks) supplier.remarks = remarks

    const result = await supplier.save();
    res.json(result);
}

const deleteSupplier = async (req, res) => {
    const {id} = req.body;
    if(!id) return res.status(400).json({"message": "Supplier ID is required. None found"});

    const supplier = await Supplier.findOne({_id: id}).exec();
    if(!supplier){
        res.status(204).json({"message": `No supplier matches ID ${id}`});
    }
    const result = await supplier.deleteOne({_id: id});
    res.json(result);
}

const getSupplier = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({"message": "Supplier ID is required"});

    const supplier = await Supplier.findOne({_id: req.params.id}).exec();
    if(!supplier) return res.status(204).json({"message": `No supplier matches ID ${req.params.id}`});

    res.json(supplier);
}

module.exports = {
    getAllSupplier,
    createNewSupplier,
    updateSupplier,
    deleteSupplier,
    getSupplier
}