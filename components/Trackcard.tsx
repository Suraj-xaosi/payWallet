'use client';

import { fetchTransactions } from '@/app/reducers/transactionsSlice';
import { AppDispatch, RootState } from '@/app/store/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from './Card';

export default function Trackcard({ n }: { n: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.transactions);
  const entities = useSelector((state: RootState) => state.transactions.entities);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  if (status === 'loading') return <p className="text-center text-gray-500">Loading...</p>;
  if (status === 'failed') return <p className="text-center text-red-500">Error: {error}</p>;

  if (entities.length === 0 && status === 'succeeded') {
    return <p className="text-center text-gray-500">No transactions found.</p>;
  }

  return (
    <div className="space-y-4 w-full">
      {entities.map((tx, i) => (
        <div
          key={i}
          className={`p-4 border rounded-lg shadow-md ${
            tx?.fromUser.number === n || tx?.fromUser.number === 'you'
              ? 'bg-sky-100 border-sky-300'
              : 'bg-rose-100 border-rose-300'
          }`}
        >
          <h3 className="text-lg font-semibold text-gray-800">Transaction {i + 1}</h3>
          <div className="mt-2 text-sm text-gray-600">
            <p>
              <span className="font-medium text-gray-700">From:</span> {tx.fromUser.number}
            </p>
            <p>
              <span className="font-medium text-gray-700">To:</span> {tx.toUser.number}
            </p>
            <p>
              <span className="font-medium text-gray-700">Amount:</span> ${tx.amount}
            </p>
            <p>
              <span className="font-medium text-gray-700">Time:</span>{' '}
              {new Date(tx.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
