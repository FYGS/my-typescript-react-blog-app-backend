import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

export const performDBOperation = async (request: Request, response: Response, operation: Function) => {
	dotenv.config();
	const client = new MongoClient(process.env.DB_URI ?? '');
	try {
		await client.connect();
		console.log('Successfully connected!');
		const db = client.db(process.env.DB_NAME);

		await operation(db, request, response);

	} catch (error: any) {
		response
			.status(500)
			.json({ message: 'Error connecting to data base', error: error.message });
	} finally {
		await client.close();
		console.log('Database connection successfully closed')
	}
};
