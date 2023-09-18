import axios from 'axios';

const baseUrl: string = import.meta.env.VITE_API_BASE_URL as string;

export async function fetchUserTransactions(userId: string) {
    const url = `${baseUrl}/users/${userId}/transactions`;
    return await axios.get(url);
}

export async function createTransaction(transaction: CreateTransaction) {
    console.log("create", transaction)
    const url = `${baseUrl}/transactions`;
    return await axios.post(url, transaction);
}

export async function deleteTransaction(transactionId: string) {
    const url = `${baseUrl}/transactions/${transactionId}`;
    return await axios.delete(url);
}

