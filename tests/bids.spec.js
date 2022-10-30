require("dotenv").config();

const app = require("../src/app");
const request = require("supertest");

const bids = [
  {
    amount: 80,
    petId: 2,
    userId: 1,
  },
  {
    amount: 60,
    petId: 2,
    userId: 2,
  },
  {
    amount: 50,
    petId: 2,
    userId: 3,
  },
];

describe("Bid api", () => {
  const agent = request(app);

  it("Add bid should fail when body is not complete", async () => {
    const res = await agent.post("/bid").send({
      amount: 70,
      userId: 1,
    });

    expect(res.status).toBe(400);

    expect(res.body.code).toBe(400);
    expect(res.body.type).toBe("fail");
    expect(res.body.message).toBe("VALIDATION_ERROR");
  });

  it("Add bid should success when body is valid", async () => {
    const res = await agent.post("/bid").send({
      amount: 70,
      petId: 1,
      userId: 1,
    });
    expect(res.status).toBe(201);

    expect(res.body.code).toBe(201);
    expect(res.body.type).toBe("success");
  });

  it("get all bids", async () => {
    // insert other bids
    await Promise.all(bids.map((bid) => agent.post("/bid").send(bid)));

    const res = await agent.get("/bid");

    expect(res.status).toBe(200);

    expect(res.body.code).toBe(200);
    expect(res.body.type).toBe("success");
    expect(res.body.data.length).toBe(bids.length + 1);
  });

  it("get bids for single pet", async () => {
    const res = await agent.get("/bid").query({ petId: 2 });
    expect(res.status).toBe(200);

    expect(res.body.code).toBe(200);
    expect(res.body.type).toBe("success");
    expect(res.body.data.length).toBe(bids.length);
  });
});
