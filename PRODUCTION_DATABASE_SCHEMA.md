# DealEase Production Database Schema

## 🗃️ Collections Overview

### 1. **users** (Already exists - enhance)

```
userId (String, Required) - Appwrite user ID
role (String, Required) - "buyer" | "seller"
firstName (String, Required)
lastName (String, Required)
email (String, Required) - From Appwrite auth
company (String, Optional)
phone (String, Optional)
location (String, Optional)
avatar (String, Optional) - File ID from storage
bio (String, Optional) - Professional description
linkedin (String, Optional)
website (String, Optional)
isVerified (Boolean, Default: false)
isOnboarded (Boolean, Default: false)
createdAt (DateTime, Auto)
updatedAt (DateTime, Auto)
```

### 2. **businesses** (New - Core entity)

```
businessId (String, Required, Unique) - Auto-generated
sellerId (String, Required) - Reference to users
title (String, Required) - Business name
description (String, Required) - Detailed description
industry (String, Required) - Tech, Healthcare, Retail, etc.
businessModel (String, Required) - SaaS, E-commerce, Service, etc.
stage (String, Required) - Startup, Growth, Mature
location (String, Required) - City, State/Country
askingPrice (Number, Required) - In USD
revenue (Number, Optional) - Annual revenue
employees (Number, Optional) - Number of employees
founded (Number, Optional) - Year founded
assets (Array, Optional) - List of key assets
features (Array, Optional) - Key business features
images (Array, Optional) - File IDs from storage
documents (Array, Optional) - File IDs (financial docs, etc.)
isActive (Boolean, Default: true)
isVerified (Boolean, Default: false)
isFeatured (Boolean, Default: false)
views (Number, Default: 0)
favorites (Array, Optional) - User IDs who favorited
tags (Array, Optional) - searchable tags
createdAt (DateTime, Auto)
updatedAt (DateTime, Auto)
```

### 3. **conversations** (New - Chat system)

```
conversationId (String, Required, Unique) - Auto-generated
buyerId (String, Required) - Reference to users
sellerId (String, Required) - Reference to users
businessId (String, Required) - Reference to businesses
status (String, Default: "active") - active, archived, blocked
lastMessage (String, Optional) - Preview text
lastMessageAt (DateTime, Optional)
unreadCount (Number, Default: 0) - For buyerId
sellerUnreadCount (Number, Default: 0) - For sellerId
createdAt (DateTime, Auto)
updatedAt (DateTime, Auto)
```

### 4. **messages** (New - Individual messages)

```
messageId (String, Required, Unique) - Auto-generated
conversationId (String, Required) - Reference to conversations
senderId (String, Required) - Reference to users
content (String, Required) - Message text
messageType (String, Default: "text") - text, image, document, offer
attachments (Array, Optional) - File IDs from storage
isRead (Boolean, Default: false)
editedAt (DateTime, Optional)
createdAt (DateTime, Auto)
```

### 5. **deals** (New - Deal pipeline)

```
dealId (String, Required, Unique) - Auto-generated
buyerId (String, Required) - Reference to users
sellerId (String, Required) - Reference to users
businessId (String, Required) - Reference to businesses
status (String, Default: "inquiry") - inquiry, negotiation, due_diligence, closing, completed, cancelled
currentStage (String, Required) - Current pipeline stage
offeredPrice (Number, Optional) - Buyer's offer
counterPrice (Number, Optional) - Seller's counter
terms (String, Optional) - Deal terms
documents (Array, Optional) - Legal documents file IDs
notes (String, Optional) - Private notes
targetCloseDate (DateTime, Optional)
actualCloseDate (DateTime, Optional)
createdAt (DateTime, Auto)
updatedAt (DateTime, Auto)
```

### 6. **favorites** (New - User favorites)

```
favoriteId (String, Required, Unique) - Auto-generated
userId (String, Required) - Reference to users
businessId (String, Required) - Reference to businesses
createdAt (DateTime, Auto)
```

### 7. **reviews** (New - Business reviews)

```
reviewId (String, Required, Unique) - Auto-generated
businessId (String, Required) - Reference to businesses
buyerId (String, Required) - Reference to users (who reviewed)
rating (Number, Required) - 1-5 stars
comment (String, Optional) - Review text
isVerified (Boolean, Default: false) - Verified purchase
createdAt (DateTime, Auto)
```

### 8. **notifications** (New - User notifications)

```
notificationId (String, Required, Unique) - Auto-generated
userId (String, Required) - Reference to users
type (String, Required) - message, deal_update, favorite, review, etc.
title (String, Required) - Notification title
content (String, Required) - Notification content
data (String, Optional) - JSON metadata
isRead (Boolean, Default: false)
actionUrl (String, Optional) - Where to navigate when clicked
createdAt (DateTime, Auto)
```

### 9. **business_analytics** (New - Track business metrics)

```
analyticsId (String, Required, Unique) - Auto-generated
businessId (String, Required) - Reference to businesses
date (DateTime, Required) - Date of metrics
views (Number, Default: 0) - Daily views
inquiries (Number, Default: 0) - Daily inquiries
favorites (Number, Default: 0) - Daily favorites
```

## 🔒 Permissions Strategy

### Collection Permissions:

- **users**: Read (any), Create/Update/Delete (users)
- **businesses**: Read (any), Create/Update/Delete (users - only own)
- **conversations**: Read/Write (participants only)
- **messages**: Read/Write (conversation participants only)
- **deals**: Read/Write (participants only)
- **favorites**: Read/Write (users - only own)
- **reviews**: Read (any), Create/Update/Delete (users - only own)
- **notifications**: Read/Write (users - only own)
- **business_analytics**: Read (business owner), Write (system)

## 🗂️ Storage Buckets

### 1. **business-images** (Public read)

- Business listing photos
- Logos and branding images
- Max size: 5MB per file

### 2. **business-documents** (Private)

- Financial statements
- Legal documents
- Business plans
- Max size: 10MB per file

### 3. **profile-pictures** (Public read)

- User avatar images
- Max size: 2MB per file

### 4. **chat-attachments** (Private)

- Files shared in conversations
- Images and documents
- Max size: 10MB per file

## 🔄 Real-time Subscriptions

### Appwrite Realtime Channels:

1. `databases.{databaseId}.collections.messages.documents` - New messages
2. `databases.{databaseId}.collections.deals.documents` - Deal updates
3. `databases.{databaseId}.collections.notifications.documents` - New notifications
4. `databases.{databaseId}.collections.conversations.documents` - Conversation updates

## 📈 Indexes for Performance

### Recommended Indexes:

1. **businesses**: `sellerId`, `industry`, `location`, `askingPrice`, `isActive`
2. **messages**: `conversationId`, `senderId`, `createdAt`
3. **conversations**: `buyerId`, `sellerId`, `businessId`, `lastMessageAt`
4. **deals**: `buyerId`, `sellerId`, `businessId`, `status`
5. **favorites**: `userId`, `businessId`
6. **notifications**: `userId`, `isRead`, `createdAt`
