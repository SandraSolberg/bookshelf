import clientPromise from '../../lib/mongo';
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';

export default async function getBooks(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('Bookshelf');

    const books = await db
      .collection('Bookshelf')
      .find({})
      .limit(20)
      .map((book) => ({ ...book, _id: book._id.toString() }))
      .toArray();

    return res.json(books);
  } catch (e) {
    console.error(e, 'Could not fetch books');
    throw Error('Could not fetch books');
  }
}
