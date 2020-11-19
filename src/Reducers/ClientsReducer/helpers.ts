import { Client } from '../../Actions/clients.action';

/**
 * A helper function used to update the client state through passing an arg.
 * This is specifically made for `Listings` (`not reusable`)
 * @param {Client} clients - Accepts an args of type `Client[]`
 * @returns {EditableTable} - Returns an `EditableTable` type
 */
export const updateClientState = (clients: Client[]) => {
  return {
    clients,
    persons: clients.length,
    completed: clients.filter((item) => item.paid === true).length, // filter the item that has an array then calculate the length
    billings: clients
      .map((item) => (item.bills === null ? 0 : item.bills))
      .reduce((a, b) => a + b, 0), // get all the bills and put it in to an array, then reduce it into 1 value
  };
};

/**
 * A helper function used to find and set the paid to either true or false
 * @param _id - It accepts `id` as a first argument. Used to find an item inside Client
 * @param currentState - It accepts `Client[]` type to be searched
 * @param isPaid - Used to add `paid` to either `true` and `false`
 * @returns {updateClientState} - Returns `updateClientState` function for Redux Store
 */
export const updatePaymentClientState = (
  _id: string,
  currentState: Client[],
  isPaid: boolean
) => {
  const client = currentState.filter((item) => item._id === _id)[0];

  const modifiedClients = currentState.filter(
    (item) => item._id !== client._id
  );

  const newBody = { ...client, ...{ paid: isPaid } };

  const clients = [...modifiedClients, newBody];
  return updateClientState(clients);
};
