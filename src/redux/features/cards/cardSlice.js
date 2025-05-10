import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

export const addCard = createAsyncThunk(
  'cards/addCard',
  async ({ endpoint, newCard }, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoint, newCard); 
      return { endpoint, card: response.data }; 
    } catch (error) {
      console.error('Error adding card:', error);
      return rejectWithValue(error.response?.data || 'Failed to add card');
    }
  }
);
export const fetchCards = createAsyncThunk('cards/fetchCards', async (endpoint) => {
  const response = await api.get(endpoint);

  let items = [];

  if (Array.isArray(response.data)) {
    items = response.data;
  } else if (response.data.hotels) {
    items = response.data.hotels;
  } else if (response.data.restaurants) {
    items = response.data.restaurants;
  } else {
    console.error('Unknown response structure:', response.data);
  }

  const mappedData = items.map(item => {
    let locationString = 'N/A';

    if (item.location?.coordinates?.length === 2) {
      locationString = item.location.coordinates.join(', ');
    }

    const destination =
      item.destinationId?.country || item.destination || locationString;

    return {
      id: item._id,
      name: item.name,
      destination,
      rank: item.rank,
      status: item.isOpen,
      date: new Date(item.createdAt).toLocaleDateString('en-GB'),
      image: item.images?.restaurantImages?.[0] ||
             item.images?.[0] ||
             'https://via.placeholder.com/40',
    };
  });

  return { endpoint, data: mappedData };
});

const initialState = {
  dataByEndpoint: {},
  statusByEndpoint: {},
  errorByEndpoint: {},
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    
deleteCard: (state, action) => {
  const { id, endpoint } = action.payload;

  if (!id || !endpoint) {
    console.error('Both id and endpoint are required in the deleteCard action payload');
    return;
  }

  if (Array.isArray(state.dataByEndpoint[endpoint])) {
    state.dataByEndpoint[endpoint] = state.dataByEndpoint[endpoint].filter(card => card.id !== id);
  } else {
    console.error(`No cards found for endpoint: ${endpoint}`);
  }
}
,
    editCard: (state, action) => {
      const { card, endpoint } = action.payload;
      const index = state.dataByEndpoint[endpoint].findIndex(existingCard => existingCard.id === card.id);
      if (index !== -1) {
        state.dataByEndpoint[endpoint][index] = card;
      }
    },
  },
extraReducers: (builder) => {
  builder
    .addCase(fetchCards.pending, (state, action) => {
      const endpoint = action.meta.arg;
      state.statusByEndpoint[endpoint] = 'loading';
    })
    .addCase(fetchCards.fulfilled, (state, action) => {
      const { endpoint, data } = action.payload;
      state.dataByEndpoint[endpoint] = data;
      state.statusByEndpoint[endpoint] = 'succeeded';
    })
    .addCase(fetchCards.rejected, (state, action) => {
      const endpoint = action.meta.arg;
      state.statusByEndpoint[endpoint] = 'failed';
      state.errorByEndpoint[endpoint] = action.error.message;
    })
    .addCase(addCard.fulfilled, (state, action) => {
      const { endpoint, card } = action.payload;
      if (!state.dataByEndpoint[endpoint]) {
        state.dataByEndpoint[endpoint] = [];
      }
      state.dataByEndpoint[endpoint].push(card); 
    })
    .addCase(addCard.rejected, (state, action) => {
      console.error('Failed to add card:', action.payload);
    });
},
});

export const { deleteCard, editCard } = cardSlice.actions;
export default cardSlice.reducer;