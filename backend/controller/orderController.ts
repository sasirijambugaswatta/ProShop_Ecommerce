import {Request,Response} from "express";
import asyncHandler from "../middleware/asynchandler.js";
import Order from "../models/order.model.js";

//@desc get logged in user orders
//@route GET /api/orders/myorders
//@access private
const getMyOrders = asyncHandler(async (req:Request, res:Response) => {
    // @ts-ignore
    const order = await Order.find({user: req.user?._id});
    if (order){
        res.status(200).json(order);
    }else {
        res.status(404);
        throw new Error('Order not found');
    }
});

//@desc create new order
//@route POST /api/orders
//@access private
const addOrderItems = asyncHandler(async (req:Request, res:Response) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice} = req.body;

    console.log("Order Items: ",orderItems)

    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('No order items');
    }else {
        const order = new Order({
            // @ts-ignore
            orderItems : orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            // @ts-ignore
            user: req.user?._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });
        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

//@desc get order by id
//@route GET /api/orders/:id
//@access private
const getOrderById = asyncHandler(async (req:Request, res:Response) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order){
        res.status(200).json(order);
    }else {
        res.status(404);
        throw new Error('Order not found');
    }
});

//@desc update order to paid
//@route PUT /api/orders/:id/pay
//@access private
const updateOrderToPaid = asyncHandler(async (req:Request, res:Response) => {
    res.send('update order to paid');
});

//@desc update order to delivered
//@route PUT /api/orders/:id/deliver
//@access private/admin
const updateOrderToDelivered = asyncHandler(async (req:Request, res:Response) => {
    res.send('update order to delivered');
});

//@desc get All orders
//@route GET /api/orders/
//@access private/admin
const getAllOrders = asyncHandler(async (req:Request, res:Response) => {
    res.send('get all orders');
});

export {getMyOrders,
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getAllOrders};
