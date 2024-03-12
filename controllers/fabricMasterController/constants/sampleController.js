const Sample = require("../../../models/constants/size");

const getAllSample = async (req, res) => {
    try {
        const samples = await Sample.find();
        if (!samples) {
            return res.status(204).json({ message: 'No Samples found' });
        }
        // Map the samples to include the picture data as Base64
        const samplesWithPictures = samples.map((sample) => ({
            _id: sample._id,
            sampleNo: sample.sampleNo,
            category: sample.category,
            sampleCode: sample.sampleCode,
            fabricQuality: sample.fabricQuality,
            fabricDescription: sample.fabricDescription,
            MRP: sample.MRP,
            retailRate: sample.retailRate,
            purchaseRate: sample.purchaseRate,
            fabricCode: sample.fabricCode,
            color: sample.color,
            width: sample.width,
            wholeSaleRate: sample.wholeSaleRate,
            rateCode: sample.rateCode,
            semiWholeSaleRate: sample.semiWholeSaleRate,
            HSN: sample.HSN,
            remarks: sample.remarks,
            barcode: sample.barcode,
            // Convert the picture Buffer to Base64
            picture: sample.picture ? sample.picture.toString('base64') : null,
        }));
  
        res.json(samplesWithPictures);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching Samples' });
    }
}

const createNewSample = async (req, res) => {
    const { sampleNo, category, sampleCode, fabricQuality, fabricDescription, MRP, retailRate, purchaseRate, fabricCode, color, width, wholeSaleRate, rateCode, semiWholeSaleRate, HSN, remarks, barcode } = req.body;
    if (!sampleNo || !MRP || !retailRate || !purchaseRate || !wholeSaleRate) {
        res.status(400).json({ "message": "Enter minimum data" });
    }

    const picture = req.file ? req.file.buffer : undefined;

    try {
        const result = await Sample.create({
            sampleNo, category, sampleCode, fabricQuality, fabricDescription, MRP, retailRate, purchaseRate, fabricCode, color, width, wholeSaleRate, rateCode, semiWholeSaleRate, HSN, remarks, picture, barcode
        });
        await result.save();
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
    }
}

const updateSample = async (req, res) => {
    const { id, sampleNo, category, sampleCode, fabricQuality, fabricDescription, MRP, retailRate, purchaseRate, fabricCode, color, width, wholeSaleRate, rateCode, semiWholeSaleRate, HSN, remarks, barcode } = req.body;
    if (!id) {
        res.status(400).json({ "message": "ID parameter required" });
    }

    const sample = await Sample.findOne({ _id: id }).exec();
    if (!sample) res.status(204).json({ "message": `No sample matches ID ${id}` });

    const picture = req.file ? req.file.buffer : undefined;

    if (sampleNo) sample.sampleNo = sampleNo;
    if (category) sample.category = category;
    if (sampleCode) sample.sampleCode = sampleCode;
    if (fabricQuality) sample.fabricQuality = fabricQuality;
    if (fabricDescription) sample.fabricDescription = fabricDescription;
    if (MRP) sample.MRP = MRP;
    if (retailRate) sample.retailRate = retailRate;
    if (purchaseRate) sample.purchaseRate = purchaseRate;
    if (fabricCode) sample.fabricCode = fabricCode;
    if (color) sample.color = color;
    if (width) sample.width = width;
    if (wholeSaleRate) sample.wholeSaleRate = wholeSaleRate;
    if (rateCode) sample.rateCode = rateCode;
    if (semiWholeSaleRate) sample.semiWholeSaleRate = semiWholeSaleRate;
    if (HSN) sample.HSN = HSN;
    if (remarks) sample.remarks = remarks;
    if (barcode) sample.barcode = barcode;
    
    // Update the picture field if a new picture is uploaded
    if (picture) sample.picture = picture;

    const result = await sample.save();
    res.json(result);
}

const deleteSample = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ "message": "Sample ID is required. None found" });

    const sample = await Sample.findOne({ _id: id }).exec();
    if (!sample) {
        res.status(204).json({ "message": `No Sample matches ID ${id}` });
    }
    const result = await sample.deleteOne({ _id: id });
    res.json(result);
}

const getSample = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": "Sample ID is required" });

    const sample = await Sample.findOne({ _id: req.params.id }).exec();
    if (!sample) return res.status(204).json({ "message": `No Sample matches ID ${req.params.id}` });

    // Convert the picture Buffer to Base64
    const sampleWithPicture = {
        ...sample.toObject(),
        picture: sample.picture ? sample.picture.toString('base64') : null,
      };
    
    // Set the appropriate content type based on the image's contentType
    res.contentType(image.contentType);

    // Send the image data as the response
    res.send(image.data);

    res.json(sampleWithPicture);
}

module.exports = {
    getAllSample,
    createNewSample,
    updateSample,
    deleteSample,
    getSample
}