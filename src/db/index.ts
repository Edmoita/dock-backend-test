import mongoose from 'mongoose';

import dbConfig from './config';

export default mongoose.connect(dbConfig.URI as string, dbConfig.MONGOOSE_OPTS);
