# UDACITY_P1_IMAGE_PROCESSING_API

![Last Commit](https://img.shields.io/github/last-commit/AbdKhuffash/Udacity_P1_Image_Processing_API?color=blue&label=last%20commit)
![TypeScript](https://img.shields.io/badge/typescript-81.7%25-blue) 
![Languages](https://img.shields.io/badge/languages-2-brightgreen)

---

## 🚀 Built with the tools and technologies:

![Express](https://img.shields.io/badge/Express-black?logo=express&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-black?logo=json&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=black)
![dotenv](https://img.shields.io/badge/.ENV-ECD53F?logo=dotenv&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

![Sharp](https://img.shields.io/badge/sharp-00C300?logo=sharp&logoColor=white)
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?logo=nodemon&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![ts-node](https://img.shields.io/badge/ts--node-3178C6?logo=ts-node&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)
![Jasmine](https://img.shields.io/badge/Jasmine-8A4182?logo=jasmine&logoColor=white)

---

## 📑 Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Testing](#testing)
- [API Usage](#api-usage)
- [Caching Mechanism](#caching-mechanism)
- [Troubleshooting](#troubleshooting)

---

## 📖 Overview

**Image Processing API** :Built with **TypeScript** and powered by **Sharp**, it ensures efficient, high-quality image transformations suitable for modern web applications.

This project aims to deliver a reliable, maintainable image processing solution. The core features include:

- 🖼️ **Image Transformation**: Resize and manipulate images dynamically with minimal effort.  
- ⚡ **Performance Optimization**: Caching middleware reduces redundant processing for faster responses.  
- ✅ **Robust Validation**: Middleware ensures input correctness, preventing errors downstream.  
- 🧪 **Automated Testing**: Integrated Jasmine setup guarantees code quality and stability.  
- 🏗️ **Modular Architecture**: Organized routing and service layers facilitate scalability and maintainability.  
- 🔒 **Type Safety**: TypeScript configurations promote robust, error-resistant development.  

---

## 🚀 Getting Started

### ✅ Prerequisites
This project requires the following dependencies:

- Programming Language: **TypeScript**  
- Package Manager: **npm**

---

### ⚙️ Installation
Build **Udacity_P1_Image_Processing_API** from the source and install dependencies:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/USERNAME/UDACITY_P1_Image_Processing_API
   ```

2. **Navigate to the project directory:**
   ```bash
   cd UDACITY_P1_IMAGE_PROCESSING_API
   ```

3. **Install the dependencies:**
   ```bash
   npm install
   ```

---

### ▶️ Usage
Run the project with:

```bash
npm start
```

By default the server runs on **http://localhost:3000** (unless changed in your environment).

---

### 🧪 Testing
The project uses the **Jasmine** test framework. Run the test suite with:

```bash
npm test
```

---

## 🌐 API Usage

Once the server is running, you can interact with the API directly from your **browser** or a tool like **curl**/**Postman**.

**Endpoint**
```
GET /api/images?filename=<image_name_with_extension>&width=<number>&height=<number>
```

### ✅ Success Examples (from tests)

- **Resize an existing image (first call generates cache):**
  ```
  http://localhost:3000/api/images?filename=fjord.jpg&width=200&height=200
  ```
  - Response: `200 OK` with `Content-Type: image/jpeg`  
  - Side effect: a cached file `fjord_200x200.jpg` is created in the thumbnails directory.

- **Serve from cache on subsequent call (fast):**
  ```
  http://localhost:3000/api/images?filename=fjord.jpg&width=200&height=200
  ```
  - Response: `200 OK` quickly, served from cache if it exists.

### ❌ Failure Examples (from tests)

- **Missing required params (e.g., omit width/height):**
  ```
  http://localhost:3000/api/images?filename=fjord.jpg
  ```
  - Response: `400 Bad Request` with an error mentioning the missing `filename/width/height` parameter(s).

- **Image not found:**
  ```
  http://localhost:3000/api/images?filename=does-not-exist.jpg&width=100&height=100
  ```
  - Response: `404 Not Found`.

- **Invalid dimensions:**
  ```
  http://localhost:3000/api/images?filename=fjord.jpg&width=-1&height=100
  ```
  - Response: `400 Bad Request`.

### 🧩 Service-level examples (programmatic usage)

The internal `resizeJpg(input, width, height, outPath)` helper  behaves as follows:

- Creates a resized image for valid input and returns the output path (e.g., `.../thumb/fjord_123x77.jpg`).
- Throws for non‑positive dimensions, unsupported extensions (e.g., `.png`), or when the source image is missing.

These behaviors correspond to the HTTP examples above (bad inputs surface as `400/404` responses).

---

## 🗄️ Caching Mechanism

The API includes a simple, effective caching system to improve performance:

- **Where**: Cached images are saved in the thumbnails directory (e.g., `assets/thumb`).  
- **Naming**: `<filename_without_ext>_<width>x<height>.jpg` (e.g., `fjord_200x200.jpg`).  
- **When**: On the first request for a unique combination of `filename`, `width`, and `height`, the image is processed and cached.  
- **Reuse**: Subsequent identical requests are served directly from the cached file, avoiding reprocessing.  
- **Cleanup**: (Optional) You may delete cached files manually; they will be regenerated on next request.

**Example flow**

1. First request → `/api/images?filename=fjord.jpg&width=200&height=200`  
   - Processes `assets/full/fjord.jpg` and writes `assets/thumb/fjord_200x200.jpg`  
2. Second request → same URL  
   - Reads and streams `assets/thumb/fjord_200x200.jpg` immediately

---

## 🔧 Troubleshooting

- Ensure the source image exists in the **full** directory (e.g., `assets/full/fjord.jpg`).  
- Confirm `width` and `height` are **positive integers**.  
- Use a **.jpg** source image; other extensions are rejected by `resizeJpg`.  
- If you change environment folders, make sure they match `ENV.ASSETS_FULL_DIR` and `ENV.ASSETS_THUMB_DIR`.

---

## 🔙 Return
[Back to Top](#udacity_p1_image_processing_api)
