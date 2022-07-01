const dbConnector = require("../mongo-client");

module.exports.getEquipment = async (event) => {
  const db = await dbConnector.getDBInstance();
  const equipmentNumber = Number(event.pathParameters.equipmentNumber);

  if (isNaN(equipmentNumber)) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        message: "Invalid Equipment Number",
      }),
    };
  }

  const equipment = await db
    .collection("equipments")
    .findOne({ equipmentNumber });

  return {
    statusCode: equipment ? 200 : 404,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      message: equipment
        ? "OK"
        : "No equiment found with this Equipment Number",
      data: equipment ? equipment : null,
    }),
  };
};
