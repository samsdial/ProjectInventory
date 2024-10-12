import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../../models/User";
import { authenticationController } from "../../controllers";

jest.mock("../../models/User");

describe("Testing authentication module", () => {
  it("should return a message showing that the username is incorrect", async () => {
    const request = {
      body: {
        username: "incorrect_username", // Incorrect username in the request
        password: "password123", // Any password
      },
    } as Request;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (User.findOne as jest.Mock).mockResolvedValue(null);

    await authenticationController.userLogin(request, response);

    expect(response.status).toHaveBeenCalledWith(403);
    expect(response.json).toHaveBeenCalledWith({
      data: null,
      message: "User wasn't found",
      success: false,
    });
  });

  it("should return a message showing that the password is incorrect", async () => {
    const hashedPassword = await bcrypt.hash("password123", 10);

    const request = {
      body: {
        username: "john_doe", // Correct username
        password: "wrongPassword", // Incorrect password
      },
    } as Request;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const userMock = {
      _id: "60e9c5f4e8e7a4301c123456",
      name: "John Doe",
      username: "john_doe",
      password: await bcrypt.hash(hashedPassword, 10),
      email: "john.doe@example.com",
      comparePassword: jest.fn().mockResolvedValue(false), // Simulate incorrect password comparison
    };

    (User.findOne as jest.Mock).mockResolvedValue(userMock);

    await authenticationController.userLogin(request, response);

    expect(response.status).toHaveBeenCalledWith(403);

    expect(response.json).toHaveBeenCalledWith({
      data: null,
      message: "Wrong password",
      success: false,
    });
  });

  it("should show good response", async () => {
    const hashedPassword = await bcrypt.hash("password123", 10);

    const request = {
      body: {
        username: "john_doe",
        password: hashedPassword,
      },
    } as Request;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const userMock = {
      _id: "60e9c5f4e8e7a4301c123456",
      name: "John Doe",
      username: "john_doe",
      password: await bcrypt.hash("correctPassword", 10),
      email: "john.doe@example.com",
      role: "standard",
      comparePassword: jest.fn().mockResolvedValue(true),
    };

    (User.findOne as jest.Mock).mockResolvedValue(userMock);

    await authenticationController.userLogin(request, response);

    expect(response.status).toHaveBeenCalledWith(200);

    const expectedResponse = {
      data: {
        token: expect.any(String),
        user: {
          email: "john.doe@example.com",
          name: "John Doe",
          role: "standard",
        },
      },
      message: "Login successful",
    };

    expect(response.json).toHaveBeenCalledWith(expect.objectContaining(expectedResponse));
  });

  it("Should shows Unexpected error occurred", async () => {
    const hashedPassword = await bcrypt.hash("password123", 10);

    const request = {
      body: {
        username: "john_doe",
        password: hashedPassword,
      },
    } as Request;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (User.findOne as jest.Mock).mockRejectedValue(new Error("Unexpected error occurred"));
    await authenticationController.userLogin(request, response);

    expect(response.status).toHaveBeenCalledWith(500);

    const expectedErrorResponse = {
      data: null,
      message: "Unexpected error occurred",
      success: false,
    };

    expect(response.json).toHaveBeenCalledWith(expect.objectContaining(expectedErrorResponse));
  });
});
