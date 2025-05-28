# Book Review App Frontend

A modern, responsive web application built with React, TypeScript, and Vite for browsing, reviewing, and managing books.

## Features

- **User Authentication**: Register and login to access personalized features.
- **Book Browsing**: View a list of books with search functionality by title and author.
- **Book Details**: See detailed information about each book, including average ratings and reviews.
- **Review System**: Write and submit reviews for books you've read.
- **User Profile**: View your submitted reviews and manage your account.
- **Admin Panel**: Manage books (add, edit, delete) with an admin account.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit, Zustand
- **Routing**: React Router
- **API Integration**: RTK Query
- **UI Components**: Custom components with Lucide icons
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd book-review-app/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

### Building for Production

To build the app for production, run:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Demo Credentials

To test the deployed build, use the following credentials:
- **Email**: admin@test.com
- **Password**: 123456

## Project Structure

- `src/`: Main source code
  - `app/`: Redux store, API integration, and authentication logic
  - `components/`: Reusable UI components
  - `pages/`: Main application pages
  - `styles/`: Global styles and Tailwind configuration
  - `types/`: TypeScript type definitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
