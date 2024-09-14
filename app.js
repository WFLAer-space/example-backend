const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

// 连接到MongoDB
mongoose.connect('mongodb://localhost:27017/webbackend', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB 连接成功'))
.catch(err => console.error('MongoDB 连接失败:', err));

// 设置模板引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// 会话和闪存消息
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

// 全局变量用于模板
app.use((req, res, next) => {
    res.locals.messages = {
        success_msg: req.flash('success_msg'),
        error_msg: req.flash('error_msg')
    };
    next();
});

// 路由
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

// 简单的主页
app.get('/', (req, res) => {
    res.send('欢迎来到后台管理系统');
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
});
