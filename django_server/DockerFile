# Use an official Python runtime as the base image
FROM python:3.11.7

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container to /app
WORKDIR /app

# Install the application dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the rest of the application code to the working directory
COPY . .

# Make port 8000 available outside the container
EXPOSE 8000

# Start the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


