const equipmentSchema = {
  type: "object",

  properties: {
    equipmentNumber: {
      type: "number",
    },
    address: {
      type: "string",
    },
    contractStartDate: {
      type: "string",
      format: "date-time",
    },
    contractEndDate: {
      type: "string",
      format: "date-time",
    },
    status: {
      type: "string",
      enum: ["RUNNING", "STOPPED"],
    },
  },

  required: ["equipmentNumber", "address", "contractStartDate", "status"],
};

module.exports = equipmentSchema;
