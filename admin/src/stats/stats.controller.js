import Order from '../Orders/order.model.js';
import Book from '../Books/book.model.js';

const getAdminStats = async (req, res) => {
    try {
        //get total number of orders
        const totalOrders = await Order.countDocuments();

        //get total sales
        const totalSales = await Order.aggregate([
            {
                $group: { 
                    _id: null, //1. nhóm tất cả các document 
                    totalSales: { $sum: "$totalPrice" },    //2. tính tổng totalPrice của tất cả các documents
                }
            }
        ]);

        //get trending books
        const trendingBooksCount = await Book.aggregate([
            { $match: { trending: true } },  // Match only trending books
            { $count: "trendingBooksCount" }  // Return the count of trending books
        ]);
        
        // count trending books, check if trendingBooksCount is not empty, if empty, set trendingBooksCount to 0
        const trendingBooks = trendingBooksCount.length > 0 ? trendingBooksCount[0].trendingBooksCount : 0;

        // total number of books
        const totalBooks = await Book.countDocuments();

        // stats monthly sales
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },  // Group by year and month
                    totalSales: { $sum: "$totalPrice" },  // Sum totalPrice for each month
                    totalOrders: { $sum: 1 }  // Count total orders for each month
                }
            },
            { $sort: { _id: 1 } }  
        ]);

        // Result summary
        res.status(200).json({  totalOrders,
            totalSales: totalSales[0]?.totalSales || 0,
            trendingBooks,
            totalBooks,
            monthlySales, });
      
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Failed to fetch admin stats" });
    }
}

export { getAdminStats }
