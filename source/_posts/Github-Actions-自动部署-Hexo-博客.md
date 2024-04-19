---
title: Github Actions 自动部署 Hexo 博客
date: 2024-04-19 17:07:35
tags:
  - Github Actions
---

[在每个工作流作业开始时，GitHub 会自动创建唯一的 GITHUB_TOKEN 机密以在工作流中使用。](https://docs.github.com/zh/actions/security-guides/automatic-token-authentication)

```yml
name: Deployment

on:
  push:
    branches:
      - hexo-blog

jobs:
  deployment:
    runs-on: ubuntu-latest
    environment: github-pages
    steps:
      - uses: actions/checkout@v4

      - name: Use Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Deploy
        env:
          HEXO_ALGOLIA_INDEXING_KEY: ${{ secrets.HEXO_ALGOLIA_INDEXING_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GITHUB_REPO: https://github.com/ultravires/ultravires.github.io
        run: |
          git config --global user.name "ultravires"
          git config --global user.email "x555666777@qq.com"
          npm version
          npm install
          npm run clean
          npm run build
          npm run algolia
          cd ./public/
          git add .
          git commit -m "CI build at `date +"%Y-%m-%d %H:%M:%S"`"
          git push --force --quiet "${GH_TOKEN}@${GITHUB_REPO}" main:main

```