import { FetchClients } from './clients.action';
import { CreateClient } from './create.action';
import { DeleteClient } from './delete.action';
import { PaidClient } from './paid.action';
import { SearchClient } from './search.action';
import { SortClient } from './sort.action';
import { UnPaidClient } from './unpaid.action';
import { UpdateClient } from './update.action';

export type ClientsActionDispatchTypes =
  | CreateClient
  | FetchClients
  | DeleteClient
  | UpdateClient
  | SearchClient
  | SortClient
  | PaidClient
  | UnPaidClient;
