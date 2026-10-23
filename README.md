# yowl: 5CHAN, a family-friendly 4CHAN clone

## Project Overview
This project is the product design and MVP of **5CHAN**, a web application that mimics the functionality of 4CHAN while ensuring a family-friendly environment, only about cats and gardens. It allows users to create and browse imageboards with strict content moderation to prevent inappropriate material.

## Installation and Run Instructions
1. **Clone the repository**
   ```bash
   git clone https://github.com/AZ044/yowl.git
   cd yowl/mvp
   ```
2. **Start the backend** (in a first terminal):
   ```bash
   cd backend
   npm i && npm run dev
   ```
3. **Start the frontend** (in a second terminal):
   ```bash
   cd frontend
   npm i && npm run start
   ```
4. Access the application at `http://localhost:3000`

## Justification of technical choices
1. **Framework**: Chose React and ExpressJS for their flexibility and simplicity.
2. **Frontend**: Used Ant Design for a modern and responsive UI.
3. **Database**: Selected JSON files for simplicity in data storage and retrieval.
4. **Content Moderation**: Implemented strict filtering to ensure all content is family-friendly.

## Link to prototype
- **Figma Prototype Link**: [Figma Prototype](https://www.figma.com/design/KHOIqVKtwnv2pT9SH3uJ6c/5CHAN-Prototype?node-id=0-1&t=0WH4ue8Ds2dFPKwn-1)

## Repository structure
- `mvp/`: the working MVP, with `backend/` (Express API) and `frontend/` (React app)
- `docs/`: detailed documentation about the project, including design decisions, technical specifications, and user guides. Each subdirectory focuses on a specific aspect of the project, such as frontend design, backend architecture, and prototype details.

## Authors
- **Matéo**
- **Thomas**
- **Hugo**
