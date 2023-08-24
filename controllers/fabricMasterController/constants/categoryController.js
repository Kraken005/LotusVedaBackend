const Category = require("../../../models/constants/category");

const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories) {
          return res.status(204).json({ message: 'No categories found' });
        }
        res.json(categories);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching categories' });
      }
}

const createNewCategory = async ( req, res) => {
    const {categoryName, categoryPrefix, remarks, HSN, barcodeType, slabCode} = req.body;
    if(!categoryName || !categoryPrefix || !HSN || !barcodeType || !slabCode){
        res.status(400).json({"message": "Enter minimum data"});
    }

    try {
        const result = await Category.create({
            categoryName, categoryPrefix, remarks, HSN, barcodeType, slabCode
        });
        res.status(201).json(result);   
    } catch (error) {
        console.error(error);
    }
}

const updateCategory = async (req, res) => {
    const {id, categoryName, categoryPrefix, remarks, HSN, barcodeType, slabCode} = req.body;
    if(!id){
        res.status(400).json({"message": "ID parameter required"});
    }

    const category = await Category.findOne({_id: id}).exec();
    if(!category) res.status(204).json({"message": `No category matches ID ${id}`});
    
    if(categoryName) category.categoryName = categoryName
    if(categoryPrefix) category.categoryPrefix = categoryPrefix
    if(remarks) category.remarks = remarks
    if(HSN) category.HSN = HSN
    if(barcodeType) category.barcodeType = barcodeType
    if(slabCode) category.slabCode = slabCode

    const result = await category.save();
    res.json(result);
}

const deleteCategory = async (req, res) => {
    const {id} = req.body;
    if(!id) return res.status(400).json({"message": "Category ID is required. None found"});

    const category = await Category.findOne({_id: id}).exec();
    if(!category){
        res.status(204).json({"message": `No category matches ID ${id}`});
    }
    const result = await category.deleteOne({_id: id});
    res.json(result);
}

const getCategory = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({"message": "Category ID is required"});

    const category = await Category.findOne({_id: req.params.id}).exec();
    if(!category) return res.status(204).json({"message": `No category matches ID ${req.params.id}`});

    res.json(category);
}

const deleteAllCategory = async (req, res) => {
    try {
        const delCategories = await Category.deleteMany({});
        return res.status(200).json({ message: "All the categories deleted succesfully"});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while deleting categories"});
    }
}
module.exports = {
   getAllCategory,
   createNewCategory,
   updateCategory,
   deleteCategory,
   getCategory,
   deleteAllCategory
}