# 快速GitHub设置指南

## 第一步：在GitHub创建仓库

1. 访问 https://github.com
2. 登录您的账户 (ma2ong)
3. 点击右上角的 "+" 号，选择 "New repository"
4. 填写以下信息：
   - Repository name: `led-website`
   - Description: `LED网站项目 - 现代化企业官网`
   - 选择 Public 或 Private
   - **不要勾选任何选项**（README, .gitignore, license）
5. 点击 "Create repository"

## 第二步：推送代码

创建仓库后，在命令行中运行：

```bash
git push -u origin main
```

如果提示输入用户名和密码：
- 用户名：ma2ong
- 密码：使用Personal Access Token（不是GitHub密码）

## 第三步：创建Personal Access Token（如果需要）

如果推送时提示密码错误，需要创建Token：

1. 在GitHub中，点击右上角头像 → Settings
2. 左侧菜单选择 "Developer settings"
3. 选择 "Personal access tokens" → "Tokens (classic)"
4. 点击 "Generate new token (classic)"
5. 填写：
   - Note: `LED Website Deployment`
   - Expiration: 90 days
   - Scopes: 勾选 `repo`
6. 点击 "Generate token"
7. 复制生成的token（只显示一次！）

## 第四步：使用Token推送

```bash
git push -u origin main
```

输入：
- Username: ma2ong
- Password: [刚才复制的token]

## 验证成功

推送成功后，访问：
https://github.com/ma2ong/led-website

确认所有文件都已上传。

## 下一步：Vercel部署

1. 访问 https://vercel.com
2. 使用GitHub账户登录
3. 点击 "New Project"
4. 选择 `ma2ong/led-website` 仓库
5. 设置 Root Directory 为 `frontend`
6. 配置环境变量
7. 点击 Deploy