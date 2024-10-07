# Use the official lightweight Python image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port Streamlit runs on
EXPOSE 8501

# Run Streamlit when the container launches
CMD ["streamlit", "run", "app.py", "--server.port=8501", "--server.enableCORS=false"]
