const dbConnector = require("../mongo-client");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const equipmentSchema = require("../schema/equipmentSchema");

module.exports.addEquipment = async (event) => {
  const db = await dbConnector.getDBInstance();
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  const requestBody = JSON.parse(event.body);

  if (!ajv.validate(equipmentSchema, requestBody)) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        message: ajv.errors,
      }),
    };
  }

  if (
    new Date(requestBody.contractStartDate) >
    new Date(requestBody.contractEndDate)
  ) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        message: "Incorrect Dates",
      }),
    };
  }

  const insertedEquipment = await db
    .collection("equipments")
    .updateOne(
      { equipmentNumber: requestBody.equipmentNumber },
      { $setOnInsert: requestBody },
      { upsert: true, returnDocument: "after" }
    );

  return {
    statusCode: insertedEquipment.upsertedId ? 201 : 400,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      message: insertedEquipment.upsertedId
        ? "OK"
        : "Duplicate Equipment Number",
      data: insertedEquipment.upsertedId
        ? {
            _id: insertedEquipment.upsertedId,
            ...requestBody,
          }
        : null,
    }),
  };
};
