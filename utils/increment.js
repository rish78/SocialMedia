const Counter = require("../models/counter");

exports.getNextSequenceValue = async (sequenceName) => {
    var sequenceDocument = await Counter.findByIdAndUpdate(sequenceName, { 
        $inc: {sequence: 1}
    });
    return sequenceDocument.sequence;
 }

