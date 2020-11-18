import { Client } from '../../Actions/clients.action';

/**
 * A helper function used to update the client state through passing an arg.
 * This is specifically made for only `1` purpose (`not reusable`)
 * @param {Client} clients - Accepts an args of type `Client[]`
 * @returns {EditableTable} - Returns an `EditableTable` type
 */
export const updateClientState = (clients: Client[]) => {
  return {
    clients,
    persons: clients.length,
    completed: clients.filter((item) => item.paid === true).length, // filter the item that has an array then calculate the length
    billings: clients.map((item) => item.bills).reduce((a, b) => a + b), // get all the bills and put it in to an array, then reduce it into 1 value
  };
};
