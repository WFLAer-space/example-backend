const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const Announcement = require('../models/Announcement');

// 渲染添加文章页面
router.get('/add-article', (req, res) => {
    res.render('admin/addArticle');
});

// 处理添加文章
router.post('/add-article', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newArticle = new Article({ title, content });
        await newArticle.save();
        req.flash('success_msg', '文章添加成功');
        res.redirect('/admin/add-article');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', '添加文章失败');
        res.redirect('/admin/add-article');
    }
});

// 渲染添加公告页面
router.get('/add-announcement', (req, res) => {
    res.render('admin/addAnnouncement');
});

// 处理添加公告
router.post('/add-announcement', async (req, res) => {
    const { title, message } = req.body;
    try {
        const newAnnouncement = new Announcement({ title, message });
        await newAnnouncement.save();
        req.flash('success_msg', '公告添加成功');
        res.redirect('/admin/add-announcement');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', '添加公告失败');
        res.redirect('/admin/add-announcement');
    }
});

module.exports = router;
