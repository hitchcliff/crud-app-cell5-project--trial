import axios from 'axios';
import { Dispatch } from 'react';
import { ClientsActionDispatchTypes } from './action.types';

/**
 * A function that accepts `body` as an `args`
 * The body represents the objects of the actual data in the table.
 * This creator will send an HTTP `patch` request through Rest API
 * @function
 * @param body
 */
export const UpdateClientAction = (body: any) => async (
  dispatch: Dispatch<ClientsActionDispatchTypes>
) => {
  try {
    const transformBody = {
      _id: body._id,
      first_name: body.first_name,
      last_name: body.last_name,
      mobile_number: body.mobile_number,
      bills: parseInt(body.bills),
      gender: body.gender,
      paid: body.paid,
    };
    await axios.patch(
      `http://localhost:5000/clients/${transformBody._id}`,
      transformBody
    );
    dispatch({
      type: UPDATE_CLIENT,
      payload: transformBody,
    });
  } catch (error) {
    console.log(error);
  }
};

// Constants FETCH_CLIENTS
export const UPDATE_CLIENT = 'UPDATE_CLIENT';
export interface UpdateClient {
  type: typeof UPDATE_CLIENT;
  payload: any;
}
