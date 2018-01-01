import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app'));
app.model(require('./models/menu'));
app.model(require('./models/post'));
app.model(require('./models/category'));
app.model(require('./models/archieve'));
app.model(require('./models/tag'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
