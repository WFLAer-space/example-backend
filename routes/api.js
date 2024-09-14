const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const Announcement = require('../models/Announcement');

// 获取所有文章
router.get('/articles', async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: -1 });
        res.json(articles);
    } catch (err) {
        res.status(500).json({ error: '无法获取文章' });
    }
});

// 获取单篇文章
router.get('/articles/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ error: '文章未找到' });
        res.json(article);
    } catch (err) {
        res.status(500).json({ error: '无法获取文章' });
    }
});

// 获取所有公告
router.get('/announcements', async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.json(announcements);
    } catch (err) {
        res.status(500).json({ error: '无法获取公告' });
    }
});

module.exports = router;
