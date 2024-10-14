import { Request, Response } from "express";
import { Transaction } from "../models";
import { createResponse } from "../interfaces";

export const chartgenController = {
  getTransactionHistory: async (req: Request, res: Response): Promise<void> => {
    const { initial_date, end_date, product } = req.body;

    try {
      if (!initial_date || !end_date) {
        res.status(400).json(createResponse(null, "Initial date and end date are required.", false));
        return;
      }

      const startDate = new Date(initial_date);
      const endDate = new Date(end_date);

      const query: any = {
        create_at: { $gte: startDate, $lte: endDate },
      };

      if (product) {
        query.product_id = product;
      }

      const transactions = await Transaction.find(query).populate("product_id", "name")
      .exec();

      res.status(200).json(createResponse(transactions, "Historical transactions successfully retrieved", true));
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json(createResponse(null, error.message, false));
      } else {
        res.status(500).json(createResponse(null, "Internal Server Error", false));
      }
    }
  },
  getTopMovements: async (req: Request, res: Response): Promise<void> => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
    try {
      const movements = await Transaction.aggregate([
        {
          $match: {
            create_at: { $gte: oneMonthAgo },
          },
        },
        {
          $group: {
            _id: {
              product_id: "$product_id",
              movement_type: "$movement_type",
            },
            total_moved: { $sum: "$quantity_moved" },
          },
        },
        {
          $group: {
            _id: "$_id.product_id",
            in_total: {
              $sum: {
                $cond: [{ $eq: ["$_id.movement_type", "in"] }, "$total_moved", 0],
              },
            },
            out_total: {
              $sum: {
                $cond: [{ $eq: ["$_id.movement_type", "out"] }, "$total_moved", 0],
              },
            },
          },
        },
        {
          $addFields: {
            total_moved: { $add: ["$in_total", "$out_total"] },
          },
        },
        {
          $sort: {
            total_moved: -1, // Sort by total movements
          },
        },
        {
          $limit: 5, // Get the top 5 products
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product_info",
          },
        },
        {
          $unwind: {
            path: "$product_info",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 0,
            product_id: "$_id",
            product_name: "$product_info.name",
            in_total: 1,
            out_total: 1,
            total_moved: 1,
            in_percentage: {
              $multiply: [{ $divide: ["$in_total", "$total_moved"] }, 100],
            },
            out_percentage: {
              $multiply: [{ $divide: ["$out_total", "$total_moved"] }, 100],
            },
          },
        },
      ]);
  
      res.status(200).json(createResponse(movements, "Top product movements successfully retrieved.", true));
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json(createResponse(null, error.message, false));
      } else {
        res.status(500).json(createResponse(null, "Internal Server Error", false));
      }
    }
  },
};

export default chartgenController;
