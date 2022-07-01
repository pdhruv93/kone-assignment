const dbConnector = require("../mongo-client");

module.exports.listEquipments = async (event) => {
  const db = await dbConnector.getDBInstance();
  const limit = event.queryStringParameters?.limit || 5;

  if (isNaN(limit) || Number(limit) < 1) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        message: "Invalid Limit",
      }),
    };
  }

  const equipments = await db
    .collection("equipments")
    .find()
    .sort({ equipmentNumber: -1 })
    .limit(Number(limit))
    .toArray();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      message: "OK",
      data: equipments,
    }),
  };
};
