import { FetchClients } from './clients.action';
import { CreateClient } from './create.action';
import { DeleteClient } from './delete.action';
import { UpdateClient } from './update.action';

export type ClientsActionDispatchTypes =
  | CreateClient
  | FetchClients
  | DeleteClient
  | UpdateClient;
