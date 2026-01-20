# Test Coverage Reports

This project has three types of test coverage reports:

## 1. Backend Coverage (Jest)
**Location:** `coverage/`
**Command:** `npm run test:coverage`
**View Report:** Open `coverage/lcov-report/index.html` in browser

**What it tests:**
- API endpoints (index.js)
- Utility functions (utils/)
- Models (models/)

---

## 2. Frontend Coverage (Playwright)
**Location:** `coverage/frontend/`
**Command:** `npm run test-frontend:coverage`
**View Report:** Open `coverage/frontend/index.html` in browser

**What it tests:**
- Frontend JavaScript (public/js/)
- User interactions
- Form validations

---

## 3. Alternative Backend Coverage (Mocha + NYC)
**Location:** `coverage/mocha/`
**Command:** `npm run test:mocha:coverage`
**View Report:** Open `coverage/mocha/index.html` in browser

**What it tests:**
- Same as Jest backend tests
- Alternative testing framework
- API endpoints validation

---

## Quick View All Coverage

### Backend (Jest):
```bash
npm run test:coverage
start coverage/lcov-report/index.html
```

### Frontend (Playwright):
```bash
npm run test-frontend
npm run test-frontend:coverage
start coverage/frontend/index.html
```

### Alternative Backend (Mocha):
```bash
npm run test:mocha:coverage
start coverage/mocha/index.html
```

---

## Coverage Thresholds

| Type | Lines | Statements | Functions | Branches |
|------|-------|------------|-----------|----------|
| Jest | 80% | 80% | 80% | 80% |
| Playwright | 90% | 90% | 90% | 90% |
| Mocha | 80% | 80% | 80% | 80% |

---

## Directory Structure

```
coverage/
├── lcov-report/          # Jest HTML reports
│   └── index.html
├── frontend/             # Playwright HTML reports
│   └── index.html
├── mocha/                # NYC/Mocha HTML reports
│   └── index.html
└── temp/                 # Playwright raw V8 coverage
```
