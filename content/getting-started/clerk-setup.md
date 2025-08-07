---
title: "Setting Up Clerk Authentication"
description: "Quick setup guide for enabling Clerk authentication in your help center project"
category: getting-started
tag: "Setup"
order: 3
---

# Setting Up Clerk Authentication

## Overview

This guide shows you how to enable Clerk authentication in your help center project. The project is pre-configured with authentication support - you just need to add your Clerk keys and choose your protection settings.

---

## Quick Setup

### Step 1: Get Your Clerk Keys

1. Create a free account at [clerk.com](https://clerk.com)
2. Create a new application in your Clerk dashboard
3. Go to **API Keys** and copy these two values:
   - **Publishable Key** (starts with `pk_`)
   - **Secret Key** (starts with `sk_`)

### Step 2: Configure Environment Variables

Copy `.env.example` to `.env.local` and add your Clerk keys:

```env
# Clerk Authentication - Only these two keys are needed
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
```

### Step 3: Choose Your Protection Level

In your `.env.local`, configure what you want to protect:

```env
# Enable authentication system
NEXT_PUBLIC_AUTH_ENABLED=true

# Choose what to protect (true/false)
AUTH_PROTECT_CONTENT=false    # Protect all content (articles, categories)
AUTH_PROTECT_EDITOR=true      # Protect the /editor page (recommended)
```

### Step 4: Switch to Authentication Middleware

Your project has two middleware files:

- `middleware.ts` - **Current**: middleware (with auth)
- `basicMiddleware.ts` - **NoAuth**: No authentication

**To enable authentication:**

```bash
# Backup the current middleware if you dont need auth
mv middleware.ts middleware-backup.ts

# Rename the basic middleare file
mv basicMiddleware.ts middleware.ts

# The authentication middleware is already in place
# Just restart your development server
npm run dev
```

---

## Configuration Options

### Protection Settings

| Setting                      | Description                    | Recommended                                                        |
| ---------------------------- | ------------------------------ | ------------------------------------------------------------------ |
| `AUTH_PROTECT_CONTENT=false` | Anyone can view articles       | ✅ **Public help center**                                          |
| `AUTH_PROTECT_CONTENT=true`  | Login required to view content | ❌ **Private knowledge base**                                      |
| `AUTH_PROTECT_EDITOR=true`   | Login required for /editor     | ✅ **Always recommended**                                          |
| `AUTH_PROTECT_EDITOR=false`  | Editor is publicly accessible  | ❌ **Not recommended if you want to push to github automatically** |

### Common Configurations

**Public Help Center (Default):**

```env
NEXT_PUBLIC_AUTH_ENABLED=true
AUTH_PROTECT_CONTENT=false     # Anyone can read
AUTH_PROTECT_EDITOR=true       # Only signed-in users can edit
```

**Private Knowledge Base:**

```env
NEXT_PUBLIC_AUTH_ENABLED=true
AUTH_PROTECT_CONTENT=true      # Login required to read
AUTH_PROTECT_EDITOR=true       # Login required to edit
```

**No Authentication:**

```env
NEXT_PUBLIC_AUTH_ENABLED=false
# Other auth settings are ignored
```

---

## Testing Your Setup

### 1. Start Development Server

```bash
npm run dev
```

### 2. Test Editor Protection

- Visit `/editor` - you should be redirected to sign-in
- Sign up/in with your email
- After signing in, you should access the editor

### 3. Test Content Protection

- If `AUTH_PROTECT_CONTENT=true`, visiting `/` should require login
- If `AUTH_PROTECT_CONTENT=false`, content should be publicly accessible

---

## How It Works

### Project Structure

```
middleware.ts              # Active middleware (with Clerk)
basicMiddleware.ts        # Backup (no authentication)
lib/config.ts            # Reads environment variables
```

### Authentication Flow

1. **User visits protected route** (e.g., `/editor`)
2. **Middleware checks** `siteConfig.auth.enabled`
3. **If enabled**, Clerk handles authentication
4. **If disabled**, request passes through

### Environment Variable Flow

```
.env.local → lib/config.ts → middleware.ts → Route Protection
```

---

## Troubleshooting

### ❗ "Clerk is not defined" error

**Problem**: Authentication middleware is active but Clerk keys are missing

**Solution**:

```env
# Add both keys to .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### ❗ Editor still accessible without login

**Problem**: Editor protection is disabled

**Solution**:

```env
# Enable editor protection
AUTH_PROTECT_EDITOR=true
```

### ❗ Can't access content after enabling auth

**Problem**: Content protection is enabled

**Solution**:

```env
# Make content public (recommended for help centers)
AUTH_PROTECT_CONTENT=false
```

### ❗ Build errors with Clerk imports

**Problem**: This shouldn't happen with the middleware setup, but if it does:

**Solution**: Switch back to basic middleware temporarily

```bash
mv middleware.ts clerkMiddleware.ts
mv basicMiddleware.ts middleware.ts
```

---

## Customization

### Sign-in Page

The project uses Clerk's default sign-in UI. To customize:

1. Visit your Clerk dashboard → **Customization**
2. Adjust colors, logos, and branding
3. Changes apply automatically to your app

### Adding Social Logins

In your Clerk dashboard:

1. Go to **User & Authentication** → **Social Connections**
2. Enable providers (Google, GitHub, etc.)
3. No code changes needed

---

## Production Deployment

### Environment Variables

Add these to your hosting platform:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key
CLERK_SECRET_KEY=sk_live_your_production_key
NEXT_PUBLIC_AUTH_ENABLED=true
AUTH_PROTECT_EDITOR=true
AUTH_PROTECT_CONTENT=false
```

### Clerk Dashboard

1. Add your production domain to allowed domains
2. Use production keys (not test keys)
3. Configure any additional settings needed

---

## Security Notes

- ✅ **Only two Clerk keys needed** - keep it simple
- ✅ **Editor protection recommended** - prevents unauthorized edits
- ✅ **Content protection optional** - depends on your use case
- ✅ **Environment variables secure** - never commit `.env.local`

---

> **Quick Start**: Just add your two Clerk keys to `.env.local`, set `NEXT_PUBLIC_AUTH_ENABLED=true` and `AUTH_PROTECT_EDITOR=true`, then restart your server. Your editor will be protected while keeping your content publicly accessible.

- ✅ **Email** (recommended)
- ✅ **Google** (optional)
- ✅ **GitHub** (optional)

4. Click **"Create Application"**

---

## Step 2: Configure Environment Variables

### 2.1 Get Your Clerk Keys

In your Clerk dashboard:

1. Navigate to **"API Keys"** in the sidebar
2. Copy your **Publishable Key**
3. Copy your **Secret Key**

### 2.2 Update Your .env.local File

Add the following to your `.env.local` file:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Editor Protection
AUTH_PROTECT_EDITOR=true
```

### 2.3 Environment Variable Explanation

| Variable                            | Description                     | Required       |
| ----------------------------------- | ------------------------------- | -------------- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Public key for client-side auth | ✅ Yes         |
| `CLERK_SECRET_KEY`                  | Secret key for server-side auth | ✅ Yes         |
| `AUTH_PROTECT_EDITOR`               | Enable editor protection        | ✅ Recommended |

---

## Step 3: Configure Allowed Domains (Optional)

### 3.1 For Production Deployment

1. In your Clerk dashboard, go to **"Domains"**
2. Add your production domain (e.g., `https://yourdomain.com`)
3. Add any staging domains if needed

### 3.2 For Development

Clerk automatically allows `localhost` for development, so no additional configuration is needed.

---

## Step 4: Customize Sign-In Experience

### 4.1 Customize Appearance

In your Clerk dashboard:

1. Go to **"Customization"** → **"Appearance"**
2. Choose your theme (Light/Dark)
3. Customize colors to match your brand
4. Upload your logo (optional)

### 4.2 Configure Sign-In Options

1. Navigate to **"User & Authentication"** → **"Email, Phone, Username"**
2. Configure your preferred authentication methods:
   - **Email address**: Required for most setups
   - **Username**: Optional for simpler usernames
   - **Phone number**: Optional for SMS verification

### 4.3 Set Up Social Connections (Optional)

1. Go to **"User & Authentication"** → **"Social Connections"**
2. Enable desired providers:
   - **Google**: Popular choice for help centers
   - **GitHub**: Useful if your audience includes developers
   - **Microsoft**: Good for enterprise users

---

## Step 5: Test Your Setup

### 5.1 Start Your Development Server

```bash
npm run dev
```

### 5.2 Test Authentication

1. Navigate to `/sign-in` in your browser
2. Try signing up with a test account
3. Verify you can sign in and out
4. Test accessing the `/editor` page (should require authentication)

### 5.3 Verify Editor Protection

1. Try accessing `/editor` without signing in
2. You should be redirected to the sign-in page
3. After signing in, you should have access to the editor

---

## Step 6: User Management

### 6.1 Managing Users

In your Clerk dashboard:

1. Go to **"Users"** to see all registered users
2. You can manually add users, ban users, or delete accounts
3. View user sessions and activity

---

## Troubleshooting

### Common Issues

#### ❗ "Clerk keys not found"

**Solution**:

- Verify your `.env.local` file has the correct keys
- Ensure no extra spaces or quotes around the keys
- Restart your development server after adding keys

#### ❗ "Invalid domain" error

**Solution**:

- Check that your domain is added in Clerk dashboard
- Ensure the domain matches exactly (including https://)
- For development, make sure you're using `localhost:3000`

#### ❗ Editor still accessible without auth

**Solution**:

- Confirm `AUTH_PROTECT_EDITOR=true` in your `.env.local`
- Restart your development server
- Clear your browser cache

### Getting Help

If you encounter issues:

1. **Clerk Documentation**: [docs.clerk.com](https://docs.clerk.com)
2. **Clerk Discord**: Join their community for support
3. **GitHub Issues**: Check the help center repository for known issues

---

## Security Best Practices

### 🔒 **Environment Variables**

- Never commit `.env.local` to version control
- Use different keys for development and production
- Rotate keys periodically

### 👤 **User Management**

- Regularly review registered users
- Remove inactive or suspicious accounts
- Monitor sign-in attempts

### 🛡️ **Access Control**

- Keep editor protection enabled
- Consider additional role-based access if needed
- Monitor editor usage through logs

---

## Production Deployment

### Environment Variables

When deploying to production:

1. **Vercel**: Add environment variables in your Vercel dashboard
2. **Netlify**: Configure variables in site settings
3. **Other Platforms**: Follow your platform's environment variable setup

### Domain Configuration

1. Update Clerk dashboard with your production domain
2. Verify SSL certificate is properly configured
3. Test authentication on your live site

---

> With Clerk authentication properly configured, your help center is now secure and ready for collaborative content creation. Users can safely access the editor while your content remains protected.
