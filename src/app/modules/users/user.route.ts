import express from 'express'
import { UserControllers } from './user.controller'
// import { getUserOrders } from './user.service';
const router = express.Router()

router.post('/', UserControllers.createUser);

router.get('/', UserControllers.getAllUsers);

router.get('/:userId', UserControllers.getSingleUsers)
router.put('/:userId', UserControllers.updateUser)
router.delete('/:userId', UserControllers.deleteUser)
router.put('/:userId/orders', UserControllers.addProductToOrder);
router.get('/:userId/orders', UserControllers.getUserOrders);
router.get('/:userId/orders/total-price', UserControllers.getTotalOrdersPrice);

export const UserRouters = router;