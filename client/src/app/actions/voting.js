import { createAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const setIsAdmin = createAction('voting/setIsAdmin');
export const setDisplayId = createAction('voting/setDisplayId');