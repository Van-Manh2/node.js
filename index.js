// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Import các router
const bookRouter = require('./routers/bookRouter');
const employeeRouter = require('./routers/employeeRouter');
const memberRouter = require('./routers/memberRouter');
const borrowingRouter = require('./routers/borrowingRouter');

// Khởi tạo ứng dụng Express
const app = express();

// Kết nối MongoDB
mongoose.connect('mongodb://localhost/library-system', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Kết nối tới MongoDB thành công!'))
    .catch(err => console.log('Lỗi kết nối MongoDB:', err));

// Cấu hình body-parser để xử lý dữ liệu từ form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cấu hình view engine là EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Cấu hình các routes
// Giao diện quản lý toàn bộ hệ thống
app.get('/', (req, res) => {
    res.render('adminDashboard');
});
app.use('/books', bookRouter);     // Quản lý sách
app.use('/employees', employeeRouter); // Quản lý nhân viên
app.use('/members', memberRouter);   // Quản lý người mượn sách
app.use('/borrowings', borrowingRouter);     // Quản lý mượn sách

// Cấu hình cổng lắng nghe
const port = 3000;
app.listen(port, () => {
    console.log(`Server đang chạy trên cổng ${port}`);
});
