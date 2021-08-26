import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'


//@desc     Create New Order
//@route    POST /api/orders
//@access   private
const addOrderItems = asyncHandler(async (req, res)  => {
    console.log(req.body)
    const {orderItems, shippingAddress, paymentMethod,itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body
    
    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('no order items...')
        return
    }
    else{
        const order = new Order({
            orderItems, 
            user: req.user._id,
            shippingAddress, 
            paymentMethod,
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice,

        })
        console.log(order)
        const createdOrder = await order.save()
        console.log('Order Created')
        res.status(201).json(createdOrder)
    }
} )


//@desc     Get order by id
//@route    GET /api/orders/:id
//@access   private
const getOrderById = asyncHandler(async (req, res)  => {
        const order = await Order.findById(req.params.id).populate('user', 'name email')

        if(order){
            res.json(order)
        }
        else{
            res.status(404)
            throw new Error('Order not found.')
        }
    }
)

export {addOrderItems, getOrderById}