const Customer = require('../../models/fabricMaster/addCustomer');

const getAllCustomer = async (req, res) => {
    // const customers = await Customer.find();
    // if(!customers) return res.status(204).json({'message': 'No customers found'});
    // res.json(customers);
        try {
          const customers = await Customer.find();
          if (customers.length === 0) {
            return res.status(204).json({ message: 'No customers found' });
          }
          res.json(customers);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error fetching customers' });
        }
      
      
}

const createNewCustomer = async (req, res) => {
    if(!req?.body?.prefix || !req?.body?.name || !req?.body?.address1 || !req?.body?.state || !req?.body?.city || !req?.body?.pincode || !req?.body?.phoneNo){
        res.status(400).json({"message" : "Enter the minimun details"});
    }
    //console.log(req.body);

try {
    const result = await Customer.create({
        prefix: req.body.prefix,
        name: req.body.name,
        address1: req.body.address1,
        state: req.body.state,
        city: req.body.city,
        pincode: req.body.pincode,
        phoneNo: req.body.phoneNo,
        address2: req.body.address2,
        email: req.body.email,
        gstNo: req.body.gstNo,
        discount: req.body.discount,
        remarks: req.body.remarks,
        discountPercentage: req.body.discountPercentage,
        localType: req.body.localType,
        contactPerson: req.body.contactPerson
    });
    res.status(201).json(result);
} catch (error) {
    console.error(error);
}
}

const updateCustomer = async (req, res) => {
    if(!req?.body?.id){
        return res.status(400).json({'message': 'ID paramter is required'});
    }

    const customer = await Customer.findOne({_id: req.body.id}).exec();

    if (!customer) {
        return res.status(204).json({ "message": `No customer matches ID ${req.body.id}.` });
    }
    if(req.body?.prefix) customer.prefix = req.body.prefix;
    if(req.body?.name) customer.name = req.body.name;
    if(req.body?.address1) customer.address1 = req.body.address1;
    if(req.body?.state) customer.state = req.body.state;
    if(req.body?.city) customer.city = req.body.city;
    if(req.body?.pincode) customer.pincode = req.body.pincode;
    if(req.body?.phoneNo) customer.phoneNo = req.body.phoneNo;
    if(req.body?.address2) customer.address2 = req.body.address2;
    if(req.body?.email) customer.email = req.body.email;
    if(req.body?.gstNo) customer.gstNo = req.body.gstNo;
    if(req.body?.discount) customer.discount = req.body.discount;
    if(req.body?.remarks) customer.remarks = req.body.remarks;
    if(req.body?.discountPercentage) customer.discountPercentage = req.body.discountPercentage;
    if(req.body?.localType) customer.localType = req.body.localType;
    if(req.body?.contactPerson) customer.contactPerson = req.body.contactPerson;
    const result = await customer.save();
    res.json(result);

}

const deleteCustomer = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Customer ID required.' });

    const customer = await Customer.findOne({ _id: req.body.id }).exec();
    if (!customer) {
        return res.status(204).json({ "message": `No customer matches ID ${req.body.id}.` });
    }
    const result = await customer.deleteOne({_id: req.body.id}); //{ _id: req.body.id }
    res.json(result);
}

const getCustomer = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Customer ID required.' });

    const customer= await Customer.findOne({ _id: req.params.id }).exec();
    if (!customer) {
        return res.status(204).json({ "message": `No customer matches ID ${req.params.id}.` });
    }
    res.json(customer);
}

module.exports = { 
    getAllCustomer, 
    createNewCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomer
   } 