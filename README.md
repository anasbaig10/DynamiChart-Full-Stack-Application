# Financial Dashboard with Next.js and Django

This project is a web application featuring a financial dashboard built with Next.js on the frontend and integrated with a Django API backend. The dashboard displays multiple charts (Candlestick, Line, Bar, and Pie) using data retrieved from the backend.

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- Python (v3.7 or later)
- pip (Python package installer)

### Frontend Setup (Next.js)

1. Navigate to the frontend directory:

   ```
   cd my-dashboard
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env.local` file in the frontend root directory and add:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

4. Start the development server:
   ```
   npm run dev
   ```

The frontend will be available at `http://localhost:3000` or `http://localhost:3001`.

### Backend Setup (Django)

1. Navigate to the backend directory:

   ```
   cd myapi
   ```

2. Create a virtual environment:

   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:

   ```
   pip install -r requirements.txt
   ```

4. Apply migrations:

   ```
   python manage.py migrate
   ```

5. Start the Django development server:
   ```
   python manage.py runserver
   ```

The backend API will be available at `http://localhost:8000/api`.

## Libraries and Tools Used

### Frontend

- Next.js: React framework for production
- React: JavaScript library for building user interfaces
- Axios: Promise-based HTTP client for making API requests
- ApexCharts: Interactive JavaScript Charts library
- Tailwind CSS: Utility-first CSS framework

### Backend

- Django: High-level Python web framework
- Django REST Framework: Toolkit for building Web APIs
- django-cors-headers: Django app for handling Cross-Origin Resource Sharing (CORS)

## Approach and Thought Process

1. **Frontend Architecture**:

   - Used Next.js for its server-side rendering capabilities and optimized performance.
   - Implemented a responsive design using Tailwind CSS for rapid UI development.
   - Created reusable chart components to maintain a clean and modular codebase.
   - Utilized ApexCharts for creating interactive and visually appealing charts.

2. **Backend Architecture**:

   - Utilized Django for its robust ORM and built-in admin interface.
   - Implemented Django REST Framework to easily create API endpoints.
   - Used django-cors-headers to handle CORS issues between frontend and backend.

3. **Data Flow**:

   - Centralized data fetching in the main dashboard component to manage application state efficiently.
   - Used React hooks (useState, useEffect) for state management and side effects.

4. **Styling and UI/UX**:

   - Implemented a responsive grid layout for optimal viewing on various devices.
   - Used consistent color schemes and styling across all components for a cohesive look.

5. **Performance Considerations**:

   - Implemented dynamic imports for chart components to reduce initial load time.
   - Used server-side rendering where applicable to improve SEO and initial page load.

6. **Error Handling and User Feedback**:
   - Implemented loading states and error messages to provide feedback to users during data fetching.
   - Added try-catch blocks in API calls to gracefully handle and display errors.

This approach allowed for the creation of a scalable, maintainable, and user-friendly dashboard application that effectively visualizes financial data through various chart types.
