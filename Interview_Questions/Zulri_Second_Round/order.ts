// Online Typescript Editor for free
// Write, Edit and Run your Typescript code using TS Online Compiler
/*
Order Placement
User should be able to place buy/sell orders for a stock
Support order types: Market, Limit, Stop-loss
System should validate order inputs (symbol, quantity, price where applicable)
System should generate a unique order ID for every order
User should receive immediate acknowledgment after placing an order 

Funds & Margin Validation
System should verify sufficient funds before accepting buy orders
System should block required funds upon order placement
System should release blocked funds on order cancellation/rejection
System should prevent overspending in case of concurrent orders

Modify / Cancel Order
User should be able to modify open orders (price/quantity within limits)
User should be able to cancel orders that are not fully executed
System should validate and process modify/cancel requests
System should update order state accordingly

Trade Recording
System should create a trade record for every execution event
Each trade should be linked to an order
System should store execution details (price, quantity, timestamp)

Portfolio Updates
System should update user holdings after trade execution
System should update average price and position quantity
System should reflect realized/unrealized profit and loss






Order Placement
User should be able to place buy/sell orders for a stock
Support order types: Market, Limit, Stop-loss
System should validate order inputs (symbol, quantity, price where applicable)
System should generate a unique order ID for every order
User should receive immediate acknowledgment after placing an order 

*/

OrderService

// OrderRequest : which stock, quantity, type, price, symbol
orderPlace() {
	validateOrder(orderRequest)
	
}

interface OrderRequest {
    
}

interface OrderValidator {
    validateOrder(order: OrderRequest): boolean
}



class LimitOrderValidator implements OrderValidator {
    validateOrder(order: OrderRequest): boolean {
        const stock = DBRepository.getStockDetails(order) 
        
        if (order.quanity > stock.quantity) {
            throw new Error("Stocks quantity is higher")
        }
        
        if (type check) {
            
        }
        
        if (order.type = "LIMIT" && price < 0) {
            
        }
        
    }
}

class MarkOrderValidator implements Or


class DBRepository {
    blockOrder(order: OrderRequest) {
        
    }
    
    createOrder() {
        
    }
    
    static getStockDetails(order) {
        const {id} = order
        return this.db.query(`Select * from stocks where ${}`, [id])
    }
}


class OrderValidatorFactory {
    
}


class OrderService {
    constructor(private validator: OrderValidator)
    orderPlaced(order: OrderRequest) {
        if(!this.order.validateOrder(order)) {
            throw new Error("Invalid Order ")
        }
        
        blockOrder(order)
        ack = createOrder(order)
        sendNotification(order)
        return ack; 
    }
}