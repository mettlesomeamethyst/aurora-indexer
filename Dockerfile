# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port required by Hugging Face Spaces
ENV PORT=7860

# Start backend
CMD ["node", "index.js"]
