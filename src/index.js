import * as express from 'express';
import cors from 'cors';

import * as expressMiddlewares from './core/src/infraestructure/express/middlewares';
import { graphqlHTTPConfig } from './infraestructure/graphql';
import './core/src/infraestructure/mongo-db';

const app = express();

app.use(cors());
app.use(expressMiddlewares.auth);
app.use('/graphql', graphqlHTTPConfig);

app.get('/', (req, res) => res.send('🚀'))

app.listen(4100, () => console.log('>. Running api on port 4100'));

app.use(expressMiddlewares.error)