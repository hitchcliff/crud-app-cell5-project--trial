import axios from 'axios';

export const UpdateClientAction = (body: any) => async () => {
  try {
    console.log(body);
    await axios.patch(`http://localhost:5000/clients/${body._id}`, body);
  } catch (error) {
    console.log(error);
  }
};

// Constants FETCH_CLIENTS
export const UPDATE_CLIENT = 'CREATE_CLIENT';
export interface UpdateClient {
  type: typeof UPDATE_CLIENT;
  payload: any;
}
