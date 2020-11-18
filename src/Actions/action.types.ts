import { FetchClients } from './clients.action';
import { CreateClient } from './create.action';

export type ClientsActionDispatchTypes = CreateClient | FetchClients;
