import * as express from 'express';

import { graphqlHTTPConfig } from './infraestructure/graphql';
import './core/src/infraestructure/mongo-db';

const app = express();

app.use('/graphql', graphqlHTTPConfig);

app.get('/', (req, res) => res.send('🚀'))

app.listen(4000, () => console.log('Running api on port 4000'));