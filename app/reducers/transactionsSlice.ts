import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getInfo } from '../lib/actions/getInfo';
// Import your Next.js server action


// Define the shape of a single transaction (adjust fields as needed)
export interface Transaction {
  
  amount: number;
  timestamp: string;
  
  fromUser: {
    number: string;
  };
  toUser: {number: string};
  // Add other fields as necessary
}

// Define the slice state
interface TransactionsState {
  entities: Transaction[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state: starts empty and will be filled by the thunk
const initialState: TransactionsState = {
  entities: [],
  status: 'idle',
  error: null,
};

// Async thunk that calls the Next.js server action to fetch data
export const fetchTransactions = createAsyncThunk<Transaction[]>(
  'transactions/fetchTransactions',
  async () => {
    // Calls your server action; make sure getInfo() returns Transaction[]
    const data = await getInfo();
    return data;
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    // Define any synchronous reducers here if needed
    addTransaction: (state, action) => {
      state.entities.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchTransactions.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.status = 'succeeded';
          state.entities = action.payload;
        }
      )
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

// Export the reducer to include in your store
export const { addTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
