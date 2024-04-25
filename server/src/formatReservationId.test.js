const formatReservationId = require("./formatReservationId.js");
// This is done to ensure consistency throughout the code, you can also see that the code no longer has nested dates and IDs.
describe("formatReservation", () => {
  it("Should change _id to id", () => {
    const acutualOutput = formatReservationId({
      _id: "507f1f77bcf86cd799439011",
      partySize: 4,
      date: "2023-11-17T06:30:00.000Z",
      userId: "614abe145f317b89a2e36883",
      restaurantName: "Island Grill",
    });

    const expectedOutput = {
      id: "507f1f77bcf86cd799439011",
      partySize: 4,
      date: "2023-11-17T06:30:00.000Z",
      userId: "614abe145f317b89a2e36883",
      restaurantName: "Island Grill",
    };

    expect(acutualOutput).toEqual(expectedOutput);
  });
});
