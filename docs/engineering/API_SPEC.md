# REST API Specification

## Project: Website Potensi Desa Karamatwangi
### Status: Approved
### Version: 1.0.0
### Date: 2026-07-10

---

## 1. API Overview

This document defines the REST API contract for the platform. The backend runs as a stateless API service, communicating with the React client via JSON payloads.

- **Base URL:** `/api/v1`
- **Versioning Strategy:** Version prefixing in the URL path (e.g. `/api/v1/*`). Upgrading to `/api/v2` will maintain backwards-compatible `/v1` endpoints.
- **Authentication:** Admin endpoints require stateless token headers managed by **Laravel Sanctum**.
- **Error Handling:** Backend returns standard HTTP error codes accompanied by JSON error structures.

---

## 2. API Standards & Formats

### 2.1. Standard Success Response
```json
{
  "success": true,
  "data": {}
}
```

### 2.2. Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Data input tidak valid.",
    "details": {
      "title": ["Judul potensi wajib diisi."]
    }
  }
}
```

### 2.3. Paginated Response Format
```json
{
  "success": true,
  "data": [],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 12,
    "total": 56
  },
  "links": {
    "prev": "/api/v1/potentials?page=1",
    "next": "/api/v1/potentials?page=3"
  }
}
```

### 2.4. Standard HTTP Status Codes
- `200 OK`: Request succeeded.
- `201 Created`: Entry successfully added to database.
- `204 No Content`: Row deleted.
- `400 Bad Request`: General client error.
- `401 Unauthorized`: Missing or invalid Sanctum token.
- `403 Forbidden`: Admin credentials mismatch.
- `404 Not Found`: Potential ID or slug does not exist.
- `422 Unprocessable Entity`: Input validation failure.
- `500 Server Error`: Database timeout or filesystem error.

---

## 3. Authentication Endpoints

### 3.1. Admin Login
- **Method:** `POST`
- **Route:** `/auth/login`
- **Purpose:** Exchange administrator credentials for an access token.
- **Request Body:**
  ```json
  {
    "username": "admin_username",
    "password": "admin_password"
  }
  ```
- **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "token": "1|sanctum_generated_token_string",
    "user": {
      "username": "admin_username"
    }
  }
  ```
- **Validation:** Both fields are required. Max 50 characters.

### 3.2. Admin Logout
- **Method:** `POST`
- **Route:** `/auth/logout`
- **Purpose:** Invalidate current Sanctum token.
- **Headers:** `Authorization: Bearer <token>` (Required)
- **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "message": "Logged out successfully."
  }
  ```

---

## 4. Category Endpoints

### 4.1. List Categories
- **Method:** `GET`
- **Route:** `/categories`
- **Purpose:** Fetch category lists to populate filter chips and navigation menus.
- **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "uuid-1",
        "label": "UMKM",
        "slug": "umkm",
        "icon_key": "shopping-bag",
        "color_code": "#16A34A"
      }
    ]
  }
  ```

---

## 5. Potential Endpoints (Polymorphic ACA Routing)

### 5.1. List Potentials (Public Directory)
- **Method:** `GET`
- **Route:** `/potentials`
- **Purpose:** Fetch paginated grid listings. Supports search, category filters, and featured overrides.
- **Request Parameters:**
  - `page` (int, optional)
  - `search` (string, optional)
  - `category` (string, optional, category slug)
  - `featured` (boolean, optional)
- **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "uuid-potential-1",
        "title": "Madu Asli Karamatwangi",
        "slug": "madu-asli-karamatwangi",
        "category": {
          "label": "UMKM",
          "slug": "umkm",
          "color_code": "#16A34A"
        },
        "short_description": "Madu hutan murni dari perkebunan Karamatwangi.",
        "cover_image_url": "/storage/uploads/umkm/madu.webp",
        "location": {
          "latitude": -7.12345,
          "longitude": 107.12345,
          "address": "Kampung Baru RT 02 RW 01"
        },
        "contact": {
          "whatsapp": "628123456789"
        }
      }
    ]
  }
  ```

### 5.2. Show Potential Detail (Deep Linking)
- **Method:** `GET`
- **Route:** `/potentials/:category_slug/:slug`
- **Purpose:** Fetch detailed profile page content dynamically rendering metadata JSON attributes.
- **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid-potential-1",
      "title": "Madu Asli Karamatwangi",
      "slug": "madu-asli-karamatwangi",
      "description": "Detail penjelasan tentang proses panen madu hutan di Desa Karamatwangi.",
      "category": {
        "label": "UMKM",
        "slug": "umkm"
      },
      "cover_image_url": "/storage/uploads/umkm/madu.webp",
      "gallery": [
        "/storage/uploads/umkm/madu_harvest.webp",
        "/storage/uploads/umkm/madu_bottle.webp"
      ],
      "location": {
        "latitude": -7.12345,
        "longitude": 107.12345,
        "address": "Kampung Baru RT 02 RW 01"
      },
      "contact": {
        "whatsapp": "628123456789",
        "phone": null,
        "email": null,
        "website": null
      },
      "metadata": {
        "owner_name": "Sugeng",
        "price_range": "Rp 50.000 - Rp 120.000"
      }
    }
  }
  ```

