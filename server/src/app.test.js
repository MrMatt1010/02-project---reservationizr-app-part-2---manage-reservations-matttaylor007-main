const request = require("supertest");
const app = require("./app");

describe("App", () => {
  it("Should GET a single /restaurants/:id and returun a 200 status", async () => {
    // Arrange
    const expectedStatus = 200;
    const expectedBody = {
      name: "Thai Isaan",
      description:
        "We offer guests a modern dining experience featuring the authentic taste of Thailand. Food is prepared fresh from quality ingredients and presented with sophisticated elegance in a stunning dining setting filled with all the richness of Thai colour, sound and art.",
      id: "616005e26d59890f8f1e619b",
      image: "https://i.ibb.co/HPjd2jR/thai.jpg",
    };
    //     // Act
    const response = await request(app).get(
      "/restaurants/616005e26d59890f8f1e619b"
    );
    //     // Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedBody);
  });

  // 400 test goes here for a single restaurant
  it("Should return a status of 400 when a restaurant id is invalid", async () => {
    // Arrange
    const expectedStatus = 400;
    const expectedBody = {
      error: "invalid id provided",
    };
    //     // Act
    const response = await request(app).get("/restaurants/1111");
    //     // Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedBody);
  });

  // 404 test goes here for a single restaurant
  it("Should return a status of 404 when a restaurant is not there", async () => {
    // Arrange
    const expectedStatus = 404;
    const expectedBody = {
      error: "restaurant not found",
    };
    //     // Act
    const response = await request(app).get(
      "/restaurants/507f1f77bcf86cd799439012"
    );
    //     // Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedBody);
  });

  it("Should GET all /restaurants and return a 200 status", async () => {
    // Arrange
    const expectedStatus = 200;
    const expectedBody = [
      {
        name: "Curry Place",
        description:
          "Bringing you the spirits of India in the form of best authentic grandma's recipe dishes handcrafted with love by our chefs!",
        image: "https://i.ibb.co/yftcRcF/indian.jpg",
        id: "616005cae3c8e880c13dc0b9",
      },
      {
        name: "Thai Isaan",
        description:
          "We offer guests a modern dining experience featuring the authentic taste of Thailand. Food is prepared fresh from quality ingredients and presented with sophisticated elegance in a stunning dining setting filled with all the richness of Thai colour, sound and art.",
        image: "https://i.ibb.co/HPjd2jR/thai.jpg",
        id: "616005e26d59890f8f1e619b",
      },
      {
        name: "Italian Feast",
        description:
          "From the Italian classics, to our one-of-a-kind delicious Italian favourites, all of our offerings are handcrafted from the finest, freshest ingredients available locally. Whether you're craving Italian comfort food like our Ravioli, Pappardelle or something with a little more Flavour like our famous Fettuccine Carbonara.",
        image: "https://i.ibb.co/0r7ywJg/italian.jpg",
        id: "616bd284bae351bc447ace5b",
      },
    ];
    //     // Act
    const response = await request(app).get("/restaurants");
    //     // Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedBody);
  });

  it("Should GET all /reservations and return a 200 status", async () => {
    // Arrange
    const expectedStatus = 200;
    const expectedBody = [
      {
        id: "507f1f77bcf86cd799439011",
        partySize: 4,
        date: "2023-11-17T06:30:00.000Z",
        userId: "mock-user-id",
        restaurantName: "Island Grill",
      },
      {
        id: "614abf0a93e8e80ace792ac6",
        partySize: 2,
        date: "2023-12-03T07:00:00.000Z",
        userId: "mock-user-id",
        restaurantName: "Green Curry",
      },
    ];
    //     // Act
    const response = await request(app).get("/reservations");
    //     // Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedBody);
  });

  it("Should GET a single /reservations/:id and return a 200 status", async () => {
    // Arrange
    const expectedStatus = 200;
    const expectedBody = {
      id: "507f1f77bcf86cd799439011",
      partySize: 4,
      date: "2023-11-17T06:30:00.000Z",
      userId: "mock-user-id",
      restaurantName: "Island Grill",
    };
    //     // Act
    const response = await request(app).get(
      "/reservations/507f1f77bcf86cd799439011"
    );
    //     // Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedBody);
  });

  // 400 test goes here for single reservation
  it("Should return a 400 status if the id of the reservation is invalid", async () => {
    // Arrange
    const expectedStatus = 400;
    const expectedBody = {
      error: "id provided is invalid",
    };
    //     // Act
    const response = await request(app).get(
      "/reservations/507f1f77bcf86cd799439"
    );
    //     // Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedBody);
  });
  // 403 test goes here for a single reservation
  it("Should return a 403 status if the user doesn't have permission to view the reservation", async () => {
    // Arrange
    const expectedStatus = 403;
    const expectedBody = {
      error: "user does not have permission to access this reservation",
    };
    //     // Act
    const response = await request(app).get(
      "/reservations/61679189b54f48aa6599a7fd"
    );
    //     // Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedBody);
  });

  // 404 test goes here for a single reservation
  it("Should return a 404 status if the reservation doesn't exist", async () => {
    // Arrange
    const expectedStatus = 404;
    const expectedBody = {
      error: "not found",
    };
    //     // Act
    const response = await request(app).get(
      "/reservations/507f1f77bcf86cd799439012"
    );
    //     // Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedBody);
  });
  // create a reservation test goes here with a 201 response
  it("POST should allow the creation of a reservation in the database and return 201", async () => {
    // arrange
    const expectedStatus = 201;
    const requestBody = {
      partySize: 2,
      date: "2023-12-03T07:00:00.000Z",
      restaurantName: "Green Curry",
    };

    // act
    const response = await request(app).post("/reservations").send(requestBody);

    // assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expect.objectContaining(requestBody));
  });

  // 400 test goes here for creating a reservation

  it("should display a 400 error if the user provides an invalid request body", async () => {
    // arrange
    const expectedStatus = 400;
    const requestBody = {};

    // act
    const response = await request(app).post("/reservations").send(requestBody);

    // assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expect.objectContaining(requestBody));
  });
});
