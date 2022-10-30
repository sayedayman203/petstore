const { GSP } = require("../src/helpers/GSP-auction");

describe("Generalized second price auction", () => {
  it("expect no winner when n >= k", async () => {
    const res = GSP(
      [
        {
          user: "John Doe",
          amount: 100,
        },
        {
          user: "John Smith",
          amount: 500,
        },
        {
          user: "Sara Conor",
          amount: 280,
        },
        {
          user: "Martin Fowler",
          amount: 320,
        },
      ],
      4
    );

    expect(res).toBe("No Winners");
  });

  it("expect no winner when no bids", async () => {
    const res = GSP([], 1);

    expect(res).toBe("No Winners");
  });

  it("expect no winner when no items", async () => {
    const res = GSP(
      [
        {
          user: "John Doe",
          amount: 100,
        },
        {
          user: "John Smith",
          amount: 500,
        },
        {
          user: "Sara Conor",
          amount: 280,
        },
        {
          user: "Martin Fowler",
          amount: 320,
        },
      ],
      0
    );

    expect(res).toBe("No Winners");
  });

  it("normal case", async () => {
    const res = GSP(
      [
        {
          user: "John Doe",
          amount: 100,
        },
        {
          user: "John Smith",
          amount: 500,
        },
        {
          user: "Sara Conor",
          amount: 280,
        },
        {
          user: "Martin Fowler",
          amount: 320,
        },
      ],
      3
    );

    expect(res).toEqual([
      {
        user: "John Smith",
        amount: 320,
      },
      {
        user: "Martin Fowler",
        amount: 280,
      },
      {
        user: "Sara Conor",
        amount: 100,
      },
      {
        user: "John Doe",
        amount: "Lost the auction",
      },
    ]);
  });

  it("Tie-breake case", async () => {
    const res = GSP(
      [
        {
          user: "John Smith",
          amount: 400,
        },
        {
          user: "Sara Conor",
          amount: 280,
        },
        {
          user: "Martin Fowler",
          amount: 320,
        },
        {
          user: "John Doe",
          amount: 400,
        },
      ],
      3
    );

    expect(res).toEqual([
      {
        user: "John Doe",
        amount: 400,
      },
      {
        user: "John Smith",
        amount: 320,
      },
      {
        user: "Martin Fowler",
        amount: 280,
      },
      {
        user: "Sara Conor",
        amount: "Lost the auction",
      },
    ]);
  });
});