### 5.3. Create Potential
- **Method:** `POST`
- **Route:** `/admin/potentials`
- **Purpose:** Write a new potential listing to the database.
- **Headers:** `Authorization: Bearer <token>` (Required)
- **Request Body:**
  ```json
  {
    "category_id": "uuid-category-umkm",
    "title": "Kopi Robusta Karamatwangi",
    "description": "Deskripsi kopi robusta.",
    "status": "published",
    "cover_image_id": "uuid-media-1",
    "latitude": -7.12346,
    "longitude": 107.12346,
    "address": "Jalan Raya Cikajang",
    "whatsapp": "628123456780",
    "metadata": {
      "owner_name": "Bambang",
      "price_range": "Rp 25.000"
    }
  }
  ```
- **Response Body (201 Created):** Returns standard success payload.
- **Validation:** Title, description, category_id, coordinates are required. `whatsapp` must use country prefix code format `62`.

### 5.4. Update Potential
- **Method:** `PUT`
- **Route:** `/admin/potentials/:id`
- **Purpose:** Modify an existing potential profile details.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:** Same schema structure as create body.

### 5.5. Delete Potential (Soft Delete)
- **Method:** `DELETE`
- **Route:** `/admin/potentials/:id`
- **Purpose:** Perform soft deletion of catalog row.
- **Headers:** `Authorization: Bearer <token>`
- **Response Body (204 No Content).**

---

## 6. Media Endpoints

### 6.1. Upload Image
- **Method:** `POST`
- **Route:** `/admin/media/upload`
- **Purpose:** Upload raw photos. Processes, resizes, and converts images to WebP automatically.
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
- **Request Body:** Multi-part file field `file`.
- **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "media": {
      "id": "uuid-media-new",
      "filepath": "/storage/uploads/media/optimized_file_name.webp",
      "filetype": "image/webp"
    }
  }
  ```
- **Validation Constraints:** File is required. Max size 5MB. Accepted formats: `.jpg`, `.jpeg`, `.png`, `.webp`.

---

## 7. Statistics Endpoints

### 7.1. Dashboard Counters Summary
- **Method:** `GET`
- **Route:** `/statistics/summary`
- **Purpose:** Fetch totals to feed landing statistics overlays and dashboard widgets.
- **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "total_potentials": 48,
      "total_umkm": 36,
      "total_categories": 3,
      "total_dusun": 4
    }
  }
  ```

---

## 8. Excel Import/Export Endpoints

### 8.1. Excel Bulk Import
- **Method:** `POST`
- **Route:** `/admin/potentials/import`
- **Purpose:** Batch upload spreadsheet data. Runs under database transaction.
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
- **Request Body:** Excel file field `file` (`.xlsx`).
- **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "message": "Impor data berhasil. 36 potensi ditambahkan."
  }
  ```
- **Validation Failure Example (422 Unprocessable Entity):**
  ```json
  {
    "success": false,
    "error": {
      "code": "IMPORT_VALIDATION_FAILED",
      "message": "Proses impor dibatalkan. Baris data mengandung error.",
      "details": {
        "row_14": "Koordinat latitude tidak valid."
      }
    }
  }
  ```

---

## 9. ACA Schema Query Endpoints

### 9.1. Fetch Category Dynamic Schema
- **Method:** `GET`
- **Route:** `/categories/:id/schema`
- **Purpose:** Fetches the category schema mapping to enable client-side dynamic form layouts and field validators.
- **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "schema": {
      "fields": [
        {
          "name": "owner_name",
          "type": "string",
          "label": "Nama Pemilik",
          "required": true
        },
        {
          "name": "price_range",
          "type": "string",
          "label": "Rentang Harga",
          "required": false
        }
      ]
    }
  }
  ```

---

## 10. Health Check Endpoint

### 10.1. Get Health Status
- **Method:** `GET`
- **Route:** `/health`
- **Purpose:** Public status probe used by deployment verification tools.
- **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "status": "ok",
      "version": "1.0.0",
      "timestamp": "2026-07-10T16:00:00+07:00"
    }
  }
  ```

---

## 11. Activity Log Endpoints

### 11.1. List Activity Logs
- **Method:** `GET`
- **Route:** `/admin/activity-logs`
- **Purpose:** Retrieve a paginated log of administrative audits.
- **Headers:** `Authorization: Bearer <token>`
- **Request Parameters:**
  - `page` (int, optional) — default: 1
  - `per_page` (int, optional) — default: 15, max: 50
  - `action` (string, optional) — filter by exact action slug (e.g. `potential.created`)
- **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "uuid",
        "action": "potential.created",
        "subject_id": "uuid-potential",
        "subject_type": "App\\Models\\Potential",
        "ip_address": "127.0.0.1",
        "created_at": "2026-07-10T09:00:00Z",
        "user": {
          "id": "uuid-user",
          "username": "admin"
        }
      }
    ],
    "meta": {
      "current_page": 1,
      "last_page": 3,
      "per_page": 15,
      "total": 40
    },
    "links": {
      "prev": null,
      "next": "/api/v1/admin/activity-logs?page=2"
    }
  }
  ```

