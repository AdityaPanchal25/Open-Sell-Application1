import React, { useEffect, useState } from 'react';
import "./style/Orders.css";
import { db } from "./firebase";
import { useStateValue } from './Stateprovider';
import Order from './Order';
import { doc, collection, query, orderBy, onSnapshot } from "firebase/firestore";

function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            const userDocRef = doc(db, 'users', user?.uid);
            const ordersCollectionRef = collection(userDocRef, 'orders');
            const orderedOrders = query(ordersCollectionRef, orderBy('created', 'desc'));

            const unsubscribe = onSnapshot(orderedOrders, snapshot => {
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })));
            });

            return () => unsubscribe();
        } else {
            setOrders([]);
        }
    }, [user]);

    return (
        <div className='orders'>
            <h1>Your Orders</h1>
            <div className='orders__order'>
                {orders?.map(order => (
                    <Order key={order.id} order={order} />
                ))}
            </div>
        </div>
    );
}

export default Orders;
