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

---

### 🧪 Testing
The project uses the **Jasmine** test framework. Run the test suite with:

```bash
npm test
```

---

## 🌐 API Usage

Once the server is running, you can interact with the API directly from your browser or a tool like Postman.

The main endpoint is:

```
http://localhost:3000/api/images?filename=<image_name>&width=<number>&height=<number>
```

### ✅ Example (Successful request)
If you have an image called `fjord.jpg` inside the `images/full` folder, you can resize it like this:

```
http://localhost:3000/api/images?filename=fjord&width=200&height=200
```

This will return the resized image and store a cached version for future requests.

### ❌ Example (Failure request)
If you try to request a non-existing image:

```
http://localhost:3000/api/images?filename=invalid&width=200&height=200
```

The API will return an error response because the file does not exist.

---

## 🗄️ Caching Mechanism

The API includes a simple caching system to improve performance:

- When an image is processed for the first time, the resized version is saved inside the `images/thumb` directory.  
- On subsequent requests with the same `filename`, `width`, and `height`, the API will serve the cached image directly instead of reprocessing it.  
- This reduces CPU usage and response time significantly.  

Example:

1. First request to `/api/images?filename=fjord&width=200&height=200` → Image is resized and cached.  
2. Second request to the same URL → Cached image is served instantly.  

---

## 🔙 Return
[Back to Top](#udacity_p1_image_processing_api)
