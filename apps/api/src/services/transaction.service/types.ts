export interface ITransaction {
    checkInDate: Date,
    checkOutDate: Date,
    total: number,
    price: number,
    qty: number,
    userId: string,  
    tenantId: string,  
    propertyId: string,
    roomId: number,
    createdAt?: Date,
    updatedAt?: Date
}

export interface ITransactionStatus {
    id: number,
    status: Status,
    transactionId: string

    createdAt?: Date,
    updatedAt?: Date
}

export enum Status {
    WAITING_FOR_PAYMENT = "WAITING_FOR_PAYMENT",
    WAITING_FOR_CONFIRMATION_PAYMENT = "WAITING_FOR_CONFIRMATION_PAYMENT",
    PAID = "PAID",
    CANCELLED = "CANCELLED",
    EXPIRED = "EXPIRED"
}